import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CourseSidebar } from "./course-sidebar";
import { Menu } from "lucide-react";

export const CourseMobileSidebar = ({ course }: { course: any }) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu className="size-6" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <CourseSidebar course={course} progressCount={0} />
      </SheetContent>
    </Sheet>
  );
};
