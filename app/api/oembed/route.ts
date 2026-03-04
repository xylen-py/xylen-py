import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url") || "";
    const format = searchParams.get("format") || "json";

    if (format !== "json") {
        return NextResponse.json({ error: "Only JSON format is supported" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://xylen.vercel.app";

    return NextResponse.json({
        version: "1.0",
        type: "rich",
        title: "xylen | Developer & Creator",
        author_name: "xylen (ζ͜͡Ð R Λ X ! T Y)",
        author_url: "https://github.com/xylen-py",
        provider_name: "xylen Portfolio",
        provider_url: baseUrl,
        url: url || baseUrl,
        thumbnail_url: `${baseUrl}/api/og`,
        thumbnail_width: 1200,
        thumbnail_height: 630,
    }, {
        headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}
