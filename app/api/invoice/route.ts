import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

const getUserId = async () => {
  const session = await getServerSession(authOptions);
  return session.user?.id;
};

export async function POST(req: Request) {
  const userId = await getUserId();
  const { clientInformation, items, totalPrice, shippingPrice, dueDate } =
    await req.json();
  try {
    const user = await prisma.invoice.create({
      data: {
        userId,
        clientInformation,
        items,
        totalPrice,
        shippingPrice,
        dueDate: new Date(dueDate).toISOString(),
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Got error" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const invoiceId = req.nextUrl.searchParams.get("id");
  try {

    let data = null;
    if (invoiceId) {
      data = await prisma.invoice.findUnique({
        where: {
          id: +invoiceId,
        },
      });
    } else {
      const userId: number = await getUserId();

      data = await prisma.invoice.findMany({
        where: {
          userId,
        },
      });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Got error . . . .", invoiceId: `THE ID = ${invoiceId}` }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  const { id, userId, clientInformation, items, totalPrice, shippingPrice } =
    await req.json();
  try {
    const user = await prisma.invoice.update({
      where: {
        id: +id,
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
