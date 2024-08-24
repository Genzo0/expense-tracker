"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getTransactionDataInclude } from "@/lib/types";

export async function getIncomes() {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    throw new Error("Unauthorized");
  }

  const incomes = await prisma.transaction.findMany({
    where: {
      userId: loggedInUser.id,
      category: {
        type: "INCOME",
      },
    },
    include: getTransactionDataInclude(),
  });

  return incomes;
}
