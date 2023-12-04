"use client";

import Modal from "@/components/Modal";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Appointment } from "@/hooks/useAppointments";
import { useLocation } from "@/hooks/useLocation";
import { useTeacher } from "@/hooks/useTeacher";
import { prisma } from "@/prisma/client";
import { CalendarDaysIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
    isOpen: boolean;
    closeModal: () => void;
    appointment: Appointment | null;
    setAppointment: Dispatch<SetStateAction<Appointment | null>>;
};

export const AppointmentModal = ({
    isOpen,
    closeModal,
    appointment,
    setAppointment,
}: Props) => {
    const { teacher } = useTeacher(
        true,
        appointment?.teacher.user.id.toString()
    );
    const { locations } = useLocation();

    if (!appointment) return null;
    return (
        <Modal isOpen={isOpen} closeModal={() => {}}>
            <Modal.Title align="left">
                <div className="w-full flex flex-col items-start justify-start gap-1">
                    <h2>{appointment.subject.name} - korepetycje</h2>
                    <div className="gap-3 w-full flex items-center justify-start capitalize text-sm text-neutral-700">
                        <div className="flex items-center justify-center gap-1">
                            <CalendarDaysIcon className="w-5 aspect-square" />
                            <p>
                                {new Date(
                                    appointment.dateTime
                                ).toLocaleDateString("pl-PL", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>

                        <div className="flex items-center justify-center gap-1">
                            <UsersIcon className="w-5 aspect-square" />
                            <p>
                                {appointment.studentAppointments?.length} /{" "}
                                {appointment.availableSlots}
                            </p>
                        </div>
                    </div>
                </div>
            </Modal.Title>
            <div className="w-full flex gap-3 flex-col items-start justify-start">
                <div className="w-full">
                    <label
                        htmlFor="subject"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Przedmiot
                    </label>
                    <Select
                        name="subject"
                        value={appointment.subject.name}
                        onValueChange={(value) => {
                            setAppointment({
                                ...appointment,
                                subject: {
                                    ...appointment.subject,
                                    name: value,
                                },
                            });
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Wybierz przedmiot" />
                        </SelectTrigger>
                        <SelectContent>
                            {teacher.subjects.map((option) => (
                                <SelectItem key={option.id} value={option.name}>
                                    {option.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full">
                    <label
                        htmlFor="location"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Lokacja
                    </label>
                    <Select
                        name="location"
                        value={appointment.location.address}
                        onValueChange={(value) => {
                            const location = locations?.find(
                                (location) => location.address === value
                            );
                            if (location) {
                                setAppointment({
                                    ...appointment,
                                    location,
                                });
                            }
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Wybierz przedmiot" />
                        </SelectTrigger>
                        <SelectContent>
                            {locations?.map((option) => (
                                <SelectItem
                                    key={option.id}
                                    value={option.address}
                                >
                                    {option.address}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Modal.Footer>
                <Modal.Button color="red" onClick={closeModal}>
                    Close
                </Modal.Button>
                <Modal.Button
                    color="green"
                    onClick={() => console.log("hello")}
                >
                    Save
                </Modal.Button>
            </Modal.Footer>
        </Modal>
    );
};
