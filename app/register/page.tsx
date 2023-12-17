"use client";

import Logo from "@/components/Logo";
import MultiSelect from "@/components/MultiSelect";
import { useClasses } from "@/hooks/useClasses";
import { useSubjects } from "@/hooks/useSubjects";
import { slideInVariant } from "@/utils/motion";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { Class } from "@/hooks/useClasses";

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

    const { subjects: options } = useSubjects();

    const { classes } = useClasses();

    const handleRegister = async () => {
        // check if the domain in email is @chmura.zs14.edu.pl using regex
        const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@chmura.zs14.edu.pl$/);
        if (!emailRegex.test(user.email)) {
            toast.error("E-mail musi być z domeny @chmura.zs14.edu.pl", {
                autoClose: 6000,
            });
            return;
        }

        if (user.role == "STUDENT") {
            try {
                const res = await fetch("/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                });

                if (res.status === 200) {
                    toast.success("Konto stworzone!", {
                        autoClose: 6000,
                    });
                    await signIn("credentials", {
                        redirect: true,
                        email: user.email,
                        password: user.password,
                        callbackUrl: "/",
                    });
                } else {
                    const data = await res.text();
                    toast.error(data, {
                        autoClose: 60000,
                    });
                }
            } catch (error) {
                console.log(error);
                toast.error("Wystąpił błąd");
            }
        } else {
            if (currentStep == 0) {
                setCurrentStep(1);
            } else {
                const activationCode = verificationCode.join("");
                const formattedCode = activationCode.replace(/(.{4})/g, "$1-");

                try {
                    const res = await fetch("/api/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            ...user,
                            activationCode: formattedCode.slice(0, -1),
                        }),
                    });

                    if (res.status === 200) {
                        toast.success("Konto stworzone!", {
                            autoClose: 6000,
                        });
                        await signIn("credentials", {
                            redirect: true,
                            email: user.email,
                            password: user.password,
                            callbackUrl: "/",
                        });
                        window.location.href = "/panel";
                    } else {
                        const data = await res.text();
                        toast.error(data, {
                            autoClose: 6000,
                        });
                    }
                } catch (error) {
                    console.log(error);
                    toast.error("Wystąpił błąd");
                }
            }
        }
    };

    const [showPassword, setShowPassword] = useState(false);

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

    const [currentStep, setCurrentStep] = useState(0);

    const [verificationCode, setVerificationCode] = useState<string[]>([
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
    ]);
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const handleInputChange = (index: number, value: string) => {
        const newVerificationCode = [...verificationCode];
        newVerificationCode[index] = value;

        setVerificationCode(newVerificationCode);

        if (value !== "" && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        } else if (value === "" && index > 0) {
            inputRefs.current[index - 1].focus();
            setVerificationCode(newVerificationCode);
        } else if (value === "" && index === 0) {
            inputRefs.current[index].focus();
        }
    };

    return (
        <>
            <div className="relative w-screen h-screen isolate md:overflow-x-hidden overflow-y-auto">
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
                            {currentStep == 0
                                ? "Załóż swoje konto"
                                : "Podaj kod aktywacyjny"}
                        </motion.h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        {currentStep == 0 ? (
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
                                            variants={slideInVariant(
                                                "top",
                                                0.35
                                            )}
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
                                                        firstName:
                                                            e.target.value,
                                                    });
                                                }}
                                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <motion.label
                                            variants={slideInVariant(
                                                "top",
                                                0.45
                                            )}
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
                                                        lastName:
                                                            e.target.value,
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
                                            variants={slideInVariant(
                                                "left",
                                                0.55
                                            )}
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
                                    <motion.div
                                        variants={slideInVariant("left", 0.65)}
                                        initial="hidden"
                                        animate="show"
                                        exit="exit"
                                        className="relative mt-0.5"
                                    >
                                        <input
                                            id="password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
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
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                                            {showPassword ? (
                                                <EyeIcon
                                                    className="h-5 w-5"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <EyeSlashIcon
                                                    className="h-5 w-5"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                />
                                            )}
                                        </div>
                                    </motion.div>
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
                                            <option value="STUDENT">
                                                Uczeń
                                            </option>
                                            <option value="TEACHER">
                                                Nauczyciel
                                            </option>
                                        </select>
                                    </motion.div>
                                </div>

                                {user.role == "TEACHER" ? (
                                    <div>
                                        <motion.label
                                            variants={slideInVariant(
                                                "left",
                                                0.1
                                            )}
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
                                                user.role == "TEACHER"
                                                    ? 0.1
                                                    : 0.8
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
                                                user.role == "TEACHER"
                                                    ? 0.15
                                                    : 0.85
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
                                                        schoolClass: Class,
                                                        index: number
                                                    ) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    schoolClass.name
                                                                }
                                                            >
                                                                {
                                                                    schoolClass.name
                                                                }
                                                            </option>
                                                        );
                                                    }
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
                                        {user.role == "STUDENT"
                                            ? "Zarejestruj się"
                                            : "Dalej"}
                                    </button>
                                </motion.div>
                            </form>
                        ) : (
                            <form
                                className="flex flex-col gap-2"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleRegister();
                                }}
                            >
                                <div className="flex items-center w-full gap-4 justify-evenly">
                                    {verificationCode.map((value, index) => (
                                        <React.Fragment key={index}>
                                            <input
                                                ref={(ref) =>
                                                    // @ts-ignore
                                                    (inputRefs.current[index] =
                                                        ref)
                                                }
                                                type="text"
                                                maxLength={1}
                                                value={value}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                className="w-8 h-10 rounded-lg text-center border border-neutral-300"
                                            />
                                            {index === 3 && <span>-</span>}
                                        </React.Fragment>
                                    ))}
                                </div>

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
                        )}

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
