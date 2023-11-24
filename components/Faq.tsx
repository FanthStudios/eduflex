"use client";

import { Disclosure, Transition } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
    {
        question: "Jak mogę zarezerwować lekcję prywatną?",
        answer: "Aby zarezerwować lekcję prywatną, musisz najpierw zalogować się na swoje konto. Następnie przejdź do panelu ucznia i kliknij na 'Korepetycje'. Wybierz przedmiot i nauczyciela, którego chcesz się pouczyć, wybierz datę i godzinę lekcji, a następnie podaj swój cel. Kliknij na 'Zarezerwuj', aby potwierdzić swoją rezerwację.",
    },
    {
        question: "Jak mogę wyświetlić korepetycje na które się umówiłem?",
        answer: "Możesz wyświetlić swoje rezerwacje, przechodząc do panelu studenta i klikając na 'Moje korepetycje'. Zostaniesz przekierowany do strony, na której zobaczysz listę wszystkich swoich rezerwowanych lekcji.",
    },
    {
        question: "Jak mogę anulować moją obecność na korepetycjach?",
        answer: "Aby anulować obecność, przejdź do panelu ucznia i kliknij na 'Moje korepetycje'. Znajdź korepetycje, którą chcesz anulować, a następnie kliknij na '...' i 'Anuluj'.",
    },
    {
        question: "Jak mogę utworzyć korepetycje?",
        answer: "Aby utworzyć korepetycje, musisz najpierw zalogować się na swoje konto. Następnie przejdź do panelu nauczyciela i kliknij na 'Dodaj korepetycje'. Wypełnij szczegóły korepetycji, takie jak data, godzina i temat, a następnie kliknij na 'Utwórz'.",
    },
    {
        question: "Jak mogę wyświetlić moje korepetycje?",
        answer: "Możesz wyświetlić swoje korepetycje, przechodząc do panelu nauczyciela kliknąć na 'Strona główna', zobaczysz tam kalendarz gdzie mozesz wybrac interesujący cie dzień lub kliknąć na 'Moje korepetycje', po przekierowaniu do strony, zobaczysz listę wszystkich swoich utworzonych korepetycji.",
    },
    {
        question: "Jak mogę usunąć moje korepetycje?",
        answer: "Aby usunąć korepetycje, przejdź do panelu nauczyciela i kliknij na 'Moje korepetycje'. Znajdź korepetycje, którą chcesz usunąć, a następnie kliknij na '...' i 'Usuń'. Drugą opcją jest w zakładce 'Strona główna' wybrać dzień, a następnie wybrać po lewej interesujące cie korepetycje, kliknąć na '...' i 'Usuń'.",
    },
];

export default function Faq() {
    return (
        <div
            id="faq"
            className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-8 lg:py-32"
        >
            <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
                    Najczęściej zadawane pytania
                </h2>
                <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                    {faqs.map((faq) => (
                        <Disclosure
                            as="div"
                            key={faq.question}
                            className="pt-6"
                        >
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                        <span className="text-base font-semibold leading-7">
                                            {faq.question}
                                        </span>
                                        <span className="ml-6 flex h-7 items-center">
                                            {open ? (
                                                <MinusSmallIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <PlusSmallIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </span>
                                    </Disclosure.Button>
                                    <Transition
                                        show={open}
                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                    >
                                        <Disclosure.Panel
                                            static
                                            className="mt-2 pr-12"
                                        >
                                            <p className="text-base leading-7 text-gray-600">
                                                {faq.answer}
                                            </p>
                                        </Disclosure.Panel>
                                    </Transition>
                                </>
                            )}
                        </Disclosure>
                    ))}
                </dl>
            </div>
        </div>
    );
}
