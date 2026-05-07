"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Lock, CheckCircle2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface Course {
  id: string;
  name: string;
  credits: number;
  prereqMet: boolean;
  prereqName?: string;
  type: string;
}

interface CourseCatalogProps {
  catalog: Course[];
  selectedCourses: Course[];
  onAddCourse: (course: Course) => void;
}

export function CourseCatalog({
  catalog,
  selectedCourses,
  onAddCourse,
}: CourseCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = catalog.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex-1 flex flex-col gap-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search by course code or name..."
          className="pl-8 pr-4 py-4.5 text-base bg-muted/50 border-primary/5 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCourses.map((course) => {
          const isSelected = selectedCourses.some((c) => c.id === course.id);

          return (
            <Card
              key={course.id}
              className={`relative transition-all duration-300 ${
                !course.prereqMet
                  ? "opacity-60 bg-muted/20 border-dashed"
                  : isSelected
                    ? "border-primary shadow-sm bg-primary/5"
                    : "hover:border-primary/50"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge
                    variant="secondary"
                    className="text-[10px] uppercase tracking-wider"
                  >
                    {course.type}
                  </Badge>
                  {!course.prereqMet ? (
                    <div className="group relative">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="w-8 h-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
                            <Lock size={16} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>You must pass {course.prereqName}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  ) : isSelected ? (
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                      <CheckCircle2 size={18} />
                    </div>
                  ) : (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => onAddCourse(course)}
                    >
                      <Plus size={18} />
                    </Button>
                  )}
                </div>
                <CardTitle className="text-lg leading-tight">
                  {course.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
                  <span>{course.id}</span>
                  <span>•</span>
                  <span>{course.credits} Cr</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}