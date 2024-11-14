"use client";

import { UserRole } from "@/enum/user-role";
import { useAuthStore } from "@/store/use-auth-store";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Draggable from "react-draggable";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const AdviseChat = () => {
  const router = useRouter();

  const { role } = useAuthStore();

  if (!role || role === UserRole.ADMIN) {
    return null;
  }

  return (
    <Draggable>
      <div className="fixed cursor-move bottom-10 left-10 z-[52]">
        <Popover>
          <PopoverTrigger>
            <div className="relative">
              <div className="absolute rounded-full -inset-1 animate-pulse bg-blue-500/50"></div>
              <PlusCircle
                size={32}
                className="relative transition-transform hover:scale-110 hover:cursor-pointer animate-bounce infinite"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2">
              {role === UserRole.STUDENT && (
                <Button
                  onClick={() => router.push("/advise/create")}
                  variant="outline"
                >
                  Đăng ký tư vấn
                </Button>
              )}
              <Button
                onClick={() => {
                  if (role === UserRole.INSTRUCTOR) {
                    router.push("/instructor/advise");
                  } else {
                    router.push("/advise");
                  }
                }}
                variant="outline"
              >
                Xem các tư vấn
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </Draggable>
  );
};
