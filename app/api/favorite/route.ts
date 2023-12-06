import { prisma } from "@/prisma/client";

export async function POST(request: Request) {
    const body = await request.json();
    const { teacherId, userId } = body;

    // check if teacher is already favorited
    const student = await prisma.student.findUnique({
        where: {
            userId: parseInt(userId),
        },
        include: {
            favoriteTeachers: true,
        },
    });

    const isFavorited =
        student &&
        student.favoriteTeachers.some(
            (teacher: any) => teacher.userId === parseInt(teacherId)
        );

    if (isFavorited) {
        // If teacher is already favorited, remove the connection
        await prisma.student.update({
            where: {
                userId: parseInt(userId),
            },
            data: {
                favoriteTeachers: {
                    disconnect: {
                        userId: parseInt(teacherId),
                    },
                },
            },
        });
    } else {
        // If teacher is not favorited, add the connection
        await prisma.student.update({
            where: {
                userId: parseInt(userId),
            },
            data: {
                favoriteTeachers: {
                    connect: {
                        userId: parseInt(teacherId),
                    },
                },
            },
        });
    }

    return new Response(JSON.stringify({ isFavorited: !isFavorited }), {
        status: 200,
        headers: {
            "content-type": "application/json",
        },
    });
}
