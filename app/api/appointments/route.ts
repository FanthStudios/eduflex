import { Appointment } from "@/hooks/useAppointments";
import { Recurring } from "@/utils/appointment";
import { prisma } from "@/prisma/client";
import { createAppointment } from "@/utils/appointment";
import { NextResponse } from "next/server";

interface PostProps extends Omit<Appointment, "subject"> {
    subject: string;
    recurring: Recurring;
}

export async function GET() {
    const appointments = await prisma.appointment.findMany({
        include: {
            subject: true,
            teacher: {
                select: {
                    user: true,
                },
            },
            location: true,
        },
    });

    return new NextResponse(
        JSON.stringify({
            appointments,
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}

export async function POST(request: Request) {
    const body = await request.json();

    //! console.log(body);

    const { subject, dateTime, location, roomNumber, recurring, teacherId } =
        body as PostProps;

    // validate that every field is present
    if (
        !subject ||
        !dateTime ||
        !location ||
        !roomNumber ||
        !recurring ||
        !teacherId
    ) {
        return new NextResponse(
            JSON.stringify({
                message: "Uzupełnij wszystkie pola",
                value: {
                    subject,
                    dateTime,
                    location,
                    roomNumber,
                    recurring,
                    teacherId,
                },
            }),
            {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    const appointmentExists = await prisma.appointment.findFirst({
        where: {
            dateTime,
            locationAddress: location.address,
            roomNumber,
            teacherId,
        },
    });

    if (appointmentExists) {
        return new NextResponse(
            JSON.stringify({
                message: "Korepetycje już istnieją",
            }),
            {
                status: 403,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    const validSubject = await prisma.subject.findFirst({
        where: {
            name: subject,
        },
    });

    const appointment = {
        subject: validSubject!,
        dateTime,
        location,
        roomNumber,
        recurring,
        teacherId,
    };

    try {
        const newAppointment = await createAppointment(appointment);

        return new NextResponse(
            JSON.stringify({
                message: "Appointment created successfully",
                appointment: newAppointment,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (e: any) {
        console.log(e);
        return new NextResponse(
            JSON.stringify({
                message: e.message,
            }),
            {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}
