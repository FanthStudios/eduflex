import { useEffect, useState } from "react";

export interface Teacher {
    subjects: {
        id: number;
        name: string;
    }[];
    userId: number;
    user: {
        email: string;
        firstName: string;
        id: number;
        lastName: string;
        password: string;
        role: string;
        lastLogin?: Date;
    };
    appointments?: any[];
}

export function useTeacher(withAppoinments?: boolean, userId?: number) {
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            const res = await fetch(`/api/teachers`, {
                method: "POST",
                body: JSON.stringify({ withAppoinments }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            setTeachers(data);
        };

        fetchTeachers();
    }, [withAppoinments]);

    return {
        teachers,
    };
}
