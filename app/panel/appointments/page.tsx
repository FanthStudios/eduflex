"use client";

import { useMultistepForm } from "@/hooks/useMultistepForm";
import Breadcrumbs from "@/components/panel/Breadcrumbs";
import {
    SubjectSelection,
    DateAndTimeSelection,
    GoalSelection,
    Summary,
} from "@/components/panel/appointmentRegisteration";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

type Props = {};

type Appointment = {
    subject: string;
    teacherId: number;
    dateTime: Date | null;
    goal: string;
    topic?: string;
    customGoal?: string;
};

const initialAppointment: Appointment = {
    subject: "",
    teacherId: 0,
    dateTime: null,
    goal: "",
    topic: "",
};

export default function Appointments({}: Props) {
    const { data: session } = useSession();

    const studentId = session?.user.id;
    //TODO neccessary informations to collect from students
    // 1. subject, teacher
    // 2. select available date and time
    // 3. select the goal of the lesson, if "other" then input a description of the goal
    // 4. review the appointment and confirm it

    const [appointment, setAppointment] =
        useState<Appointment>(initialAppointment);

    const breadcrumbsList = ["Przedmiot", "Termin", "Cel", "Podsumowanie"];
    const steps = [
        <SubjectSelection
            key={1}
            appointment={appointment}
            setAppointment={setAppointment}
        />,
        <DateAndTimeSelection
            key={2}
            appointment={appointment}
            setAppointment={setAppointment}
            studentId={studentId}
        />,
        <GoalSelection
            key={3}
            appointment={appointment}
            setAppointment={setAppointment}
        />,
        <Summary
            key={4}
            appointment={appointment}
            setAppointment={setAppointment}
        />,
    ];
    const { step, currentIndex, next, previous, goTo } =
        useMultistepForm(steps);

    function validateCanGoNext() {
        switch (currentIndex) {
            case 0:
                return (
                    appointment.subject !== "" && appointment.teacherId !== 0
                );
            case 1:
                return appointment.dateTime !== null;
            case 2:
                return (
                    (appointment.goal !== "inne" && appointment.topic !== "") ||
                    (appointment.goal === "inne" &&
                        appointment.customGoal !== "")
                );
            case 3:
                return true;
            default:
                return false;
        }
    }

    async function enrollToAppointment() {
        if (!session?.user.id) {
            toast.error("Nie jesteś zalogowany");
            return;
        }

        try {
            const res = await fetch("/api/enroll", {
                method: "POST",
                body: JSON.stringify({
                    ...appointment,
                    studentId: session?.user.id!,
                }),
            });

            const body = await res.json();

            if (res.status === 200) {
                window.location.href = "/panel/appointments";
                toast.success("Zapisano na konsultacje");
            } else {
                console.log(body);
                toast.error(body.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Wystąpił błąd");
        }
    }

    const handleNextClick = () => {
        if (validateCanGoNext()) {
            if (currentIndex == steps.length - 2) {
                if (appointment.customGoal && appointment.customGoal != "") {
                    setAppointment({
                        ...appointment,
                        goal: appointment.customGoal,
                        customGoal: "",
                    });
                }
            }
            next();
        } else {
            toast.error("Uzupełnij wszystkie pola");
        }
    };

    const handleConfirmClick = async () => {
        await enrollToAppointment();
    };

    return (
        <div className="row-span-2 col-span-3 flex flex-col items-center justify-center h-full overflow-y-auto">
            <Breadcrumbs
                items={breadcrumbsList}
                index={currentIndex}
                goTo={goTo}
            />
            {step}
            <div className={`flex items-center w-full mt-2 justify-evenly`}>
                <button
                    disabled={currentIndex == 0}
                    className="px-8 py-1 text-neutral-800 bg-neutral-200/80 rounded-md disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600"
                    onClick={previous}
                >
                    Poprzednia
                </button>
                {currentIndex < steps.length - 1 && (
                    <button
                        className="px-12 py-1 text-white bg-green-500 rounded-md"
                        onClick={handleNextClick}
                    >
                        Następna
                    </button>
                )}
                {currentIndex == steps.length - 1 && (
                    <button
                        className="px-12 py-1 text-white bg-green-500 rounded-md"
                        onClick={handleConfirmClick}
                    >
                        Zatwierdź
                    </button>
                )}
            </div>
        </div>
    );
}
