import { useEffect, useState } from "react";
import { Appointment } from "./useAppointments";
import { Teacher } from "./useTeacher";

export interface Subject {
    id: number;
    name: string;
    appointments: Appointment[];
    teachers: Teacher[];
}

export function useSubjects() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSubjects = async () => {
            if (!loading && subjects.length === 0) {
                setLoading(true);
                try {
                    const res = await fetch(`/api/subjects`, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    const data = await res.json();
                    setSubjects(data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchSubjects();
    }, [loading, subjects]);

    return {
        loading,
        subjects,
        setSubjects,
    };
}
