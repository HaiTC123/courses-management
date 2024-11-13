"use client";

import { UserRole } from "@/enum/user-role";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { role } = useAuthStore();
  const router = useRouter();

  if (role !== UserRole.ADMIN) {
    toast.error("Bạn không có quyền truy cập vào trang này");
    router.push("/");
    return;
  }

  return <section>{children}</section>;
};

export default AdminLayout;
