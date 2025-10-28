import { NextResponse } from "next/server";

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
      const errorText = await response.text();
      console.error('YouTube API error:', response.status, errorText);
      throw new Error(`YouTube API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Log full API response for debugging
    console.log('=== YouTube API Response ===');
    console.log('Total items in this batch:', data.items?.length || 0);
    console.log('Next page token:', data.nextPageToken || 'none');
    console.log('\nFirst 3 items (full details):');
    data.items?.slice(0, 3).forEach((item: any, idx: number) => {
      console.log(`\n--- Item ${idx + 1} ---`);
      console.log('Title:', item.snippet?.title);
      console.log('VideoId (contentDetails):', item.contentDetails?.videoId);
      console.log('VideoId (resourceId):', item.snippet?.resourceId?.videoId);
      console.log('Published:', item.snippet?.publishedAt);
      console.log('Thumbnails available:', Object.keys(item.snippet?.thumbnails || {}));
      console.log('Full item:', JSON.stringify(item, null, 2));
    });
    console.log('========================\n');
    
    allVideos.push(...data.items);
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);

  console.log(`Fetched ${allVideos.length} videos from YouTube API`);

  // Get video IDs for duration lookup
  const videoIds = allVideos
    .map((item, idx) => {
      const videoId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
      if (!videoId) {
        console.warn(`Video at index ${idx} has no videoId:`, item.snippet?.title);
      }
      return videoId;
    })
    .filter(Boolean);
  
  // Fetch durations in batches of 50
  console.log(`\n=== Fetching Durations for ${videoIds.length} Videos ===`);
  const durations = new Map<string, string>();
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const durationUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${batch.join(',')}&key=${YOUTUBE_API_KEY}`;
    
    console.log(`Fetching batch ${Math.floor(i / 50) + 1}: ${batch.length} videos`);
    const durationRes = await fetch(durationUrl, { cache: "no-store" });
    if (durationRes.ok) {
      const durationData = await durationRes.json();
      console.log(`  Received ${durationData.items?.length || 0} duration entries`);
      
      if (i === 0 && durationData.items?.length > 0) {
        console.log('\n  Sample duration data (first item):');
        console.log('  VideoId:', durationData.items[0].id);
        console.log('  Raw duration:', durationData.items[0].contentDetails?.duration);
        console.log('  Parsed duration:', parseDuration(durationData.items[0].contentDetails?.duration));
      }
      
      durationData.items?.forEach((item: any) => {
        durations.set(item.id, parseDuration(item.contentDetails.duration));
      });
    } else {
      console.warn(`  ⚠️  Duration fetch failed: ${durationRes.status}`);
    }
  }
  console.log(`✅ Fetched durations for ${durations.size} videos`);
  console.log('==========================================\n');

  // Transform to episode format
  console.log('\n=== Transforming Videos to Episodes ===');
  const episodes = allVideos
    .map((video, idx) => {
      const videoId = video.contentDetails?.videoId || video.snippet?.resourceId?.videoId;
      const title = video.snippet?.title || '';
      const description = video.snippet?.description || '';
      
      // Skip videos with missing or invalid video IDs
      if (!videoId || videoId === 'undefined' || videoId === 'null') {
        console.warn(`⚠️  Video ${idx + 1}: SKIPPED - Invalid videoId`);
        console.warn('   Title:', title);
        console.warn('   contentDetails:', JSON.stringify(video.contentDetails));
        console.warn('   resourceId:', JSON.stringify(video.snippet?.resourceId));
        return null;
      }
      
      // Skip deleted videos
      if (title === 'Deleted video' || title === 'Private video' || 
          description.includes('This video is unavailable') ||
          description.includes('This video is private')) {
        console.warn(`⚠️  Video ${idx + 1}: SKIPPED - Deleted/Private video`);
        console.warn('   VideoId:', videoId);
        console.warn('   Title:', title);
        console.warn('   Description:', description.substring(0, 100));
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
      
      if (idx < 3) {
        console.log(`✅ Video ${idx + 1}: Transformed successfully`);
        console.log('   VideoId:', videoId);
        console.log('   Title:', episode.title.substring(0, 60));
        console.log('   VideoUrl:', episode.videoUrl);
        console.log('   Thumbnail:', episode.thumbnail.substring(0, 80));
        console.log('   Duration:', episode.duration || 'N/A');
      }
      
      return episode;
    })
    .filter((episode): episode is NonNullable<typeof episode> => episode !== null);
  
  const skippedCount = allVideos.length - episodes.length;
  console.log(`\n✅ Successfully transformed ${episodes.length} videos`);
  if (skippedCount > 0) {
    console.log(`⚠️  Skipped ${skippedCount} video(s) (deleted, private, or invalid)`);
  }
  console.log('======================================\n');
  
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
        console.warn('⚠️  Skipping deleted/private video from RSS:', videoId);
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
        console.log('Using YouTube Data API v3 for playlist:', playlistId);
        episodes = await fetchWithYouTubeAPI(playlistId);
        console.log('✅ YouTube API: fetched', episodes.length, 'episodes with durations');
      } catch (apiError: any) {
        console.error('YouTube API failed, falling back to RSS:', apiError.message);
        // Fall through to RSS fallback
      }
    }

    // Fallback to RSS if API failed or not configured (only gets 15 most recent)
    if (episodes.length === 0) {
      console.log('Using YouTube RSS feed (limited to 15 episodes):', YOUTUBE_RSS_URL);
      const response = await fetch(YOUTUBE_RSS_URL, { cache: "no-store" });
      
      if (!response.ok) {
        throw new Error(`YouTube RSS fetch failed: ${response.status}`);
      }

      const xml = await response.text();
      const data = await parseYouTubeRss(xml);
      episodes = data.episodes;
      console.log('⚠️  YouTube RSS: fetched', episodes.length, 'episodes (no durations)');
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

