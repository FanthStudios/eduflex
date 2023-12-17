import { useEffect, useState } from "react";
import { Teacher } from "@/hooks/useTeacher";
import { Appointment } from "./useAppointments";

export interface Student {
    userId: number;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
        password: string;
        lastLogin: Date;
    };
    classId: number;
    studentsClass: {
        id: number;
        name: string;
    };
    appointments: Appointment[];
    favoriteTeachers: { userId: number }[];
}

export function useStudent(userId?: string) {
    const [students, setStudents] = useState<Student[]>([]);

    const removeStudentsFavoriteTeacher = (
        teacherId: number,
        studentId: number
    ) => {
        const updatedStudents = students.map((student) => {
            if (student.userId === studentId) {
                return {
                    ...student,
                    favoriteTeachers: student.favoriteTeachers.filter(
                        (teacher) => teacher.userId !== teacherId
                    ),
                };
            }

            return student;
        });

        setStudents(updatedStudents);
    };

    const addStudentsFavoriteTeacher = (
        teacherId: number,
        studentId: number
    ) => {
        const updatedStudents = students.map((student) => {
            if (student.userId === studentId) {
                return {
                    ...student,
                    favoriteTeachers: [
                        ...student.favoriteTeachers,
                        { userId: teacherId },
                    ],
                };
            }

            return student;
        });

        setStudents(updatedStudents);
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await fetch(`/api/students`, {
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
                setStudents(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchStudents();
    }, [userId]);

    return {
        student: students[0],
        students,
        setStudents,
        removeStudentsFavoriteTeacher,
        addStudentsFavoriteTeacher,
    };
}
