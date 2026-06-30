"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { ActivityIcon } from "lucide-react";

const chartConfig = {
  credits: {
    label: "Credits",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--primary))",
  },
};

export function ChartRadialText({ studentData, progressPercentage } : { studentData: any; progressPercentage: number }) {
  const chartEndAngle = 90 - progressPercentage * 3.6;

  const chartData = [
    {
      name: "completed",
      credits: studentData.completedCredits || 0,
      fill: "var(--color-completed)",
    },
  ];

  return (
    <Card className="bg-muted/40 border-muted flex flex-col h-full">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ActivityIcon className="w-5 h-5 text-primary" />
          Credits Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-50"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={chartEndAngle}
            innerRadius={70}
            outerRadius={90}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[90, 70]}
            />
            <RadialBar dataKey="credits" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold font-mono"
                        >
                          {Math.round(progressPercentage || 0)}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xs"
                        >
                          Completed
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
        <CardDescription className="text-center">
          From {studentData.totalProgramCredits} Credits required
        </CardDescription>
      </CardContent>
    </Card>
  );
}