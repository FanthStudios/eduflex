"use client";

import { useTeacher } from "@/hooks/useTeacher";
import { set } from "date-fns";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

enum Recurring {
    NEVER = "NEVER",
    WEEKLY = "WEEKLY",
    BIWEEKLY = "BIWEEKLY",
    MONTHLY = "MONTHLY",
}

type Appointment = {
    subject: string;
    dateTime: Date;
    location: {
        lat: number;
        lng: number;
        city: string;
        postalCode: string;
        address: string;
    };
    roomNumber: number;
    recurring: Recurring | null;
    teacherId?: number;
};

type Props = {
    appointment: Appointment;
    setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
};

export default function MeetingForm({ appointment, setAppointment }: Props) {
    const { data: session } = useSession();
    const { teachers } = useTeacher(false, session?.user.id);
    const teacher = teachers[0];

    const getLocationByAddress = (address: string) => {
        return locations.find((location) => location.address == address);
    };

    const locations = [
        {
            lat: 52.2620461,
            lng: 21.0266347,
            city: "Warszawa",
            postalCode: "03-481",
            address: "ul. Szanajcy 5",
        },
        {
            lat: 52.2639814,
            lng: 21.0312258,
            city: "Warszawa",
            postalCode: "03-481",
            address: "ul. Szanajcy 17",
        },
    ];

    useEffect(() => {
        const locations1 = [
            {
                lat: 52.2620461,
                lng: 21.0266347,
                city: "Warszawa",
                postalCode: "03-481",
                address: "ul. Szanajcy 5",
            },
            {
                lat: 52.2639814,
                lng: 21.0312258,
                city: "Warszawa",
                postalCode: "03-481",
                address: "ul. Szanajcy 17",
            },
        ];

        const getLocationByAddress1 = (address: string) => {
            return locations1.find((location) => location.address == address);
        };

        if (appointment.subject == "") {
            setAppointment({
                ...appointment,
                subject: teacher?.subjects[0].name,
            });
        }
        if (appointment.location.address == "") {
            setAppointment({
                ...appointment,
                location: getLocationByAddress1(locations1[0].address)!,
            });
        }

        if (appointment.recurring == null) {
            setAppointment({
                ...appointment,
                recurring: Recurring.NEVER,
            });
        }

        if (appointment.teacherId == undefined) {
            setAppointment({
                ...appointment,
                teacherId: teacher?.userId,
            });
        }
    }, [appointment, setAppointment, teacher?.subjects, teacher?.userId]);
    return (
        <div className="flex flex-col items-center justify-start w-full h-full lg:h-3/4 md:p-3 xl:p-10 gap-3">
            <h1 className="text-xl lg:text-2xl">
                Wybierz przedmiot, datę i lokalizację
            </h1>
            <div className="md:w-1/3 w-full">
                <label
                    htmlFor="subject"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Przedmiot
                </label>
                <select
                    id="subject"
                    name="subject"
                    required
                    onChange={(e) => {
                        setAppointment({
                            ...appointment,
                            subject: e.target.value,
                        });
                    }}
                    style={{
                        fontSize: "1rem",
                    }}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-inset focus:outline-none focus:ring-green-600 sm:text-sm sm:leading-6"
                >
                    {teacher?.subjects?.map((subject) => (
                        <option key={subject.id} value={subject.name}>
                            {subject.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="md:w-1/3 w-full">
                <label
                    htmlFor="dateAndTime"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Data i godzina
                </label>
                <input
                    type="datetime-local"
                    name="dateAndTime"
                    id="dateAndTime"
                    required
                    value={appointment.dateTime.toISOString().slice(0, -8)}
                    onChange={(e) => {
                        setAppointment({
                            ...appointment,
                            dateTime: new Date(e.target.value),
                        });
                    }}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-inset focus:outline-none focus:ring-green-600 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="md:w-1/3 w-full">
                <label
                    htmlFor="recurring"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Powtarzalność
                </label>
                <select
                    id="recurring"
                    name="recurring"
                    required
                    onChange={(e) => {
                        setAppointment({
                            ...appointment,
                            recurring: e.target.value as Recurring,
                        });
                    }}
                    style={{
                        fontSize: "1rem",
                    }}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-inset focus:outline-none focus:ring-green-600 sm:text-sm sm:leading-6"
                >
                    <option value={Recurring.NEVER}>Nigdy</option>
                    <option value={Recurring.WEEKLY}>Co tydzień</option>
                    <option value={Recurring.BIWEEKLY}>Co dwa tygodnie</option>
                    <option value={Recurring.MONTHLY}>Co miesiąc</option>
                </select>
            </div>
            <div className="md:w-1/3 w-full">
                <label
                    htmlFor="location"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Lokalizacja
                </label>
                <select
                    id="location"
                    name="location"
                    required
                    onChange={(e) => {
                        setAppointment({
                            ...appointment,
                            location: getLocationByAddress(e.target.value)!,
                        });
                    }}
                    style={{
                        fontSize: "1rem",
                    }}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-inset focus:outline-none focus:ring-green-600 sm:text-sm sm:leading-6"
                >
                    {locations.map((location) => (
                        <option key={location.address} value={location.address}>
                            {location.address}, {location.postalCode}{" "}
                            {location.city}
                        </option>
                    ))}
                </select>
            </div>
            <div className="md:w-1/3 w-full">
                <label
                    htmlFor="room"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Numer sali
                </label>
                <input
                    type="number"
                    name="room"
                    id="room"
                    required
                    value={appointment.roomNumber}
                    onChange={(e) => {
                        setAppointment({
                            ...appointment,
                            roomNumber: parseInt(e.target.value),
                        });
                    }}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-inset focus:outline-none focus:ring-green-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    );
}
