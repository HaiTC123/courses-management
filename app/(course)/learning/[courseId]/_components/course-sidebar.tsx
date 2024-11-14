import CircularProgress from "@/components/progress-bar-circle";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getProgressByCourseId } from "@/services/progress.service";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { ChapterSidebarItem } from "./chapter-sidbar-item";
import { ScheduleCourse } from "./schedule-course";

interface CourseSidebarProps {
  course: any;
}

export const CourseSidebar = ({ course }: CourseSidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (course.id) {
      getProgressByCourseId(Number(course.id)).then((res: any) => {
        if (res.data) {
          const completed = res.data.completed;
          const total = res.data.total || 1;
          setProgress(Math.round((completed / total) * 100));
        }
      });
    }
  }, [course]);

  return (
    <div className="flex flex-col h-full overflow-y-auto border-r shadow-sm">
      <div className="h-[80px] flex flex-col p-4 border-b">
        <h1 className="text-2xl font-bold">{course?.courseName}</h1>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-center my-2">
          <ScheduleCourse courseId={Number(course.id)} />
          <p className="mr-2 text-sm">Tiến độ khóa học</p>
          <CircularProgress value={progress} size={50} />
        </div>
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
