import type { Metadata } from "next";
// import { Inter } from 'next/font/google'
import "@/app/tailwind.css";
import AuthProvider from "@/context/AuthProvider";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: "EduFlex: Rewolucjonizuje naukę online",
    description:
        "Dołącz do EduFlex, wiodącej platformy do nauki online. Przeglądaj różnorodne przedmioty, ucz się od najlepszych nauczycieli i osiągaj swoje cele edukacyjne.",
    authors: [
        {
            name: "Bartosz Paczesny",
            url: "https://dev.paczesny.pl/",
        },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <AuthProvider>
                <body>
                    {children}
                    <ToastContainer />
                </body>
            </AuthProvider>
        </html>
    );
}
