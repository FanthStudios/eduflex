"use client";

import ListCard from "@/components/panel/ListCard";
import { useTeacher } from "@/hooks/useTeacher";
import { toast } from "react-toastify";

type Props = {};

export default function Teachers({}: Props) {
    const { teachers, setTeachers } = useTeacher(true);

    async function handleDeleteUser(userId: string) {
        const res = await fetch(`/api/teachers`, {
            method: "DELETE",
            body: JSON.stringify({ teacherId: userId }),
        });

        if (res.status === 200) {
            toast.success("Nauczyciel został usunięty");
            setTeachers(teachers.filter((s) => s.userId !== parseInt(userId)));
        } else {
            toast.error("Nie udało się usunąć nauczyciela");
            console.log(await res.json());
        }
    }

    return (
        <div className="flex flex-col items-start justify-start w-full h-full gap-5 col-span-3 row-span-2">
            <h1 className="text-lg font-medium xl:text-xl">
                Lista nauczycieli
            </h1>
            <ul role="list" className="divide-y divide-gray-100 w-full">
                {teachers.map((teacher) => (
                    <ListCard
                        key={teacher.userId}
                        teacher={teacher}
                        onClick={async (userId: string) =>
                            await handleDeleteUser(userId)
                        }
                    />
                ))}
            </ul>
        </div>
    );
}
