"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bell,
  Coins,
  DropletIcon,
  LogIn,
  LogOut,
  Settings,
} from "lucide-react";
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
import { socket } from "@/lib/socket";
import { useNotiStore } from "@/store/use-noti-store";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { authenticated, user, signOut, role } = useAuthStore();

  const isInstructorPage = pathname.startsWith("/instructor");
  const isAdminPage = pathname.startsWith("/admin");
  const isSearchPage = pathname.startsWith("/search");
  const isRootPage = pathname === "/";
  const isLearningPage = pathname.startsWith("/learning");

  const { notifications } = useNotiStore();

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <>
      <div className="flex items-center w-full">
        <div className="hidden mr-2 md:block">
          {!isRootPage && (
            <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
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
              {/* Coins */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <div className="relative">
                      <Coins className="size-4" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-x-2">
                      <div>Coin</div>
                      <div className="text-xs text-gray-400">
                        {formatPrice(user?.coinAmount ?? 0)}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/coins">
                    <DropdownMenuItem className="cursor-pointer">
                      <Coins className="mr-2 size-4" />
                      Coin
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/coins/deposit">
                    <DropdownMenuItem className="cursor-pointer">
                      <DropletIcon className="mr-2 size-4" />
                      Nạp Coins
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <div className="relative">
                      <Bell className="size-4" />
                      {notifications.filter((n: any) => !n.isViewed).length >
                        0 && (
                        <div className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 text-[10px] text-white bg-red-500 rounded-full">
                          {notifications.filter((n: any) => !n.isViewed).length}
                        </div>
                      )}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-x-2">
                      <div>Thông báo</div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map((notification: any, idx: number) => (
                    <DropdownMenuItem key={idx} className="cursor-pointer">
                      <Link href={notification.link}>
                        <div className="flex items-center gap-x-2">
                          <div
                            className={cn(
                              "rounded-full size-2",
                              notification.isViewed
                                ? "bg-gray-300"
                                : "bg-blue-500"
                            )}
                          ></div>
                          {notification.title}
                        </div>
                        <div className="mt-2 text-xs text-gray-400">
                          {new Date(notification.createdAt).toLocaleString()}
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User */}
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
                    role !== UserRole.STUDENT && (
                      <>
                        <Link
                          href={`/${
                            role === UserRole.INSTRUCTOR
                              ? "instructor"
                              : "admin"
                          }`}
                        >
                          <DropdownMenuItem>
                            {role === UserRole.INSTRUCTOR &&
                              "Chế độ người hướng dẫn"}
                            {role === UserRole.ADMIN && "Chế độ quản trị viên"}
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
