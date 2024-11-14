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

const DocumentPage = () => {
  const [documents, setDocuments] = useState<any[]>([]);

  const [params, setParams] = useState<IGetPaginatedDocumentsParams>({
    pageSize: 1000,
    pageNumber: 1,
    conditions: [],
    sortOrder: "",
    searchKey: "",
    searchFields: [],
    includeReferences: [],
  });

  const fetchDocuments = useCallback(() => {
    getPaginatedDocumentsService(params)
      .then((response) => {
        if (response.data.data) {
          const listDocuments = response.data.data.map((document: any) => ({
            ...document,
          }));
          console.log(listDocuments);
          setDocuments(listDocuments);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [params]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleDelete = async (id: string) => {
    await deleteDocumentService(Number(id));
    toast.success("Xóa tài liệu thành công");
    fetchDocuments();
  };

  const columns = createColumns(handleDelete);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={documents} />
    </div>
  );
};

export default DocumentPage;
