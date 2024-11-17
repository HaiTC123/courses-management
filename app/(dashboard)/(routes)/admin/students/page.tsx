"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  deleteStudentService,
  deleteUserService,
  getPaginatedStudentsService,
} from "@/services/user.service";
import { omit } from "lodash";
import { createColumns } from "./_components/column";
import { DataTable } from "./_components/data-table";

const ListStudentsPage = () => {
  const [users, setUsers] = useState<any>([]);

  const fetchStudents = useCallback(async () => {
    try {
      const response = await getPaginatedStudentsService({
        pageSize: 1000,
        pageNumber: 1,
        conditions: [],
        sortOrder: "",
        searchKey: "",
        searchFields: [],
        includeReferences: {
          user: true,
        },
      });
      if (response?.data?.data) {
        const listStudents = response.data.data.map((student: any) => ({
          ...student,
          ...omit(student.user, "id"),
        }));
        setUsers(listStudents);
      }
    } catch (error) {
      toast.error("Lấy danh sách sinh viên thất bại");
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleDelete = async (id: number, userId: number) => {
    try {
      await deleteStudentService(id);
      await deleteUserService(userId);
      toast.success("Xóa sinh viên thành công");
      fetchStudents();
    } catch (error) {
      toast.error("Xóa sinh viên thất bại");
    }
  };

  const columns = createColumns(handleDelete);

  return (
    <div className="p-6">
      <DataTable
        columns={columns}
        data={users ?? []}
        onDataChange={fetchStudents}
      />
    </div>
  );
};

export default ListStudentsPage;
