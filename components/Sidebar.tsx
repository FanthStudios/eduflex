"use client";

/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";

import {
    Bars3Icon,
    BellIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    TrashIcon,
    UserMinusIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import Logo from "./Logo";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Notification } from "@/hooks/useNotifications";
import { LogOutIcon } from "lucide-react";

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

const userNavigation = [{ name: "Wyloguj się" }];

interface SidebarProps {
    navigation: {
        name: string;
        href: string;
        icon: any;
        count?: number;
    }[];
    user:
        | {
              id: string;
              password: string;
              firstName: string;
              lastName: string;
              email: string;
              role: string;
              avatar: string;
          }
        | undefined;
    setSidebarOpen: (value: boolean) => void;
    children: React.ReactNode;
    notifications: Notification[];
    setNotifications: (value: Notification[]) => void;
}

export function Sidebar({
    navigation,
    user,
    setSidebarOpen,
    children,
    notifications,
    setNotifications,
}: SidebarProps) {
    const userRole = user?.role;
    const userId = user?.id;
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

    const [filteredNotifications, setFilteredNotifications] =
        useState(notifications);

    const [unreadNotifications, setUnreadNotifications] = useState(
        notifications.filter(
            (notification) =>
                notification.read == false &&
                notification.userId == Number(userId)
        ).length
    );

    useEffect(() => {
        if (
            notifications != filteredNotifications &&
            filteredNotifications.length == 0
        ) {
            setFilteredNotifications(
                notifications.filter(
                    (notification) =>
                        notification.read == false &&
                        notification.userId == Number(userId)
                )
            );
        }

        setUnreadNotifications(
            filteredNotifications.filter(
                (notification) =>
                    notification.read == false &&
                    notification.userId == Number(userId)
            ).length
        );
    }, [notifications, userId]);

    async function handleNotificationRead(id: number) {
        await fetch(`/api/notifications`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, read: true }),
        });

        const newNotifications = notifications
            .filter(
                (notification) =>
                    notification.read == false &&
                    notification.userId == Number(userId)
            )
            .map((notification: any) => {
                if (notification.id == id) {
                    notification.read = true;
                }

                return notification;
            });

        setNotifications(newNotifications);
        setFilteredNotifications(newNotifications);
    }

    return (
        <>
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
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
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <motion.li
                                            whileTap={{
                                                scale: 0.95,
                                                transition: {
                                                    duration: 0.1,
                                                },
                                            }}
                                            key={item.name}
                                            className="flex items-center justify-between w-full"
                                        >
                                            <Link
                                                href={item.href}
                                                className={clsx(
                                                    pathname == item.href
                                                        ? "bg-neutral-50 text-green-600"
                                                        : "text-neutral-700 hover:text-green-600 hover:bg-neutral-50",
                                                    "group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full",
                                                    item.count &&
                                                        "justify-between"
                                                )}
                                            >
                                                <div className="flex items-center justify-center gap-x-3">
                                                    <item.icon
                                                        className={clsx(
                                                            pathname ==
                                                                item.href
                                                                ? "text-green-600"
                                                                : "text-neutral-400 group-hover:text-green-600",
                                                            "h-8 w-8 shrink-0"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    <p>{item.name}</p>
                                                </div>
                                                {item.count && (
                                                    <div className="py-1 flex items-center justify-center w-1/6 h-fit bg-neutral-50 border border-neutral-200 rounded-xl">
                                                        <p className="text-xs font-semibold text-neutral-400 text-center">
                                                            {item.count}
                                                        </p>
                                                    </div>
                                                )}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </li>

                            {userRole?.toLowerCase() !== "admin" && (
                                <motion.li
                                    whileTap={{
                                        scale: 0.95,
                                        transition: {
                                            duration: 0.1,
                                        },
                                    }}
                                    className="flex items-center justify-between w-full mt-auto"
                                >
                                    <Link
                                        href="/panel/settings"
                                        className={clsx(
                                            pathname == "/panel/settings"
                                                ? "bg-neutral-50 text-green-600"
                                                : "text-neutral-700 hover:text-green-600 hover:bg-neutral-50",
                                            "group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full"
                                        )}
                                    >
                                        <Cog6ToothIcon
                                            className={clsx(
                                                pathname == "/panel/settings"
                                                    ? "text-green-600"
                                                    : "text-neutral-400 group-hover:text-green-600",
                                                "h-8 w-8 shrink-0"
                                            )}
                                            aria-hidden="true"
                                        />
                                        <p>Ustawienia</p>
                                    </Link>
                                </motion.li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="lg:pl-72">
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Otwórz panel boczny</span>
                        <Bars3Icon className="h-8 w-8" aria-hidden="true" />
                    </button>

                    {/* Separator */}
                    <div
                        className="h-6 w-px bg-gray-200 lg:hidden"
                        aria-hidden="true"
                    />

                    <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="relative">
                                    <span className="sr-only">
                                        Sprawdź powiadomienia
                                    </span>
                                    <BellIcon
                                        className="h-8 w-8"
                                        aria-hidden="true"
                                    />
                                    {unreadNotifications > 0 && (
                                        <span className="absolute -mt-8 ml-5 flex">
                                            <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
                                        </span>
                                    )}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="text-sm w-96 max-h-64 overflow-y-auto">
                                    <DropdownMenuLabel>
                                        Powiadomienia
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {unreadNotifications > 0 ? (
                                        filteredNotifications.map(
                                            (notification, index) => (
                                                <DropdownMenuItem
                                                    key={index}
                                                    onClick={async () =>
                                                        await handleNotificationRead(
                                                            notification.id
                                                        )
                                                    }
                                                    className={clsx(
                                                        notification.read
                                                            ? "bg-neutral-200 hover:bg-neutral-300"
                                                            : "bg-white hover:bg-neutral-100"
                                                    )}
                                                >
                                                    <div className="flex items-center justify-between p-0.5 gap-3 cursor-pointer">
                                                        {notification.type ==
                                                            "appointment_kick" ||
                                                        "appointment_leave" ? (
                                                            <UserMinusIcon
                                                                className="h-8 w-8 text-red-500"
                                                                aria-hidden="true"
                                                            />
                                                        ) : notification.type ==
                                                          "appointment_delete" ? (
                                                            <TrashIcon
                                                                className="h-8 w-8 text-neutral-500"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <BellIcon
                                                                className="h-8 w-8 text-green-500"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {
                                                                notification.message
                                                            }
                                                        </p>
                                                    </div>
                                                </DropdownMenuItem>
                                            )
                                        )
                                    ) : (
                                        <DropdownMenuItem disabled>
                                            Brak powiadomień
                                        </DropdownMenuItem>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Separator */}
                            <div
                                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                                aria-hidden="true"
                            />

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative">
                                <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    {user?.avatar ? (
                                        <div className={fillColor}>
                                            <img
                                                className="w-full h-full rounded-full object-cover object-center aspect-square"
                                                src={user?.avatar}
                                                alt=""
                                            />
                                        </div>
                                    ) : (
                                        <div className={fillColor}>
                                            <p>{user?.firstName[0]}</p>
                                        </div>
                                    )}
                                    <span className="hidden lg:flex lg:items-center">
                                        <span
                                            className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                                            aria-hidden="true"
                                        >
                                            {user?.firstName} {user?.lastName}
                                        </span>
                                        <ChevronDownIcon
                                            className="ml-2 h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-36 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                        {userNavigation.map((item) => (
                                            <Menu.Item key={item.name}>
                                                {({ active }) => (
                                                    <button
                                                        onClick={async () =>
                                                            await signOut({
                                                                callbackUrl:
                                                                    "/",
                                                                redirect: true,
                                                            })
                                                        }
                                                        className={clsx(
                                                            active
                                                                ? "bg-gray-50"
                                                                : "",
                                                            "flex gap-2 items-center ml-0.5 px-3 py-1 text-sm leading-6 text-gray-900 w-[97%] justify-between rounded-lg"
                                                        )}
                                                    >
                                                        <LogOutIcon
                                                            size={20}
                                                            className="text-neutral-700"
                                                        />
                                                        <p>{item.name}</p>
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>

                <main>{children}</main>
            </div>
        </>
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
    user,
}: MobileProps) => {
    const [fillColor, setFillColor] = useState("");
    const userRole = user?.role;

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
        user && (
            <div>
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
                                                className="-m-2.5 p-2.5"
                                                onClick={() =>
                                                    setSidebarOpen(false)
                                                }
                                            >
                                                <span className="sr-only">
                                                    Close sidebar
                                                </span>
                                                <XMarkIcon
                                                    className="h-8 w-8 text-white"
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
                                                        {navigation.map(
                                                            (item) => (
                                                                <li
                                                                    key={
                                                                        item.name
                                                                    }
                                                                >
                                                                    <a
                                                                        href={
                                                                            item.href
                                                                        }
                                                                        className={clsx(
                                                                            pathname ==
                                                                                item.href
                                                                                ? "bg-neutral-50 text-green-600"
                                                                                : "text-neutral-700 hover:text-green-600 hover:bg-neutral-50",
                                                                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                                                        )}
                                                                    >
                                                                        <item.icon
                                                                            className={clsx(
                                                                                pathname ==
                                                                                    item.href
                                                                                    ? "text-green-600"
                                                                                    : "text-neutral-400 group-hover:text-green-600",
                                                                                "h-8 w-8 shrink-0"
                                                                            )}
                                                                            aria-hidden="true"
                                                                        />
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </a>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </li>
                                                {userRole?.toLowerCase() !==
                                                    "admin" && (
                                                    <motion.li
                                                        whileTap={{
                                                            scale: 0.95,
                                                            transition: {
                                                                duration: 0.1,
                                                            },
                                                        }}
                                                        className="flex items-center justify-between w-full mt-auto"
                                                    >
                                                        <Link
                                                            href="/panel/settings"
                                                            className={clsx(
                                                                pathname ==
                                                                    "/panel/settings"
                                                                    ? "bg-neutral-50 text-green-600"
                                                                    : "text-neutral-700 hover:text-green-600 hover:bg-neutral-50",
                                                                "group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full"
                                                            )}
                                                        >
                                                            <Cog6ToothIcon
                                                                className={clsx(
                                                                    pathname ==
                                                                        "/panel/settings"
                                                                        ? "text-green-600"
                                                                        : "text-neutral-400 group-hover:text-green-600",
                                                                    "h-8 w-8 shrink-0"
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                            <p>Ustawienia</p>
                                                        </Link>
                                                    </motion.li>
                                                )}
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>
        )
    );
};
