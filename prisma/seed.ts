import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const bartek = await prisma.user.upsert({
        where: { email: "bartek@paczesny.pl" },
        update: {},
        create: {
            email: "bartek@paczesny.pl",
            firstName: "Bartek",
            lastName: "Paczesny",
            password: "ZAQ!2wsx",
            role: "STUDENT",
            lastLogin: new Date(),
        },
    });

    const schoolClass = await prisma.class.upsert({
        where: { name: "5pi" },
        update: {},
        create: {
            name: "5pi",
        },
    });

    const student = await prisma.student.upsert({
        where: { userId: bartek.id },
        update: {},
        create: {
            userId: bartek.id,
            classId: schoolClass.id,
        },
    });

    const teacherUser = await prisma.user.upsert({
        where: { email: "becz00nia.zs14@gmail.com" },
        update: {},
        create: {
            email: "becz00nia.zs14@gmail.com",
            firstName: "Adam",
            lastName: "Beczek",
            password: "ZAQ!2wsx",
            role: "TEACHER",
            lastLogin: new Date(),
            teacher: {
                create: {},
            },
        },
    });

    const teacher = await prisma.teacher.upsert({
        where: { userId: teacherUser.id },
        update: {},
        create: {
            userId: teacherUser.id,
        },
    });

    const subject = await prisma.subject.upsert({
        where: { name: "Informatyka" },
        update: {},
        create: {
            name: "Informatyka",
        },
    });

    await prisma.teacher.update({
        where: { userId: teacherUser.id },
        data: {
            subjects: {
                connect: { id: subject.id },
            },
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
