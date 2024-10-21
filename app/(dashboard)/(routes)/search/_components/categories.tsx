"use client";

import { CategoryItem } from "./category-item";

export interface CategoriesProps {
  items: {
    id: string;
    name: string;
    value: string;
  }[];
}

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center overflow-x-auto gap-x-2">
      {items.map((item) => (
        <CategoryItem key={item.id} label={item.name} value={item.id} />
      ))}
    </div>
  );
};
