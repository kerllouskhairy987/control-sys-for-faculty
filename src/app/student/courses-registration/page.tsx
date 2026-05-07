"use client";

import { useState } from "react";
import { CourseCatalog, Course } from "@/components/student/course-catalog";
import { RegistrationCart } from "@/components/student/registration-cart";

// --- Mock Data ---
const STUDENT_LOAD = {
  maxCredits: 21,
};

const COURSE_CATALOG: Course[] = [
  {
    id: "CCE301",
    name: "Artificial Intelligence",
    credits: 3,
    prereqMet: true,
    type: "Core",
  },
  {
    id: "CCE405",
    name: "Computer Vision",
    credits: 3,
    prereqMet: false,
    prereqName: "CCE301",
    type: "Core",
  },
  {
    id: "SWE211",
    name: "Software Engineering",
    credits: 3,
    prereqMet: true,
    type: "Core",
  },
  {
    id: "MAT204",
    name: "Linear Algebra",
    credits: 3,
    prereqMet: true,
    type: "Requirement",
  },
  {
    id: "HUM102",
    name: "Technical Writing",
    credits: 2,
    prereqMet: true,
    type: "Elective",
  },
  {
    id: "PRJ401",
    name: "Graduation Project 1",
    credits: 4,
    prereqMet: true,
    type: "Project",
  },
];

export default function CoursesRegistration() {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  const currentCredits = selectedCourses.reduce(
    (sum, course) => sum + course.credits,
    0,
  );
  const maxCredits = STUDENT_LOAD.maxCredits;

  const handleAddCourse = (course: Course) => {
    if (!course.prereqMet) return;
    if (currentCredits + course.credits > maxCredits) {
      alert("Sorry, you reached the maximum credit load for this semester.");
      return;
    }
    if (!selectedCourses.find((c) => c.id === course.id)) {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleRemoveCourse = (courseId: string) => {
    setSelectedCourses(selectedCourses.filter((c) => c.id !== courseId));
  };

  return (
    <div className="p-4 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Courses Registration
        </h1>
        <p className="text-muted-foreground">
          Select your courses for the current semester.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <CourseCatalog
          catalog={COURSE_CATALOG}
          selectedCourses={selectedCourses}
          onAddCourse={handleAddCourse}
        />

        <RegistrationCart
          selectedCourses={selectedCourses}
          currentCredits={currentCredits}
          maxCredits={maxCredits}
          onRemoveCourse={handleRemoveCourse}
        />
      </div>
    </div>
  );
}