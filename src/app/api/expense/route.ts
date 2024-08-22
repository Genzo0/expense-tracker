import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request, res: Response) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser)
      return Response.json({ error: "Unauthorized" }, { status: 401 });

    const transactionsRaw = await prisma.transaction.findMany({
      where: {
        userId: loggedInUser.id,
        category: {
          type: "EXPENSE",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    });

    const transactions = transactionsRaw.map((transaction) => ({
      ...transaction,
      amount: transaction.amount.toString(),
    }));

    return Response.json(transactions, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: "Something went wrong, Please try again later." },
      { status: 500 },
    );
  }
}
