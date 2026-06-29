// src/app/professor/students/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Search,
  Mail,
  UserCircle,
  BookOpen,
  Download,
} from "lucide-react"; // استيراد أيقونة Download
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface EnrolledStudent {
  id: string;
  studentId: string;
  name: string;
  email: string;
  major: string;
  status: "Active" | "Withdrawn" | "At Risk";
  courseId: string;
  courseName: string;
}

function StudentsListContent() {
  const searchParams = useSearchParams();
  // قراءة الـ courseId من الـ URL إن وجد
  const courseIdParam = searchParams.get("courseId");

  const [allStudents, setAllStudents] = useState<EnrolledStudent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // محاكاة جلب كشف الطلاب بالكامل
    const fetchStudents = () => {
      setTimeout(() => {
        setAllStudents([
          {
            id: "1",
            studentId: "2023001",
            name: "Ahmed Ali",
            email: "ahmed@student.edu",
            major: "Software Engineering",
            status: "Active",
            courseId: "C-101",
            courseName: "Data Structures",
          },
          {
            id: "2",
            studentId: "2023045",
            name: "Sara Mohamed",
            email: "sara@student.edu",
            major: "AI",
            status: "Active",
            courseId: "C-101",
            courseName: "Data Structures",
          },
          {
            id: "3",
            studentId: "2023088",
            name: "Omar Hassan",
            email: "omar@student.edu",
            major: "Computer Science",
            status: "At Risk",
            courseId: "C-102",
            courseName: "Artificial Intelligence",
          },
          {
            id: "4",
            studentId: "2023102",
            name: "Nour Al-Din",
            email: "nour@student.edu",
            major: "Intelligent Systems",
            status: "Active",
            courseId: "C-102",
            courseName: "Artificial Intelligence",
          },
          {
            id: "5",
            studentId: "2023150",
            name: "Mona Youssef",
            email: "mona@student.edu",
            major: "Cyber Security",
            status: "Withdrawn",
            courseId: "C-103",
            courseName: "Database Systems",
          },
          {
            id: "6",
            studentId: "2023210",
            name: "Khaled Yassin",
            email: "khaled@student.edu",
            major: "Information Systems",
            status: "Active",
            courseId: "C-103",
            courseName: "Database Systems",
          },
        ]);
        setIsLoading(false);
      }, 1200);
    };

    fetchStudents();
  }, []);

  // الفلترة بناءً على المادة المحددة ونص البحث
  const filteredStudents = allStudents.filter((s) => {
    const matchesCourse = courseIdParam ? s.courseId === courseIdParam : true;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentId.includes(searchQuery);

    return matchesCourse && matchesSearch;
  });

  // دالة تصدير قائمة طلاب المادة المحددة إلى ملف CSV
  const handleExportCSV = () => {
    if (!courseIdParam) return;

    // 1. تحديد أعمدة الملف
    const headers = ["Student ID", "Name", "Email", "Major", "Status"];

    // 2. تحويل بيانات الطلاب المفلترين لأسطر تفصلها فواصل
    const csvData = filteredStudents.map((student) =>
      [
        student.studentId,
        `"${student.name}"`, // علامات تنصيص لحماية الأسماء المركبة
        student.email,
        student.major,
        student.status,
      ].join(","),
    );

    // 3. دمج العناوين مع البيانات
    const csvString = [headers.join(","), ...csvData].join("\n");

    // 4. إنشاء رابط التحميل التلقائي للملف
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Roster_${courseIdParam}.csv`); // تسمية الملف بكود المادة
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-500 bg-green-500/10 hover:bg-green-500/20";
      case "Withdrawn":
        return "text-yellow-600 bg-yellow-500/10 hover:bg-yellow-500/20";
      case "At Risk":
        return "text-red-500 bg-red-500/10 hover:bg-red-500/20";
      default:
        return "text-primary bg-primary/10";
    }
  };

  return (
    <div className="animate-in fade-in duration-500 p-4 mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {courseIdParam && (
            <Button
              variant="ghost"
              asChild
              className="mb-2 -ml-2 text-muted-foreground"
            >
              <Link href="/professor/courses">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Link>
            </Button>
          )}

          <h1 className="text-3xl font-bold tracking-tight">
            {courseIdParam ? "Enrolled Students" : "All Students"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {courseIdParam ? (
              <>
                Course ID:{" "}
                <span className="text-foreground">
                  {courseIdParam}
                </span>
              </>
            ) : (
              "Viewing all students across your active courses."
            )}
          </p>
        </div>

        {/* زرار التصدير يظهر فقط إذا لم نكن في وضع التحميل، وكان هناك مادة محددة بالـ ID */}
        {!isLoading && courseIdParam && (
          <Button
            variant="outline"
            onClick={handleExportCSV}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Roster
          </Button>
        )}
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="space-y-4 bg-card border rounded-xl p-4">
          <div className="flex justify-between mb-6">
            <Skeleton className="h-10 w-64" />
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : (
        /* Main Content */
        <div className="bg-card border rounded-xl overflow-hidden shadow-sm animate-in slide-in-from-bottom-4 duration-700">
          {/* Toolbar */}
          <div className="p-4 border-b bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background"
              />
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              {filteredStudents.length}{" "}
              {filteredStudents.length === 1 ? "Student" : "Students"}
            </div>
          </div>

          {/* Students List */}
          <div className="divide-y">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="p-4 hover:bg-muted/10 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-2">
                        {student.name}
                        <Badge
                          variant="outline"
                          className={`border-transparent ${getStatusColor(student.status)}`}
                        >
                          {student.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <span>ID: {student.studentId}</span>
                        <span className="hidden sm:inline text-muted-foreground/50">
                          •
                        </span>
                        <span>{student.major}</span>

                        {!courseIdParam && (
                          <>
                            <span className="hidden sm:inline text-muted-foreground/50">
                              •
                            </span>
                            <span className="flex items-center gap-1 text-primary/80">
                              <BookOpen className="w-3 h-3" />
                              {student.courseName}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full sm:w-auto text-muted-foreground hover:text-primary"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-muted-foreground">
                <UserCircle className="w-12 h-12 mx-auto opacity-20 mb-3" />
                <p>No students found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProfessorStudentsList() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-muted-foreground">
          Loading Roster...
        </div>
      }
    >
      <StudentsListContent />
    </Suspense>
  );
}