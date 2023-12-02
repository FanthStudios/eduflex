"use client";

import PersonalAppointments, {
    StudentAppointment,
} from "@/components/panel/appointments/PersonalAppointments";
import { Appointment, useAppointments } from "@/hooks/useAppointments";
import { useStudent } from "@/hooks/useStudent";
import { useTeacher } from "@/hooks/useTeacher";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { sortAppointments } from "@/lib/appointments";

type Props = {};

export default function Page({}: Props) {
    const { data: session } = useSession();

    const { teacher } = useTeacher(true, session?.user.id);
    const { student } = useStudent(session?.user.id);

    const { appointments } = useAppointments();

    const [teacherAppointments, setTeacherAppointments] = useState<{
        past: Appointment[];
        upcoming: Appointment[];
        thisWeek: Appointment[];
    }>({
        past: [],
        upcoming: [],
        thisWeek: [],
    });

    const filteredAndSortedAppointments = useMemo(() => {
        if (!teacher) return [];

        if (!teacher.appointments) {
            return [];
        }

        let filteredAppointments = appointments.filter((appointment) =>
            teacher.appointments?.find(
                (teacherAppointment) => teacherAppointment.id === appointment.id
            )
        );

        filteredAppointments.sort((a, b) => {
            let aDate = new Date(a.dateTime);
            aDate.setMonth(aDate.getMonth() + 1);
            let bDate = new Date(b.dateTime);
            bDate.setMonth(bDate.getMonth() + 1);
            return aDate.getTime() - bDate.getTime();
        });

        return filteredAppointments;
    }, [appointments, teacher]);

    useEffect(() => {
        const sortedAppointments = sortAppointments(
            filteredAndSortedAppointments,
            (appointment) => new Date(appointment.dateTime)
        );
        setTeacherAppointments(sortedAppointments);
    }, [filteredAndSortedAppointments]);

    const studentSortedAppointments: any = () => {
        if (student?.appointments) {
            const sorted = sortAppointments(
                student.appointments,
                (appointment) => new Date(appointment.appointment.dateTime)
            );
            return sorted;
        }
        return { past: [], thisWeek: [], upcoming: [] };
    };

    if (!session)
        return (
            <div className="flex items-center justify-center w-full h-full col-span-3 row-span-2">
                Loading...
            </div>
        );

    return (
        <div className="flex flex-col items-start justify-start w-full h-full col-span-3 row-span-2 gap-4">
            <h2 className="text-xl lg:text-2xl font-medium">
                Moje korepetycje
            </h2>
            <PersonalAppointments
                session={session}
                teacherAppointments={teacherAppointments}
                studentAppointments={studentSortedAppointments()}
            />
        </div>
    );
}
