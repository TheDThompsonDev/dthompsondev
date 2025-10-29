import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export const runtime = "edge";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_RSS_URL = process.env.NEXT_PUBLIC_YOUTUBE_URL;

// Helper to extract playlist ID from URL
function extractPlaylistId(url: string): string | null {
  if (!url) return null;
  
  // Handle playlist URL
  const playlistMatch = url.match(/[?&]playlist_id=([^&]+)/);
  if (playlistMatch) return playlistMatch[1];
  
  // Handle list parameter
  const listMatch = url.match(/[?&]list=([^&]+)/);
  if (listMatch) return listMatch[1];
  
  return null;
}

// Parse ISO 8601 duration to readable format
function parseDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes} min`;
}

// Fetch all episodes using YouTube Data API v3
async function fetchWithYouTubeAPI(playlistId: string) {
  if (!YOUTUBE_API_KEY) {
    throw new Error('YouTube API key not configured');
  }

  const allVideos: any[] = [];
  let nextPageToken: string | undefined;

  // Fetch all pages (max 50 items per page)
  do {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
    
    const response = await fetch(url, { cache: "no-store" });
    
    if (!response.ok) {
      throw new Error(`YouTube API request failed: ${response.status}`);
    }

    const data = await response.json();
        allVideos.push(...data.items);
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);

  // Get video IDs for duration lookup
  const videoIds = allVideos
    .map((item) => {
      const videoId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
      return videoId;
    })
    .filter(Boolean);
  
  // Fetch durations in batches of 50
  const durations = new Map<string, string>();
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const durationUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${batch.join(',')}&key=${YOUTUBE_API_KEY}`;
    
    const durationRes = await fetch(durationUrl, { cache: "no-store" });
    if (durationRes.ok) {
      const durationData = await durationRes.json();
      
      durationData.items?.forEach((item: any) => {
        durations.set(item.id, parseDuration(item.contentDetails.duration));
      });
    }
  }

  // Transform to episode format
  const episodes = allVideos
    .map((video, idx) => {
      const videoId = video.contentDetails?.videoId || video.snippet?.resourceId?.videoId;
      const title = video.snippet?.title || '';
      const description = video.snippet?.description || '';
      
      // Skip videos with missing or invalid video IDs
      if (!videoId || videoId === 'undefined' || videoId === 'null') {
        return null;
      }
      
      // Skip deleted videos
      if (title === 'Deleted video' || title === 'Private video' || 
          description.includes('This video is unavailable') ||
          description.includes('This video is private')) {
        return null;
      }
      
      const thumbnail = video.snippet?.thumbnails?.high?.url 
        || video.snippet?.thumbnails?.medium?.url 
        || video.snippet?.thumbnails?.default?.url
        || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      const cleanDescription = description
        .replace(/\n\n+/g, '\n\n')
        .trim()
        .substring(0, 500);

      const published = video.snippet?.publishedAt || video.contentDetails?.videoPublishedAt;

      const episode = {
        id: `youtube-${videoId}`,
        guid: videoId,
        title: title,
        link: `https://www.youtube.com/watch?v=${videoId}`,
        pubDate: new Date(published).toISOString(),
        publishDate: new Date(published).toISOString().split('T')[0],
        description: cleanDescription,
        audioUrl: undefined,
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail,
        duration: durations.get(videoId) || '',
        platform: 'youtube' as const,
        externalUrl: `https://www.youtube.com/watch?v=${videoId}`,
      };
      
      return episode;
    })
    .filter((episode): episode is NonNullable<typeof episode> => episode !== null);
  
  return episodes;
}

// Fallback: Parse YouTube RSS feed
async function parseYouTubeRss(xml: string) {
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .map((m) => {
      const pick = (tag: string) => {
        const match = m[1].match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
        return match?.[1].trim() ?? "";
      };
      
      const getAttr = (re: RegExp) => m[1].match(re)?.[1] ?? "";
      
      const cleanText = (text: string) => 
        text.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim();
      
      const title = cleanText(pick("title"));
      const description = cleanText(pick("media:description"));
      const published = pick("published");
      const videoId = pick("yt:videoId");
      const link = `https://www.youtube.com/watch?v=${videoId}`;
      
      // Skip deleted/private videos
      if (title === 'Deleted video' || title === 'Private video' || 
          description.includes('This video is unavailable') ||
          description.includes('This video is private')) {
        return null;
      }
      
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
        duration: '',
        platform: 'youtube' as const,
        externalUrl: link,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
  
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

    const playlistId = extractPlaylistId(YOUTUBE_RSS_URL);
    
    if (!playlistId) {
      throw new Error('Could not extract playlist ID from URL');
    }

    let episodes: any[] = [];

    // Try YouTube API first (gets ALL episodes + durations)
    if (YOUTUBE_API_KEY) {
      try {
        episodes = await fetchWithYouTubeAPI(playlistId);
      } catch (apiError: any) {
        // Fall through to RSS fallback
      }
    }

    // Fallback to RSS if API failed or not configured (only gets 15 most recent)
    if (episodes.length === 0) {
      const response = await fetch(YOUTUBE_RSS_URL, { cache: "no-store" });
      
      if (!response.ok) {
        throw new Error(`YouTube RSS fetch failed: ${response.status}`);
      }

      const xml = await response.text();
      const data = await parseYouTubeRss(xml);
      episodes = data.episodes;
    }

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
    logger.error('YouTube fetch error', err, {
      playlistId: extractPlaylistId(YOUTUBE_RSS_URL || ''),
      hasApiKey: !!YOUTUBE_API_KEY,
    });
    
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

