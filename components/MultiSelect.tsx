"use client";

import { slideInVariant } from "@/utils/motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState } from "react";
import { string } from "zod";

type Props = {
    options: { id: number; name: string }[];
    selectedOptions: string[];
    setSelectedOptions: (options: string[]) => void;
};

export default function MultiSelect({
    options,
    selectedOptions,
    setSelectedOptions,
}: Props) {
    const handleChange = (e: any) => {
        // check if the checkbox is checked or unchecked
        if (e.target.checked) {
            // add the numerical value of the checkbox to options array
            setSelectedOptions([...selectedOptions, e.target.value]);
        } else {
            // or remove the value from the unchecked checkbox from the array
            setSelectedOptions(
                selectedOptions.filter((option) => option !== e.target.value)
            );
        }
    };

    return (
        <motion.label
            className="relative"
            variants={slideInVariant("left", 0.15)}
            initial="hidden"
            animate="show"
            exit="exit"
        >
            <input type="checkbox" className="hidden peer" />

            <div className="cursor-pointer flex items-center justify-between border border-neutral-300 rounded-md px-2 py-1 text-sm w-full">
                {selectedOptions.length === 0 && (
                    <span className="ml-1 text-neutral-900">
                        Zaznacz przedmioty
                    </span>
                )}
                {selectedOptions.length > 0 && (
                    <span className="ml-1 text-blue-500">{`(${selectedOptions.length} zaznaczonych)`}</span>
                )}

                <ChevronDownIcon className="ml-auto w-5 h-5 text-gray-400 peer-checked:rotate-180" />
            </div>

            <div className="absolute bg-white border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto w-full max-h-60 overflow-y-scroll">
                <ul>
                    {options.map((option, i) => {
                        return (
                            <li key={i}>
                                <label
                                    className={`flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200`}
                                >
                                    <input
                                        type="checkbox"
                                        name={i.toString()}
                                        value={options[i].name}
                                        className="cursor-pointer"
                                        onChange={handleChange}
                                    />
                                    <span className="ml-1">{option.name}</span>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </motion.label>
    );
}
