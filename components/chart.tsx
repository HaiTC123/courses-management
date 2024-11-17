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
import { cn } from "@/lib/utils";

export function BarChartComponent({
  chartData,
  chartConfig,
  title,
  className,
}: {
  chartData: any[];
  chartConfig: ChartConfig;
  title?: string;
  className?: string;
}) {
  const keys = Object.keys(chartConfig);

  return (
    <>
      {title && (
        <div className="w-full text-lg font-semibold text-center">{title}</div>
      )}
      <ChartContainer config={chartConfig} className={cn("mx-auto", className)}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => ""}
            textDecoration="none"
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          {keys.map((key, idx) => (
            <Bar
              key={idx}
              dataKey={key}
              fill={chartConfig[key].color}
              radius={4}
            />
          ))}
        </BarChart>
      </ChartContainer>
    </>
  );
}
