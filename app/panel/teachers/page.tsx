"use client";

import ListCard from "@/components/panel/ListCard";
import { useTeacher } from "@/hooks/useTeacher";

type Props = {};

export default function Teachers({}: Props) {
    const { teachers } = useTeacher(true);
    return (
        <div className="flex flex-col items-start justify-start w-full h-full gap-5 col-span-3 row-span-2">
            <h1 className="text-lg font-medium xl:text-xl">
                Lista nauczycieli
            </h1>
            <ul role="list" className="divide-y divide-gray-100 w-full">
                {teachers.map((teacher) => (
                    <ListCard key={teacher.userId} teacher={teacher} />
                ))}
            </ul>
        </div>
    );
}
