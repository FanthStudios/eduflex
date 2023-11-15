import { getTeachers } from "@/utils/teacher";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { withAppoinments } = body;
    const teachers = await getTeachers(withAppoinments);

    return new NextResponse(JSON.stringify(teachers), {
        status: 200,
        headers: {
            "content-type": "application/json",
        },
    });
}