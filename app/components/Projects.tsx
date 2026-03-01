"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { FiExternalLink, FiGithub, FiStar } from "react-icons/fi";
import { PurpleFlare } from "./Effects";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const projects = [
    {
        title: "Member Recovery API",
        description: "Serverless Discord member recovery API built with Hono & TypeScript. OAuth2-based member restoration with Turso DB and Vercel Edge.",
        tags: ["Hono", "TypeScript", "Turso", "Vercel Edge"],
        category: "Backend API",
        github: "https://github.com/xylen-py/member-recovery-api",
        live: null,
        stars: "⭐",
        gradient: "from-violet-500/20 to-purple-500/20",
        accentColor: "#a78bfa",
    },
    {
        title: "VanityGuard",
        description: "High-performance vanity URL protector for Discord servers with TLS fingerprinting, MFA bypass, and Gateway WebSocket monitoring.",
        tags: ["Go", "WebSocket", "TLS", "Discord API"],
        category: "Security Tool",
        github: "https://github.com/xylen-py",
        live: null,
        stars: "⭐",
        gradient: "from-emerald-500/20 to-teal-500/20",
        accentColor: "#10b981",
    },
    {
        title: "Portfolio Website",
        description: "This premium charcoal-black portfolio with fullstack APIs, Discord profile integration, and Framer Motion animations.",
        tags: ["Next.js 16", "React 19", "Tailwind v4", "Framer Motion"],
        category: "Web App",
        github: "https://github.com/xylen-py",
        live: "#",
        stars: "New",
        gradient: "from-blue-500/20 to-cyan-500/20",
        accentColor: "#3b82f6",
    },
    {
        title: "Gaana API",
        description: "Audio source extractor for Gaana music platform with search support, playlist loading, and high-quality stream extraction.",
        tags: ["Java", "Kotlin", "REST API", "Audio"],
        category: "Plugin",
        github: "https://github.com/xylen-py",
        live: null,
        stars: "⭐",
        gradient: "from-rose-500/20 to-pink-500/20",
        accentColor: "#f43f5e",
    },
    {
        title: "Transcript Viewer",
        description: "Discord transcript viewer API with beautiful rendering, caching, and serverless deployment on Vercel Edge.",
        tags: ["TypeScript", "Hono", "Vercel", "HTML"],
        category: "Backend API",
        github: "https://github.com/xylen-py",
        live: null,
        stars: "⭐",
        gradient: "from-amber-500/20 to-orange-500/20",
        accentColor: "#f59e0b",
    },
    {
        title: "Spotify Tokener",
        description: "Automated Spotify token generation and refresh service for seamless music API integrations.",
        tags: ["TypeScript", "Spotify API", "OAuth2", "Vercel"],
        category: "Backend API",
        github: "https://github.com/xylen-py",
        live: null,
        stars: "⭐",
        gradient: "from-green-500/20 to-emerald-500/20",
        accentColor: "#22c55e",
    },
];

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const [activeFilter, setActiveFilter] = useState("All");

    const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

    return (
        <section id="projects" className="relative overflow-hidden">
            <PurpleFlare className="-top-20 left-1/3" size={450} delay={0.2} />
            <PurpleFlare className="bottom-20 -right-20" size={400} delay={0.5} />

            <div className="section-container relative z-10" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-mono text-accent-primary tracking-widest uppercase mb-4 block">
                        // Featured Work
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        My <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="mt-4 text-charcoal-300 max-w-xl mx-auto text-lg">
                        A showcase of things I&apos;ve built — from APIs to full-stack apps
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    {categories.map((cat) => (
                        <motion.button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeFilter === cat
                                ? "bg-accent-primary text-white shadow-[0_0_20px_rgba(167,139,250,0.2)]"
                                : "bg-charcoal-800 text-charcoal-300 border border-white/5 hover:border-charcoal-500 hover:text-white"
                                }`}
                        >
                            {activeFilter === cat && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 bg-accent-primary rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{cat}</span>
                        </motion.button>
                    ))}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, i) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                                layout
                                whileHover={{ y: -6 }}
                                className="glass-card group relative overflow-hidden transition-shadow duration-400"
                            >
                                <div className={`h-32 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                                    <div className="absolute inset-0 dot-grid opacity-20" />
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.08 }}
                                        className="absolute top-4 left-4"
                                    >
                                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-black/40 backdrop-blur-sm text-white/80 border border-white/10">
                                            {project.category}
                                        </span>
                                    </motion.div>
                                    <div className="absolute top-4 right-4 flex items-center gap-1 text-white/60 text-xs">
                                        <FiStar className="text-yellow-400" />
                                        {project.stars}
                                    </div>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                                    />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-primary transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-charcoal-300 leading-relaxed mb-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="px-2.5 py-1 text-xs font-mono rounded-md bg-charcoal-700 text-charcoal-200 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <motion.a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-charcoal-700 text-charcoal-200 hover:text-white hover:bg-charcoal-600 transition-all duration-300"
                                        >
                                            <FiGithub /> Code
                                        </motion.a>
                                        {project.live && (
                                            <motion.a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${project.accentColor}30` }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg text-white transition-all duration-300"
                                                style={{ background: `linear-gradient(135deg, ${project.accentColor}80, ${project.accentColor})` }}
                                            >
                                                <FiExternalLink /> Live
                                            </motion.a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
