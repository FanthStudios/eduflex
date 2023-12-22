import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/prisma/client";

type Props = {
    currentPassword: string;
    newPassword: string;
    userId: number;
};

export async function PATCH(req: Request) {
    const body = await req.json();

    const { currentPassword, newPassword, userId } = body as Props;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (user === null) {
            return new NextResponse(
                JSON.stringify({
                    error: "Nie znaleziono użytkownika.",
                }),
                { status: 404 }
            );
        }

        const passwordMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!passwordMatch) {
            return new NextResponse(
                JSON.stringify({
                    error: "Niepoprawne hasło.",
                }),
                { status: 400 }
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        await prisma.user.update({
            where: { id: userId },
            data: {
                password: hash,
            },
        });

        return new NextResponse(null, { status: 200 });
    } catch (e: any) {
        return new NextResponse(
            JSON.stringify({
                error: e,
            }),
            { status: 500 }
        );
    }
}
