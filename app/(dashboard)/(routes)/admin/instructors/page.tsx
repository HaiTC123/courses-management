"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

import { columns } from "./_components/column";
import { DataTable } from "./_components/data-table";
import { useAuthStore } from "@/store/use-auth-store";
import { UserRole } from "@/enum/user-role";
import {
  getPaginatedInstructorsService,
  IGetPaginatedUsersParams,
} from "@/services/user.service";

const ListInstructorsPage = () => {
  // const { authenticated, role } = useAuthStore();

  // if (!authenticated || role !== UserRole.ADMIN) {
  //   return redirect("/");
  // }

  const [users, setUsers] = useState<any[]>([]);

  const [params, setParams] = useState<IGetPaginatedUsersParams>({
    pageSize: 10,
    pageNumber: 1,
    conditions: [],
    sortOrder: "",
    searchKey: "",
    searchFields: [],
    includeReferences: {
      user: true,
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getPaginatedInstructorsService(params)
      .then((response) => {
        console.log(response);
        if (response.data.data) {
          const listInstructors = response.data.data.map((instructor: any) => {
            return {
              ...instructor,
              ...instructor.user,
            };
          });
          setUsers(listInstructors);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [params]);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default ListInstructorsPage;
