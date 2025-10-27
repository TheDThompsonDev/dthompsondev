import { NextResponse } from "next/server";

export const runtime = "edge";

async function readJSONFromBlob() {
  const baseUrl = process.env.NEXT_PUBLIC_BLOB_BASE_URL;
  
  if (!baseUrl) {
    console.warn("NEXT_PUBLIC_BLOB_BASE_URL not configured - returning empty data");
    return {
      episodes: [],
      error: "Blob not configured",
      refreshedAt: new Date().toISOString(),
      source: "no-blob-config"
    };
  }
  
  try {
    // Construct the full blob URL - make sure it's absolute
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const blobUrl = `${cleanBaseUrl}/podcast/latest.json`;
    
    console.log('Fetching from blob URL:', blobUrl);
    
    // Fetch the content from the blob URL with absolute URL
    const response = await fetch(blobUrl, { 
      cache: "no-store",
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blob: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Successfully loaded blob data, episodes count:', data.episodes?.length || 0);
    return data;
  } catch (error) {
    console.error('Blob read error:', error);
    throw error; // Re-throw to trigger fallback
  }
}

export async function GET() {
  console.log('Podcast JSON endpoint called');
  
  // Try to get data from blob first
  try {
    const data = await readJSONFromBlob();
    
    // If we got episodes, return them
    if (data.episodes && data.episodes.length > 0) {
      console.log('Returning episodes from blob:', data.episodes.length);
      return new NextResponse(JSON.stringify(data), {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "s-maxage=86400, stale-while-revalidate=604800"
        },
      });
    }
  } catch (blobError) {
    console.error('Blob read failed, trying fallback:', blobError);
  }
  
  // If blob fails or returns no episodes, try refresh endpoint as fallback
  console.log('No episodes from blob, trying refresh endpoint fallback...');
  try {
    const fallbackBaseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const refreshUrl = `${fallbackBaseUrl}/api/podcast/refresh`;
    
    console.log('Fetching from refresh endpoint:', refreshUrl);
    
    const refreshResponse = await fetch(refreshUrl, { 
      cache: "no-store" 
    });
    
    if (refreshResponse.ok) {
      const refreshData = await refreshResponse.json();
      if (refreshData.episodes && refreshData.episodes.length > 0) {
        console.log('Returning episodes from refresh endpoint:', refreshData.episodes.length);
        return new NextResponse(JSON.stringify({
          episodes: refreshData.episodes,
          refreshedAt: refreshData.refreshedAt,
          source: "refresh-endpoint-fallback"
        }), {
          headers: {
            "content-type": "application/json; charset=utf-8",
            "cache-control": "s-maxage=3600, stale-while-revalidate=7200"
          },
        });
      }
    }
  } catch (fallbackError) {
    console.error('Fallback refresh also failed:', fallbackError);
  }
  
  // If everything fails, return error
  console.error('All methods failed, returning error response');
  return new NextResponse(JSON.stringify({ 
    episodes: [], 
    error: "Failed to load podcast episodes from all sources",
    refreshedAt: new Date().toISOString(),
    debug: {
      hasBaseUrl: !!process.env.NEXT_PUBLIC_BLOB_BASE_URL,
      hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN,
      baseUrlValue: process.env.NEXT_PUBLIC_APP_URL
    }
  }), {
    status: 200,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
