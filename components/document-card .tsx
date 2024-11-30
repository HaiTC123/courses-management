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
    <>
      {accessUrl ? (
        <a href={accessUrl || "#"} target="_blank" rel="noopener noreferrer">
          <div className="overflow-hidden h-full rounded-lg border transition duration-300 ease-in-out group hover:shadow-lg hover:scale-105">
            <div className="overflow-hidden relative w-full rounded-t-lg aspect-video">
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
              <div className="flex gap-x-2 items-center my-3 text-sm md:text-xs">
                <div className="flex gap-x-1 items-center">
                  <IconBadge size="sm" icon={File} />
                  <strong>Loại file: {fileType}</strong>
                </div>
              </div>
              <div className="flex gap-x-2 items-center">
                <IconBadge size="sm" icon={BookOpen} />
                <strong
                  dangerouslySetInnerHTML={{ __html: description }}
                ></strong>
              </div>
            </div>
          </div>
        </a>
      ) : (
        <div className="overflow-hidden h-full rounded-lg border transition duration-300 ease-in-out group hover:shadow-lg hover:scale-105">
          <div className="overflow-hidden relative w-full rounded-t-lg aspect-video">
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
            <div className="flex gap-x-2 items-center my-3 text-sm md:text-xs">
              <div className="flex gap-x-1 items-center">
                <IconBadge size="sm" icon={File} />
                <strong>Loại file: {fileType}</strong>
              </div>
            </div>
            <div className="flex gap-x-2 items-center">
              <IconBadge size="sm" icon={BookOpen} />
              <strong
                dangerouslySetInnerHTML={{ __html: description }}
              ></strong>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
