import { prisma } from "@/prisma/client";
import { deleteUser } from "@/utils/user";
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

export async function DELETE(req: Request) {
    const body = await req.json();

    const { userId } = body as Props;

    try {
        await deleteUser(userId);

        return new NextResponse(null, { status: 200 });
    } catch (e) {
        console.log(e);
        return new NextResponse(
            JSON.stringify({
                error: e,
            }),
            { status: 500 }
        );
    }
}
