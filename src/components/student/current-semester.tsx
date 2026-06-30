"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export function CurrentSemesterCourses({ courses }: { courses: any }) {
  const term = courses?.term;
  const year = courses?.year;

  const coursesArray =
    courses?.classes && Array.isArray(courses.classes)
      ? courses.classes.filter(
          (course: any) => course.status?.toLowerCase() === "approved",
        )
      : [];

  return (
    <div className="w-full py-4 mt-4">
      <h2 className="text-2xl font-bold mb-4 tracking-tight">
        {term} Semester {year}
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {coursesArray.map((course: any, index: number) => (
          <Card key={index} className="relative transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <Badge
                  variant="secondary"
                  className="text-[10px] capitalize tracking-wider"
                >
                  Dr {course.instructorName}
                </Badge>
              </div>
              <CardTitle className="text-lg leading-tight capitalize">
                {course.courseTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between font-mono text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>{course.courseCode}</span>
                  <span>•</span>
                  <span>{course.credits} Credits</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Link href={"/student/courses-registration"}>
          <Card className="bg-muted/20 border-dashed border-2 flex flex-col items-center justify-center p-6 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors cursor-pointer min-h-[140px] h-full">
            <BookOpen className="w-8 h-8 mb-2 opacity-50" />
            <span className="font-medium">Register New Course</span>
          </Card>
        </Link>
      </div>
    </div>
  );
}