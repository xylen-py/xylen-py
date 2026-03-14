import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url") || "";
    const format = searchParams.get("format") || "json";

    if (format !== "json") {
        return NextResponse.json({ error: "Only JSON format is supported" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://xylen.vercel.app";

    const DISPLAY_NAME = "ζ͜͡Ð R Λ X ! T Y";

    return NextResponse.json({
        version: "1.0",
        type: "rich",
        title: `${DISPLAY_NAME} • Developer`,
        author_name: DISPLAY_NAME,
        author_url: "https://github.com/xylen-py",
        provider_name: "xylen",
        provider_url: baseUrl,
        url: url || baseUrl,
        thumbnail_url: `${baseUrl}/api/og`,
    }, {
        headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}
