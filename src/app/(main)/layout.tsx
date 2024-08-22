import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/toaster";
import DashboardWrapper from "./DashboardWrapper";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
      <DashboardWrapper>{children}</DashboardWrapper>
    </SessionProvider>
  );
}
