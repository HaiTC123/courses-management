"use client";

import { redirect } from "next/navigation";
import { createColumns } from "./_components/column";
import { DataTable } from "./_components/data-table";
import { useCallback, useEffect, useState } from "react";
import {
  getPaginatedCoursesService,
  IGetPaginatedCoursesParams,
  sendToAdminApproveService,
} from "@/services/course.service";
import { toast } from "react-hot-toast";
import { CourseStatus } from "@/enum/course-status";

const CoursesPage = () => {
  const [courses, setCourses] = useState<any[]>([]);

  const [params, setParams] = useState<IGetPaginatedCoursesParams>({
    pageSize: 10,
    pageNumber: 1,
    conditions: [],
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

  const handleSendToAdmin = async (id: string) => {
    try {
      await sendToAdminApproveService(Number(id));
      toast.success("Gửi tới ADMIN thành công");
      fetchCourses(); // Refresh the table data
    } catch (error) {
      toast.error("Gửi tới ADMIN thất bại");
    }
  };

  const columns = createColumns(handleDelete, handleSendToAdmin);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
