import React from "react";

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
    availableSlots: number;
    studentAppointments?: any[];
    occurrences: number;
};

type Props = {
    appointment: Appointment;
};

export default function TeacherMeetingSummary({ appointment }: Props) {
    return (
        <div className="flex flex-col items-center justify-start w-full h-full lg:h-3/4 md:p-3 xl:p-10 gap-3">
            <h1 className="text-xl lg:text-2xl">
                Podsumowanie nowych korepetycji
            </h1>
            {/* map the appointment */}
            <div className="w-full lg:w-2/3">
                <p className="text-sm mb-1">Przedmiot</p>
                <p className="py-1 px-3 bg-neutral-50 border border-neutral-300 rounded-lg w-full">
                    {appointment.subject}
                </p>
            </div>
            <div className="w-full lg:w-2/3">
                <p className="text-sm mb-1">Data i godzina</p>
                <p className="py-1 px-3 bg-neutral-50 border capitalize border-neutral-300 rounded-lg w-full">
                    {appointment.dateTime.toLocaleString("pl-PL", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        hour: "numeric",
                        minute: "numeric",
                    })}
                </p>
            </div>
            <div className="w-full lg:w-2/3">
                <p className="text-sm mb-1">Cykliczność</p>
                <p className="py-1 px-3 bg-neutral-50 border border-neutral-300 rounded-lg w-full">
                    {appointment.recurring?.toLowerCase() == "never"
                        ? "Nigdy"
                        : appointment.recurring?.toLowerCase() == "weekly"
                        ? "Co tydzień"
                        : appointment.recurring?.toLowerCase() == "biweekly"
                        ? "Co dwa tygodnie"
                        : appointment.recurring?.toLowerCase() == "monthly"
                        ? "Co miesiąc"
                        : "Nigdy"}
                </p>
            </div>
            <div className="w-full lg:w-2/3">
                <p className="text-sm mb-1">Ilość powtórzeń</p>
                <p className="py-1 px-3 bg-neutral-50 border border-neutral-300 rounded-lg w-full">
                    {appointment.occurrences}
                </p>
            </div>
            <div className="w-full lg:w-2/3">
                <p className="text-sm mb-1">Lokalizacja</p>
                <p className="py-1 px-3 bg-neutral-50 border border-neutral-300 rounded-lg w-full">
                    {appointment.location.address},{" "}
                    {appointment.location.postalCode}{" "}
                    {appointment.location.city}
                </p>
            </div>
            <div className="w-full lg:w-2/3">
                <p className="text-sm mb-1">Numer sali</p>
                <p className="py-1 px-3 bg-neutral-50 border border-neutral-300 rounded-lg w-full">
                    {appointment.roomNumber}
                </p>
            </div>
            <div className="w-full lg:w-2/3">
                <p className="text-sm mb-1">Wolne miejsca</p>
                <p className="py-1 px-3 bg-neutral-50 border border-neutral-300 rounded-lg w-full">
                    {appointment.availableSlots}
                </p>
            </div>
        </div>
    );
}
