import axiosInstance from "@/lib/axios-instance";

export interface ICondition {
  key: string;
  condition: string;
  value: string | number;
}

export interface IGetPaginatedDocumentTypesParams {
  pageSize: number;
  pageNumber: number;
  conditions: ICondition[];
  sortOrder: string;
  searchKey: string;
  searchFields: string[];
  includeReferences: any;
}

export const getPaginatedDocumentTypesService = async (
  params: IGetPaginatedDocumentTypesParams
) => {
  const response = await axiosInstance.post(
    "/api/categoryDocument/paging",
    params
  );
  return response.data;
};

//#region Document Type
export const addDocumentTypeService = async (data: any) => {
  const response = await axiosInstance.post("/api/categoryDocument", data);
  return response.data;
};

export const updateDocumentTypeService = async (
  documentTypeId: number,
  data: any
) => {
  const response = await axiosInstance.put(
    `/api/categoryDocument/${documentTypeId}`,
    data
  );
  return response.data;
};

export const getDocumentTypeByIdService = async (documentTypeId: number) => {
  const response = await axiosInstance.get(
    `/api/categoryDocument/${documentTypeId}`
  );
  return response.data;
};

export const deleteDocumentTypeService = async (documentTypeId: number) => {
  const response = await axiosInstance.delete(
    `/api/categoryDocument/${documentTypeId}`
  );
  return response.data;
};
//#endregion
