"use client";

import { DEFAULT_IMAGE } from "@/constants/default-image";
import { useCallback, useState, useEffect } from "react";
import { getPaginatedDocumentsService } from "@/services/document.service";
import toast from "react-hot-toast";
import { DocumentCard } from "./document-card ";

interface DocumentListProps {
  title: string;
}

export const DocumentList: React.FC<DocumentListProps> = ({ title }) => {
  const [documents, setDocuments] = useState<any[]>([]);

  const fetchDocuments = useCallback(() => {
    getPaginatedDocumentsService({
      pageSize: 1000,
      pageNumber: 1,
      conditions: [],
      sortOrder: "",
      searchKey: "",
      searchFields: [],
      includeReferences: {
        category: true,
      },
    })
      .then((response) => {
        if (response.data.data) {
          const listDocuments = response.data.data.map((document: any) => ({
            ...document,
          }));
          setDocuments(listDocuments);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {documents.map((item) => (
          <DocumentCard
            key={item.id}
            id={item.id}
            title={item.documentName}
            imageUrl={item.backgroundUrl || DEFAULT_IMAGE}
            category={item.category.name}
            description={item.description}
            accessUrl={item.accessUrl}
            fileType={item.fileType}
          />
        ))}
      </div>
      {documents.length === 0 && (
        <div className="mt-10 text-sm text-center text-muted-foreground">
          Không tìm thấy tài liệu
        </div>
      )}
    </div>
  );
};
