"use client";

import { CourseList } from "@/components/course-list";
import { DocumentList } from "@/components/document-list";
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

let listSelectedCategories: string[] = [];

export default function Dashboard() {
  const router = useRouter();
  const { authenticated } = useAuthStore.getState();
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
          setFilteredCourses(listCourses);
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
          setFilteredCoursesFree(listCourses);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [paramsFree]);

  useEffect(() => {
    fetchCoursesFree();
  }, [fetchCoursesFree]);

  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [filteredCoursesFree, setFilteredCoursesFree] = useState<any[]>([]);

  const handleSelectCategory = (value: string, selected: boolean) => {
    if (selected) {
      listSelectedCategories.push(value);
    } else {
      listSelectedCategories = listSelectedCategories.filter(
        (category) => category !== value
      );
    }
    if (listSelectedCategories.length > 0) {
      setFilteredCourses(
        courses.filter((course) =>
          listSelectedCategories.includes(course.category)
        )
      );
      setFilteredCoursesFree(
        coursesFree.filter((course) =>
          listSelectedCategories.includes(course.category)
        )
      );
    } else {
      setFilteredCourses(courses);
      setFilteredCoursesFree(coursesFree);
    }
  };

  return (
    <>
      <div className="p-6 space-y-4">
        <div className="mb-4">
          <CarouselCourse items={carouselData} />
        </div>
        <Categories items={CATEGORIES} onSelect={handleSelectCategory} />
        <CourseList title="Khóa học trả phí" items={filteredCourses} />
        <CourseList title="Khóa học miễn phí" items={filteredCoursesFree} />
        <DocumentList title="Tài liệu" />
      </div>
    </>
  );
}
