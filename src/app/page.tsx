import { validateRequest } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu } from "lucide-react";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { Source_Code_Pro, Urbanist } from "next/font/google";
import WordChangeAnimation from "@/components/WordChangeAnimation";
import image from "@/assets/background.png";

const source_code_pro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default async function Home() {
  const { user } = await validateRequest();

  if (user) {
    return redirect("/dashboard");
  }
  return (
    <main className="w-full">
      <div className="h-full min-h-screen w-full">
        <Navbar />
        <div className="flex h-full min-h-[calc(100vh-6rem)] w-full">
          <div className="flex w-full items-center justify-center md:w-1/2">
            <div className="w-full max-w-2xl px-5">
              <div className="my-5 h-8">
                <p
                  className={`${source_code_pro.className} text-lg font-semibold text-muted-foreground`}
                >
                  UANGQU UNTUK LAYANAN PENCATATAN
                </p>
              </div>
              <p className={`${urbanist.className} text-5xl font-semibold`}>
                Catat Transaksi Setiap Saat
              </p>
              <WordChangeAnimation />
              <p className="text-muted-foreground">
                Uangqu adalah aplikasi pencatatan keuangan yang memudahkan Anda
                mencatat transaksi keuangan Anda setiap saat.
              </p>
              <div className="my-2 mt-20">
                <Link href="/signup">
                  <Button
                    variant="default"
                    className="rounded-md border px-3 py-3 text-muted-foreground"
                  >
                    Daftar Sekarang <ArrowRight className="size-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden w-1/2 items-center justify-center md:flex">
            <Image src={image} alt="" width={800} height={800} priority />
          </div>
        </div>
      </div>
    </main>
  );
}

function Navbar() {
  return (
    <nav className="sticky top-0 z-10 h-24 w-full border-2 border-b bg-accent shadow-sm">
      <div className="mx-auto flex h-full max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-3">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <Image src={logo} alt="Uangqu" width={40} height={40} />
            <span className="text-2xl font-semibold">Uangqu</span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/login">
            <Button
              variant="default"
              className="rounded-md border px-3 py-3 text-muted-foreground"
            >
              Masuk
              <ArrowRight className="" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
