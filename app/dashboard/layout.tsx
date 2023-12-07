"use client";

import { Mobile, Sidebar } from "@/components/Sidebar";
import { useEffect, useState } from "react";
import {
    CalendarDaysIcon,
    HomeIcon,
    LockOpenIcon,
    PencilSquareIcon,
    Squares2X2Icon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

const navigation = [
    {
        name: "Strona główna",
        href: "/dashboard",
        icon: Squares2X2Icon,
    },
    {
        name: "Kody dostępu",
        href: "/dashboard/accessCodes",
        icon: LockOpenIcon,
    },
    {
        name: "Uczniowie",
        href: "/dashboard/students",
        icon: UsersIcon,
    },
    {
        name: "Nauczyciele",
        href: "/dashboard/teachers",
        icon: UsersIcon,
    },
];
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

type Props = {
    children: React.ReactNode;
};

export default function PanelLayout({ children }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        if (session && session?.user.role.toLocaleLowerCase() !== "admin") {
            window.location.href = "/panel";
        }
    }, [session]);

    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
            <div>
                <Mobile
                    user={session?.user}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    navigation={navigation}
                    classNames={classNames}
                />

                {/* Static sidebar for desktop */}
                <Sidebar
                    user={session?.user}
                    classNames={classNames}
                    navigation={navigation}
                />

                <main className="fixed z-40 inset-0 pt-16 2xl:py-10 lg:pl-72 h-full">
                    <div className="px-4 py-4 sm:px-6 lg:px-8 grid grid-cols-3 grid-rows-2 gap-12 items-start h-full">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}
