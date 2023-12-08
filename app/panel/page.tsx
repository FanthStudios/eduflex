import type { Metadata } from "next";
import { Suspense } from "react";
import FavoriteTeachers from "@/components/panel/FavoriteTeachers";
import Dashboard from "@/components/panel/Dashboard";

export const metadata: Metadata = {
    title: "Twój Panel | EduFlex",
    description:
        "Zarządzaj swoją podróżą edukacyjną. Sprawdź nadchodzące spotkania, ulubionych nauczycieli i postępy w jednym miejscu",
    authors: [
        {
            name: "Bartosz Paczesny",
            url: "https://dev.paczesny.pl/",
        },
    ],
};

export default async function Page() {
    return (
        <div className="flex flex-col 2xl:flex-row items-start justify-start w-full h-full col-span-3 row-span-2 overflow-y-auto gap-6 2xl:gap-0">
            <Suspense fallback={<div>loading...</div>}>
                <Dashboard />
                <FavoriteTeachers />
            </Suspense>
        </div>
    );
}
