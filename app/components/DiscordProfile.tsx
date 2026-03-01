"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface Badge {
    name: string;
    icon_url: string;
}

interface DiscordUser {
    id: string;
    username: string;
    display_name: string;
    avatar_url: string;
    banner_url: string | null;
    banner_color: string | null;
    accent_color: number | null;
    avatar_decoration_url: string | null;
    profile_effect_url: string | null;
    bio: string | null;
    theme_colors: number[] | null;
    badges: Badge[];
    created_at: string;
}

const DISCORD_USER_ID = "1270759337916104708";

function StatusDot() {
    return (
        <div className="absolute -bottom-0.5 -right-0.5 w-[24px] h-[24px] rounded-full flex items-center justify-center" style={{ background: "#232428" }}>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, duration: 0.3, ease: EASE }}
                className="w-[16px] h-[16px] rounded-full bg-[#23a55a] relative"
            >
                <motion.div
                    animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-[#23a55a]"
                />
            </motion.div>
        </div>
    );
}

function ActivityBar() {
    const activities = ["Coding with VS Code", "Building APIs", "Listening to Spotify"];
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setIdx((p) => (p + 1) % activities.length), 3000);
        return () => clearInterval(timer);
    }, [activities.length]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.4 }}
            className="mt-3 bg-[#1e1f22] rounded-lg px-3 py-2.5 border border-[#2e2f34]/50"
        >
            <p className="text-[10px] font-bold text-[#b5bac1] uppercase tracking-wide mb-1">Playing</p>
            <AnimatePresence mode="wait">
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                >
                    <div className="w-6 h-6 rounded bg-[#5865f2]/20 flex items-center justify-center shrink-0">
                        <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-[#5865f2]"
                        />
                    </div>
                    <span className="text-[12px] text-[#dbdee1] truncate">{activities[idx]}</span>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

export default function DiscordProfile() {
    const [user, setUser] = useState<DiscordUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);
    const [failedBadges, setFailedBadges] = useState<Set<string>>(new Set());
    const [bannerHovered, setBannerHovered] = useState(false);

    const handleBadgeError = useCallback((name: string) => {
        setFailedBadges((prev) => new Set(prev).add(name));
    }, []);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch(`/api/discord/${DISCORD_USER_ID}`);
                const data = await res.json();
                if (data.success) setUser(data.user);
                else setError(true);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="w-full max-w-[360px] rounded-xl overflow-hidden shadow-2xl"
                style={{ background: "#232428" }}
            >
                <div className="h-[120px] bg-[#111214] relative overflow-hidden">
                    <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1e1f22]/60 to-transparent"
                    />
                </div>
                <div className="px-4 pb-4 pt-0">
                    <div className="w-[84px] h-[84px] rounded-full bg-[#111214] -mt-[42px] border-[6px] border-[#232428] animate-pulse" />
                    <div className="bg-[#111214] rounded-lg p-3 mt-3 space-y-3">
                        <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} className="h-4 w-32 bg-[#1e1f22] rounded" />
                        <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="h-3 w-20 bg-[#1e1f22] rounded" />
                        <div className="h-px w-full bg-[#2e2f34]" />
                        <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} className="h-3 w-full bg-[#1e1f22] rounded" />
                        <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} className="h-3 w-3/4 bg-[#1e1f22] rounded" />
                    </div>
                </div>
            </motion.div>
        );
    }

    if (error || !user) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="w-full max-w-[360px] rounded-xl overflow-hidden p-8 text-center shadow-2xl"
                style={{ background: "#232428" }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 rounded-full bg-[#111214] mx-auto mb-4 flex items-center justify-center"
                >
                    <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
                        <path d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461742 10.3416 0C8.49084 0.318797 6.68674 0.879656 4.97501 1.67671C0.714093 7.77895 -0.437503 13.7222 0.137272 19.5864C2.18326 21.1163 4.49157 22.2564 6.94651 22.9553C7.48277 22.2267 7.9626 21.4548 8.37924 20.6462C7.60366 20.3635 6.85534 20.0155 6.14256 19.6048C6.33863 19.4604 6.5304 19.3117 6.71406 19.163C11.3913 21.3522 16.6489 21.3522 21.2862 19.163C21.4699 19.3117 21.6616 19.4604 21.8577 19.6048C21.1449 20.0155 20.3966 20.3635 19.621 20.6462C20.0377 21.4548 20.5175 22.2267 21.0537 22.9553C23.5088 22.2564 25.817 21.1163 27.8629 19.5864C28.5346 12.7739 26.9454 6.88458 23.0212 1.67671Z" fill="#5865F2" />
                    </svg>
                </motion.div>
                <p className="text-[#b5bac1] text-sm font-medium">Discord profile unavailable</p>
                <p className="text-[#80848e] text-xs mt-1">Add DISCORD_BOT_TOKEN to .env.local</p>
            </motion.div>
        );
    }

    const accentHex = user.accent_color ? `#${user.accent_color.toString(16).padStart(6, "0")}` : "#5865F2";
    const bannerBg = user.banner_color || accentHex;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            whileHover={{ y: -6 }}
            className="w-full max-w-[360px] rounded-xl overflow-hidden group relative"
            style={{ background: "#232428" }}
        >
            <motion.div
                animate={{ opacity: [0, 0.15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-px rounded-xl pointer-events-none"
                style={{
                    background: "linear-gradient(135deg, rgba(167,139,250,0.3), transparent 40%, transparent 60%, rgba(88,101,242,0.3))",
                    filter: "blur(1px)",
                }}
            />
            <div className="relative rounded-xl overflow-hidden" style={{ background: "#232428" }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="h-[120px] relative overflow-hidden cursor-pointer"
                    onMouseEnter={() => setBannerHovered(true)}
                    onMouseLeave={() => setBannerHovered(false)}
                >
                    {user.banner_url ? (
                        <motion.div animate={{ scale: bannerHovered ? 1.08 : 1 }} transition={{ duration: 0.6 }} className="absolute inset-0">
                            <Image src={user.banner_url} alt="" fill className="object-cover" unoptimized />
                        </motion.div>
                    ) : (
                        <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${bannerBg}, ${bannerBg}aa)` }} />
                    )}
                    {user.profile_effect_url && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="absolute inset-0">
                            <Image src={user.profile_effect_url} alt="" fill className="object-cover pointer-events-none mix-blend-screen" unoptimized />
                        </motion.div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#232428] via-[#232428]/20 to-transparent" />
                    <motion.div
                        animate={{ x: bannerHovered ? "100%" : "-100%" }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                    />
                </motion.div>

                <div className="relative px-4 pb-4">
                    <div className="flex justify-between items-start -mt-[42px]">
                        <div className="relative">
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
                                className="w-[84px] h-[84px] rounded-full border-[6px] border-[#232428] overflow-hidden relative bg-[#111214]"
                            >
                                <Image src={user.avatar_url} alt={user.display_name} fill className="object-cover" unoptimized />
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />
                            </motion.div>
                            {user.avatar_decoration_url && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0, rotate: -20 }}
                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                    transition={{ delay: 0.6, duration: 0.5, ease: EASE }}
                                    className="absolute -top-[10px] -left-[10px]"
                                >
                                    <Image src={user.avatar_decoration_url} alt="" width={104} height={104} className="w-[104px] h-[104px] pointer-events-none" unoptimized />
                                </motion.div>
                            )}
                            <StatusDot />
                        </div>

                        {user.badges.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7, duration: 0.5, ease: EASE }}
                                className="mt-[50px] flex items-center gap-1 bg-[#111214] rounded-lg px-2 py-1.5 overflow-hidden"
                            >
                                {user.badges.map((badge, idx) => (
                                    <motion.div
                                        key={badge.name}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.8 + idx * 0.06, duration: 0.3, type: "spring", stiffness: 300 }}
                                        className="relative cursor-pointer shrink-0"
                                        onMouseEnter={() => setHoveredBadge(badge.name)}
                                        onMouseLeave={() => setHoveredBadge(null)}
                                    >
                                        {!failedBadges.has(badge.name) ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={badge.icon_url}
                                                alt={badge.name}
                                                width={22}
                                                height={22}
                                                className="w-[22px] h-[22px] hover:scale-125 transition-transform duration-200"
                                                onError={() => handleBadgeError(badge.name)}
                                            />
                                        ) : (
                                            <div className="w-[22px] h-[22px] rounded bg-[#5865f2]/30 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-[#5865f2]" />
                                            </div>
                                        )}
                                        <AnimatePresence>
                                            {hoveredBadge === badge.name && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 6, scale: 0.9 }}
                                                    transition={{ duration: 0.12 }}
                                                    className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#111214] text-white text-[11px] font-semibold px-3 py-1.5 rounded-md shadow-xl z-50 pointer-events-none border border-[#2e2f34]"
                                                >
                                                    {badge.name}
                                                    <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] bg-[#111214] rotate-45 border-r border-b border-[#2e2f34]" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5, ease: EASE }}
                        className="mt-3 bg-[#111214] rounded-lg p-3"
                    >
                        <div className="flex items-center gap-2">
                            <motion.h3
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7, duration: 0.4 }}
                                className="text-[16px] font-bold text-white leading-tight"
                            >
                                {user.display_name}
                            </motion.h3>
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.9, type: "spring", stiffness: 300 }}
                                className="text-[9px] px-1.5 py-0.5 rounded bg-[#5865f2] text-white font-bold uppercase"
                            >
                                Profile
                            </motion.span>
                        </div>
                        <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.75, duration: 0.4 }}
                            className="text-[13px] text-[#b5bac1] mt-0.5"
                        >
                            {user.username}
                        </motion.p>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.85, duration: 0.5, ease: EASE }}
                            className="w-full h-px bg-[#2e2f34] my-3 origin-left"
                        />

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.4 }}>
                            <p className="text-[11px] font-bold text-[#b5bac1] uppercase tracking-wide mb-1.5">About Me</p>
                            <p className="text-[13px] text-[#dbdee1] leading-relaxed whitespace-pre-wrap">
                                {user.bio || "It's ζ͜͡Ð R Λ X ! T Y here"}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1.0, duration: 0.5, ease: EASE }}
                            className="w-full h-px bg-[#2e2f34] my-3 origin-left"
                        />

                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.4 }}>
                            <p className="text-[11px] font-bold text-[#b5bac1] uppercase tracking-wide mb-1.5">Member Since</p>
                            <div className="flex items-center gap-2.5 text-[13px] text-[#dbdee1]">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3 4.9 3 6V20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z" fill="#b5bac1" />
                                </svg>
                                {new Date(user.created_at).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                                <span className="text-[#4e5058]">•</span>
                                <svg width="14" height="14" viewBox="0 0 28 28" fill="none">
                                    <path d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461742 10.3416 0C8.49084 0.318797 6.68674 0.879656 4.97501 1.67671C0.714093 7.77895 -0.437503 13.7222 0.137272 19.5864C2.18326 21.1163 4.49157 22.2564 6.94651 22.9553C7.48277 22.2267 7.9626 21.4548 8.37924 20.6462C7.60366 20.3635 6.85534 20.0155 6.14256 19.6048C6.33863 19.4604 6.5304 19.3117 6.71406 19.163C11.3913 21.3522 16.6489 21.3522 21.2862 19.163C21.4699 19.3117 21.6616 19.4604 21.8577 19.6048C21.1449 20.0155 20.3966 20.3635 19.621 20.6462C20.0377 21.4548 20.5175 22.2267 21.0537 22.9553C23.5088 22.2564 25.817 21.1163 27.8629 19.5864C28.5346 12.7739 26.9454 6.88458 23.0212 1.67671Z" fill="#5865F2" />
                                </svg>
                            </div>
                        </motion.div>

                        <ActivityBar />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
