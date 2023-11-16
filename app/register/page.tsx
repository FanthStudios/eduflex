"use client";

import Logo from "@/components/Logo";
import MultiSelect from "@/components/MultiSelect";
import { slideInVariant } from "@/utils/motion";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    subjects?: string[];
    appointments?: string[];
    lastLogin?: Date;
    studentsClass?: string;
}

export default function Register({}: Props) {
    const [user, setUser] = useState<User>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "STUDENT",
    });

    const [subjects, setSubjects] = useState<string[]>([]);

    const options = [
        { id: 1, name: "Matematyka" },
        { id: 2, name: "Fizyka" },
        { id: 3, name: "Chemia" },
        { id: 4, name: "Biologia" },
        { id: 5, name: "Geografia" },
        { id: 6, name: "Historia" },
        { id: 7, name: "Wiedza o społeczeństwie" },
        { id: 8, name: "Język polski" },
        { id: 9, name: "Język angielski" },
        { id: 10, name: "Język niemiecki" },
        { id: 13, name: "Język rosyjski" },
        { id: 17, name: "Informatyka" },
        { id: 18, name: "Wychowanie fizyczne" },
        { id: 19, name: "Edukacja dla bezpieczeństwa" },
        { id: 21, name: "Religia" },
    ];

    const classes = ["5pi", "4i", "3i", "2gt", "3gt"];

    const handleRegister = async () => {
        if (user.role == "STUDENT") {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (res.status === 200) {
                await signIn("credentials", {
                    redirect: false,
                    email: user.email,
                    password: user.password,
                    callbackUrl: "/",
                });
            } else {
                console.error(await res.text());
            }
        } else {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (res.status === 200) {
                await signIn("credentials", {
                    redirect: true,
                    email: user.email,
                    password: user.password,
                    callbackUrl: "/panel",
                });
            } else {
                console.error(await res.text());
            }
        }
    };

    useEffect(() => {
        if (
            user.role == "TEACHER" &&
            (subjects.length > 0 || subjects.length == 0) &&
            user.subjects != subjects
        ) {
            setUser({
                ...user,
                subjects: subjects,
            });
        }
    }, [user, subjects]);

    useEffect(() => {
        const availableClasses = ["5pi", "4i", "3i", "2gt", "3gt"];
        if (!user.studentsClass) {
            setUser({
                ...user,
                studentsClass: availableClasses[0],
            });
        }
    }, [user]);

    return (
        <>
            <div className="relative w-screen h-screen isolate md:overflow-hidden">
                <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <Link href="/">
                            <Logo
                                styles={{
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                                size={16}
                            />
                        </Link>
                        <motion.h2
                            variants={slideInVariant("top", 0.2)}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900"
                        >
                            Załóż swoje konto
                        </motion.h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                            className="flex flex-col gap-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleRegister();
                            }}
                        >
                            <div className="flex items-center w-full gap-4 justify-evenly">
                                <div>
                                    <motion.label
                                        variants={slideInVariant("top", 0.35)}
                                        initial="hidden"
                                        animate="show"
                                        exit="exit"
                                        htmlFor="name"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Imię
                                    </motion.label>
                                    <div className="mt-0.5">
                                        <motion.input
                                            variants={slideInVariant(
                                                "top",
                                                0.3
                                            )}
                                            initial="hidden"
                                            animate="show"
                                            exit="exit"
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="given-name"
                                            required
                                            onChange={(e) => {
                                                setUser({
                                                    ...user,
                                                    firstName: e.target.value,
                                                });
                                            }}
                                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <motion.label
                                        variants={slideInVariant("top", 0.45)}
                                        initial="hidden"
                                        animate="show"
                                        exit="exit"
                                        htmlFor="surname"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Nazwisko
                                    </motion.label>
                                    <div className="mt-0.5">
                                        <motion.input
                                            variants={slideInVariant(
                                                "top",
                                                0.4
                                            )}
                                            initial="hidden"
                                            animate="show"
                                            exit="exit"
                                            id="surname"
                                            name="surname"
                                            type="text"
                                            autoComplete="family-name"
                                            required
                                            onChange={(e) => {
                                                setUser({
                                                    ...user,
                                                    lastName: e.target.value,
                                                });
                                            }}
                                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <motion.label
                                    variants={slideInVariant("left", 0.5)}
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email
                                </motion.label>
                                <div className="mt-0.5">
                                    <motion.input
                                        variants={slideInVariant("left", 0.55)}
                                        initial="hidden"
                                        animate="show"
                                        exit="exit"
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        onChange={(e) => {
                                            setUser({
                                                ...user,
                                                email: e.target.value,
                                            });
                                        }}
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <motion.label
                                    variants={slideInVariant("left", 0.6)}
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Hasło
                                </motion.label>
                                <div className="mt-0.5">
                                    <motion.input
                                        variants={slideInVariant("left", 0.65)}
                                        initial="hidden"
                                        animate="show"
                                        exit="exit"
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        onChange={(e) => {
                                            setUser({
                                                ...user,
                                                password: e.target.value,
                                            });
                                        }}
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <motion.label
                                    variants={slideInVariant("left", 0.7)}
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                    htmlFor="role"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Rola
                                </motion.label>
                                <motion.div
                                    className="mt-0.5"
                                    variants={slideInVariant("left", 0.75)}
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                >
                                    <select
                                        id="role"
                                        name="role"
                                        autoComplete="role"
                                        required
                                        onChange={(e) => {
                                            setUser({
                                                ...user,
                                                role: e.target.value,
                                            });
                                        }}
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="STUDENT">Uczeń</option>
                                        <option value="TEACHER">
                                            Nauczyciel
                                        </option>
                                    </select>
                                </motion.div>
                            </div>

                            {user.role == "TEACHER" ? (
                                <div>
                                    <motion.label
                                        variants={slideInVariant("left", 0.1)}
                                        initial="hidden"
                                        animate="show"
                                        exit="exit"
                                        htmlFor="role"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Przedmioty
                                    </motion.label>
                                    <MultiSelect
                                        options={options}
                                        selectedOptions={subjects}
                                        setSelectedOptions={setSubjects}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <motion.label
                                        variants={slideInVariant(
                                            "left",
                                            user.role == "TEACHER" ? 0.1 : 0.8
                                        )}
                                        initial="hidden"
                                        animate="show"
                                        exit="exit"
                                        htmlFor="role"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Przedmioty
                                    </motion.label>
                                    <motion.div
                                        className="mt-0.5"
                                        variants={slideInVariant(
                                            "left",
                                            user.role == "TEACHER" ? 0.15 : 0.85
                                        )}
                                        initial="hidden"
                                        animate="show"
                                        exit="exit"
                                    >
                                        <select
                                            id="class"
                                            name="class"
                                            required
                                            onChange={(e) => {
                                                setUser({
                                                    ...user,
                                                    studentsClass:
                                                        e.target.value,
                                                });
                                            }}
                                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                        >
                                            {classes.map(
                                                (
                                                    studentsClass: string,
                                                    index: number
                                                ) => (
                                                    <option
                                                        key={index}
                                                        value={studentsClass}
                                                    >
                                                        {studentsClass}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </motion.div>
                                </div>
                            )}

                            <motion.div
                                className="mt-6"
                                variants={slideInVariant("bottom", 0.8)}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                            >
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-all duration-200"
                                >
                                    Zarejestruj się
                                </button>
                            </motion.div>
                        </form>

                        <motion.p
                            variants={slideInVariant("bottom", 0.85)}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="mt-10 text-sm text-center text-gray-500"
                        >
                            Masz już konto?{" "}
                            <Link
                                href="/login"
                                className="font-semibold leading-6 text-green-600 hover:text-green-500"
                            >
                                Zaloguj się tutaj
                            </Link>
                        </motion.p>
                    </div>
                </div>
                <div
                    className="absolute inset-x-0 overflow-hidden -top-40 -z-10 transform-gpu blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#91e84a] to-[#00fe3f] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#91e84a] to-[#00fe3f] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>
            </div>
        </>
    );
}
