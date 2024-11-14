"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import Paginator from "@/components/paginator";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Lọc khóa học..."
          value={
            (table.getColumn("courseName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("courseName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* <Link href="/instructor/create">
          <Button>
            <PlusCircle className="w-4 h-4 mr-2" />
            Tạo khóa học
          </Button>
        </Link> */}
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length
            ? `${table.getFilteredSelectedRowModel().rows.length} of{" "}`
            : null}
          {table.getFilteredRowModel().rows.length} row(s)
        </div>
        <div className="flex justify-end">
          <Paginator
            currentPage={table.getState().pagination.pageIndex + 1}
            totalPages={table.getPageCount()}
            onPageChange={(pageNumber) => table.setPageIndex(pageNumber - 1)}
            showPreviousNext
          />
        </div>
      </div>
      {/* <div className="flex items-center justify-end py-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div> */}
    </div>
  );
}
