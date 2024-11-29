"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";

export const createColumns = (
  onDelete: (id: string) => Promise<void>
): ColumnDef<any>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên loại tài liệu
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mô tả
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const description: any = row.getValue("description");
      return (
        <div
          className="line-clamp-2"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="p-0 w-4 h-4">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/admin/document-types/${id}`}>
              <DropdownMenuItem>
                <Pencil className="mr-2 w-4 h-4" />
                Sửa
              </DropdownMenuItem>
            </Link>
            <Link href={`/admin/courses/${id}`}>
              <DropdownMenuItem>
                <Trash className="mr-2 w-4 h-4" />
                Xóa
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
