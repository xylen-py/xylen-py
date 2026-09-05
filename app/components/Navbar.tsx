"use client";

import { useState, useEffect } from "react";
import { getDiscordProfile } from "../actions/discord";
import { FiGithub } from "react-icons/fi";
import { SiDiscord } from "react-icons/si";
import Loader from "./Loader";

export default function Navbar() {
    const [profile, setProfile] = useState<{ avatar: string; name: string; decoration?: string } | null>(null);
    const [status, setStatus] = useState("offline");

    const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "xylen-py";
    const userId = process.env.NEXT_PUBLIC_USER_ID || "1356648920389783724";

    useEffect(() => {
        getDiscordProfile().then((res) => {
            if (res.success && res.user) {
                const u = res.user;
                setProfile({
                    avatar: u.display_avatar?.url || u.avatar?.url || "https://cdn.discordapp.com/embed/avatars/0.png",
                    name: u.display_name || u.name,
                    decoration: u.avatar_decoration?.url,
                });
            }
        });
        
        const fetchLanyard = () => {
            fetch(`https://api.lanyard.rest/v1/users/${userId}`)
                .then(res => res.json())
                .then(json => {
                    if (json.success) setStatus(json.data.discord_status);
                })
                .catch(() => {});
        };
        fetchLanyard();
        const int = setInterval(fetchLanyard, 10000);
        return () => clearInterval(int);
    }, [userId]);

    const statusColors: Record<string, string> = {
        online: "bg-[#23a559]",
        idle: "bg-[#f0b132]",
        dnd: "bg-[#f23f42]",
        offline: "bg-[#80848e]",
    };

    return (
        <nav className="w-full">
            <div className="max-w-3xl mx-auto px-6 h-24 flex items-center justify-between font-mono">
                <div className="flex items-center gap-4">
                    {profile ? (
                        <>
                            <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                                <img src={profile.avatar} alt="Avatar" className="w-10 h-10 rounded-full shadow-lg" />
                                {profile.decoration && (
                                    <img src={profile.decoration} alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 max-w-none pointer-events-none scale-[1.15]" />
                                )}
                                <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#0d1117] ${statusColors[status] || statusColors.offline}`} />
                            </div>
                            <span className="font-bold text-gray-900 dark:text-white text-xl tracking-wide">
                                {profile.name}
                            </span>
                        </>
                    ) : (
                        <Loader inline />
                    )}
                </div>

                <div className="flex items-center gap-4 text-gray-500 dark:text-[#8b949e]">
                    <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                        <FiGithub className="text-xl" />
                    </a>
                    <a href={`https://discord.com/users/${userId}`} target="_blank" rel="noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                        <SiDiscord className="text-xl" />
                    </a>
                </div>
            </div>
        </nav>
    );
}