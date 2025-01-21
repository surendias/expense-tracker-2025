import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const transaction = await prisma.transaction.findUnique({
    where: { id: Number(params.id) },
    include: { user: true, category: true },
  });
  if (!transaction)
    return NextResponse.json(
      { error: "Transaction not found" },
      { status: 404 }
    );
  return NextResponse.json(transaction);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const updatedTransaction = await prisma.transaction.update({
    where: { id: Number(params.id) },
    data,
  });
  return NextResponse.json(updatedTransaction);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.transaction.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ message: "Transaction deleted successfully" });
}
