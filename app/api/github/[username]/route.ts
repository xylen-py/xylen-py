import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ username: string }> }
) {
    const { username } = await params;

    if (!username || !/^[a-zA-Z0-9-]+$/.test(username)) {
        return NextResponse.json(
            { success: false, error: "Invalid GitHub username." },
            { status: 400 }
        );
    }

    try {
        const [userRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`, {
                headers: { Accept: "application/vnd.github.v3+json" },
                next: { revalidate: 300 },
            }),
            fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
                headers: { Accept: "application/vnd.github.v3+json" },
                next: { revalidate: 300 },
            }),
        ]);

        if (!userRes.ok) {
            if (userRes.status === 404) {
                return NextResponse.json(
                    { success: false, error: "GitHub user not found." },
                    { status: 404 }
                );
            }
            return NextResponse.json(
                { success: false, error: `GitHub API error: ${userRes.status}` },
                { status: userRes.status }
            );
        }

        const user = await userRes.json();
        const repos = reposRes.ok ? await reposRes.json() : [];

        const topRepos = repos.map((r: Record<string, unknown>) => ({
            name: r.name,
            description: r.description,
            language: r.language,
            stars: r.stargazers_count,
            forks: r.forks_count,
            url: r.html_url,
            updated_at: r.updated_at,
        }));

        return NextResponse.json({
            success: true,
            user: {
                login: user.login,
                name: user.name,
                avatar_url: user.avatar_url,
                bio: user.bio,
                public_repos: user.public_repos,
                followers: user.followers,
                following: user.following,
                html_url: user.html_url,
                created_at: user.created_at,
            },
            repos: topRepos,
        }, {
            headers: {
                "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
            },
        });
    } catch {
        return NextResponse.json(
            { success: false, error: "Failed to fetch GitHub profile." },
            { status: 500 }
        );
    }
}
