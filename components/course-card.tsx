import { CourseWithProgressWithCategory } from "@/components/course-list";
import { Category } from "@/components/course-list";
import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  category: Category;
  progress: number;
  userId: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  imageUrl,
  price,
  category,
  progress,
  userId,
  id,
}) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="h-full p-3 overflow-hidden transition border rounded-md group hover:shadow-sm">
        <div className="relative w-full overflow-hidden rounded-md aspect-video">
          <Image fill className="object-cover" src={imageUrl} alt={title} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg font-medium md:text-base">{title}</div>
          <p className="text-xs text-muted-foreground">{category?.name}</p>
        </div>
        <div className="flex items-center my-3 text-sm gap-x-2 md:text-xs">
          <div className="flex items-center gap-x-1">
            <IconBadge size="sm" icon={BookOpen} />
            <span>{progress}</span>
          </div>
        </div>
        {progress !== null ? (
          <div>a</div>
        ) : (
          <p className="font-medium text-md md:text-sm text-slate-600">
            {formatPrice(price)}
          </p>
        )}
      </div>
    </Link>
  );
};
