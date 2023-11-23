import { Recurring } from "@prisma/client";
import { useEffect, useState } from "react";
import { Teacher } from "./useTeacher";

export type Location = {
    address: string;
    city: string;
    id: number;
    lat: number;
    lng: number;
    postalCode: string;
};

export interface Appointment {
    dateTime: Date;
    id: number;
    location: Location;
    locationId: number;
    recurring: Recurring;
    roomNumber: number;
    subject: {
        id: number;
        name: string;
    };
    subjectId: number;
    teacher: Teacher;
    teacherId: number;
    availableSlots: number;
    studentAppointments?: any[];
}

export function useAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const res = await fetch(`/api/appointments`);

            const data = await res.json();
            setAppointments(data.appointments);
        };

        fetchAppointments();
    }, []);

    return {
        appointments,
    };
}
