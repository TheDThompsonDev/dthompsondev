import { NextResponse } from "next/server";
import { fetchYouTubeEpisodes } from "@/lib/youtube-fetcher";

export const runtime = "edge";

const RSS_URL = process.env.PODCAST_RSS_URL || "https://anchor.fm/s/fd45682c/podcast/rss";

// Using Vercel Blob for storage (only if token is available)
const USE_BLOB = !!process.env.BLOB_READ_WRITE_TOKEN;

async function parseRss(xml: string) {
  // Minimal and fast RSS parsing
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => {
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

    return {
      id: `episode-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      guid: pick("guid") || link,
      title,
      link,
      pubDate: new Date(pubDate).toISOString(),
      publishDate: new Date(pubDate).toISOString().split('T')[0], // YYYY-MM-DD format
      description,
      audioUrl,
      videoUrl: link.includes('youtube') ? link : undefined,
      thumbnail: image || 'https://twxvicohcixbzang.public.blob.vercel-storage.com/podcast.jpg',
      duration: formattedDuration,
      platform: link.includes('youtube') ? 'youtube' : 'spotify',
      externalUrl: link
    };
  });
  
  return { episodes: items };
}

async function saveJSON(key: string, data: unknown) {
  const json = JSON.stringify(data);
  
  if (USE_BLOB) {
    try {
      // Dynamic import of Vercel Blob SDK
      const { put } = await import("@vercel/blob");
      
      // Use Vercel Blob SDK
      const blob = await put(key, json, {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false, // Keep the same name for overwriting
        allowOverwrite: true, // Allow overwriting existing files
      });
      return;
    } catch (error) {
      throw new Error(`Blob save failed: ${error}`);
    }
  }
  
  // Fallback: return only, no persistence
}

export async function GET() {
  try {
    // Fetch both sources in parallel for better performance
    const [spotifyResult, youtubeResult] = await Promise.allSettled([
      fetch(RSS_URL, { cache: "no-store" }).then(res => {
        if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);
        return res.text();
      }).then(parseRss),
      fetchYouTubeEpisodes()
    ]);
    
    // Handle Spotify result
    const spotifyData = spotifyResult.status === 'fulfilled' 
      ? spotifyResult.value 
      : { episodes: [] };
    
    // Handle YouTube result
    const youtubeEpisodes = youtubeResult.status === 'fulfilled'
      ? youtubeResult.value
      : [];

    // Merge episodes from both sources
    const allEpisodes = [...spotifyData.episodes, ...youtubeEpisodes];
    
    // Sort by publication date (newest first)
    allEpisodes.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return dateB - dateA;
    });

    const mergedData = {
      episodes: allEpisodes,
      refreshedAt: new Date().toISOString(),
      source: `Spotify (${spotifyData.episodes.length}) + YouTube (${youtubeEpisodes.length})`,
    };

    // Store the data (only if Blob is configured)
    if (USE_BLOB) {
      try {
        await saveJSON("podcast/latest.json", mergedData);
      } catch (blobError) {
        // Blob save failed, but continuing
      }
    }

    return new NextResponse(JSON.stringify({ 
      ok: true, 
      episodesCount: allEpisodes.length,
      spotifyCount: spotifyData.episodes.length,
      youtubeCount: youtubeEpisodes.length,
      refreshedAt: new Date().toISOString(),
      blobConfigured: USE_BLOB,
      episodes: allEpisodes // Return all episodes
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
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
}
