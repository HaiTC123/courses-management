import axiosInstance from "@/lib/axios-instance";

export const userChatWithInstructorService = async (data: any) => {
  const response = await axiosInstance.post(`/api/advisingChat/student`, data);
  return response.data;
};

export const instructorChatWithStudentService = async (data: any) => {
  const response = await axiosInstance.post(`/api/advisingChat/advisor`, data);
  return response.data;
};

export const getChatPagingService = async (param: any) => {
  const response = await axiosInstance.post(`/api/advisingChat/paging`, param);
  return response.data;
};
