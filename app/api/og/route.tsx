import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const DISCORD_API_BASE = "https://discord.com/api/v10";
const DISCORD_USER_ID = "1270759337916104708";
const DISPLAY_NAME = "ζ͜͡Ð R Λ X ! T Y";

export async function GET(req: NextRequest) {
    try {
        const botToken = process.env.DISCORD_BOT_TOKEN;

        if (!botToken) {
            throw new Error("Discord bot token not configured.");
        }

        const [userRes, latinFontRes, greekFontRes] = await Promise.all([
            fetch(`${DISCORD_API_BASE}/users/${DISCORD_USER_ID}`, {
                headers: { Authorization: `Bot ${botToken}` },
                next: { revalidate: 3600 },
            }),
            fetch('https://raw.githubusercontent.com/googlefonts/noto-fonts/main/hinted/ttf/NotoSans/NotoSans-Regular.ttf', {
                next: { revalidate: 31536000 },
            }),
            fetch('https://raw.githubusercontent.com/googlefonts/noto-fonts/main/hinted/ttf/NotoSansGreek/NotoSansGreek-Regular.ttf', {
                next: { revalidate: 31536000 },
            }),
        ]);

        if (!userRes.ok) throw new Error("Could not fetch Discord profile");

        const user = await userRes.json();

        const fonts = [];
        if (latinFontRes.ok) {
            fonts.push({
                name: "NotoSans",
                data: await latinFontRes.arrayBuffer(),
                style: "normal" as const,
                weight: 400 as const,
            });
        } else {
            console.error("Failed to load Latin font");
        }
        if (greekFontRes.ok) {
            fonts.push({
                name: "NotoSansGreek",
                data: await greekFontRes.arrayBuffer(),
                style: "normal" as const,
                weight: 400 as const,
            });
        } else {
            console.error("Failed to load Greek font");
        }

        const avatarUrl = user.avatar
            ? `https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${user.avatar}.png?size=512`
            : `https://cdn.discordapp.com/embed/avatars/${(BigInt(DISCORD_USER_ID) >> BigInt(22)) % BigInt(6)}.png`;

        const bannerUrl = user.banner
            ? `https://cdn.discordapp.com/banners/${DISCORD_USER_ID}/${user.banner}.png?size=1024`
            : null;

        const accentHex = user.accent_color ? `#${user.accent_color.toString(16).padStart(6, "0")}` : "#5865F2";
        const bannerBg = user.banner_color || accentHex;

        return new ImageResponse(
            (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#0d0d0d",
                        position: "relative",
                        overflow: "hidden",
                        fontFamily: fonts.length > 0 ? '"NotoSans", "NotoSansGreek", sans-serif' : 'sans-serif',
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "60%",
                            display: "flex",
                            backgroundColor: bannerBg,
                        }}
                    >
                        {bannerUrl && (
                            <img
                                src={bannerUrl}
                                height="100%"
                                width="100%"
                                style={{ objectFit: "cover" }}
                            />
                        )}
                        <div
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: "200px",
                                background: "linear-gradient(to top, rgba(13,13,13,1), rgba(13,13,13,0))",
                            }}
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "120px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                width: "200px",
                                height: "200px",
                                borderRadius: "100px",
                                overflow: "hidden",
                                border: "8px solid #0d0d0d",
                                boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
                            }}
                        >
                            <img
                                src={avatarUrl}
                                width="100%"
                                height="100%"
                                style={{ objectFit: "cover" }}
                            />
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                marginTop: "30px",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "64px",
                                    color: "#ffffff",
                                    letterSpacing: "0.1em",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                {DISPLAY_NAME}
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: "10px",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "32px",
                                        color: "#a78bfa",
                                    }}
                                >
                                    Developer
                                </div>
                                <div
                                    style={{
                                        fontSize: "32px",
                                        color: "#6a6a6a",
                                        margin: "0 20px",
                                    }}
                                >
                                    •
                                </div>
                                <div
                                    style={{
                                        fontSize: "32px",
                                        color: "#b0b0b0",
                                    }}
                                >
                                    Creator
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                ...(fonts.length > 0 ? { fonts } : {}),
            }
        );
    } catch (e: any) {
        return new Response(`Failed to generate image: ${e.message}`, {
            status: 500,
        });
    }
}
