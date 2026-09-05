export interface DiscordApiFormats {
    webp?: string;
    png?: string;
    jpg?: string;
    gif?: string;
}

export interface DiscordApiImageAsset {
    key: string;
    url: string;
    is_animated?: boolean;
    formats?: DiscordApiFormats;
}

export interface DiscordApiAccentColor {
    value: number;
    hex: string;
    rgb: {
        r: number;
        g: number;
        b: number;
    };
}

export interface DiscordApiPublicFlags {
    value: number;
    flags: string[];
}

export interface DiscordApiAvatarDecoration {
    url: string;
    sku_id: string;
}

export interface DiscordApiPrimaryGuild {
    id: string;
    tag: string;
    identity_enabled: boolean;
    badge: string;
    created_at: string;
}

export interface DiscordApiUserData {
    id: string;
    name: string;
    discriminator: string;
    global_name: string | null;
    display_name: string | null;
    tag: string;
    mention: string;
    created_at: string;
    created_at_timestamp: number;
    bot: boolean;
    system: boolean;
    avatar: DiscordApiImageAsset | null;
    default_avatar: DiscordApiImageAsset;
    display_avatar: DiscordApiImageAsset;
    banner: DiscordApiImageAsset | null;
    accent_color: DiscordApiAccentColor | null;
    public_flags: DiscordApiPublicFlags;
    avatar_decoration: DiscordApiAvatarDecoration | null;
    primary_guild: DiscordApiPrimaryGuild | null;
    collectibles: any[];
}

export interface DiscordApiResponse {
    data: DiscordApiUserData;
    cached: boolean;
    cache_ttl: number;
    requested_at: string;
}

export interface GitHubRepo {
    name: string;
    description: string;
    language: string;
    stars: number;
    forks: number;
    url: string;
}

export interface GitHubData {
    username: string;
    repos: GitHubRepo[];
    totalStars: number;
    totalRepos: number;
    followers: number;
}

export interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    topics: string[];
}

export interface LanyardData {
    discord_status: "online" | "idle" | "dnd" | "offline";
    listening_to_spotify: boolean;
    spotify: {
        song: string;
        artist: string;
        album: string;
        track_id: string;
        album_art_url?: string;
        timestamps?: {
            start: number;
            end: number;
        };
    } | null;
    activities: {
        type: number;
        name: string;
        details?: string;
        state?: string;
    }[];
}
