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
import { Categories } from "./_components/categories";
// import { CarouselCourse } from "./_components/carousel-course";
import { CATEGORIES } from "@/constants/category-data";

// const carouselItems = [
//   {
//     id: "1",
//     title: "Học HTML CSS cho người mới",
//     image:
//       "https://files.fullstack.edu.vn/f8-prod/banners/20/6308a6bf603a4.png",
//     description:
//       "Thực hành dự án với Figma, hàng trăm bài tập và thử thách, v.v.",
//     classBackground: "bg-gradient-to-r from-amber-500 to-pink-500",
//   },
//   {
//     id: "2",
//     title: "Học JS cho người mới",
//     image:
//       "https://files.fullstack.edu.vn/f8-prod/banners/20/6308a6bf603a4.png",
//     description:
//       "Thực hành dự án với Figma, hàng trăm bài tập và thử thách, v.v.",
//     classBackground: "bg-gradient-to-r from-teal-400 to-yellow-200",
//   },
//   {
//     id: "3",
//     title: "Học ReactJS cho người mới",
//     image:
//       "https://files.fullstack.edu.vn/f8-prod/banners/20/6308a6bf603a4.png",
//     description:
//       "Thực hành dự án với Figma, hàng trăm bài tập và thử thách, v.v.",
//     classBackground: "bg-gradient-to-r from-fuchsia-500 to-cyan-500",
//   },
// ];

export default function Dashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [coursesFree, setCoursesFree] = useState<any[]>([]);
  const [params, setParams] = useState<IGetPaginatedCoursesParams>({
    pageSize: 1000,
    pageNumber: 1,
    conditions: [
      {
        key: "status",
        condition: "equal",
        value: CourseStatus.APPROVED,
      },
      {
        key: "isFree",
        condition: "equal",
        value: false,
      },
    ],
    sortOrder: "",
    searchKey: "",
    searchFields: [],
    includeReferences: [],
  });

  const [paramsFree, setParamsFree] = useState<IGetPaginatedCoursesParams>({
    pageSize: 1000,
    pageNumber: 1,
    conditions: [
      {
        key: "status",
        condition: "equal",
        value: CourseStatus.APPROVED,
      },
      {
        key: "isFree",
        condition: "equal",
        value: true,
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

  const fetchCoursesFree = useCallback(() => {
    getPaginatedCoursesService(paramsFree)
      .then((response) => {
        if (response.data.data) {
          const listCourses = response.data.data.map((course: any) => ({
            ...course,
          }));
          setCoursesFree(listCourses);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [paramsFree]);

  useEffect(() => {
    fetchCoursesFree();
  }, [fetchCoursesFree]);

  const handleSelectCategory = (value: string) => {
    setParams({
      ...params,
      conditions: [
        ...params.conditions,
        { key: "category", condition: "equal", value },
      ],
    });

    setParamsFree({
      ...paramsFree,
      conditions: [
        ...paramsFree.conditions,
        { key: "category", condition: "equal", value },
      ],
    });
  };

  return (
    <>
      <div className="p-6 space-y-4">
        {/* <div className="mb-4">
          <CarouselCourse items={carouselItems} />
        </div> */}
        <Categories items={CATEGORIES} onSelect={handleSelectCategory} />
        <CourseList title="Khóa học trả phí" items={courses} />
        <CourseList title="Khóa học miễn phí" items={coursesFree} />
      </div>
    </>
  );
}
