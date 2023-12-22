import { useEffect, useState } from "react";
import { Teacher } from "@/hooks/useTeacher";
import { Appointment } from "./useAppointments";

export interface Notification {
    id: number;
    userId: number;
    type: string;
    message: string;
    read: boolean;
    createdAt: Date;
}

export function useNotification(userId?: string) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<
        { stack?: string; message?: string } | undefined
    >(undefined);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await fetch(`/api/notifications`, {
                    method: "POST",
                    body: JSON.stringify({ userId }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    cache: "force-cache",
                    next: {
                        revalidate: 3600,
                    },
                });

                const data = await res.json();
                setNotifications(data);
                setLoading(false);
            } catch (error: any) {
                console.log(error);
                setError(error);
                setLoading(false);
            }
        };

        fetchStudents();
    }, [userId]);

    return {
        setNotifications,
        notifications,
        loading,
        error,
    };
}
