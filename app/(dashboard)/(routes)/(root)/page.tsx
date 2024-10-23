import { CourseList } from "@/components/course-list";
import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./_components/info-card";

const courses: any = [
  {
    id: "1",
    title: "Course 1",
    imageUrl: "https://via.placeholder.com/600x400",
    price: 100,
    isPublished: true,
    category: { id: "1", name: "Category 1" },
    userId: "1",
    progress: null,
  },
  {
    id: "2",
    title: "Course 2",
    imageUrl: "https://via.placeholder.com/600x400",
    price: 100,
    isPublished: true,
    category: { id: "1", name: "Category 1" },
    userId: "1",
    progress: null,
  },
  {
    id: "3",
    title: "Course 3",
    imageUrl: "https://via.placeholder.com/600x400",
    price: 100,
    isPublished: true,
    category: { id: "1", name: "Category 1" },
    userId: "1",
    progress: null,
  },
  {
    id: "4",
    title: "Course 4",
    imageUrl: "https://via.placeholder.com/600x400",
    price: 100,
    isPublished: true,
    category: { id: "1", name: "Category 1" },
    userId: "1",
    progress: null,
  },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={courses.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={courses.length}
          variant="success"
        />
      </div>
      <CourseList items={courses} />
    </div>
  );
}
