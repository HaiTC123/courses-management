"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  deleteStudentService,
  deleteUserService,
} from "@/services/user.service";
import { ENROLLMENT_STATUS } from "@/constants/enrollement-status";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Course = {
//   id: string;
//   title: string;
//   price: number;
//   isPublished: boolean;
// };

export const createColumns = (
  onDelete: (id: string, userId: string) => Promise<void>
): ColumnDef<any>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const id: any = row.getValue("id") || "";

      return <div>{id}</div>;
    },
  },
  {
    accessorKey: "studentId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID Học viên
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const studentId: any = row.getValue("studentId") || "";

      return (
        <div className="text-center text-blue-500">
          <Link href={`/admin/students/edit/${studentId}`}>{studentId}</Link>
        </div>
      );
    },
  },
  {
    accessorKey: "courseId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID Khóa học
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const courseId: any = row.getValue("courseId") || "";

      return (
        <div className="text-center text-blue-500">
          <Link href={`/courses/${courseId}`}>{courseId}</Link>
        </div>
      );
    },
  },
  {
    accessorKey: "enrollmentDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời gian đăng ký
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const enrollmentDate: any = row.getValue("enrollmentDate") || "";

      return <div>{new Date(enrollmentDate).toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "completionDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời gian hoàn thành
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const completionDate: any = row.getValue("completionDate") || "";

      return <div>{new Date(completionDate).toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "enrollmentStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trạng thái
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const enrollmentStatus = row.getValue("enrollmentStatus") || "";

      return (
        <Badge
          className={cn(
            "bg-slate-500",
            enrollmentStatus === ENROLLMENT_STATUS.IN_PROGRESS && "bg-sky-700"
          )}
        >
          {enrollmentStatus === ENROLLMENT_STATUS.IN_PROGRESS && "Đang học"}
          {enrollmentStatus === ENROLLMENT_STATUS.APPROVED && "Đã xong"}
          {enrollmentStatus === ENROLLMENT_STATUS.PENDING && "Chờ duyệt"}
          {enrollmentStatus === ENROLLMENT_STATUS.REJECTED && "Đã từ chối"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id, userId } = row.original;

      const handleDelete = async () => {
        try {
          await onDelete(id, userId);
        } catch (error) {
          console.error("Error deleting student:", error);
          // Handle error (e.g., show an error toast)
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-4 h-4 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/admin/students/edit/${id}`}>
              <DropdownMenuItem>
                <Pencil className="w-4 h-4 mr-2" />
                Sửa
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={handleDelete}>
              <Trash className="w-4 h-4 mr-2" />
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
