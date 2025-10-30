/**
 * Shared YouTube episode fetching logic
 * Used by both /api/podcast/youtube and /api/podcast/refresh
 */

import { logger } from "@/lib/logger";

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

// Fetch episodes using YouTube Data API v3 (recommended)
async function fetchWithYouTubeAPI(playlistId: string, apiKey: string) {
  if (!apiKey) {
    throw new Error('YouTube API key not configured');
  }

  const allVideos: any[] = [];
  let nextPageToken: string | undefined;

  do {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&key=${apiKey}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
    
    const response = await fetch(url, { cache: "no-store" });
    
    if (!response.ok) {
      if (response.status === 429) {
        logger.warn('YouTube API rate limited', { playlistId });
        throw new Error('RATE_LIMITED');
      }
      
      if (response.status === 403) {
        const errorText = await response.text();
        const data = JSON.parse(errorText);
        if (data.error?.errors?.[0]?.reason === 'quotaExceeded') {
          logger.error('YouTube API quota exceeded', { playlistId });
          throw new Error('QUOTA_EXCEEDED');
        }
      }
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
    const durationUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${batch.join(',')}&key=${apiKey}`;
    
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

// Fallback: Parse YouTube RSS feed (only gets ~15 most recent)
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
      
      if (!videoId || videoId === 'undefined' || title === 'Deleted video' || title === 'Private video') {
        return null;
      }
      
      const cleanDescription = description.substring(0, 500);

      return {
        id: `youtube-${videoId}`,
        guid: videoId,
        title,
        link,
        pubDate: new Date(published).toISOString(),
        publishDate: new Date(published).toISOString().split('T')[0],
        description: cleanDescription,
        audioUrl: undefined,
        videoUrl: link,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        duration: '',
        platform: 'youtube' as const,
        externalUrl: link,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
  
  return { episodes: entries };
}

/**
 * Fetch YouTube episodes
 * Tries YouTube Data API first (gets all episodes + durations)
 * Falls back to RSS if API fails (only gets ~15 most recent)
 */
export async function fetchYouTubeEpisodes() {
  try {
    // Access environment variables dynamically for Edge runtime compatibility
    const youtubeApiKey = process.env.YOUTUBE_API_KEY;
    const youtubeRssUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL;

    if (!youtubeRssUrl) {
      logger.warn('YouTube RSS URL not configured');
      return [];
    }

    const playlistId = extractPlaylistId(youtubeRssUrl);
    
    if (!playlistId) {
      logger.warn('Could not extract playlist ID from URL', { url: youtubeRssUrl });
      return [];
    }

    let episodes: any[] = [];

    // Try YouTube API first (gets ALL episodes + durations)
    if (youtubeApiKey) {
      try {
        episodes = await fetchWithYouTubeAPI(playlistId, youtubeApiKey);
        logger.info('YouTube episodes fetched via API', { count: episodes.length });
      } catch (apiError: any) {
        logger.warn('YouTube API failed, falling back to RSS', { error: apiError.message });
        // Fall through to RSS fallback
      }
    } else {
      logger.info('YouTube API key not configured, using RSS');
    }

    // Fallback to RSS if API failed or not configured (only gets 15 most recent)
    if (episodes.length === 0) {
      const response = await fetch(youtubeRssUrl, { cache: "no-store" });
      
      if (!response.ok) {
        logger.error('YouTube RSS fetch failed', { status: response.status });
        return [];
      }

      const xml = await response.text();
      const data = await parseYouTubeRss(xml);
      episodes = data.episodes;
      logger.info('YouTube episodes fetched via RSS', { count: episodes.length });
    }

    return episodes;
  } catch (err: any) {
    logger.error('YouTube fetch error', err);
    return [];
  }
}

