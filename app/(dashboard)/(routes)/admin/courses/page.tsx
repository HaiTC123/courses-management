"use client";

import { CourseStatus } from "@/enum/course-status";
import {
  checkCourseService,
  deleteCourseService,
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
    pageSize: 1000,
    pageNumber: 1,
    conditions: [
      {
        key: "status",
        condition: "equal",
        value: CourseStatus.PENDING_APPROVAL,
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
    try {
      await deleteCourseService(Number(id));
      toast.success("Xóa khóa học thành công");
      fetchCourses(); // Refresh the table data
    } catch (error) {
      toast.error("Xóa khóa học thất bại");
    }
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
