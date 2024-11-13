"use client";

import { CourseList } from "@/components/course-list";
import { useSpinner } from "@/components/providers/spinner-provider";
import { CourseStatus } from "@/enum/course-status";
import {
  getPaginatedCoursesService,
  IGetPaginatedCoursesParams,
} from "@/services/course.service";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Categories } from "../courses/_components/categories";
import { CarouselCourse } from "./_components/carousel-course";

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

const categories = [
  {
    id: "1",
    name: "Frontend",
    value: "frontend",
  },
  {
    id: "2",
    name: "Web Development",
    value: "web-development",
  },
  {
    id: "3",
    name: "Data Science",
    value: "data-science",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);

  const [params, setParams] = useState<IGetPaginatedCoursesParams>({
    pageSize: 10,
    pageNumber: 1,
    conditions: [
      {
        key: "status",
        condition: "equal",
        value: CourseStatus.APPROVED,
      },
    ],
    sortOrder: "",
    searchKey: "",
    searchFields: [],
    includeReferences: [],
  });

  const { user, authenticated } = useAuthStore();

  useEffect(() => {
    if (!authenticated) {
      router.push("/sign-in");
    }
  }, [authenticated, router]);

  const fetchCourses = useCallback(() => {
    getPaginatedCoursesService(params)
      .then((response) => {
        if (response.data.data) {
          const listCourses = response.data.data.map((course: any) => ({
            ...course,
          }));
          setCourses(listCourses);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [params]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <>
      <div className="p-6 space-y-4">
        <div className="mb-4">
          <CarouselCourse items={carouselItems} />
        </div>
        <Categories items={categories} />
        <CourseList items={courses} />
      </div>
    </>
  );
}
