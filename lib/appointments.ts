import type { Appointment } from "@/hooks/useAppointments";

export function sortAppointments(
    appointments: any[],
    getDate: (appointment: any) => Date
) {
    let upcoming: Appointment[] = [];
    let thisWeek: Appointment[] = [];
    let past: Appointment[] = [];

    const today = new Date();
    const daysUntilEndOfWeek = today.getDay() === 0 ? 0 : 7 - today.getDay();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + daysUntilEndOfWeek + 1);

    appointments.forEach((appointment) => {
        const appointmentDate = getDate(appointment);
        if (appointmentDate.getTime() < today.getTime()) {
            past.push(appointment);
        } else if (appointmentDate.getTime() < nextWeek.getTime()) {
            thisWeek.push(appointment);
        } else {
            upcoming.push(appointment);
        }
    });

    return { past, thisWeek, upcoming };
}
