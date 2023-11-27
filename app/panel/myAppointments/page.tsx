"use client";

import PersonalAppointments from "@/components/panel/appointments/PersonalAppointments";
import { useSession } from "next-auth/react";

type Props = {};

export default function Page({}: Props) {
    const { data: session } = useSession();

    if (!session)
        return (
            <div className="flex items-center justify-center w-full h-full col-span-3 row-span-2">
                Loading...
            </div>
        );

    return (
        <div className="flex items-center justify-center w-full h-full col-span-3 row-span-2">
            <PersonalAppointments />
        </div>
    );
}
