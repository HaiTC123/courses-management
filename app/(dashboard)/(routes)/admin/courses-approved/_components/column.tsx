"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Check,
  MoreHorizontal,
  Pencil,
  Send,
  Trash,
  X,
} from "lucide-react";
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
import { CourseStatus } from "@/enum/course-status";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Course = {
  id: string;
  title: string;
  price: number;
  isPublished: boolean;
};

export const createColumns = (
  onDelete: (id: string) => Promise<void>,
  onCheckCourse: (id: string, status: string) => Promise<void>
): ColumnDef<Course>[] => [
  {
    accessorKey: "courseName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tiêu đề
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giá
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);

      return formatted;
    },
  },
  {
    accessorKey: "status",
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
      const status = row.getValue("status") ?? CourseStatus.DRAFT;

      let color = "bg-slate-500";
      let text = "Bản nháp";
      if (status === CourseStatus.APPROVED) {
        color = "bg-sky-700";
        text = "Đã duyệt";
      } else if (status === CourseStatus.REJECTED) {
        color = "bg-red-500";
        text = "Đã từ chối";
      } else if (status === CourseStatus.PENDING_APPROVAL) {
        color = "bg-yellow-500";
        text = "Chờ duyệt";
      }

      return <Badge className={cn(color)}>{text}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-4 h-4 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/instructor/courses/${id}`}>
              <DropdownMenuItem>
                <Pencil className="w-4 h-4 mr-2" />
                Sửa
              </DropdownMenuItem>
            </Link>
            {/* <DropdownMenuItem
              onClick={() => {
                onCheckCourse(id, CourseStatus.APPROVED);
              }}
            >
              <Check className="w-4 h-4 mr-2" />
              Phê duyệt
            </DropdownMenuItem> */}
            {/* <DropdownMenuItem
              onClick={() => {
                onCheckCourse(id, CourseStatus.REJECTED);
              }}
            >
              <X className="w-4 h-4 mr-2" />
              Từ chối
            </DropdownMenuItem> */}
            {/* <Link href={`/instructor/courses/${id}`}>
              <DropdownMenuItem>
                <Trash className="w-4 h-4 mr-2" />
                Xóa
              </DropdownMenuItem>
            </Link> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
