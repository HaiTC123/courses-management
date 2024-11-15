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
  course: any;
  chapterId: number;
  lessonId: number;
  progressDetails: any[];
}

export const LessonSidebarItem: React.FC<LessonSidebarItemProps> = ({
  label,
  materials,
  course,
  chapterId,
  lessonId,
  progressDetails,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const canAccess = (materialId: number) => {
    const listMaterials: any[] = [];
    for (const chapter of course?.chapters || []) {
      for (const lesson of chapter?.lessons || []) {
        for (const material of lesson?.materials || []) {
          listMaterials.push(material);
        }
      }
    }
    const findIndex = listMaterials.findIndex(
      (material) => material.id === materialId
    );
    if (findIndex === -1) return false;
    if (findIndex === 0) return true;
    const previousMaterial = listMaterials[findIndex - 1];
    const isPreviousMaterialCompleted = (progressDetails || []).find(
      (progress: any) =>
        progress.materialId === previousMaterial.id &&
        progress.status === "Completed"
    );
    return isPreviousMaterialCompleted;
  };

  const isLearning = (materialId: number) => {
    const listMaterials: any[] = [];
    for (const chapter of course?.chapters || []) {
      for (const lesson of chapter?.lessons || []) {
        for (const material of lesson?.materials || []) {
          listMaterials.push(material);
        }
      }
    }

    let firstIndexNotStarted = -1;
    for (let index = 0; index < listMaterials.length; index++) {
      const material = listMaterials[index];
      const isMaterialNotStarted = (progressDetails || []).find(
        (progress: any) =>
          progress.materialId === material.id &&
          progress.status === "NotStarted"
      );
      if (isMaterialNotStarted) {
        firstIndexNotStarted = index;
        break;
      }
    }
    return firstIndexNotStarted === materialId;
  };

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
            courseId={course.id}
            chapterId={chapterId}
            lessonId={lessonId}
            materialId={material.id}
            progressDetails={progressDetails}
            canAccess={canAccess(material.id)}
            isLearning={isLearning(material.id)}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
