"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { UserRole } from "@/enum/user-role";
import { useAuthStore } from "@/store/use-auth-store";

export default function InstructorDashboard() {
  const role = useAuthStore((state) => state.role);
  const router = useRouter();

  if (role !== UserRole.INSTRUCTOR) {
    router.push("/");
    toast.error("You are not authorized to access this page");
  }

  return <div className="p-6 space-y-4">Instructor Dashboard</div>;
}
