"use client";
import Sidebar from "@/app/(main)/Sidebar";
import { useEffect, useState } from "react";
import StoreProvider, { useAppSelector } from "../redux";
import Navbar from "./Navbar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isCollapsed = useAppSelector((state) => state.global.isCollapsed);

  return (
    <main className="flex min-h-screen w-full text-muted-foreground">
      <Sidebar />
      <div
        className={`flex h-full w-full flex-col px-9 py-7 ${
          isCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <Navbar />
        {children}
      </div>
    </main>
  );
}

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
}
