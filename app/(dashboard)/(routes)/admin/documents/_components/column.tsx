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
    accessorKey: "documentName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên tài liệu
          <ArrowUpDown className="w-4 h-4 ml-2" />
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
          <ArrowUpDown className="w-4 h-4 ml-2" />
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
            <Button variant="ghost" size="icon" className="w-4 h-4 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/admin/documents/${id}`}>
              <DropdownMenuItem>
                <Pencil className="w-4 h-4 mr-2" />
                Sửa
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => onDelete(id)}>
              <Trash className="w-4 h-4 mr-2" />
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
