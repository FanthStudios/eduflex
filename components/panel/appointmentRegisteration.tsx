import { useAppointments } from "@/hooks/useAppointments";
import { useTeacher } from "@/hooks/useTeacher";
import { useEffect } from "react";
import AppointmentCard from "./AppointmentCard";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";

type Appointment = {
    subject: string;
    teacherId: number;
    dateTime: Date | null;
    goal: string;
    customGoal?: string;
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

    useEffect(() => {
        // when the component mounts, set the subject to the first subject in the options array
        if (appointment.subject == "") {
            setTimeout(() => {
                setAppointment({
                    ...appointment,
                    subject: options[0].name,
                });
            }, 0);
        }
    }, [appointment, setAppointment]);

    useEffect(() => {
        // when the subject changes, set the teacherId to the first teacher that teaches that subject
        if (
            Array.isArray(filteredTeachers) &&
            filteredTeachers.length > 0 &&
            appointment.teacherId == 0
        ) {
            setTimeout(() => {
                setAppointment({
                    ...appointment,
                    teacherId: filteredTeachers[0].userId,
                });
            }, 0);
        }
    }, [appointment, appointment.subject, filteredTeachers, setAppointment]);

    return (
        <div className="flex flex-col items-center justify-start w-full h-full lg:h-3/4 md:p-3 xl:p-10 gap-3">
            <h1 className="text-xl lg:text-2xl">
                Wybierz przedmiot i nauczyciela
            </h1>
            <Formik
                initialValues={{
                    subject: options[0].name, // default value for subject is the first subject in the options array
                    teacherId:
                        filteredTeachers && filteredTeachers.length > 0
                            ? filteredTeachers[0].userId
                            : 0, // default value for teacherId is the first teacher that teaches the subject
                    goal: "",
                    dateTime: null,
                }}
                validate={(values) => {
                    const errors: any = {};
                    if (!values.subject) {
                        errors.subject = "Required";
                    } else if (
                        !options.some((option) => option.name == values.subject)
                    ) {
                        errors.subject = "Invalid subject";
                    }
                    if (!values.teacherId) {
                        errors.teacherId = "Required";
                    } else if (
                        !filteredTeachers?.some(
                            (teacher) => teacher.userId == values.teacherId
                        )
                    ) {
                        errors.teacherId = "Invalid teacher";
                    }
                    setAppointment(values);
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {(props: FormikProps<any>) => (
                    <Form className="md:w-1/3 w-full space-y-3">
                        <div className="w-full">
                            <label
                                htmlFor="subject"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Przedmiot
                            </label>
                            <Field
                                as="select"
                                name="subject"
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-inset focus:outline-none focus:ring-green-600 sm:text-sm sm:leading-6"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.subject}
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
                            </Field>
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="teacher"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Nauczyciel
                            </label>
                            <Field
                                as="select"
                                name="teacherId"
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-inset focus:outline-none focus:ring-green-600 sm:text-sm sm:leading-6"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.teacherId}
                            >
                                {filteredTeachers ? (
                                    filteredTeachers?.map((option: any) => (
                                        <option
                                            className="text-lg"
                                            key={option.userId}
                                            value={option.userId}
                                        >
                                            {option.user.firstName}{" "}
                                            {option.user.lastName}
                                        </option>
                                    ))
                                ) : (
                                    <option value={0} disabled>
                                        Brak nauczyciela
                                    </option>
                                )}
                            </Field>
                        </div>
                    </Form>
                )}
            </Formik>
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

    useEffect(() => {
        // when the component mounts, set the goal to the first goal in the options array
        if (appointment.goal == "") {
            setTimeout(() => {
                setAppointment({
                    ...appointment,
                    goal: options[0].name,
                });
            }, 0);
        }
    }, [appointment, setAppointment]);

    useEffect(() => {
        // when the customGoal changes, set the goal to the customGoal
        if (appointment.customGoal != "" && appointment.goal == "inne") {
            setTimeout(() => {
                setAppointment({
                    ...appointment,
                    goal: appointment.customGoal!,
                });
            }, 0);
        }
    }, [appointment, appointment.customGoal, setAppointment]);

    return (
        <div className="flex flex-col items-center justify-start w-full h-full lg:h-3/4 md:p-3 xl:p-10 gap-3">
            <h1 className="text-xl lg:text-2xl">Podaj cel korepetycji</h1>
            {/* create a formik instance with a form */}
            {/* the form will have only a dropdown to select the appointment.goal: poprawa kartkowki, poprawa sprawdzianu, nauka, inne */}
            {/* IF "inne" is selected then dont set the appointment.goal to "inne" but show a text area to allow the user to insert a different goal, set the goal to the value of the textarea instead of "inne" */}

            <Formik
                initialValues={{
                    subject: appointment.subject,
                    teacherId: appointment.teacherId,
                    dateTime: appointment.dateTime,
                    goal: "",
                    customGoal: "", // Add a new field for custom goal
                }}
                validate={(values: any) => {
                    const errors: any = {};
                    if (!values.goal) {
                        errors.goal = "Required";
                    } else if (
                        !options.some((option) => option.name == values.goal)
                    ) {
                        errors.goal = "Invalid goal";
                    }

                    // If "inne" is selected, validate custom goal
                    if (values.goal === "inne" && !values.customGoal) {
                        errors.customGoal = "Required";
                    }

                    setAppointment(values);
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {(props: FormikProps<any>) => (
                    <Form className="md:w-1/3 w-full space-y-3">
                        <div className="w-full">
                            <label
                                htmlFor="goal"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Cel korepetycji
                            </label>
                            <Field
                                as="select"
                                name="goal"
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-inset focus:outline-none focus:ring-green-600 sm:text-sm sm:leading-6"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.goal}
                            >
                                <option value="poprawa kartkowki">
                                    Poprawa kartkówki
                                </option>
                                <option value="poprawa sprawdzianu">
                                    Poprawa sprawdzianu
                                </option>
                                <option value="nauka">Nauka</option>
                                <option value="inne">Inne</option>
                            </Field>
                        </div>
                        {props.values.goal === "inne" && (
                            <div className="w-full">
                                <label
                                    htmlFor="customGoal"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Opisz swój cel (inny)
                                </label>
                                <Field
                                    as="textarea"
                                    name="customGoal"
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-inset focus:outline-none focus:ring-green-600 sm:text-sm sm:leading-6"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.customGoal}
                                />
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
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