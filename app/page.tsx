"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import DiscordProfile from "./components/DiscordProfile";
import GithubProjects from "./components/GithubProjects";

export default function Home() {
    const [tab, setTab] = useState("Home");

    const displayName = process.env.NEXT_PUBLIC_SITE_NAME || "xylen";
    const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "xylen-py";

    return (
        <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-[#c9d1d9] font-mono selection:bg-[#58a6ff] selection:text-white pb-20 transition-colors">
            <Navbar />
            <main className="max-w-3xl mx-auto px-6 pt-24">
                <div className="flex border-b border-gray-200 dark:border-[#30363d] mb-10 transition-colors">
                    <button
                        onClick={() => setTab("Home")}
                        className={`flex-1 py-3 text-center font-bold transition-colors ${tab === "Home" ? "border-b-2 border-black dark:border-white text-black dark:text-white" : "text-gray-500 dark:text-[#8b949e] hover:text-black dark:hover:text-[#c9d1d9]"}`}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => setTab("Projects")}
                        className={`flex-1 py-3 text-center font-bold transition-colors ${tab === "Projects" ? "border-b-2 border-black dark:border-white text-black dark:text-white" : "text-gray-500 dark:text-[#8b949e] hover:text-black dark:hover:text-[#c9d1d9]"}`}
                    >
                        Projects
                    </button>
                </div>

                {tab === "Home" ? (
                    <div className="space-y-10">
                        <section>
                            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white tracking-wide transition-colors">Hi there</h1>
                            <p className="leading-relaxed text-gray-600 dark:text-[#8b949e] transition-colors">
                                I'm {displayName}, a passionate full-stack developer who loves building robust systems and engaging applications. I thrive on architecting backend solutions, designing sleek interfaces, and tinkering with open-source projects. I'm a huge fan of self-hosting my own infrastructure, and you'll find the fruits of my labor—from feature-rich Discord bots to modular authentication systems—right here in my GitHub repositories. Feel free to explore my tech stack and my latest work below!
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-6 text-black dark:text-white tracking-wide transition-colors">Technologies I use</h2>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="w-24 text-xs text-gray-500 dark:text-[#8b949e] font-bold uppercase tracking-wider transition-colors">Languages</span>
                                    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
                                    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
                                    <img src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white" alt="Go" />
                                    <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
                                </div>
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="w-24 text-xs text-gray-500 dark:text-[#8b949e] font-bold uppercase tracking-wider transition-colors">Frontend</span>
                                    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
                                    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
                                    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
                                </div>
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="w-24 text-xs text-gray-500 dark:text-[#8b949e] font-bold uppercase tracking-wider transition-colors">Database</span>
                                    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
                                    <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
                                    <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
                                </div>
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="w-24 text-xs text-gray-500 dark:text-[#8b949e] font-bold uppercase tracking-wider transition-colors">DevOps</span>
                                    <img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="Linux" />
                                    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
                                    <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
                                    <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS" />
                                    <img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare" />
                                    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-6 text-black dark:text-white tracking-wide transition-colors">Some Projects</h2>
                            <ul className="list-disc list-inside space-y-3 text-gray-600 dark:text-[#8b949e] transition-colors">
                                <li className="leading-relaxed">
                                    <a href="https://zeonbot.xyz/" target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:underline font-bold">
                                        ZEON
                                    </a>
                                    <span className="ml-2 text-sm text-gray-500 dark:text-[#8b949e]">- A security and multipurpose Discord bot</span>
                                </li>
                                <li className="leading-relaxed">
                                    <a href={`https://github.com/${githubUsername}/SlugYZeon`} target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:underline font-bold">
                                        SlugYZeon
                                    </a>
                                    <span className="ml-2 text-sm text-gray-500 dark:text-[#8b949e]">- A Lavalink plugin with sources for Spotify, Gaana, Pandora, Amazon Music, etc.</span>
                                </li>
                                <li className="leading-relaxed">
                                    <a href={`https://github.com/${githubUsername}/${githubUsername}`} target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:underline font-bold">
                                        1xylen.site
                                    </a>
                                    <span className="ml-2 text-sm text-gray-500 dark:text-[#8b949e]">- My personal developer portfolio</span>
                                </li>
                            </ul>
                        </section>

                        <section className="pt-6">
                            <h2 className="text-xl font-bold mb-4 text-white tracking-wide">I'm currently listening to:</h2>
                            <DiscordProfile />
                        </section>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <GithubProjects variant="cards" />
                    </div>
                )}
            </main>
        </div>
    );
}
