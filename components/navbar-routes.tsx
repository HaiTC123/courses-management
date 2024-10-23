"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "./ui/button";
import { SearchInput } from "./search-input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuthStore } from "@/store/use-auth-store";
import { DEFAULT_AVATAR } from "@/constants/default-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { AUTH_TOKEN_KEY } from "@/constants/local-storage-key";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { authenticated, user, setAuthentication, setUser } = useAuthStore();

  const isTeacherPage = pathname.startsWith("/teacher");
  const isPlayerPage = pathname.startsWith("/chapter");
  const isSearchPage = pathname.startsWith("/search");

  const signOut = () => {
    setAuthentication(false);
    setUser(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    router.push("/");
  };

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
              Thoát
            </Button>
          </Link>
        ) : (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Chế độ giáo viên
            </Button>
          </Link>
        )}
        {authenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={user?.profilePictureURL || DEFAULT_AVATAR}
                  alt={user?.fullName}
                />
                <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  signOut();
                }}
              >
                <LogOut className="mr-2 size-4" />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link href="/sign-in">
              <Button>
                <LogIn className="mr-2 size-4" />
                Đăng nhập
              </Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};
