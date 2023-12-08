import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const middleware = async (req: NextRequest, res: NextResponse) => {
    const isLoggedIn = req.cookies.getAll().some((cookie) => {
        return cookie.name === "next-auth.session-token";
    });

    const session = await getSession({ req: req as any });
    console.log(session);

    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    if (req.url.includes("/panel")) {
        // return NextResponse.redirect(new URL("/panel/dashboard", req.url));
    }
};

export const config = { matcher: ["/panel", "/panel/:path*"] };
