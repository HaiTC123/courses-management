import axiosInstance from "@/lib/axios-instance";

export interface ICondition {
  key: string;
  condition: string;
  value: string | number;
}

export interface IGetPaginatedUsersParams {
  pageSize: number;
  pageNumber: number;
  conditions: ICondition[];
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

export const getPaginatedInstructorsService = async (
  params: IGetPaginatedUsersParams
) => {
  const response = await axiosInstance.post("/api/instructor/paging", params);
  return response.data;
};

export const getPaginatedStudentsService = async (
  params: IGetPaginatedUsersParams
) => {
  const response = await axiosInstance.post("/api/student/paging", params);
  return response.data;
};

export const getUserByIdService = async (userId: string) => {
  const response = await axiosInstance.get(`/api/user/${userId}`);
  return response.data;
};

export const getStudentByIdService = async (studentId: string) => {
  const response = await axiosInstance.get(`/api/student/${studentId}`);
  return response.data;
};

export const getInstructorByIdService = async (instructorId: string) => {
  const response = await axiosInstance.get(`/api/instructor/${instructorId}`);
  return response.data;
};

export const createUserService = async (data: any) => {
  const response = await axiosInstance.post("/api/user", data);
  return response.data;
};

export const createStudentService = async (data: any) => {
  const response = await axiosInstance.post("/api/student", data);
  return response.data;
};

export const createInstructorService = async (data: any) => {
  const response = await axiosInstance.post("/api/instructor", data);
  return response.data;
};

export const deleteUserService = async (userId: string) => {
  const response = await axiosInstance.delete(`/api/user/${userId}`);
  return response.data;
};

export const deleteStudentService = async (studentId: string) => {
  const response = await axiosInstance.delete(`/api/student/${studentId}`);
  return response.data;
};

export const updateStudentService = async (studentId: number, data: any) => {
  const response = await axiosInstance.put(`/api/student/${studentId}`, data);
  return response.data;
};

export const updateUserService = async (userId: number, data: any) => {
  const response = await axiosInstance.put(`/api/user/${userId}`, data);
  return response.data;
};
