import { DEFAULT_IMAGE } from "@/constants/default-image";
import { CourseCard } from "./course-card";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthStore } from "@/store/use-auth-store";

interface CourseListProps {
  title: string;
  items: any[];
}

export const CourseList: React.FC<CourseListProps> = ({ title, items }) => {
  const { user } = useAuthStore.getState();
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<number[]>([]);

  useEffect(() => {
    if (user.enrolledCourseIds) {
      const courseIds =
        user.enrolledCourseIds
          .split(";")
          .map((course: any) => Number(course)) ?? [];
      setEnrolledCourseIds(courseIds);
    }
  }, [user]);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            title={item.courseName}
            imageUrl={item.backgroundUrl || DEFAULT_IMAGE}
            price={item.price}
            category={item.category}
            isFree={item.isFree}
            id={item.id}
            enrollmentsCount={item.enrollmentsCount}
            isEnrolled={enrolledCourseIds.includes(item.id)}
            instructor={item.instructor.user}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="mt-10 text-sm text-center text-muted-foreground">
          Không tìm thấy khóa học
        </div>
      )}
    </div>
  );
};
