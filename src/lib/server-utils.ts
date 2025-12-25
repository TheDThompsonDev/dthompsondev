import { headers } from "next/headers";

export async function getBaseUrl(): Promise<string> {
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    return `${protocol}://${host}`;
}

export async function internalFetch(
    path: string,
    options?: RequestInit & { revalidate?: number }
): Promise<Response> {
    const baseUrl = await getBaseUrl();
    const { revalidate = 3600, ...fetchOptions } = options || {};

    return fetch(`${baseUrl}${path}`, {
        ...fetchOptions,
        next: { revalidate },
    });
}
