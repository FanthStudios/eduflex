"use client";

import PersonalAppointments from "@/components/panel/appointments/PersonalAppointments";
import { Appointment, useAppointments } from "@/hooks/useAppointments";
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

    const [teacherAppointments, setTeacherAppointments] = useState<{
        past: Appointment[];
        upcoming: Appointment[];
        thisWeek: Appointment[];
    }>({
        past: [],
        upcoming: [],
        thisWeek: [],
    });

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
                aDate.setMonth(aDate.getMonth() + 1);
                let bDate = new Date(b.dateTime);
                bDate.setMonth(bDate.getMonth() + 1);
                return aDate.getTime() - bDate.getTime();
            });

            // make the teacherAppointments return an object with 3 arrays: upcoming, thisWeek, past
            let upcoming: Appointment[] = [];
            let thisWeek: Appointment[] = [];
            let past: Appointment[] = [];
            teacherAppointments.forEach((appointment) => {
                let appointmentDate = new Date(appointment.dateTime);
                appointmentDate.setHours(appointmentDate.getHours() + 1);
                let today = new Date();
                today.setMonth(today.getMonth() + 1);
                today.setHours(today.getHours() + 1);
                let daysUntilEndOfWeek =
                    today.getDay() === 0 ? 0 : 7 - today.getDay(); // 1-7 for Monday-Sunday
                let nextWeek = new Date();
                nextWeek.setDate(today.getDate() + daysUntilEndOfWeek + 1); // +1 to get to the next week
                if (appointmentDate.getTime() < today.getTime()) {
                    if (appointmentDate.getTime() < nextWeek.getTime()) {
                        // check if the appointment is past from today
                        if (appointmentDate.getDay() < today.getDay()) {
                            past.push(appointment);
                        } else {
                            thisWeek.push(appointment);
                        }
                    } else {
                        upcoming.push(appointment);
                    }
                } else {
                    if (appointmentDate.getFullYear() > today.getFullYear()) {
                        upcoming.push(appointment);
                    } else if (
                        appointmentDate.getMonth() > today.getMonth() &&
                        appointmentDate.getFullYear() === today.getFullYear()
                    ) {
                        upcoming.push(appointment);
                    } else past.push(appointment);
                }
            });

            setTeacherAppointments({ upcoming, thisWeek, past });
        }
    }, [teacher, appointments]);

    // make the studentSortedAppointments return an object with 3 arrays: upcoming, thisWeek, past
    const studentSortedAppointments = () => {
        let upcoming: Appointment[] = [];
        let thisWeek: Appointment[] = [];
        let past: Appointment[] = [];
        if (student?.appointments) {
            student.appointments.forEach((appointment) => {
                let appointmentDate = new Date(
                    // @ts-ignore
                    appointment.appointment.dateTime
                );
                let today = new Date();
                today.setMonth(today.getMonth() + 1);
                let daysUntilEndOfWeek =
                    today.getDay() === 0 ? 0 : 7 - today.getDay(); // 1-7 for Monday-Sunday
                let nextWeek = new Date();
                nextWeek.setDate(today.getDate() + daysUntilEndOfWeek + 1); // +1 to get to the next week
                if (appointmentDate.getTime() < today.getTime()) {
                    if (appointmentDate.getTime() < nextWeek.getTime()) {
                        // check if the appointment is past from today
                        if (appointmentDate.getDay() < today.getDay()) {
                            past.push(appointment);
                        } else {
                            thisWeek.push(appointment);
                        }
                    } else {
                        upcoming.push(appointment);
                    }
                } else {
                    if (appointmentDate.getFullYear() > today.getFullYear()) {
                        upcoming.push(appointment);
                    } else if (
                        appointmentDate.getMonth() > today.getMonth() &&
                        appointmentDate.getFullYear() === today.getFullYear()
                    ) {
                        upcoming.push(appointment);
                    } else past.push(appointment);
                }
            });
        }

        upcoming.sort((a, b) => {
            //@ts-ignore
            let aDate = new Date(a.appointment.dateTime);
            aDate.setMonth(aDate.getMonth() + 1);
            //@ts-ignore
            let bDate = new Date(b.appointment.dateTime);
            bDate.setMonth(bDate.getMonth() + 1);
            return aDate.getTime() - bDate.getTime();
        });

        thisWeek.sort((a, b) => {
            //@ts-ignore
            let aDate = new Date(a.appointment.dateTime);
            aDate.setMonth(aDate.getMonth() + 1);
            //@ts-ignore
            let bDate = new Date(b.appointment.dateTime);
            bDate.setMonth(bDate.getMonth() + 1);
            return aDate.getTime() - bDate.getTime();
        });

        past.sort((a, b) => {
            //@ts-ignore
            let aDate = new Date(a.appointment.dateTime);
            aDate.setMonth(aDate.getMonth() + 1);
            //@ts-ignore
            let bDate = new Date(b.appointment.dateTime);
            bDate.setMonth(bDate.getMonth() + 1);
            return aDate.getTime() - bDate.getTime();
        });

        return { upcoming, thisWeek, past };
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
