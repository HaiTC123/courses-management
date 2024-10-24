import axiosInstance from "@/lib/axios-instance";

export interface SignUpParams {
  fullName: string;
  email: string;
  password: string;
}

export const signUpService = async (params: SignUpParams) => {
  const response = await axiosInstance.post("/api/auth/register", params);
  return response.data;
};

export interface SignInParams {
  email: string;
  password: string;
}

export const signInService = async (params: SignInParams) => {
  const response = await axiosInstance.post("/api/auth/login", params);
  return response.data;
};

export const signOutService = async () => {
  const response = await axiosInstance.post("/api/auth/logout");
  return response.data;
};
