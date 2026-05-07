"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScheduleTimeline } from "@/components/student/study-timeline";

// --- Mock Schedule Data based on Engineering Courses ---
const scheduleData = {
  Sunday: [
    {
      id: 1,
      time: "08:30 AM - 10:00 AM",
      code: "CSE211",
      title: "Data Structures",
      type: "Lecture",
      location: "Main Hall A",
      instructor: "Dr. Ahmed Hassan",
    },
    {
      id: 2,
      time: "10:30 AM - 12:30 PM",
      code: "SWE211",
      title: "Software Engineering",
      type: "Lab",
      location: "Computer Lab 3",
      instructor: "Eng. Mona Ali",
    },
  ],
  Monday: [
    {
      id: 3,
      time: "09:00 AM - 11:00 AM",
      code: "MAT204",
      title: "Linear Algebra",
      type: "Lecture",
      location: "Hall B",
      instructor: "Dr. Sayed Mahmoud",
    },
    {
      id: 4,
      time: "11:30 AM - 01:00 PM",
      code: "CCE301",
      title: "Artificial Intelligence",
      type: "Lecture",
      location: "Hall C",
      instructor: "Dr. Youssef Omar",
    },
  ],
  Tuesday: [
    {
      id: 5,
      time: "08:30 AM - 10:30 AM",
      code: "CSE211",
      title: "Data Structures",
      type: "Section",
      location: "Room 402",
      instructor: "Eng. Karim Tarek",
    },
  ],
  Wednesday: [
    {
      id: 6,
      time: "10:00 AM - 12:00 PM",
      code: "SWE211",
      title: "Software Engineering",
      type: "Lecture",
      location: "Main Hall A",
      instructor: "Dr. Noha Samir",
    },
  ],
  Thursday: [
    {
      id: 7,
      time: "09:00 AM - 12:00 PM",
      code: "PRJ401",
      title: "Graduation Project 1",
      type: "Project",
      location: "Meeting Room 1",
      instructor: "Dr. Ahmed Hassan",
    },
  ],
};

const daysOfWeek = Object.keys(scheduleData);

export default function StudySchedule() {
  const currentDayIndex = new Date().getDay();
  const defaultTab =
    currentDayIndex >= 0 && currentDayIndex <= 4
      ? daysOfWeek[currentDayIndex]
      : "Sunday";

  return (
    <div className="p-4 animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Study Schedule
        </h1>
        <p className="text-muted-foreground">
          Fall 2026 • Intelligent Systems Engineering
        </p>
      </div>

      {/* Tabs for Days of the Week */}
      <Tabs defaultValue={defaultTab}>
        <TabsList className="grid w-full grid-cols-5 mb-8 bg-muted/50 rounded-lg border">
          {daysOfWeek.map((day) => (
            <TabsTrigger
              key={day}
              value={day}
              className="text-xs sm:text-sm data-[state=active]:shadow-sm rounded-md transition-all"
            >
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.substring(0, 3)}</span>{" "}
            </TabsTrigger>
          ))}
        </TabsList>

        {daysOfWeek.map((day) => (
          <TabsContent
            key={day}
            value={day}
            className="focus-visible:outline-none"
          >
            <ScheduleTimeline
              sessions={scheduleData[day as keyof typeof scheduleData]}
              day={day}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}