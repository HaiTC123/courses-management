"use client";

import {
  adminRoutes,
  instructorRoutes,
  studentRoutes,
} from "@/constants/routes";
import { UserRole } from "@/enum/user-role";
import { useAuthStore } from "@/store/use-auth-store";
import { uniqueId } from "lodash";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const { role, authenticated } = useAuthStore.getState();

  const isInstructorPage = pathname?.startsWith("/instructor");
  const isAdminPage = pathname?.startsWith("/admin");

  let routes = isInstructorPage
    ? instructorRoutes
    : isAdminPage
    ? adminRoutes
    : role === UserRole.INSTRUCTOR || role === UserRole.ADMIN
    ? studentRoutes.filter((route) => route.href !== "/courses" && route.href !== "/certificate")
    : studentRoutes;
  if (!authenticated){
    routes = routes.filter(x => !x.auth);
  }
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={uniqueId("sidebar-item-")}
          icon={route.icon}
          label={route.label}
          href={route.href}
          nestedRoutes={route?.nestedRoutes ?? []}
        />
      ))}
    </div>
  );
};
