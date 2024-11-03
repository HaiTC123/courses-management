import { CourseCard } from "./course-card";

interface CourseListProps {
  items: any[];
}

export const CourseList: React.FC<CourseListProps> = ({ items }) => {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            title={item.courseName}
            imageUrl={item.backgroundUrl}
            price={item.price}
            category={item.category}
            progress={item.progress}
            userId={item.instructorId}
            id={item.id}
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
