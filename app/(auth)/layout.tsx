"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuthStore } from "@/store/use-auth-store";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const authenticated = useAuthStore.getState().authenticated;
  const router = useRouter();

  useEffect(() => {
    if (authenticated) {
      router.back();
    }
  }, [authenticated, router]);

  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  );
};

export default AuthLayout;
