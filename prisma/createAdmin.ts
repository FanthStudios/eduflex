const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

    const adminUser = await prisma.user.upsert({
        where: { email: process.env.ADMIN_EMAIL },
        update: {},
        create: {
            email: process.env.ADMIN_EMAIL,
            firstName: "Admin",
            lastName: "Strony",
            password: hash,
            role: "ADMIN",
            lastLogin: new Date(),
        },
    });
}

main()
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
