"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ListChecks, BookOpen, Trash2, Send } from "lucide-react";
import { Course } from "./CourseCatalog"; // استيراد الـ Interface

interface RegistrationCartProps {
  selectedCourses: Course[];
  currentCredits: number;
  maxCredits: number;
  onRemoveCourse: (courseId: string) => void;
}

export function RegistrationCart({
  selectedCourses,
  currentCredits,
  maxCredits,
  onRemoveCourse,
}: RegistrationCartProps) {
  return (
    <div className="w-full lg:w-87.5 xl:w-100">
      <Card className="sticky top-4 bg-muted/30 border-muted">
        <CardHeader className="pb-4 border-b border-muted/50">
          <CardTitle className="flex items-center gap-2 text-xl">
            <ListChecks size={20} className="text-primary" />
            Your Selection
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6 pb-2">
          {/* Credit Load Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium">Academic Load</span>
              <span className="font-mono font-medium">
                <span
                  className={
                    currentCredits > maxCredits
                      ? "text-destructive"
                      : "text-foreground"
                  }
                >
                  {currentCredits}
                </span>
                <span className="text-muted-foreground">
                  {" "}
                  / {maxCredits} Hrs
                </span>
              </span>
            </div>
            <Progress
              value={(currentCredits / maxCredits) * 100}
              className={`h-2 ${
                currentCredits === maxCredits ? "[&>div]:bg-orange-500" : ""
              }`}
            />
          </div>

          {/* Selected Courses List */}
          <div className="space-y-3 min-h-50 overflow-y-auto pr-2">
            {selectedCourses.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-10 opacity-60">
                <BookOpen size={40} className="mb-3" />
                <p className="text-sm">No courses selected yet.</p>
              </div>
            ) : (
              selectedCourses.map((course) => (
                <div
                  key={course.id}
                  className="group flex justify-between items-center p-3 rounded-lg bg-background border border-muted shadow-sm animate-in slide-in-from-right-2"
                >
                  <div>
                    <h4 className="text-sm font-bold font-mono text-foreground">
                      {course.id}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {course.name}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onRemoveCourse(course.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
        <CardFooter className="mx-auto border-t border-muted/50">
          <Button
            className="w-full"
            size={"lg"}
            disabled={selectedCourses.length === 0}
          >
            <Send className="w-2 h-2 mr-2" />
            Submit to Advisor
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}