import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const schoolClasses = await prisma.class.findMany();

        return new NextResponse(JSON.stringify(schoolClasses), {
            status: 200,
            headers: {
                "content-type": "application/json",
            },
        });
    } catch (error) {
        console.log(error);
    }
}

export async function POST(request: Request) {
    try {
        const { name } = await request.json();

        const schoolClass = await prisma.class.create({
            data: {
                name,
            },
        });

        return new NextResponse(JSON.stringify(schoolClass), {
            status: 200,
            headers: {
                "content-type": "application/json",
            },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(error), {
            status: 500,
            headers: {
                "content-type": "application/json",
            },
        });
    }
}

export async function DELETE(request: NextRequest) {
    // get the id from the url eg. /api/classs?id=1
    const id = request.nextUrl.searchParams.get("id");

    try {
        const schoolClass = await prisma.class.delete({
            where: {
                id: Number(id),
            },
        });

        return new NextResponse(JSON.stringify(schoolClass), {
            status: 200,
            headers: {
                "content-type": "application/json",
            },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(error), {
            status: 500,
            headers: {
                "content-type": "application/json",
            },
        });
    }
}

export const dynamic = "force-dynamic";
