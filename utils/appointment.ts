import { prisma } from "@/prisma/client";

enum Recurring {
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

    // check if location already exists
    const existingLocation = await prisma.location.findFirst({
        where: {
            lat: appointment.location.lat,
            lng: appointment.location.lng,
        },
    });

    if (!existingLocation) {
        // create new location
        const newLocation = await prisma.location.create({
            data: {
                lat: appointment.location.lat,
                lng: appointment.location.lng,
                city: appointment.location.city,
                postalCode: appointment.location.postalCode,
                address: appointment.location.address,
            },
        });

        const newAppointment = await prisma.appointment.create({
            data: {
                subjectId: appointment.subject.id,
                dateTime: appointment.dateTime,
                locationId: newLocation.id,
                roomNumber: appointment.roomNumber,
                recurring: appointment.recurring as Recurring,
                teacherId: appointment.teacherId,
            },
        });

        return newAppointment;
    } else {
        const newAppointment = await prisma.appointment.create({
            data: {
                subjectId: appointment.subject.id,
                dateTime: appointment.dateTime,
                locationId: existingLocation.id,
                roomNumber: appointment.roomNumber,
                recurring: appointment.recurring as Recurring,
                teacherId: appointment.teacherId,
            },
        });

        return newAppointment;
    }
};
