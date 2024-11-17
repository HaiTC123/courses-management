"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface CategoryItemProps {
  label: string;
  value?: string;
  onSelect: (value: string, selected: boolean) => void;
}

export const CategoryItem = ({ label, value, onSelect }: CategoryItemProps) => {
  const [toggle, setToggle] = useState(false);

  return (
    <button
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
        toggle && "border-sky-700 bg-sky-200 text-sky-800"
      )}
      onClick={() => {
        onSelect(value || "", !toggle);
        setToggle(!toggle);
      }}
    >
      <div className="truncate">{label}</div>
    </button>
  );
};
