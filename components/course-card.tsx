import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookOpen, Users } from "lucide-react";
import { formatPrice } from "@/lib/format";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  category: any;
  userId: string;
  isFree: boolean;
  enrollmentsCount: number;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  imageUrl,
  price,
  category,
  userId,
  id,
  isFree,
  enrollmentsCount,
}) => {
  return (
    <Link href={`/courses/${id}`}>
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
              <IconBadge size="sm" icon={BookOpen} />
              <strong>{isFree ? "Miễn phí" : formatPrice(price)}</strong>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <IconBadge size="sm" icon={Users} />
            <strong>{enrollmentsCount}</strong>
          </div>
          {/* {progress !== null ? (
            <div>Progress</div>
          ) : (
            <p className="font-medium transition-colors duration-300 text-md md:text-sm text-slate-600 group-hover:text-blue-600">
              {formatPrice(price)}
            </p>
          )} */}
        </div>
      </div>
    </Link>
  );
};
