"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";
import { Repo } from "../../lib/types";
import { FiBook, FiStar, FiGitBranch } from "react-icons/fi";

const languageColors: Record<string, string> = {
    Vue: "#41b883",
    Go: "#00ADD8",
    Kotlin: "#A97BFF",
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    HTML: "#e34c26",
};

function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const diff = Date.now() - date.getTime();
    const days = Math.floor(diff / (1000 * 3600 * 24));
    if (days === 0) return "Updated today";
    if (days === 1) return "Updated 1 day ago";
    if (days < 30) return `Updated ${days} days ago`;
    if (days < 365) return `Updated ${Math.floor(days / 30)} months ago`;
    return `Updated ${Math.floor(days / 365)} years ago`;
}

export default function GithubProjects({ limit, variant = "list" }: { limit?: number; variant?: "list" | "cards" }) {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);

    const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "xylen-py";

    useEffect(() => {
        fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=20`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setRepos(data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <Loader />;

    const displayRepos = limit ? repos.slice(0, limit) : repos;

    if (displayRepos.length === 0) {
        return <p className="text-gray-500 dark:text-[#8b949e] transition-colors">No public repositories found.</p>;
    }

    if (variant === "cards") {
        return (
            <div className="space-y-4">
                {displayRepos.map(repo => (
                    <div key={repo.id} className="bg-gray-100 dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-xl p-5 hover:border-gray-400 dark:hover:border-[#8b949e] transition-colors">
                        <a href={repo.html_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-bold text-black dark:text-white text-lg hover:text-[#58a6ff] transition-colors">
                            <FiBook className="text-gray-500 dark:text-[#8b949e] transition-colors" />
                            {repo.name}
                        </a>
                        {repo.description && (
                            <p className="text-gray-500 dark:text-[#8b949e] text-sm mt-3 leading-relaxed transition-colors">
                                {repo.description}
                            </p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-[#8b949e] mt-4 font-mono transition-colors">
                            {repo.language && (
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: languageColors[repo.language] || "#8b949e" }} />
                                    <span>{repo.language}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-1.5">
                                <FiStar /> {repo.stargazers_count}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <FiGitBranch /> {repo.forks_count}
                            </div>
                            <div>{timeAgo(repo.updated_at)}</div>
                        </div>
                        {repo.topics && repo.topics.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {repo.topics.map(topic => (
                                    <span key={topic} className="px-2.5 py-1 bg-gray-200 dark:bg-[#1c2128] border border-gray-300 dark:border-[#30363d] text-gray-500 dark:text-[#8b949e] text-[10px] rounded-full font-bold tracking-wider transition-colors">
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <ul className="list-disc list-inside space-y-3 text-gray-600 dark:text-[#8b949e] transition-colors">
            {displayRepos.map(repo => (
                <li key={repo.id} className="leading-relaxed">
                    <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:underline font-bold">
                        {repo.name}
                    </a>
                    {repo.description && (
                        <span className="ml-2 text-sm text-gray-500 dark:text-[#8b949e] transition-colors">- {repo.description}</span>
                    )}
                </li>
            ))}
        </ul>
    );
}
