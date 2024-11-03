import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CourseSidebarItem } from "./course-sidebar-item";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import { ChapterSidebarItem } from "./chapter-sidbar-item";

interface CourseSidebarProps {
  course: any;
  progressCount: number;
  // label: string;
  // id: string;
  // isCompleted: boolean;
  // courseId: string;
  // isLocked: boolean;
}

export const CourseSidebar = ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col h-full overflow-y-auto border-r shadow-sm">
      <div className="h-[80px] flex flex-col p-4 border-b">
        <h1 className="text-2xl font-bold">{course?.courseName}</h1>
      </div>
      <div className="flex flex-col w-full">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center p-3 cursor-pointer">
              {isOpen ? (
                <MinusCircle className="w-4 h-4 mr-2" />
              ) : (
                <PlusCircle className="w-4 h-4 mr-2" />
              )}
              <h2 className="text-xl font-bold">Nội dung khóa học</h2>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-5">
            {course?.chapters
              ?.sort((a: any, b: any) => a.chapterOrder - b.chapterOrder)
              .map((chapter: any, index: number) => (
                <ChapterSidebarItem
                  key={chapter.id}
                  courseId={course.id}
                  chapterId={chapter.id}
                  label={chapter.chapterTitle}
                  lessons={chapter.lessons}
                />
              ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};
