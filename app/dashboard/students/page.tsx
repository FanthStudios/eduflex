"use client";

import ListCard from "@/components/panel/ListCard";
import { useStudent } from "@/hooks/useStudent";
import { toast } from "react-toastify";

type Props = {};

export default function Students({}: Props) {
    const { students, setStudents } = useStudent();

    async function handleUserDelete(userId: string) {
        const res = await fetch(`/api/students`, {
            method: "DELETE",
            body: JSON.stringify({ id: userId }),
        });

        if (res.status === 200) {
            toast.success("Uczeń został usunięty");
            setStudents(students.filter((s) => s.userId !== parseInt(userId)));
        } else {
            toast.error("Nie udało się usunąć ucznia");
        }
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
