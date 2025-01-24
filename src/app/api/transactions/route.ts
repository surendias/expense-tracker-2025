import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET() {
  const transactions = await prisma.transaction.findMany({
    include: { user: true, category: true },
  });
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log({ data });

    if (!data) {
      return NextResponse.json(
        { error: "Payload cannot be null" },
        { status: 400 }
      );
    }

    const { amount, category, date, description, type, userId } = data;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (!amount || !category || !date || !description || !type) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        amount,
        category,
        date,
        description,
        type,
        user: {
          connect: { id: userId },
        },
      },
    });

    return NextResponse.json(newTransaction);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error:", err.message);
    } else if (err) {
      console.error(
        "Unexpected error:",
        err instanceof Error ? err.message : err
      );
    } else {
      console.error("Unexpected error occurred, no error object available.");
    }

    return NextResponse.json(
      { error: "An error occurred while creating the transaction" },
      { status: 500 }
    );
  }
}
