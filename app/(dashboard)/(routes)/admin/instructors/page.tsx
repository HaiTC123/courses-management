"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  deleteInstructorService,
  deleteUserService,
  getPaginatedInstructorsService,
  IGetPaginatedUsersParams,
} from "@/services/user.service";
import { createColumns } from "./_components/column";
import { DataTable } from "./_components/data-table";
import _ from "lodash";

const ListInstructorsPage = () => {
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

  const fetchInstructors = useCallback(() => {
    getPaginatedInstructorsService(params)
      .then((response) => {
        if (response.data.data) {
          const listInstructors = response.data.data.map((instructor: any) => {
            return {
              ...instructor,
              ..._.omit(instructor.user, "id"),
            };
          });
          setUsers(listInstructors);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [params]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchInstructors();
  }, [fetchInstructors]);

  const handleDelete = async (id: string, userId: string) => {
    try {
      await deleteInstructorService(id);
      await deleteUserService(userId);
      toast.success("Xóa người hướng dẫn thành công");
      fetchInstructors(); // Refresh the table data
    } catch (error) {
      toast.error("Xóa người hướng dẫn thất bại");
    }
  };

  const columns = createColumns(handleDelete);

  return (
    <div className="p-6">
      <DataTable
        columns={columns}
        data={users}
        onDataChange={fetchInstructors}
      />
    </div>
  );
};

export default ListInstructorsPage;
