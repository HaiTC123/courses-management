"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "./ui/button";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname.startsWith("/teacher");
  const isPlayerPage = pathname.startsWith("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Link href="/">
          <Button size="sm" variant="ghost" onClick={() => router.back()}>
            <LogOut className="size-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button size="sm" variant="ghost">
            Teacher Mode
          </Button>
        </Link>
      )}
      <button className="flex items-center gap-x-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition">
        {"test"}
      </button>
    </div>
  );
};
