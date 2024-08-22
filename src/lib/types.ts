import { Prisma } from "@prisma/client";

export function getTransactionDataSelect() {
  return {
    id: true,
    amount: true,
    date: true,
    description: true,
  } as const;
}

export function getTransactionDataInclude() {
  return {
    category: true,
  } satisfies Prisma.TransactionInclude;
}

export type TransactionData = Prisma.TransactionGetPayload<{
  include: ReturnType<typeof getTransactionDataInclude>;
}>;
