import axiosInstance from "@/lib/axios-instance";

export interface ICondition {
  key: string;
  condition: string;
  value: string | number;
}

export interface IGetPaginatedAdvisesParams {
  pageSize: number;
  pageNumber: number;
  conditions: ICondition[];
  sortOrder: string;
  searchKey: string;
  searchFields: string[];
  includeReferences: any;
}

export const getPaginatedAdvisesService = async (
  params: IGetPaginatedAdvisesParams
) => {
  const response = await axiosInstance.post(
    "/api/academicAdvising/paging",
    params
  );
  return response.data;
};

export const userSendToAdvisorService = async (data: any) => {
  const response = await axiosInstance.post("/api/academicAdvising", data);
  return response.data;
};

export const instructorApproveAdviseService = async (adviseId: number) => {
  const response = await axiosInstance.put(
    `/api/academicAdvising/advisor/approved/${adviseId}`
  );
  return response.data;
};

export const instructorRejectAdviseService = async (adviseId: number) => {
  const response = await axiosInstance.put(
    `/api/academicAdvising/advisor/cancel/${adviseId}`
  );
  return response.data;
};

export const studentCancelAdviseService = async (adviseId: number) => {
  const response = await axiosInstance.put(
    `/api/academicAdvising/student/cancel/${adviseId}`
  );
  return response.data;
};

export const instructorCompleteAdviseService = async (adviseId: number) => {
  const response = await axiosInstance.put(
    `/api/academicAdvising/advisor/done/${adviseId}`
  );
  return response.data;
};
