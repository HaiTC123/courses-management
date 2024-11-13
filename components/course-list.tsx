import { DEFAULT_IMAGE } from "@/constants/default-image";
import { CourseCard } from "./course-card";

interface CourseListProps {
  title: string;
  items: any[];
}

export const CourseList: React.FC<CourseListProps> = ({ title, items }) => {
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
            userId={item.instructorId}
            isFree={item.isFree}
            id={item.id}
            enrollmentsCount={item.enrollmentsCount}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="mt-10 text-sm text-center text-muted-foreground">
          No courses found
        </div>
      )}
    </div>
  );
};
