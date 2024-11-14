"use client";

import { ChevronDown, LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { uniqueId } from "lodash";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  nestedRoutes?: SidebarItemProps[];
}

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  nestedRoutes,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const isActive = (pathname === href && href !== "/") || pathname === href;

  const onClick = () => {
    router.push(href);
  };

  return (
    <>
      <button
        onClick={
          nestedRoutes && nestedRoutes.length > 0
            ? () => setCollapsed(!collapsed)
            : onClick
        }
        type="button"
        className={cn(
          "w-full flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-neutral-300/20",
          isActive && "text-sky-500 bg-sky-200/20 hover:bg-sky-200/20"
        )}
      >
        <div className="flex items-center py-4 gap-x-2">
          <Icon
            size={22}
            className={cn("text-neutral-400", isActive && "text-sky-500")}
          />
          {label}
        </div>
        {nestedRoutes && nestedRoutes.length > 0 && (
          <ChevronDown
            size={16}
            className={cn(
              "ml-auto mr-2 transition-transform duration-200",
              !collapsed && "rotate-180"
            )}
          />
        )}
        {/* <div
          className={cn(
            "ml-auto opacity-0 border-2 border-sky-500 h-full transition-all",
            isActive && "opacity-100"
          )}
        /> */}
      </button>
      {nestedRoutes && !collapsed && (
        <div className="pl-4">
          {nestedRoutes.map((child, idx) => (
            <SidebarItem
              key={uniqueId("sidebar-item-")}
              icon={child.icon}
              label={child.label}
              href={child.href}
            />
          ))}
        </div>
      )}
    </>
  );
};
