import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MenuSquare } from "lucide-react";
import SidebarAdvise from "./sidebar-advise";

export const MobileSidebarAdvise = ({
  listAdvises,
  selectedAdvise,
  setIsLoading,
}: {
  listAdvises: any[];
  selectedAdvise: any;
  setIsLoading: (value: boolean) => void;
}) => {
  return (
    <Sheet>
      <SheetTrigger className="absolute transition top-4 left-4 md:hidden hover:opacity-75">
        <MenuSquare />
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SidebarAdvise
          listAdvises={listAdvises}
          selectedAdvise={selectedAdvise}
          setIsLoading={setIsLoading}
          className="w-full min-w-full mt-10"
        />
      </SheetContent>
    </Sheet>
  );
};
