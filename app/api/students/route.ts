import { getStudents } from "@/utils/student";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const students = await getStudents();

    return new NextResponse(JSON.stringify(students), {
        status: 200,
        headers: {
            "content-type": "application/json",
        },
    });
}
