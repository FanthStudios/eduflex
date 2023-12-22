import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

type PostProps = {
    studentId: number;
    locationAddress: string;
    subjectId: number;
    teacherId: number;
    appointmentId: string;
    reason: string;
};

export async function DELETE(request: Request) {
    const body = await request.json();

    const {
        studentId,
        locationAddress,
        subjectId,
        teacherId,
        appointmentId,
        reason,
    } = body as PostProps;

    // get the appointment
    const appointment = await prisma.appointment.findUnique({
        where: {
            locationAddress,
            subjectId,
            teacherId,
            id: appointmentId,
        },
        include: {
            subject: true,
        },
    });

    // delete the student from the appointment
    await prisma.studentAppointment.delete({
        where: {
            studentId_appointmentId: {
                appointmentId,
                studentId,
            },
        },
    });

    // create a notification for the student
    await prisma.notification.create({
        data: {
            message: `Zostałeś wyrzucony z zajęć z przedmiotu ${
                appointment?.subject.name
            } w dniu: ${appointment?.dateTime.toLocaleDateString("pl-PL", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })}`,
            reason,
            userId: studentId,
            type: "appointment_kick",
        },
    });

    return new NextResponse(
        JSON.stringify({
            message: "Pomyślnie usunięto ucznia z zajęć",
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}
