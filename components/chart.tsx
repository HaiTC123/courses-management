"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts";

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
  formatLabel,
}: {
  chartData: any[];
  chartConfig: ChartConfig;
  title?: string;
  className?: string;
  formatLabel?: (value: number) => string;
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
          />
          <YAxis domain={[0, 'dataMax + 2']} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          {keys.map((key, idx) => (
            <Bar
              key={idx}
              dataKey={key}
              fill={chartConfig[key].color}
              radius={4}
            >
              <LabelList dataKey={key} position="top" formatter={formatLabel} />
            </Bar>
          ))}
        </BarChart>
      </ChartContainer>
    </>
  );
}
