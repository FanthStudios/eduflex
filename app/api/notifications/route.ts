import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    const { userId } = body as { userId: number };

    const notifications = await prisma.notification.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return new NextResponse(JSON.stringify(notifications), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function PATCH(request: Request) {
    const body = await request.json();

    const { id, read } = body as { id: number; read: boolean };

    await prisma.notification.update({
        where: {
            id,
        },
        data: {
            read,
        },
    });

    return new NextResponse(null, {
        status: 200,
    });
}
