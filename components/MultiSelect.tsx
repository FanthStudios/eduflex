"use client";

import { slideInVariant } from "@/utils/motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

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
            if (!selectedOptions.includes(e.target.value)) {
                setSelectedOptions([...selectedOptions, e.target.value]);
            }
        } else {
            // or remove the value from the unchecked checkbox from the array
            setSelectedOptions(
                selectedOptions.filter((option) => option !== e.target.value)
            );
        }
    };

    return (
        <motion.div
            className="relative"
            variants={slideInVariant("left", 0.15)}
            initial="hidden"
            animate="show"
            exit="exit"
        >
            <Popover>
                <PopoverTrigger className="w-full">
                    <div className="flex items-center justify-between border border-neutral-300 rounded-md px-2 py-1 text-sm w-full">
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
                </PopoverTrigger>

                <PopoverContent className="text-black bg-white max-h-60 w-80 sm:w-96 overflow-y-scroll py-1 px-2">
                    <ul className="w-full">
                        {options.map((option, i) => {
                            return (
                                <li key={i} className="w-full mt-1">
                                    <label
                                        className={`flex whitespace-nowrap cursor-pointer rounded-lg mb-1 px-1 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200`}
                                    >
                                        <input
                                            type="checkbox"
                                            name={i.toString()}
                                            value={options[i].name}
                                            className="cursor-pointer"
                                            onChange={handleChange}
                                            checked={selectedOptions.includes(
                                                option.name
                                            )}
                                        />
                                        <span className="ml-1">
                                            {option.name}
                                        </span>
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                </PopoverContent>
            </Popover>
        </motion.div>
    );
}
