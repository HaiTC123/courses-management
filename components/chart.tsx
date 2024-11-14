"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function BarChartComponent({
  chartData,
  chartConfig,
}: {
  chartData: any[];
  chartConfig: ChartConfig;
}) {
  return (
    <ChartContainer
      config={chartConfig}
      className="w-[800px] h-[500px] mx-auto"
    >
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
        <Bar
          dataKey="enrollmentCount"
          fill="var(--color-enrollmentCount)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
