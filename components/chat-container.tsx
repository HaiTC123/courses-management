"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DEFAULT_AVATAR } from "@/constants/default-avatar";
import { UserRole } from "@/enum/user-role";
import { SocketInstance } from "@/lib/socket-instance";
import {
  getChatPagingService,
  instructorChatWithStudentService,
  userChatWithInstructorService,
} from "@/services/advise-chat.service";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

interface Message {
  message: string;
  senderId: number;
  fullName: string;
  profilePictureURL?: string;
  timestamp?: Date | null;
}

export const ChatContainer = ({
  advise,
  user,
  role,
}: {
  advise: any;
  user: any;
  role: any;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const divRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      let response;
      if (role === UserRole.INSTRUCTOR) {
        response = await instructorChatWithStudentService({
          advisingId: advise.id,
          message: input,
        });
      } else {
        response = await userChatWithInstructorService({
          advisingId: advise.id,
          message: input,
        });
      }
      if (response) {
        setMessages((prev) => [
          ...prev,
          {
            message: input,
            senderId: user.id,
            fullName: user.fullName,
            profilePictureURL: user.profilePictureURL,
            timestamp: null,
          },
        ]);
        setInput("");
      }
    } catch (error) {
      toast.error("Gửi tin nhắn thất bại");
    }
  };

  // const getChatPaging = useCallback(async () => {
  //   const response = await getChatPagingService({
  //     pageSize: 1000,
  //     pageNumber: 1,
  //     conditions: [
  //       {
  //         key: "advisingId",
  //         condition: "equal",
  //         value: advise.id,
  //       },
  //     ],
  //     sortOrder: "createdAt desc",
  //     searchKey: "",
  //     searchFields: [],
  //     includeReferences: {
  //       sender: true,
  //     },
  //   });
  //   setMessages(
  //     response.data.data.reverse().map((item: any) => ({
  //       message: item.message,
  //       senderId: item.sender.id,
  //       fullName: item.sender.fullName,
  //       profilePictureURL: item.sender.profilePictureURL,
  //       timestamp: null,
  //     }))
  //   );
  // }, [advise.id]);

  useEffect(() => {
    const fetchChatPaging = async () => {
      const response = await getChatPagingService({
        pageSize: 1000,
        pageNumber: 1,
        conditions: [
          {
            key: "advisingId",
            condition: "equal",
            value: advise.id,
          },
        ],
        sortOrder: "createdAt desc",
        searchKey: "",
        searchFields: [],
        includeReferences: {
          sender: true,
        },
      });
      setMessages(
        response.data.data.reverse().map((item: any) => ({
          message: item.message,
          senderId: item.sender.id,
          fullName: item.sender.fullName,
          profilePictureURL: item.sender.profilePictureURL,
          timestamp: null,
        }))
      );
    };
    if (advise?.id) {
      fetchChatPaging();
    }
  }, [advise]);

  useEffect(() => {
    if (SocketInstance.socket) {
      SocketInstance.socket?.on("message", (message: any) => {
        console.log("[CHAT] chatting message", message);
        const rawData = JSON.parse(message.rawData);
        setMessages((prev) => [
          ...prev,
          {
            message: rawData.message,
            senderId: message.senderId,
            fullName: message.senderName,
            profilePictureURL:
              message.senderProfilePictureURL ?? DEFAULT_AVATAR,
            timestamp: null,
          },
        ]);
      });
    }
    return () => {
      SocketInstance.socket?.off("message");
    };
  }, []);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  return (
    <div className="flex flex-col flex-1 h-full">
      <Card className="flex-1 p-4 mb-4 overflow-auto">
        <ScrollArea className="h-full">
          <div className="space-y-4">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${
                  message.senderId === user.id ? "justify-end" : "justify-start"
                }`}
                ref={idx === messages.length - 1 ? divRef : null}
              >
                <div
                  className={`flex items-start gap-2 ${
                    message.senderId === user.id
                      ? "flex-row-reverse"
                      : "flex-row"
                  }`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={message.profilePictureURL ?? DEFAULT_AVATAR}
                    />
                    <AvatarFallback>
                      {message.fullName?.slice(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 max-w-[70%] ${
                      message.senderId === user.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.message}
                    <div className="mt-1 text-xs opacity-70">
                      {message?.timestamp?.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          maxLength={50}
        />
        <Button onClick={handleSend}>Gửi</Button>
      </div>
    </div>
  );
};
