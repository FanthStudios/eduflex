"use client";

import { slideInVariant } from "@/utils/motion";
import { motion } from "framer-motion";

/* eslint-disable @next/next/no-img-element */
const featuredTestimonial = {
    body: "Pracuję z EduFlex od pewnego czasu i jestem pod wrażeniem. Platforma ta zapewnia świetne doświadczenie zarówno dla uczniów, jak i nauczycieli. Jestem dumny, że mogę być częścią społeczności EduFlex.",
    author: {
        name: "Brenna Goyette",
        handle: "brennagoyette",
        imageUrl: "https://randomuser.me/api/portraits/women/0.jpg",
        logoUrl: "https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg",
    },
};
const testimonials = [
    [
        [
            {
                body: "Pracuję z EduFlex od pewnego czasu i jestem zachwycona. To niesamowite miejsce dla uczniów i nauczycieli. Platforma ułatwia zarządzanie lekcjami i umożliwia swobodną komunikację.",
                author: {
                    name: "Leslie Alexander",
                    handle: "lesliealexander",
                    imageUrl:
                        "https://randomuser.me/api/portraits/women/44.jpg",
                },
            },
            // More testimonials...
        ],
        [
            {
                body: "EduFlex to rewolucja w nauce! Dzięki tej platformie uczniowie i nauczyciele mogą czerpać korzyści z nowych możliwości. Jestem zachwycony, że mogę być częścią tej inspirującej społeczności.",
                author: {
                    name: "Lindsay Walton",
                    handle: "lindsaywalton",
                    imageUrl:
                        "https://randomuser.me/api/portraits/women/19.jpg",
                },
            },
            // More testimonials...
        ],
    ],
    [
        [
            {
                body: "EduFlex to rewolucja w nauce! Platforma oferuje nieograniczone możliwości dla uczniów i nauczycieli. Jestem podekscytowany, że mogę być częścią tego projektu.",
                author: {
                    name: "Tom Cook",
                    handle: "tomcook",
                    imageUrl: "https://randomuser.me/api/portraits/men/34.jpg",
                },
            },
            // More testimonials...
        ],
        [
            {
                body: "EduFlex to niezawodne wsparcie w nauce! Dzięki platformie, uczniowie i nauczyciele mogą doświadczyć wyjątkowych korzyści. Jestem dumny, że mogę być częścią tej wspaniałej społeczności.",
                author: {
                    name: "Leonard Krasner",
                    handle: "leonardkrasner",
                    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
                },
            },
            // More testimonials...
        ],
    ],
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Testimonials() {
    return (
        <div
            id="testimonials"
            style={{ overflow: "hidden" }}
            className="relative isolate bg-white pb-32 pt-24 sm:pt-32"
        >
            <div
                className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
                aria-hidden="true"
            >
                <div
                    className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#91e84a] to-[#00fe3f]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>
            <div
                className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
                aria-hidden="true"
            >
                <div
                    className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#91e84a] to-[#00fe3f] xl:ml-0 xl:mr-[calc(50%-12rem)]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-xl text-center">
                    <motion.h2
                        variants={slideInVariant("left", 0.4)}
                        initial="hidden"
                        whileInView="show"
                        exit="exit"
                        className="text-lg font-semibold leading-8 tracking-tight text-green-600"
                    >
                        Referencje
                    </motion.h2>
                    <motion.p
                        variants={slideInVariant("left", 0.6)}
                        initial="hidden"
                        whileInView="show"
                        exit="exit"
                        className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                    >
                        Współpracowaliśmy z tysiącami niesamowitych ludzi
                    </motion.p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
                    <motion.figure
                        variants={slideInVariant("top", 0.2)}
                        initial="hidden"
                        whileInView="show"
                        exit="exit"
                        className="col-span-2 hidden sm:block sm:rounded-2xl sm:bg-white sm:shadow-lg sm:ring-1 sm:ring-gray-900/5 xl:col-start-2 xl:row-end-1"
                    >
                        <blockquote className="p-12 text-xl font-semibold leading-8 tracking-tight text-gray-900">
                            <p>{`“${featuredTestimonial.body}”`}</p>
                        </blockquote>
                        <figcaption className="flex items-center gap-x-4 border-t border-gray-900/10 px-6 py-4">
                            <img
                                className="h-10 w-10 flex-none rounded-full bg-gray-50"
                                src={featuredTestimonial.author.imageUrl}
                                alt=""
                            />
                            <div className="flex-auto">
                                <div className="font-semibold">
                                    {featuredTestimonial.author.name}
                                </div>
                                <div className="text-gray-600">{`@${featuredTestimonial.author.handle}`}</div>
                            </div>
                            <img
                                className="h-10 w-auto flex-none"
                                src={featuredTestimonial.author.logoUrl}
                                alt=""
                            />
                        </figcaption>
                    </motion.figure>
                    {testimonials.map((columnGroup, columnGroupIdx) => (
                        <div
                            key={columnGroupIdx}
                            className="space-y-8 xl:contents xl:space-y-0"
                        >
                            {columnGroup.map((column, columnIdx) => (
                                <div
                                    key={columnIdx}
                                    className={classNames(
                                        (columnGroupIdx === 0 &&
                                            columnIdx === 0) ||
                                            (columnGroupIdx ===
                                                testimonials.length - 1 &&
                                                columnIdx ===
                                                    columnGroup.length - 1)
                                            ? "xl:row-span-2"
                                            : "xl:row-start-1",
                                        "space-y-8"
                                    )}
                                >
                                    {column.map((testimonial) => (
                                        <motion.figure
                                            variants={slideInVariant(
                                                "top",
                                                0.15 * (columnIdx + 1)
                                            )}
                                            initial="hidden"
                                            whileInView="show"
                                            exit="exit"
                                            key={testimonial.author.handle}
                                            className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                                        >
                                            <blockquote className="text-gray-900">
                                                <p>{`“${testimonial.body}”`}</p>
                                            </blockquote>
                                            <figcaption className="mt-6 flex items-center gap-x-4">
                                                <img
                                                    className="h-10 w-10 rounded-full bg-gray-50"
                                                    src={
                                                        testimonial.author
                                                            .imageUrl
                                                    }
                                                    alt=""
                                                />
                                                <div>
                                                    <div className="font-semibold">
                                                        {
                                                            testimonial.author
                                                                .name
                                                        }
                                                    </div>
                                                    <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
                                                </div>
                                            </figcaption>
                                        </motion.figure>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
