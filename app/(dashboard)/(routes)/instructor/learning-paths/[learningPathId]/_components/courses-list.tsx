"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface CoursesListProps {
  items: any[];
  onReorder: (updateData: any[]) => void;
  onEdit: (id: string) => void;
}

export const CoursesList = ({ items, onEdit, onReorder }: CoursesListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [courses, setCourses] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setCourses(items);
  }, [items]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination || type === "droppable") {
      return;
    }

    const items = Array.from(courses);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    const startIndex = Math.min(source.index, destination.index);
    const endIndex = Math.max(source.index, destination.index);

    const updatedCourses = items.slice(startIndex, endIndex + 1);

    setCourses(items);

    const bulkUpdateData = updatedCourses.map((course, index) => ({
      id: course.id,
      courseTitle: course.courseTitle,
      courseDescription: course.courseDescription,
      courseId: course.courseId,
      courseOrder: items.findIndex((item) => item.id === course.id) + 1,
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
            {courses.map((course, index) => (
              <Draggable
                key={course.id.toString()}
                draggableId={course.id.toString()}
                index={index}
              >
                {(provider) => (
                  <div
                    {...provider.draggableProps}
                    ref={provider.innerRef}
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      course.isPublished &&
                        "border-sky-600 bg-sky-100 text-sky-700"
                    )}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        course.isPublished &&
                          "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provider.dragHandleProps}
                    >
                      <Grip className="w-5 h-5" />
                    </div>
                    {course.title}
                    <div className="flex items-center pr-2 ml-auto gap-x-2 ">
                      {/* {course.isFree && <Badge>Free</Badge>} */}
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
                        onClick={() => onEdit(course.id)}
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
