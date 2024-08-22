"use client";

import { TransactionData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getTransactionLastFiveMonths,
  getTransactionThisMonth,
} from "./actions";
import { Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface RecapSummary {
  totalIncome: number;
  totalExpense: number;
  date: string;
}

export default function IncomeAndExpenseRecapCard() {
  const {
    data: transactions,
    isError,
    isLoading,
    error,
    status,
  } = useQuery<TransactionData[] | null>({
    queryKey: ["transaction-month"],
    queryFn: () => getTransactionLastFiveMonths(),
  });

  if (isLoading) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (isError) {
    return <div>Error: {status}</div>;
  }

  if (!transactions || transactions.length === 0) {
    return (
      <p className="row-span-3 flex items-center justify-center rounded-2xl bg-card pb-16 shadow-md md:col-span-2 xl:row-span-6">
        Data belum mencukupi untuk dilakukan analisis. Tambahkan transaksi baru
      </p>
    );
  }

  //transactions grouping by month date
  const groupedTransactions = transactions.reduce((acc: any, curr) => {
    const date = new Date(curr.date);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!acc[key]) {
      acc[key] = {
        totalIncome: 0,
        totalExpense: 0,
        date: key,
      };
    }

    if (curr.category.type === "INCOME") {
      acc[key].totalIncome += parseInt(curr.amount.toString());
    } else {
      acc[key].totalExpense += parseInt(curr.amount.toString());
    }

    return acc;
  }, {});

  const data = Object.values(groupedTransactions as RecapSummary[]);

  const highestExpenseData = data.reduce(
    (acc, curr) => (acc.totalExpense > curr.totalExpense ? acc : curr),
    data[0] || {},
  );

  return (
    <div className="row-span-3 rounded-2xl bg-card pb-16 shadow-md md:col-span-2 xl:row-span-6">
      {/* HEADER */}
      <div>
        <div className="mb-2 flex items-center justify-between px-5 pt-4">
          <h2 className="text-lg font-semibold">
            Rekap Pengeluaran dan Pemasukkan
          </h2>
          <span className="text-xs text-gray-400">{`${formatDate(new Date(data[0]?.date), false)} - ${formatDate(new Date(data[data.length - 1]?.date), false)}`}</span>
        </div>
        <hr />
      </div>

      {/* BODY */}
      <div>
        {/* CHART */}
        <ResponsiveContainer width="100%" height={410} className="px-5">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="" vertical={false} />{" "}
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                const date = new Date(value);
                const formattedDate = formatDate(date, false);
                return formattedDate;
              }}
            />
            <YAxis
              tickFormatter={(value) => {
                return `Rp${(value / 1000000).toFixed(0)} jt`;
              }}
              tick={{ fontSize: 12, dx: -20 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value: number) => [
                `Rp${value.toLocaleString("id-ID")}`,
              ]}
              labelFormatter={(label) => {
                const date = new Date(label);
                const formattedDate = formatDate(date, false);
                return formattedDate;
              }}
            />
            <Bar
              dataKey="totalIncome"
              fill="#22c55e"
              legendType="circle"
              name="Pemasukkan"
              barSize={10}
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="totalExpense"
              legendType="circle"
              fill="#ef4444"
              name="Pengeluaran"
              barSize={10}
              radius={[10, 10, 0, 0]}
            />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
        {/* FOOTER */}
        <div className="mt-2">
          <hr />
          <div className="mb-4 mt-6 flex flex-wrap items-center justify-between px-7 text-sm">
            <p>{data.length || 0} bulan</p>
            <p className="text-sm">
              Pengeluaran terbesar terdapat di bulan:{" "}
              <span className="font-bold">
                {formatDate(new Date(highestExpenseData.date), false)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
