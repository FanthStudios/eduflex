/* eslint-disable @next/next/no-img-element */
"use client";

import { Fragment, useEffect, useState } from "react";
import {
    CalendarIcon,
    EllipsisHorizontalIcon,
    MapPinIcon,
    UserGroupIcon,
} from "@heroicons/react/20/solid";
import { DoorOpen } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import { Calendar } from "@/components/ui/calendar";
import { DayClickEventHandler } from "react-day-picker";
import { useAppointments } from "@/hooks/useAppointments";
import Avatar from "../Avatar";
import { useSession } from "next-auth/react";
import clsx from "clsx";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}
type Props = {};

export default function CalendarWithMeetings({}: Props) {
    const [day, setDay] = useState<Date | undefined>(new Date());
    const { data: session } = useSession();

    // const appointmentDays = [new Date(2023, 11, 15), new Date(2023, 11, 8)];

    const { appointments } = useAppointments();

    // create appointmentDays variable with appointments with the teacherId of the current user
    const appointmentDays = appointments
        .filter(
            (appointment) =>
                appointment.teacher.user.id === parseInt(session?.user?.id!) &&
                new Date(appointment.dateTime) > new Date()
        )
        .map((appointment) => {
            // back up the date by a month and return it
            const date = new Date(appointment.dateTime);
            // date.setMonth(date.getMonth() - 1);
            return date;
        });

    const [appointmentsForSelectedDay, setAppointmentsForSelectedDay] =
        useState(
            appointments.filter((app) => {
                const date = new Date(app.dateTime);
                return date === day;
            })
        );

    useEffect(() => {
        // set appointmentsForSelectedDay to appointments with the teacherId of the current user and at the selected day and month
        setAppointmentsForSelectedDay(
            appointments.filter((app) => {
                const date = new Date(app.dateTime);
                return (
                    date.getDate() === day?.getDate() &&
                    date.getMonth() === day?.getMonth() &&
                    date.getFullYear() === day?.getFullYear() &&
                    app.teacherId === parseInt(session?.user?.id!)
                );
            })
        );
    }, [day, appointments, session?.user?.id]);

    const appointmentDaysClassNames =
        "after:bg-red-500 after:absolute after:top-0 after:right-0 after:rounded-md after:w-2 after:h-2";

    return (
        <div className="flex flex-col items-start justify-start gap-2">
            <h2 className="text-lg font-semibold leading-6 text-gray-900">
                Nadchodzące korepetycje
            </h2>
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-16 shadow rounded-lg p-3">
                <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8 overflow-y-auto overflow-x-hidden">
                    {appointmentsForSelectedDay.length > 0 ? (
                        appointmentsForSelectedDay.map((appointment) => (
                            <li
                                key={appointment.id}
                                className="flex gap-6 py-6"
                            >
                                <Avatar
                                    width={16}
                                    letter={appointment.subject.name[0]}
                                />
                                <div className="flex-auto text-start">
                                    <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                                        {appointment.subject.name} - korepetycje
                                    </h3>
                                    <dl className="mt-2 flex flex-col xl:justify-start text-gray-500 xl:flex-row">
                                        <div className="flex items-start space-x-3">
                                            <dt className="mt-0.5">
                                                <span className="sr-only">
                                                    Date
                                                </span>
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
                                                    ).toLocaleDateString(
                                                        "pl-PL",
                                                        {
                                                            day: "numeric",
                                                            month: "numeric",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                    <span className="lowercase">
                                                        {" o "}
                                                    </span>
                                                    {new Date(
                                                        appointment.dateTime
                                                    ).toLocaleTimeString(
                                                        "pl-PL",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )}
                                                </time>
                                            </dd>
                                        </div>
                                        <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                                            <dt className="mt-0.5">
                                                <span className="sr-only">
                                                    Location
                                                </span>
                                                <MapPinIcon
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </dt>
                                            <dd>
                                                {appointment.location.address},{" "}
                                                {appointment.location.city}
                                            </dd>
                                        </div>
                                        <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                                            <dt className="mt-0.5">
                                                <span className="sr-only">
                                                    Room
                                                </span>
                                                <DoorOpen
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </dt>
                                            <dd>{appointment.roomNumber}</dd>
                                        </div>

                                        <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                                            <dt className="mt-0.5">
                                                <span className="sr-only">
                                                    Available slots
                                                </span>
                                                <UserGroupIcon
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </dt>
                                            <dd>
                                                <span
                                                    className={clsx(
                                                        // if the number of students is greater than the half of the available slots, color it red else green
                                                        appointment.studentAppointments &&
                                                            appointment
                                                                .studentAppointments
                                                                .length >
                                                                appointment.availableSlots /
                                                                    2
                                                            ? "text-orange-500"
                                                            : "text-green-600"
                                                    )}
                                                >
                                                    {appointment.studentAppointments &&
                                                        appointment
                                                            .studentAppointments
                                                            .length}
                                                </span>
                                                /{appointment.availableSlots}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                                <Menu
                                    as="div"
                                    className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center"
                                >
                                    <div>
                                        <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                                            <span className="sr-only">
                                                Open options
                                            </span>
                                            <EllipsisHorizontalIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(
                                                                active
                                                                    ? "bg-gray-100 text-gray-900"
                                                                    : "text-gray-700",
                                                                "block px-4 py-2 text-sm"
                                                            )}
                                                        >
                                                            Edit
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(
                                                                active
                                                                    ? "bg-red-50 text-red-600"
                                                                    : "text-red-500",
                                                                "block px-4 py-2 text-sm"
                                                            )}
                                                        >
                                                            Delete
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </li>
                        ))
                    ) : (
                        <li className="relative flex space-x-6 py-6 xl:static">
                            <div className="flex-auto">
                                <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                                    Brak korepetycji tego dnia
                                </h3>
                            </div>
                        </li>
                    )}
                </ol>
                <Calendar
                    mode="single"
                    selected={day}
                    onSelect={setDay}
                    onDayClick={(day, modifiers): DayClickEventHandler => {
                        return () => {};
                    }}
                    modifiers={{ appointment: appointmentDays }}
                    modifiersClassNames={{
                        appointment: appointmentDaysClassNames,
                    }}
                />
            </div>
        </div>
    );
}
