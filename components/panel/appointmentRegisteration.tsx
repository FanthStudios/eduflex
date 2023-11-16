import { useAppointments } from "@/hooks/useAppointments";
import { useTeacher } from "@/hooks/useTeacher";
import { use, useEffect } from "react";
import AppointmentCard from "./AppointmentCard";

type Appointment = {
    subject: string;
    teacherId: number;
    dateTime: Date;
    goal: string;
};

interface Props {
    appointment: Appointment;
    setAppointment: (arg: Appointment) => void;
}

const options = [
    { id: 1, name: "Matematyka" },
    { id: 2, name: "Fizyka" },
    { id: 3, name: "Chemia" },
    { id: 4, name: "Biologia" },
    { id: 5, name: "Geografia" },
    { id: 6, name: "Historia" },
    { id: 7, name: "Wiedza o społeczeństwie" },
    { id: 8, name: "Język polski" },
    { id: 9, name: "Język angielski" },
    { id: 10, name: "Język niemiecki" },
    { id: 13, name: "Język rosyjski" },
    { id: 17, name: "Informatyka" },
    { id: 18, name: "Wychowanie fizyczne" },
    { id: 19, name: "Edukacja dla bezpieczeństwa" },
    { id: 21, name: "Religia" },
];

export const SubjectSelection = ({ appointment, setAppointment }: Props) => {
    const { teachers } = useTeacher();
    const filteredTeachers =
        appointment.subject != "" &&
        teachers?.filter((teacher) =>
            teacher.subjects?.some(
                (subject) => subject.name == appointment.subject
            )
        );

    useEffect(() => {
        // when a subject is changed, set the teacherId to the first teacher that teaches that subject
        if (
            filteredTeachers &&
            filteredTeachers.length > 0 &&
            appointment.teacherId == 0
        ) {
            setAppointment({
                ...appointment,
                teacherId: filteredTeachers[0].userId,
            });
        }
    }, [appointment, filteredTeachers, setAppointment]);

    return (
        <div className="flex flex-col items-center justify-start w-full h-full lg:h-3/4 md:p-3 xl:p-10 gap-3">
            <h1 className="text-xl lg:text-2xl">
                Wybierz przedmiot i nauczyciela
            </h1>
            <div className="md:w-1/3 w-full">
                <label
                    htmlFor="subject"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Przedmiot
                </label>
                <select
                    id="subject"
                    name="subject"
                    required
                    onChange={(e) => {
                        setAppointment({
                            ...appointment,
                            subject: e.target.value,
                        });
                    }}
                    style={{
                        fontSize: "1rem",
                    }}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-inset focus:outline-none focus:ring-green-600 sm:text-sm sm:leading-6"
                >
                    {options.map((option) => (
                        <option
                            className="text-lg"
                            key={option.id}
                            value={option.name}
                        >
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="md:w-1/3 w-full">
                <label
                    htmlFor="teacher"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Nauczyciel
                </label>
                <select
                    id="teacher"
                    name="teacher"
                    required
                    onChange={(e) => {
                        setAppointment({
                            ...appointment,
                            teacherId: parseInt(e.target.value),
                        });
                    }}
                    style={{
                        fontSize: "1rem",
                    }}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-inset focus:outline-none focus:ring-green-600 sm:text-sm sm:leading-6"
                >
                    {filteredTeachers ? (
                        filteredTeachers?.map((option: any) => (
                            <option
                                className="text-lg"
                                key={option.userId}
                                value={option.userId}
                                onClick={(e) => {
                                    setAppointment({
                                        ...appointment,
                                        teacherId: parseInt(
                                            (e.target as HTMLInputElement).value
                                        ),
                                    });
                                }}
                            >
                                {option.user.firstName} {option.user.lastName}
                            </option>
                        ))
                    ) : (
                        <option value={0} disabled>
                            Brak nauczyciela
                        </option>
                    )}
                </select>
            </div>
        </div>
    );
};

export const DateAndTimeSelection = ({
    appointment,
    setAppointment,
}: Props) => {
    const { appointments } = useAppointments();
    const filteredAppointments =
        appointments &&
        appointments.filter(
            (app) =>
                app.teacherId == appointment.teacherId &&
                app.subject.name == appointment.subject
        );
    return (
        <div className="flex flex-col items-center justify-start w-full h-full lg:h-3/4 md:p-3 xl:p-10 gap-3">
            <h1 className="text-xl lg:text-2xl">
                Wybierz odpowiadający ci termin
            </h1>
            {filteredAppointments &&
                filteredAppointments.length > 0 &&
                filteredAppointments.map((app) => (
                    <AppointmentCard key={app.id} appointment={app} />
                ))}
        </div>
    );
};

export const GoalSelection = ({ appointment, setAppointment }: Props) => {
    return (
        <div className="flex flex-col items-center justify-start w-full h-full lg:h-3/4 md:p-3 xl:p-10 gap-3">
            <h1 className="text-xl lg:text-2xl">Podaj cel korepetycji</h1>
        </div>
    );
};

export const Summary = ({ appointment, setAppointment }: Props) => {
    return (
        <div className="flex flex-col items-center justify-start w-full h-full lg:h-3/4 md:p-3 xl:p-10 gap-3">
            <h1 className="text-xl lg:text-2xl">Podsumowanie</h1>
        </div>
    );
};
