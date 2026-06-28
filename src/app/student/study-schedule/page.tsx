"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScheduleTimeline } from "@/components/student/study-timeline";
import { AlertCircle, CircleAlert } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getStudentCourses,
  getStudentInformation,
} from "@/server/studentServer/studentActions";

const WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

export default function StudySchedule() {
  const [scheduleData, setScheduleData] = useState<Record<string, any[]>>({});
  const [studentInfo, setStudentInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const student = await getStudentInformation();

        if (!student || student.success === false) {
          setError(student?.message || "Failed to load student identity");
          setIsLoading(false);
          return;
        }

        setStudentInfo(student);

        const response = await getStudentCourses(student.id);

        if (response && response.success === false) {
          setError(response.message || "Failed to load schedule");
          setIsLoading(false);
          return;
        }

        const schedule = response?.data || response || {};
        setScheduleData(schedule);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unexpected error occurred",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const currentDayIndex = new Date().getDay();
  const defaultTab =
    currentDayIndex >= 0 && currentDayIndex <= 4
      ? WEEK_DAYS[currentDayIndex]
      : "Sunday";

  return (
    <div className="p-4 animate-in fade-in duration-500">
      {/* 1. Skeleton Loading State */}
      {isLoading && (
        <div className="w-full flex flex-col">
          {/* Header Skeleton */}
          <div className="mb-8 space-y-2 mt-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Study Schedule
            </h1>
            <Skeleton className="h-5 w-64" />
          </div>

          {/* Tabs Skeleton */}
          <Skeleton className="h-10 w-full mb-8 rounded-lg" />

          <div className="space-y-8 pl-6 border-l-2 border-muted/50 ml-2 mt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative w-full">
                <Skeleton className="absolute -left-[33px] top-2 w-4 h-4 rounded-full" />
                <Skeleton className="h-[120px] w-full max-w-3xl rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Error State */}
      {error && !isLoading && (
        <div className="flex items-center gap-2 p-4 mb-8 text-destructive bg-destructive/10 rounded-lg border border-destructive/20 mt-8">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      {/* 3. Main Content */}
      {!isLoading && !error && (
        <div className="animate-in slide-in-from-bottom-4 duration-700">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Study Schedule
            </h1>
            <p className="text-muted-foreground mt-1 capitalize">
              {scheduleData?.term} {scheduleData?.year} •{" "}
              {studentInfo?.programName}
            </p>
          </div>

          <Tabs defaultValue={defaultTab}>
            <TabsList className="grid w-full grid-cols-5 mb-8 bg-muted/50 rounded-lg border">
              {WEEK_DAYS.map((day) => (
                <TabsTrigger
                  key={day}
                  value={day}
                  className="text-xs sm:text-sm data-[state=active]:shadow-sm rounded-md transition-all"
                  disabled={
                    !scheduleData[day] || scheduleData[day].length === 0
                  }
                >
                  <span className="hidden sm:inline">{day}</span>
                  <span className="sm:hidden">{day.substring(0, 3)}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {WEEK_DAYS.map((day) => (
              <TabsContent
                key={day}
                value={day}
                className="focus-visible:outline-none"
              >
                {scheduleData[day] && scheduleData[day].length > 0 ? (
                  <ScheduleTimeline sessions={scheduleData[day]} day={day} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-muted-foreground border-2 border-dashed border-muted rounded-xl bg-muted/10 animate-in fade-in duration-500">
                    <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                      <CircleAlert className="w-8 h-8 opacity-50" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-1">
                      No Classes Scheduled {day}
                    </h3>
                    <p className="text-sm text-center max-w-sm">
                      Please check back later or contact your academic advisor
                      for more information.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}
    </div>
  );
}