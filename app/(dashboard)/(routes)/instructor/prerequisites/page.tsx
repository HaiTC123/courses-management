"use client";

import {
  deleteDocumentService,
  getPaginatedDocumentsService,
  IGetPaginatedDocumentsParams,
} from "@/services/document.service";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createColumns } from "./_components/column";
import { DataTable } from "./_components/data-table";
import {
  getPaginatedPrerequisitesService,
  IGetPaginatedPrerequisitesParams,
} from "@/services/prerequisite.service";

const PrerequisitesPage = () => {
  const [prerequisites, setPrerequisites] = useState<any[]>([]);

  const [params, setParams] = useState<IGetPaginatedPrerequisitesParams>({
    pageSize: 1000,
    pageNumber: 1,
    conditions: [],
    sortOrder: "",
    searchKey: "",
    searchFields: [],
    includeReferences: {
      prerequisiteCourse: true,
    },
  });

  const fetchPrerequisites = useCallback(() => {
    getPaginatedPrerequisitesService(params)
      .then((response) => {
        if (response.data.data) {
          const listPrerequisites = response.data.data.map(
            (prerequisite: any) => ({
              ...prerequisite,
            })
          );
          console.log(listPrerequisites);
          setPrerequisites(listPrerequisites);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [params]);

  useEffect(() => {
    fetchPrerequisites();
  }, [fetchPrerequisites]);

  const handleDelete = async (id: string) => {
    await deleteDocumentService(Number(id));
    toast.success("Xóa điều kiện tiên quyết thành công");
    fetchPrerequisites();
  };

  const columns = createColumns(handleDelete);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={prerequisites} />
    </div>
  );
};

export default PrerequisitesPage;
