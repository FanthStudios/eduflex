import { prisma } from "@/prisma/client";

export const getStudents = async () => {
    const students = await prisma.student.findMany({
        include: {
            user: true,
            appointments: true,
            favoriteTeachers: true,
            studentsClass: true,
        },
    });

    return students;
};
