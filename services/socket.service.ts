import axiosInstance from "@/lib/axios-instance";

export const connectSocket = (userId: string, connectionId: string) => {
  const url = `${process.env.NEXT_PUBLIC_SOCKET_URL}/api/${userId}/register?connectionId=${connectionId}`;
  const authToken = process.env.NEXT_PUBLIC_SOCKET_TOKEN!;
  return axiosInstance.put(
    url,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": authToken,
      },
    }
  );
};
