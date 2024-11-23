"use client";

import { cn } from "@/lib/utils";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface ExamsListProps {
  items: any[];
  onReorder: (updateData: any[]) => void;
  onEdit: (id: string) => void;
}

export const ExamsList = ({ items, onEdit, onReorder }: ExamsListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [exams, setExams] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setExams(items);
  }, [items]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination || type === "droppable") {
      return;
    }

    const items = Array.from(exams);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    const startIndex = Math.min(source.index, destination.index);
    const endIndex = Math.max(source.index, destination.index);

    const updatedExams = items.slice(startIndex, endIndex + 1);

    setExams(items);

    const bulkUpdateData = updatedExams.map((exam, index) => ({
      id: exam.id,
      examTitle: exam.examTitle,
      examDescription: exam.examDescription,
      courseId: exam.courseId,
      examOrder: items.findIndex((item) => item.id === exam.id) + 1,
    }));

    console.log(bulkUpdateData);

    onReorder(bulkUpdateData);
  };

  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="chapters">
        {(provider) => (
          <div {...provider.droppableProps} ref={provider.innerRef}>
            {exams.map((exam, index) => (
              <Draggable
                key={exam.id.toString()}
                draggableId={exam.id.toString()}
                index={index}
              >
                {(provider) => (
                  <div
                    {...provider.draggableProps}
                    ref={provider.innerRef}
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      exam.isPublished &&
                        "border-sky-600 bg-sky-100 text-sky-700"
                    )}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        exam.isPublished && "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provider.dragHandleProps}
                    >
                      <Grip className="w-5 h-5" />
                    </div>
                    {exam.title}
                    <div className="flex items-center pr-2 ml-auto gap-x-2 ">
                      {/* {exam.isFree && <Badge>Free</Badge>} */}
                      {/* <Badge
                        className={cn(
                          "bg-slate-500",
                          chapter.isPublished && "bg-sky-700"
                        )}
                      >
                        {chapter.isPublished ? "Published" : "Draft"}
                      </Badge> */}
                      <Pencil
                        className="w-4 h-4 transition cursor-pointer hover:opacity-75"
                        onClick={() => onEdit(exam.id)}
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
