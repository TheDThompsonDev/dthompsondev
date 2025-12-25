import { headers } from "next/headers";

/**
 * Server-side utility functions for Next.js server components
 */

/**
 * Get the base URL for the current request.
 * This is useful for making internal API calls from server components.
 * 
 * @returns The base URL including protocol and host
 */
export async function getBaseUrl(): Promise<string> {
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    return `${protocol}://${host}`;
}

/**
 * Makes an internal API fetch with the correct base URL.
 * Includes default caching and error handling.
 * 
 * @param path - The API path (e.g., "/api/podcast.json")
 * @param options - Optional fetch options
 * @returns The fetch Response object
 */
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
