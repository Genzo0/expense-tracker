"use client";

import { useTypewriter } from "react-simple-typewriter";

export default function WordChangeAnimation() {
  const [words] = useTypewriter({
    words: [
      "Pemasukan",
      "Pengeluaran",
      "Transaksi",
      "Keuangan",
      "Uang",
      "Rekap",
    ],
    loop: true,
    deleteSpeed: 50,
    typeSpeed: 100,
  });

  return (
    <div className="my-2 h-20 w-fit rounded-2xl border-2 border-muted-foreground px-5 py-3 text-5xl font-bold text-primary">
      {words}
    </div>
  );
}
