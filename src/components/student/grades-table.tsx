"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText } from "lucide-react";


export interface CourseGrade {
  id: string;
  name: string;
  credits: number;
  work: number;
  final: number;
  total: number;
  grade: string;
  points: number;
}

export interface SemesterRecord {
  semester: string;
  sgpa: number;
  termCredits: number;
  courses: CourseGrade[];
}

export function SemesterGradesTable({ term }: { term: SemesterRecord }) {
  const getGradeBadgeColor = (grade: string) => {
    if (grade.startsWith("A"))
      return "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-500/20";
    if (grade.startsWith("B"))
      return "bg-blue-500/15 text-blue-600 hover:bg-blue-500/25 border-blue-500/20";
    if (grade.startsWith("C"))
      return "bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/25 border-yellow-500/20";
    if (grade.startsWith("D"))
      return "bg-orange-500/15 text-orange-600 hover:bg-orange-500/25 border-orange-500/20";
    if (grade === "F")
      return "bg-destructive/15 text-destructive hover:bg-destructive/25 border-destructive/20";
    return "default";
  };

  return (
    <Card className="border-muted shadow-sm overflow-hidden">
      {/* Semester Header */}
      <CardHeader className="bg-muted/20 border-b border-muted pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <CardTitle className="text-xl">{term.semester}</CardTitle>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm font-normal">
              {term.termCredits} Credits
            </Badge>
            <Badge
              variant="secondary"
              className="text-sm font-mono font-medium"
            >
              SGPA: {term.sgpa.toFixed(2)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      {/* Grades Table */}
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/10">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-25 pl-6 font-mono text-xs">
                  CODE
                </TableHead>
                <TableHead className="min-w-50">Course Name</TableHead>
                <TableHead className="text-center text-xs">Cr.</TableHead>
                <TableHead className="text-center text-xs hidden sm:table-cell">
                  Work (40)
                </TableHead>
                <TableHead className="text-center text-xs hidden sm:table-cell">
                  Final (60)
                </TableHead>
                <TableHead className="text-center text-xs">Total</TableHead>
                <TableHead className="text-center text-xs">Points</TableHead>
                <TableHead className="text-right pr-6">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {term.courses.map((course) => (
                <TableRow
                  key={course.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="pl-6 font-mono text-sm text-muted-foreground">
                    {course.id}
                  </TableCell>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    {course.credits}
                  </TableCell>
                  <TableCell className="text-center hidden sm:table-cell text-muted-foreground">
                    {course.work}
                  </TableCell>
                  <TableCell className="text-center hidden sm:table-cell text-muted-foreground">
                    {course.final}
                  </TableCell>
                  <TableCell className="text-center font-mono font-medium">
                    {course.total}
                  </TableCell>
                  <TableCell className="text-center font-mono text-muted-foreground">
                    {course.points.toFixed(1)}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Badge
                      variant="outline"
                      className={`font-mono font-bold text-sm ${getGradeBadgeColor(
                        course.grade,
                      )}`}
                    >
                      {course.grade}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}