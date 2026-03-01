"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { PurpleFlare, FloatingParticles } from "./Effects";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const experiences = [
    {
        title: "Full-Stack Developer",
        company: "Freelance / Open Source",
        location: "Remote",
        period: "2023 — Present",
        description: "Building premium web applications, Discord bots, and open-source tools used by thousands. Specializing in React, Next.js, and Node.js ecosystems.",
        highlights: [
            "Developed and maintained ZeonBot serving 1000+ Discord servers",
            "Built production-grade APIs deployed on Vercel Edge Runtime",
            "Created VanityGuard — an advanced vanity URL protection tool in Go",
        ],
        current: true,
    },
    {
        title: "Discord Bot Developer",
        company: "Self-Employed",
        location: "Remote",
        period: "2022 — 2023",
        description: "Specialized in creating feature-rich Discord bots with advanced music playback, moderation systems, and custom integrations.",
        highlights: [
            "Integrated multiple audio sources including Spotify, Gaana, and Pandora",
            "Built real-time dashboards with WebSocket communication",
            "Implemented Turso DB migrations for scalable data storage",
        ],
        current: false,
    },
    {
        title: "Self-Taught Developer",
        company: "Learning Journey",
        location: "India",
        period: "2021 — 2022",
        description: "Started the coding journey by learning web fundamentals, JavaScript, and Python. Built initial projects and discovered the passion for building tools.",
        highlights: [
            "Mastered HTML, CSS, JavaScript, and Python fundamentals",
            "Built first Discord bot and fell in love with API development",
            "Contributed to open source projects and joined developer communities",
        ],
        current: false,
    },
];

export default function Experience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="experience" className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal-800/20 to-transparent pointer-events-none" />
            <PurpleFlare className="top-20 -left-20" size={400} delay={0.3} />
            <PurpleFlare className="bottom-40 -right-20" size={350} delay={0.6} />
            <FloatingParticles count={12} />
            <div className="section-container relative z-10" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-mono text-accent-primary tracking-widest uppercase mb-4 block">
                        // My Journey
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Work <span className="gradient-text">Experience</span>
                    </h2>
                    <p className="mt-4 text-charcoal-300 max-w-xl mx-auto text-lg">
                        A timeline of my growth as a developer
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1.5, ease: EASE }}
                        className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-accent-primary via-charcoal-600 to-transparent origin-top"
                    />

                    <div className="space-y-12 md:space-y-16">
                        {experiences.map((exp, i) => {
                            const isLeft = i % 2 !== 0;
                            return (
                                <div key={exp.title} className="relative">
                                    {/* Timeline dot */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={isInView ? { scale: 1 } : {}}
                                        transition={{ duration: 0.4, delay: 0.3 + i * 0.2, ease: EASE }}
                                        className={`absolute left-4 md:left-1/2 -translate-x-1/2 top-7 w-4 h-4 rounded-full border-2 z-10 ${exp.current
                                            ? "bg-accent-primary border-accent-primary shadow-[0_0_16px_rgba(167,139,250,0.4)]"
                                            : "bg-charcoal-700 border-charcoal-500"
                                            }`}
                                    />

                                    {/* Card wrapper */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.7, delay: 0.4 + i * 0.2, ease: EASE }}
                                        className={`ml-12 md:ml-0 md:w-[calc(50%-32px)] ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}
                                    >
                                        <motion.div
                                            whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(167,139,250,0.08)" }}
                                            transition={{ duration: 0.3 }}
                                            className="glass-card p-5 sm:p-6 cursor-default"
                                        >
                                            {exp.current && (
                                                <motion.span
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                                    transition={{ duration: 0.4, delay: 0.6 + i * 0.2 }}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-accent-primary/15 text-accent-primary border border-accent-primary/30 mb-3"
                                                >
                                                    <span className="w-1.5 h-1.5 bg-accent-primary rounded-full pulse-dot" />
                                                    Current
                                                </motion.span>
                                            )}
                                            <h3 className="text-lg sm:text-xl font-bold text-white">{exp.title}</h3>
                                            <p className="text-accent-primary font-medium mt-1 text-sm sm:text-base">{exp.company}</p>
                                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm text-charcoal-400">
                                                <span className="flex items-center gap-1.5">
                                                    <FiCalendar className="text-xs" /> {exp.period}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <FiMapPin className="text-xs" /> {exp.location}
                                                </span>
                                            </div>
                                            <p className="mt-4 text-charcoal-300 text-sm leading-relaxed">{exp.description}</p>
                                            <ul className="mt-4 space-y-2">
                                                {exp.highlights.map((h, j) => (
                                                    <motion.li
                                                        key={h}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                                        transition={{ duration: 0.4, delay: 0.6 + i * 0.2 + j * 0.08 }}
                                                        className="flex items-start gap-2 text-sm text-charcoal-200"
                                                    >
                                                        <span className="w-1.5 h-1.5 bg-accent-primary rounded-full mt-1.5 shrink-0" />
                                                        {h}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
