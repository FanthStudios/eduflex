"use client";

import { useState, useEffect, useMemo } from "react";
import Table from "./table";

type Props = {};

function AccessCodes({}: Props) {
    const [codes, setCodes] = useState<
        {
            value: string;
            date: Date;
            user?: {
                email: string;
            };
        }[]
    >([]);

    useEffect(() => {
        // Fetch access codes here
        // Example API call:
        fetch("/api/accessCodes")
            .then((response) => response.json())
            .then((data) => setCodes(data));
    }, []);

    const memoizedCodes = useMemo(() => codes, [codes]);

    return (
        <div className="flex flex-col items-start justify-start w-full h-full gap-5 col-span-3 row-span-2">
            <h1 className="text-lg font-medium xl:text-xl">Kody dostępu</h1>
            <Table codes={memoizedCodes} setCodes={setCodes} />
        </div>
    );
}

export default AccessCodes;
