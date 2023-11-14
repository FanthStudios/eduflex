"use client";

import {
    CalendarIcon,
    ChartPieIcon,
    ClockIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

type Props = {};

export default function SummaryReport({}: Props) {
    const cards = [
        {
            name: "Nadchodzące korepetycje",
            icon: <CalendarIcon className="h-12 aspect-square text-white" />,
            description:
                "Właśnie tyle masz zaplanowanych korepetycji w tym miesiącu",
            value: 10,
        },
        {
            name: "Zakończone korepetycje",
            icon: <ChartPieIcon className="h-12 aspect-square text-white" />,
            description: "Nieźle, tyle korepetycji zakończyłeś w tym miesiącu",
            value: 15,
        },
        {
            name: "Ilość przepracowanych godzin",
            icon: <ClockIcon className="h-12 aspect-square text-white" />,
            description: "W tym miesiącu przepracowałeś tyle godzin",
            value: 125,
        },
    ];
    return (
        <div
            className={`flex flex-col items-start justify-center w-full gap-6 col-span-3 lg:col-span-2 lg:row-span-1`}
        >
            <h3 className="text-base font-semibold leading-6 text-gray-900">
                Raport podsumowujący
            </h3>

            <dl className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {cards.map((card, index) => (
                    <ReportCard
                        key={index}
                        name={card.name}
                        icon={card.icon}
                        description={card.description}
                        value={card.value}
                    />
                ))}
            </dl>
        </div>
    );
}

export function ReportCard({
    name,
    icon,
    description,
    value,
}: {
    name: string;
    icon: any;
    description: string;
    value: number;
}) {
    return (
        <div className="overflow-hidden gap-4 flex rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <div className="aspect-square w-fit rounded-md bg-green-500 p-3">
                {icon}
            </div>
            <div>
                <dt className="truncate text-sm font-medium text-gray-500">
                    {name}
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    {value}
                </dd>
            </div>
        </div>
    );
}
