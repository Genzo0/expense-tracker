import { DollarSign, Loader2 } from "lucide-react";
import React, { Suspense } from "react";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getTransactionThisMonth } from "./actions";
import { formatMoney } from "@/lib/utils";
import IncomeAndExpenseSkeleton from "./IncomeAndExpenseSkeleton";

export default function IncomeAndExpenseCard() {
  return (
    <div className="col-span-1 flex flex-wrap justify-between gap-10 md:col-span-2 md:row-span-1 xl:col-span-3 xl:row-span-2">
      {/* EXPENSE */}
      <Suspense fallback={<IncomeAndExpenseSkeleton />}>
        <Expense />
      </Suspense>
      {/* INCOME */}
      <Suspense fallback={<IncomeAndExpenseSkeleton />}>
        <Income />
      </Suspense>
    </div>
  );
}

// PERBAIKI DETAILS AMOUNT DAN KATEGORI

async function Expense() {
  const transactionsThisMonth =
    (await getTransactionThisMonth("EXPENSE")) || [];

  if (!transactionsThisMonth) {
    return (
      <p className="mx-auto">
        Data belum mencukupi untuk dilakukan analisis. Tambahkan transaksi baru
      </p>
    );
  }

  const totalExpense = transactionsThisMonth.reduce(
    (acc, transaction) =>
      parseInt(acc.toString()) + parseInt(transaction.amount.toString()),
    0,
  );

  const TransactionCategoryMap = transactionsThisMonth.reduce(
    (acc: any, transaction) => {
      if (!acc[transaction.category.name]) {
        acc[transaction.category.name] = 0;
      }

      acc[transaction.category.name] += 1;

      return acc;
    },
    {},
  );

  const mostSpentCategory = Object.keys(TransactionCategoryMap).reduce(
    (acc, category) =>
      TransactionCategoryMap[category] > TransactionCategoryMap[acc]
        ? category
        : acc,
    Object.keys(TransactionCategoryMap)[0],
  );

  const data = [
    {
      title: "Total Pengeluaran",
      amount: totalExpense,
    },
    {
      title: "Kategori",
      amount: mostSpentCategory,
    },
  ];

  return (
    <div className="flex-1 flex-wrap rounded-2xl bg-card shadow-md">
      {/* HEADERS */}
      <div>
        <div className="mb-2 flex items-center justify-between px-5 pt-4">
          <h2 className="text-lg font-semibold text-red-500">Pengeluaran</h2>
          <span className="text-xs text-gray-400">
            {new Date().toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <hr />
      </div>

      {/* BODY */}
      <div className="flex items-center justify-around gap-4 px-5">
        <div className="rounded-full border-[1px] border-red-300 bg-accent p-3">
          <DollarSign className="text-red-500" />
        </div>
        <div className="flex-1">
          {data.map((detail, index) => (
            <React.Fragment key={index}>
              <div className="my-4 flex items-center justify-between text-sm">
                <span className="font-normal text-muted-foreground">
                  {detail.title}
                </span>
                <span className="font-semibold text-muted-foreground">
                  {typeof detail.amount === "number"
                    ? formatMoney(detail.amount)
                    : detail.amount}
                </span>
              </div>
              {index < data.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

async function Income() {
  const transactionsThisMonth = (await getTransactionThisMonth("INCOME")) || [];

  const totalIncome = transactionsThisMonth.reduce(
    (acc, transaction) =>
      parseInt(acc.toString()) + parseInt(transaction.amount.toString()),
    0,
  );

  const TransactionCategoryMap = transactionsThisMonth.reduce(
    (acc: any, transaction) => {
      if (!acc[transaction.category.name]) {
        acc[transaction.category.name] = 0;
      }

      acc[transaction.category.name] += 1;

      return acc;
    },
    {},
  );

  const mostSpentCategory = Object.keys(TransactionCategoryMap).reduce(
    (acc, category) =>
      TransactionCategoryMap[category] > TransactionCategoryMap[acc]
        ? category
        : acc,
    Object.keys(TransactionCategoryMap)[0],
  );

  const data = [
    {
      title: "Total Pemasukkan",
      amount: totalIncome,
    },
    {
      title: "Kategori",
      amount: mostSpentCategory,
    },
  ];
  return (
    <div className="flex-1 flex-wrap rounded-2xl bg-card shadow-md">
      {/* HEADERS */}
      <div>
        <div className="mb-2 flex items-center justify-between px-5 pt-4">
          <h2 className="text-lg font-semibold text-green-500">Pemasukkan</h2>
          <span className="text-xs text-gray-400">
            {new Date().toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <hr />
      </div>

      {/* BODY */}
      <div className="flex items-center justify-around gap-4 px-5">
        <div className="rounded-full border-[1px] border-green-300 bg-accent p-3">
          <DollarSign className="text-green-500" />
        </div>
        <div className="flex-1">
          {data.map((detail, index) => (
            <React.Fragment key={index}>
              <div className="my-4 flex items-center justify-between text-sm">
                <span className="font-normal text-muted-foreground">
                  {detail.title}
                </span>
                <span className="font-semibold text-muted-foreground">
                  {typeof detail.amount === "number"
                    ? formatMoney(detail.amount)
                    : detail.amount}
                </span>
              </div>
              {index < data.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
