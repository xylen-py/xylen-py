"use client";

import Image from "next/image";
import { useTheme } from "./ThemeProvider";

export default function XylenLogo({ className = "", width = 120, height = 48 }: { className?: string; width?: number; height?: number }) {
    const { resolvedTheme } = useTheme();

    return (
        <Image
            src="/xylen.svg"
            alt=".1xylen"
            width={width}
            height={height}
            className={`${className} transition-all duration-300`}
            style={resolvedTheme === "light" ? { filter: "invert(1)" } : undefined}
            priority
        />
    );
}
