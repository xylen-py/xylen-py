"use server";

import { DiscordApiResponse } from "../../lib/types";

export async function getDiscordProfile(userId?: string) {
    const id = userId || process.env.USER_ID;

    if (!id || !/^\d{17,20}$/.test(id)) {
        return { success: false, error: "Invalid Discord user ID." };
    }

    try {
        const backendApi = process.env.BACKEND_API;
        
        if (!backendApi) {
            return { success: false, error: "BACKEND_API not configured." };
        }

        const userRes = await fetch(`${backendApi}/api/discord/${id}`, {
            next: { revalidate: 60 },
        });

        if (!userRes.ok) {
            if (userRes.status === 404) {
                return { success: false, error: "User not found." };
            }
            return { success: false, error: `API error: ${userRes.status}` };
        }

        const json = (await userRes.json()) as DiscordApiResponse;
        
        if (!json.data) {
            return { success: false, error: "User data not found." };
        }

        return {
            success: true,
            user: json.data,
        };
    } catch {
        return { success: false, error: "Failed to fetch Discord profile." };
    }
}