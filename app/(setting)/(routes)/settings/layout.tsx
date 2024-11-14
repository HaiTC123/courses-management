"use client";

import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const authenticated = useAuthStore.getState().authenticated;
  const router = useRouter();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    if (!authenticated) {
      router.push("/sign-in");
    }
  }, [router, authenticated]);

  return <>{domLoaded && <main>{children}</main>}</>;
};

export default SettingsLayout;
