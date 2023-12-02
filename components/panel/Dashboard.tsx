"use client";

import React from "react";
import SummaryReport from "./SummaryReport";
import CalendarWithMeetings from "./CalendarWithMeetings";
import { useSession } from "next-auth/react";
import clsx from "clsx";

type Props = {};

export default function Dashboard({}: Props) {
    const { data: session } = useSession();
    return (
        <div
            className={clsx(
                "flex flex-col items-start justify-start gap-6",
                session?.user.role == "STUDENT" ? "w-full 2xl:w-2/3" : "w-full"
            )}
        >
            <SummaryReport />
            <CalendarWithMeetings />
        </div>
    );
}
