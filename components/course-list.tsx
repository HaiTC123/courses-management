import { CourseCard } from "./course-card";

export interface Course {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  category: string;
  userId: string;
}

export interface Category {
  id: string;
  name: string;
}

export type CourseWithProgressWithCategory = Course & {
  progress: number;
  category: Category | null;
};

interface CourseListProps {
  items: CourseWithProgressWithCategory[];
}

export const CourseList: React.FC<CourseListProps> = ({ items }) => {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            price={item.price}
            category={item.category}
            progress={item.progress}
            userId={item.userId}
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
