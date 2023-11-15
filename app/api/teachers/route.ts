import { getTeachers } from "@/utils/teacher";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const teachers = await getTeachers();

    return new NextResponse(JSON.stringify(teachers), {
        status: 200,
        headers: {
            "content-type": "application/json",
        },
    });
}
