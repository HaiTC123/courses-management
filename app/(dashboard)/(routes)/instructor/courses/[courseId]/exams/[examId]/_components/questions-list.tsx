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

interface QuestionsListProps {
  items: any[];
  onReorder: (updateData: any[]) => void;
  onEdit: (id: string) => void;
}

export const QuestionsList = ({
  items,
  onEdit,
  onReorder,
}: QuestionsListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [questions, setQuestions] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setQuestions(items);
  }, [items]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination || type === "droppable") {
      return;
    }

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    const startIndex = Math.min(source.index, destination.index);
    const endIndex = Math.max(source.index, destination.index);

    const updatedQuestions = items.slice(startIndex, endIndex + 1);

    setQuestions(items);

    const bulkUpdateData = updatedQuestions.map((question, index) => ({
      id: question.id,
      content: question.content,
      correctAnswer: question.correctAnswer,
      options: question.options,
      examId: question.examId,
      orderNo: items.findIndex((item) => item.id === question.id) + 1,
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="chapters">
        {(provider) => (
          <div {...provider.droppableProps} ref={provider.innerRef}>
            {questions.map((question, index) => (
              <Draggable
                key={question.id.toString()}
                draggableId={question.id.toString()}
                index={index}
              >
                {(provider) => (
                  <div
                    {...provider.draggableProps}
                    ref={provider.innerRef}
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      question.isPublished &&
                        "border-sky-600 bg-sky-100 text-sky-700"
                    )}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        question.isPublished &&
                          "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provider.dragHandleProps}
                    >
                      <Grip className="w-5 h-5" />
                    </div>
                    Câu hỏi {index + 1}: {question.content}
                    <div className="flex items-center pr-2 ml-auto gap-x-2 ">
                      <Pencil
                        className="w-4 h-4 transition cursor-pointer hover:opacity-75"
                        onClick={() => onEdit(question.id)}
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
