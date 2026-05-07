"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen } from "lucide-react";
import Link from "next/link";

export function CurrentSemesterCourses({ courses }: { courses: any[] }) {
  return (
    <div className="w-full py-4 mt-4">
      <h2 className="text-2xl font-bold mb-4 tracking-tight">
        Current Semester
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <Card
            key={index}
            className="bg-background border-muted hover:border-primary/50 transition-colors"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="font-mono text-xs">
                  {course.code}
                </Badge>
                <span className="text-xs text-muted-foreground font-medium">
                  {course.credits} Cr
                </span>
              </div>
              <CardTitle className="text-base mt-2 leading-tight">
                {course.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary/70" />
                <span>{course.time}</span>
              </div>
            </CardContent>
          </Card>
        ))}

        <Link href={"/student/coursesRegistration"}>
          <Card className="bg-muted/20 border-dashed border-2 flex flex-col items-center justify-center p-6 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors cursor-pointer min-h-[140px]">
            <BookOpen className="w-8 h-8 mb-2 opacity-50" />
            <span className="font-medium">Register New Course</span>
          </Card>
        </Link>
      </div>
    </div>
  );
}