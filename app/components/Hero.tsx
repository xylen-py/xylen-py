"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { FiArrowDownRight, FiGithub, FiTwitter, FiLinkedin, FiDownload } from "react-icons/fi";
import { SiDiscord } from "react-icons/si";
import { PurpleFlare, FloatingParticles, PulseRing } from "./Effects";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const slideUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay: i * 0.15, ease: EASE },
    }),
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, delay: 1.2 + i * 0.08, ease: EASE },
    }),
};

const roles = [
    "Full-Stack Developer",
    "Discord Bot Creator",
    "Open Source Contributor",
    "API Architect",
    "UI/UX Enthusiast",
];

function TypingEffect() {
    const [roleIdx, setRoleIdx] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const typeSpeed = 60;
    const deleteSpeed = 30;
    const pauseTime = 2000;

    const tick = useCallback(() => {
        const currentRole = roles[roleIdx];

        if (!isDeleting) {
            setText(currentRole.substring(0, text.length + 1));
            if (text.length + 1 === currentRole.length) {
                setTimeout(() => setIsDeleting(true), pauseTime);
                return;
            }
        } else {
            setText(currentRole.substring(0, text.length - 1));
            if (text.length - 1 === 0) {
                setIsDeleting(false);
                setRoleIdx((prev) => (prev + 1) % roles.length);
                return;
            }
        }
    }, [text, isDeleting, roleIdx]);

    useEffect(() => {
        const timer = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
        return () => clearTimeout(timer);
    }, [tick, isDeleting]);

    return (
        <span className="gradient-text">
            {text}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-[3px] h-[1em] bg-accent-primary ml-1 align-middle"
            />
        </span>
    );
}

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            <div className="absolute inset-0 dot-grid opacity-30" />

            <PurpleFlare className="-top-40 -right-40" size={600} delay={0} />
            <PurpleFlare className="-bottom-40 -left-40" size={500} delay={0.3} />
            <PurpleFlare className="top-1/3 left-1/4" size={300} delay={0.6} />
            <PurpleFlare className="bottom-1/4 right-1/4" size={250} delay={0.9} />

            <PulseRing className="top-1/4 right-1/3" delay={0} />
            <PulseRing className="bottom-1/3 left-1/4" delay={1.5} />

            <FloatingParticles count={25} />

            <div className="absolute inset-0 pointer-events-none">
                {[1 / 5, 2 / 5, 3 / 5, 4 / 5].map((pos, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: EASE }}
                        className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent origin-top"
                        style={{ left: `${pos * 100}%` }}
                    />
                ))}
            </div>

            <div className="section-container relative z-10 flex flex-col items-center text-center">
                <motion.div
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                    className="mb-8"
                >
                    <motion.div
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(167,139,250,0.15)" }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal-800 border border-white/5 text-sm text-charcoal-200"
                    >
                        <span className="w-2 h-2 bg-green-400 rounded-full pulse-dot" />
                        Available for new projects
                    </motion.div>
                </motion.div>

                <motion.h1
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] max-w-5xl"
                >
                    I build{" "}
                    <span className="gradient-text">digital</span>
                    <br />
                    experiences that
                    <br />
                    <span className="relative inline-block">
                        <span className="gradient-text">matter</span>
                        <motion.svg
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.2, delay: 1.2, ease: EASE }}
                            className="absolute -bottom-2 left-0 w-full"
                            viewBox="0 0 200 12"
                            fill="none"
                        >
                            <motion.path
                                d="M2 10 C50 2, 150 2, 198 10"
                                stroke="url(#underlineGrad)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                fill="none"
                            />
                            <defs>
                                <linearGradient id="underlineGrad" x1="0" y1="0" x2="200" y2="0">
                                    <stop offset="0%" stopColor="#a78bfa" />
                                    <stop offset="100%" stopColor="#c084fc" />
                                </linearGradient>
                            </defs>
                        </motion.svg>
                    </span>
                </motion.h1>

                {/* Typing roles */}
                <motion.div
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                    custom={1.5}
                    className="mt-6 text-xl md:text-2xl font-mono font-medium h-10"
                >
                    <TypingEffect />
                </motion.div>

                <motion.p
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                    className="mt-6 text-lg md:text-xl text-charcoal-300 max-w-2xl leading-relaxed"
                >
                    Full-Stack Developer &amp; Open Source Creator crafting premium web
                    applications, Discord bots, and tools that push boundaries.
                </motion.p>

                <motion.div
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                    custom={3}
                    className="mt-12 flex flex-col sm:flex-row items-center gap-4"
                >
                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(167,139,250,0.3)" }}
                        whileTap={{ scale: 0.97 }}
                        className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-accent-primary to-accent-tertiary text-white font-semibold text-base transition-all duration-300"
                    >
                        View My Work
                        <FiArrowDownRight className="text-xl group-hover:rotate-45 transition-transform duration-300" />
                    </motion.a>
                    <motion.a
                        href="#about"
                        whileHover={{ scale: 1.05, borderColor: "rgba(167,139,250,0.4)" }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-charcoal-700 text-charcoal-300 font-medium text-sm hover:text-white hover:border-accent-primary/30 transition-all duration-300"
                    >
                        <FiDownload className="text-base" /> Resume
                    </motion.a>
                </motion.div>

                <div className="mt-16 flex items-center gap-4">
                    {[
                        { icon: FiGithub, href: "https://github.com/xylen-py", label: "GitHub" },
                        { icon: SiDiscord, href: "#", label: "Discord" },
                        { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
                        { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
                    ].map((social, i) => (
                        <motion.a
                            key={social.label}
                            variants={scaleIn}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            whileHover={{ scale: 1.15, y: -2, boxShadow: "0 0 25px rgba(167,139,250,0.2)" }}
                            whileTap={{ scale: 0.95 }}
                            className="w-11 h-11 rounded-xl bg-charcoal-800 border border-white/5 flex items-center justify-center text-charcoal-300 hover:text-accent-primary hover:border-accent-primary transition-colors duration-300"
                        >
                            <social.icon className="text-lg" />
                        </motion.a>
                    ))}
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-6 h-10 rounded-full border-2 border-charcoal-600 flex items-start justify-center p-1.5"
                    >
                        <motion.div
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1.5 h-1.5 bg-accent-primary rounded-full"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
