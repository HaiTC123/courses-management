import { IconBadge } from "@/components/icon-badge";
import { LucideIcon, MinusCircle, PlusCircle } from "lucide-react";
import { LessonDetail } from "./lesson-detail";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface ChapterDetailProps {
  title: string;
  description: string;
  lessons: any[];
}

export const ChapterDetail: React.FC<ChapterDetailProps> = ({
  title,
  description,
  lessons,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold">{title}</h2>
      <p
        className="mt-4"
        dangerouslySetInnerHTML={{
          __html: description ?? "",
        }}
      />
      {lessons.length > 0 && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center mt-4 cursor-pointer">
              {isOpen ? (
                <MinusCircle className="w-4 h-4 mr-2" />
              ) : (
                <PlusCircle className="w-4 h-4 mr-2" />
              )}
              <h2 className="text-xl font-bold">Các bài học</h2>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-10">
            {lessons.map((lesson) => (
              <LessonDetail
                key={lesson.id}
                title={lesson.lessonTitle}
                description={lesson.lessonDescription}
                materials={lesson.materials}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};
