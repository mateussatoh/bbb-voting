"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { time: "14:01", desktop: 100, mobile: 50 },
  { time: "14:02", desktop: 110, mobile: 60 },
  { time: "14:03", desktop: 120, mobile: 70 },
  { time: "14:04", desktop: 130, mobile: 80 },
  { time: "14:05", desktop: 140, mobile: 90 },
  { time: "14:06", desktop: 150, mobile: 100 },
  { time: "14:07", desktop: 160, mobile: 110 },
  { time: "14:08", desktop: 170, mobile: 120 },
  { time: "14:09", desktop: 180, mobile: 130 },
  { time: "14:10", desktop: 190, mobile: 140 },
  { time: "14:11", desktop: 200, mobile: 150 },
  { time: "14:12", desktop: 210, mobile: 160 },
  { time: "14:13", desktop: 220, mobile: 170 },
  { time: "14:14", desktop: 230, mobile: 180 },
  { time: "14:15", desktop: 240, mobile: 190 },
  { time: "14:16", desktop: 250, mobile: 200 },
  { time: "14:17", desktop: 260, mobile: 210 },
  { time: "14:18", desktop: 270, mobile: 220 },
  { time: "14:19", desktop: 280, mobile: 230 },
  { time: "14:20", desktop: 290, mobile: 240 },
  { time: "14:21", desktop: 300, mobile: 250 },
  { time: "14:22", desktop: 310, mobile: 260 },
  { time: "14:23", desktop: 320, mobile: 270 },
  { time: "14:24", desktop: 330, mobile: 280 },
  { time: "14:25", desktop: 340, mobile: 290 },
  { time: "14:26", desktop: 350, mobile: 300 },
  { time: "14:27", desktop: 360, mobile: 310 },
  { time: "14:28", desktop: 370, mobile: 320 },
  { time: "14:29", desktop: 380, mobile: 330 },
  { time: "14:30", desktop: 390, mobile: 340 },
  { time: "14:31", desktop: 400, mobile: 350 },
  { time: "14:32", desktop: 410, mobile: 360 },
  { time: "14:33", desktop: 420, mobile: 370 },
  { time: "14:34", desktop: 430, mobile: 380 },
  { time: "14:35", desktop: 440, mobile: 390 },
  { time: "14:36", desktop: 450, mobile: 400 },
  { time: "14:37", desktop: 460, mobile: 410 },
  { time: "14:38", desktop: 470, mobile: 420 },
  { time: "14:39", desktop: 480, mobile: 430 },
  { time: "14:40", desktop: 490, mobile: 440 },
  { time: "14:41", desktop: 500, mobile: 450 },
  { time: "14:42", desktop: 510, mobile: 460 },
  { time: "14:43", desktop: 520, mobile: 470 },
  { time: "14:44", desktop: 530, mobile: 480 },
  { time: "14:45", desktop: 540, mobile: 490 },
  { time: "14:46", desktop: 550, mobile: 500 },
  { time: "14:47", desktop: 560, mobile: 510 },
  { time: "14:48", desktop: 570, mobile: 520 },
  { time: "14:49", desktop: 580, mobile: 530 },
  { time: "14:50", desktop: 590, mobile: 540 },
  { time: "14:51", desktop: 600, mobile: 550 },
  { time: "14:52", desktop: 610, mobile: 560 },
  { time: "14:53", desktop: 620, mobile: 570 },
  { time: "14:54", desktop: 630, mobile: 580 },
  { time: "14:55", desktop: 640, mobile: 590 },
  { time: "14:56", desktop: 650, mobile: 600 },
  { time: "14:57", desktop: 660, mobile: 610 },
  { time: "14:58", desktop: 670, mobile: 620 },
  { time: "14:59", desktop: 680, mobile: 630 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function OverviewGraphCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Votos por minuto</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="desktop"
              stackId="a"
              fill="var(--chart-2)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="mobile"
              stackId="a"
              fill="var(--chart-1)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
