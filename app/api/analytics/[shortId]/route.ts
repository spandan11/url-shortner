import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  const { shortId } = params;
  try {
    const result = await prisma.url.findUnique({
      where: {
        shortId,
      },
      include: {
        visitHistory: {
          select: {
            id: true,
          },
        },
      },
    });
    if (result) {
      return NextResponse.json(result, { status: 200 });
    }
    return NextResponse.json({ message: "Invalid Id" }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
