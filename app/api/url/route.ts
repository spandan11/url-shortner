import { NextResponse } from "next/server";
import ShortUniqueId from "short-unique-id";
import prisma from "@/prisma";

export async function POST(req: Request) {
  const { url } = await req.json();
  if (url === "") {
    return NextResponse.json("Please enter a valid URL", { status: 400 });
  }
  const { randomUUID } = new ShortUniqueId({ length: 7 });
  const shortId = randomUUID();
  try {
    const urldata = await prisma.url.create({
      data: {
        shortId: shortId,
        redirectUrl: url,
      },
    });
    return NextResponse.json(urldata, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { shortId } = await req.json();
  try {
    const findentry = await prisma.url.findUnique({
      where: {
        shortId,
      },
    });
    if (findentry) {
      const entry = await prisma.url.update({
        where: {
          shortId: shortId,
        },
        data: {
          visitHistory: {
            create: [
              {
                timestamp: Date.now(),
              },
            ],
          },
        },
        include: {
          visitHistory: true,
        },
      });

      return NextResponse.json(entry.redirectUrl, { status: 200 });
    }
    return NextResponse.json({ message: "Invalid" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 500 });
  }
}
