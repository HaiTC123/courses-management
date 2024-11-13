"use client";

import { useState, useEffect } from "react";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const authenticated = useAuthStore.getState().authenticated;
  const router = useRouter();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!authenticated) {
    router.push("/sign-in");
    return null;
  }

  return (
    <>
      {domLoaded && (
        <div className="h-full">
          <div className="h-[80px] md:pl-56 fixed inset-y-0 z-50 w-full">
            <Navbar />
          </div>
          <div className="fixed inset-y-0 z-50 flex-col hidden w-56 h-full md:flex">
            <Sidebar />
          </div>
          <main className="md:pl-56 pt-[80px] h-full">{children}</main>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
