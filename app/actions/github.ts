"use server";

import { GitHubData } from "../../lib/types";

export async function getGithubStats(username?: string) {
    const user = username || process.env.GITHUB_USERNAME;

    if (!user) {
        return { success: false, error: "GitHub username not configured." };
    }

    try {
        const headers: HeadersInit = {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "portfolio-site",
        };

        const [userRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${user}`, { headers, next: { revalidate: 3600 } }),
            fetch(`https://api.github.com/users/${user}/repos?sort=stars&per_page=6&direction=desc`, {
                headers,
                next: { revalidate: 3600 },
            }),
        ]);

        if (!userRes.ok || !reposRes.ok) {
            return { success: false, error: "GitHub API error" };
        }

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        const repos = reposData.map((r: Record<string, unknown>) => ({
            name: r.name,
            description: r.description || "No description",
            language: r.language || "Unknown",
            stars: r.stargazers_count,
            forks: r.forks_count,
            url: r.html_url,
        }));

        const totalStars = reposData.reduce(
            (sum: number, r: Record<string, unknown>) => sum + ((r.stargazers_count as number) || 0),
            0
        );

        return {
            success: true,
            data: {
                username: user,
                repos,
                totalStars,
                totalRepos: userData.public_repos,
                followers: userData.followers,
            } as GitHubData,
        };
    } catch {
        return { success: false, error: "Failed to fetch GitHub data" };
    }
}