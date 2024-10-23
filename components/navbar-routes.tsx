"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "./ui/button";
import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname.startsWith("/teacher");
  const isPlayerPage = pathname.startsWith("/chapter");
  const isSearchPage = pathname.startsWith("/search");

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex ml-auto gap-x-2">
        {isTeacherPage || isPlayerPage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="mr-2 size-4" />
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
        {/* <Button className="flex items-center text-sm font-medium transition gap-x-2 text-slate-500 hover:text-slate-700">
          {"test"}
        </Button> */}
        <Link href="/sign-in">
          <Button>
            <LogIn className="mr-2 size-4" />
            Sign In
          </Button>
        </Link>
      </div>
    </>
  );
};
