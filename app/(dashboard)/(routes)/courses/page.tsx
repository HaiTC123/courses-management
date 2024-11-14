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
import { CATEGORIES } from "@/constants/category-data";
import { getCourseByStudentIdService } from "@/services/course.service";
import { useAuthStore } from "@/store/use-auth-store";
import { UserRole } from "@/enum/user-role";

const CoursePage = () => {
  const { user, role } = useAuthStore();
  const [courses, setCourses] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);

  // const [params, setParams] = useState<IGetPaginatedEnrollmentsParams>({
  //   pageSize: 1000,
  //   pageNumber: 1,
  //   conditions: [],
  //   sortOrder: "",
  //   searchKey: "",
  //   searchFields: [],
  //   includeReferences: [],
  // });

  const fetchCourses = useCallback(async () => {
    const id =
      role === UserRole.STUDENT
        ? user.student.id
        : role === UserRole.INSTRUCTOR
        ? user.instructor.id
        : role === UserRole.ADMIN
        ? user.admin.id
        : null;
    if (id) {
      try {
        const response = await getCourseByStudentIdService(id);
        if (response.data) {
          const listCourses = response.data.map((course: any) => ({
            ...course,
          }));
          setCourses(listCourses);
          setFilteredCourses(listCourses);
        }
      } catch (error) {
        toast.error((error as any).message);
      }
    }
  }, [role, user]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  let listSelectedCategories: string[] = [];

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
    } else {
      setFilteredCourses(courses);
    }
  };

  return (
    <>
      {/* <div className="block px-6 pt-6 md:hidden md:mb-0">
        <SearchInput />
      </div> */}
      <div className="p-6 space-y-4">
        {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
        </div> */}
        <Categories items={CATEGORIES} onSelect={handleSelectCategory} />
        <CourseList items={filteredCourses} title="Khóa học" />
      </div>
    </>
  );
};

export default CoursePage;
