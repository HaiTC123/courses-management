"use client";

import { connectSocket } from "@/services/socket.service";
import { Inter } from "next/font/google";
import { Suspense, useEffect } from "react";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import { ToasterProvider } from "@/components/providers/toaster-provider";
import { mapNotificationType } from "@/constants/notifications";
import { useAuthStore } from "@/store/use-auth-store";
import { useNotiStore } from "@/store/use-noti-store";

import { AdviseChat } from "@/components/advise-chat";
import { SocketInstance } from "@/lib/socket-instance";
import { getListNotification } from "@/services/notification.service";
import { toast } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore.getState();
  const { addNotification, setNotifications } = useNotiStore();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const res = await getListNotification({
          pageSize: 1000,
          pageNumber: 1,
          conditions: [
            {
              key: "receiveId",
              value: user.id,
              condition: "equal",
            },
          ],
          sortOrder: "createdAt desc",
          searchKey: "",
          searchFields: [],
        });
        if (res.data.data) {
          setNotifications(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (user.id) {
      getNotifications();
    }
  }, [setNotifications, user.id]);

  useEffect(() => {
    const handleConnectSocket = async () => {
      const connectionID = uuidv4();
      const userID = user.id;
      try {
        const res = await connectSocket(userID, connectionID);
        if (res && !SocketInstance.socket) {
          SocketInstance.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);
          SocketInstance.socket.on("connect", () => {
            SocketInstance.socket.emit("register", userID, connectionID);
          });
          SocketInstance.socket.on("message", (message: any) => {
            console.log("[LOGS] socket message", message);
            const newNotifications = {
              title: mapNotificationType(message).title,
              link: mapNotificationType(message).link,
              createdAt: message.createdAt,
              isViewed: message.isViewed,
              id: message.id,
            };
            addNotification(newNotifications);
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Lỗi kết nối socket");
      }
    };
    if (user.id && !SocketInstance.socket) {
      handleConnectSocket();
    }
    return () => {
      SocketInstance.socket?.off("connect");
      SocketInstance.socket?.off("message");
      SocketInstance.socket?.disconnect();
    };
  }, [user, addNotification]);

  return (
    <html lang="en">
      <head>
        <title>Quản lý khóa học</title>
        <meta name="description" content="Website for managing courses" />
      </head>
      <body className={inter.className}>
        <ToasterProvider />
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          <AdviseChat />
        </Suspense>
      </body>
    </html>
  );
}
