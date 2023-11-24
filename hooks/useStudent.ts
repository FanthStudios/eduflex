import { useEffect, useState } from "react";
import { Teacher } from "@/hooks/useTeacher";

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
    appointments: any[];
    favoriteTeachers: { userId: number }[];
}

export function useStudent(userId?: number) {
    const [students, setStudents] = useState<Student[]>([]);
    const [student, setStudent] = useState<Student | null>(null);

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
            const res = await fetch(`/api/students`);

            const data = await res.json();
            setStudents(data);
        };

        fetchStudents();
    }, []);

    useEffect(() => {
        if (userId) {
            setStudent(
                students.find((student) => student.userId === userId) || null
            );
        }
    }, [userId, students]);

    return {
        student,
        students,
        removeStudentsFavoriteTeacher,
        addStudentsFavoriteTeacher,
    };
}
