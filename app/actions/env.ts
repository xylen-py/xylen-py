"use server";

export async function getEnvConfig() {
    return {
        github: process.env.GITHUB_USERNAME,
        discord: process.env.USER_ID,
    };
}
