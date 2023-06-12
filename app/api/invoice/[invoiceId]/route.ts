import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(req: NextRequest, { params }: any) {
    const { invoiceId } = params;
     try {
      const invoice = await prisma.invoice.update({
        where: {
          id: +invoiceId,
        },
        data: {
          isPaid: true,
        },
      });
      return NextResponse.json(invoice);
    } catch (error) {
      return NextResponse.json({ error: "Got error" }, { status: 400 });
    }
  }