"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import XylenLogo from "./XylenLogo";
import { useTheme } from "./ThemeProvider";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
];

function ThemeToggle() {
    const { theme, cycleTheme } = useTheme();

    const icons = {
        dark: FiMoon,
        light: FiSun,
        system: FiMonitor,
    };
    const labels = {
        dark: "Dark",
        light: "Light",
        system: "System",
    };
    const Icon = icons[theme];

    return (
        <motion.button
            onClick={cycleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-charcoal-800 border border-white/5 text-charcoal-200 hover:text-accent-primary hover:border-accent-primary/30 transition-all duration-300 text-sm"
            aria-label={`Theme: ${labels[theme]}`}
            title={`Theme: ${labels[theme]} — Click to change`}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={theme}
                    initial={{ y: -10, opacity: 0, rotate: -45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 10, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center"
                >
                    <Icon className="text-sm" />
                </motion.span>
            </AnimatePresence>
            <span className="hidden sm:inline text-xs font-medium">{labels[theme]}</span>
        </motion.button>
    );
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            const sections = navLinks.map((l) => l.href.replace("#", ""));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 120) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "nav-blur" : ""}`}
            >
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between h-[72px]">
                    <a href="#home" className="flex items-center gap-2 group">
                        <XylenLogo width={100} height={40} className="opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>

                    <ul className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${activeSection === link.href.replace("#", "")
                                        ? "text-white"
                                        : "text-charcoal-300 hover:text-white"
                                        }`}
                                >
                                    {activeSection === link.href.replace("#", "") && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute inset-0 bg-charcoal-700 rounded-lg"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="hidden md:flex items-center gap-3">
                        <ThemeToggle />
                        <a
                            href="#contact"
                            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-gradient-to-r from-accent-primary to-accent-tertiary text-white hover:shadow-[0_0_30px_rgba(167,139,250,0.3)] transition-all duration-300 hover:scale-105"
                        >
                            <span className="w-2 h-2 bg-green-400 rounded-full pulse-dot" />
                            Let&apos;s Talk
                        </a>
                    </div>

                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="flex flex-col gap-1.5 p-2"
                            aria-label="Toggle menu"
                        >
                            <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-charcoal-100 block" />
                            <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-0.5 bg-charcoal-100 block" />
                            <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-charcoal-100 block" />
                        </button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-charcoal-900/95 backdrop-blur-xl pt-24 px-8 md:hidden"
                    >
                        <ul className="flex flex-col gap-2">
                            {navLinks.map((link, i) => (
                                <motion.li key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                                    <a
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="block py-4 text-2xl font-medium text-charcoal-200 hover:text-white transition-colors border-b border-white/5"
                                    >
                                        {link.label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                        <motion.a
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            href="#contact"
                            onClick={() => setMobileOpen(false)}
                            className="mt-8 flex items-center justify-center gap-2 w-full py-4 text-lg font-medium rounded-2xl bg-gradient-to-r from-accent-primary to-accent-tertiary text-white"
                        >
                            <span className="w-2 h-2 bg-green-400 rounded-full pulse-dot" />
                            Let&apos;s Talk
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
