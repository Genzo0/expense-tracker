"use client";

import {
  BellIcon,
  Check,
  LogOutIcon,
  Menu,
  Monitor,
  Moon,
  Settings,
  Sun,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useSession } from "./SessionProvider";
import { useTheme } from "next-themes";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import { logout } from "../(auth)/actions";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { setIsCollapsed } from "@/state";

export default function Navbar() {
  const { user } = useSession();

  const dispatch = useAppDispatch();
  const isCollapsed = useAppSelector((state) => state.global.isCollapsed);

  const toggleSidebar = () => {
    dispatch(setIsCollapsed(!isCollapsed));
  };

  const queryClient = useQueryClient();

  return (
    <nav className="mb-7 flex w-full items-center justify-between">
      <div className="flex items-center justify-between gap-5">
        <Button
          variant="ghost"
          className="rounded-full bg-secondary px-3 py-3"
          onClick={toggleSidebar}
        >
          <Menu className="size-4" />
        </Button>
      </div>

      <div className="flex items-center justify-between gap-5">
        <div className="hidden items-center justify-between gap-5 sm:flex">
          <div>
            <Theme />
          </div>
          <hr className="mx-3 h-7 w-0 border border-l border-solid border-muted-foreground" />
          <div className="flex cursor-pointer items-center gap-3">
            <UserAvatar avatarUrl={user.avatarUrl} size={35} />
            <span className="font-semibold">{user.name}</span>
          </div>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            queryClient.clear();
            logout();
          }}
        >
          <LogOutIcon className="mr-2 size-4" />
          Keluar
        </Button>
        {/* <Link href={"/settings"}>
          <Settings className="size-6 cursor-pointer text-muted-foreground" />
        </Link> */}
      </div>
    </nav>
  );
}

function Theme() {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full">
          {theme === "system" && <Monitor className="size-4" />}
          {theme === "light" && <Sun className="size-4" />}
          {theme === "dark" && <Moon className="size-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className="mr-2 size-4" />
          SystemDefault
          {theme === "system" && <Check className="ms-2 size-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 size-4" />
          Light
          {theme === "light" && <Check className="ms-2 size-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 size-4" />
          Dark
          {theme === "dark" && <Check className="ms-2 size-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
