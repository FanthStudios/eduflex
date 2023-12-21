import { Appointment } from "@/hooks/useAppointments";
import { Recurring } from "@/utils/appointment";
import { prisma } from "@/prisma/client";
import { createAppointment } from "@/utils/appointment";
import { NextResponse } from "next/server";

interface PostProps extends Omit<Appointment, "subject"> {
    subject: string;
    recurring: Recurring;
    occurrences: number;
}

function removeMinutes(date: Date, minutes: number) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - minutes);
    return result;
}

function addMinutes(date: Date, minutes: number) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() + minutes);
    return result;
}

function addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function addMonths(date: Date, months: number) {
    var result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

function calculateRecurringDates(
    startDate: Date,
    recurrenceRule: Recurring,
    numberOfOccurrences: number
) {
    let dates = [];
    for (let i = 0; i < numberOfOccurrences; i++) {
        let date;
        switch (recurrenceRule) {
            case Recurring.NEVER:
                date = startDate;
                break;
            case Recurring.WEEKLY:
                date = addDays(startDate, i * 7);
                break;
            case Recurring.BIWEEKLY:
                date = addDays(startDate, i * 14);
                break;
            case Recurring.MONTHLY:
                date = addMonths(startDate, i);
                break;
            // Add more cases if you have more recurrence rules
        }
        dates.push(date);
    }
    return dates;
}

export async function GET() {
    try {
        const appointments = await prisma.appointment.findMany({
            include: {
                subject: true,
                teacher: {
                    select: {
                        user: true,
                    },
                },
                location: true,
                studentAppointments: {
                    select: {
                        student: {
                            select: {
                                user: true,
                            },
                        },
                        goal: true,
                        topic: true,
                        subject: true,
                    },
                },
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
    } catch (e: any) {
        return new NextResponse(
            JSON.stringify({
                message: e.message,
                error: e,
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

export async function POST(request: Request) {
    const body = await request.json();

    //! console.log(body);

    const {
        subject,
        dateTime,
        location,
        roomNumber,
        recurring,
        teacherId,
        availableSlots,
        occurrences,
    } = body as PostProps;

    // validate that every field is present
    if (
        !subject ||
        !dateTime ||
        !location ||
        !roomNumber ||
        !recurring ||
        !teacherId ||
        !availableSlots ||
        !occurrences
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
                    availableSlots,
                    occurrences,
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

    let appointment = {
        subject: validSubject!,
        dateTime,
        location,
        roomNumber,
        recurring,
        teacherId,
        availableSlots,
    };

    if (recurring == Recurring.NEVER) {
        await createAppointment(appointment);

        return new NextResponse(
            JSON.stringify({
                message: "Pomyślnie dodano korepetycje",
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    try {
        let dates = calculateRecurringDates(
            appointment.dateTime,
            recurring,
            occurrences
        );

        for (let date of dates) {
            let newAppointment = {
                ...appointment,
                dateTime: date,
            };

            // check if there already is an appointment at this time, in this location, room and if there is no appointment in the next 45 minutes
            // if there is, skip this appointment

            const appointmentExists = await prisma.appointment.findFirst({
                where: {
                    dateTime: newAppointment.dateTime,
                    locationAddress: newAppointment.location.address,
                    roomNumber: newAppointment.roomNumber,
                },
            });

            if (appointmentExists) {
                return new NextResponse(
                    JSON.stringify({
                        message: `Korepetycje już istnieją w dniu ${newAppointment.dateTime}, zostały pominięte`,
                    }),
                    {
                        status: 403,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            }

            const appointmentExistsInPrevious45Minutes =
                await prisma.appointment.findFirst({
                    where: {
                        dateTime: {
                            gte: removeMinutes(newAppointment.dateTime, 45),
                        },
                        locationAddress: newAppointment.location.address,
                        roomNumber: newAppointment.roomNumber,
                    },
                });

            const appointmentExistsInNext45Minutes =
                await prisma.appointment.findFirst({
                    where: {
                        dateTime: {
                            gte: addMinutes(newAppointment.dateTime, 45),
                        },
                        locationAddress: newAppointment.location.address,
                        roomNumber: newAppointment.roomNumber,
                    },
                });

            if (
                appointmentExistsInNext45Minutes ||
                appointmentExistsInPrevious45Minutes
            ) {
                const actualDate = new Date(
                    newAppointment.dateTime
                ).toLocaleString("pl-PL", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                });

                console.log(appointmentExistsInNext45Minutes);
                console.log(appointmentExistsInPrevious45Minutes);

                return new NextResponse(
                    JSON.stringify({
                        // message: `Korepetycje już istnieją w dniu ${newAppointment.dateTime}, zostały pominięte`,
                        // send a message that there is an appointment in the next 45 minutes
                        message: `Korepetycje nie mogą zostać dodane w dniu: ${actualDate}, ponieważ najeżdżają na inne korepetycje.\nProszę wybrać inny termin`,
                    }),
                    {
                        status: 403,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            }

            await createAppointment(newAppointment);
        }

        return new NextResponse(
            JSON.stringify({
                message: "Appointment created successfully",
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
                error: e,
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

export async function PATCH(request: Request) {
    const body = await request.json();

    const { id, subject, dateTime, location, roomNumber, availableSlots } =
        body as PostProps;

    // update appointment
    const appointment = await prisma.appointment.update({
        where: {
            id: id.toString(),
        },
        data: {
            subject: {
                connect: {
                    name: subject,
                },
            },
            dateTime,
            location: {
                connect: {
                    address: location.address,
                },
            },
            roomNumber,
            availableSlots,
        },
    });

    // create notifications for eache student enrolled in this appointment
    const studentAppointments = await prisma.studentAppointment.findMany({
        where: {
            appointmentId: id.toString(),
        },
        include: {
            student: {
                select: {
                    user: true,
                },
            },
        },
    });

    for (let studentAppointment of studentAppointments) {
        await prisma.notification.create({
            data: {
                message: `Korepetycje w dniu ${new Date(
                    dateTime
                ).toLocaleDateString("pl-PL", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                })} z przedmiotu ${subject} zostały zaktualizowane`,
                type: "appointment_udate",
                userId: studentAppointment.student.user.id,
                createdAt: new Date(),
            },
        });
    }

    return new NextResponse(
        JSON.stringify({
            message: "Pomyślnie zaktualizowano korepetycje",
            appointment,
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}

export async function DELETE(request: Request) {
    const body = await request.json();

    const { appointmentId, subjectId, teacherId, locationAddress } = body as {
        appointmentId: string;
        subjectId: number;
        teacherId: number;
        locationAddress: string;
    };

    try {
        // create notifications for eache student enrolled in this appointment
        const studentAppointments = await prisma.studentAppointment.findMany({
            where: {
                appointmentId: appointmentId,
            },
            include: {
                student: {
                    select: {
                        user: true,
                    },
                },
            },
        });

        const appointment = await prisma.appointment.findFirst({
            where: {
                id: appointmentId,
            },
        });

        for (let studentAppointment of studentAppointments) {
            await prisma.notification.create({
                data: {
                    message: `Korepetycje w dniu ${new Date(
                        appointment?.dateTime!
                    ).toLocaleDateString("pl-PL", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })} z przedmiotu ${
                        studentAppointment.subject
                    } zostały odwołane`,
                    type: "appointment_delete",
                    userId: studentAppointment.studentId,
                    createdAt: new Date(),
                },
            });
        }

        // delete appointment
        await prisma.appointment.delete({
            where: {
                locationAddress,
                subjectId,
                teacherId,
                id: appointmentId,
            },
        });

        return new NextResponse(JSON.stringify({}), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (e: any) {
        return new NextResponse(
            JSON.stringify({
                message: e.message,
                error: e,
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}
