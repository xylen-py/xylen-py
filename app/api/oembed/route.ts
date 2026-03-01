import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url") || "";
    const format = searchParams.get("format") || "json";

    if (format !== "json") {
        return NextResponse.json({ error: "Only JSON format is supported" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://xylen.dev";

    return NextResponse.json({
        version: "1.0",
        type: "rich",
        title: ".1xylen | Developer & Creator",
        description: "Full-Stack Developer, Discord Bot Creator, and Open Source Enthusiast. Building premium digital experiences.",
        author_name: ".1xylen (ζ͜͡Ð R Λ X ! T Y)",
        author_url: "https://github.com/xylen-py",
        provider_name: ".1xylen Portfolio",
        provider_url: baseUrl,
        url: url || baseUrl,
        thumbnail_url: `${baseUrl}/og-image.png`,
        thumbnail_width: 1200,
        thumbnail_height: 630,
    }, {
        headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}
