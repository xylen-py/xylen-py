"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { FiChevronLeft, FiChevronRight, FiStar, FiMessageCircle } from "react-icons/fi";
import { PurpleFlare } from "./Effects";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const testimonials = [
    {
        name: "Alex Morgan",
        role: "Project Manager",
        avatar: "AM",
        content:
            "Absolutely incredible work! The attention to detail and code quality was beyond anything we expected. Our Discord bot handles thousands of users flawlessly.",
        rating: 5,
        project: "Discord Bot Development",
        gradient: "from-violet-500 to-purple-600",
    },
    {
        name: "Sarah Chen",
        role: "Startup Founder",
        avatar: "SC",
        content:
            "The API architecture was clean, performant, and well-documented. Delivered ahead of schedule with zero bugs in production. Highly recommend!",
        rating: 5,
        project: "REST API Design",
        gradient: "from-blue-500 to-cyan-600",
    },
    {
        name: "Marcus K.",
        role: "Community Manager",
        avatar: "MK",
        content:
            "VanityGuard saved our server multiple times. The response time is insane — it recovers vanity URLs in milliseconds. A must-have for any large Discord server.",
        rating: 5,
        project: "VanityGuard Tool",
        gradient: "from-emerald-500 to-teal-600",
    },
    {
        name: "Priya Sharma",
        role: "Full-Stack Developer",
        avatar: "PS",
        content:
            "Working with xylen was a great experience. Their understanding of modern web technologies and clean code practices made collaboration seamless.",
        rating: 5,
        project: "Web Application",
        gradient: "from-rose-500 to-pink-600",
    },
    {
        name: "David Liu",
        role: "Tech Lead",
        avatar: "DL",
        content:
            "The portfolio website they built exceeded all expectations. Smooth animations, blazing-fast performance, and a design that truly stands out. 10/10.",
        rating: 5,
        project: "Portfolio Website",
        gradient: "from-amber-500 to-orange-600",
    },
];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
                <FiStar
                    key={i}
                    className={`w-3.5 h-3.5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-charcoal-600"}`}
                />
            ))}
        </div>
    );
}

export default function Testimonials() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const next = useCallback(() => {
        setDirection(1);
        setActive((prev) => (prev + 1) % testimonials.length);
    }, []);

    const prev = useCallback(() => {
        setDirection(-1);
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, []);

    useEffect(() => {
        intervalRef.current = setInterval(next, 5000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [next]);

    const resetTimer = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(next, 5000);
    }, [next]);

    const handleNext = () => { next(); resetTimer(); };
    const handlePrev = () => { prev(); resetTimer(); };

    const variants = {
        enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
        center: { x: 0, opacity: 1, scale: 1 },
        exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0, scale: 0.9 }),
    };

    return (
        <section className="relative overflow-hidden">
            <PurpleFlare className="top-0 right-1/4" size={400} delay={0.3} />
            <PurpleFlare className="bottom-0 left-1/3" size={350} delay={0.6} />

            <div className="section-container relative z-10" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-mono text-accent-primary tracking-widest uppercase mb-4 block">
                        // What People Say
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Client <span className="gradient-text">Testimonials</span>
                    </h2>
                    <p className="mt-4 text-charcoal-300 max-w-xl mx-auto text-lg">
                        Feedback from people I&apos;ve had the pleasure of working with
                    </p>
                </motion.div>

                <div className="relative max-w-3xl mx-auto">
                    <div className="relative min-h-[280px] flex items-center justify-center">
                        <AnimatePresence custom={direction} mode="wait">
                            <motion.div
                                key={active}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.5, ease: EASE }}
                                className="glass-card p-8 md:p-10 w-full absolute"
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <div
                                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonials[active].gradient} flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg`}
                                    >
                                        {testimonials[active].avatar}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-white">
                                            {testimonials[active].name}
                                        </h4>
                                        <p className="text-sm text-charcoal-400">
                                            {testimonials[active].role}
                                        </p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <StarRating rating={testimonials[active].rating} />
                                            <span className="text-xs text-charcoal-500 font-mono">
                                                {testimonials[active].project}
                                            </span>
                                        </div>
                                    </div>
                                    <FiMessageCircle className="text-accent-primary/30 text-3xl shrink-0" />
                                </div>

                                <blockquote className="text-charcoal-200 text-lg leading-relaxed italic">
                                    &ldquo;{testimonials[active].content}&rdquo;
                                </blockquote>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex items-center justify-center gap-4 mt-8"
                    >
                        <motion.button
                            onClick={handlePrev}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-xl bg-charcoal-800 border border-white/5 flex items-center justify-center text-charcoal-300 hover:text-accent-primary hover:border-accent-primary/30 transition-all duration-300"
                            aria-label="Previous testimonial"
                        >
                            <FiChevronLeft />
                        </motion.button>

                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setDirection(i > active ? 1 : -1);
                                        setActive(i);
                                        resetTimer();
                                    }}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === active
                                        ? "bg-accent-primary w-8 shadow-[0_0_10px_rgba(167,139,250,0.4)]"
                                        : "bg-charcoal-600 hover:bg-charcoal-400"
                                        }`}
                                    aria-label={`Testimonial ${i + 1}`}
                                />
                            ))}
                        </div>

                        <motion.button
                            onClick={handleNext}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-xl bg-charcoal-800 border border-white/5 flex items-center justify-center text-charcoal-300 hover:text-accent-primary hover:border-accent-primary/30 transition-all duration-300"
                            aria-label="Next testimonial"
                        >
                            <FiChevronRight />
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
