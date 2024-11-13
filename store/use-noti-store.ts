"use client";

import { NOTI_STORAGE_KEY } from "@/constants/local-storage-key";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Defining an interface for the store's state
interface AuthStoreInterface {
  notifications: any[];
  addNotification: (notification: any) => void;
  setNotifications: (notifications: any[]) => void;
}

// create our store
export const useNotiStore = create(
  persist<AuthStoreInterface>(
    (set) => ({
      notifications: [],
      addNotification: (notification: any) => {
        set((state) => ({
          notifications: [notification, ...state.notifications],
        }));
      },
      setNotifications: (notifications: any[]) => {
        set({ notifications });
      },
    }),
    {
      name: NOTI_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
