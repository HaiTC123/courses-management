"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useRef } from 'react';
import { Certificate } from "@/components/certificate";
import { format, parseISO  } from "date-fns";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Course = {
  id: string;
  title: string;
  price: number;
  isPublished: boolean;
  fullName: string;
};

export const createColumns = (
  certificateRef: any
): ColumnDef<Course>[] => [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên chứng chỉ
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "learningPathName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên lộ trình 
          
        </Button>
      );
    },

  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày cấp
          
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const dateValue = getValue(); 
      const formattedDate = format(parseISO(dateValue + ""), 'dd/MM/yyyy'); 
      return <span>{formattedDate}</span>; 
    }
    
  },
  {
    accessorKey: "id", 
    header: () => <span>Xem chứng chỉ</span>,
    cell: ({ row }) => (
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Xem chứng chỉ</Button>
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle>Chứng chỉ của bạn</DialogTitle>
          <DialogDescription>Bạn đã xuất sắc hoàn thành lộ trình này! Đây là chứng chỉ của bạn.</DialogDescription>
        </DialogHeader>
        <Certificate
          ref={certificateRef}
          courseName={row.original.title}
          userName={row.original.fullName}
          instructorName="course"
        />
        <DialogFooter>
          <Button
            variant="default"
            onClick={() =>
              certificateRef.current?.downloadCertificate()
            }
          >
            Tải chứng chỉ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    ),
  },

];
