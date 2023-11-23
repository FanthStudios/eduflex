import { prisma } from "@/prisma/client";

export enum Recurring {
    NEVER = "NEVER",
    WEEKLY = "WEEKLY",
    BIWEEKLY = "BIWEEKLY",
    MONTHLY = "MONTHLY",
}

type Appointment = {
    subject: {
        id: number;
        name: string;
    };
    dateTime: Date;
    location: {
        lat: number;
        lng: number;
        city: string;
        postalCode: string;
        address: string;
    };
    roomNumber: number;
    recurring: Recurring | null;
    teacherId: number;
};

export const createAppointment = async (appointment: Appointment) => {
    // check if appointment already exists
    const existingAppointment = await prisma.appointment.findFirst({
        where: {
            subjectId: appointment.subject.id,
            dateTime: appointment.dateTime,
        },
    });

    if (existingAppointment) {
        throw new Error("Appointment already exists");
    }

    let location = await prisma.location.findFirst({
        where: {
            address: appointment.location.address,
        },
    });

    // If the Location record doesn't exist, create a new one
    if (!location) {
        location = await prisma.location.create({
            data: appointment.location,
        });

        const newAppointment = await prisma.appointment.create({
            data: {
                subjectId: appointment.subject.id,
                dateTime: appointment.dateTime,
                locationAddress: location.address,
                roomNumber: appointment.roomNumber,
                recurring: appointment.recurring as Recurring,
                teacherId: appointment.teacherId,
            },
        });

        return newAppointment;
    }

    const newAppointment = await prisma.appointment.create({
        data: {
            subjectId: appointment.subject.id,
            dateTime: appointment.dateTime,
            locationAddress: location.address,
            roomNumber: appointment.roomNumber,
            recurring: appointment.recurring as Recurring,
            teacherId: appointment.teacherId,
        },
    });

    return newAppointment;
};
