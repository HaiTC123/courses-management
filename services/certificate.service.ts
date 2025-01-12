import axiosInstance from "@/lib/axios-instance";

export interface ICondition {
  key: string;
  condition: string;
  value: string | number | boolean;
}

export interface IGetPaginatedCertificateParams {
  pageSize: number;
  pageNumber: number;
  conditions: ICondition[];
  sortOrder: string;
  searchKey: string;
  searchFields: string[];
  includeReferences: any;
}

export const getPaginatedCertificateService = async (
  params: IGetPaginatedCertificateParams
) => {
  const response = await axiosInstance.post("/api/certificate/paging", params);
  return response.data;
};
