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

const chartConfig = {
  credits: {
    label: "Credits",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--primary))",
  },
};

// تم تعديل استقبال الـ Props ليكون { studentData, progressPercentage }
export function ChartRadialText({ studentData, progressPercentage }) {
  // حساب الزاوية بناءً على النسبة المئوية
  const chartEndAngle = 90 - progressPercentage * 3.6;

  // تجهيز الداتا ديناميكياً من الـ props
  const chartData = [
    {
      name: "completed",
      credits: studentData.completedCredits,
      fill: "var(--color-completed)",
    },
  ];

  return (
    <Card className="bg-muted/40 border-muted flex flex-col h-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg">Degree Progress</CardTitle>
        <CardDescription>
          Total credits required: {studentData.requiredCredits}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
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
                          {Math.round(progressPercentage)}%
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
      </CardContent>
    </Card>
  );
}