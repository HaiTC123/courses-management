import axiosInstance from "@/lib/axios-instance";

export const getListNotification = async (params: any) => {
  const response = await axiosInstance.post("/api/user/notification", params);
  return response.data;
};

export const updateNotification = async (notificationId: number) => {
  const response = await axiosInstance.put(
    `/api/user/notification/${notificationId}`
  );
  return response.data;
};
