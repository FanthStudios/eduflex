import { Appointment } from "@/hooks/useAppointments";
import { useTeacher } from "@/hooks/useTeacher";
import React from "react";

type Props = {
    appointment: Appointment;
};

export default function AppointmentCard({ appointment }: Props) {
    const { teachers } = useTeacher(false, appointment.teacherId.toString());
    const teacher = teachers[0];
    return (
        <div className="lg:w-2/3 w-full flex items-center justify-evenly">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-lg font-medium xl:text-xl">
                    {appointment.subject.name}
                </h1>
                <p className="text-sm text-gray-500">
                    {new Date(appointment.dateTime).toLocaleString("pl-PL", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        hour: "numeric",
                        minute: "numeric",
                    })}
                </p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-lg font-medium xl:text-xl">
                    {teacher?.user.firstName} {teacher?.user.lastName}
                </h1>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-lg font-medium xl:text-xl">
                    {appointment.subject.name}
                </h1>
                <p className="text-sm text-gray-500">
                    {appointment.roomNumber}
                </p>
            </div>
        </div>
    );
}
