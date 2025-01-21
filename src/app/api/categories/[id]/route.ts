import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const category = await prisma.category.findUnique({
    where: { id: Number(params.id) },
  });
  if (!category)
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  return NextResponse.json(category);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const updatedCategory = await prisma.category.update({
    where: { id: Number(params.id) },
    data,
  });
  return NextResponse.json(updatedCategory);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.category.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ message: "Category deleted successfully" });
}
