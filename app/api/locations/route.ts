import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const locations = await prisma.location.findMany();

        return new NextResponse(JSON.stringify(locations), {
            status: 200,
            headers: {
                "content-type": "application/json",
            },
        });
    } catch (error) {
        console.log(error);
    }
}

export const dynamic = "force-dynamic";
