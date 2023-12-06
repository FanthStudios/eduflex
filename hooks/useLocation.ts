import { useEffect, useState } from "react";
import type { Location } from "@/hooks/useAppointments";

export function useLocation() {
    const [locations, setLocations] = useState<Location[] | null>(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await fetch("/api/locations");
                const data = await res.json();

                setLocations(data.locations);
            } catch (error) {
                console.log(error);
            }
        };

        fetchLocations();
    }, []);

    return { locations };
}
