import axiosInstance from "@/lib/axios-instance";

export interface ICondition {
  key: string;
  condition: string;
  value: string | number;
}

export interface IGetPaginatedPrerequisitesParams {
  pageSize: number;
  pageNumber: number;
  conditions: ICondition[];
  sortOrder: string;
  searchKey: string;
  searchFields: string[];
  includeReferences: any;
}

export const getPaginatedPrerequisitesService = async (
  params: IGetPaginatedPrerequisitesParams
) => {
  const response = await axiosInstance.post("/api/prerequisite/paging", params);
  return response.data;
};

//#region Prerequisite
export const addPrerequisiteService = async (data: any) => {
  const response = await axiosInstance.post("/api/prerequisite", data);
  return response.data;
};

export const updatePrerequisiteService = async (
  prerequisiteId: number,
  data: any
) => {
  const response = await axiosInstance.put(
    `/api/prerequisite/${prerequisiteId}`,
    data
  );
  return response.data;
};

export const getPrerequisiteByIdService = async (prerequisiteId: number) => {
  const response = await axiosInstance.get(
    `/api/prerequisite/${prerequisiteId}`
  );
  return response.data;
};

export const deletePrerequisiteService = async (prerequisiteId: number) => {
  const response = await axiosInstance.delete(
    `/api/prerequisite/${prerequisiteId}`
  );
  return response.data;
};
//#endregion
