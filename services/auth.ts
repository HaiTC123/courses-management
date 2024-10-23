import axiosInstance from "@/lib/axios-instance";

export interface SignUpParams {
  fullName: string;
  email: string;
  password: string;
}

export const signUp = async (params: SignUpParams) => {
  const response = await axiosInstance.post("/api/auth/register", params);
  return response.data;
};

export interface SignInParams {
  email: string;
  password: string;
}

export const signIn = async (params: SignInParams) => {
  const response = await axiosInstance.post("/api/auth/login", params);
  return response.data;
};
