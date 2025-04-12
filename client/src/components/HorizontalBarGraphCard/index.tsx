"use client";

import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CandidateVotes } from "@/App";

const chartConfig = {
  votes: {
    label: "Votos",
  },
} satisfies ChartConfig;

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#a4de6c",
  "#d0ed57",
  "#8dd1e1",
];

export function HorizontalBarGraphCard({ data }: { data: CandidateVotes[] }) {
  function renderCustomizedLabel(props: any) {
    const { x, y, width, height, value, index } = props;

    const candidateData = data[index];

    return (
      <text
        x={x + width / 2}
        y={y + height / 2}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="30"
        className="font-bold"
      >
        {candidateData.candidateId}: {value}
      </text>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Votos totais - Grafico barras</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data} layout="vertical">
            <XAxis type="number" dataKey="votes" />
            <YAxis dataKey="candidateId" type="category" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="votes" radius={4} label={renderCustomizedLabel}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
