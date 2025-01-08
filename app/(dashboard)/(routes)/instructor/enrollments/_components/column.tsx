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
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         ID
  //         <ArrowUpDown className="w-4 h-4 ml-2" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const id: any = row.getValue("id") || "";

  //     return <div>{id}</div>;
  //   },
  // },
  {
    accessorKey: "student",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Học viên
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const student: any = row.getValue("student") || "";

      return (
        <div className="text-center text-blue-500">
          <Link href={`/admin/students/edit/${student?.id}`}>
            {student?.user?.fullName}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "course",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Khóa học
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const course: any = row.getValue("course") || "";

      return (
        <div className="text-center text-blue-500 whitespace-nowrap">
          <Link href={`/courses/${course.id}`}>{course.courseName}</Link>
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
            enrollmentStatus === ENROLLMENT_STATUS.IN_PROGRESS && "bg-sky-700",
            enrollmentStatus === ENROLLMENT_STATUS.DONE && "bg-green-500"
          )}
        >
          {enrollmentStatus === ENROLLMENT_STATUS.IN_PROGRESS && "Đang học"}
          {enrollmentStatus === ENROLLMENT_STATUS.DONE && "Đã hoàn thành"}
        </Badge>
      );
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const { id, userId } = row.original;

  //     const handleDelete = async () => {
  //       try {
  //         await onDelete(id, userId);
  //       } catch (error) {
  //         console.error("Error deleting student:", error);
  //       }
  //     };

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" size="icon" className="w-4 h-4 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="w-4 h-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <Link href={`/admin/students/edit/${id}`}>
  //             <DropdownMenuItem>
  //               <Pencil className="w-4 h-4 mr-2" />
  //               Sửa
  //             </DropdownMenuItem>
  //           </Link>
  //           <DropdownMenuItem onClick={handleDelete}>
  //             <Trash className="w-4 h-4 mr-2" />
  //             Xóa
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
