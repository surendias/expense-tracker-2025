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
  const newTransaction = await prisma.transaction.create({ data });
  return NextResponse.json(newTransaction);
}
