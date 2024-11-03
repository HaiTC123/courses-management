import { NavbarRoutes } from "@/components/navbar-routes";
import { CourseMobileSidebar } from "./course-mobile-sidebar";

export const CourseNavbar = ({ course }: { course: any }) => {
  return (
    <div className="flex items-center h-full p-4 bg-white border-b shadow-sm">
      <CourseMobileSidebar course={course} />
      <NavbarRoutes />
    </div>
  );
};
