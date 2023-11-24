/* eslint-disable @next/next/no-img-element */
"use client";
import { slideInVariant } from "@/utils/motion";
import {
    AcademicCapIcon,
    BookOpenIcon,
    CalendarDaysIcon,
    CalendarIcon,
    GlobeEuropeAfricaIcon,
    StarIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const features = [
    {
        name: "Interaktywne Lekcje",
        description:
            "Ucz się poprzez interaktywne lekcje, które angażują i dostosowują się do Twoich potrzeb edukacyjnych.",
        icon: AcademicCapIcon,
    },
    {
        name: "Kalendarz Zajęć.",
        description:
            "Łatwe planowanie dzięki kalendarzowi zajęć, który pomaga zarządzać harmonogramem lekcji.",
        icon: CalendarIcon,
    },
    {
        name: "Oceny i Recenzje.",
        description:
            "Dzięki funkcji ocen i recenzji dowiedz się, co inni myślą o nauczycielach i wybierz najlepsze lekcje dla siebie.",
        icon: StarIcon,
    },
    {
        name: "Prosty Proces Rezerwacji.",
        description:
            "Łatwa i szybka rezerwacja lekcji, umożliwiająca szybki dostęp do wybranej edukacji.",
        icon: CalendarDaysIcon,
    },
    {
        name: "Zpersonalizowane Zadania.",
        description:
            "Otrzymuj zadania dostosowane do Twoich umiejętności i postępów, aby maksymalizować efekty nauki.",
        icon: BookOpenIcon,
    },
    {
        name: "Globalna Społeczność.",
        description:
            "Dołącz do globalnej społeczności EduFlex, dziel się wiedzą i ucz się z nauczycielami z różnych zakątków świata. ",
        icon: GlobeEuropeAfricaIcon,
    },
];

export default function Features() {
    return (
        <div id="features" className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center">
                    <motion.h2
                        variants={slideInVariant("left", 0.2)}
                        initial="hidden"
                        whileInView="show"
                        exit="exit"
                        className="text-base font-semibold leading-7 text-green-600"
                    >
                        Wszystko czego potrzebujesz
                    </motion.h2>
                    <motion.p
                        variants={slideInVariant("left", 0.4)}
                        initial="hidden"
                        whileInView="show"
                        exit="exit"
                        className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                    >
                        Innowacyjne Funkcje Dla Doskonałej Edukacji
                    </motion.p>
                    <motion.p
                        variants={slideInVariant("left", 0.6)}
                        initial="hidden"
                        whileInView="show"
                        exit="exit"
                        className="mt-6 text-lg leading-8 text-gray-600"
                    >
                        Odkryj, jak EduFlex dostarcza wyjątkowe rozwiązania dla
                        efektywnej nauki online.
                    </motion.p>
                </div>
            </div>
            <div className="relative overflow-hidden pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <motion.img
                        variants={slideInVariant("bottom", 0.2)}
                        initial="hidden"
                        whileInView="show"
                        exit="exit"
                        src="./screenshot.png"
                        alt="App screenshot"
                        className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
                        width={2432}
                        height={1442}
                    />
                    <div className="relative" aria-hidden="true">
                        <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
                    </div>
                </div>
            </div>
            <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
                <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                    {features.map((feature, index) => (
                        <motion.div
                            variants={slideInVariant("bottom", 0.15 * index)}
                            initial="hidden"
                            whileInView="show"
                            exit="exit"
                            key={feature.name}
                            className="relative pl-9"
                        >
                            <dt className="inline font-semibold text-gray-900">
                                <feature.icon
                                    className="absolute left-1 top-1 h-5 w-5 text-green-600"
                                    aria-hidden="true"
                                />
                                {feature.name}
                            </dt>{" "}
                            <dd className="inline">{feature.description}</dd>
                        </motion.div>
                    ))}
                </dl>
            </div>
        </div>
    );
}
