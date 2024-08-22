import { Metadata } from "next";
import LoginForm from "./LoginForm";
import Link from "next/link";
import loginImage from "@/assets/login-image.jpg";
import Image from "next/image";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Page() {
  const { user: loggedInUser } = await validateRequest();

  if (loggedInUser) {
    return redirect("/dashboard");
  }

  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-center text-3xl font-bold">Masuk ke Uangqu</h1>
          <div className="space-y-5">
            <LoginForm />
            <div className="space-y-2">
              <Link
                href={"/signup"}
                className="block text-center hover:underline"
              >
                Belum mempunyai akun? Daftar
              </Link>
              <Link href={"/"} className="block text-center hover:underline">
                Kembali ke dashboard
              </Link>
            </div>
          </div>
        </div>
        <Image
          src={loginImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
