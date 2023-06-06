import prisma from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, clientInformation, items, totalPrice, shippingPrice } =
    await req.json();
  try {
    const user = await prisma.invoice.create({
      data: {
        userId,
        clientInformation,
        items,
        totalPrice,
        shippingPrice,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Got error" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    let data = null;
    const invoiceId = req.nextUrl.searchParams.get("id");
    if (invoiceId) {
      data = await prisma.invoice.findUnique({
        where: {
          id: +invoiceId,
        },
      });
    } else {
      data = await prisma.invoice.findMany();

    }
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Got error" }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  const { userId, clientInformation, items, totalPrice, shippingPrice } =
    await req.json();
  try {
    const user = await prisma.invoice.update({
      where: {
        id: 31,
      },
      data: {
        userId,
        clientInformation,
        items,
        totalPrice,
        shippingPrice,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Got error" }, { status: 400 });
  }
}