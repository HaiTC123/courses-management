"use client";

import { useState, useEffect, Suspense } from "react";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import Footer from "./_components/footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { authenticated } = useAuthStore.getState();
  const router = useRouter();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
    if (!authenticated) {
      // router.push("/sign-in");
    }
  }, [router, authenticated]);

  return (
    <>
      {domLoaded && (
        <div className="h-full">
          <div className="h-[80px] md:pl-56 fixed inset-y-0 z-50 w-full">
            <Navbar />
          </div>
          <div className="flex h-auto min-h-full">
            <div className="fixed top-0 left-0 z-[51] flex-col hidden w-56 h-full md:flex">
              <Sidebar />
            </div>
            <main className="pt-[80px] h-full w-full md:pl-56 overflow-y-auto">
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </main>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
