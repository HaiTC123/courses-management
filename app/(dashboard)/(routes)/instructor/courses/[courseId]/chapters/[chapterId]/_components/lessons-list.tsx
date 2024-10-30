"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grid, Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// interface Lesson {
//   id: string;
//   title: string;
//   description: string;
//   videoUrl: string;
//   isPublished: boolean;
//   isFree: boolean;
// }

interface LessonsListProps {
  items: any[];
  onReorder: (updateData: any[]) => void;
  onEdit: (id: string) => void;
}

export const LessonsList = ({ items, onEdit, onReorder }: LessonsListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [lessons, setLessons] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setLessons(items);
  }, [items]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination || type === "droppable") {
      return;
    }

    const items = Array.from(lessons);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    const startIndex = Math.min(source.index, destination.index);
    const endIndex = Math.max(source.index, destination.index);

    const updatedLessons = items.slice(startIndex, endIndex + 1);

    setLessons(items);

    const bulkUpdateData = updatedLessons.map((lesson, index) => ({
      id: lesson.id,
      lessonTitle: lesson.lessonTitle,
      lessonDescription: lesson.lessonDescription,
      durationMinutes: lesson.durationMinutes,
      chapterId: lesson.chapterId,
      lessonOrder: items.findIndex((item) => item.id === lesson.id) + 1,
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="chapters">
        {(provider) => (
          <div {...provider.droppableProps} ref={provider.innerRef}>
            {lessons.map((lesson, index) => (
              <Draggable
                key={lesson.id.toString()}
                draggableId={lesson.id.toString()}
                index={index}
              >
                {(provider) => (
                  <div
                    {...provider.draggableProps}
                    ref={provider.innerRef}
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      lesson.isPublished &&
                        "border-sky-600 bg-sky-100 text-sky-700"
                    )}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        lesson.isPublished &&
                          "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provider.dragHandleProps}
                    >
                      <Grip className="w-5 h-5" />
                    </div>
                    {lesson.lessonTitle}
                    <div className="flex items-center pr-2 ml-auto gap-x-2 ">
                      {/* {lesson.isFree && <Badge>Free</Badge>}
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          lesson.isPublished && "bg-sky-700"
                        )}
                      >
                        {lesson.isPublished ? "Published" : "Draft"}
                      </Badge> */}
                      <Pencil
                        className="w-4 h-4 transition cursor-pointer hover:opacity-75"
                        onClick={() => onEdit(lesson.id)}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provider.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
