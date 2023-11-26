"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
    ArrowRightIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import Logo from "./Logo";
import Link from "next/link";
import { slideInVariant } from "@/utils/motion";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

const navigation = [
    { name: "Nasza oferta", href: "#features" },
    { name: "FAQ", href: "#faq" },
    { name: "Referencje", href: "#testimonials" },
];

export default function Hero() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <div className="bg-white">
            <motion.header
                variants={slideInVariant("top", 0.4)}
                initial="hidden"
                animate="show"
                exit="exit"
                className="absolute inset-x-0 top-0 z-50"
            >
                <nav
                    className="flex items-center justify-between p-6 lg:px-8"
                    aria-label="Global"
                >
                    <div className="flex lg:flex-1">
                        <Link href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <Logo size={8} />
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-12">
                        {navigation.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="px-3 py-1 text-sm font-semibold leading-6 text-gray-900 transition-all duration-200 rounded-md hover:text-green-600 hover:bg-green-100"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {session?.user ? (
                            <Link
                                href="/panel"
                                className="flex items-center justify-center gap-1 text-sm font-semibold leading-6 text-gray-900"
                            >
                                Panel{" "}
                                <span aria-hidden="true">
                                    <ArrowRightIcon className="w-4 aspect-square" />
                                </span>
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center justify-center gap-1 text-sm font-semibold leading-6 text-gray-900"
                            >
                                Zaloguj się{" "}
                                <span aria-hidden="true">
                                    <ArrowRightIcon className="w-4 aspect-square" />
                                </span>
                            </Link>
                        )}
                    </div>
                </nav>
                <Dialog
                    as="div"
                    className="lg:hidden"
                    open={mobileMenuOpen}
                    onClose={setMobileMenuOpen}
                >
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <Logo size={8} />
                            </Link>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="py-6">
                                    {session?.user ? (
                                        <Link
                                            href="/panel"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Panel
                                        </Link>
                                    ) : (
                                        <Link
                                            href="/login"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Zaloguj się
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </motion.header>

            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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
                <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-60">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <motion.div
                            variants={slideInVariant("top", 0.6)}
                            initial="hidden"
                            whileInView="show"
                            exit="exit"
                            className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                        >
                            Odkryj nowe możliwości lekcji i zaplanuj swój
                            grafik.{" "}
                            <Link
                                href="#features"
                                className="font-semibold text-green-600"
                            >
                                <span
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                />
                                Dowiedz się więcej
                                <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </motion.div>
                    </div>
                    <div className="text-center">
                        <motion.h1
                            variants={slideInVariant("left", 0.8)}
                            initial="hidden"
                            whileInView="show"
                            exit="exit"
                            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
                        >
                            Odkryj swoją ścieżkę nauki
                        </motion.h1>
                        <motion.p
                            variants={slideInVariant("right", 1)}
                            initial="hidden"
                            whileInView="show"
                            exit="exit"
                            className="mt-6 text-lg leading-8 text-gray-600"
                        >
                            Spersonalizowana platforma do bezproblemowego
                            łączenia się z nauczycielami. Rezerwuj lekcje
                            swobodnie, dostosuj edukacyjną podróż. Odkrywaj,
                            łącz, wzmacniaj umiejętności z EduFlex.
                        </motion.p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <motion.a
                                variants={slideInVariant("top", 1.2)}
                                initial="hidden"
                                whileInView="show"
                                exit="exit"
                                href="/login"
                                className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                            >
                                Zacznijmy
                            </motion.a>
                            <motion.a
                                variants={slideInVariant("top", 1.3)}
                                initial="hidden"
                                whileInView="show"
                                exit="exit"
                                href="#faq"
                                className="flex items-center justify-center gap-2 text-sm font-semibold leading-6 text-gray-900"
                            >
                                Dowiedz się więcej{" "}
                                <span aria-hidden="true">
                                    <ArrowRightIcon className="w-4 aspect-square" />
                                </span>
                            </motion.a>
                        </div>
                    </div>
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
        </div>
    );
}
