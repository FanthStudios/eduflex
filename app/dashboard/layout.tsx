"use client";

import { Mobile, Sidebar } from "@/components/Sidebar";
import { useEffect, useState } from "react";
import {
    AcademicCapIcon,
    BookOpenIcon,
    BuildingLibraryIcon,
    KeyIcon,
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
        name: "Klucze aktywacji",
        href: "/dashboard/accessCodes",
        icon: KeyIcon,
    },
    {
        name: "Przedmioty",
        href: "/dashboard/subjects",
        icon: BookOpenIcon,
    },
    {
        name: "Klasy",
        href: "/dashboard/classes",
        icon: BuildingLibraryIcon,
    },
    {
        name: "Uczniowie",
        href: "/dashboard/students",
        icon: AcademicCapIcon,
    },
    {
        name: "Nauczyciele",
        href: "/dashboard/teachers",
        icon: UsersIcon,
    },
];

type Props = {
    children: React.ReactNode;
};

export default function PanelLayout({ children }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session && session?.user.role.toLocaleLowerCase() !== "admin") {
            window.location.href = "/panel";
        } else if (!session && status !== "loading") {
            window.location.href = "/login";
        }
    }, [session, status]);

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
                    user={session ? session.user : undefined}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    navigation={navigation}
                />

                {/* Static sidebar for desktop */}
                <Sidebar user={session?.user} navigation={navigation} />

                <main className="fixed z-40 inset-0 pt-16 2xl:py-10 lg:pl-72 h-full">
                    <div className="px-4 py-4 sm:px-6 lg:px-8 grid grid-cols-3 grid-rows-2 gap-12 items-start h-full">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}
