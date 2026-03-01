import { NextRequest, NextResponse } from "next/server";

const DISCORD_API_BASE = "https://discord.com/api/v10";

const BADGE_ASSET_MAP: Record<number, { name: string; icon: string }> = {
    1: { name: "Discord Employee", icon: "5e74e9b61934fc1f67c65515d1f7e60d" },
    2: { name: "Partnered Server Owner", icon: "3f9748e53446a137a052f3571e76e768" },
    4: { name: "HypeSquad Events", icon: "bf01d1073931f921909045f3a39fd264" },
    8: { name: "Bug Hunter Level 1", icon: "2717692c7dca7289b35297368a940dd0" },
    64: { name: "HypeSquad Bravery", icon: "8a88d63823d8a71cd5e390baa45c0ea31" },
    128: { name: "HypeSquad Brilliance", icon: "011940fd013da3f7fb926e4a1cd2e618" },
    256: { name: "HypeSquad Balance", icon: "3aa41de486fa12454c3761e8e223571e" },
    512: { name: "Early Supporter", icon: "7060786766c9c840eb3019e725d2b358" },
    16384: { name: "Bug Hunter Level 2", icon: "848f79194d4be5ff5f81505cbd0ce1e6" },
    131072: { name: "Verified Bot Developer", icon: "6df5892e0f35b051f8b4f53b2b82571" },
    4194304: { name: "Active Developer", icon: "6bdc42827a38498929a4920da12695d9" },
};

const NITRO_BADGE_ICON = "2ba85e8026a8614b640c2837bcdfe21b";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;

    if (!userId || !/^\d{17,20}$/.test(userId)) {
        return NextResponse.json(
            { success: false, error: "Invalid Discord user ID." },
            { status: 400 }
        );
    }

    const botToken = process.env.DISCORD_BOT_TOKEN;

    if (!botToken) {
        return NextResponse.json(
            { success: false, error: "Discord bot token not configured." },
            { status: 500 }
        );
    }

    try {
        const [userRes, profileRes] = await Promise.all([
            fetch(`${DISCORD_API_BASE}/users/${userId}`, {
                headers: { Authorization: `Bot ${botToken}` },
                next: { revalidate: 60 },
            }),
            fetch(`${DISCORD_API_BASE}/users/${userId}/profile`, {
                headers: { Authorization: `Bot ${botToken}` },
                next: { revalidate: 60 },
            }).catch(() => null),
        ]);

        if (!userRes.ok) {
            if (userRes.status === 404) {
                return NextResponse.json(
                    { success: false, error: "User not found." },
                    { status: 404 }
                );
            }
            return NextResponse.json(
                { success: false, error: `Discord API error: ${userRes.status}` },
                { status: userRes.status }
            );
        }

        const user = await userRes.json();
        const profileData = profileRes?.ok ? await profileRes.json() : null;

        const avatarUrl = user.avatar
            ? `https://cdn.discordapp.com/avatars/${userId}/${user.avatar}.${user.avatar.startsWith("a_") ? "gif" : "png"}?size=512`
            : `https://cdn.discordapp.com/embed/avatars/${(BigInt(userId) >> BigInt(22)) % BigInt(6)}.png`;

        const bannerUrl = user.banner
            ? `https://cdn.discordapp.com/banners/${userId}/${user.banner}.${user.banner.startsWith("a_") ? "gif" : "png"}?size=600`
            : null;

        const avatarDecorationUrl = user.avatar_decoration_data?.asset
            ? `https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png?size=160`
            : null;

        let bio = user.bio || null;
        let themeColors: number[] | null = null;
        let profileEffectId = null;

        if (profileData?.user_profile) {
            bio = profileData.user_profile.bio || bio;
            themeColors = profileData.user_profile.theme_colors || null;
            if (profileData.user_profile.profile_effect) {
                profileEffectId = profileData.user_profile.profile_effect.id;
            }
        }

        const profileEffectUrl = profileEffectId
            ? `https://cdn.discordapp.com/profile-effects/${profileEffectId}.png`
            : null;

        const flags = user.public_flags || 0;
        const badges: { name: string; icon_url: string }[] = [];

        for (const [bit, badge] of Object.entries(BADGE_ASSET_MAP)) {
            if (flags & parseInt(bit)) {
                badges.push({
                    name: badge.name,
                    icon_url: `https://cdn.discordapp.com/badge-icons/${badge.icon}.png`,
                });
            }
        }

        if (user.premium_type && user.premium_type > 0) {
            badges.push({
                name: "Nitro",
                icon_url: `https://cdn.discordapp.com/badge-icons/${NITRO_BADGE_ICON}.png`,
            });
        }

        const profile = {
            success: true,
            user: {
                id: user.id,
                username: user.username,
                display_name: user.global_name || user.username,
                discriminator: user.discriminator,
                avatar: user.avatar,
                avatar_url: avatarUrl,
                banner: user.banner,
                banner_url: bannerUrl,
                banner_color: user.banner_color || null,
                accent_color: user.accent_color || null,
                avatar_decoration: user.avatar_decoration_data || null,
                avatar_decoration_url: avatarDecorationUrl,
                profile_effect_id: profileEffectId,
                profile_effect_url: profileEffectUrl,
                bio,
                theme_colors: themeColors,
                badges,
                public_flags: flags,
                bot: user.bot || false,
                system: user.system || false,
                created_at: new Date(
                    Number(BigInt(user.id) >> 22n) + 1420070400000
                ).toISOString(),
            },
        };

        return NextResponse.json(profile, {
            headers: {
                "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
            },
        });
    } catch {
        return NextResponse.json(
            { success: false, error: "Failed to fetch Discord profile." },
            { status: 500 }
        );
    }
}
