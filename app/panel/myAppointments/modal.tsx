"use client";

import Modal from "@/components/Modal";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tab } from "@headlessui/react";
import { Appointment } from "@/hooks/useAppointments";
import { useLocation } from "@/hooks/useLocation";
import { useTeacher } from "@/hooks/useTeacher";
import {
    AdjustmentsHorizontalIcon,
    CalendarDaysIcon,
    CheckIcon,
    HandThumbDownIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import { useState, type Dispatch, type SetStateAction } from "react";
import { DateTimePicker } from "@/components/ui/datetime";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import Accordion from "./accordion";

type Props = {
    isOpen: boolean;
    closeModal: () => void;
    appointment: Appointment | null;
    setAppointment: Dispatch<SetStateAction<Appointment | null>>;
};

async function handleSubmit(appointment: Appointment) {
    // appointment update function
    const res = await fetch("/api/appointments", {
        method: "PATCH",
        body: JSON.stringify({
            id: appointment.id,
            subject: appointment.subject.name,
            location: appointment.location,
            dateTime: appointment.dateTime,
            roomNumber: appointment.roomNumber,
            availableSlots: appointment.availableSlots,
        }),
    });

    if (res.ok) {
        const data = await res.json();
        toast.success("Zaktualizowano korepetycje");
        window.location.reload();
    } else {
        toast.error("Wystąpił błąd podczas aktualizacji korepetycji");
        console.error(await res.json());
    }
}

async function handleDeleteStudent(
    studentId: number,
    appointmentId: number,
    subjectId: number,
    teacherId: number,
    locationAddress: string,
    reason: string
) {
    if (!reason) {
        toast.error("Wpisz powód usunięcia uczestnika");
        return;
    }

    // appointment update function
    const res = await fetch("/api/appointments/student", {
        method: "DELETE",
        body: JSON.stringify({
            studentId,
            appointmentId,
            subjectId,
            teacherId,
            locationAddress,
            reason,
        }),
    });

    if (res.status === 200) {
        const data = await res.json();
        toast.success("Usunięto uczestnika");
        window.location.reload();
    } else {
        toast.error("Wystąpił błąd podczas usuwania uczestnika");
        console.error(await res.json());
    }
}

export const AppointmentModal = ({
    isOpen,
    closeModal,
    appointment,
    setAppointment,
}: Props) => {
    const teacherId = appointment?.teacher.user.id.toString();

    const { teacher } = useTeacher(true, teacherId);
    const { locations } = useLocation();

    const [reason, setReason] = useState("");

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
            <Tab.Group>
                <Tab.List className="flex flex-col w-full">
                    <nav className="flex items-center justify-start gap-3">
                        <Tab
                            className={({ selected }) =>
                                `w-full flex items-center transition-all duration-150 justify-center gap-1 bg-white py-2 px-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50/50 outline-none ring-none border-b-2 border-transparent hover:border-green-400 hover:text-green-500 hover:shadow-md
                                ${
                                    selected
                                        ? "bg-white text-green-500 border-green-500 transition-all duration-150"
                                        : ""
                                }`
                            }
                        >
                            <AdjustmentsHorizontalIcon className="w-5 aspect-square" />
                            <span>Informacje</span>
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                `w-full flex items-center transition-all duration-150 justify-center gap-1 bg-white py-2 px-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50/50 outline-none ring-none border-b-2 border-transparent hover:border-green-400 hover:text-green-500 hover:shadow-md
                                ${
                                    selected
                                        ? "bg-white text-green-500 border-green-500 transition-all duration-150"
                                        : ""
                                }`
                            }
                        >
                            <UsersIcon className="w-5 aspect-square" />
                            <span>Uczestnicy</span>
                        </Tab>
                    </nav>
                    <div className="border-b border-gray-300 w-full"></div>
                </Tab.List>
                <Tab.Panels className="w-full">
                    <Tab.Panel className="w-full flex gap-3 flex-col items-start justify-start">
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
                                        <SelectItem
                                            key={option.id}
                                            value={option.name}
                                        >
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
                        <div className="w-full">
                            <label
                                htmlFor="dateAndTime"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Data i godzina
                            </label>
                            <DateTimePicker
                                date={new Date(appointment.dateTime)}
                                setDate={(date) => {
                                    setAppointment({
                                        ...appointment,
                                        dateTime: date,
                                    });
                                }}
                            />
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="roomNumber"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Numer sali
                            </label>
                            <Input
                                type="number"
                                name="roomNumber"
                                id="roomNumber"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-neutral-500 focus:border-neutral-500 sm:text-sm"
                                placeholder="Numer sali"
                                value={appointment.roomNumber}
                                onChange={(e) => {
                                    setAppointment({
                                        ...appointment,
                                        roomNumber: parseInt(e.target.value),
                                    });
                                }}
                            />
                        </div>
                    </Tab.Panel>
                    <Tab.Panel className="w-full flex gap-3 flex-col items-start justify-start divide-y divide-neutral-100">
                        {appointment.studentAppointments &&
                        appointment.studentAppointments.length > 0 ? (
                            appointment.studentAppointments.map(
                                (studentAppointment: any, index: number) => {
                                    return (
                                        <Accordion
                                            key={index}
                                            className="w-full flex items-center justify-between gap-3"
                                        >
                                            <Accordion.Head>
                                                <p className="text-neutral-700 font-medium whitespace-nowrap">
                                                    {
                                                        studentAppointment
                                                            .student.user
                                                            .firstName
                                                    }{" "}
                                                    {
                                                        studentAppointment
                                                            .student.user
                                                            .lastName
                                                    }
                                                </p>
                                                <div className="flex items-center justify-end gap-2 flex-grow w-full">
                                                    <p>
                                                        {studentAppointment.goal ==
                                                        "poprawa_kartkowki"
                                                            ? "pop. kartkówki"
                                                            : studentAppointment.goal ==
                                                              "poprawa_sprawdzianu"
                                                            ? "pop. sprawdzianu"
                                                            : studentAppointment.goal ==
                                                              "nauka"
                                                            ? "Nauka"
                                                            : studentAppointment.goal}
                                                    </p>
                                                    <p>
                                                        {studentAppointment.goal !==
                                                        ("poprawa_kartkówki" ||
                                                            "poprawa_sprawdzianu" ||
                                                            "nauka")
                                                            ? studentAppointment
                                                                  .topic
                                                                  .length > 25
                                                                ? studentAppointment.topic.substring(
                                                                      0,
                                                                      25
                                                                  ) + "..."
                                                                : studentAppointment.topic
                                                            : ""}
                                                    </p>
                                                </div>
                                            </Accordion.Head>
                                            <Accordion.Body>
                                                <div className="w-full flex gap-2">
                                                    <Input
                                                        type="text"
                                                        name="reason"
                                                        id="reason"
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-neutral-500 focus:border-neutral-500 sm:text-sm"
                                                        placeholder="Powód usunięcia"
                                                        onChange={(e) => {
                                                            setReason(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                    <button
                                                        onClick={async () => {
                                                            await handleDeleteStudent(
                                                                studentAppointment
                                                                    .student
                                                                    .user.id,
                                                                appointment.id,
                                                                appointment
                                                                    .subject.id,
                                                                appointment
                                                                    .teacher
                                                                    .user.id,
                                                                appointment
                                                                    .location
                                                                    .address,
                                                                reason
                                                            );
                                                        }}
                                                        className="p-2 flex gap-2 items-center justify-center border rounded-lg border-transparent transition-all duration-100 hover:shadow-md hover:text-red-500 hover:bg-neutral-50/10"
                                                    >
                                                        <span className="lg:block hidden">
                                                            Potwierdź
                                                        </span>
                                                        <CheckIcon className="w-5 aspect-square" />
                                                    </button>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion>
                                    );
                                }
                            )
                        ) : (
                            <div>
                                <p className="text-neutral-500 font-medium text-lg">
                                    Brak uczestników
                                </p>
                            </div>
                        )}
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
            <Modal.Footer>
                <Modal.Button color="red" onClick={closeModal}>
                    Zamknij
                </Modal.Button>
                <Modal.Button
                    color="green"
                    onClick={async () => await handleSubmit(appointment)}
                >
                    Zapisz
                </Modal.Button>
            </Modal.Footer>
        </Modal>
    );
};
