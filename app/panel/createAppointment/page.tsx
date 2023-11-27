"use client";

import Modal from "@/components/Modal";
import Breadcrumbs from "@/components/panel/Breadcrumbs";
import MeetingForm from "@/components/panel/MeetingForm";
import TeacherMeetingSummary from "@/components/panel/TeacherMeetingSummary";
import { useMultistepForm } from "@/hooks/useMultistepForm";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {};

enum Recurring {
    NEVER = "NEVER",
    WEEKLY = "WEEKLY",
    BIWEEKLY = "BIWEEKLY",
    MONTHLY = "MONTHLY",
}

export default function CreateAppointment({}: Props) {
    const [newAppointment, setNewAppointment] = useState({
        subject: "",
        dateTime: new Date(),
        location: {
            lat: 0,
            lng: 0,
            city: "",
            postalCode: "",
            address: "",
        },
        roomNumber: 0,
        recurring: null as Recurring | null,
        availableSlots: 0,
        occurrences: 0,
    });

    const [modalOpen, setModalOpen] = useState(false);

    const breadcrumbsList = ["Dodaj spotkanie", "Podsumowanie"];
    const steps = [
        <MeetingForm
            key={1}
            appointment={newAppointment}
            setAppointment={setNewAppointment}
        />,
        <TeacherMeetingSummary key={2} appointment={newAppointment} />,
    ];
    const { step, currentIndex, next, previous, goTo } =
        useMultistepForm(steps);
    function validateCanGoNext() {
        if (currentIndex == 0) {
            return (
                newAppointment.subject != "" &&
                newAppointment.location.address != "" &&
                newAppointment.roomNumber != 0 &&
                newAppointment.dateTime != new Date() &&
                newAppointment.recurring != null &&
                newAppointment.availableSlots != 0 &&
                newAppointment.occurrences != 0
            );
        }
        return false;
    }

    async function createNewAppointment() {
        console.log(newAppointment);
        const res = await fetch("/api/appointments", {
            method: "POST",
            body: JSON.stringify({
                ...newAppointment,
                occurences: newAppointment.occurrences,
            }),
        });

        const body = await res.json();

        if (res.status == 200) {
            toast.success("Spotkanie zostało dodane");
            setModalOpen(true);
        } else {
            toast.error(body.message ?? "Wystąpił błąd");
        }
    }
    return (
        <>
            <Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
                <Modal.Title align="center">
                    Czy chcesz dodać następne korepetycje
                </Modal.Title>
                <Modal.Footer>
                    <Modal.Button
                        color="green"
                        onClick={() => {
                            goTo(0);
                            setModalOpen(false);
                        }}
                    >
                        Dodaj następne
                    </Modal.Button>
                    <Modal.Button
                        color="red"
                        onClick={() => {
                            window.location.href = "/panel/myAppointments";
                            setModalOpen(false);
                        }}
                    >
                        Nie
                    </Modal.Button>
                </Modal.Footer>
            </Modal>
            <div className="row-span-2 col-span-3 flex flex-col items-center justify-center h-full">
                <Breadcrumbs
                    items={breadcrumbsList}
                    index={currentIndex}
                    goTo={goTo}
                />
                {step}
                <div className={`flex items-center w-full mt-2 justify-evenly`}>
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
                            onClick={async () => {
                                await createNewAppointment();
                            }}
                        >
                            Zatwierdź
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
