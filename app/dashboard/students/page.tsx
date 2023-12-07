"use client";

import ListCard from "@/components/panel/ListCard";
import { useStudent } from "@/hooks/useStudent";

type Props = {};

export default function Students({}: Props) {
    const { students } = useStudent();

    async function handleUserDelete(userId: string) {
        console.log("Delete user", userId);
    }

    return (
        <div className="flex flex-col items-start justify-start w-full h-full gap-5 col-span-3 row-span-2">
            <h1 className="text-lg font-medium xl:text-xl">Lista uczniów</h1>
            <ul role="list" className="divide-y divide-gray-100 w-full">
                {students.map((student) => (
                    <ListCard
                        key={student.userId}
                        student={student}
                        onClick={async (userId) =>
                            await handleUserDelete(userId)
                        }
                    />
                ))}
            </ul>
        </div>
    );
}
