"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, FileCheck2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfessorDashboard() {
  const [profInfo, setProfInfo] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMockData = () => {
      setTimeout(() => {
        setProfInfo({ fullName: "Dr. Ahmed Ibrahim" });
        setStats({
          totalCourses: 3,
          totalStudents: 145,
          pendingGrades: 2,
        });
        setIsLoading(false);
      }, 1500);
    };

    loadMockData();
  }, []);

  return (
    <div className="animate-in fade-in duration-500 p-4 mx-auto">
      {/* Skeleton Loading */}
      {isLoading && (
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 rounded-xl w-full" />
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && profInfo && (
        <div>
          <div className="w-fit mb-10 animate-in slide-in-from-bottom-2 duration-500">
            <span className="text-primary font-medium text-lg tracking-tight">
              Welcome back,
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-1 capitalize">
              {profInfo.fullName}
            </h1>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Stats Cards */}
            <Card className="bg-muted/40 border-muted w-full">
              <CardHeader className="pb-2">
                <BookOpen className="w-8 h-8 text-primary" />
              </CardHeader>
              <CardContent className="flex gap-2 items-center justify-end">
                <div className="text-6xl">{stats?.totalCourses}</div>
                <CardDescription className="flex items-center gap-2 text-lg">
                  Active Courses
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-muted/40 border-muted w-full">
              <CardHeader className="pb-2">
                <Users className="w-8 h-8 text-primary" />
              </CardHeader>
              <CardContent className="flex gap-2 items-center justify-end">
                <div className="text-6xl">{stats?.totalStudents}</div>
                <CardDescription className="flex items-center gap-2 text-lg">
                  Total Students
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-muted/40 border-muted w-full">
              <CardHeader className="pb-2">
                <FileCheck2 className="w-8 h-8 text-primary" />
              </CardHeader>
              <CardContent className="flex gap-2 items-center justify-end">
                <div className="text-6xl">{stats?.pendingGrades}</div>
                <CardDescription className="flex items-center gap-2 text-lg">
                  Pending Grades
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}