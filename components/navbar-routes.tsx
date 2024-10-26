"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, LogIn, LogOut, Settings } from "lucide-react";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { UserRole } from "@/enum/user-role";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { authenticated, user, signOut } = useAuthStore();

  const isInstructorPage = pathname.startsWith("/instructor");
  const isAdminPage = pathname.startsWith("/admin");
  const isSearchPage = pathname.startsWith("/search");
  const isRootPage = pathname === "/";

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <>
      <div className="hidden md:block mr-2">
        {!isRootPage && (
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 size-4" />
            <span>Quay lại</span>
          </Button>
        )}
      </div>

      <div className="block">
        <SearchInput />
      </div>

      <div className="flex ml-auto gap-x-2">
        {isInstructorPage || isAdminPage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="mr-2 size-4" />
              Thoát
            </Button>
          </Link>
        ) : (
          user?.role !== UserRole.STUDENT && (
            <>
              <Link
                href={`/${
                  user?.role === UserRole.INSTRUCTOR ? "instructor" : "admin"
                }`}
              >
                <Button size="sm" variant="ghost">
                  {user?.role === UserRole.INSTRUCTOR &&
                    "Chế độ người hướng dẫn"}
                  {user?.role === UserRole.ADMIN && "Chế độ quản trị viên"}
                </Button>
              </Link>
            </>
          )
        )}
        {authenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={user?.profilePictureURL || DEFAULT_AVATAR}
                  alt={user?.fullName}
                />
                <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex items-center">
                  <Avatar className="mr-2">
                    <AvatarImage
                      src={user?.profilePictureURL || DEFAULT_AVATAR}
                      alt={user?.fullName}
                    />
                    <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {user?.fullName}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/settings">
                <DropdownMenuItem>
                  <Settings className="mr-2 size-4" />
                  Cài đặt
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => {
                  handleSignOut();
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
