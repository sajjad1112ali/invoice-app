import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse, } from "next/server";
import { NextApiRequest } from "next";

const getUserId = async () => {
  const session = await getServerSession(authOptions);
  return session.user?.id;
};

function getQSParamFromURL(
  key: string,
  url: string | undefined
): string | null {
  if (!url) return "";
  const search = new URL(url).search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(key);
}

export async function POST(req: Request) {
  const userId = await getUserId();
  const { clientInformation, items, totalPrice, shippingPrice, dueDate } =
    await req.json();
    const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  try {
    const invoice = await prisma.invoice.create({
      data: {
        userId,
        clientInformation,
        items,
        totalPrice: total + +shippingPrice,
        shippingPrice,
        dueDate: new Date(dueDate).toISOString(),
      },
    });
    return NextResponse.json(invoice);
  } catch (error) {
    return NextResponse.json({ error: "Got error" }, { status: 400 });
  }
}

export async function GET(req: NextApiRequest) {
  const invoiceId = getQSParamFromURL('id', req.url)
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
    return NextResponse.json({ error: "Got error.......", invoiceId, URL: req.url }, { status: 400 });
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
