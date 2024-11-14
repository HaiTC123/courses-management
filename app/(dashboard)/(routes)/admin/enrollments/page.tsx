"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getPaginatedEnrollmentsService } from "@/services/enrollment.service";
import { createColumns } from "./_components/column";
import { DataTable } from "./_components/data-table";

const ListEnrollmentsPage = () => {
  const [enrollments, setEnrollments] = useState<any[]>([]);

  const fetchEnrollments = useCallback(async () => {
    try {
      const response = await getPaginatedEnrollmentsService({
        pageSize: 1000,
        pageNumber: 1,
        conditions: [],
        sortOrder: "",
        searchKey: "",
        searchFields: [],
        includeReferences: {},
      });
      if (response.data.data) {
        const listEnrollments = response.data.data.map((enrollment: any) => ({
          ...enrollment,
        }));
        setEnrollments(listEnrollments);
      }
    } catch (error) {
      toast.error((error as any).message);
    }
  }, []);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const handleDelete = async (id: string, userId: string) => {
    // try {
    //   await deleteStudentService(id);
    //   await deleteUserService(userId);
    //   toast.success("Xóa sinh viên thành công");
    //   fetchEnrollments(); // Refresh the table data
    // } catch (error) {
    //   toast.error("Xóa sinh viên thất bại");
    // }
  };

  const columns = createColumns(handleDelete);

  return (
    <div className="p-6">
      <DataTable
        columns={columns}
        data={enrollments}
        onDataChange={fetchEnrollments}
      />
    </div>
  );
};

export default ListEnrollmentsPage;
