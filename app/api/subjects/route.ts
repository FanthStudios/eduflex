import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const subjects = await prisma.subject.findMany();

        return new NextResponse(JSON.stringify(subjects), {
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

        const subject = await prisma.subject.create({
            data: {
                name,
            },
        });

        return new NextResponse(JSON.stringify(subject), {
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
    // get the id from the url eg. /api/subjects?id=1
    const id = request.nextUrl.searchParams.get("id");

    try {
        const subject = await prisma.subject.delete({
            where: {
                id: Number(id),
            },
        });

        return new NextResponse(JSON.stringify(subject), {
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
