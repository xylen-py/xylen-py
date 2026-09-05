"use client";

import { useEffect, useState } from "react";

export default function Loader({ inline = false }: { inline?: boolean }) {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame(f => (f + 1) % 3);
        }, 150);
        return () => clearInterval(interval);
    }, []);

    const thrust = ["-  ", " - ", "  -"];

    const ship = (
        <div className="flex items-center font-mono">
            <span className="text-orange-500 font-bold whitespace-pre text-sm">{thrust[frame]}</span>
            <span className="text-black dark:text-white font-bold text-sm transition-colors">&gt;=O=&gt;</span>
        </div>
    );

    if (inline) {
        return ship;
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 w-full h-full min-h-[58px] bg-gray-100 dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-md transition-colors">
            {ship}
        </div>
    );
}