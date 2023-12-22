"use client";

import { Tab } from "@headlessui/react";
import Account from "./account";
import Notifications from "./notifications";
import { Fragment } from "react";
import clsx from "clsx";

type Props = {};

const secondaryNavigation = [
    {
        name: "Konto",
        component: <Account />,
    },
    { name: "Powiadomienia", component: <Notifications /> },
];

function Settings({}: Props) {
    return (
        <main className="flex flex-col items-center justify-center w-full h-full gap-5 col-span-3 row-span-2">
            <Tab.Group>
                <header className="border-b border-neutral-200 w-[106%] md:w-[109%] lg:w-[105%] 2xl:w-[104%] -mt-4">
                    <Tab.List className="flex overflow-x-auto py-4 min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8">
                        {secondaryNavigation.map((item) => (
                            <Tab
                                // @ts-ignore
                                disabled={item.name == "Powiadomienia"}
                                as={Fragment}
                                key={item.name}
                            >
                                {({ selected }) => (
                                    <p
                                        className={clsx(
                                            item.name == "Powiadomienia"
                                                ? "line-through"
                                                : "",
                                            selected ? "text-green-400" : "",
                                            "cursor-pointer"
                                        )}
                                    >
                                        {item.name}
                                    </p>
                                )}
                            </Tab>
                        ))}
                    </Tab.List>
                </header>
                <Tab.Panels>
                    {secondaryNavigation.map((item) => (
                        <Tab.Panel key={item.name}>{item.component}</Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </main>
    );
}

export default Settings;
