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

    const student = await prisma.student.findUnique({
        where: {
            userId: appointment.studentId,
        },
        include: {
            user: true,
        },
    });

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
        include: {
            studentAppointments: true,
        },
    });

    if (!teacherAppointment) {
        return new NextResponse(
            JSON.stringify({
                message: "Nie znaleziono korepetycji",
            }),
            {
                status: 404,
            }
        );
    }

    // check if there are any free slots
    if (
        teacherAppointment.studentAppointments.length ==
        teacherAppointment.availableSlots
    ) {
        return new NextResponse(
            JSON.stringify({
                message: "Brak wolnych miejsc",
            }),
            {
                status: 400,
            }
        );
    }

    try {
        const goal = appointment.goal;
        if (
            goal !== "poprawa_sprawdzianu" &&
            goal !== "poprawa_kartkowki" &&
            goal !== "nauka"
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

            if (student) {
                await prisma.notification.create({
                    data: {
                        message: `${student.user.firstName} ${student.user.lastName} zapisał się na korepetycje z przedmiotu ${appointment.subject}`,
                        type: "appointment_enroll",
                        userId: appointment.teacherId,
                    },
                });
            }

            return new NextResponse(
                JSON.stringify({
                    message: "Pomyślnie zapisano na korepetycje",
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

            if (student) {
                await prisma.notification.create({
                    data: {
                        message: `${student.user.firstName} ${student.user.lastName} zapisał się na korepetycje z przedmiotu ${appointment.subject}`,
                        type: "appointment_enroll",
                        userId: appointment.teacherId,
                    },
                });
            }

            return new NextResponse(
                JSON.stringify({
                    message: "Pomyślnie zapisano na korepetycje",
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
