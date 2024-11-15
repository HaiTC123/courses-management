"use client";

import { UserRole } from "@/enum/user-role";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const InstructorLayout = ({ children }: { children: React.ReactNode }) => {
  const { role } = useAuthStore.getState();
  const router = useRouter();

  useEffect(() => {
    if (role !== UserRole.INSTRUCTOR && role !== UserRole.ADMIN) {
      toast.error("Bạn không có quyền truy cập vào trang này");
      router.push("/");
    }
  }, [router, role]);

  return <section>{children}</section>;
};

export default InstructorLayout;
