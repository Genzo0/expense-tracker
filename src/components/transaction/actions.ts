"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import {
  createTransactionSchema,
  CreateTransactionValues,
  updateTransactionSchema,
  UpdateTransactionValues,
} from "@/lib/validations";

export async function createTransaction(values: CreateTransactionValues) {
  const validatedValue = createTransactionSchema.parse(values);

  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    throw new Error("Unauthorized");
  }

  const newTransaction = await prisma.transaction.create({
    data: {
      userId: loggedInUser.id,
      description: validatedValue.description,
      amount: validatedValue.amount,
      categoryId: validatedValue.category,
      date: validatedValue.date,
    },
  });

  return newTransaction;
}

export async function getCategories(type: "EXPENSE" | "INCOME") {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    throw new Error("Unauthorized");
  }

  const categories = await prisma.category.findMany({
    where: {
      type: type,
    },
  });

  return categories;
}

export async function updateTransaction(values: UpdateTransactionValues) {
  const validatedValue = updateTransactionSchema.parse(values);

  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    throw new Error("Unauthorized");
  }

  const updatedTransaction = await prisma.transaction.update({
    where: {
      id: validatedValue.id,
    },
    data: {
      description: validatedValue.description,
      amount: validatedValue.amount,
      categoryId: validatedValue.category,
      date: validatedValue.date,
    },
  });

  return updatedTransaction;
}

export async function deleteTransaction(id: string) {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    throw new Error("Unauthorized");
  }

  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
    },
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  if (transaction.userId !== loggedInUser.id) {
    throw new Error("Unauthorized");
  }

  const deletedTransaction = await prisma.transaction.delete({
    where: {
      id,
    },
  });

  return deletedTransaction;
}
