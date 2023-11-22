import { prisma } from "@/prisma/client";
import { createAppointment } from "@/utils/appointment";
import { NextResponse } from "next/server";

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
        body;

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
                message: "Missing fields",
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
