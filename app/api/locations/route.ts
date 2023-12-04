import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const locations = await prisma.location.findMany();

    return new NextResponse(JSON.stringify(locations), {
        status: 200,
        headers: {
            "content-type": "application/json",
        },
    });
}
