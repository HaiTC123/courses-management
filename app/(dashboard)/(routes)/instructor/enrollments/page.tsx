"use client";

import { Combobox } from "@/components/ui/combobox";
import { CourseStatus } from "@/enum/course-status";
import { getPaginatedCoursesService } from "@/services/course.service";
import { getPaginatedEnrollmentsService } from "@/services/enrollment.service";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createColumns } from "./_components/column";
import { DataTable } from "./_components/data-table";
import { useAuthStore } from "@/store/use-auth-store";

const ListEnrollmentsPage = () => {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const { user } = useAuthStore.getState();
  const fetchEnrollments = useCallback(async () => {
    try {
      const params = selectedCourse
        ? [
            {
              key: "courseId",
              condition: "equal",
              value: selectedCourse,
            },
            {
              key: "course",
              condition: "equal",
              value: {
                instructorId: user?.instructor?.id
              },
            }
          ]
        : [
            {
              key: "course",
              condition: "subquery",
              value: {
                instructorId: user?.instructor?.id
              },
            }
          ];
      const response = await getPaginatedEnrollmentsService({
        pageSize: 1000,
        pageNumber: 1,
        conditions: [...params],
        sortOrder: "",
        searchKey: "",
        searchFields: [],
        includeReferences: {
          student: {
            include: {
              user: true,
            },
          },
          course: true,
        },
      });
      if (response.data.data) {
        const listEnrollments = response.data.data.map((enrollment: any) => ({
          ...enrollment,
        }));
        setEnrollments(listEnrollments);
      }
    } catch (error) {
      toast.error((error as any).message);
    }
  }, [selectedCourse]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    getPaginatedCoursesService({
      pageSize: 1000,
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
    }).then((response) => {
      if (response.data.data) {
        setCourses(
          response.data.data.map((item: any) => ({
            label: item.courseName,
            value: item.id,
          }))
        );
      }
    });
  }, []);

  const handleDelete = async (id: string, userId: string) => {
    // try {
    //   await deleteStudentService(id);
    //   await deleteUserService(userId);
    //   toast.success("Xóa sinh viên thành công");
    //   fetchEnrollments(); // Refresh the table data
    // } catch (error) {
    //   toast.error("Xóa sinh viên thất bại");
    // }
  };

  const columns = createColumns(handleDelete);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4"
        style={{
          width: "25%"
        }}
      >
        <Combobox
          options={courses}
          value={selectedCourse}
          onChange={setSelectedCourse}
        />
      </div>
      <DataTable
        columns={columns}
        data={enrollments}
        onDataChange={fetchEnrollments}
      />
    </div>
  );
};

export default ListEnrollmentsPage;
