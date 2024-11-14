"use client";

import { NOTI_STORAGE_KEY } from "@/constants/local-storage-key";
import { mapNotificationType } from "@/constants/notifications";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Defining an interface for the store's state
interface AuthStoreInterface {
  notifications: any[];
  addNotification: (notification: any) => void;
  setNotifications: (notifications: any[]) => void;
}

// create our store
export const useNotiStore = create<AuthStoreInterface>((set) => ({
  notifications: [],
  addNotification: (notification: any) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
    }));
  },
  setNotifications: (notifications: any[]) => {
    const newNotifications = notifications.map((item: any) => ({
      createdAt: item.createdAt,
      isViewed: item.isViewed,
      title: mapNotificationType(item).title,
      link: mapNotificationType(item).link,
      id: item.id,
    }));
    set({ notifications: newNotifications });
  },
}));
