import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

type Props = {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    userId: number;
};

export async function PATCH(req: Request) {
    const body = await req.json();

    const { firstName, lastName, email, avatar, userId } = body as Props;

    await prisma.user.update({
        where: { id: userId },
        data: {
            firstName,
            lastName,
            email,
            avatar,
        },
    });

    return new NextResponse(null, { status: 200 });
}
