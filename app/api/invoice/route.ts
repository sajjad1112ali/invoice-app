import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

const PLAN_LIMITS = {
  FREE: 5,
  PRO: 50,
  ENTERPRISE: 500,
};
type PLAN_LIMITS = keyof typeof PLAN_LIMITS;
const getUserId = async () => {
  const session = await getServerSession(authOptions);
  return session.user;
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
  const { id: userId, plan } = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const limit = PLAN_LIMITS[plan] ?? PLAN_LIMITS.FREE;
  const invoiceCount = await prisma.invoice.count({
    where: { userId },
  });
    if (invoiceCount >= limit) {
    return NextResponse.json(
      {
        error: `Invoice limit reached for your ${plan} plan.`,
      },
      { status: 403 }
    );
  }
  const { clientInformation, items, shippingPrice, dueDate } = await req.json();
  const totalPrice = items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  try {
    const invoice = await prisma.invoice.create({
      data: {
        userId,
        clientInformation,
        items,
        totalPrice,
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
  const invoiceId = getQSParamFromURL("id", req.url);
  try {
    let data = null;
    if (invoiceId) {
      data = await prisma.invoice.findUnique({
        where: {
          id: +invoiceId,
        },
      });
    } else {
      const { id } = await getUserId();
      data = await prisma.invoice.findMany({
        where: {
          userId: id,
        },
      });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Got error", invoiceId, URL: req.url },
      { status: 400 }
    );
  }
}

export async function PUT(req: Request) {
    const { plan } = await getUserId();

   if (plan === "FREE") {
    return NextResponse.json(
      {
        error: `You are on FREE plan. you can't make updates.`,
      },
      { status: 403 }
    );
  }
  const { id, userId, clientInformation, items, shippingPrice } =
    await req.json();
  const totalPrice = items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

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
