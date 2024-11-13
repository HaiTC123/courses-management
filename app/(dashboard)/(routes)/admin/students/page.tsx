"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

import { createColumns } from "./_components/column";
import { DataTable } from "./_components/data-table";
import { useAuthStore } from "@/store/use-auth-store";
import { UserRole } from "@/enum/user-role";
import {
  deleteStudentService,
  deleteUserService,
  getPaginatedStudentsService,
  getPaginatedUsersService,
  IGetPaginatedUsersParams,
} from "@/services/user.service";
import _ from "lodash";

const ListStudentsPage = () => {
  // const { authenticated, role } = useAuthStore();

  // if (!authenticated || role !== UserRole.ADMIN) {
  //   return redirect("/");
  // }

  const [users, setUsers] = useState<any[]>([]);

  const [params, setParams] = useState<IGetPaginatedUsersParams>({
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

  const fetchStudents = useCallback(() => {
    getPaginatedStudentsService(params)
      .then((response) => {
        if (response.data.data) {
          const listStudents = response.data.data.map((student: any) => ({
            ...student,
            ..._.omit(student.user, "id"),
          }));
          setUsers(listStudents);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [params]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleDelete = async (id: string, userId: string) => {
    try {
      await deleteStudentService(id);
      await deleteUserService(userId);
      toast.success("Xóa sinh viên thành công");
      fetchStudents(); // Refresh the table data
    } catch (error) {
      toast.error("Xóa sinh viên thất bại");
    }
  };

  const columns = createColumns(handleDelete);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={users} onDataChange={fetchStudents} />
    </div>
  );
};

export default ListStudentsPage;
