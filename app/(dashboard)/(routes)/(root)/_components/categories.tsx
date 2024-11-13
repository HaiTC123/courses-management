"use client";

import { CategoryItem } from "./category-item";

export interface CategoriesProps {
  items: {
    label: string;
    value: string;
  }[];
  onSelect: (value: string) => void;
}

export const Categories = ({ items, onSelect }: CategoriesProps) => {
  return (
    <div className="flex items-center overflow-x-auto gap-x-2">
      {items.map((item, idx: number) => (
        <CategoryItem
          key={idx}
          label={item.label}
          value={item.value}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};
