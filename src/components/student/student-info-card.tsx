"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IdCard } from "lucide-react";

export function StudentInfoCard({ studentData }: { studentData: any }) {
  return (
    <Card className="bg-muted/40 border-muted">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <IdCard className="w-5 h-5 text-primary" />
          Student Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-2">
          <div>
            <p className="text-sm text-muted-foreground">Academic ID</p>
            <p className="text-xl font-mono font-medium">
              {studentData.academicId}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Program</p>
            <p className="font-medium">{studentData.program}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Academic Level</p>
            <Badge variant="secondary" className="mt-1">
              {studentData.level}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}