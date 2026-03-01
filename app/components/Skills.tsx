"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
    SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiNodedotjs,
    SiPython, SiTailwindcss, SiMongodb, SiPostgresql, SiDocker,
    SiGit, SiVercel, SiDiscord, SiGo, SiTurso
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { PurpleFlare } from "./Effects";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const skillCategories = [
    {
        title: "Frontend",
        skills: [
            { name: "React", icon: SiReact, color: "#61DAFB", level: 95 },
            { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", level: 90 },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 88 },
            { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: 95 },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", level: 92 },
        ],
    },
    {
        title: "Backend",
        skills: [
            { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: 90 },
            { name: "Python", icon: SiPython, color: "#3776AB", level: 85 },
            { name: "Go", icon: SiGo, color: "#00ADD8", level: 75 },
            { name: "Java", icon: FaJava, color: "#007396", level: 80 },
        ],
    },
    {
        title: "Tools & DevOps",
        skills: [
            { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 85 },
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", level: 80 },
            { name: "Turso", icon: SiTurso, color: "#45EBA5", level: 88 },
            { name: "Docker", icon: SiDocker, color: "#2496ED", level: 78 },
            { name: "Git", icon: SiGit, color: "#F05032", level: 92 },
            { name: "Vercel", icon: SiVercel, color: "#ffffff", level: 88 },
            { name: "Discord API", icon: SiDiscord, color: "#5865F2", level: 95 },
        ],
    },
];

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="skills" className="relative overflow-hidden">
            <PurpleFlare className="-top-20 -right-20" size={400} delay={0.2} />
            <PurpleFlare className="bottom-0 left-1/4" size={350} delay={0.5} />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal-800/30 to-transparent pointer-events-none" />
            <div className="section-container relative z-10" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-mono text-accent-primary tracking-widest uppercase mb-4 block">
                        // Tech Stack
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Skills & <span className="gradient-text">Technologies</span>
                    </h2>
                    <p className="mt-4 text-charcoal-300 max-w-xl mx-auto text-lg">
                        The tools and technologies I use to bring ideas to life
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {skillCategories.map((category, catIdx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30, x: catIdx % 2 === 0 ? -20 : 20 }}
                            animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: catIdx * 0.2, ease: EASE }}
                        >
                            <h3 className="text-lg font-semibold text-charcoal-200 mb-5 flex items-center gap-3">
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    animate={isInView ? { scaleX: 1 } : {}}
                                    transition={{ duration: 0.6, delay: catIdx * 0.2, ease: EASE }}
                                    className="w-8 h-px bg-gradient-to-r from-accent-primary to-transparent origin-left block"
                                />
                                {category.title}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {category.skills.map((skill, i) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                                        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                                        transition={{ duration: 0.5, delay: catIdx * 0.2 + i * 0.06, ease: EASE }}
                                        whileHover={{
                                            y: -4,
                                            boxShadow: `0 12px 40px rgba(0,0,0,0.3), 0 0 20px ${skill.color}15`,
                                            borderColor: `${skill.color}30`,
                                        }}
                                        className="glass-card p-4 group cursor-default transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <motion.div
                                                whileHover={{ scale: 1.15, rotate: 5 }}
                                                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                                                style={{ backgroundColor: `${skill.color}15`, border: `1px solid ${skill.color}30` }}
                                            >
                                                <skill.icon className="text-lg" style={{ color: skill.color }} />
                                            </motion.div>
                                            <div>
                                                <div className="text-sm font-semibold text-white">{skill.name}</div>
                                                <div className="text-xs text-charcoal-400">{skill.level}%</div>
                                            </div>
                                        </div>
                                        <div className="w-full h-1.5 bg-charcoal-700 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={isInView ? { width: `${skill.level}%` } : {}}
                                                transition={{ duration: 1.2, delay: catIdx * 0.2 + i * 0.06 + 0.3, ease: EASE }}
                                                className="h-full rounded-full relative"
                                                style={{ background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})` }}
                                            >
                                                <motion.div
                                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="absolute right-0 top-0 w-2 h-full rounded-full"
                                                    style={{ background: skill.color, boxShadow: `0 0 8px ${skill.color}` }}
                                                />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
