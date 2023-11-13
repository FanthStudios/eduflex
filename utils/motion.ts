export const textVariant = (delay: number) => ({
    hidden: {
        x: -100,
        opacity: 0,
    },
    show: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 1.25,
            delay,
        },
    },
});

export const tabVariant = {
    hidden: {
        opacity: 0,
        y: 100,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            duration: 1.25,
        },
    },
    exit: {
        opacity: 0,
        y: 100,
        transition: {
            type: "spring",
            duration: 1.25,
        },
    },
};

export const slideInVariant = (
    direction: string,
    delay: number,
    value: number = 200
) => ({
    hidden: {
        // make it apply to all 4 directions
        y: direction === "top" ? -value : direction === "bottom" ? value : 0,
        x: direction === "left" ? -value : direction === "right" ? value : 0,
        opacity: 0,
    },
    show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 0.6,
            delay,
        },
    },
    exit: {
        y: direction === "top" ? -value : direction === "bottom" ? value : 0,
        x: direction === "left" ? -value : direction === "right" ? value : 0,
        opacity: 0,
        transition: {
            type: "spring",
            duration: 0.6,
        },
    },
});

export const sideVariants = {
    closed: {
        transition: {
            staggerChildren: 0.2,
            staggerDirection: -1,
        },
    },
    open: {
        transition: {
            staggerChildren: 0.2,
            staggerDirection: 1,
        },
    },
};
