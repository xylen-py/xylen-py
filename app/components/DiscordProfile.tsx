"use client";

import { useEffect, useState } from "react";
import { SiSpotify } from "react-icons/si";
import { FiMonitor } from "react-icons/fi";

import Loader from "./Loader";
import { LanyardData } from "../../lib/types";

const userId = process.env.NEXT_PUBLIC_USER_ID || "1356648920389783724";
const LANYARD_API = `https://api.lanyard.rest/v1/users/${userId}`;

function formatTime(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function SpotifyProgress({ start, end }: { start: number; end: number }) {
    const [progress, setProgress] = useState(0);
    const [time, setTime] = useState({ current: 0, total: 0 });

    useEffect(() => {
        const update = () => {
            const now = Date.now();
            const total = end - start;
            const current = now - start;
            setProgress(Math.min(100, Math.max(0, (current / total) * 100)));
            setTime({ current: Math.max(0, Math.min(current, total)), total });
        };
        update();
        const int = setInterval(update, 1000);
        return () => clearInterval(int);
    }, [start, end]);

    return (
        <div className="flex flex-col mt-2">
            <div className="w-full h-1 bg-gray-300 dark:bg-[#30363d] rounded-full overflow-hidden transition-colors">
                <div className="h-full bg-[#1DB954] transition-all duration-1000 linear" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 dark:text-[#8b949e] mt-1 font-mono transition-colors">
                <span>{formatTime(time.current)}</span>
                <span>{formatTime(time.total)}</span>
            </div>
        </div>
    );
}

export default function DiscordProfile() {
    const [data, setData] = useState<LanyardData | null>(null);

    useEffect(() => {
        const fetchLanyard = async () => {
            try {
                const res = await fetch(LANYARD_API);
                const json = await res.json();
                if (json.success) setData(json.data);
            } catch (err) {
                console.error("Failed to fetch Lanyard data", err);
            }
        };

        fetchLanyard();
        const interval = setInterval(fetchLanyard, 10000);
        return () => clearInterval(interval);
    }, []);

    if (!data) {
        return <Loader />;
    }

    const statusColors = {
        online: "bg-[#23a559]",
        idle: "bg-[#f0b132]",
        dnd: "bg-[#f23f42]",
        offline: "bg-[#80848e]",
    };
    
    const StatusDot = () => (
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${statusColors[data.discord_status] || statusColors.offline}`} />
        </div>
    );

    if (data.listening_to_spotify && data.spotify) {
        return (
            <div className="bg-gray-100 dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-md p-4 text-gray-900 dark:text-[#c9d1d9] font-mono shadow-sm flex items-center gap-4 relative transition-colors">
                <StatusDot />
                {data.spotify.album_art_url ? (
                    <div className="relative shrink-0">
                        <img src={data.spotify.album_art_url} alt="Album Art" className="w-16 h-16 rounded-md object-cover shadow-md" />
                        <SiSpotify className="absolute -bottom-1 -right-1 text-[#1DB954] text-sm bg-gray-100 dark:bg-[#161b22] rounded-full p-0.5 transition-colors" />
                    </div>
                ) : (
                    <SiSpotify className="text-[#1DB954] text-xl shrink-0" />
                )}
                <div className="flex flex-col truncate flex-1 pr-4">
                    <span className="font-bold text-black dark:text-white truncate transition-colors">{data.spotify.song}</span>
                    <span className="text-xs text-gray-500 dark:text-[#8b949e] truncate transition-colors">by {data.spotify.artist}</span>
                    <span className="text-[10px] text-gray-500 dark:text-[#8b949e] truncate transition-colors">on {data.spotify.album}</span>
                    {data.spotify.timestamps && (
                        <SpotifyProgress start={data.spotify.timestamps.start} end={data.spotify.timestamps.end} />
                    )}
                </div>
            </div>
        );
    }

    const activity = data.activities.find(a => a.type === 0 || a.type === 1 || a.type === 3);

    if (activity) {
        return (
            <div className="bg-gray-100 dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-md p-4 text-gray-900 dark:text-[#c9d1d9] font-mono shadow-sm flex items-center gap-3 relative transition-colors">
                <StatusDot />
                <FiMonitor className="text-gray-500 dark:text-[#8b949e] text-xl shrink-0 transition-colors" />
                <div className="flex flex-col truncate pr-4">
                    <span className="font-bold text-black dark:text-white truncate transition-colors">{activity.name}</span>
                    <span className="text-sm text-gray-500 dark:text-[#8b949e] truncate transition-colors">{activity.details || activity.state || "Active"}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-md p-4 text-gray-500 dark:text-[#8b949e] font-mono shadow-sm relative transition-colors">
            <StatusDot />
            nothing
        </div>
    );
}
