import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="flex items-center h-full p-4 bg-white border-b shadow-sm dark:bg-[#020817]">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
