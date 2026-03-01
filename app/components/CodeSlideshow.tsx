"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const codeSnippets = [
    {
        title: "discord-bot.ts",
        language: "TypeScript",
        lines: [
            { indent: 0, text: 'import { Client, GatewayIntentBits } from "discord.js";', color: "#c084fc" },
            { indent: 0, text: "", color: "" },
            { indent: 0, text: "const client = new Client({", color: "#e8e8e8" },
            { indent: 1, text: "intents: [GatewayIntentBits.Guilds],", color: "#a78bfa" },
            { indent: 0, text: "});", color: "#e8e8e8" },
            { indent: 0, text: "", color: "" },
            { indent: 0, text: 'client.on("ready", () => {', color: "#818cf8" },
            { indent: 1, text: "console.log(`Logged in as ${client.user?.tag}`);", color: "#22c55e" },
            { indent: 0, text: "});", color: "#818cf8" },
            { indent: 0, text: "", color: "" },
            { indent: 0, text: 'client.login(process.env.TOKEN);', color: "#f59e0b" },
        ],
    },
    {
        title: "api/route.ts",
        language: "Next.js",
        lines: [
            { indent: 0, text: 'import { NextResponse } from "next/server";', color: "#c084fc" },
            { indent: 0, text: "", color: "" },
            { indent: 0, text: "export async function GET() {", color: "#818cf8" },
            { indent: 1, text: "const data = await fetch(DISCORD_API, {", color: "#e8e8e8" },
            { indent: 2, text: 'headers: { Authorization: `Bot ${TOKEN}` },', color: "#a78bfa" },
            { indent: 1, text: "});", color: "#e8e8e8" },
            { indent: 0, text: "", color: "" },
            { indent: 1, text: "return NextResponse.json({", color: "#22c55e" },
            { indent: 2, text: "success: true,", color: "#f59e0b" },
            { indent: 2, text: "user: await data.json(),", color: "#f59e0b" },
            { indent: 1, text: "});", color: "#22c55e" },
            { indent: 0, text: "}", color: "#818cf8" },
        ],
    },
    {
        title: "vanityguard.go",
        language: "Go",
        lines: [
            { indent: 0, text: 'package main', color: "#c084fc" },
            { indent: 0, text: "", color: "" },
            { indent: 0, text: 'func main() {', color: "#818cf8" },
            { indent: 1, text: "config := LoadConfig()", color: "#e8e8e8" },
            { indent: 1, text: 'gateway := NewGateway(config.Token)', color: "#a78bfa" },
            { indent: 0, text: "", color: "" },
            { indent: 1, text: "gateway.OnVanityUpdate(func(e Event) {", color: "#22c55e" },
            { indent: 2, text: 'log.Printf("Vanity changed: %s", e.Code)', color: "#f59e0b" },
            { indent: 2, text: "RestoreVanity(config, e.Code)", color: "#f43f5e" },
            { indent: 1, text: "})", color: "#22c55e" },
            { indent: 0, text: "", color: "" },
            { indent: 1, text: "gateway.Connect()", color: "#e8e8e8" },
            { indent: 0, text: "}", color: "#818cf8" },
        ],
    },
];

export default function CodeSlideshow() {
    const [snippetIdx, setSnippetIdx] = useState(0);
    const [visibleLines, setVisibleLines] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const snippet = codeSnippets[snippetIdx];

    const nextSnippet = useCallback(() => {
        setSnippetIdx((p) => (p + 1) % codeSnippets.length);
        setVisibleLines(0);
        setIsTyping(true);
    }, []);

    useEffect(() => {
        if (!isTyping) return;

        if (visibleLines < snippet.lines.length) {
            timerRef.current = setTimeout(() => {
                setVisibleLines((v) => v + 1);
            }, 80 + Math.random() * 60);
        } else {
            timerRef.current = setTimeout(() => {
                setIsTyping(false);
                setTimeout(nextSnippet, 2000);
            }, 1500);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [visibleLines, isTyping, snippet.lines.length, nextSnippet]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="w-full max-w-2xl mx-auto"
        >
            <div className="rounded-xl overflow-hidden border border-white/5" style={{ background: "#111214" }}>
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5" style={{ background: "#0d0d0d" }}>
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {codeSnippets.map((s, i) => (
                            <motion.button
                                key={s.title}
                                onClick={() => { setSnippetIdx(i); setVisibleLines(0); setIsTyping(true); }}
                                className={`text-[11px] px-2.5 py-1 rounded-md transition-all duration-200 font-mono ${i === snippetIdx
                                    ? "bg-[#232428] text-white"
                                    : "text-[#80848e] hover:text-[#b5bac1]"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {s.title}
                            </motion.button>
                        ))}
                    </div>
                    <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-[10px] text-accent-primary font-mono"
                    >
                        {snippet.language}
                    </motion.span>
                </div>

                <div className="p-4 font-mono text-[13px] leading-[1.7] min-h-[280px] relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={snippetIdx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {snippet.lines.map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={i < visibleLines ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex"
                                >
                                    <span className="w-8 text-right mr-4 text-[#4e5058] text-[11px] select-none shrink-0">
                                        {i + 1}
                                    </span>
                                    <span style={{ paddingLeft: `${line.indent * 20}px`, color: line.color || "#e8e8e8" }}>
                                        {line.text}
                                        {i === visibleLines - 1 && isTyping && (
                                            <motion.span
                                                animate={{ opacity: [1, 0] }}
                                                transition={{ duration: 0.5, repeat: Infinity }}
                                                className="inline-block w-[2px] h-[14px] bg-accent-primary ml-0.5 align-middle"
                                            />
                                        )}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
                        {codeSnippets.map((_, i) => (
                            <motion.div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i === snippetIdx ? "bg-accent-primary" : "bg-[#4e5058]"}`}
                                animate={i === snippetIdx ? { scale: [1, 1.3, 1] } : {}}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
