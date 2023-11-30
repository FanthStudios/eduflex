"use client";

import {
    CalendarIcon,
    EllipsisHorizontalIcon,
    MapPinIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { DoorOpen } from "lucide-react";
import { Appointment, useAppointments } from "@/hooks/useAppointments";
import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
    studentAppointments?: {
        past: Appointment[];
        thisWeek: Appointment[];
        upcoming: Appointment[];
    };
    teacherAppointments?: {
        past: Appointment[];
        thisWeek: Appointment[];
        upcoming: Appointment[];
    };
    session: any;
};

export default function PersonalAppointments({
    studentAppointments,
    teacherAppointments,
    session,
}: Props) {
    const userRole = session?.user?.role;
    return (
        <div className="flex flex-col items-center xl:items-start justify-start gap-5 overflow-y-auto w-full overflow-x-hidden">
            {/* STUDENT APPOINTMENTS */}

            {userRole == "STUDENT" && studentAppointments ? (
                <>
                    <AppointmentSection
                        title="Minione"
                        appointments={
                            studentAppointments.past.length > 0
                                ? studentAppointments.past
                                : []
                        }
                        userRole={userRole}
                    />
                    <AppointmentSection
                        title="W tym tygodniu"
                        appointments={
                            studentAppointments.thisWeek.length > 0
                                ? studentAppointments.thisWeek
                                : []
                        }
                        userRole={userRole}
                    />
                    <AppointmentSection
                        title="Nadchodzące"
                        appointments={
                            studentAppointments.upcoming.length > 0
                                ? studentAppointments.upcoming
                                : []
                        }
                        userRole={userRole}
                    />
                </>
            ) : (
                userRole == "STUDENT" && (
                    <div className="flex flex-col items-center justify-center gap-5 w-full">
                        <h3 className="text-neutral-400">Brak korepetycji</h3>
                    </div>
                )
            )}

            {/*!TEACHER APPOINTMENTS  */}
            {/*!TEACHER APPOINTMENTS  */}
            {/*!TEACHER APPOINTMENTS  */}
            {/*!TEACHER APPOINTMENTS  */}
            {/*!TEACHER APPOINTMENTS  */}
            {/*!TEACHER APPOINTMENTS  */}

            {userRole == "TEACHER" && teacherAppointments ? (
                <>
                    <AppointmentSection
                        title="Minione"
                        appointments={
                            teacherAppointments.past.length > 0
                                ? teacherAppointments.past
                                : []
                        }
                        userRole={userRole}
                    />
                    <AppointmentSection
                        title="W tym tygodniu"
                        appointments={
                            teacherAppointments.thisWeek.length > 0
                                ? teacherAppointments.thisWeek
                                : []
                        }
                        userRole={userRole}
                    />
                    <AppointmentSection
                        title="Nadchodzące"
                        appointments={
                            teacherAppointments.upcoming.length > 0
                                ? teacherAppointments.upcoming
                                : []
                        }
                        userRole={userRole}
                    />
                </>
            ) : (
                userRole == "TEACHER" && (
                    <div className="flex flex-col items-center justify-center gap-5 w-full">
                        <h3 className="text-neutral-400">Brak korepetycji</h3>
                    </div>
                )
            )}
        </div>
    );
}

function AppointmentSection({
    title,
    appointments,
    userRole,
}: {
    title: "Minione" | "W tym tygodniu" | "Nadchodzące";
    appointments: Appointment[];
    userRole: string;
}) {
    const [isOpen, setIsOpen] = useState(
        title == "W tym tygodniu" ? true : false
    );
    return (
        <div
            className={clsx(
                "flex flex-col items-center xl:items-start justify-start gap-5 w-full",
                isOpen ? "flex-grow" : "flex-shrink-0"
            )}
        >
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            disabled={appointments.length == 0}
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center justify-center gap-4 w-full group"
                        >
                            <div
                                className={clsx(
                                    "w-full flex-grow h-1 rounded-full transition-color duration-300",
                                    title == "Minione"
                                        ? "bg-neutral-300 group-hover:bg-neutral-400"
                                        : title == "W tym tygodniu"
                                        ? "bg-green-300 group-hover:bg-green-400"
                                        : "bg-yellow-300 group-hover:bg-yellow-400"
                                )}
                            />
                            <h3
                                className={clsx(
                                    "text-lg text-gray-900 flex-shrink-0 transition-color duration-300",
                                    title == "Minione"
                                        ? "text-neutral-500"
                                        : title == "W tym tygodniu"
                                        ? "text-green-500"
                                        : "text-yellow-500"
                                )}
                            >
                                {title}
                            </h3>
                            <div
                                className={clsx(
                                    "w-full flex-grow h-1 rounded-full transition-color duration-300",
                                    title == "Minione"
                                        ? "bg-neutral-300 group-hover:bg-neutral-400"
                                        : title == "W tym tygodniu"
                                        ? "bg-green-300 group-hover:bg-green-400"
                                        : "bg-yellow-300 group-hover:bg-yellow-400"
                                )}
                            />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Kliknij, aby rozwinąć sekcje</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            {isOpen &&
                appointments.map((appointment, index) =>
                    userRole == "STUDENT" ? (
                        <StudentAppointment
                            key={index}
                            appointment={appointment}
                            enrolledStudentsCount={
                                appointment?.studentAppointments?.length!
                            }
                        />
                    ) : (
                        <TeacherAppointment
                            key={index}
                            appointment={appointment}
                            enrolledStudentsCount={
                                appointment?.studentAppointments?.length!
                            }
                        />
                    )
                )}
        </div>
    );
}

function StudentAppointment({
    appointment,
    enrolledStudentsCount,
}: {
    appointment: any;
    enrolledStudentsCount: number;
}) {
    const teacherAppointment = appointment.appointment;

    return (
        <div className="relative flex space-x-6 p-3 w-full xl:static border border-neutral-300 rounded-lg">
            <div className="flex-auto text-start">
                <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                    {teacherAppointment.subject.name}
                    <span className="font-normal">
                        {" "}
                        - {teacherAppointment.teacher.user.firstName}{" "}
                        {teacherAppointment.teacher.user.lastName}
                    </span>
                </h3>
                <dl className="mt-2 flex flex-col xl:justify-start text-gray-500 xl:flex-row">
                    <div className="flex items-start space-x-3 flex-grow">
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
                                    teacherAppointment.dateTime
                                ).toISOString()}
                            >
                                {/* 10 Listopada, 2023 o 10:00 */}
                                {new Date(
                                    teacherAppointment.dateTime
                                ).toLocaleDateString("pl-PL", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                                <span className="lowercase">{" o "}</span>
                                {new Date(
                                    teacherAppointment.dateTime
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
                            {teacherAppointment.location.address},{" "}
                            {teacherAppointment.location.postalCode}{" "}
                            {teacherAppointment.location.city}
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
                        <dd>{teacherAppointment.roomNumber}</dd>
                    </div>
                    <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                        <dt className="mt-0.5">
                            <span className="sr-only">Teacher</span>
                            <UserGroupIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </dt>
                        <dd>
                            <span
                                className={clsx(
                                    enrolledStudentsCount >
                                        teacherAppointment.availableSlots / 2
                                        ? "text-orange-500"
                                        : "text-green-600"
                                )}
                            >
                                {enrolledStudentsCount}
                            </span>
                            {" / "}
                            {teacherAppointment.availableSlots}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}

function TeacherAppointment({
    appointment,
    enrolledStudentsCount,
}: {
    appointment: Appointment;
    enrolledStudentsCount: number;
}) {
    return (
        <div className="relative flex space-x-6 p-3 w-full xl:static border border-neutral-300 rounded-lg">
            <div className="flex-auto text-start">
                <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                    {appointment.subject.name}
                </h3>
                <dl className="mt-2 flex flex-col xl:justify-start text-gray-500 xl:flex-row">
                    <div className="flex items-start space-x-3 flex-grow">
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

                    <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                        <dt className="mt-0.5">
                            <span className="sr-only">Available slots</span>
                            <UserGroupIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </dt>
                        <dd>
                            <span
                                className={clsx(
                                    appointment.studentAppointments &&
                                        appointment.studentAppointments.length >
                                            appointment.availableSlots / 2
                                        ? "text-orange-500"
                                        : "text-green-600"
                                )}
                            >
                                {appointment.studentAppointments &&
                                    appointment.studentAppointments.length}
                            </span>
                            {" / "}
                            {appointment.availableSlots}
                        </dd>
                    </div>
                    <div className="mt-2 flex items-center space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
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
                                                    className={clsx(
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
                                                    className={clsx(
                                                        active
                                                            ? "bg-red-50 text-red-600"
                                                            : "text-red-400",
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
                    </div>
                </dl>
            </div>
        </div>
    );
}
