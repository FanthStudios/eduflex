import { useAppointments } from "@/hooks/useAppointments";
import { useTeacher } from "@/hooks/useTeacher";
import AppointmentCard from "./AppointmentCard";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

type Appointment = {
    subject: string;
    teacherId: number;
    dateTime: Date | null;
    goal: string;
    customGoal?: string;
    availableSlots: number;
    studentAppointments?: any[];
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
        appointment.subject != ""
            ? teachers?.filter((teacher) =>
                  teacher.subjects?.some(
                      (subject) => subject.name == appointment.subject
                  )
              )
            : null;

    return (
        <div className="flex flex-col items-center justify-start w-full h-full lg:h-3/4 md:p-3 xl:p-10 gap-3">
            <h1 className="text-xl lg:text-2xl">
                Wybierz przedmiot i nauczyciela
            </h1>
            <div className="md:w-1/3 w-full space-y-3">
                <div className="w-full">
                    <label
                        htmlFor="subject"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Przedmiot
                    </label>
                    <Select
                        name="subject"
                        onValueChange={(value) => {
                            setAppointment({
                                ...appointment,
                                subject: value,
                            });
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Wybierz przedmiot" />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option.id} value={option.name}>
                                    {option.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full">
                    <label
                        htmlFor="teacher"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Nauczyciel
                    </label>
                    <Select
                        name="teacherId"
                        onValueChange={(value) => {
                            setAppointment({
                                ...appointment,
                                teacherId: parseInt(value),
                            });
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue
                                placeholder={
                                    filteredTeachers &&
                                    filteredTeachers?.length! > 0
                                        ? "Wybierz nauczyciela"
                                        : "Brak nauczycieli"
                                }
                            />
                        </SelectTrigger>
                        {filteredTeachers && (
                            <SelectContent>
                                {filteredTeachers?.map((option: any) => (
                                    <SelectItem
                                        key={option.userId}
                                        value={option.userId}
                                    >
                                        {option.user.firstName}{" "}
                                        {option.user.lastName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        )}
                    </Select>
                </div>
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
            {filteredAppointments && filteredAppointments.length > 0 ? (
                filteredAppointments.map((app) => (
                    <AppointmentCard
                        onClick={() => {
                            setAppointment({
                                ...appointment,
                                dateTime: app.dateTime,
                            });
                        }}
                        selected={appointment.dateTime == app.dateTime}
                        key={app.id}
                        appointment={app}
                    />
                ))
            ) : (
                <p className="text-lg">Brak dostępnych terminów</p>
            )}
        </div>
    );
};

export const GoalSelection = ({ appointment, setAppointment }: Props) => {
    // use useeffect to set the goal to the first goal in the options array
    // if the customgoal is not empty, set the goal to the customgoal

    // useEffect(() => {
    //     // when the customGoal changes, set the goal to the customGoal
    //     if (appointment.customGoal != "" && appointment.goal == "inne") {
    //         setTimeout(() => {
    //             setAppointment({
    //                 ...appointment,
    //                 goal: appointment.customGoal!,
    //             });
    //         }, 0);
    //     }
    // }, [appointment, appointment.customGoal, setAppointment]);

    return (
        <div className="flex flex-col items-center justify-start w-full h-full lg:h-3/4 md:p-3 xl:p-10 gap-3">
            <h1 className="text-xl lg:text-2xl">Podaj cel korepetycji</h1>
            {/* create a formik instance with a form */}
            {/* the form will have only a dropdown to select the appointment.goal: poprawa kartkowki, poprawa sprawdzianu, nauka, inne */}
            {/* IF "inne" is selected then dont set the appointment.goal to "inne" but show a text area to allow the user to insert a different goal, set the goal to the value of the textarea instead of "inne" */}

            <div className="md:w-1/3 w-full space-y-3">
                <div className="w-full">
                    <label
                        htmlFor="goal"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Cel korepetycji
                    </label>
                    <Select
                        name="goal"
                        onValueChange={(value) => {
                            console.log(value);
                            setAppointment({
                                ...appointment,
                                goal: value,
                            });
                            console.log(appointment);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Wybierz cel korepetycji" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="poprawa_kartkowki">
                                Poprawa kartkówki
                            </SelectItem>
                            <SelectItem value="poprawa_sprawdzianu">
                                Poprawa sprawdzianu
                            </SelectItem>
                            <SelectItem value="nauka">Nauka</SelectItem>
                            <SelectItem value="inne">Inne</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {appointment.goal === "inne" && (
                    <div className="w-full">
                        <label
                            htmlFor="customGoal"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Opisz swój cel (inny)
                        </label>
                        <Textarea
                            name="customGoal"
                            onChange={(e) => {
                                setAppointment({
                                    ...appointment,
                                    customGoal: e.target.value,
                                });
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export const Summary = ({ appointment, setAppointment }: Props) => {
    return (
        <div className="flex flex-col items-center justify-start w-full h-full lg:h-3/4 md:p-3 xl:p-10 gap-3">
            <h1 className="text-xl lg:text-2xl">Podsumowanie</h1>
            <div className="flex flex-col items-center justify-start w-full h-full lg:h-3/4 md:p-3 xl:p-10 gap-3">
                <div className="flex flex-col items-center justify-start w-full h-full lg:h-3/4 md:p-3 xl:p-10 gap-3">
                    <p className="text-lg">Przedmiot: {appointment.subject}</p>
                    <p className="text-lg">
                        Nauczyciel:{" "}
                        {appointment.teacherId != 0
                            ? appointment.teacherId
                            : "Brak nauczyciela"}
                    </p>
                    <p className="text-lg">
                        Termin:{" "}
                        {appointment.dateTime != null
                            ? new Date(appointment.dateTime).toLocaleDateString(
                                  "pl-PL",
                                  {
                                      weekday: "long",
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                  }
                              ) +
                              " o " +
                              new Date(appointment.dateTime).toLocaleTimeString(
                                  "pl-PL",
                                  {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                  }
                              )
                            : "Brak terminu"}
                    </p>
                    <p className="text-lg">
                        Cel:{" "}
                        {appointment.goal != ""
                            ? appointment.goal
                            : "Brak celu"}
                    </p>
                </div>
            </div>
        </div>
    );
};
