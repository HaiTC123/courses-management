import { BookOpen, File } from "lucide-react";
import Image from "next/image";
import { IconBadge } from "./icon-badge";

interface DocumentCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category: any;
  description: string;
  accessUrl: string;
  fileType: string;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  id,
  title,
  imageUrl,
  category,
  description,
  accessUrl,
  fileType,
}) => {
  return (
    <a href={accessUrl} target="_blank" rel="noopener noreferrer">
      <div className="h-full overflow-hidden transition duration-300 ease-in-out border rounded-lg group hover:shadow-lg hover:scale-105">
        <div className="relative w-full overflow-hidden rounded-t-lg aspect-video">
          {imageUrl ? (
            <Image
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              src={imageUrl}
              alt={title}
            />
          ) : null}
        </div>
        <div className="flex flex-col p-3">
          <div className="flex flex-col pt-2">
            <div className="text-lg font-medium transition-colors duration-300 md:text-base group-hover:text-blue-600">
              {title}
            </div>
            <p className="text-xs text-muted-foreground">{category}</p>
          </div>
          <div className="flex items-center my-3 text-sm gap-x-2 md:text-xs">
            <div className="flex items-center gap-x-1">
              <IconBadge size="sm" icon={File} />
              <strong>Loại file: {fileType?.slice(1)}</strong>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <IconBadge size="sm" icon={BookOpen} />
            <strong dangerouslySetInnerHTML={{ __html: description }}></strong>
          </div>
        </div>
      </div>
    </a>
  );
};
