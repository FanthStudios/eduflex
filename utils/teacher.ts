import { prisma } from "@/prisma/client";

export const getTeachers = async () => {
    const teachers = await prisma.teacher.findMany({
        include: {
            user: true,
            subjects: true,
        },
    });

    return teachers;
};
