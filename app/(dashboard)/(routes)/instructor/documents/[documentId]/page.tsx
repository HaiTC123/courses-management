"use client";

import { LayoutDashboard } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { getDocumentByIdService } from "@/services/document.service";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DocumentForm } from "./_components/document-form";

const DocumentIdPage = ({
  params,
}: {
  params: {
    documentId: string;
  };
}) => {
  const { documentId } = params;

  const [document, setDocument] = useState<any>({});

  const fetchDocumentType = useCallback(async () => {
    try {
      const response = await getDocumentByIdService(Number(documentId));
      if (response.data) {
        console.log(response.data);
        setDocument(response.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [documentId]);

  useEffect(() => {
    fetchDocumentType();
  }, [fetchDocumentType]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Cấu hình loại tài liệu</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-4">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Tùy chỉnh loại tài liệu</h2>
          </div>
          <DocumentForm initialData={document} documentId={documentId} />
        </div>
      </div>
    </div>
  );
};
export default DocumentIdPage;
