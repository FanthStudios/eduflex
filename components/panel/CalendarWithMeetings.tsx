/* eslint-disable @next/next/no-img-element */
"use client";

import { Fragment, useState } from "react";
import {
    CalendarIcon,
    EllipsisHorizontalIcon,
    MapPinIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { Calendar } from "@/components/ui/calendar";
import { DayClickEventHandler } from "react-day-picker";

const meetings = [
    {
        id: 1,
        date: "January 10th, 2023",
        time: "5:00 PM",
        datetime: "2023-01-10T17:00",
        name: "Leslie Alexander",
        imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        location: "Starbucks",
    },
    // More meetings...
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}
type Props = {};

export default function CalendarWithMeetings({}: Props) {
    const [day, setDay] = useState<Date | undefined>(new Date());

    const appointmentDays = [new Date(2023, 11, 15), new Date(2023, 11, 8)];

    const appointmentDaysClassNames =
        "after:bg-red-500 after:absolute after:top-0 after:right-0 after:rounded-md after:w-2 after:h-2";

    return (
        <div className="col-span-2 row-span-1">
            <h2 className="text-lg font-semibold leading-6 text-gray-900">
                Nadchodzące korki
            </h2>
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-16 shadow rounded-lg p-3">
                <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
                    {meetings.map((meeting) => (
                        <li
                            key={meeting.id}
                            className="relative flex space-x-6 py-6 xl:static"
                        >
                            <img
                                src={meeting.imageUrl}
                                alt=""
                                className="h-14 w-14 flex-none rounded-full"
                            />
                            <div className="flex-auto">
                                <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                                    {meeting.name}
                                </h3>
                                <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
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
                                            <time dateTime={meeting.datetime}>
                                                {meeting.date} at {meeting.time}
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
                                        <dd>{meeting.location}</dd>
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
                                                                ? "bg-gray-100 text-gray-900"
                                                                : "text-gray-700",
                                                            "block px-4 py-2 text-sm"
                                                        )}
                                                    >
                                                        Cancel
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </li>
                    ))}
                </ol>
                <Calendar
                    mode="single"
                    selected={day}
                    onSelect={setDay}
                    onDayClick={(day, modifiers): DayClickEventHandler => {
                        console.log(day);
                        console.log(modifiers);
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
