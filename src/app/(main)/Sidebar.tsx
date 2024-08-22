"use client";

import {
  Archive,
  CircleDollarSign,
  Clipboard,
  DollarSign,
  Icon,
  Layout,
  LayoutDashboard,
  LogOutIcon,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  Sun,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "../(auth)/actions";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";
import { setIsCollapsed } from "@/state";
import { useAppDispatch, useAppSelector } from "../redux";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`flex cursor-pointer items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:bg:blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-300 text-white" : ""
        }`}
      >
        <Icon className="size-4 !text-muted-foreground" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-muted-foreground`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const isCollapsed = useAppSelector((state) => state.global.isCollapsed);

  const toggleSidebar = () => {
    dispatch(setIsCollapsed(!isCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-secondary transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      <div
        className={`flex items-center justify-between gap-3 pt-8 md:justify-normal ${
          isCollapsed ? "px-5" : "px-8"
        }`}
      >
        <Image src={logo} alt="" width={20} height={20} className="size-7" />
        <h1
          className={`text-2xl font-extrabold ${
            isCollapsed ? "hidden" : "block"
          }`}
        >
          Uangqu
        </h1>

        <button
          className="rounded-full bg-gray-100 px-3 py-3 hover:bg-blue-100 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="size-4" />
        </button>
      </div>

      <div className="mt-8 flex-grow">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/expense"
          icon={CircleDollarSign}
          label="Pengeluaran"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/income"
          icon={DollarSign}
          label="Pemasukkan"
          isCollapsed={isCollapsed}
        />
        {/* <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isCollapsed}
        /> */}
      </div>

      <div className={`${isCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
