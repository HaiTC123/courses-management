"use client";

import { AUTH_STORAGE_KEY } from "@/constants/local-storage-key";
import { UserRole } from "@/enum/user-role";
import {
  getCurrentUserService,
  SignInParams,
  signInService,
  signOutService,
  SignUpParams,
  signUpService,
} from "@/services/auth.service";
// Importing create function from the Zustand library
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// export interface SignUpParams {
//   fullName: string;
//   email: string;
//   password: string;
// }
// export interface SignInParams {
//   email: string;
//   password: string;
// }

// Defining an interface for the store's state
interface AuthStoreInterface {
  authenticated: boolean; // a boolean value indicating whether the user is authenticated or not
  setAuthentication: (val: boolean) => void; // a function to set the authentication status
  user: any; // an object that stores user information
  setUser: (user: any) => void; // a function to set user information
  token: string | null;
  setToken: (token: string | null) => void;
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
  signIn: (params: SignInParams) => Promise<any>;
  signUp: (params: SignUpParams) => Promise<any>;
  signOut: () => Promise<any>;
  getCurrentUser: () => Promise<any>;
}

// create our store
export const useAuthStore = create(
  persist<AuthStoreInterface>(
    (set) => ({
      authenticated: false, // initial value of authenticated property
      user: {}, // initial value of user property
      setAuthentication: (val) => set((state) => ({ authenticated: val })), // function to set the authentication status
      setUser: (user) => set({ user }), // function to set user information
      token: null,
      setToken: (token: string | null) => set({ token }),
      role: null,
      setRole: (role: UserRole | null) => set({ role }),
      signIn: async (params: SignInParams) => {
        const response = await signInService(params);
        set({
          authenticated: true,
          // user: response.data,
          token: response.data.token,
          role: response.data.role,
        });
        return response;
      },
      signUp: async (params: SignUpParams) => {
        const response = await signUpService(params);
        return response;
      },
      signOut: async () => {
        // const response = await signOutService();
        set({ authenticated: false, user: {}, token: null, role: null });
        return {};
      },
      getCurrentUser: async () => {
        const response = await getCurrentUserService();
        set({ user: response.data });
        return response;
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
