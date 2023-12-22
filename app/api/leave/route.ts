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
        include: {
            appointment: true,
        },
    });

    return appointment;
}

export async function POST(request: Request) {
    const body = await request.json();
    const { appointmentId, studentId } = body;

    try {
        const appointment = await leave(appointmentId, studentId);

        const student = await prisma.student.findUnique({
            where: {
                userId: studentId,
            },
            include: {
                user: true,
            },
        });

        const studentName = `${student?.user.firstName} ${student?.user.lastName}`;

        await prisma.notification.create({
            data: {
                userId: appointment.appointment.teacherId,
                type: "appointment_leave",
                reason: "",
                message: `${studentName} opuścił korepetycje z ${
                    appointment.subject
                } odbuwające się w dniu ${appointment.appointment.dateTime.toLocaleDateString(
                    "pl-PL"
                )}.`,
            },
        });

        return new NextResponse(null, {
            status: 200,
        });
    } catch (e: any) {
        return new NextResponse(e.message, {
            status: 400,
        });
    }
}
