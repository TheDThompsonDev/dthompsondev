import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { fetchYouTubeEpisodes } from "@/lib/youtube-fetcher";

export const runtime = "edge";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export async function GET() {
  try {
    const episodes = await fetchYouTubeEpisodes();

    return new NextResponse(JSON.stringify({
      ok: true,
      episodes,
      count: episodes.length,
      source: YOUTUBE_API_KEY ? 'YouTube Data API v3' : 'YouTube RSS Feed',
      refreshedAt: new Date().toISOString(),
    }), {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    });

  } catch (err: any) {
    logger.error('YouTube fetch error', err);
    
    return new NextResponse(JSON.stringify({
      ok: false,
      error: err.message || 'Failed to fetch YouTube episodes',
      episodes: [],
      timestamp: new Date().toISOString(),
    }), {
      status: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
}
