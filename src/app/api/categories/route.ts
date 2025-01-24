import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany();
  console.log(categories);
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newCategory = await prisma.category.create({ data });
  return NextResponse.json(newCategory);
}
