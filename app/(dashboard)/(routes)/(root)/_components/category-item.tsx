"use client";

import { cn } from "@/lib/utils";

interface CategoryItemProps {
  label: string;
  value?: string;
}

export const CategoryItem = ({ label, value }: CategoryItemProps) => {
  return (
    <button
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
        value === "all" && "border-sky-700 bg-sky-200 text-sky-800"
      )}
    >
      <div className="truncate">{label}</div>
    </button>
  );
};
