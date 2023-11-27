import { prisma } from "@/prisma/client";

export const getStudents = async (userId?: number) => {
    let students = await prisma.student.findMany({
        include: {
            user: true,
            appointments: true,
            favoriteTeachers: true,
            studentsClass: true,
        },
    });

    // for each student merge the student.appointments with getStudentsAppointments(studentId)
    // for each student merge the student.favoriteTeachers with getStudentsFavoriteTeachers(studentId)
    // for each student merge the student.studentsClass with getStudentsClass(studentId)

    const studentAppointments = await getStundentAppointments();

    students = students.map((student) => {
        const appointments = studentAppointments.filter(
            (studentAppointment) =>
                studentAppointment.studentId === student.userId
        );

        return {
            ...student,
            appointments,
        };
    });

    if (userId) {
        students = students.filter((student) => student.userId === userId);
    }

    return students;
};

export const getStundentAppointments = async () => {
    const student = await prisma.studentAppointment.findMany({
        include: {
            student: true,
            appointment: {
                select: {
                    subject: true,
                    teacher: {
                        select: {
                            user: true,
                        },
                    },
                    location: true,
                    dateTime: true,
                    roomNumber: true,
                    studentAppointments: true,
                    availableSlots: true,
                },
            },
        },
    });

    return student;
};
