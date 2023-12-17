import { useEffect, useState } from "react";
import { Student } from "./useStudent";

export interface Class {
    id: number;
    name: string;
    students: Student[];
}

export function useClasses() {
    const [classes, setClasses] = useState<Class[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchclasses = async () => {
            if (!loading && classes.length === 0) {
                setLoading(true);
                try {
                    const res = await fetch(`/api/classes`, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    const data = await res.json();
                    setClasses(data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchclasses();
    }, [loading, classes]);

    return {
        loading,
        classes,
        setClasses,
    };
}
