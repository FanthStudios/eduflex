import { prisma } from "@/prisma/client";

export const getTeachers = async (
    withAppoinments?: boolean,
    userId?: string
) => {
    const teachers = userId
        ? await prisma.teacher.findMany({
              where: {
                  userId: parseInt(userId),
              },
              include: {
                  user: true,
                  subjects: true,
                  appointments:
                      withAppoinments && withAppoinments == true ? true : false,
                  favoritedBy: true,
              },
          })
        : await prisma.teacher.findMany({
              include: {
                  user: true,
                  subjects: true,
                  appointments:
                      withAppoinments && withAppoinments == true ? true : false,
                  favoritedBy: true,
              },
          });

    return teachers;
};
