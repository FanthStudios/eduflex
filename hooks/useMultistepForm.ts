import { ReactElement, useState } from "react";

export function useMultistepForm(steps: ReactElement[]) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    function next() {
        setCurrentIndex((i) => {
            if (i >= steps.length - 1) return i;
            return i + 1;
        });
    }

    function previous() {
        setCurrentIndex((i) => {
            if (i <= 0) return i;
            return i - 1;
        });
    }

    function goTo(index: number) {
        setCurrentIndex(index);
    }

    return {
        currentIndex,
        step: steps[currentIndex],
        next,
        previous,
        goTo,
    };
}
