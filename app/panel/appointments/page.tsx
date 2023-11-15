"use client";

import { useMultistepForm } from "@/hooks/useMultistepForm";
import Breadcrumbs from "@/components/panel/Breadcrumbs";
import {
    SubjectSelection,
    DateAndTimeSelection,
    GoalSelection,
    Summary,
} from "@/components/panel/appointmentCreation";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {};

export default function Appointments({}: Props) {
    //TODO neccessary informations to collect from students
    // 1. subject, teacher
    // 2. select available date and time
    // 3. select the goal of the lesson, if "other" then input a description of the goal
    // 4. review the appointment and confirm it

    const [appointment, setAppointment] = useState({
        subject: "",
        teacherId: 0,
        dateTime: new Date(),
        goal: "",
    });

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
        if (currentIndex == 0) {
            return appointment.subject != "" && appointment.teacherId != 0;
        } else if (currentIndex == 1) {
            return appointment.dateTime != null;
        } else if (currentIndex == 2) {
            return appointment.goal != "";
        } else if (currentIndex == 3) {
            return true;
        }
        return false;
    }

    return (
        <div className="row-span-2 col-span-3 flex flex-col items-center justify-center h-full">
            <Breadcrumbs
                items={breadcrumbsList}
                index={currentIndex}
                goTo={goTo}
            />
            {step}
            <div
                className={`flex gap-24 items-center w-full mt-2 justify-center`}
            >
                {currentIndex > 0 && (
                    <button
                        className="px-8 py-1 text-neutral-800 bg-neutral-200/80 rounded-md"
                        onClick={() => previous()}
                    >
                        Poprzednia
                    </button>
                )}
                {currentIndex < steps.length - 1 && (
                    <button
                        className="px-12 py-1 text-white bg-green-500 rounded-md"
                        onClick={() => {
                            if (validateCanGoNext()) {
                                next();
                            } else {
                                toast.error("Uzupełnij wszystkie pola");
                            }
                        }}
                    >
                        Następna
                    </button>
                )}
                {currentIndex == steps.length - 1 && (
                    <button
                        className="px-12 py-1 text-white bg-green-500 rounded-md"
                        onClick={() => {
                            if (validateCanGoNext()) {
                                next();
                            }
                        }}
                    >
                        Zatwierdź
                    </button>
                )}
            </div>
        </div>
    );
}