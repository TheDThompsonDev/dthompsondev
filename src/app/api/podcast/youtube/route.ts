import { NextResponse } from "next/server";

export const runtime = "edge";

const YOUTUBE_RSS_URL = process.env.NEXT_PUBLIC_YOUTUBE_URL;

async function parseYouTubeRss(xml: string) {
  // YouTube uses Atom feed format
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => {
    const pick = (tag: string) => {
      const match = m[1].match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
      return match?.[1].trim() ?? "";
    };
    
    const getAttr = (re: RegExp) => m[1].match(re)?.[1] ?? "";
    
    // Clean up text
    const cleanText = (text: string) => 
      text.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim();
    
    const title = cleanText(pick("title"));
    const description = cleanText(pick("media:description"));
    const published = pick("published");
    const videoId = pick("yt:videoId");
    const link = `https://www.youtube.com/watch?v=${videoId}`;
    
    // Get thumbnail - YouTube provides multiple sizes
    const thumbnailUrl = getAttr(/<media:thumbnail[^>]*url="([^"]+)"/i) || 
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    
    return {
      id: `youtube-${videoId}`,
      guid: videoId,
      title,
      link,
      pubDate: new Date(published).toISOString(),
      publishDate: new Date(published).toISOString().split('T')[0],
      description: description || title,
      audioUrl: undefined,
      videoUrl: link,
      thumbnail: thumbnailUrl,
      duration: '', // YouTube RSS doesn't include duration
      platform: 'youtube' as const,
      externalUrl: link,
    };
  });
  
  return { episodes: entries };
}

export async function GET() {
  try {
    if (!YOUTUBE_RSS_URL) {
      return new NextResponse(JSON.stringify({
        ok: false,
        error: "NEXT_PUBLIC_YOUTUBE_URL not configured",
        episodes: []
      }), {
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    console.log('Fetching YouTube RSS feed:', YOUTUBE_RSS_URL);

    const response = await fetch(YOUTUBE_RSS_URL, { cache: "no-store" });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('YouTube RSS fetch error:', response.status, errorText);
      throw new Error(`YouTube RSS fetch failed: ${response.status}`);
    }

    const xml = await response.text();
    console.log('YouTube RSS feed fetched, length:', xml.length);
    
    const data = await parseYouTubeRss(xml);
    console.log('YouTube RSS parsed, episodes found:', data.episodes.length);

    return new NextResponse(JSON.stringify({
      ok: true,
      episodes: data.episodes,
      count: data.episodes.length,
      refreshedAt: new Date().toISOString(),
    }), {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    });

  } catch (err: any) {
    console.error('YouTube fetch error:', err);
    return new NextResponse(JSON.stringify({
      ok: false,
      error: err.message,
      episodes: [],
      timestamp: new Date().toISOString(),
    }), {
      status: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
}

