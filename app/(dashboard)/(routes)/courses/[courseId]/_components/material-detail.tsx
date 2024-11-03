import { IconBadge } from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";

interface MaterialDetailProps {
  title: string;
  description: string;
}

export const MaterialDetail: React.FC<MaterialDetailProps> = ({
  title,
  description,
}) => {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold">{title}</h2>
      <p
        className="mt-4"
        dangerouslySetInnerHTML={{
          __html: description ?? "",
        }}
      />
    </div>
  );
};
