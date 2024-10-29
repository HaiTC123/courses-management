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
import { deleteStudentService, deleteUserService } from "@/services/user";

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
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    // cell: ({ row }) => {
    //   const price = parseFloat(row.getValue("price"));
    //   const formatted = new Intl.NumberFormat("en-US", {
    //     style: "currency",
    //     currency: "USD",
    //   }).format(price);

    //   return formatted;
    // },
  },
  // {
  //   accessorKey: "isPublished",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >d
  //         Published
  //         <ArrowUpDown className="w-4 h-4 ml-2" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const isPublished = row.getValue("isPublished") || false;

  //     return (
  //       <Badge className={cn("bg-slate-500", isPublished && "bg-sky-700")}>
  //         {isPublished ? "Published" : "Draft"}
  //       </Badge>
  //     );
  //   },
  // },
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
