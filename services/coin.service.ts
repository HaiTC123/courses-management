import axiosInstance from "@/lib/axios-instance";

export const depositCoinService = async (data: any) => {
  const response = await axiosInstance.post("/api/coins/deposit", data);
  return response.data;
};

export const getTransactionsHistoryService = async (params: any) => {
  const response = await axiosInstance.post("/api/transactionHistory/paging", {
    ...params,
  });
  return response.data;
};
