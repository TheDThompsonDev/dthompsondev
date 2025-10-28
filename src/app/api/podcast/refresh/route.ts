import { NextResponse } from "next/server";

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
      console.log('Blob saved successfully:', blob.url);
      return;
    } catch (error) {
      console.error('Blob save error:', error);
      throw new Error(`Blob save failed: ${error}`);
    }
  }
  
  // Fallback: return only, no persistence
  console.warn("No Blob configured. Data will not be persisted (local development mode).");
}

async function fetchYouTubeEpisodes() {
  try {
    // Auto-detect environment: Vercel production, preview, or local
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');
    const youtubeUrl = `${baseUrl}/api/podcast/youtube`;
    
    console.log('Fetching YouTube episodes from:', youtubeUrl);
    
    const response = await fetch(youtubeUrl, { 
      cache: "no-store",
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
    
    if (!response.ok) {
      console.error('YouTube fetch failed:', response.status);
      return [];
    }
    
    const data = await response.json();
    if (data.ok && data.episodes) {
      console.log('YouTube episodes fetched:', data.episodes.length);
      return data.episodes;
    }
    
    return [];
  } catch (error) {
    console.error('YouTube fetch error:', error);
    return [];
  }
}

export async function GET() {
  try {
    console.log('Starting podcast refresh (Spotify + YouTube)...');
    
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
    console.log('Spotify episodes:', spotifyData.episodes.length);
    
    // Handle YouTube result
    const youtubeEpisodes = youtubeResult.status === 'fulfilled'
      ? youtubeResult.value
      : [];
    console.log('YouTube episodes:', youtubeEpisodes.length);

    // Merge episodes from both sources
    const allEpisodes = [...spotifyData.episodes, ...youtubeEpisodes];
    
    // Sort by publication date (newest first)
    allEpisodes.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return dateB - dateA;
    });

    console.log('Total episodes after merge:', allEpisodes.length);

    const mergedData = {
      episodes: allEpisodes,
      refreshedAt: new Date().toISOString(),
      source: `Spotify (${spotifyData.episodes.length}) + YouTube (${youtubeEpisodes.length})`,
    };

    // Store the data (only if Blob is configured)
    if (USE_BLOB) {
      try {
        await saveJSON("podcast/latest.json", mergedData);
        console.log('Data saved successfully to Blob');
      } catch (blobError) {
        console.error('Blob save failed, but continuing:', blobError);
      }
    } else {
      console.log('Skipping Blob storage (not configured)');
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
    console.error('Podcast refresh error:', err);
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
