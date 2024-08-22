import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const bigIntToString = (param: any): any => {
  return JSON.stringify(param, (key, value) =>
    typeof value === "bigint" ? value.toString() : value,
  );
};

export const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

export function formatNumber(n: number): String {
  return Intl.NumberFormat("id-ID", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

export const formatDate = (date: Date, includeDay = true): string => {
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: includeDay ? "numeric" : undefined,
  });
};
