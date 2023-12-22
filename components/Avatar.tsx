"use client";

import clsx from "clsx";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Props = {
    src?: string;
    letter: string;
    width: number;
    className?: string;
};

export default function Avatar({ src, letter, width = 12, className }: Props) {
    const randomColor = useCallback(() => {
        const colorPallete = [
            "red",
            "yellow",
            "green",
            "blue",
            "indigo",
            "purple",
            "pink",
            "violet",
            "amber",
            "sky",
            "lime",
            "emerald",
            "teal",
            "cyan",
            "fuchsia",
            "rose",
        ];
        return colorPallete[Math.floor(Math.random() * colorPallete.length)];
    }, []);

    const colorSaturation = useCallback(() => {
        const randomMultiplier = Math.floor(Math.random() * 3) + 1;
        const randomNumber = randomMultiplier * 100;
        return randomNumber;
    }, []);

    const [fillColor, setFillColor] = useState("");

    useEffect(() => {
        const randColor = randomColor();
        setFillColor(
            clsx(
                `bg-${randColor}-${colorSaturation()} text-${randColor}-${
                    colorSaturation() + 600
                } w-${width} h-${width} xl:h-auto ${className}`,
                "aspect-square rounded-full flex items-center text-center justify-center pointer-events-none"
            )
        );
    }, [colorSaturation, randomColor, width, className]);
    return (
        <div className={fillColor}>
            {src ? (
                <Image
                    width={64}
                    height={64}
                    src={src}
                    alt="avatar"
                    className="aspect-square rounded-full"
                />
            ) : (
                <p
                    className={clsx(
                        width < 12
                            ? "text-xl"
                            : width < 16
                            ? "text-2xl"
                            : "text-3xl",
                        "text-center"
                    )}
                >
                    {letter}
                </p>
            )}
        </div>
    );
}
