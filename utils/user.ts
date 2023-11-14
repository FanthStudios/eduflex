import { prisma } from "@/prisma/client";

enum Role {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
}

interface UserProps {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    accounts?: any[];
    id?: number;
    sessions?: any[];
    subjects?: any[];
}

export const getUser = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (user) {
        return user;
    } else {
        return null;
    }
};

export const createUser = async (userObject: UserProps) => {
    const user = await prisma.user.create({
        data: {
            email: userObject.email,
            password: userObject.password,
            firstName: userObject.firstName,
            lastName: userObject.lastName,
            role: userObject.role,
        },
    });

    if (userObject.role === Role.STUDENT) {
        await prisma.student.create({
            data: {
                userId: user.id,
            },
        });
    } else if (userObject.role === Role.TEACHER) {
        const teacher = await prisma.teacher.create({
            data: {
                userId: user.id,
            },
        });

        if (userObject.subjects && userObject.subjects.length > 0) {
            for (const subjectName of userObject.subjects) {
                const subject = await prisma.subject.upsert({
                    where: { name: subjectName },
                    create: { name: subjectName },
                    update: {},
                });

                await prisma.teacher.update({
                    where: { userId: user.id },
                    data: {
                        subjects: {
                            connect: { id: subject.id },
                        },
                    },
                });
            }
        }
    }

    return user;
};
