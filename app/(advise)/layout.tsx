"use client";

import { Suspense, useEffect, useState } from "react";
import { Navbar } from "../(dashboard)/_components/navbar";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";

const AdviseLayout = ({ children }: { children: React.ReactNode }) => {
  const [domLoaded, setDomLoaded] = useState(false);
  const { authenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setDomLoaded(true);
    if (!authenticated) {
      router.push("/sign-in");
    }
  }, [authenticated, router]);

  return (
    <>
      {domLoaded && (
        <div className="h-full">
          <div className="h-[80px] fixed inset-y-0 z-50 w-full">
            <Navbar />
          </div>
          <div className="flex h-auto min-h-full">
            <main className="pt-[80px] h-full w-full overflow-y-auto">
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </main>
          </div>
        </div>
      )}
    </>
  );
};
export default AdviseLayout;
