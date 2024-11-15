"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/use-auth-store";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { authenticated } = useAuthStore.getState();
  const router = useRouter();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
    if (authenticated) {
      router.back();
    }
  }, [authenticated, router]);

  return (
    <>
      {domLoaded && (
        <div className="flex items-center justify-center h-full">
          {children}
        </div>
      )}
    </>
  );
};

export default AuthLayout;
