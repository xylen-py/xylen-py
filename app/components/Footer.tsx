"use client";

import { FiGithub, FiTwitter, FiLinkedin, FiHeart, FiArrowUp } from "react-icons/fi";
import { SiDiscord } from "react-icons/si";
import XylenLogo from "./XylenLogo";

const footerLinks = [
    {
        title: "Navigation",
        links: [
            { label: "Home", href: "#home" },
            { label: "About", href: "#about" },
            { label: "Skills", href: "#skills" },
            { label: "Projects", href: "#projects" },
            { label: "Experience", href: "#experience" },
            { label: "Contact", href: "#contact" },
        ],
    },
    {
        title: "Socials",
        links: [
            { label: "GitHub", href: "https://github.com/xylen-py" },
            { label: "Discord", href: "#" },
            { label: "Twitter", href: "https://twitter.com" },
            { label: "LinkedIn", href: "https://linkedin.com" },
        ],
    },
];

const socialIcons = [
    { icon: FiGithub, href: "https://github.com/xylen-py", label: "GitHub" },
    { icon: SiDiscord, href: "#", label: "Discord" },
    { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const CURRENT_YEAR = 2026;

export default function Footer() {
    return (
        <footer className="relative border-t border-white/5 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent" />
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <a href="#home" className="inline-block mb-4">
                            <XylenLogo width={100} height={40} className="opacity-80 hover:opacity-100 transition-opacity duration-300" />
                        </a>
                        <p className="text-sm text-charcoal-400 leading-relaxed max-w-xs">
                            Full-Stack Developer crafting premium digital experiences. Open source enthusiast & Discord bot creator.
                        </p>
                        <div className="flex gap-3 mt-6">
                            {socialIcons.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="w-9 h-9 rounded-lg bg-charcoal-800 border border-white/5 flex items-center justify-center text-charcoal-400 hover:text-accent-primary hover:border-accent-primary transition-all duration-300"
                                >
                                    <s.icon className="text-sm" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">{section.title}</h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} className="text-sm text-charcoal-400 hover:text-accent-primary transition-colors animated-underline">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-charcoal-500 flex items-center gap-1">
                        © {CURRENT_YEAR} .1xylen. Built with <FiHeart className="text-red-500 text-xs" /> &amp; Next.js
                    </p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="flex items-center gap-2 text-sm text-charcoal-400 hover:text-accent-primary transition-colors"
                        aria-label="Back to top"
                    >
                        Back to top <FiArrowUp />
                    </button>
                </div>
            </div>
        </footer>
    );
}
