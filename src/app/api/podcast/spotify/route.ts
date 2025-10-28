import { NextResponse } from "next/server";

export const runtime = "edge";

const RSS_URL = process.env.PODCAST_RSS_URL || "https://anchor.fm/s/fd45682c/podcast/rss";

async function parseRss(xml: string) {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m, idx) => {
    const pick = (tag: string) =>
      m[1].match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"))?.[1].trim() ?? "";
    const getAttr = (re: RegExp) => m[1].match(re)?.[1] ?? "";
    
    // Clean up CDATA and HTML tags from title and description
    const cleanText = (text: string) => 
      text.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim();
    
    const title = cleanText(pick("title"));
    const description = cleanText(pick("description"));
    const pubDate = pick("pubDate");
    const link = pick("link");
    const audioUrl = getAttr(/<enclosure[^>]*url="([^"]+)"/i);
    const image = getAttr(/<itunes:image[^>]*href="([^"]+)"/i);
    const duration = getAttr(/<itunes:duration>([^<]+)<\/itunes:duration>/i);
    
    // Format duration
    let formattedDuration = '';
    if (duration) {
      const timeParts = duration.split(':');
      if (timeParts.length === 2) {
        const minutes = parseInt(timeParts[0]);
        formattedDuration = `${minutes} min`;
      } else if (timeParts.length === 3) {
        const hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);
        if (hours > 0) {
          formattedDuration = `${hours}h ${minutes}m`;
        } else {
          formattedDuration = `${minutes} min`;
        }
      }
    }

    const episode = {
      id: `spotify-${Date.now()}-${idx}`,
      guid: pick("guid") || link,
      title,
      link,
      pubDate: new Date(pubDate).toISOString(),
      publishDate: new Date(pubDate).toISOString().split('T')[0], // YYYY-MM-DD format
      description,
      audioUrl,
      videoUrl: undefined,
      thumbnail: image || 'https://twxvicohcixbzang.public.blob.vercel-storage.com/podcast.jpg',
      duration: formattedDuration,
      platform: 'spotify' as const,
      externalUrl: link
    };
    
    return episode;
  });
  
  return { episodes: items };
}

export async function GET() {
  try {
    if (!RSS_URL) {
      return new NextResponse(JSON.stringify({
        ok: false,
        error: "PODCAST_RSS_URL not configured",
        episodes: []
      }), {
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }
    
    const response = await fetch(RSS_URL, { cache: "no-store" });
    
    if (!response.ok) {
      throw new Error(`Spotify RSS fetch failed: ${response.status}`);
    }

    const xml = await response.text();
    const data = await parseRss(xml);

    return new NextResponse(JSON.stringify({
      ok: true,
      episodes: data.episodes,
      count: data.episodes.length,
      source: 'Spotify RSS Feed',
      refreshedAt: new Date().toISOString(),
    }), {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    });

  } catch (err: any) {
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

