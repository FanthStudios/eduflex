import { prisma } from "@/prisma/client";

interface UserProps {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    accounts?: any[];
    id?: number;
    sessions?: any[];
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

    return user;
};
