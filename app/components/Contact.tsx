"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FiSend, FiMail, FiMapPin, FiClock, FiGithub, FiTwitter, FiLinkedin, FiAlertCircle } from "react-icons/fi";
import { SiDiscord } from "react-icons/si";
import { PurpleFlare } from "./Effects";

const contactInfo = [
    { icon: FiMail, label: "Email", value: "hello@zeon.dev", href: "mailto:hello@zeon.dev" },
    { icon: FiMapPin, label: "Location", value: "India 🇮🇳", href: null },
    { icon: FiClock, label: "Timezone", value: "IST (UTC +5:30)", href: null },
];

const socials = [
    { icon: FiGithub, label: "GitHub", href: "https://github.com/xylen-py" },
    { icon: SiDiscord, label: "Discord", href: "#" },
    { icon: FiTwitter, label: "Twitter", href: "https://twitter.com" },
    { icon: FiLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formState),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatus("success");
                setFormState({ name: "", email: "", message: "" });
                setTimeout(() => setStatus("idle"), 4000);
            } else {
                setStatus("error");
                setErrorMsg(data.error || "Something went wrong.");
                setTimeout(() => setStatus("idle"), 4000);
            }
        } catch {
            setStatus("error");
            setErrorMsg("Network error. Please try again.");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    return (
        <section id="contact" className="relative overflow-hidden">
            <PurpleFlare className="top-1/3 -left-20" size={400} delay={0.2} />
            <PurpleFlare className="bottom-20 -right-20" size={350} delay={0.5} />
            <div className="section-container relative z-10" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-mono text-accent-primary tracking-widest uppercase mb-4 block">
            // Get in Touch
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Let&apos;s Work <span className="gradient-text">Together</span>
                    </h2>
                    <p className="mt-4 text-charcoal-300 max-w-xl mx-auto text-lg">
                        Have a project in mind? I&apos;d love to hear about it. Drop me a message
                        and let&apos;s create something amazing.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {contactInfo.map((info, i) => (
                            <motion.div
                                key={info.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-12 h-12 rounded-xl bg-charcoal-800 border border-white/5 flex items-center justify-center text-accent-primary">
                                    <info.icon className="text-lg" />
                                </div>
                                <div>
                                    <div className="text-xs text-charcoal-400 uppercase tracking-wider">{info.label}</div>
                                    {info.href ? (
                                        <a href={info.href} className="text-white font-medium hover:text-accent-primary transition-colors">{info.value}</a>
                                    ) : (
                                        <div className="text-white font-medium">{info.value}</div>
                                    )}
                                </div>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.6 }}
                            className="pt-6 border-t border-white/5"
                        >
                            <p className="text-sm text-charcoal-400 mb-4">Find me on</p>
                            <div className="flex gap-3">
                                {socials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        className="w-11 h-11 rounded-xl bg-charcoal-800 border border-white/5 flex items-center justify-center text-charcoal-300 hover:border-accent-primary hover:text-accent-primary hover:shadow-[0_0_20px_rgba(167,139,250,0.15)] transition-all duration-300"
                                    >
                                        <s.icon className="text-lg" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:col-span-3"
                    >
                        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="contact-name" className="block text-sm text-charcoal-300 mb-2">Name</label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-charcoal-800 border border-white/5 text-white placeholder:text-charcoal-500 focus:outline-none focus:border-accent-primary focus:shadow-[0_0_20px_rgba(167,139,250,0.15)] transition-all duration-300"
                                        placeholder="Your name"
                                        disabled={status === "sending"}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="block text-sm text-charcoal-300 mb-2">Email</label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-charcoal-800 border border-white/5 text-white placeholder:text-charcoal-500 focus:outline-none focus:border-accent-primary focus:shadow-[0_0_20px_rgba(167,139,250,0.15)] transition-all duration-300"
                                        placeholder="you@email.com"
                                        disabled={status === "sending"}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="contact-message" className="block text-sm text-charcoal-300 mb-2">Message</label>
                                <textarea
                                    id="contact-message"
                                    required
                                    rows={5}
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-charcoal-800 border border-white/5 text-white placeholder:text-charcoal-500 focus:outline-none focus:border-accent-primary focus:shadow-[0_0_20px_rgba(167,139,250,0.15)] transition-all duration-300 resize-none"
                                    placeholder="Tell me about your project..."
                                    disabled={status === "sending"}
                                />
                            </div>

                            {status === "error" && (
                                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                                    <FiAlertCircle className="shrink-0" />
                                    {errorMsg}
                                </div>
                            )}

                            <motion.button
                                type="submit"
                                whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                                whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
                                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white transition-all duration-300 ${status === "success"
                                    ? "bg-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                                    : status === "sending"
                                        ? "bg-accent-primary/50 cursor-wait"
                                        : "bg-gradient-to-r from-accent-primary to-accent-tertiary hover:shadow-[0_0_40px_rgba(167,139,250,0.3)]"
                                    }`}
                                disabled={status === "sending" || status === "success"}
                            >
                                {status === "success" && <>✓ Message Sent!</>}
                                {status === "sending" && (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Sending...
                                    </>
                                )}
                                {(status === "idle" || status === "error") && <>Send Message <FiSend /></>}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
