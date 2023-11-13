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
                try {
                    const parsedCredentials = z
                        .object({
                            email: z.string().email(),
                            password: z.string().min(6),
                        })
                        .safeParse(credentials);

                    if (parsedCredentials.success) {
                        const { email, password } = parsedCredentials.data;

                        const user = await getUser(email);

                        if (!user) return null;

                        const passwordsMatch = await bcrypt.compare(
                            password,
                            user.password
                        );

                        if (passwordsMatch) {
                            return user as any;
                        }
                    }

                    console.log("Invalid credentials");
                } catch (error) {
                    console.log(error);
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }: any) {
            return true;
        },
        async session({ session, user, token }: any) {
            session.user = token.user;
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }: any) {
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
