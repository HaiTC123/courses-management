import CircularProgress from "@/components/progress-bar-circle";
import { Button } from "@/components/ui/button";
import { getCourseByIdService } from "@/services/course.service";
import { getPaginatedPrerequisitesService } from "@/services/prerequisite.service";
import { getProgressByCourseId } from "@/services/progress.service";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export interface CourseCardProps {
  id: string;
  isEnrolled: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ id, isEnrolled }) => {
  const [course, setCourse] = useState<any>({});

  const fetchCourse = useCallback(async () => {
    try {
      const response = await getCourseByIdService(Number(id));
      if (response.data) {
        setCourse(response.data);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const [prerequisiteCourses, setPrerequisiteCourses] = useState<any>(null);
  const fetchPrerequisites = useCallback(async () => {
    try {
      const response = await getPaginatedPrerequisitesService({
        pageSize: 1000,
        pageNumber: 1,
        conditions: [
          {
            key: "courseId",
            condition: "equal",
            value: Number(id),
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

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (id && isEnrolled) {
      getProgressByCourseId(Number(id)).then((res: any) => {
        if (res.data) {
          const completed = res.data.completed;
          const total = res.data.total || 1;
          setProgress(Math.round((completed / total) * 100));
        }
      });
    }
  }, [id, isEnrolled]);

  return (
    <div className="flex items-center p-4 my-4 rounded-lg border shadow-sm transition-shadow duration-300 cursor-pointer hover:shadow-md">
      {course.backgroundUrl && (
        <Link href={`/courses/${id}`} key={id}>
          <div className="flex-shrink-0 mr-4">
            {course.backgroundUrl ? (
              <Image
                width={300}
                height={300}
                src={course.backgroundUrl}
                alt={course.courseName}
                className="rounded-lg"
              />
            ) : null}
          </div>
        </Link>
      )}
      <div className="flex flex-col flex-grow gap-3">
        <h3 className="text-lg font-bold">
          {course.courseName}{" "}
          {isEnrolled && (
            <span className="text-xs text-gray-500">(Đã đăng ký)</span>
          )}
        </h3>
        <p className="text-sm">{course.description}</p>
        {prerequisiteCourses && (
          <p>
            <strong>Môn tiên quyết:</strong>{" "}
            <Link href={`/courses/${prerequisiteCourses?.id}`}>
              <span
                className="text-blue-600 truncate"
                title={prerequisiteCourses?.courseName}
              >
                {prerequisiteCourses?.courseName}
              </span>
            </Link>
          </p>
        )}
        {isEnrolled && (
          <div className="flex gap-x-2 items-center">
            <span>Tiến độ học</span>
            {progress === 100 ? (
              <span className="font-medium text-green-600">Hoàn thành</span>
            ) : (
              <CircularProgress value={progress} size={50} />
            )}
          </div>
        )}
        <div className="flex gap-x-2 items-center">
          <span>Thời gian học dự kiến:</span>
          <span>{course.durationWeeks} tuần</span>
        </div>
        <div className="flex gap-x-2 items-center">
          <Button variant="outline" size="sm">
            <Link href={`/courses/${id}`}>Xem khóa học</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
