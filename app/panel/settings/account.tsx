"use client";

import type { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useEdgeStore } from "@/lib/edgestore";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

async function handleUserChange(
    e: FormData,
    session: Session,
    setLoading: (loading: boolean) => void,
    edgestore: any,
    avatarFile: File | undefined
) {
    setLoading(true);
    let avatarUrl = "";

    if (session.user.avatar === "" && avatarFile !== undefined) {
        // upload the new avatar
        const res = await edgestore.profilePictures.upload({
            file: avatarFile,
        });

        avatarUrl = res.url;
    } else if (session.user.avatar !== "" && avatarFile !== undefined) {
        const res = await edgestore.profilePictures.upload({
            file: avatarFile,
            options: {
                replaceTargetUrl: session.user.avatar,
            },
        });

        avatarUrl = res.url;
    }

    if (
        session?.user?.firstName !== e.get("first-name") ||
        session?.user?.lastName !== e.get("last-name") ||
        session?.user?.email !== e.get("email") ||
        avatarUrl !== ""
    ) {
        const res = await fetch("/api/user", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: e.get("first-name"),
                lastName: e.get("last-name"),
                email: e.get("email"),
                avatar: avatarUrl,
                userId: session.user.id,
            }),
        });

        if (res.status === 200) {
            setLoading(false);
            toast.success(
                "Zaktualizowano informacje. Za chwilę zostaniesz wylogowany."
            );
            await new Promise((resolve) => setTimeout(resolve, 2500));
            signOut({
                callbackUrl: "/",
                redirect: true,
            });
        } else {
            setLoading(false);
            toast.error("Wystąpił błąd podczas aktualizacji informacji.");
        }
    } else {
        setLoading(false);
        toast.info("Nie zmieniono żadnych informacji.");
    }
}

type Props = {};

function NoSSRAccount({}: Props) {
    const { edgestore } = useEdgeStore();
    const { data: session } = useSession();
    const userAvatar = session?.user?.avatar!;
    const [avatarFile, setAvatarFile] = useState<File>();
    const [temporaryUploadUrl, setTemporaryUploadUrl] =
        useState<string>(userAvatar);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTemporaryUploadUrl(session?.user.avatar!);
    }, [session?.user.avatar]);

    return (
        <div className="divide-y divide-neutral-200">
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                    <h2 className="text-base font-semibold leading-7">
                        Informacje osobiste
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                        Użyj szkolnego adresu, aby otrzymywać powiadomienia.
                    </p>
                </div>

                <form
                    action={async (event: FormData) => {
                        await handleUserChange(
                            event,
                            session!,
                            setLoading,
                            edgestore,
                            avatarFile
                        );
                    }}
                    className="md:col-span-2"
                >
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                        <div className="col-span-full flex items-center gap-x-8">
                            <Image
                                width={256}
                                height={256}
                                src={temporaryUploadUrl}
                                alt=""
                                className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                            />
                            <div>
                                <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={(e) => {
                                        // add a constraint to accept only images that are smaller than 1MB
                                        if (
                                            e.target.files?.[0].size! > 1000000
                                        ) {
                                            toast.error(
                                                "Wybrany plik jest za duży. Maksymalny rozmiar to 1MB."
                                            );
                                            return;
                                        } else {
                                            setAvatarFile(e.target.files?.[0]);
                                            setTemporaryUploadUrl(
                                                URL.createObjectURL(
                                                    e.target.files?.[0]!
                                                )
                                            );
                                        }
                                    }}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="avatar"
                                    className="rounded-md bg-neutral-100 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-neutral-200 transition-colors duration-200 text-green-500 cursor-pointer"
                                >
                                    {/* show the file name and in (Zmień avatar) */}
                                    {avatarFile?.name
                                        ? avatarFile?.name + " (Wybierz zjęcie)"
                                        : "Wybierz zjęcie"}
                                </label>
                                <p className="mt-2 text-xs leading-5 text-gray-400">
                                    JPG, GIF lub PNG. 1MB max.
                                </p>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="first-name"
                                className="block text-sm font-medium leading-6"
                            >
                                Imię
                            </label>
                            <div className="mt-2">
                                <input
                                    defaultValue={session?.user?.firstName}
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 bg-neutral-100 py-1.5 shadow-sm ring-1 ring-inset ring-neutral-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 outline-none px-2"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="last-name"
                                className="block text-sm font-medium leading-6"
                            >
                                Nzawisko
                            </label>
                            <div className="mt-2">
                                <input
                                    defaultValue={session?.user?.lastName}
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 bg-neutral-100 py-1.5 shadow-sm ring-1 ring-inset ring-neutral-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 outline-none px-2"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6"
                            >
                                Adres email
                            </label>
                            <div className="mt-2">
                                <input
                                    defaultValue={session?.user?.email}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 bg-neutral-100 py-1.5 shadow-sm ring-1 ring-inset ring-neutral-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 outline-none px-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex">
                        <button
                            type="submit"
                            className={clsx(
                                loading
                                    ? "cursor-not-allowed bg-neutral-200 text-neutral-600"
                                    : "bg-green-200 text-green-600 hover:bg-green-300 transition-colors duration-200",
                                "rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 flex items-center"
                            )}
                        >
                            {loading && (
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            )}
                            {loading ? "Zapisywanie..." : "Zapisz"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                    <h2 className="text-base font-semibold leading-7">
                        Zaktualizuj hasło
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                        Zaktualizuj hasło powiązane z Twoim kontem.
                    </p>
                </div>

                <form className="md:col-span-2">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                        <div className="col-span-full">
                            <label
                                htmlFor="current-password"
                                className="block text-sm font-medium leading-6"
                            >
                                Aktualne hasło
                            </label>
                            <div className="mt-2">
                                <input
                                    id="current-password"
                                    name="current_password"
                                    type="password"
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 bg-neutral-100 py-1.5 shadow-sm ring-1 ring-inset ring-neutral-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 outline-none px-2"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="new-password"
                                className="block text-sm font-medium leading-6"
                            >
                                Nowe hasło
                            </label>
                            <div className="mt-2">
                                <input
                                    id="new-password"
                                    name="new_password"
                                    type="password"
                                    autoComplete="new-password"
                                    className="block w-full rounded-md border-0 bg-neutral-100 py-1.5 shadow-sm ring-1 ring-inset ring-neutral-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 outline-none px-2"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="confirm-password"
                                className="block text-sm font-medium leading-6"
                            >
                                Potwierdź nowe hasło
                            </label>
                            <div className="mt-2">
                                <input
                                    id="confirm-password"
                                    name="confirm_password"
                                    type="password"
                                    autoComplete="new-password"
                                    className="block w-full rounded-md border-0 bg-neutral-100 py-1.5 shadow-sm ring-1 ring-inset ring-neutral-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 outline-none px-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex">
                        <button
                            type="submit"
                            className="rounded-md bg-green-200 text-green-600 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-green-300 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                        >
                            Zapisz
                        </button>
                    </div>
                </form>
            </div>

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                    <h2 className="text-base font-semibold leading-7">
                        Usuń konto
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                        Czy na pewno chcesz usunąć swoje konto? Ta akcja jest
                        nieodwracalna. Wszystkie informacje związane z tym
                        kontem zostaną trwale usunięte.
                    </p>
                </div>

                <form className="flex items-start md:col-span-2">
                    <button
                        type="submit"
                        className="rounded-md bg-red-200 text-red-600 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-red-300/80 transition-colors duration-200"
                    >
                        Tak, usuń moje konto
                    </button>
                </form>
            </div>
        </div>
    );
}

const Account = dynamic(() => Promise.resolve(NoSSRAccount), {
    ssr: false,
});

export default Account;
