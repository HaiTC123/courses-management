"use client";

import { LayoutDashboard } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { getDocumentTypeByIdService } from "@/services/document-type.service";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DocumentTypeForm } from "./_components/document-type-form";

const DocumentTypeIdPage = ({
  params,
}: {
  params: {
    documentTypeId: string;
  };
}) => {
  const { documentTypeId } = params;

  const [documentType, setDocumentType] = useState<any>({});

  const fetchDocumentType = useCallback(async () => {
    try {
      const response = await getDocumentTypeByIdService(Number(documentTypeId));
      if (response.data) {
        console.log(response.data);
        setDocumentType(response.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [documentTypeId]);

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
          <DocumentTypeForm
            initialData={documentType}
            documentTypeId={documentTypeId}
          />
        </div>
      </div>
    </div>
  );
};
export default DocumentTypeIdPage;
