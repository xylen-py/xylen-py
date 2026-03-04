"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import {
    SiReact, SiNextdotjs, SiTypescript, SiNodedotjs,
    SiPython, SiTailwindcss, SiMongodb, SiDocker,
    SiGit, SiVercel, SiDiscord, SiGo
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const techItems = [
    { icon: SiReact, name: "React", color: "#61DAFB", orbit: 1 },
    { icon: SiNextdotjs, name: "Next.js", color: "#ffffff", orbit: 1 },
    { icon: SiTypescript, name: "TypeScript", color: "#3178C6", orbit: 1 },
    { icon: SiNodedotjs, name: "Node.js", color: "#339933", orbit: 1 },
    { icon: SiPython, name: "Python", color: "#3776AB", orbit: 2 },
    { icon: SiGo, name: "Go", color: "#00ADD8", orbit: 2 },
    { icon: FaJava, name: "Java", color: "#007396", orbit: 2 },
    { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4", orbit: 2 },
    { icon: SiMongodb, name: "MongoDB", color: "#47A248", orbit: 2 },
    { icon: SiDocker, name: "Docker", color: "#2496ED", orbit: 3 },
    { icon: SiGit, name: "Git", color: "#F05032", orbit: 3 },
    { icon: SiVercel, name: "Vercel", color: "#ffffff", orbit: 3 },
    { icon: SiDiscord, name: "Discord", color: "#5865F2", orbit: 3 },
];

export default function TechOrbit() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const [mounted, setMounted] = useState(false);
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);

    useEffect(() => setMounted(true), []);

    const orbits = useMemo(() => {
        const grouped: Record<number, typeof techItems> = {};
        techItems.forEach((t) => {
            if (!grouped[t.orbit]) grouped[t.orbit] = [];
            grouped[t.orbit].push(t);
        });
        return grouped;
    }, []);

    const orbitSizes = { 1: 160, 2: 260, 3: 360 };

    if (!mounted) return <div ref={ref} className="h-[500px]" />;

    return (
        <div ref={ref} className="relative flex items-center justify-center h-[500px] md:h-[550px]">
            {/* Center glow */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: EASE }}
                className="absolute w-20 h-20 rounded-full z-20 flex items-center justify-center"
                style={{
                    background: "linear-gradient(135deg, rgba(167,139,250,0.3), rgba(192,132,252,0.15))",
                    boxShadow: "0 0 60px rgba(167,139,250,0.2), 0 0 120px rgba(167,139,250,0.1)",
                }}
            >
                <span className="text-2xl font-bold gradient-text font-mono">&lt;/&gt;</span>
            </motion.div>

            {/* Orbit rings */}
            {Object.entries(orbitSizes).map(([orbit, size]) => (
                <motion.div
                    key={orbit}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: Number(orbit) * 0.15, ease: EASE }}
                    className="absolute rounded-full border border-white/[0.04]"
                    style={{ width: size * 2, height: size * 2 }}
                />
            ))}

            {/* Orbiting tech icons */}
            {Object.entries(orbits).map(([orbit, items]) => {
                const radius = orbitSizes[Number(orbit) as keyof typeof orbitSizes];
                const angleStep = (2 * Math.PI) / items.length;
                const duration = 20 + Number(orbit) * 10;
                const direction = Number(orbit) % 2 === 0 ? -1 : 1;

                return items.map((tech, i) => {
                    const startAngle = i * angleStep;
                    const Icon = tech.icon;

                    return (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? {
                                opacity: 1,
                                scale: 1,
                                rotate: direction * 360,
                            } : {}}
                            transition={{
                                opacity: { duration: 0.5, delay: 0.3 + i * 0.08 },
                                scale: { duration: 0.5, delay: 0.3 + i * 0.08, ease: EASE },
                                rotate: { duration, repeat: Infinity, ease: "linear" },
                            }}
                            className="absolute"
                            style={{
                                width: radius * 2,
                                height: radius * 2,
                                left: `calc(50% - ${radius}px)`,
                                top: `calc(50% - ${radius}px)`,
                            }}
                        >
                            <motion.div
                                className="absolute"
                                style={{
                                    left: `${50 + 50 * Math.cos(startAngle)}%`,
                                    top: `${50 + 50 * Math.sin(startAngle)}%`,
                                    transform: "translate(-50%, -50%)",
                                }}
                                animate={{ rotate: direction * -360 }}
                                transition={{ duration, repeat: Infinity, ease: "linear" }}
                                onHoverStart={() => setHoveredTech(tech.name)}
                                onHoverEnd={() => setHoveredTech(null)}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.3 }}
                                    className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300"
                                    style={{
                                        backgroundColor: `${tech.color}15`,
                                        border: `1px solid ${tech.color}30`,
                                        boxShadow: hoveredTech === tech.name
                                            ? `0 0 20px ${tech.color}30, 0 0 40px ${tech.color}15`
                                            : "none",
                                    }}
                                >
                                    <Icon
                                        className="text-lg md:text-xl"
                                        style={{ color: tech.color }}
                                    />
                                    {hoveredTech === tech.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-charcoal-800 text-white text-[10px] font-semibold px-2.5 py-1 rounded-md shadow-xl z-50 border border-white/10"
                                        >
                                            {tech.name}
                                        </motion.div>
                                    )}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    );
                });
            })}
        </div>
    );
}
