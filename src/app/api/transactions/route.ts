import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma, TransactionType } from "@prisma/client";

// Helper function to validate TransactionType
const isValidTransactionType = (type: string): type is TransactionType => {
  return Object.values(TransactionType).includes(type as TransactionType);
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Extract query parameters
  const category = searchParams.get("category") || undefined;
  const type = searchParams.get("type") || undefined;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  // Validate the `type` parameter
  const validType =
    type && isValidTransactionType(type)
      ? (type as TransactionType)
      : undefined;

  // Calculate pagination offset
  const skip = (page - 1) * pageSize;

  try {
    // Fetch transactions with filtering and pagination
    const transactions = await prisma.transaction.findMany({
      where: {
        category: {
          name: category ? { contains: category } : undefined,
        },
        type: validType, // Use the validated type
      },
      include: { user: true, category: true },
      skip,
      take: pageSize,
    });

    // Get total count of transactions for pagination
    const totalCount = await prisma.transaction.count({
      where: {
        category: {
          name: category ? { contains: category } : undefined,
        },
        type: validType, // Use the validated type
      },
    });

    return NextResponse.json({
      transactions,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    });
  } catch (err) {
    console.error(
      "Error fetching transactions:",
      err instanceof Error ? err.message : "Unknown error"
    );
    return NextResponse.json(
      { error: "An error occurred while fetching transactions" },
      { status: 500 }
    );
  }
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
