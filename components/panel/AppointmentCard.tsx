"use client";

/* eslint-disable @next/next/no-img-element */
import { Appointment } from "@/hooks/useAppointments";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { DoorOpen } from "lucide-react";

type Props = {
    appointment: Appointment;
    onClick: () => void;
    selected: boolean;
};

export default function AppointmentCard({
    appointment,
    onClick,
    selected,
}: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`relative flex space-x-6 p-3 w-2/3 xl:static ${
                selected
                    ? "border-green-400 border-2"
                    : "border border-neutral-300"
            } rounded-lg`}
        >
            <div className="flex-auto text-start">
                <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                    {appointment.teacher.user.firstName}{" "}
                    {appointment.teacher.user.lastName}
                </h3>
                <dl className="mt-2 flex flex-col xl:justify-start text-gray-500 xl:flex-row">
                    <div className="flex items-start space-x-3 xl:w-1/2">
                        <dt className="mt-0.5">
                            <span className="sr-only">Date</span>
                            <CalendarIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </dt>
                        <dd>
                            <time
                                className="capitalize"
                                dateTime={new Date(
                                    appointment.dateTime
                                ).toISOString()}
                            >
                                {/* 10 Listopada, 2023 o 10:00 */}
                                {new Date(
                                    appointment.dateTime
                                ).toLocaleDateString("pl-PL", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                                <span className="lowercase">{" o "}</span>
                                {new Date(
                                    appointment.dateTime
                                ).toLocaleTimeString("pl-PL", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </time>
                        </dd>
                    </div>
                    <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                        <dt className="mt-0.5">
                            <span className="sr-only">Location</span>
                            <MapPinIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </dt>
                        <dd>
                            {appointment.location.address},{" "}
                            {appointment.location.postalCode}{" "}
                            {appointment.location.city}
                        </dd>
                    </div>
                    <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                        <dt className="mt-0.5">
                            <span className="sr-only">Room</span>
                            <DoorOpen
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </dt>
                        <dd>{appointment.roomNumber}</dd>
                    </div>
                </dl>
            </div>
        </button>
    );
}
