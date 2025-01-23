import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const transactions = await prisma.transaction.findMany({
    include: { user: true, category: true },
  });
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  const data = await req.json();

  // Check if userId is provided in the request
  if (!data.userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  // Create a new transaction and associate it with the user
  const newTransaction = await prisma.transaction.create({
    data: {
      amount: data.amount,
      category: data.category,
      date: data.date,
      description: data.description,
      type: data.type,
      user: {
        connect: { id: data.userId }, // Associate the user with the transaction
      },
    },
  });

  return NextResponse.json(newTransaction);
}
