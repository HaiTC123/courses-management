import { NavbarRoutes } from "@/components/navbar-routes";
import { CourseMobileSidebar } from "./course-mobile-sidebar";

export const CourseNavbar = ({
  course,
  enrollmentId,
}: {
  course: any;
  enrollmentId: number;
}) => {
  return (
    <div className="flex items-center h-full p-4 border-b shadow-sm">
      <CourseMobileSidebar course={course} enrollmentId={enrollmentId} />
      <NavbarRoutes />
    </div>
  );
};
