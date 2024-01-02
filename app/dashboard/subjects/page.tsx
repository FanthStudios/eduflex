"use client";

import Modal from "@/components/Modal";
import { useSubjects } from "@/hooks/useSubjects";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {};

function DashboardSubjects({}: Props) {
    const { loading, subjects, setSubjects } = useSubjects();
    const [modalOpen, setModalOpen] = useState(false);
    const [subjectName, setSubjectName] = useState("");

    async function handleDelete(id: number) {
        const res = await fetch(`/api/subjects?id=${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            setSubjects((subjects) =>
                subjects.filter((subject) => subject.id !== id)
            );
            toast.success("Przedmiot został usunięty");
        } else {
            toast.error("Wystąpił błąd podczas usuwania przedmiotu");
        }
    }

    async function handleAdd(name: string) {
        if (!name || name == "") return;

        const res = await fetch(`/api/subjects`, {
            method: "POST",
            body: JSON.stringify({ name }),
        });

        if (res.ok) {
            const subject = await res.json();
            setSubjects((subjects) => [...subjects, subject]);
            toast.success("Przedmiot został dodany");
        } else {
            toast.error("Wystąpił błąd podczas dodawania przedmiotu");
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-start justify-start w-full h-full gap-5 col-span-3 row-span-2">
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-lg font-medium xl:text-xl">
                        Przedmioty nauczania
                    </h1>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="py-1 px-3 rounded-lg bg-green-500 text-white"
                    >
                        Dodaj przedmiot
                    </button>
                </div>
                <div className="flex flex-wrap items-start justify-start gap-10 w-full">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="py-2 px-4 flex justify-between items-center rounded-lg border text-lg bg-neutral-50 border-neutral-200 max-w-[11rem] w-full animate-pulse"
                        >
                            <div className="w-1/2 h-6 bg-neutral-200 rounded"></div>
                            <button
                                disabled
                                className="text-sm font-medium transition-all duration-200 hover:scale-105 text-neutral-500 hover:text-red-500"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            <Modal isOpen={modalOpen} closeModal={() => {}}>
                <Modal.Title align="left">Dodaj przedmiot</Modal.Title>
                <div className="w-full">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Nazwa przedmiotu
                    </label>
                    <div className="mt-0.5 w-full">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            onChange={(e) => {
                                setSubjectName(e.target.value);
                            }}
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <Modal.Footer>
                    <button
                        onClick={() => {
                            setModalOpen(false);
                            handleAdd(subjectName);
                            setSubjectName("");
                        }}
                        className="py-1 px-3 rounded-lg bg-green-500 text-white"
                    >
                        Dodaj
                    </button>
                </Modal.Footer>
            </Modal>
            <div className="flex flex-col items-start justify-start w-full h-full gap-5 col-span-3 row-span-2">
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-lg font-medium xl:text-xl">
                        Przedmioty nauczania
                    </h1>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="py-1 px-3 rounded-lg bg-green-500 text-white"
                    >
                        Dodaj przedmiot
                    </button>
                </div>
                <div className="flex flex-wrap items-start justify-start gap-5 w-full">
                    {subjects.map((subject) => (
                        <div
                            className="py-2 px-4 flex justify-between items-center rounded-lg border text-lg bg-neutral-50 border-neutral-200 w-fit gap-x-5"
                            key={subject.id}
                        >
                            <p className="whitespace-nowrap">{subject.name}</p>
                            <button
                                onClick={async () =>
                                    await handleDelete(subject.id)
                                }
                                className="text-sm font-medium transition-all duration-200 hover:scale-105 text-neutral-500 hover:text-red-500"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default DashboardSubjects;
