import { prisma } from "@/prisma/client";

export const getTeachers = async (withAppoinments?: boolean) => {
    const teachers = await prisma.teacher.findMany({
        include: {
            user: true,
            subjects: true,
            appointments:
                withAppoinments && withAppoinments == true ? true : false,
        },
    });

    return teachers;
};
