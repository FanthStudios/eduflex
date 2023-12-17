import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const middleware = async (req: NextRequest, res: NextResponse) => {
    const isLoggedIn = req.cookies.getAll().some((cookie) => {
        return cookie.name === "next-auth.session-token";
    });

    if (isLoggedIn && req.url.includes("/login")) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (req.method === "POST" && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
};

export const config = {
    matcher: ["/panel", "/panel/:path*", "/dashboard", "/dashboard/:path*"],
};
