"use client";

/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "./Logo";
import clsx from "clsx";
import { signOut } from "next-auth/react";

const colorPallete = [
    "red",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
    "pink",
    "violet",
    "amber",
    "sky",
    "lime",
    "emerald",
    "teal",
    "cyan",
    "fuchsia",
    "rose",
];
const randomColor =
    colorPallete[Math.floor(Math.random() * colorPallete.length)];
const bgColorSaturation = () => {
    // Generate a random number between 1 and 7
    const randomMultiplier = Math.floor(Math.random() * 5) + 1;

    // Ensure the generated number is divisible by 100
    const randomNumber = randomMultiplier * 100;

    return randomNumber;
};

const colorSaturation = bgColorSaturation();

interface SidebarProps {
    navigation: {
        name: string;
        href: string;
        icon: any;
    }[];
    classNames: (...classes: string[]) => string;
    user:
        | {
              id: string;
              password: string;
              firstName: string;
              lastName: string;
              email: string;
              role: string;
          }
        | undefined;
}

export function Sidebar({ navigation, classNames, user }: SidebarProps) {
    const [fillColor, setFillColor] = useState("");

    useEffect(() => {
        setFillColor(
            clsx(
                `bg-${randomColor}-${colorSaturation} text-${randomColor}-${
                    colorSaturation + 400
                }`,
                "h-8 w-8 rounded-full flex items-center justify-center"
            )
        );
    }, []);

    const pathname = usePathname();

    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-neutral-200 bg-white px-6">
                <div className="flex h-16 shrink-0 items-center">
                    <Logo size={8} />
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <div className="text-xs font-semibold leading-6 text-neutral-400">
                                Nawigacja
                            </div>
                            <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            className={clsx(
                                                pathname == item.href
                                                    ? "bg-neutral-50 text-green-600"
                                                    : "text-neutral-700 hover:text-green-600 hover:bg-neutral-50",
                                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                            )}
                                        >
                                            <item.icon
                                                className={clsx(
                                                    pathname == item.href
                                                        ? "text-green-600"
                                                        : "text-neutral-400 group-hover:text-green-600",
                                                    "h-6 w-6 shrink-0"
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li className="-mx-6 mt-auto flex flex-col items-start justify-center">
                            <button
                                className="w-full flex items-center justify-center px-6 py-3 text-sm font-semibold leading-6 text-neutral-900 hover:bg-neutral-50"
                                onClick={() => {
                                    signOut();
                                }}
                            >
                                <p>Wyloguj się</p>
                            </button>
                            <a
                                href="#"
                                className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-neutral-900 hover:bg-neutral-50"
                            >
                                <div className={`${fillColor}`}>
                                    <p>{user?.firstName[0]}</p>
                                </div>
                                <span className="sr-only">Your profile</span>
                                <span aria-hidden="true">
                                    {user?.firstName} {user?.lastName}
                                </span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

interface MobileProps {
    sidebarOpen: boolean;
    setSidebarOpen: (value: boolean) => void;
    navigation: {
        name: string;
        href: string;
        icon: any;
    }[];
    classNames: (...classes: string[]) => string;

    user:
        | {
              id: string;
              password: string;
              firstName: string;
              lastName: string;
              email: string;
              role: string;
          }
        | undefined;
}

export const Mobile = ({
    sidebarOpen,
    setSidebarOpen,
    navigation,
    classNames,
    user,
}: MobileProps) => {
    const [fillColor, setFillColor] = useState("");

    useEffect(() => {
        setFillColor(
            clsx(
                `bg-${randomColor}-${colorSaturation} text-${randomColor}-${
                    colorSaturation + 400
                }`,
                "h-8 w-8 rounded-full flex items-center justify-center"
            )
        );
    }, []);

    const pathname = usePathname();

    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50 lg:hidden shadow-lg"
                    onClose={setSidebarOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-neutral-900/80" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button
                                            type="button"
                                            className="-m-2.5 p-2.5"
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close sidebar
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>
                                {/* Sidebar component, swap this element with another sidebar if you like */}
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <Logo size={8} />
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul
                                            role="list"
                                            className="flex flex-1 flex-col gap-y-7"
                                        >
                                            <li>
                                                <div className="text-xs font-semibold leading-6 text-neutral-400">
                                                    Nawigacja
                                                </div>
                                                <ul
                                                    role="list"
                                                    className="-mx-2 space-y-1"
                                                >
                                                    {navigation.map((item) => (
                                                        <li key={item.name}>
                                                            <a
                                                                href={item.href}
                                                                className={classNames(
                                                                    pathname ==
                                                                        item.href
                                                                        ? "bg-neutral-50 text-green-600"
                                                                        : "text-neutral-700 hover:text-green-600 hover:bg-neutral-50",
                                                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                                                )}
                                                            >
                                                                <item.icon
                                                                    className={classNames(
                                                                        pathname ==
                                                                            item.href
                                                                            ? "text-green-600"
                                                                            : "text-neutral-400 group-hover:text-green-600",
                                                                        "h-6 w-6 shrink-0"
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <div className="sticky top-0 z-50 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                <button
                    type="button"
                    className="-m-2.5 p-2.5 text-neutral-700 lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="flex-1 text-sm font-semibold leading-6 text-neutral-900">
                    Panel
                </div>
                <a href="#">
                    <span className="sr-only">Your profile</span>
                    <div className={`${fillColor}`}>
                        <p>{user?.firstName[0]}</p>
                    </div>
                </a>
            </div>
        </>
    );
};
