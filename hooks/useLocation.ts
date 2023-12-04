import { useEffect, useState } from "react";
import type { Location } from "@/hooks/useAppointments";

export function useLocation() {
    const [locations, setLocations] = useState<Location[] | null>(null);

    useEffect(() => {
        fetch("/api/locations")
            .then((res) => res.json())
            .then((data) => setLocations(data));
    }, []);

    return { locations };
}
