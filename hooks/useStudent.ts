import { useEffect, useState } from "react";
import { Teacher } from "@/hooks/useTeacher";

export interface Student {
    userId: number;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
        password: string;
        lastLogin: Date;
    };
    classId: number;
    studentsClass: {
        id: number;
        name: string;
    };
    appointments: any[];
    favoriteTeachers: Teacher[];
}

export function useStudent() {
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            const res = await fetch(`/api/students`);

            const data = await res.json();
            setStudents(data);
        };

        fetchTeachers();
    }, []);

    return {
        students,
    };
}
