import { UserRole } from "@/enum/user-role";
import { formatPrice } from "@/lib/format";
import { useAuthStore } from "@/store/use-auth-store";
import { uniqueId } from "lodash";
import { Coins } from "lucide-react";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { SidebarItem } from "./sidebar-item";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  const { user, role } = useAuthStore();
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const isInstructorPage = pathname?.startsWith("/instructor");

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white border-r shadow-sm">
      <div className="flex items-center gap-1 p-6 cursor-pointer justify-evenly">
        <Logo />
        <span className="text-lg font-bold">
          {role === UserRole.ADMIN && isAdminPage && "Quản lý"}
          {role === UserRole.INSTRUCTOR && isInstructorPage && "Giáo viên"}
        </span>
      </div>
      <div className="flex flex-col w-full h-full">
        <SidebarRoutes />
        <SidebarItem
          key={uniqueId("sidebar-item-")}
          icon={Coins}
          label={formatPrice(user?.coinAmount ?? 0)}
          href={"/coins"}
        />
      </div>
    </div>
  );
};
