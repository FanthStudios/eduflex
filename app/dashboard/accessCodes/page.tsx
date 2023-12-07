"use client";
import { useState } from "react";
import Table from "./table";

type Props = {};

function AccessCodes({}: Props) {
    const [codes, setCodes] = useState([
        {
            value: "123456",
            date: new Date(),
            user: {
                email: "user@chmura.zs14.edu.pl",
            },
        },
        {
            value: "654321",
            date: new Date(),
        },
    ]);

    return (
        <div className="flex flex-col items-start justify-start w-full h-full gap-5 col-span-3 row-span-2">
            <h1 className="text-lg font-medium xl:text-xl">Kody dostępu</h1>
            <Table codes={codes} setCodes={setCodes} />
        </div>
    );
}

export default AccessCodes;
