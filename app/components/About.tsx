"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiCode, FiZap, FiCoffee, FiHeart } from "react-icons/fi";
import DiscordProfile from "./DiscordProfile";
import { PurpleFlare } from "./Effects";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const stats = [
    { icon: FiCode, value: "50+", label: "Projects Built" },
    { icon: FiZap, value: "3+", label: "Years Experience" },
    { icon: FiCoffee, value: "1000+", label: "Cups of Coffee" },
    { icon: FiHeart, value: "20+", label: "Happy Clients" },
];

const slideLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

const slideRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2, ease: EASE } },
};

const staggerUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: 0.5 + i * 0.1, ease: EASE },
    }),
};

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="about" className="relative overflow-hidden">
            <PurpleFlare className="top-1/4 -right-20" size={450} delay={0.3} />
            <PurpleFlare className="bottom-0 -left-20" size={350} delay={0.6} />
            <div className="section-container relative z-10">
                <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <motion.div
                        variants={slideLeft}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <span className="text-sm font-mono text-accent-primary tracking-widest uppercase mb-4 block">
              // About Me
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            Passionate about{" "}
                            <span className="gradient-text">crafting code</span>
                        </h2>
                        <div className="space-y-4 text-charcoal-300 leading-relaxed text-lg">
                            <p>
                                Hey! I&apos;m <strong className="text-white">xylen</strong> (aka{" "}
                                <strong className="text-white">ζ͜͡Ð R Λ X ! T Y</strong>) — a full-stack
                                developer who loves turning ambitious ideas into elegant,
                                high-performance applications. From interactive web experiences
                                to powerful Discord bots, I bring creativity and precision to
                                every project.
                            </p>
                            <p>
                                My journey started with tinkering on small scripts and has
                                evolved into building complex systems that serve thousands of
                                users. I specialize in <strong className="text-white">React</strong>,{" "}
                                <strong className="text-white">Next.js</strong>,{" "}
                                <strong className="text-white">Node.js</strong>, and{" "}
                                <strong className="text-white">Python</strong>, with a deep
                                passion for open-source contribution and community building.
                            </p>
                            <p>
                                When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                                contributing to open source projects, or helping others learn to code.
                            </p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-8 flex flex-wrap gap-3"
                        >
                            {["Full-Stack Dev", "Open Source", "Bot Developer", "UI/UX"].map((tag) => (
                                <span key={tag} className="px-4 py-2 rounded-full text-sm font-medium bg-charcoal-800 border border-white/5 text-charcoal-200 hover:border-accent-primary/30 transition-colors duration-300">
                                    {tag}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={slideRight}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="space-y-6 flex flex-col items-center lg:items-start"
                    >
                        <DiscordProfile />

                        <div className="grid grid-cols-2 gap-4 w-full max-w-[340px]">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    variants={staggerUp}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    custom={i}
                                    whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.4), 0 0 20px rgba(167,139,250,0.1)" }}
                                    className="glass-card p-5 text-center cursor-default transition-all duration-300 group"
                                >
                                    <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                                        <stat.icon className="text-accent-primary text-xl mx-auto mb-2" />
                                    </motion.div>
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-sm text-charcoal-400 mt-1">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
