"use client";

import { Mobile, Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import {
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import Logo from "@/components/Logo";
import { useSession } from "next-auth/react";

const navigation = [
    [
        {
            name: "Strona główna",
            href: "/panel",
            icon: HomeIcon,
            current: true,
        },
        {
            name: "Nauczyciele",
            href: "/panel/teachers",
            icon: UsersIcon,
            current: false,
        },
        {
            name: "Korepetycje",
            href: "/appointments",
            icon: FolderIcon,
            current: false,
        },
    ],
    [
        {
            name: "Strona główna",
            href: "/panel",
            icon: HomeIcon,
            current: true,
        },
        {
            name: "Uczniowie",
            href: "/panel/students",
            icon: UsersIcon,
            current: false,
        },
        {
            name: "Korepetycje",
            href: "/appointments",
            icon: FolderIcon,
            current: false,
        },
    ],
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Page() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session } = useSession();

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
                    navigation={
                        session?.user.role.toLocaleLowerCase() === "student"
                            ? navigation[0]
                            : navigation[1]
                    }
                    classNames={classNames}
                />

                {/* Static sidebar for desktop */}
                <Sidebar
                    user={session?.user}
                    classNames={classNames}
                    navigation={
                        session?.user.role.toLocaleLowerCase() === "student"
                            ? navigation[0]
                            : navigation[1]
                    }
                />

                <main className="py-10 lg:pl-72">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {/* Your content */}
                    </div>
                </main>
            </div>
        </>
    );
}
