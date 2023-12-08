import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

function generateCode() {
    const characters =
        "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";

    for (let i = 0; i < 4; i++) {
        code += characters[Math.floor(Math.random() * characters.length)];
    }

    code += "-";

    for (let i = 0; i < 4; i++) {
        code += characters[Math.floor(Math.random() * characters.length)];
    }

    return code;
}

export async function GET(request: Request) {
    const codes = await prisma.activationCode.findMany({
        include: {
            user: true,
        },
    });

    return new NextResponse(JSON.stringify(codes), {
        headers: {
            "content-type": "application/json",
        },
    });
}

export async function DELETE(request: Request) {
    const { code } = await request.json();

    const deleted = await prisma.activationCode.delete({
        where: {
            value: code,
        },
    });

    return new NextResponse(JSON.stringify(deleted), {
        headers: {
            "content-type": "application/json",
        },
    });
}

export async function POST(request: Request) {
    const { iteration } = await request.json();

    const date = new Date();

    for (let i = 0; i < iteration; i++) {
        await prisma.activationCode.create({
            data: {
                value: generateCode(),
                date: date,
            },
        });
    }

    const codes = await prisma.activationCode.findMany({
        where: {
            date: date,
        },
    });

    return new NextResponse(JSON.stringify(codes), {
        headers: {
            "content-type": "text/plain",
        },
    });
}
