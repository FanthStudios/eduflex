import SummaryReport from "@/components/panel/SummaryReport";
import CalendarWithMeetings from "@/components/panel/CalendarWithMeetings";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Twój Panel | EduFlex",
    description:
        "Zarządzaj swoją podróżą edukacyjną. Sprawdź nadchodzące spotkania, ulubionych nauczycieli i postępy w jednym miejscu",
};

export default async function Page() {
    return (
        <div className="flex flex-col 2xl:flex-row items-start justify-start w-full h-full col-span-3 row-span-2 overflow-y-auto gap-6 2xl:gap-0">
            <div className="w-full 2xl:w-2/3 flex flex-col items-start justify-start gap-6">
                <SummaryReport />
                <Suspense fallback={<div>loading...</div>}>
                    <CalendarWithMeetings />
                </Suspense>
            </div>
            <div className="w-full xl:w-1/3 xl:pl-6">
                <div
                    className={`flex flex-col items-start justify-center w-full gap-6`}
                >
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                        Ulubieni nauczyciele
                    </h3>
                </div>
            </div>
        </div>
    );
}
