import axiosInstance from "@/lib/axios-instance";

export const getPaginatedQuestionsService = async (params: any) => {
  const response = await axiosInstance.post("/api/question/paging", params);
  return response.data;
};

export const getQuestionByIdService = async (id: number) => {
  const response = await axiosInstance.get(`/api/question/${id}`);
  return response.data;
};

export const addQuestionService = async (data: any) => {
  const response = await axiosInstance.post("/api/question", data);
  return response.data;
};

export const updateQuestionService = async (id: number, data: any) => {
  const response = await axiosInstance.put(`/api/question/${id}`, data);
  return response.data;
};

export const deleteQuestionService = async (id: number) => {
  const response = await axiosInstance.delete(`/api/question/${id}`);
  return response.data;
};

