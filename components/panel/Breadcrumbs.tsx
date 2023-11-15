import { ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";

type Props = {
    index: number;
    items: any[];
    goTo?: (index: number) => void;
};

export default function Breadcrumbs({ index, items, goTo }: Props) {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center gap-1 md:gap-4 w-full">
                {items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                        <div className="flex items-center gap-1 md:gap-2">
                            {itemIndex !== 0 && (
                                <>
                                    <div
                                        className={clsx(
                                            "hidden md:block h-1 md:w-22 xl:w-28 rounded-full mr-2",
                                            itemIndex <= index
                                                ? "bg-green-400"
                                                : "bg-gray-300"
                                        )}
                                        aria-hidden="true"
                                    />
                                    <ChevronRightIcon
                                        className={clsx(
                                            "md:hidden block h-5 w-5 flex-shrink-0 mr-1 text-gray-400",
                                            itemIndex <= index
                                                ? "text-green-600"
                                                : "text-gray-300"
                                        )}
                                        aria-hidden="true"
                                    />
                                </>
                            )}
                            <p
                                className={clsx(
                                    "lg:text-md text-sm font-semibold whitespace-nowrap",
                                    itemIndex <= index
                                        ? "text-green-500 hover:text-green-600"
                                        : "text-gray-500 hover:text-gray-600"
                                )}
                            >
                                {item}
                            </p>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
