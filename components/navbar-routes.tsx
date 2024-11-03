"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Bell, LogIn, LogOut, Settings } from "lucide-react";
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
  const isLearningPage = pathname.startsWith("/learning");

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <>
      <div className="flex items-center w-full">
        <div className="hidden mr-2 md:block">
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
          {authenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Bell className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div>Thông báo</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* TODO: Add notifications */}
                  {[
                    {
                      title: "[SYSTEM] Check hệ thống",
                      description:
                        "Đây là thông báo tự động từ server trả về để test",
                    },
                  ].map((notification: any) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center gap-x-2">
                          <div className="bg-blue-500 rounded-full size-2"></div>
                          {notification.title}
                        </div>
                        <div className="mt-2 text-xs text-gray-500 line-clamp-2 max-w-[200px]">
                          {notification.description}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

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
                        <AvatarFallback>
                          {user?.fullName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {user?.fullName}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isInstructorPage || isAdminPage ? (
                    <Link href="/">
                      <DropdownMenuItem>
                        <LogOut className="mr-2 size-4" />
                        Chế độ học viên
                      </DropdownMenuItem>
                    </Link>
                  ) : (
                    user?.role !== UserRole.STUDENT && (
                      <>
                        <Link
                          href={`/${
                            user?.role === UserRole.INSTRUCTOR
                              ? "instructor"
                              : "admin"
                          }`}
                        >
                          <DropdownMenuItem>
                            {user?.role === UserRole.INSTRUCTOR &&
                              "Chế độ người hướng dẫn"}
                            {user?.role === UserRole.ADMIN &&
                              "Chế độ quản trị viên"}
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )
                  )}
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
            </>
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
      </div>
    </>
  );
};
