"use client";

import {
  deleteDocumentTypeService,
  getPaginatedDocumentTypesService,
  IGetPaginatedDocumentTypesParams,
} from "@/services/document-type.service";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createColumns } from "./_components/column";
import { DataTable } from "./_components/data-table";

const DocumentTypesPage = () => {
  const [documentTypes, setDocumentTypes] = useState<any[]>([]);

  const [params, setParams] = useState<IGetPaginatedDocumentTypesParams>({
    pageSize: 1000,
    pageNumber: 1,
    conditions: [],
    sortOrder: "",
    searchKey: "",
    searchFields: [],
    includeReferences: [],
  });

  const fetchDocumentTypes = useCallback(() => {
    getPaginatedDocumentTypesService(params)
      .then((response) => {
        if (response.data.data) {
          const listDocumentTypes = response.data.data.map(
            (documentType: any) => ({
              ...documentType,
            })
          );
          console.log(listDocumentTypes);
          setDocumentTypes(listDocumentTypes);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [params]);

  useEffect(() => {
    fetchDocumentTypes();
  }, [fetchDocumentTypes]);

  const handleDelete = async (id: string) => {
    await deleteDocumentTypeService(Number(id));
    toast.success("Xóa loại tài liệu thành công");
    fetchDocumentTypes();
  };

  const columns = createColumns(handleDelete);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={documentTypes} />
    </div>
  );
};

export default DocumentTypesPage;
