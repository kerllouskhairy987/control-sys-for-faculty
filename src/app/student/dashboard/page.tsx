"use client";

import { ChartRadialText } from "@/components/student/radial-chart";
import { StudentInfoCard } from "@/components/student/student-info-card";
import { AcademicPerformanceCard } from "@/components/student/academic-preformance-card";
import { CurrentSemesterCourses } from "@/components/student/current-semester";


// --- Mock Data ---
const data = {
  name: "Nour Aldin Mohamed",
  academicId: "202500123",
  program: "Intelligent Systems Engineering",
  level: "Junior (Level 2)",
  cgpa: 3.45,
  status: "Good Standing",
  completedCredits: 95,
  requiredCredits: 172,
  allowedLoad: 21,
};

const currentCourses = [
  {
    code: "CCE301",
    name: "Artificial Intelligence",
    credits: 3,
    time: "Sunday 09:00 AM",
  },
  {
    code: "SWE211",
    name: "Software Engineering",
    credits: 3,
    time: "Monday 11:30 AM",
  },
  {
    code: "MAT204",
    name: "Linear Algebra",
    credits: 3,
    time: "Wednesday 01:00 PM",
  },
];

export default function Student() {
  const progressPercentage =
    (data.completedCredits / data.requiredCredits) * 100;

  return (
    <section id="student-home" className="p-4 animate-in fade-in duration-500">
      {/* Header */}
      <div className="w-fit mb-4">
        <span className="text-primary font-medium text-lg tracking-tight">
          Welcome back,
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-1">
          {data.name}
        </h1>
      </div>

      {/* Cards Section */}
      <div className="flex flex-1 flex-col gap-4 py-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {/* Card 1: Student Identity */}
          <StudentInfoCard studentData={data} />

          {/* Card 2: Academic Performance */}
          <AcademicPerformanceCard studentData={data} />

          {/* Card 3: Degree Progress (Radial Chart Component) */}
          <ChartRadialText
            studentData={data}
            progressPercentage={progressPercentage}
          />
        </div>
      </div>

      {/* Current Semester Schedule */}
      <CurrentSemesterCourses courses={currentCourses} />
    </section>
  );
}