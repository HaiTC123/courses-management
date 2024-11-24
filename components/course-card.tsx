import { formatPrice } from "@/lib/format";
import { getProgressByCourseId } from "@/services/progress.service";
import { BookOpen, CheckCircle, DollarSign, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { IconBadge } from "./icon-badge";
import CircularProgress from "./progress-bar-circle";
import { getPaginatedPrerequisitesService } from "@/services/prerequisite.service";
import toast from "react-hot-toast";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  category: any;
  isFree: boolean;
  enrollmentsCount: number;
  isEnrolled: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  imageUrl,
  price,
  category,
  id,
  isFree,
  enrollmentsCount,
  isEnrolled,
}) => {
  const [progress, setProgress] = useState(0);
  const [prerequisiteCourses, setPrerequisiteCourses] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getProgressByCourseId(Number(id)).then((res: any) => {
        if (res.data) {
          const completed = res.data.completed;
          const total = res.data.total || 1;
          setProgress(Math.round((completed / total) * 100));
        }
      });
    }
  }, [id]);

  const fetchPrerequisites = useCallback(async () => {
    try {
      const response = await getPaginatedPrerequisitesService({
        pageSize: 1000,
        pageNumber: 1,
        conditions: [
          {
            key: "courseId",
            condition: "equal",
            value: id,
          },
        ],
        sortOrder: "",
        searchKey: "",
        searchFields: [],
        includeReferences: {
          prerequisiteCourse: true,
        },
      });
      if (response?.data?.data?.length > 0) {
        const listPrerequisites = response.data.data.map(
          (prerequisite: any) => ({
            ...prerequisite,
          })
        );
        setPrerequisiteCourses(listPrerequisites[0]?.prerequisiteCourse);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchPrerequisites();
    }
  }, [id, fetchPrerequisites]);

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
              {isEnrolled ? (
                <>
                  <IconBadge size="sm" icon={BookOpen} />
                  <strong>Đã đăng ký</strong>
                </>
              ) : (
                <>
                  <IconBadge size="sm" icon={DollarSign} />
                  <strong>{isFree ? "Miễn phí" : formatPrice(price)}</strong>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-2">
            <div className="flex items-center gap-x-1">
              <IconBadge size="sm" icon={Users} />
              <strong>{enrollmentsCount}</strong>
            </div>
            {isEnrolled && progress < 100 && (
              <div className="flex items-center gap-x-2">
                <CircularProgress value={progress} size={43} />
              </div>
            )}
            {isEnrolled && progress === 100 && (
              <div className="flex items-center gap-x-2">
                <IconBadge size="sm" icon={CheckCircle} />
                <strong>Hoàn thành</strong>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 gap-x-2">
            {prerequisiteCourses && (
              <div className="flex items-center gap-x-1">
                {/* <IconBadge size="sm" icon={Users} /> */}
                <p>Tiên quyết:</p>
                <strong
                  className="text-blue-600 truncate"
                  title={prerequisiteCourses?.courseName}
                >
                  {prerequisiteCourses?.courseName}
                </strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
