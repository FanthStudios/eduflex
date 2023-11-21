import { Teacher } from "@/hooks/useTeacher";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Student, useStudent } from "@/hooks/useStudent";
import { useSession } from "next-auth/react";

type TeacherCardProps = {
    teacher: Teacher;
    fillColor: string;
};

type StudentCardProps = {
    student: Student;
    fillColor: string;
};

type Props = {
    teacher?: Teacher;
    student?: Student;
};

function formatDate(date: any) {
    const now = new Date();
    const timeDifferential = now.getTime() - new Date(date).getTime(); // różnica w milisekundach

    const seconds = Math.floor(timeDifferential / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    switch (true) {
        case days > 0:
            if (days === 1) {
                return `wczoraj`;
            } else {
                return `${days} dni temu`;
            }
        case hours > 0:
            if (hours === 1) {
                return `godzinę temu`;
            } else if (
                hours.toString().endsWith("2" || "3" || "4") &&
                !hours.toString().endsWith("12" || "13" || "14")
            ) {
                return `${hours} godziny temu`;
            } else {
                return `${hours} godzin temu`;
            }
        case minutes > 0:
            if (minutes === 1) {
                return `minutę temu`;
            } else if (
                minutes.toString().endsWith("2" || "3" || "4") &&
                !minutes.toString().endsWith("12" || "13" || "14")
            ) {
                return `${minutes} minuty temu`;
            } else {
                return `${minutes} minut temu`;
            }
        default:
            if (seconds === 1) {
                return `sekundę temu`;
            } else if (
                seconds.toString().endsWith("2" || "3" || "4") &&
                !seconds.toString().endsWith("12" || "13" || "14")
            ) {
                return `${seconds} sekundy temu`;
            } else {
                return `${seconds} sekund temu`;
            }
    }
}

export default function ListCard({ teacher, student }: Props) {
    const randomColor = useCallback(() => {
        const colorPallete = [
            "red",
            "yellow",
            "green",
            "blue",
            "indigo",
            "purple",
            "pink",
            "violet",
            "amber",
            "sky",
            "lime",
            "emerald",
            "teal",
            "cyan",
            "fuchsia",
            "rose",
        ];
        return colorPallete[Math.floor(Math.random() * colorPallete.length)];
    }, []);

    const colorSaturation = useCallback(() => {
        const randomMultiplier = Math.floor(Math.random() * 3) + 1;
        const randomNumber = randomMultiplier * 100;
        return randomNumber;
    }, []);

    const [fillColor, setFillColor] = useState("");

    useEffect(() => {
        const randColor = randomColor();
        setFillColor(
            clsx(
                `bg-${randColor}-${colorSaturation()} text-${randColor}-${
                    colorSaturation() + 600
                }`,
                "h-12 w-12 rounded-full flex items-center justify-center"
            )
        );
    }, [colorSaturation, randomColor]);

    return teacher ? (
        <TeacherCard teacher={teacher} fillColor={fillColor} />
    ) : (
        student && <StudentCard student={student} fillColor={fillColor} />
    );
}

function TeacherCard({ teacher, fillColor }: TeacherCardProps) {
    const { data: session } = useSession();
    const {
        students,
        addStudentsFavoriteTeacher,
        removeStudentsFavoriteTeacher,
    } = useStudent();
    const student = students?.find(
        (student) => student.user.email === session?.user.email
    );

    async function addToFavorites() {
        const res = await fetch("/api/favorite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                teacherId: teacher.userId,
                userId: session?.user.id,
            }),
        });
        const data = await res.json();

        if (data.isFavorited) {
            addStudentsFavoriteTeacher(teacher.userId, student!.userId);
        } else {
            removeStudentsFavoriteTeacher(teacher.userId, student!.userId);
        }
    }

    return (
        <li
            key={teacher.user.email}
            className="relative flex justify-between gap-x-6 py-5 lg:w-2/3 w-full"
        >
            <div className="flex gap-x-4">
                <div className={`${fillColor}`}>
                    <p>{teacher.user?.firstName[0]}</p>
                </div>
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        <span>
                            <span className="absolute inset-x-0 -top-px bottom-0" />
                            {teacher.user.firstName} {teacher.user.lastName}
                        </span>
                    </p>
                    <p className="mt-1 flex text-xs leading-5 text-gray-500">
                        <a
                            href={`mailto:${teacher.user.email}`}
                            className="relative truncate hover:underline"
                        >
                            {teacher.user.email}
                        </a>
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-x-6">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                        {teacher.subjects.map((subject) => (
                            <span key={subject.id}>
                                {teacher.subjects.indexOf(subject) !==
                                teacher.subjects.length - 1
                                    ? `${subject.name}, `
                                    : `${subject.name}`}
                            </span>
                        ))}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                        Ostatnio{" "}
                        {teacher.user.firstName.endsWith("a")
                            ? "widziana"
                            : "widziany"}{" "}
                        <span className="text-green-600">
                            {formatDate(teacher.user.lastLogin)}
                        </span>
                    </p>
                </div>
                <button
                    className={`relative ${
                        student?.favoriteTeachers?.find(
                            (favoriteTeacher) =>
                                favoriteTeacher.userId === teacher.userId
                        ) && "text-red-600"
                    }`}
                    onClick={async () => {
                        await addToFavorites();
                    }}
                >
                    <HeartIcon className="w-5 aspect-square" />
                </button>
            </div>
        </li>
    );
}

function StudentCard({ student, fillColor }: StudentCardProps) {
    return (
        <li
            key={student.user.email}
            className="relative flex justify-between gap-x-6 py-5 lg:w-2/3 w-full"
        >
            <div className="flex gap-x-4">
                <div className={`${fillColor}`}>
                    <p>{student.user?.firstName[0]}</p>
                </div>
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        <span>
                            <span className="absolute inset-x-0 -top-px bottom-0" />
                            {student.user.firstName} {student.user.lastName}
                        </span>
                    </p>
                    <p className="mt-1 flex text-xs leading-5 text-gray-500">
                        <a
                            href={`mailto:${student.user.email}`}
                            className="relative truncate hover:underline"
                        >
                            {student.user.email}
                        </a>
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-x-6">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                        {student.studentsClass.name}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                        Ostatnio{" "}
                        {student.user.firstName.endsWith("a")
                            ? "widziana"
                            : "widziany"}{" "}
                        <span className="text-green-600">
                            {formatDate(student.user.lastLogin)}
                        </span>
                    </p>
                </div>
            </div>
        </li>
    );
}
