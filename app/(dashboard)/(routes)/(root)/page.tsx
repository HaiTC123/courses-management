import { CourseList } from "@/components/course-list";
import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./_components/info-card";
import { CarouselCourse } from "./_components/carousel-course";

const courses: any = [
  {
    id: "1",
    title: "HTML CSS cho người mới",
    imageUrl:
      "https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png",
    price: 100,
    isPublished: true,
    category: { id: "1", name: "Frontend" },
    userId: "1",
    progress: null,
  },
  {
    id: "2",
    title: "JS cho người mới",
    imageUrl:
      "https://files.fullstack.edu.vn/f8-prod/courses/19/66aa28194b52b.png",
    price: 100,
    isPublished: true,
    category: { id: "1", name: "Frontend" },
    userId: "1",
    progress: null,
  },
  {
    id: "3",
    title: "ReactJS cho người mới",
    imageUrl: "https://files.fullstack.edu.vn/f8-prod/courses/13/13.png",
    price: 300,
    isPublished: true,
    category: { id: "1", name: "Frontend" },
    userId: "1",
    progress: null,
  },
  {
    id: "4",
    title: "NodeJS cho người mới",
    imageUrl: "https://files.fullstack.edu.vn/f8-prod/courses/6.png",
    price: 200,
    isPublished: true,
    category: { id: "1", name: "Frontend" },
    userId: "1",
    progress: null,
  },
];

const carouselItems = [
  {
    id: "1",
    title: "Học HTML CSS cho người mới",
    image:
      "https://files.fullstack.edu.vn/f8-prod/banners/20/6308a6bf603a4.png",
    description:
      "Thực hành dự án với Figma, hàng trăm bài tập và thử thách, v.v.",
    classBackground: "bg-gradient-to-r from-amber-500 to-pink-500",
  },
  {
    id: "2",
    title: "Học JS cho người mới",
    image:
      "https://files.fullstack.edu.vn/f8-prod/banners/20/6308a6bf603a4.png",
    description:
      "Thực hành dự án với Figma, hàng trăm bài tập và thử thách, v.v.",
    classBackground: "bg-gradient-to-r from-teal-400 to-yellow-200",
  },
  {
    id: "3",
    title: "Học ReactJS cho người mới",
    image:
      "https://files.fullstack.edu.vn/f8-prod/banners/20/6308a6bf603a4.png",
    description:
      "Thực hành dự án với Figma, hàng trăm bài tập và thử thách, v.v.",
    classBackground: "bg-gradient-to-r from-fuchsia-500 to-cyan-500",
  },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-4">
      <div className="mb-4">
        <CarouselCourse items={carouselItems} />
      </div>
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
