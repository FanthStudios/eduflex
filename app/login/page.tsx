"use client";

import Link from "next/link";
import React, { useState } from "react";
import Logo from "@/components/Logo";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { slideInVariant } from "@/utils/motion";
import { toast } from "react-toastify";

type Props = {};

export default function Login({}: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const data = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
                callbackUrl: "/panel",
            });

            const error = data && data.error;

            if (error) {
                const parsedError = JSON.parse(error);
                toast.error(parsedError.error, {
                    autoClose: 60000,
                });
            } else {
                window.location.href = "/panel";
            }
        } catch (e: any) {
            console.log(e);
        }
    };

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
                            variants={slideInVariant("top", 0.3)}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900"
                        >
                            Zaloguj się do swojego konta
                        </motion.h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                            className="space-y-3"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                await handleLogin();
                            }}
                        >
                            <div>
                                <motion.label
                                    variants={slideInVariant("left", 0.4)}
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email
                                </motion.label>
                                <div className="mt-2">
                                    <motion.input
                                        variants={slideInVariant("left", 0.45)}
                                        initial="hidden"
                                        animate="show"
                                        exit="exit"
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
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
                                    <div className="text-sm">
                                        <motion.a
                                            variants={slideInVariant(
                                                "right",
                                                0.65
                                            )}
                                            initial="hidden"
                                            animate="show"
                                            exit="exit"
                                            href="#"
                                            className="font-semibold text-green-600 hover:text-green-500"
                                        >
                                            Zapomniałeś hasła ?
                                        </motion.a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <motion.input
                                        variants={slideInVariant("left", 0.7)}
                                        initial="hidden"
                                        animate="show"
                                        exit="exit"
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <motion.div
                                variants={slideInVariant("bottom", 0.8)}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                            >
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-all duration-200"
                                >
                                    Zaloguj się
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
                            Nie masz konta?{" "}
                            <Link
                                href="/register"
                                className="font-semibold leading-6 text-green-600 hover:text-green-500"
                            >
                                Załóż je tutaj
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
