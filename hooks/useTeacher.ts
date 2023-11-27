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
    favoritedBy?: {
        userId: number;
        classId: number;
    }[];
}

export function useTeacher(withAppoinments?: boolean, userId?: string) {
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            const res = await fetch(`/api/teachers`, {
                method: "POST",
                body: JSON.stringify({ withAppoinments, userId }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            setTeachers(data);
        };

        fetchTeachers();
    }, [withAppoinments, userId]);

    return {
        teachers,
        teacher: teachers[0],
    };
}
