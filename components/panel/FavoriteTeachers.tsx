"use client";

import { useTeacher } from "@/hooks/useTeacher";
import { useSession } from "next-auth/react";
import Avatar from "../Avatar";
import Link from "next/link";
import clsx from "clsx";

type Props = {};

export default function FavoriteTeachers({}: Props) {
    const { data: session } = useSession();
    const { teachers } = useTeacher();

    const filteredTeachers = teachers.filter((teacher) => {
        return teacher.favoritedBy?.find(
            (favoritedBy) =>
                favoritedBy.userId === parseInt(session?.user?.id as string)
        );
    });
    return (
        <div
            className={clsx(
                "w-full 2xl:w-1/3 xl:pl-6",
                session?.user.role == "STUDENT" ? "block" : "hidden"
            )}
        >
            <div
                className={`flex flex-col items-start justify-center w-full gap-2`}
            >
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                    Ulubieni nauczyciele
                </h3>
                {filteredTeachers.length > 0 ? (
                    <ul className="w-full flex flex-col items-start justify-start gap-2">
                        {filteredTeachers.map((teacher) => (
                            <li
                                key={teacher.userId}
                                className="w-full flex flex-row items-center justify-between xl:justify-start shadow border-t gap-2 2xl:gap-4 h-[7.5rem] border-neutral-100 py-2 px-3 rounded-lg"
                            >
                                {teacher.user.avatar ? (
                                    <Avatar
                                        src={teacher.user.avatar}
                                        letter={teacher.user.firstName.charAt(
                                            0
                                        )}
                                        width={12}
                                        className="flex-shrink-0"
                                    />
                                ) : (
                                    <Avatar
                                        letter={teacher.user.firstName.charAt(
                                            0
                                        )}
                                        width={12}
                                        className="flex-shrink-0"
                                    />
                                )}
                                <div className="flex flex-col gap-2 items-start justify-center flex-grow">
                                    <span className="text-sm font-medium text-gray-900">
                                        {teacher.user.firstName}{" "}
                                        {teacher.user.lastName}
                                    </span>
                                    <span className="text-xs font-medium text-gray-500">
                                        {teacher.subjects.map(
                                            (subject, index) => {
                                                if (
                                                    index ===
                                                    teacher.subjects.length - 1
                                                ) {
                                                    return subject.name;
                                                } else {
                                                    return subject.name + ", ";
                                                }
                                            }
                                        )}
                                    </span>
                                </div>
                                <button
                                    disabled
                                    className="bg-green-500 disabled:bg-neutral-200 disabled:cursor-not-allowed rounded-lg py-1 px-4 text-white flex-grow-0"
                                >
                                    Umów się
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-sm font-medium text-gray-900">
                        <h5 className="text-lg">
                            Nie masz ulubionych nauczycieli 😔
                        </h5>
                        <br />
                        Dodaj ich w zakładce{" "}
                        <Link
                            className="text-green-600"
                            href={"/panel/teachers"}
                        >
                            Nauczyciele
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
