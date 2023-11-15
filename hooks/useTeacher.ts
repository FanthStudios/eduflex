import { useEffect, useState } from "react";

interface Teacher {
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
    };
}

export function useTeacher(userId?: number) {
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            const res = await fetch(`/api/teachers`);

            const data = await res.json();
            setTeachers(data);
        };

        fetchTeachers();
    }, []);

    return {
        teachers,
    };
}
