"use client";

import { EdgeStoreProvider } from "@/lib/edgestore";

import { Mobile, Sidebar } from "@/components/Sidebar";
import { useEffect, useState } from "react";
import {
    CalendarDaysIcon,
    HomeIcon,
    PencilSquareIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useNotification } from "@/hooks/useNotifications";

type Props = {
    children: React.ReactNode;
};

export default function PanelLayout({ children }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session } = useSession();
    const userRole = session?.user.role.toLocaleLowerCase();
    const userId = session?.user.id;
    const pathname = usePathname();

    const [navigation, setNavigation] = useState([
        [
            {
                name: "Strona główna",
                href: "/panel",
                icon: HomeIcon,
            },
            {
                name: "Nauczyciele",
                href: "/panel/teachers",
                icon: UsersIcon,
            },
            {
                name: "Zapisz się",
                href: "/panel/appointments",
                icon: PencilSquareIcon,
            },
            {
                name: "Moje korepetycje",
                href: "/panel/myAppointments",
                icon: CalendarDaysIcon,
            },
        ],
        [
            {
                name: "Strona główna",
                href: "/panel",
                icon: HomeIcon,
            },
            {
                name: "Uczniowie",
                href: "/panel/students",
                icon: UsersIcon,
            },
            {
                name: "Stwórz korepetycje",
                href: "/panel/createAppointment",
                icon: PencilSquareIcon,
            },
            {
                name: "Moje korepetycje",
                href: "/panel/myAppointments",
                icon: CalendarDaysIcon,
            },
        ],
    ]);

    const { notifications, setNotifications } = useNotification(userId);

    useEffect(() => {
        if (pathname == "/panel" && userRole == "admin") {
            window.location.href = "/dashboard";
        }

        if (pathname == "/dashboard" && userRole !== "admin") {
            window.location.href = "/panel";
        }
    }, [pathname, userRole]);

    return (
        <EdgeStoreProvider>
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
                />

                {/* Static sidebar for desktop */}
                <Sidebar
                    setNotifications={setNotifications}
                    notifications={notifications}
                    setSidebarOpen={setSidebarOpen}
                    user={session?.user}
                    navigation={
                        session?.user.role.toLocaleLowerCase() === "student"
                            ? navigation[0]
                            : navigation[1]
                    }
                >
                    <div className="px-4 py-4 sm:px-6 lg:px-8 grid grid-cols-3 grid-rows-2 gap-12 items-start h-full">
                        {children}
                    </div>
                </Sidebar>
            </div>
        </EdgeStoreProvider>
    );
}
