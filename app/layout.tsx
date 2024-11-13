"use client";

import { connectSocket } from "@/services/socket.service";
import _ from "lodash";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import { ToasterProvider } from "@/components/providers/toaster-provider";
import { useAuthStore } from "@/store/use-auth-store";

import { SpinnerProvider } from "@/components/providers/spinner-provider";
import { mapNotificationType } from "@/constants/notifications";
import { useNotiStore } from "@/store/use-noti-store";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

let socket: any;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();
  const { addNotification } = useNotiStore();

  useEffect(() => {
    if (!_.isEmpty(user)) {
      const connectionID = uuidv4();
      const userID = user.id;
      connectSocket(userID, connectionID).then(() => {
        socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);

        socket.on("connect", () => {
          console.log("connected");
          socket.emit("register", userID, connectionID);
        });

        socket.on("message", (message: any) => {
          const newNotifications = {
            title: mapNotificationType(message).title,
            link: mapNotificationType(message).link,
            createdAt: message.createdAt,
            isViewed: message.isViewed,
          };
          addNotification(newNotifications);
        });
      });
    }
    return () => {
      socket?.disconnect();
    };
  }, [user, addNotification]);

  return (
    <html lang="en">
      <head>
        <title>Courses Management</title>
        <meta name="description" content="Website for managing courses" />
      </head>
      <body className={inter.className}>
        <ToasterProvider />
        <SpinnerProvider>{children}</SpinnerProvider>
      </body>
    </html>
  );
}
