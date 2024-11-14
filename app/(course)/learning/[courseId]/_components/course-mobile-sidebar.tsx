import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CourseSidebar } from "./course-sidebar";
import { Menu } from "lucide-react";

export const CourseMobileSidebar = ({ course }: { course: any }) => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 transition md:hidden hover:opacity-75">
        <Menu className="size-6" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <CourseSidebar course={course} />
      </SheetContent>
    </Sheet>
  );
};
