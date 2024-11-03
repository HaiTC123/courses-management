"use client";

import { CourseStatus } from "@/enum/course-status";
import {
  checkCourseService,
  getPaginatedCoursesService,
  IGetPaginatedCoursesParams,
} from "@/services/course.service";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { createColumns } from "./_components/column";
import { DataTable } from "./_components/data-table";

const AdminCoursesPage = () => {
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

  const handleDelete = async (id: string) => {
    // try {
    //   await deleteStudentService(id);
    //   await deleteUserService(userId);
    //   toast.success("Student deleted successfully");
    //   fetchStudents(); // Refresh the table data
    // } catch (error) {
    //   console.error("Error deleting student:", error);
    //   toast.error("Failed to delete student");
    // }
  };

  const handleCheckCourse = async (id: string, status: string) => {
    try {
      await checkCourseService(Number(id), status);
      toast.success("Cập nhật trạng thái thành công");
      fetchCourses(); // Refresh the table data
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại");
    }
  };

  const columns = createColumns(handleDelete, handleCheckCourse);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default AdminCoursesPage;
