import Modal from "@/components/Modal";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

type Props = {
    codes: {
        value: string;
        date: Date;
        user?: {
            email: string;
        };
    }[];
    setCodes: Dispatch<
        SetStateAction<
            {
                value: string;
                date: Date;
                user?: {
                    email: string;
                };
            }[]
        >
    >;
};

function Table({ codes, setCodes }: Props) {
    async function deleteCode(code: string) {
        const res = await fetch("/api/accessCodes", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code,
            }),
        });

        if (res.status === 200) {
            setCodes((codes) => codes.filter((c) => c.value !== code));
            toast.success("Usunięto kod aktywacyjny");
        } else {
            toast.error("Nie udało się usunąć kodu aktywacyjnego");
        }
    }

    async function createCodes(count: number) {
        const res = await fetch("/api/accessCodes", {
            method: "POST",
            body: JSON.stringify({
                count,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.status === 200) {
            const newCodes = await res.json();
            setCodes((codes) => [...codes, ...newCodes]);
            toast.success("Wygenerowano nowe kody aktywacyjne");
        } else {
            toast.error("Nie udało się wygenerować nowych kodów aktywacyjnych");
        }
    }

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="mt-8 flow-root w-5/6 self-center">
            <Modal isOpen={modalOpen} closeModal={() => {}}>
                <Modal.Title align="center">
                    <h1 className="text-lg font-medium xl:text-xl">
                        Wygeneruj nowe kody aktywacyjne
                    </h1>
                </Modal.Title>
                <div className="flex flex-col items-start justify-center gap-3 xl:w-5/6 w-full">
                    <label htmlFor="count">Ilość kodów</label>
                    <input
                        type="number"
                        name="count"
                        id="count"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg shadow-sm focus:ring-neutral-500 focus:border-neutral-500 sm:text-sm"
                        placeholder="Ilość kodów"
                        min={1}
                        max={100}
                    />
                </div>
                <Modal.Footer>
                    <button
                        onClick={() => setModalOpen(false)}
                        className="bg-red-500 py-1 px-3 rounded-lg text-white hover:bg-red-400 transition-colors duration-150"
                    >
                        Anuluj
                    </button>
                    <button
                        onClick={() => setModalOpen(false)}
                        className="bg-green-500 py-1 px-3 rounded-lg text-white hover:bg-green-400 transition-colors duration-150"
                    >
                        Generuj
                    </button>
                </Modal.Footer>
            </Modal>
            <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle">
                    <table className="min-w-full border-separate border-spacing-0">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 border-b border-neutral-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-neutral-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                                >
                                    Kod
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 hidden border-b border-neutral-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-neutral-900 backdrop-blur backdrop-filter lg:table-cell"
                                >
                                    Data wynegerowania
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 border-b border-neutral-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-neutral-900 backdrop-blur backdrop-filter table-cell"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 border-b border-neutral-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-neutral-900 backdrop-blur backdrop-filter hidden lg:table-cell"
                                >
                                    Konto
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 border-b border-neutral-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-neutral-900 backdrop-blur backdrop-filter"
                                >
                                    <span className="sr-only">Usuń</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {codes.map((code, codeIdx) => (
                                <Row
                                    key={codeIdx}
                                    code={code}
                                    codeIdx={codeIdx}
                                    deleteCode={deleteCode}
                                    codes={codes}
                                />
                            ))}
                            <Row
                                createNew={true}
                                codes={codes}
                                openModal={() => setModalOpen(true)}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

type RowProps = {
    code?: {
        value: string;
        date: Date;
        user?: {
            email: string;
        };
    };
    codeIdx?: number;
    deleteCode?: (code: string) => Promise<void>;
    openModal?: () => void;
    codes: {
        value: string;
        date: Date;
        user?: {
            email: string;
        };
    }[];
    createNew?: boolean;
};

function Row({
    code,
    codeIdx,
    deleteCode,
    codes,
    createNew,
    openModal,
}: RowProps) {
    return (
        <tr>
            <td
                className={clsx(
                    codeIdx !== codes.length
                        ? "border-b border-neutral-200"
                        : "",
                    "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-neutral-900 sm:pl-6 lg:pl-8"
                )}
            >
                {createNew ? "" : code && code.value}
            </td>
            <td
                className={clsx(
                    codeIdx !== codes.length
                        ? "border-b border-neutral-200"
                        : "",
                    "whitespace-nowrap hidden px-3 py-4 text-sm text-neutral-500 sm:table-cell"
                )}
            >
                {createNew ? "" : code && code.date.toLocaleDateString()}
            </td>
            <td
                className={clsx(
                    codeIdx !== codes.length
                        ? "border-b border-neutral-200"
                        : "",
                    "whitespace-nowrap px-3 py-4 text-sm text-neutral-500 table-cell"
                )}
            >
                {createNew
                    ? ""
                    : code && (
                          <Status status={code.user ? "active" : "inactive"} />
                      )}
            </td>
            <td
                className={clsx(
                    codeIdx !== codes.length
                        ? "border-b border-neutral-200"
                        : "",
                    "whitespace-nowrap px-3 hidden py-4 text-sm text-neutral-500 lg:table-cell"
                )}
            >
                {createNew ? "" : code && code.user ? code.user.email : "Brak"}
            </td>
            <td
                className={clsx(
                    codeIdx !== codes.length
                        ? "border-b border-neutral-200"
                        : "",
                    "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8"
                )}
            >
                {createNew && openModal ? (
                    <button
                        onClick={() => openModal()}
                        className="bg-green-500 py-1 px-3 rounded-lg text-white hover:bg-green-400 transition-colors duration-150"
                    >
                        Wygeneruj
                    </button>
                ) : (
                    deleteCode &&
                    code && (
                        <button
                            onClick={async () => await deleteCode(code.value)}
                            className="text-red-600 hover:text-red-700"
                        >
                            Usuń
                        </button>
                    )
                )}
            </td>
        </tr>
    );
}

function Status({ status }: { status: "active" | "inactive" }) {
    return (
        <span
            className={clsx(
                status === "active"
                    ? "text-green-800 border-green-400 bg-green-100"
                    : "text-red-800 border-red-400 bg-red-100",
                "inline-flex items-center px-2 py-0.5 border rounded-md text-xs font-medium capitalize"
            )}
        >
            {status == "active" ? "Aktywny" : "Nieaktywny"}
        </span>
    );
}

export default Table;
