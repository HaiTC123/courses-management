"use client";

import { Navbar } from "../(dashboard)/_components/navbar";

const AdviseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-full">
        <div className="h-[80px] fixed inset-y-0 z-50 w-full">
          <Navbar />
        </div>
        <div className="flex h-auto min-h-full">
          <main className="pt-[80px] h-full w-full overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};
export default AdviseLayout;
