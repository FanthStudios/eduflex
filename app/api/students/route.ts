import { prisma } from "@/prisma/client";
import { deleteStudent, getStudents } from "@/utils/student";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const students = await prisma.student.findMany({
        include: {
            user: false,
        },
    });

    return new NextResponse(JSON.stringify(students), {
        status: 200,
        headers: {
            "content-type": "application/json",
        },
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
        const students = await getStudents();

        return new NextResponse(JSON.stringify(students), {
            status: 200,
            headers: {
                "content-type": "application/json",
            },
        });
    } else {
        const students = await getStudents(userId);

        return new NextResponse(JSON.stringify(students), {
            status: 200,
            headers: {
                "content-type": "application/json",
            },
        });
    }
}

export async function DELETE(request: Request) {
    const body = await request.json();
    const { id }: { id: string } = body;

    try {
        const students = await deleteStudent(parseInt(id));

        return new NextResponse(JSON.stringify(students), {
            status: 200,
            headers: {
                "content-type": "application/json",
            },
        });
    } catch (error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
            headers: {
                "content-type": "application/json",
            },
        });
    }
}
