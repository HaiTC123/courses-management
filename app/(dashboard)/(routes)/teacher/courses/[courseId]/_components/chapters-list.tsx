"use client";

import { useState } from "react";

interface Chapter {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  isPublished: boolean;
}

interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const ChaptersList = ({
  items,
  onEdit,
  onReorder,
}: ChaptersListProps) => {
  return <div>Chapters List</div>;
};
