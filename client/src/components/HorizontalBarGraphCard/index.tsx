"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Prior", votes: 186 },
  { month: "Jean Wyllys", votes: 305 },
  { month: "Bambam", votes: 237 },
];

const chartConfig = {
  votes: {
    label: "Votos",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function HorizontalBarGraphCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Votos totais - Grafico barras</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} layout="vertical">
            <XAxis type="number" dataKey="votes" />
            <YAxis
              dataKey="month"
              type="category"
              // tickLine={true}
              // tickMargin={0}
              // axisLine={true}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="votes" fill="var(--chart-1)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
