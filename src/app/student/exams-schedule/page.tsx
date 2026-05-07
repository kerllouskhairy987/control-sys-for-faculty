"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {ExamTimeline} from "@/components/student/exam-timeline";

// --- Mock Exams Data ---
const examsData = {
  midterms: [
    {
      id: 1,
      date: "Sunday, Nov 15, 2026",
      time: "09:00 AM - 10:00 AM",
      code: "CSE211",
      title: "Data Structures",
      location: "Main Hall A",
      duration: "1 Hour",
      type: "Midterm",
    },
    {
      id: 2,
      date: "Tuesday, Nov 17, 2026",
      time: "11:30 AM - 12:30 PM",
      code: "SWE211",
      title: "Software Engineering",
      location: "Hall B",
      duration: "1 Hour",
      type: "Midterm",
    },
    {
      id: 3,
      date: "Thursday, Nov 19, 2026",
      time: "09:00 AM - 10:30 AM",
      code: "MAT204",
      title: "Linear Algebra",
      location: "Hall C",
      duration: "1.5 Hours",
      type: "Midterm",
    },
  ],
  finals: [],
};

export default function ExamsSchedule() {
  return (
    <div className="p-4 w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Exams Schedule
        </h1>
        <p className="text-muted-foreground">
          Fall 2026 • Intelligent Systems Engineering
        </p>
      </div>

      {/* Tabs for Midterms & Finals */}
      <Tabs defaultValue="midterms">
        <TabsList className="grid grid-cols-2 w-75 md:w-88 gap-4 mb-8 bg-muted/50 rounded-lg border">
          <TabsTrigger
            value="midterms"
            className="text-xs sm:text-sm data-[state=active]:shadow-sm rounded-md transition-all"
          >
            Midterm Exams
          </TabsTrigger>
          <TabsTrigger
            value="finals"
            className="text-xs sm:text-sm data-[state=active]:shadow-sm rounded-md transition-all"
          >
            Final Exams
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="midterms"
          className="focus-visible:outline-none w-full"
        >
          <ExamTimeline exams={examsData.midterms} />
        </TabsContent>

        <TabsContent
          value="finals"
          className="focus-visible:outline-none w-full"
        >
          <ExamTimeline exams={examsData.finals} />
        </TabsContent>
      </Tabs>
    </div>
  );
};