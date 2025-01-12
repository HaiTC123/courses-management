"use client";

import {
  deleteCourseService,
  getPaginatedCoursesService,
  sendToAdminApproveService,
} from "@/services/course.service";
import { useAuthStore } from "@/store/use-auth-store";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { createColumns } from "./_components/column";
import { DataTable } from "./_components/data-table";

const CoursesPage = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const { user } = useAuthStore.getState();

  const fetchCourses = useCallback((conditions, searchKey, searchFields) => {
    getPaginatedCoursesService({
      pageSize: 1000,
      pageNumber: 1,
      conditions: conditions,
      sortOrder: "" ,
      searchKey: searchKey,
      searchFields: searchFields,
      includeReferences: [],
    })
      .then((response) => {
        if (response.data.data) {
          const listCourses = response.data.data
            .map((course: any) => ({
              ...course,
            }))
            .sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
          setCourses(listCourses);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [user]);

  useEffect(() => {
    if (user?.instructor?.id) {
      fetchCourses([
        {
          key: "instructorId",
          condition: "equal",
          value: user.instructor.id,
        },
      ], "", []);
    }
  }, [user, fetchCourses]);

  const handleDelete = async (id: string) => {
    try {
      await deleteCourseService(Number(id));
      toast.success("Xóa khóa học thành công");
      fetchCourses([
        {
          key: "instructorId",
          condition: "equal",
          value: user.instructor.id,
        },
      ], "", []); // Refresh the table data
    } catch (error) {
      toast.error("Xóa khóa học thất bại");
    }
  };

  const handleSendToAdmin = async (id: string) => {
    try {
      const response = await sendToAdminApproveService(Number(id));
      if (response.success) {
        toast.success("Gửi tới ADMIN thành công");
        fetchCourses([
          {
            key: "instructorId",
            condition: "equal",
            value: user.instructor.id,
          },
        ], "", []);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Gửi tới ADMIN thất bại");
    }
  };

  const columns = createColumns(handleDelete, handleSendToAdmin);

  const onSearchCourse = function(searchText, status){
    let condition = [
      {
        key: "instructorId",
        condition: "equal",
        value: user.instructor.id,
      }
    ];
    if (status != "All"){
      condition.push({
        key: "status",
        condition: "equal",
        value: status,
      })
    }
    console.log(searchText + " " + status);
    fetchCourses( condition, searchText, ["courseName"] );
  }
  return (
    <div className="p-6">
      <DataTable onSearchCourse={onSearchCourse} columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
