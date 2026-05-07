"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, GraduationCap, Award } from "lucide-react";
import { SemesterGradesTable } from "@/components/student/grades-table";

// --- Mock Grades Data Based on SRS ---
const studentSummary = {
  name: "Nour Aldin Mohamed",
  cgpa: 3.45,
  totalCredits: 95,
};

const academicHistory = [
  {
    semester: "Spring 2026",
    sgpa: 3.6,
    termCredits: 18,
    courses: [
      {
        id: "CSE211",
        name: "Data Structures",
        credits: 3,
        work: 35,
        final: 55,
        total: 90,
        grade: "A-",
        points: 3.7,
      },
      {
        id: "SWE211",
        name: "Software Engineering",
        credits: 3,
        work: 38,
        final: 50,
        total: 88,
        grade: "B+",
        points: 3.3,
      },
      {
        id: "MAT204",
        name: "Linear Algebra",
        credits: 3,
        work: 40,
        final: 58,
        total: 98,
        grade: "A+",
        points: 4.0,
      },
      {
        id: "HUM102",
        name: "Technical Writing",
        credits: 2,
        work: 30,
        final: 45,
        total: 75,
        grade: "C+",
        points: 2.3,
      },
    ],
  },
  {
    semester: "Fall 2025",
    sgpa: 3.3,
    termCredits: 17,
    courses: [
      {
        id: "CCE101",
        name: "Introduction to CS",
        credits: 3,
        work: 32,
        final: 50,
        total: 82,
        grade: "B-",
        points: 2.7,
      },
      {
        id: "MAT101",
        name: "Calculus I",
        credits: 3,
        work: 35,
        final: 55,
        total: 90,
        grade: "A-",
        points: 3.7,
      },
      {
        id: "PHY101",
        name: "Physics I",
        credits: 4,
        work: 30,
        final: 40,
        total: 70,
        grade: "C-",
        points: 1.7,
      },
      {
        id: "ENG101",
        name: "English Language",
        credits: 2,
        work: 38,
        final: 58,
        total: 96,
        grade: "A",
        points: 4.0,
      },
    ],
  },
];

export default function Grades() {
  return (
    <div className="p-4 animate-in fade-in duration-500">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Academic Grades
          </h1>
          <p className="text-muted-foreground">
            View your semester grades and unofficial transcript.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Unofficial Transcript
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Card className="bg-muted/30 border-muted">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Cumulative GPA
              </p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-mono font-bold tracking-tighter text-primary">
                  {studentSummary.cgpa.toFixed(2)}
                </span>
                <span className="text-muted-foreground font-mono mb-1">
                  / 4.00
                </span>
              </div>
            </div>
          </CardContent>
    </Card>

        <Card className="bg-muted/30 border-muted">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Earned Credits
              </p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-mono font-bold tracking-tighter text-primary">
                  {studentSummary.totalCredits}
                </span>
                <span className="text-muted-foreground font-mono mb-1">
                  / 172 Cr. Hrs
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        {academicHistory.map((term, index) => (
          <SemesterGradesTable key={index} term={term} />
        ))}
      </div>
    </div>
  );
}