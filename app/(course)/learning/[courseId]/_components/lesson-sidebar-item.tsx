import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import { CourseSidebarItem } from "./course-sidebar-item";

interface LessonSidebarItemProps {
  label: string;
  materials: any[];
  courseId: number;
  chapterId: number;
  lessonId: number;
  progressDetails: any[];
}

export const LessonSidebarItem: React.FC<LessonSidebarItemProps> = ({
  label,
  materials,
  courseId,
  chapterId,
  lessonId,
  progressDetails,
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
        {materials.map((material) => (
          <CourseSidebarItem
            key={material.id}
            label={material.materialTitle}
            courseId={courseId}
            chapterId={chapterId}
            lessonId={lessonId}
            materialId={material.id}
            progressDetails={progressDetails}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
