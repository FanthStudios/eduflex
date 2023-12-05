"use client";

import { Appointment, useAppointments } from "@/hooks/useAppointments";
import {
    CalendarIcon,
    ChartPieIcon,
    ClockIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";

type Props = {};

function calculateWorkedHours(
    appointments: Appointment[],
    studentId: number,
    teacherId: number
) {
    const count = calculateFinishedAppointments(
        appointments,
        studentId,
        teacherId
    );

    return (count || 0) * 60;
}

function calculateFinishedAppointments(
    appointments: Appointment[],
    studentId: number,
    teacherId: number
) {
    if (!appointments) return 0;
    const now = new Date();
    if (studentId) {
        const count = appointments.filter((appointment) => {
            return appointment.studentAppointments?.filter(
                (studentAppointment) =>
                    studentAppointment.student.user.id === studentId &&
                    new Date(appointment.dateTime) < now
            ).length;
        }).length;
        return count;
    } else if (teacherId) {
        return appointments.filter(
            (appointment) =>
                appointment.teacherId === teacherId &&
                new Date(appointment.dateTime) < now
        ).length;
    }
}

function calculateCommingAppointments(
    appointments: Appointment[],
    studentId: number,
    teacherId: number
) {
    if (!appointments) return 0;
    const now = new Date();
    if (studentId) {
        const count = appointments.filter((appointment) => {
            return appointment.studentAppointments?.filter(
                (studentAppointment) =>
                    studentAppointment.student.user.id === studentId &&
                    new Date(appointment.dateTime) > now
            ).length;
        }).length;
        return count;
    } else if (teacherId) {
        return appointments.filter(
            (appointment) =>
                appointment.teacherId === teacherId &&
                new Date(appointment.dateTime) > now
        ).length;
    }
}

export default function SummaryReport({}: Props) {
    const { data: session } = useSession();
    const studentId =
        session?.user?.role === "STUDENT" ? session?.user?.id : undefined;
    const teacherId =
        session?.user?.role === "TEACHER" ? session?.user?.id : undefined;
    const { appointments } = useAppointments();
    const cards = [
        {
            name: "Nadchodzące korepetycje",
            icon: <CalendarIcon className="h-12 aspect-square text-white" />,
            description:
                "Właśnie tyle masz zaplanowanych korepetycji w tym miesiącu",
            value:
                calculateCommingAppointments(
                    appointments,
                    parseInt(studentId!),
                    parseInt(teacherId!)
                ) || 0,
        },
        {
            name: "Zakończone korepetycje",
            icon: <ChartPieIcon className="h-12 aspect-square text-white" />,
            description: "Nieźle, tyle korepetycji zakończyłeś w tym miesiącu",
            value:
                calculateFinishedAppointments(
                    appointments,
                    parseInt(studentId!),
                    parseInt(teacherId!)
                ) || 0,
        },
        {
            name: "Ilość przepracowanych godzin",
            icon: <ClockIcon className="h-12 aspect-square text-white" />,
            description: "W tym miesiącu przepracowałeś tyle godzin",
            value:
                calculateWorkedHours(
                    appointments,
                    parseInt(studentId!),
                    parseInt(teacherId!)
                ) || 0,
        },
    ];
    return (
        <div
            className={`flex flex-col items-start justify-center w-full gap-2`}
        >
            <h3 className="text-lg font-semibold leading-6 text-gray-900">
                Raport podsumowujący
            </h3>

            <dl className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 w-full">
                {cards.map((card, index) => (
                    <ReportCard
                        key={index}
                        name={card.name}
                        icon={card.icon}
                        description={card.description}
                        value={card.value}
                    />
                ))}
            </dl>
        </div>
    );
}

export function ReportCard({
    name,
    icon,
    description,
    value,
}: {
    name: string;
    icon: any;
    description: string;
    value: number;
}) {
    return (
        <div className="overflow-hidden gap-4 flex rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <div className="aspect-square w-fit rounded-md bg-green-500 p-3">
                {icon}
            </div>
            <div>
                <dt className="truncate text-sm font-medium text-gray-500">
                    {name}
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    {value}
                </dd>
            </div>
        </div>
    );
}
