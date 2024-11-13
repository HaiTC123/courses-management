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
import {
  getPaginatedEnrollmentsService,
  IGetPaginatedEnrollmentsParams,
} from "@/services/enrollment.service";

const ListEnrollmentsPage = () => {
  // const { authenticated, role } = useAuthStore();

  // if (!authenticated || role !== UserRole.ADMIN) {
  //   return redirect("/");
  // }

  const [enrollments, setEnrollments] = useState<any[]>([]);

  const [params, setParams] = useState<IGetPaginatedEnrollmentsParams>({
    pageSize: 1000,
    pageNumber: 1,
    conditions: [],
    sortOrder: "",
    searchKey: "",
    searchFields: [],
    includeReferences: {},
  });

  const fetchEnrollments = useCallback(() => {
    getPaginatedEnrollmentsService(params)
      .then((response) => {
        console.log(response.data.data);
        if (response.data.data) {
          const listEnrollments = response.data.data.map((enrollment: any) => ({
            ...enrollment,
          }));
          setEnrollments(listEnrollments);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [params]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

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
      <DataTable
        columns={columns}
        data={enrollments}
        onDataChange={fetchEnrollments}
      />
    </div>
  );
};

export default ListEnrollmentsPage;
