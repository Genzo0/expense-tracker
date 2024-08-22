import { DollarSign } from "lucide-react";
import React from "react";
import { getAllTransactions } from "./actions";
import { formatMoney } from "@/lib/utils";

export default async function TotalExpenseAndIncome() {
  const transactions = await getAllTransactions();

  if (!transactions) {
    return (
      <p className="mx-auto">
        Data belum mencukupi untuk dilakukan analisis. Tambahkan transaksi baru
      </p>
    );
  }

  const totalExpense = transactions
    .filter((transaction) => transaction.category.type === "EXPENSE")
    .reduce(
      (acc, transaction) =>
        parseInt(acc.toString()) + parseInt(transaction.amount.toString()),
      0,
    );

  const totalIncome = transactions
    .filter((transaction) => transaction.category.type === "INCOME")
    .reduce(
      (acc, transaction) =>
        parseInt(acc.toString()) + parseInt(transaction.amount.toString()),
      0,
    );

  const details = [
    {
      title: "Total Pengeluaran",
      amount: formatMoney(totalExpense),
      IconComponent: DollarSign,
    },
    {
      title: "Total Pemasukkan",
      amount: formatMoney(totalIncome),
      IconComponent: DollarSign,
    },
  ];
  return (
    <div className="col-span-1 row-span-2 flex flex-col justify-between rounded-2xl border bg-card shadow-md md:col-span-2 xl:col-span-1 xl:row-span-3">
      {/* Header */}
      <div>
        <div className="mb-2 flex items-center justify-between px-5 pt-4">
          <h2 className="text-lg font-semibold text-muted-foreground">
            Seluruh total Pengeluaran dan Pemasukkan
          </h2>
        </div>
        <hr />
      </div>

      {/* BODY */}
      <div className="flex h-full items-center justify-around gap-4 px-5">
        <div className="rounded-full border-[1px] border-sky-300 bg-accent p-5">
          <DollarSign className="text-blue-500" />
        </div>
        <div className="flex-1">
          {details.map((detail, index) => (
            <React.Fragment key={index}>
              <div className="my-4 flex items-center justify-between">
                <span className="font-normal text-muted-foreground">
                  {detail.title}
                </span>
                <span className="font-bold text-muted-foreground">
                  {detail.amount}
                </span>
              </div>
              {index < details.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
