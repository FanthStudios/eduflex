"use client";

import { useSession } from "next-auth/react";
import React from "react";

type Props = {};

export default function Appointments({}: Props) {
    const { data: session } = useSession();
    return <div>Appointments</div>;
}
