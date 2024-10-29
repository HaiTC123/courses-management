"use client";

import {
  BarChart,
  Book,
  Compass,
  Home,
  Layout,
  LeafyGreenIcon,
  LineChart,
  List,
  User,
  User2,
} from "lucide-react";

import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const studentRoutes = [
  {
    icon: Home,
    label: "Trang chủ",
    href: "/",
  },
  {
    icon: Book,
    label: "Khóa học",
    href: "/courses",
  },
  {
    icon: LineChart,
    label: "Lộ trình",
    href: "/learning-paths",
  },
];

const instructorRoutes = [
  {
    icon: List,
    label: "Khóa học",
    href: "/instructor/courses",
  },
  {
    icon: BarChart,
    label: "Phân tích",
    href: "/instructor/analytics",
  },
];

const adminRoutes = [
  {
    icon: User,
    label: "Người hướng dẫn",
    href: "/admin/instructors",
  },
  {
    icon: User2,
    label: "Học viên",
    href: "/admin/students",
  },
  // {
  //   icon: List,
  //   label: "Khóa học",
  //   href: "/admin/courses",
  // },
];

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
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
