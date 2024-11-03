import axiosInstance from "@/lib/axios-instance";

export interface ICondition {
  key: string;
  condition: string;
  value: string | number;
}

export interface IGetPaginatedLearningPathsParams {
  pageSize: number;
  pageNumber: number;
  conditions: ICondition[];
  sortOrder: string;
  searchKey: string;
  searchFields: string[];
  includeReferences: any;
}

export const getPaginatedLearningPathsService = async (
  params: IGetPaginatedLearningPathsParams
) => {
  const response = await axiosInstance.post("/api/learnpath/paging", params);
  return response.data;
};

//#region Learning Path
export const addLearningPathService = async (data: any) => {
  const response = await axiosInstance.post("/api/learnpath", data);
  return response.data;
};

export const updateLearningPathService = async (
  learningPathId: number,
  data: any
) => {
  const response = await axiosInstance.put(
    `/api/learnpath/${learningPathId}`,
    data
  );
  return response.data;
};

export const getLearningPathByIdService = async (learningPathId: number) => {
  const response = await axiosInstance.get(
    `/api/learnpath/${learningPathId}/courses`
  );
  return response.data;
};
//#endregion

//#region Learn Course
export const addLearnCourseService = async (data: any) => {
  const response = await axiosInstance.post("/api/learncourse", data);
  return response.data;
};

export const updateLearnCourseService = async (
  learnCourseId: number,
  data: any
) => {
  const response = await axiosInstance.put(
    `/api/learncourse/${learnCourseId}`,
    data
  );
  return response.data;
};

export const getLearnCourseByIdService = async (learnCourseId: number) => {
  const response = await axiosInstance.get(
    `/api/learncourse/detail/${learnCourseId}`
  );
  return response.data;
};
//#endregion
