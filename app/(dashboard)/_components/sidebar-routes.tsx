"use client";

import {
  adminRoutes,
  instructorRoutes,
  studentRoutes,
} from "@/constants/routes";
import { uniqueId } from "lodash";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isInstructorPage = pathname?.startsWith("/instructor");
  const isAdminPage = pathname?.startsWith("/admin");

  const routes = isInstructorPage
    ? instructorRoutes
    : isAdminPage
    ? adminRoutes
    : studentRoutes;

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
