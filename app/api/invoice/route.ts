import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, customerName, items } = await req.json();
  try {
    const user = await prisma.invoice.create({
      data: {
        userId, customerName, items: JSON.stringify(items),
      },
    });
      return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Got error" }, { status: 400 });
    
  }
}

export async function GET(req: Request) {
  try {
    const invoices = await prisma.invoice.findMany();
      return NextResponse.json(invoices);
  } catch (error) {
    return NextResponse.json({ error: "Got error" }, { status: 400 });
    
  }
}
