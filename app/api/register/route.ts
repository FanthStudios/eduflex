import { createUser, getUser } from "@/utils/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password, firstName, lastName, role, subjects } = body;

    if (!email || !password || !firstName || !lastName || !role) {
        if (role === "TEACHER" && !subjects) {
            return new NextResponse("Missing fields", { status: 401 });
        } else {
            return new NextResponse("Missing fields", { status: 401 });
        }
    }

    const user = await getUser(email);

    if (user) {
        return new NextResponse("User already exists", { status: 401 });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await createUser({
        email,
        password: hash,
        firstName,
        lastName,
        role,
        subjects,
    });

    return new NextResponse(JSON.stringify(newUser), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
