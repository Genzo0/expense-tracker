"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getTransactionDataInclude } from "@/lib/types";

export async function getExpenses() {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    throw new Error("Unauthorized");
  }

  const expenses = await prisma.transaction.findMany({
    where: {
      userId: loggedInUser.id,
      category: {
        type: "EXPENSE",
      },
    },
    include: getTransactionDataInclude(),
  });

  return expenses;
}
