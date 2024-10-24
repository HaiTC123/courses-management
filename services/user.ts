import axiosInstance from "@/lib/axios-instance";

export interface IGetPaginatedUsersParams {
  pageSize: number;
  pageNumber: number;
  conditions: string[];
  sortOrder: string;
  searchKey: string;
  searchFields: string[];
  includeReferences: any;
}

export const getPaginatedUsersService = async (
  params: IGetPaginatedUsersParams
) => {
  const response = await axiosInstance.post("/api/user/paging", params);
  return response.data;
};
