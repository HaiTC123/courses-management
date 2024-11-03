import { getCourseByIdService } from "@/services/course.service";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export interface CourseCardProps {
  id: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({ id }) => {
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

  return (
    <Link href={`/courses/${id}`} key={id}>
      <div className="flex items-center p-4 my-4 transition-shadow duration-300 border rounded-lg shadow-sm cursor-pointer hover:shadow-md">
        {course.backgroundUrl && (
          <div className="flex-shrink-0 mr-4">
            <Image
              width={300}
              height={300}
              src={course.backgroundUrl}
              alt={course.courseName}
              className="rounded-lg"
            />
          </div>
        )}
        <div className="flex-grow">
          <h3 className="mb-2 text-lg font-bold">{course.courseName}</h3>
          <p className="text-gray-600">{course.description}</p>
        </div>
      </div>
    </Link>
  );
};
