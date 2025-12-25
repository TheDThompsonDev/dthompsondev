import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = process.env.VERCEL_URL || 'localhost:3000';
    const origin = `${protocol}://${host}`;
    const youtubeResponse = await fetch(`${origin}/api/podcast/youtube`, {
      cache: 'no-store'
    });
    const youtubeData = await youtubeResponse.json();
    const youtubeEpisodes = youtubeData.episodes || [];
    const spotifyResponse = await fetch(`${origin}/api/podcast/spotify`, {
      cache: 'no-store'
    });
    const spotifyData = await spotifyResponse.json();
    const spotifyEpisodes = spotifyData.episodes || [];

    const youtubeDates = new Set(youtubeEpisodes.map((ep: any) => ep.publishDate));
    const spotifyDates = new Set(spotifyEpisodes.map((ep: any) => ep.publishDate));

    const exactMatches = youtubeEpisodes.filter((ytEp: any) =>
      spotifyDates.has(ytEp.publishDate)
    );

    const unmatchedYouTube = youtubeEpisodes.filter((ytEp: any) =>
      !spotifyDates.has(ytEp.publishDate)
    );
    const unmatchedSpotify = spotifyEpisodes.filter((spEp: any) =>
      !youtubeDates.has(spEp.publishDate)
    );

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      summary: {
        youtubeCount: youtubeEpisodes.length,
        spotifyCount: spotifyEpisodes.length,
        exactDateMatches: exactMatches.length,
        unmatchedYouTube: unmatchedYouTube.length,
        unmatchedSpotify: unmatchedSpotify.length,
      },
      youtube: {
        count: youtubeEpisodes.length,
        source: youtubeData.source || 'YouTube API',
        episodes: youtubeEpisodes.map((ep: any) => ({
          title: ep.title,
          publishDate: ep.publishDate,
          pubDate: ep.pubDate,
          videoId: ep.guid,
          videoUrl: ep.videoUrl,
          thumbnail: ep.thumbnail,
          duration: ep.duration,
          platform: ep.platform,
        })),
      },
      spotify: {
        count: spotifyEpisodes.length,
        source: spotifyData.source || 'Spotify RSS',
        episodes: spotifyEpisodes.map((ep: any) => ({
          title: ep.title,
          publishDate: ep.publishDate,
          pubDate: ep.pubDate,
          audioUrl: ep.audioUrl,
          thumbnail: ep.thumbnail,
          duration: ep.duration,
          platform: ep.platform,
        })),
      },
      comparison: {
        exactMatches: exactMatches.map((ep: any) => ({
          date: ep.publishDate,
          youtubeTitle: ep.title,
          spotifyTitle: spotifyEpisodes.find((sp: any) => sp.publishDate === ep.publishDate)?.title,
        })),
        unmatchedYouTube: unmatchedYouTube.map((ep: any) => ({
          date: ep.publishDate,
          title: ep.title,
          videoUrl: ep.videoUrl,
        })),
        unmatchedSpotify: unmatchedSpotify.map((ep: any) => ({
          date: ep.publishDate,
          title: ep.title,
          audioUrl: ep.audioUrl,
        })),
      },
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      }
    });

  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
