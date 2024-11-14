import axiosInstance from "@/lib/axios-instance";

export const postScheduledService = async (data: any) => {
  const response = await axiosInstance.post("/api/jobconfig", data);
  return response.data;
};
