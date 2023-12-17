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

export const deleteTeacher = async (teacherId: number) => {
    try {
        const appointments = await prisma.appointment.findMany({
            where: {
                teacherId,
            },
        });

        if (appointments.length > 0) {
            await prisma.appointment.deleteMany({
                where: {
                    teacherId,
                },
            });
        }

        const teacher = await prisma.teacher.findFirst({
            where: {
                userId: teacherId,
            },
            select: {
                favoritedBy: true,
                subjects: true,
                userId: true,
            },
        });

        if (teacher && teacher.favoritedBy.length > 0) {
            await prisma.teacher.update({
                where: {
                    userId: teacherId,
                },
                data: {
                    favoritedBy: {
                        disconnect: teacher.favoritedBy.map((favorite) => ({
                            userId: favorite.userId,
                        })),
                    },
                },
            });
        }

        if (teacher && teacher.subjects.length > 0) {
            await prisma.teacher.update({
                where: {
                    userId: teacherId,
                },
                data: {
                    subjects: {
                        disconnect: teacher.subjects.map((subject) => ({
                            id: subject.id,
                        })),
                    },
                },
            });
        }

        await prisma.activationCode.deleteMany({
            where: {
                userId: teacherId,
            },
        });

        await prisma.user.delete({
            where: {
                id: teacherId,
            },
        });

        return teacher;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
