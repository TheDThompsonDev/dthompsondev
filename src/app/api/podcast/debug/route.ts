import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { origin } = new URL(request.url);
    
    console.log('\n======================================');
    console.log('🔍 DEBUG: Fetching Separate Episode Lists');
    console.log('======================================\n');

    // Fetch YouTube episodes
    console.log('📺 Fetching YouTube episodes...');
    const youtubeResponse = await fetch(`${origin}/api/podcast/youtube`, {
      cache: 'no-store'
    });
    const youtubeData = await youtubeResponse.json();
    const youtubeEpisodes = youtubeData.episodes || [];
    
    console.log(`✅ YouTube: ${youtubeEpisodes.length} episodes`);
    console.log('\nYouTube Episodes (first 5):');
    youtubeEpisodes.slice(0, 5).forEach((ep: any, idx: number) => {
      console.log(`\n  ${idx + 1}. ${ep.title}`);
      console.log(`     Date: ${ep.publishDate}`);
      console.log(`     VideoId: ${ep.guid}`);
      console.log(`     VideoUrl: ${ep.videoUrl}`);
      console.log(`     Thumbnail: ${ep.thumbnail?.substring(0, 80)}`);
      console.log(`     Duration: ${ep.duration || 'N/A'}`);
    });

    // Fetch Spotify episodes
    console.log('\n\n🎵 Fetching Spotify episodes...');
    const spotifyResponse = await fetch(`${origin}/api/podcast/spotify`, {
      cache: 'no-store'
    });
    const spotifyData = await spotifyResponse.json();
    const spotifyEpisodes = spotifyData.episodes || [];
    
    console.log(`✅ Spotify: ${spotifyEpisodes.length} episodes`);
    console.log('\nSpotify Episodes (first 5):');
    spotifyEpisodes.slice(0, 5).forEach((ep: any, idx: number) => {
      console.log(`\n  ${idx + 1}. ${ep.title}`);
      console.log(`     Date: ${ep.publishDate}`);
      console.log(`     AudioUrl: ${ep.audioUrl}`);
      console.log(`     Thumbnail: ${ep.thumbnail?.substring(0, 80)}`);
      console.log(`     Duration: ${ep.duration || 'N/A'}`);
    });

    // Compare dates to find potential matches
    console.log('\n\n🔍 Potential Date Matches:');
    const youtubeDates = new Set(youtubeEpisodes.map((ep: any) => ep.publishDate));
    const spotifyDates = new Set(spotifyEpisodes.map((ep: any) => ep.publishDate));
    
    const exactMatches = youtubeEpisodes.filter((ytEp: any) => 
      spotifyDates.has(ytEp.publishDate)
    );
    console.log(`✅ ${exactMatches.length} episodes with exact date matches`);
    
    const unmatchedYouTube = youtubeEpisodes.filter((ytEp: any) => 
      !spotifyDates.has(ytEp.publishDate)
    );
    const unmatchedSpotify = spotifyEpisodes.filter((spEp: any) => 
      !youtubeDates.has(spEp.publishDate)
    );
    
    console.log(`⚠️  ${unmatchedYouTube.length} YouTube episodes without exact date match`);
    console.log(`⚠️  ${unmatchedSpotify.length} Spotify episodes without exact date match`);
    
    if (unmatchedYouTube.length > 0) {
      console.log('\nUnmatched YouTube episodes (first 10):');
      unmatchedYouTube.slice(0, 10).forEach((ep: any) => {
        console.log(`  - ${ep.publishDate}: ${ep.title.substring(0, 60)}`);
      });
    }
    
    if (unmatchedSpotify.length > 0) {
      console.log('\nUnmatched Spotify episodes (first 10):');
      unmatchedSpotify.slice(0, 10).forEach((ep: any) => {
        console.log(`  - ${ep.publishDate}: ${ep.title.substring(0, 60)}`);
      });
    }

    console.log('\n======================================');
    console.log('🔍 DEBUG: Complete');
    console.log('======================================\n');

    // Return comprehensive comparison
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
    console.error('❌ Debug endpoint error:', error);
    return NextResponse.json({
      ok: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

