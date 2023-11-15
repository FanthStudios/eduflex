import { useEffect, useState } from "react";

export function useTeacher(userId?: number) {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            const res = await fetch(`/api/teachers`);

            const data = await res.json();
            setTeachers(data);
        };

        fetchTeachers();
    }, [userId]);

    return {
        teachers,
    };
}
