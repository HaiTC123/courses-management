"use client";

import { CourseList } from "@/components/course-list";
import { carouselData } from "@/constants/carousel-data";
import { CATEGORIES } from "@/constants/category-data";
import { CourseStatus } from "@/enum/course-status";
import {
  getPaginatedCoursesService,
  IGetPaginatedCoursesParams,
} from "@/services/course.service";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CarouselCourse } from "./_components/carousel-course";
import { Categories } from "./_components/categories";
import { DocumentList } from "@/components/document-list";

export default function Dashboard() {
  const router = useRouter();
  const { authenticated } = useAuthStore();
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
        <div className="mb-4">
          <CarouselCourse items={carouselData} />
        </div>
        <Categories items={CATEGORIES} onSelect={handleSelectCategory} />
        <CourseList title="Khóa học trả phí" items={courses} />
        <CourseList title="Khóa học miễn phí" items={coursesFree} />
        <DocumentList title="Tài liệu" />
      </div>
    </>
  );
}
