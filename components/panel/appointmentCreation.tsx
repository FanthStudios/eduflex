import { useTeacher } from "@/hooks/useTeacher";
import { useEffect } from "react";

type Appointment = {
    subject: string;
    teacherId: number;
    date: string;
    time: string;
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
        teachers.filter((teacher: any) => {
            return teacher.subjects.filter((subject: any) => {
                return subject.name === appointment.subject;
            });
        });
    return (
        <div className="flex flex-col items-start justify-start w-full h-5/6 md:p-3 gap-3">
            <h1 className="text-xl lg:text-2xl">
                Wybierz przedmiot i nauczyciela
            </h1>
            <div className="md:w-1/3 w-full">
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
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-inset focus:outline-none focus:ring-green-600 sm:text-sm sm:leading-6"
                >
                    {options.map((option) => (
                        <option key={option.id} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="md:w-1/3 w-full">
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
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-inset focus:outline-none focus:ring-green-600 sm:text-sm sm:leading-6"
                >
                    {filteredTeachers ? (
                        filteredTeachers?.map((option: any) => (
                            <option key={option.user.id} value={option.user.id}>
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
    return <div className="w-full h-5/6 md:p-3">DateAndTimeSelection</div>;
};

export const GoalSelection = ({ appointment, setAppointment }: Props) => {
    return <div className="w-full h-5/6 md:p-3">GoalSelection</div>;
};

export const Summary = ({ appointment, setAppointment }: Props) => {
    return <div className="w-full h-5/6 md:p-3">Summary</div>;
};
