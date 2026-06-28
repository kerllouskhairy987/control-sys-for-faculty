"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Plus,
  Lock,
  CheckCircle2,
  Users,
  Loader2,
  Clock,
  CircleAlert,
  CalendarDays,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface Course {
  offeringId: string;
  courseCode: string;
  courseTitle: string;
  credits: number;
  instructorName: string;
  availableSeats: number;
  isFull: boolean;
}

interface CourseCatalogProps {
  catalog: Course[];
  registeredStatuses: Record<string, string>;
  onAddCourse: (course: Course) => Promise<boolean>;
  periodInfo?: any;
}

export function CourseCatalog({
  catalog,
  registeredStatuses,
  onAddCourse,
  periodInfo,
}: CourseCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);

  const filteredCourses = catalog.filter(
    (course) =>
      course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleRegisterClick = async (course: Course) => {
    setLoadingCourseId(course.offeringId);
    await onAddCourse(course);
    setLoadingCourseId(null);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
      <div className="w-full lg:w-2/3 flex flex-col order-2 lg:order-1 gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search by course code or name..."
            className="pl-9 pr-4 py-4.5 text-base bg-muted/50 border-primary/5 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {filteredCourses.map((course) => {
            const rawStatus = registeredStatuses[course.offeringId];
            const status = rawStatus ? rawStatus.toLowerCase() : null;
            const isSelected = !!status;
            const isCurrentlyLoading = loadingCourseId === course.offeringId;

            return (
              <Card
                key={course.offeringId}
                className="relative transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge
                      variant="secondary"
                      className="text-[10px] capitalize tracking-wider"
                    >
                      Dr {course.instructorName}
                    </Badge>

                    {course.isFull && !isSelected ? (
                      <div className="group relative">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="w-8 h-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center cursor-not-allowed">
                              <Lock size={16} />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This course is fully booked.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    ) : status === "justadded" ? (
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center animate-in zoom-in duration-300">
                        <CheckCircle2 size={18} />
                      </div>
                    ) : status === "pending" ? (
                      <Badge
                        variant="outline"
                        className="bg-orange-500/10 text-orange-600 border-orange-500/20 flex items-center gap-1"
                      >
                        <Clock size={12} /> Pending
                      </Badge>
                    ) : status === "approved" ? (
                      <Badge
                        variant="outline"
                        className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 flex items-center gap-1"
                      >
                        <CheckCircle2 size={12} /> Approved
                      </Badge>
                    ) : (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => handleRegisterClick(course)}
                        disabled={isCurrentlyLoading}
                      >
                        {isCurrentlyLoading ? (
                          <Loader2
                            size={18}
                            className="animate-spin text-primary"
                          />
                        ) : (
                          <Plus size={18} />
                        )}
                      </Button>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight capitalize">
                    {course.courseTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between font-mono text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span>{course.courseCode}</span>
                      <span>•</span>
                      <span>{course.credits} Credits</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs bg-muted/50 px-2 py-1 rounded-md">
                      <Users size={14} className="opacity-70" />
                      <span>{course.availableSeats} Seats</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Card className="w-full lg:w-1/3 order-1 lg:order-2 sticky top-4 shrink-0 pt-0">
        <CardHeader className="flex items-center gap-2 text-primary bg-primary/5 py-3">
          <CircleAlert className="w-6 h-6 font-semibold" />
          <h3 className="text-lg font-semibold text-foreground">
            Registration Information
          </h3>
        </CardHeader>

        {periodInfo ? (
          <CardContent className="space-y-5">
            <p className="text-muted-foreground capitalize">
              {periodInfo.name}
            </p>
            <div>
              <p className="mb-1">Academic Term</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  {periodInfo.term} {periodInfo.year}
                </Badge>
              </div>
            </div>

            <div>
              <p className="mb-1">Starts On</p>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Badge variant="secondary" className="text-sm">
                  <CalendarDays className="w-4 h-4 text-primary/70" />
                  {formatDate(periodInfo.startDateUtc)}
                </Badge>
              </div>
            </div>

            <div>
              <p className="mb-1">Ends On</p>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Badge variant="secondary" className="text-sm">
                  <CalendarDays className="w-4 h-4 text-destructive/70" />
                  {formatDate(periodInfo.endDateUtc)}
                </Badge>
              </div>
            </div>
          </CardContent>
        ) : (
          <p className="text-sm text-muted-foreground leading-relaxed">
            Please check back later for course registration updates.
          </p>
        )}
      </Card>
    </div>
  );
}