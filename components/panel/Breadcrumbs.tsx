import clsx from "clsx";
import { motion } from "framer-motion";

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
        <nav className="w-5/6 lg:w-1/2 lg:mb-0 mb-4" aria-label="Breadcrumb">
            <div aria-hidden="true">
                <div
                    className={`hidden ${
                        items.length > 2 ? "grid-cols-4" : "grid-cols-2"
                    } text-sm font-medium text-gray-600 sm:grid`}
                >
                    {items.length > 2 &&
                        items.map((item, itemIndex) => (
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
                    {items.length === 2 && (
                        <>
                            <div
                                className={clsx(
                                    "flex items-center gap-1 md:gap-2",
                                    index === 0
                                        ? "text-green-500 hover:text-green-600"
                                        : "text-gray-500 hover:text-gray-600",
                                    "justify-start"
                                )}
                            >
                                <p className="whitespace-nowrap">{items[0]}</p>
                            </div>
                            <div
                                className={clsx(
                                    "flex items-center gap-1 md:gap-2",
                                    index === 1
                                        ? "text-green-500 hover:text-green-600"
                                        : "text-gray-500 hover:text-gray-600",
                                    "justify-end"
                                )}
                            >
                                <p className="whitespace-nowrap">{items[1]}</p>
                            </div>
                        </>
                    )}
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
