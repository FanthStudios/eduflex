import { deleteTeacher, getTeachers } from "@/utils/teacher";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { withAppoinments, userId } = body;
    const teachers = await getTeachers(withAppoinments, userId);

    return new NextResponse(JSON.stringify(teachers), {
        status: 200,
        headers: {
            "content-type": "application/json",
        },
    });
}

export async function DELETE(request: Request) {
    const body = await request.json();
    const { teacherId }: { teacherId: string } = body;

    try {
        const teacher = await deleteTeacher(parseInt(teacherId));

        return new NextResponse(JSON.stringify(teacher), {
            status: 200,
            headers: {
                "content-type": "application/json",
            },
        });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: {
                "content-type": "application/json",
            },
        });
    }
}
