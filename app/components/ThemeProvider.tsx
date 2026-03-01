"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: "light" | "dark";
    setTheme: (theme: Theme) => void;
    cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "system",
    resolvedTheme: "dark",
    setTheme: () => { },
    cycleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

function getSystemTheme(): "light" | "dark" {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("system");
    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
    const [mounted, setMounted] = useState(false);

    const applyTheme = useCallback((t: Theme) => {
        const resolved = t === "system" ? getSystemTheme() : t;
        setResolvedTheme(resolved);
        const html = document.documentElement;
        html.classList.remove("light", "dark");
        html.classList.add(resolved);
        html.setAttribute("data-theme", resolved);
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem("theme") as Theme | null;
        const initial = saved || "system";
        setThemeState(initial);
        applyTheme(initial);
        setMounted(true);

        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = () => {
            if ((localStorage.getItem("theme") || "system") === "system") {
                applyTheme("system");
            }
        };
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, [applyTheme]);

    const setTheme = (t: Theme) => {
        setThemeState(t);
        localStorage.setItem("theme", t);
        applyTheme(t);
    };

    const cycleTheme = () => {
        const order: Theme[] = ["dark", "light", "system"];
        const idx = order.indexOf(theme);
        setTheme(order[(idx + 1) % order.length]);
    };

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, cycleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
