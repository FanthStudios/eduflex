import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma/client";
import { getUser } from "@/utils/user";

export const options: any = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    const user = await getUser(email);

                    if (!user)
                        throw new Error(
                            JSON.stringify({
                                error: "Nie znaleziono użytkownika o podanym adresie email",
                                status: false,
                            })
                        );

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (passwordsMatch) {
                        await prisma.user.update({
                            where: {
                                email: user.email,
                            },
                            data: {
                                lastLogin: new Date(),
                            },
                        });
                        return user as any;
                    } else {
                        throw new Error(
                            JSON.stringify({
                                error: "Hasło jest niepoprawne",
                                status: false,
                            })
                        );
                    }
                } else {
                    throw new Error(
                        JSON.stringify({
                            error: "Niepoprawne dane logowania",
                            status: false,
                        })
                    );
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }: any) {
            session.user = token.user;
            return session;
        },
        async jwt({ token, user }: any) {
            if (user) token.user = user;
            return token;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 3600 * 24,
    },
    secret: process.env.SECRET,
    pages: {
        signIn: "/login",
    },
};
