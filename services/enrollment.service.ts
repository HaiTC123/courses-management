import axiosInstance from "@/lib/axios-instance";

export interface ICondition {
  key: string;
  condition: string;
  value: string | number;
}

export interface IGetPaginatedEnrollmentsParams {
  pageSize: number;
  pageNumber: number;
  conditions: ICondition[];
  sortOrder: string;
  searchKey: string;
  searchFields: string[];
  includeReferences: any;
}

export const getPaginatedEnrollmentsService = async (
  params: IGetPaginatedEnrollmentsParams
) => {
  const response = await axiosInstance.post("/api/enrollment/pagingV2", params);
  return response.data;
};
