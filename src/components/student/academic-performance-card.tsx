"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, GraduationCap } from "lucide-react";

export function AcademicPerformanceCard({ studentData }: { studentData: any }) {
  const isDismissed = studentData.status === "dismissed";

  return (
    <Card className="bg-muted/40 border-muted relative overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <GraduationCap className="w-5 h-5 text-primary" />
          Academic Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mt-2">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Cumulative GPA</p>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-mono font-bold tracking-tighter text-primary">
                {studentData.cgpa.toFixed(2)}
              </span>
              <span className="text-muted-foreground font-mono mb-1">
                / 4.00
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge
                variant={isDismissed ? "destructive" : "default"}
                className="flex gap-1"
              >
                {isDismissed ? (
                  <AlertCircle className="w-3 h-3" />
                ) : (
                  <CheckCircle2 className="w-3 h-3" />
                )}
                {studentData.status}
              </Badge>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">
                Allowed Load
              </span>
              <span className="font-mono font-medium">
                {studentData.maxCreditsAllowed} Credits
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}