"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getTransactionDataInclude, TransactionData } from "@/lib/types";

export async function getTransactionThisMonth(type: "EXPENSE" | "INCOME") {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    throw new Error("Unauthorized");
  }

  const transactionsThisMonth = await prisma.transaction.findMany({
    where: {
      userId: loggedInUser.id,
      date: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
      },
      category: {
        type: type,
      },
    },
    include: getTransactionDataInclude(),
  });

  return transactionsThisMonth as TransactionData[];
}

export async function getTransactionLastFiveMonths() {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    throw new Error("Unauthorized");
  }

  const transactionsLastFiveMonths = await prisma.transaction.findMany({
    where: {
      userId: loggedInUser.id,
      date: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth() - 4, 1),
        lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
      },
    },
    include: getTransactionDataInclude(),
  });

  return transactionsLastFiveMonths as TransactionData[];
}

export async function getAllTransactions() {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    throw new Error("Unauthorized");
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: loggedInUser.id,
    },
    include: getTransactionDataInclude(),
  });

  return transactions as TransactionData[];
}
