"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Award, AlertCircle, CircleAlert, Printer } from "lucide-react";
import { SemesterGradesTable } from "@/components/student/grades-table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // <-- استيراد الـ Skeleton
import {
  getStudentGrades,
  getStudentInformation,
} from "@/server/studentServer/studentActions";

export default function Grades() {
  const [summary, setSummary] = useState({ cgpa: 0 });
  const [academicHistory, setAcademicHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGradesData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const studentInfo = await getStudentInformation();

        if (!studentInfo || studentInfo.success === false) {
          setError(studentInfo?.message || "Failed to load student identity");
          setIsLoading(false);
          return;
        }

        const gradesResponse = await getStudentGrades(studentInfo.id);

        if (gradesResponse && gradesResponse.success === false) {
          setError(gradesResponse.message || "Failed to load grades");
          setIsLoading(false);
          return;
        }

        const historyArray = Array.isArray(gradesResponse)
          ? gradesResponse
          : gradesResponse?.data || gradesResponse?.academicHistory || [];

        setAcademicHistory(historyArray);

        setSummary({
          cgpa: gradesResponse?.cgpa || studentInfo?.cgpa || 0,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load grades");
      } finally {
        setIsLoading(false);
      }
    };

    loadGradesData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 print:p-0 animate-in fade-in duration-500">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Academic Grades
          </h1>
          <p className="text-muted-foreground print:hidden">
            View your semester grades.
          </p>
        </div>

        {!isLoading && !error && academicHistory.length > 0 && (
          <Button
            onClick={handlePrint}
            variant="outline"
            className="print:hidden flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print Transcript
          </Button>
        )}
      </div>

      {/* 1. Skeleton Loading State */}
      {isLoading && (
        <div className="w-full print:hidden">
          {/* Skeleton for GPA Card */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Skeleton className="w-full sm:w-1/2 lg:w-1/3 h-[100px] rounded-xl" />
          </div>

          <div className="space-y-8">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="w-full rounded-xl border border-muted bg-card"
              >
                {/* Table Header Skeleton */}
                <div className="p-4 border-b border-muted flex items-center justify-between bg-muted/20">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-5 h-5 rounded-md" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                </div>
                {/* Table Rows Skeleton */}
                <div className="p-0">
                  <div className="h-10 bg-muted/10 border-b border-muted" />
                  {[1, 2, 3, 4].map((j) => (
                    <div
                      key={j}
                      className="h-14 border-b border-muted flex items-center px-6 gap-4"
                    >
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-4 w-10 ml-auto" />
                      <Skeleton className="h-6 w-12 rounded-md" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Error State */}
      {error && !isLoading && (
        <div className="flex items-center gap-2 p-4 mb-8 text-destructive bg-destructive/10 rounded-lg border border-destructive/20 print:hidden mt-8">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      {/* 3. Main Content */}
      {!isLoading && !error && (
        <div className="animate-in slide-in-from-bottom-4 duration-700">
          {/* Summary Cards */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 print:mb-6">
            <Card className="bg-muted/30 border-muted w-full sm:w-1/2 lg:w-1/3 print:shadow-none print:border-2 print:border-gray-200">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary print:bg-transparent print:border print:border-gray-300">
                  <Award className="w-6 h-6 print:text-black" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1 print:text-black">
                    Cumulative GPA
                  </p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-mono font-bold tracking-tighter text-primary print:text-black">
                      {Number(summary.cgpa).toFixed(2)}
                    </span>
                    <span className="text-muted-foreground font-mono mb-1 print:text-gray-600">
                      / 4.00
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grades Tables */}
          {academicHistory.length > 0 ? (
            <div className="space-y-8 print:space-y-6">
              {academicHistory.map((term, index) => (
                <div key={index} className="print:break-inside-avoid">
                  <SemesterGradesTable term={term} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground border-2 border-dashed border-muted rounded-xl bg-muted/10 print:hidden">
              <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                <CircleAlert className="w-8 h-8 opacity-50" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">
                No Grades Available
              </h3>
              <p className="text-sm text-center max-w-sm">
                Please check back later or contact your academic advisor for
                more information.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}