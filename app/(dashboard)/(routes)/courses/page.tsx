"use client";

import { CourseList } from "@/components/course-list";
import { CATEGORIES } from "@/constants/category-data";
import { UserRole } from "@/enum/user-role";
import { getCourseByStudentIdService } from "@/services/course.service";
import { useAuthStore } from "@/store/use-auth-store";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Categories } from "./_components/categories";

let listSelectedCategories: string[] = [];

const CoursePage = () => {
  const { user, role } = useAuthStore.getState();
  const [courses, setCourses] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);

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
      <div className="p-6 space-y-4">
        <Categories items={CATEGORIES} onSelect={handleSelectCategory} />
        <CourseList items={filteredCourses} title="Khóa học" />
      </div>
    </>
  );
};

export default CoursePage;
