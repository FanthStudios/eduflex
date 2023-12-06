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

// {
//     studentId: 1,
//     appointmentId: 'clpcr7g160002u19z7rcav7mj',
//     subject: 'Informatyka',
//     goal: 'poprawa_kartkowki',
//     topic: 'kutas',
//     student: { userId: 1, classId: 1 },
//     appointment: {
//       subject: { id: 1, name: 'Informatyka' },
//       teacher: {
//         user: {
//           id: 2,
//           firstName: 'Adam',
//           lastName: 'Beczek',
//           email: 'becz00nia.zs14@gmail.com',
//           password:
//             '$2b$10$ntS33U2wKI9ZRUmWU8ApJ.Xv2b5jlMhaTyZu21LPTEN.DRm5.PtVi',
//           lastLogin: new Date('2023-11-27T18:04:38.000Z'),
//           role: 'TEACHER'
//         }
//       },
//       location: {
//         id: 'clpcr7g0v0000u19zlk8hx6ks',
//         lat: 52.2620461,
//         lng: 21.0266347,
//         city: 'Warszawa',
//         postalCode: '03-481',
//         address: 'ul. Szanajcy 5'
//       }
//     }
//   }

export interface Appointment {
    dateTime: Date;
    id: number;
    goal?: string;
    topic?: string;
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
            try {
                const res = await fetch(`/api/appointments`);

                const data = await res.json();
                setAppointments(data.appointments);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAppointments();
    }, []);

    return {
        appointments,
    };
}
