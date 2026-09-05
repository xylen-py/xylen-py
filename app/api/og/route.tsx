import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getDiscordProfile } from "../../actions/discord";

export const runtime = "edge";

export async function GET(req: NextRequest) {
    try {
        const [profileRes, latinFontRes, greekFontRes] = await Promise.all([
            getDiscordProfile(),
            fetch('https://raw.githubusercontent.com/googlefonts/noto-fonts/main/hinted/ttf/NotoSans/NotoSans-Regular.ttf', {
                next: { revalidate: 31536000 },
            }),
            fetch('https://raw.githubusercontent.com/googlefonts/noto-fonts/main/hinted/ttf/NotoSansGreek/NotoSansGreek-Regular.ttf', {
                next: { revalidate: 31536000 },
            }),
        ]);

        if (!profileRes.success || !profileRes.user) throw new Error("Could not fetch Discord profile");

        const user = profileRes.user;
        const displayName = user.display_name || user.name;

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

        const avatarUrl = user.display_avatar?.url || user.avatar?.url || `https://cdn.discordapp.com/embed/avatars/0.png`;

        const bannerUrl = user.banner?.url || null;

        const accentHex = user.accent_color?.hex || "#5865F2";
        const bannerBg = accentHex;

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
                                {displayName}
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
