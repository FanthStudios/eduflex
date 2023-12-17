"use client";

import Modal from "@/components/Modal";
import { useClasses } from "@/hooks/useClasses";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {};

function Dashboardclasses({}: Props) {
    const { loading, classes, setClasses } = useClasses();
    const [modalOpen, setModalOpen] = useState(false);
    const [schoolClassName, setschoolClassName] = useState("");

    const classLevels = {
        1: classes.filter((schoolClass) => schoolClass.name.includes("1")),
        2: classes.filter((schoolClass) => schoolClass.name.includes("2")),
        3: classes.filter((schoolClass) => schoolClass.name.includes("3")),
        4: classes.filter((schoolClass) => schoolClass.name.includes("4")),
        5: classes.filter((schoolClass) => schoolClass.name.includes("5")),
    };

    console.log(classLevels);

    async function handleDelete(id: number) {
        const res = await fetch(`/api/classes?id=${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            setClasses((classes) =>
                classes.filter((schoolClass) => schoolClass.id !== id)
            );
            toast.success("Klasa została usunięta");
        } else {
            toast.error("Wystąpił błąd podczas usuwania klasy");
        }
    }

    async function handleAdd(name: string) {
        if (!name || name == "") return;

        const res = await fetch(`/api/classes`, {
            method: "POST",
            body: JSON.stringify({ name }),
        });

        if (res.ok) {
            const schoolClass = await res.json();
            setClasses((classes) => [...classes, schoolClass]);
            toast.success("Klasa została dodana");
        } else {
            toast.error("Wystąpił błąd podczas dodawania klasy");
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-start justify-start w-full h-full gap-5 col-span-3 row-span-2">
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-lg font-medium xl:text-xl">
                        Klasy w szkole
                    </h1>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="py-1 px-3 rounded-lg bg-green-500 text-white"
                    >
                        Dodaj klasę
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
                        Klasa
                    </label>
                    <div className="mt-0.5 w-full">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            onChange={(e) => {
                                setschoolClassName(e.target.value);
                            }}
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <Modal.Footer>
                    <button
                        onClick={() => {
                            setModalOpen(false);
                            handleAdd(schoolClassName);
                            setschoolClassName("");
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
                        Klasy w szkole
                    </h1>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="py-1 px-3 rounded-lg bg-green-500 text-white"
                    >
                        Dodaj klasę
                    </button>
                </div>
                <div className="flex flex-col items-start justify-start gap-6 w-full">
                    {/* {classes.map((schoolClass) => (
                        <div
                            className="py-2 px-4 flex justify-between items-center rounded-lg border text-lg bg-neutral-50 border-neutral-200 max-w-[11rem] w-full"
                            key={schoolClass.id}
                        >
                            <p>{schoolClass.name}</p>
                            <button
                                onClick={async () =>
                                    await handleDelete(schoolClass.id)
                                }
                                className="text-sm font-medium transition-all duration-200 hover:scale-105 text-neutral-500 hover:text-red-500"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))} */}
                    {Object.entries(classLevels).map(
                        ([level, classes]) =>
                            classes.length > 0 && (
                                <div key={level} className="w-full">
                                    <div className="w-full flex flex-col items-start justify-start gap-2">
                                        <div className="flex items-center justify-center w-full gap-4">
                                            <div className="w-full flex-grow h-1 rounded-full bg-neutral-300" />
                                            <h2 className="text-lg font-medium whitespace-nowrap">
                                                Klasy {level}
                                            </h2>
                                            <div className="w-full flex-grow h-1 rounded-full bg-neutral-300" />
                                        </div>
                                        <div className="flex flex-wrap items-start justify-start gap-6 w-full">
                                            {classes.map((schoolClass) => (
                                                <div
                                                    className="py-2 px-4 flex justify-between items-center rounded-lg border text-lg bg-neutral-50 border-neutral-200 max-w-[11rem] w-full"
                                                    key={schoolClass.id}
                                                >
                                                    <p>{schoolClass.name}</p>
                                                    <button
                                                        onClick={async () =>
                                                            await handleDelete(
                                                                schoolClass.id
                                                            )
                                                        }
                                                        className="text-sm font-medium transition-all duration-200 hover:scale-105 text-neutral-500 hover:text-red-500"
                                                    >
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                    )}
                </div>
            </div>
        </>
    );
}

export default Dashboardclasses;
