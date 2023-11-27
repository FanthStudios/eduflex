import { createUser, getUser } from "@/utils/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    const body = await request.json();
    const {
        email,
        password,
        firstName,
        lastName,
        role,
        subjects,
        studentsClass,
    } = body;

    if (
        !email ||
        !password ||
        !firstName ||
        !lastName ||
        !role ||
        !(subjects.length > 0)
    ) {
        if (role === "TEACHER" && !(subjects.length > 0)) {
            return new NextResponse("Proszę wybrać przedmioty nauczania", {
                status: 401,
            });
        } else if (
            (!email ||
                !password ||
                !firstName ||
                !lastName ||
                !studentsClass) &&
            role == "STUDENT"
        ) {
            return new NextResponse("Jedno z pól jest puste", { status: 401 });
        }
    }

    const user = await getUser(email);

    if (user) {
        return new NextResponse(
            "Użytkownik o podanym adresie email już istnieje",
            { status: 401 }
        );
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
        studentsClass,
    });

    return new NextResponse(JSON.stringify(newUser), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
