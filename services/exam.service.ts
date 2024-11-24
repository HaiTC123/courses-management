import axiosInstance from "@/lib/axios-instance";

export interface ICondition {
  key: string;
  condition: string;
  value: string | number | boolean;
}

export interface IGetPaginatedExamsParams {
  pageSize: number;
  pageNumber: number;
  conditions: ICondition[];
  sortOrder: string;
  searchKey: string;
  searchFields: string[];
  includeReferences: any;
}

export const getPaginatedExamsService = async (
  params: IGetPaginatedExamsParams
) => {
  const response = await axiosInstance.post("/api/exam/paging", params);
  return response.data;
};

export const addExamService = async (data: any) => {
  const response = await axiosInstance.post("/api/exam", data);
  return response.data;
};

export const updateExamService = async (examId: number, data: any) => {
  const response = await axiosInstance.put(`/api/exam/${examId}`, data);
  return response.data;
};

export const deleteExamService = async (examId: number) => {
  const response = await axiosInstance.delete(`/api/exam/${examId}`);
  return response.data;
};

export const getExamByIdService = async (examId: number, body: any) => {
  const response = await axiosInstance.post(
    `/api/exam/${examId}/reference`,
    body
  );
  return response.data;
};

export const publishExamService = async (examId: number) => {
  const response = await axiosInstance.post(`/api/exam/publishExam/${examId}`);
  return response.data;
};

export const getExamDetailService = async (examId: number) => {
  const response = await axiosInstance.get(`/api/exam/detail/${examId}`);
  return response.data;
};

export const submitExamService = async (examId: number, data: any) => {
  const response = await axiosInstance.post(`/api/exam/${examId}/submit`, data);
  return response.data;
};

export const getExamResultService = async (
  examId: number,
  studentId: number
) => {
  const response = await axiosInstance.get(
    `/api/exam/${examId}/${studentId}/result`
  );
  return response.data;
};
