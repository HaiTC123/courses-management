import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import { LessonSidebarItem } from "./lesson-sidebar-item";

interface ChapterSidebarItemProps {
  label: string;
  lessons: any[];
  courseId: number;
  chapterId: number;
}

export const ChapterSidebarItem: React.FC<ChapterSidebarItemProps> = ({
  label,
  lessons,
  courseId,
  chapterId,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div className="flex items-center p-3 cursor-pointer">
          {isOpen ? (
            <MinusCircle className="w-4 h-4 mr-2" />
          ) : (
            <PlusCircle className="w-4 h-4 mr-2" />
          )}
          <h2 className="text-xl font-bold">{label}</h2>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="ml-5">
        {lessons
          ?.sort((a: any, b: any) => a.lessonOrder - b.lessonOrder)
          .map((lesson) => (
            <LessonSidebarItem
              key={lesson.id}
              label={lesson.lessonTitle}
              materials={lesson.materials}
              courseId={courseId}
              chapterId={chapterId}
              lessonId={lesson.id}
            />
          ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
