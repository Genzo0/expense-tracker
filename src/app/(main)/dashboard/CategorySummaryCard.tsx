"use client";

import { TransactionData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getTransactionThisMonth } from "./actions";
import { Loader2 } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface ExpenseSums {
  [key: string]: number;
}

export default function CategorySummaryCard() {
  const { data, isLoading, isError, status } = useQuery<
    TransactionData[] | null
  >({
    queryKey: ["transaction-month", "EXPENSE"],
    queryFn: () => getTransactionThisMonth("EXPENSE"),
  });

  if (isLoading) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (isError) {
    return <div>Error: {status}</div>;
  }

  if (!data) {
    return (
      <p className="mx-auto">
        Data belum mencukupi untuk dilakukan analisis. Tambahkan transaksi baru
      </p>
    );
  }

  const transactionsThisMonth = data as TransactionData[];

  const expenseSums = transactionsThisMonth.reduce((acc: ExpenseSums, curr) => {
    if (!acc[curr.category.name]) {
      acc[curr.category.name] = 0;
    }

    acc[curr.category.name] += parseInt(curr.amount.toString());

    return acc;
  }, {});

  const expenseCategories = Object.entries(expenseSums).map(
    ([category, amount]) => ({
      category,
      amount,
    }),
  );

  const totalExpense = expenseCategories.reduce(
    (acc, category: { amount: number }) => acc + category.amount,
    0,
  );

  const formattedTotalExpense = (totalExpense / 1000000).toFixed(2);

  return (
    <div className="col-span-1 row-span-2 flex flex-col justify-between rounded-2xl border bg-card shadow-md md:col-span-2 xl:col-span-1 xl:row-span-3">
      {/* HEADER */}
      <div>
        <div className="mb-2 flex items-center justify-between px-5 pt-4">
          <h2 className="text-lg font-semibold">
            Rekap Pengeluaran Berdasarkan Kategori
          </h2>
          <span className="text-xs text-gray-400">
            {new Date().toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <hr />
      </div>

      {/* CHART */}
      <div className="justify-between xl:flex xl:pr-7">
        <div className="relative basis-3/5">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={expenseCategories}
                innerRadius={50}
                outerRadius={70}
                fill="#8884d8"
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
              >
                {expenseCategories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute left-1/2 top-1/2 basis-2/5 -translate-x-1/2 -translate-y-1/2 transform text-center">
            <span className="text-xl font-bold">
              {formatNumber(totalExpense)}
            </span>
          </div>
        </div>
        {/* LABELS */}
        <ul className="flex flex-col items-center justify-around gap-3 py-5 xl:items-start">
          {expenseCategories.map((entry, index) => (
            <li key={`legend-${index}`} className="flex items-center text-xs">
              <span
                className="mr-2 size-3 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              ></span>
              {entry.category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const colors = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];
