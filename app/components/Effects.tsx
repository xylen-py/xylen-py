"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function PurpleFlare({ className = "", delay = 0, size = 400 }: { className?: string; delay?: number; size?: number }) {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 2, delay, ease: "easeOut" }}
            className={`absolute rounded-full pointer-events-none ${className}`}
            style={{
                width: size,
                height: size,
                background: "radial-gradient(circle, rgba(167,139,250,0.4) 0%, rgba(192,132,252,0.15) 40%, transparent 70%)",
                filter: "blur(60px)",
            }}
        />
    );
}

export function FloatingParticles({ count = 20 }: { count?: number }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const particles = useMemo(() => {
        if (!mounted) return [];
        return Array.from({ length: count }).map(() => ({
            yEnd: -200 - Math.random() * 400,
            duration: 4 + Math.random() * 6,
            delay: Math.random() * 8,
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 30}%`,
        }));
    }, [count, mounted]);

    if (!mounted) {
        return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;
    }

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{
                        opacity: [0, 0.6, 0],
                        y: [-20, p.yEnd],
                        x: Math.sin(i) * 60,
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeOut",
                    }}
                    className="absolute w-1 h-1 rounded-full bg-accent-primary"
                    style={{
                        left: p.left,
                        bottom: p.bottom,
                    }}
                />
            ))}
        </div>
    );
}

export function GlowLine({ delay = 0, direction = "horizontal" }: { delay?: number; direction?: "horizontal" | "vertical" }) {
    const isHorizontal = direction === "horizontal";
    return (
        <motion.div
            initial={{ [isHorizontal ? "scaleX" : "scaleY"]: 0, opacity: 0 }}
            animate={{ [isHorizontal ? "scaleX" : "scaleY"]: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay, ease: EASE }}
            className={`${isHorizontal ? "h-px w-full" : "w-px h-full"}`}
            style={{
                background: isHorizontal
                    ? "linear-gradient(90deg, transparent, rgba(167,139,250,0.3), transparent)"
                    : "linear-gradient(180deg, transparent, rgba(167,139,250,0.3), transparent)",
                transformOrigin: isHorizontal ? "left" : "top",
            }}
        />
    );
}

export function SectionReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay, ease: EASE }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function PulseRing({ delay = 0, className = "" }: { delay?: number; className?: string }) {
    return (
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.5, 2], opacity: [0, 0.3, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay, ease: "easeOut" }}
            className={`absolute rounded-full border border-accent-primary/20 pointer-events-none ${className}`}
            style={{ width: 200, height: 200 }}
        />
    );
}
