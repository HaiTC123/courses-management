import axiosInstance from "@/lib/axios-instance";

export interface ICondition {
  key: string;
  condition: string;
  value: string | number;
}

export interface IGetPaginatedDocumentsParams {
  pageSize: number;
  pageNumber: number;
  conditions: ICondition[];
  sortOrder: string;
  searchKey: string;
  searchFields: string[];
  includeReferences: any;
}

export const getPaginatedDocumentsService = async (
  params: IGetPaginatedDocumentsParams
) => {
  const response = await axiosInstance.post("/api/document/paging", params);
  return response.data;
};

//#region Document
export const addDocumentService = async (data: any) => {
  const response = await axiosInstance.post("/api/document", data);
  return response.data;
};

export const updateDocumentService = async (documentId: number, data: any) => {
  const response = await axiosInstance.put(`/api/document/${documentId}`, data);
  return response.data;
};

export const getDocumentByIdService = async (documentId: number) => {
  const response = await axiosInstance.get(`/api/document/${documentId}`);
  return response.data;
};

export const deleteDocumentService = async (documentId: number) => {
  const response = await axiosInstance.delete(`/api/document/${documentId}`);
  return response.data;
};
//#endregion
