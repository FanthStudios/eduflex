import { ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";

type Props = {
    index: number;
    items: any[];
    goTo?: (index: number) => void;
};

const currentVariant = (index: number, items: any[]) => {
    return {
        initial: {
            width: "5%",
        },
        animate: {
            width: `${
                index === 0
                    ? 5
                    : index === items.length - 1
                    ? 100
                    : (index / items.length) * 100 + 12.5
            }%`,
            transition: {
                duration: 0.5,
            },
        },
    };
};

export default function Breadcrumbs({ index, items, goTo }: Props) {
    return (
        <nav className="w-1/2" aria-label="Breadcrumb">
            <div aria-hidden="true">
                <div className="hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                    {items.map((item, itemIndex) => (
                        <div
                            key={itemIndex}
                            className={clsx(
                                "flex items-center gap-1 md:gap-2",
                                itemIndex <= index
                                    ? "text-green-500 hover:text-green-600"
                                    : "text-gray-500 hover:text-gray-600",
                                itemIndex === items.length - 1
                                    ? "justify-end"
                                    : itemIndex === 0
                                    ? "justify-start"
                                    : "justify-center"
                            )}
                        >
                            <p className="whitespace-nowrap">{item}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-4 overflow-hidden rounded-full bg-gray-200">
                    <motion.div
                        className="h-2 rounded-full bg-green-500"
                        variants={currentVariant(index, items)}
                        initial="initial"
                        animate="animate"
                    />
                </div>
            </div>
        </nav>
    );
}
