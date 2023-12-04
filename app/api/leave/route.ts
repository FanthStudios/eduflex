import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

async function leave(appointmentId: string, studentId: number) {
    const appointment = await prisma.studentAppointment.delete({
        where: {
            studentId_appointmentId: {
                studentId: studentId,
                appointmentId: appointmentId,
            },
        },
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    const { appointmentId, studentId } = body;

    try {
        await leave(appointmentId, studentId);

        return new NextResponse(null, {
            status: 200,
        });
    } catch (e: any) {
        return new NextResponse(e.message, {
            status: 400,
        });
    }
}
