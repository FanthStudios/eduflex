import { Appointment } from "@/hooks/useAppointments";
import React from "react";

type Props = {
    appointment: Appointment;
};

export default function AppointmentCard({ appointment }: Props) {
    return (
        <div className="lg:w-2/3 w-full flex items-center justify-evenly">
            AppointmentCard
        </div>
    );
}
