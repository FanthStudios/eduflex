import { getStudents } from "@/utils/student";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
        const students = await getStudents();

        return new NextResponse(JSON.stringify(students), {
            status: 200,
            headers: {
                "content-type": "application/json",
            },
        });
    } else {
        const students = await getStudents(userId);

        return new NextResponse(JSON.stringify(students), {
            status: 200,
            headers: {
                "content-type": "application/json",
            },
        });
    }
}
