"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { FiGithub, FiStar, FiGitBranch, FiExternalLink } from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface GitHubRepo {
    name: string;
    description: string;
    language: string;
    stars: number;
    forks: number;
    url: string;
}

interface GitHubData {
    repos: GitHubRepo[];
    totalStars: number;
    totalRepos: number;
    followers: number;
}

const GITHUB_USERNAME = "xylen-py";
const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: "#3178C6",
    JavaScript: "#F7DF1E",
    Python: "#3776AB",
    Go: "#00ADD8",
    Java: "#007396",
    Kotlin: "#7F52FF",
    HTML: "#E34F26",
    CSS: "#1572B6",
    Shell: "#89E051",
    Rust: "#DEA584",
};

const fallbackData: GitHubData = {
    repos: [
        { name: "member-recovery-api", description: "Serverless Discord member recovery API built with Hono & TypeScript", language: "TypeScript", stars: 12, forks: 3, url: `https://github.com/${GITHUB_USERNAME}/member-recovery-api` },
        { name: "vanityguard", description: "High-performance vanity URL protector for Discord servers", language: "Go", stars: 28, forks: 7, url: `https://github.com/${GITHUB_USERNAME}` },
        { name: "spotify-tokener", description: "Automated Spotify token generation and refresh service", language: "TypeScript", stars: 8, forks: 2, url: `https://github.com/${GITHUB_USERNAME}` },
        { name: "zeon-website", description: "Premium portfolio website with Next.js, Tailwind, and Framer Motion", language: "TypeScript", stars: 15, forks: 4, url: `https://github.com/${GITHUB_USERNAME}` },
        { name: "gaana-source", description: "Audio source extractor for Gaana music platform", language: "Java", stars: 6, forks: 1, url: `https://github.com/${GITHUB_USERNAME}` },
        { name: "transcript-viewer", description: "Discord transcript viewer API with beautiful rendering", language: "TypeScript", stars: 10, forks: 5, url: `https://github.com/${GITHUB_USERNAME}` },
    ],
    totalStars: 79,
    totalRepos: 25,
    followers: 48,
};

function ContributionGraph() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const weeks = 52;
    const days = 7;

    const cells = Array.from({ length: weeks * days }, (_, i) => {
        if (!mounted) return 0;
        const rand = Math.random();
        if (rand > 0.7) return Math.floor(Math.random() * 4) + 1;
        if (rand > 0.4) return Math.floor(Math.random() * 2) + 1;
        return 0;
    });

    const levels = [
        "bg-charcoal-700",
        "bg-[#0e4429]",
        "bg-[#006d32]",
        "bg-[#26a641]",
        "bg-[#39d353]",
    ];

    return (
        <div className="overflow-x-auto scrollbar-hide">
            <div className="grid grid-flow-col gap-[3px]" style={{ gridTemplateRows: `repeat(${days}, 1fr)` }}>
                {cells.map((level, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.2, delay: (i % weeks) * 0.015 }}
                        className={`w-[10px] h-[10px] rounded-[2px] ${levels[level]} transition-colors duration-200`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function GithubStats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const [data, setData] = useState<GitHubData>(fallbackData);
    const [hoveredRepo, setHoveredRepo] = useState<number | null>(null);

    const fetchGithub = useCallback(async () => {
        try {
            const res = await fetch(`/api/github`);
            if (res.ok) {
                const json = await res.json();
                if (json.success) setData(json.data);
            }
        } catch {
            // Use fallback data
        }
    }, []);

    useEffect(() => {
        fetchGithub();
    }, [fetchGithub]);

    const stats = [
        { label: "Repositories", value: data.totalRepos, icon: "📦" },
        { label: "Total Stars", value: data.totalStars, icon: "⭐" },
        { label: "Followers", value: data.followers, icon: "👥" },
    ];

    return (
        <section className="relative overflow-hidden">
            <div className="section-container relative z-10" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-mono text-accent-primary tracking-widest uppercase mb-4 block">
                        {"// Open Source"}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        GitHub <span className="gradient-text">Activity</span>
                    </h2>
                    <p className="mt-4 text-charcoal-300 max-w-xl mx-auto text-lg">
                        Contributing to the open source community, one commit at a time
                    </p>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                    className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: EASE }}
                            whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.4), 0 0 20px rgba(167,139,250,0.1)" }}
                            className="glass-card p-5 text-center cursor-default"
                        >
                            <div className="text-2xl mb-2">{stat.icon}</div>
                            <motion.div
                                className="text-3xl font-bold text-white font-mono"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.5 + i * 0.1 }}
                            >
                                {stat.value}+
                            </motion.div>
                            <div className="text-xs text-charcoal-400 mt-1 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Contribution Graph */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                    className="glass-card p-6 mb-12"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-charcoal-200 flex items-center gap-2">
                            <FiGithub className="text-accent-primary" />
                            Contribution Activity
                        </h3>
                        <a
                            href={`https://github.com/${GITHUB_USERNAME}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-charcoal-400 hover:text-accent-primary transition-colors flex items-center gap-1"
                        >
                            @{GITHUB_USERNAME} <FiExternalLink className="text-[10px]" />
                        </a>
                    </div>
                    <ContributionGraph />
                    <div className="flex items-center justify-end gap-1.5 mt-3">
                        <span className="text-[10px] text-charcoal-500">Less</span>
                        {["bg-charcoal-700", "bg-[#0e4429]", "bg-[#006d32]", "bg-[#26a641]", "bg-[#39d353]"].map(
                            (bg, i) => (
                                <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${bg}`} />
                            )
                        )}
                        <span className="text-[10px] text-charcoal-500">More</span>
                    </div>
                </motion.div>

                {/* Repo Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.repos.map((repo, i) => (
                        <motion.a
                            key={repo.name}
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease: EASE }}
                            onHoverStart={() => setHoveredRepo(i)}
                            onHoverEnd={() => setHoveredRepo(null)}
                            whileHover={{ y: -4 }}
                            className="glass-card p-5 group cursor-pointer block"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <FiGithub className="text-charcoal-400 group-hover:text-accent-primary transition-colors" />
                                    <span className="text-sm font-semibold text-white group-hover:text-accent-primary transition-colors truncate">
                                        {repo.name}
                                    </span>
                                </div>
                                <motion.div
                                    animate={hoveredRepo === i ? { rotate: -45 } : { rotate: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FiExternalLink className="text-charcoal-500 text-sm" />
                                </motion.div>
                            </div>
                            <p className="text-xs text-charcoal-400 leading-relaxed mb-4 line-clamp-2">
                                {repo.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-charcoal-500">
                                <span className="flex items-center gap-1.5">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full"
                                        style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || "#6a6a6a" }}
                                    />
                                    {repo.language}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FiStar className="text-[10px]" /> {repo.stars}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FiGitBranch className="text-[10px]" /> {repo.forks}
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
