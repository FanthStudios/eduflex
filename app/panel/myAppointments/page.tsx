"use client";

import PersonalAppointments from "@/components/panel/appointments/PersonalAppointments";
import { useAppointments } from "@/hooks/useAppointments";
import { useStudent } from "@/hooks/useStudent";
import { useTeacher } from "@/hooks/useTeacher";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Props = {};

export default function Page({}: Props) {
    const { data: session } = useSession();

    const { teacher } = useTeacher(true, session?.user.id);
    const { student } = useStudent(session?.user.id);

    const { appointments } = useAppointments();

    const [teacherAppointments, setTeacherAppointments] = useState<any[]>([]);

    useEffect(() => {
        if (teacher?.appointments) {
            let teacherAppointments = appointments.filter((appointment) =>
                // teacher.appointments is an array of appointment objects that have a property "id"
                teacher.appointments?.find(
                    (teacherAppointment) =>
                        teacherAppointment.id === appointment.id
                )
            );
            teacherAppointments.sort((a, b) => {
                let aDate = new Date(a.dateTime);
                let bDate = new Date(b.dateTime);
                return aDate.getTime() - bDate.getTime();
            });
            setTeacherAppointments(teacherAppointments);
        }
    }, [teacher, appointments]);

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
                teacherAppointments={teacherAppointments}
                studentAppointments={student?.appointments.sort((a, b) => {
                    let aDate = new Date(a.dateTime);
                    let bDate = new Date(b.dateTime);
                    return aDate.getTime() - bDate.getTime();
                })}
            />
        </div>
    );
}
