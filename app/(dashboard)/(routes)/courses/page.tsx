"use client";

import { SearchInput } from "@/components/search-input";
import { Categories } from "./_components/categories";
import { CourseList } from "@/components/course-list";
import { InfoCard } from "./_components/info-card";
import { CheckCircle, Clock } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  getPaginatedEnrollmentsService,
  IGetPaginatedEnrollmentsParams,
} from "@/services/enrollment.service";
import toast from "react-hot-toast";

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

// const courses: any = [
//   {
//     id: "1",
//     title: "HTML CSS cho người mới",
//     imageUrl:
//       "https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png",
//     price: 100,
//     isPublished: true,
//     category: { id: "1", name: "Frontend" },
//     userId: "1",
//     progress: null,
//   },
//   {
//     id: "2",
//     title: "JS cho người mới",
//     imageUrl:
//       "https://files.fullstack.edu.vn/f8-prod/courses/19/66aa28194b52b.png",
//     price: 100,
//     isPublished: true,
//     category: { id: "1", name: "Frontend" },
//     userId: "1",
//     progress: null,
//   },
//   {
//     id: "3",
//     title: "ReactJS cho người mới",
//     imageUrl: "https://files.fullstack.edu.vn/f8-prod/courses/13/13.png",
//     price: 300,
//     isPublished: true,
//     category: { id: "1", name: "Frontend" },
//     userId: "1",
//     progress: null,
//   },
//   {
//     id: "4",
//     title: "NodeJS cho người mới",
//     imageUrl: "https://files.fullstack.edu.vn/f8-prod/courses/6.png",
//     price: 200,
//     isPublished: true,
//     category: { id: "1", name: "Frontend" },
//     userId: "1",
//     progress: null,
//   },
// ];

const CoursePage = () => {
  const [courses, setCourses] = useState<any[]>([]);

  const [params, setParams] = useState<IGetPaginatedEnrollmentsParams>({
    pageSize: 10,
    pageNumber: 1,
    conditions: [],
    sortOrder: "",
    searchKey: "",
    searchFields: [],
    includeReferences: [],
  });

  const fetchCourses = useCallback(() => {
    getPaginatedEnrollmentsService(params)
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
      {/* <div className="block px-6 pt-6 md:hidden md:mb-0">
        <SearchInput />
      </div> */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoCard
            icon={Clock}
            label="Đang học"
            numberOfItems={courses.length}
          />
          <InfoCard
            icon={CheckCircle}
            label="Hoàn thành"
            numberOfItems={courses.length}
            variant="success"
          />
        </div>
        <Categories items={categories} />
        <CourseList items={courses} />
      </div>
    </>
  );
};

export default CoursePage;
