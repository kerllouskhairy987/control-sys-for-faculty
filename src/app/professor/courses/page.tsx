// src/app/professor/courses/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Clock, MapPin, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default function ProfessorCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // محاكاة لطلب الـ API لجلب مواد الدكتور
    const loadMockCourses = () => {
      setTimeout(() => {
        setCourses([
          {
            id: "C-101",
            name: "Data Structures",
            code: "CS201",
            studentsCount: 45,
            schedule: "Sunday 10:00 AM - 12:00 PM",
            room: "Hall A",
          },
          {
            id: "C-102",
            name: "Artificial Intelligence",
            code: "CS305",
            studentsCount: 38,
            schedule: "Tuesday 02:00 PM - 04:00 PM",
            room: "Lab 3",
          },
          {
            id: "C-103",
            name: "Database Systems",
            code: "IS210",
            studentsCount: 62,
            schedule: "Thursday 08:00 AM - 11:00 AM",
            room: "Hall C",
          },
        ]);
        setIsLoading(false);
      }, 1500);
    };

    loadMockCourses();
  }, []);

  return (
    <div className="animate-in fade-in duration-500 p-4 mx-auto space-y-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
        <p className="text-muted-foreground mt-1">
          Manage your current semester courses and access grading.
        </p>
      </div>

      {/* Skeleton Loading */}
      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="flex flex-col h-full">
              <CardHeader className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Courses Grid */}
      {!isLoading && courses.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in slide-in-from-bottom-4 duration-700">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col h-full">
              <CardHeader>
                <div className="text-xs font-semibold text-primary mb-1">
                  {course.code}
                </div>
                <CardTitle className="text-xl">{course.name}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 flex-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{course.room}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 shrink-0" />
                  <span>{course.studentsCount} Students Enrolled</span>
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button
                  variant="outline"
                  asChild
                  className="w-1/2 flex items-center gap-2"
                >
                  <Link href={`/professor/students?courseId=${course.id}`}>
                    <Users className="w-4 h-4" />
                    Roster
                  </Link>
                </Button>
                <Button asChild className="w-1/2 flex items-center gap-2">
                  <Link href={`/professor/grades?courseId=${course.id}`}>
                    Grades
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && courses.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-xl bg-muted/10 text-muted-foreground">
          <BookOpen className="w-12 h-12 mx-auto opacity-20 mb-3" />
          <p>No courses assigned to you this semester.</p>
        </div>
      )}
    </div>
  );
}