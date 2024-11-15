"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CourseStatus } from "@/enum/course-status";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, Send, Trash } from "lucide-react";
import Link from "next/link";

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
  onSendToAdmin: (id: string) => Promise<void>
): ColumnDef<any>[] => [
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
      const formatted =
        price !== 0
          ? new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(price)
          : "Miễn phí";

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
      const { id, status } = row.original;

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
            {(status === CourseStatus.DRAFT ||
              status === CourseStatus.REJECTED) && (
              <DropdownMenuItem onClick={() => onSendToAdmin(id)}>
                <Send className="w-4 h-4 mr-2" />
                Gửi tới ADMIN
              </DropdownMenuItem>
            )}
            <Link href={`/instructor/courses/${id}`}>
              <DropdownMenuItem>
                <Trash className="w-4 h-4 mr-2" />
                Xóa
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
