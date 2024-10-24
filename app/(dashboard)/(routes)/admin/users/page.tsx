"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

import { columns } from "./_components/column";
import { DataTable } from "./_components/data-table";
import { useAuthStore } from "@/store/use-auth-store";
import { UserRole } from "@/enum/user-role";
import {
  getPaginatedUsersService,
  IGetPaginatedUsersParams,
} from "@/services/user";

const AdminUsersPage = () => {
  // const { authenticated, role } = useAuthStore();

  // if (!authenticated || role !== UserRole.ADMIN) {
  //   return redirect("/");
  // }

  const courses = [
    {
      id: "1",
      title: "Course 1",
      price: 100,
      isPublished: true,
    },
    {
      id: "2",
      title: "Course 2",
      price: 200,
      isPublished: false,
    },
    {
      id: "3",
      title: "Course 3",
      price: 300,
      isPublished: true,
    },
    {
      id: "4",
      title: "Course 4",
      price: 400,
      isPublished: false,
    },
    {
      id: "5",
      title: "Course 5",
      price: 500,
      isPublished: true,
    },
    {
      id: "6",
      title: "Course 6",
      price: 600,
      isPublished: false,
    },
    {
      id: "7",
      title: "Course 7",
      price: 700,
      isPublished: true,
    },
    {
      id: "8",
      title: "Course 8",
      price: 800,
      isPublished: false,
    },
    {
      id: "9",
      title: "Course 9",
      price: 900,
      isPublished: true,
    },
    {
      id: "10",
      title: "Course 10",
      price: 1000,
      isPublished: false,
    },
    {
      id: "11",
      title: "Course 11",
      price: 1100,
      isPublished: true,
    },
    {
      id: "12",
      title: "Course 12",
      price: 1200,
      isPublished: false,
    },
    {
      id: "13",
      title: "Course 13",
      price: 1300,
      isPublished: true,
    },
  ];

  const [users, setUsers] = useState<any[]>([]);

  const [params, setParams] = useState<IGetPaginatedUsersParams>({
    pageSize: 10,
    pageNumber: 1,
    conditions: [],
    sortOrder: "",
    searchKey: "",
    searchFields: [],
    includeReferences: null,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getPaginatedUsersService(params)
      .then((response) => {
        console.log(response);
        if (response.data.data) {
          setUsers(response.data.data);
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

export default AdminUsersPage;
