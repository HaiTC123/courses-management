import { IconBadge } from "@/components/icon-badge";
import { LucideIcon, MinusCircle, PlusCircle } from "lucide-react";
import { MaterialDetail } from "./material-detail";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface LessonDetailProps {
  title: string;
  description: string;
  materials: any[];
}

export const LessonDetail: React.FC<LessonDetailProps> = ({
  title,
  description,
  materials,
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
      {materials.length > 0 && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center mt-4 cursor-pointer">
              {isOpen ? (
                <MinusCircle className="w-4 h-4 mr-2" />
              ) : (
                <PlusCircle className="w-4 h-4 mr-2" />
              )}
              <h2 className="text-xl font-bold">Các video bài học</h2>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-10">
            {materials.map((material) => (
              <MaterialDetail
                key={material.id}
                title={material.materialTitle}
                description={material.materialDescription}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};
