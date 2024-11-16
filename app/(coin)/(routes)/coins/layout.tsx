"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/use-auth-store";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CoinsLayout = ({ children }: { children: React.ReactNode }) => {
  const authenticated = useAuthStore.getState().authenticated;
  const router = useRouter();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
    if (!authenticated) {
      router.push("/sign-in");
    }
  }, [router, authenticated]);

  return (
    <>
      {domLoaded && (
        <main className="max-w-3xl px-4 pt-6 mx-auto md:px-0">
          <div className="flex items-center justify-between w-full gap-2 mb-6">
            <Button variant="outline" onClick={() => router.push("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden md:block">Trở về trang chủ</span>
            </Button>
            <h1 className="mb-4 text-2xl font-bold md:text-4xl">
              Quản lý coin
            </h1>
          </div>
          {children}
        </main>
      )}
    </>
  );
};

export default CoinsLayout;
