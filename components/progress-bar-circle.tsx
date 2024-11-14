"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
}

const CircularProgress = React.forwardRef<
  HTMLDivElement,
  CircularProgressProps
>(
  (
    {
      className,
      value,
      size = 100,
      strokeWidth = 4,
      showPercentage = true,
      ...props
    },
    ref
  ) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div
        className={cn("relative", className)}
        style={{ width: size, height: size }}
        ref={ref}
        {...props}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            className="stroke-muted-foreground"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            className="transition-all duration-300 ease-in-out stroke-primary"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
            {Math.round(value)}%
          </div>
        )}
      </div>
    );
  }
);

CircularProgress.displayName = "CircularProgress";

export default CircularProgress;
