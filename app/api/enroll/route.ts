import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

type AppointmentType = {
    subject: string;
    teacherId: number;
    dateTime: Date | null;
    goal: string;
    topic?: string;
    customGoal?: string;
    studentId?: number;
};

export async function POST(request: Request) {
    const body = await request.json();

    const appointment: AppointmentType = {
        subject: body.subject,
        teacherId: body.teacherId,
        dateTime: body.dateTime,
        goal: body.goal,
        topic: body.topic,
        customGoal: body.customGoal,
        studentId: body.studentId,
    };

    //   studentId     Int
    //   appointmentId String
    //   subject       String
    //   goal          String
    //   topics        String?
    //   student       Student     @relation(fields: [studentId], references: [userId])
    //   appointment   Appointment @relation(fields: [appointmentId], references: [id])

    // get appointment by teacherId, dateTime and subject
    const teacherAppointment = await prisma.appointment.findFirst({
        where: {
            teacherId: appointment.teacherId,
            dateTime: appointment.dateTime!,
            subject: {
                name: appointment.subject,
            },
        },
    });

    if (!teacherAppointment) {
        return new NextResponse(
            JSON.stringify({
                message: "Appointment not found",
            }),
            {
                status: 404,
            }
        );
    }

    try {
        const goal = appointment.goal;
        if (
            goal !== "poprawa_sprawdzianu" &&
            goal !== "przygotowanie_do_sprawdzianu" &&
            goal !== "przygotowanie_do_kolokwium"
        ) {
            // the goal is "other" and the goal is saved to the appointment.goal field
            const studentAppointment = await prisma.studentAppointment.create({
                data: {
                    studentId: appointment.studentId!,
                    subject: appointment.subject,
                    goal: appointment.goal,
                    appointmentId: teacherAppointment!.id,
                },
            });

            return new NextResponse(
                JSON.stringify({
                    message: "Appointment created successfully",
                    data: studentAppointment,
                }),
                {
                    status: 200,
                }
            );
        } else {
            // the goal is one of the three predefined goals and the goal is saved to the appointment.topics field
            const studentAppointment = await prisma.studentAppointment.create({
                data: {
                    studentId: appointment.studentId!,
                    subject: appointment.subject,
                    goal: appointment.goal,
                    topic: appointment.topic,
                    appointmentId: teacherAppointment!.id,
                },
            });

            return new NextResponse(
                JSON.stringify({
                    message: "Appointment created successfully",
                    data: studentAppointment,
                }),
                {
                    status: 200,
                }
            );
        }
    } catch (error: any) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({
                message: error.message,
                error: error,
            }),
            {
                status: 500,
            }
        );
    }
}
