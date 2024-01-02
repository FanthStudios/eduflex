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
import { Input } from "@/components/ui/input";
import { useSubjects } from "@/hooks/useSubjects";

type Appointment = {
    subject: string;
    teacherId: number;
    dateTime: Date | null;
    goal: string;
    topic?: string;
    customGoal?: string;
};

interface Props {
    appointment: Appointment;
    setAppointment: (arg: Appointment) => void;
    studentId?: string;
}

export const SubjectSelection = ({ appointment, setAppointment }: Props) => {
    const { subjects } = useSubjects();
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
                            {subjects.map((option) => (
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
    studentId,
}: Props) => {
    const { appointments } = useAppointments();
    const filteredAppointments =
        appointments &&
        appointments.filter(
            (app) =>
                app.teacherId == appointment.teacherId &&
                app.subject.name == appointment.subject &&
                (new Date(app.dateTime!).toLocaleDateString() ==
                new Date().toLocaleDateString()
                    ? new Date(app.dateTime!).getTime() >
                      new Date(
                          new Date().setHours(new Date().getHours() + 1)
                      ).getTime()
                    : new Date(app.dateTime!).getTime() >
                      new Date().getTime()) &&
                // if the student is already registered to an appointment with the same teacher and subject, then filter out the appointment
                app.studentAppointments?.every(
                    (studentApp) => studentApp.student.user.id != studentId
                )
        );
    return (
        <div className="flex flex-col items-center justify-start w-full h-full lg:h-3/4 md:p-3 xl:p-10 gap-3">
            <h1 className="text-xl lg:text-2xl">
                Wybierz odpowiadający ci termin
            </h1>
            <div className="flex flex-col items-center justify-start w-full h-full gap-4 py-4 overflow-y-auto">
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
        </div>
    );
};

export const GoalSelection = ({ appointment, setAppointment }: Props) => {
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
                            if (value == "inne") {
                                setAppointment({
                                    ...appointment,
                                    goal: value,
                                    topic: "",
                                });
                            } else {
                                setAppointment({
                                    ...appointment,
                                    goal: value,
                                });
                            }
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
                {appointment.goal === "inne" ? (
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
                ) : (
                    <div className="w-full">
                        <label
                            htmlFor="topic"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Temat
                        </label>
                        <Input
                            className="py-1"
                            name="topic"
                            onChange={(e) => {
                                setAppointment({
                                    ...appointment,
                                    topic: e.target.value,
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
    const { teachers } = useTeacher();
    const { appointments } = useAppointments();
    const teacher = teachers?.find(
        (teacher) => teacher.userId == appointment.teacherId
    );
    const appointmentWithSameTeacherAndSubject =
        appointments?.filter(
            (app) =>
                app.teacherId == appointment.teacherId &&
                app.subject.name == appointment.subject &&
                app.dateTime == appointment.dateTime
        )[0] || null;
    return (
        <div className="flex flex-col items-center justify-start w-full h-full lg:h-3/4 md:p-3 xl:p-10 gap-3">
            <h1 className="text-xl lg:text-2xl">Podsumowanie</h1>
            {/* map the appointment */}
            <div className="w-full lg:w-2/3">
                <p className="text-sm mb-1">Przedmiot i nauczyciel</p>
                <p className="py-1 px-3 bg-neutral-50 border border-neutral-300 rounded-lg w-full">
                    {appointment.subject} - {teacher?.user.firstName}{" "}
                    {teacher?.user.lastName}
                </p>
            </div>
            <div className="w-full lg:w-2/3">
                <p className="text-sm mb-1">Data i godzina</p>
                <p className="py-1 px-3 bg-neutral-50 border capitalize border-neutral-300 rounded-lg w-full">
                    {new Date(appointment.dateTime!).toLocaleString("pl-PL", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        hour: "numeric",
                        minute: "numeric",
                    })}
                </p>
            </div>
            {appointmentWithSameTeacherAndSubject && (
                <div className="w-full lg:w-2/3">
                    <p className="text-sm mb-1">Lokalizacja</p>
                    <p className="py-1 px-3 bg-neutral-50 border capitalize border-neutral-300 rounded-lg w-full">
                        {appointmentWithSameTeacherAndSubject.location.city},{" "}
                        {appointmentWithSameTeacherAndSubject.location.address},{" "}
                        Sala {appointmentWithSameTeacherAndSubject.roomNumber}
                    </p>
                </div>
            )}
            {appointment.goal ===
            ("poprawa_kartkowki" || "poprawa_sprawdzianu" || "nauka") ? (
                <>
                    <div className="w-full lg:w-2/3">
                        <p className="text-sm mb-1">Cel</p>
                        <p className="py-1 px-3 bg-neutral-50 border border-neutral-300 rounded-lg w-full">
                            {appointment.goal == "poprawa_kartkowki"
                                ? "Poprawa kartkówki"
                                : appointment.goal == "poprawa_sprawdzianu"
                                ? "Poprawa sprawdzianu"
                                : "Nauka"}
                        </p>
                    </div>
                    <div className="w-full lg:w-2/3">
                        <p className="text-sm mb-1">Temat</p>
                        <p className="py-1 px-3 bg-neutral-50 border border-neutral-300 rounded-lg w-full">
                            {appointment.topic}
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <div className="w-full lg:w-2/3">
                        <p className="text-sm mb-1">Cel</p>
                        <p className="py-1 px-3 bg-neutral-50 border border-neutral-300 rounded-lg w-full">
                            {appointment.goal}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};
