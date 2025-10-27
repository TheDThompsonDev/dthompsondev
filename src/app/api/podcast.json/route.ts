import { NextResponse } from "next/server";

export const runtime = "edge";

const USE_BLOB = !!process.env.BLOB_READ_WRITE_TOKEN;

async function readJSON(key: string) {
  if (USE_BLOB) {
    try {
      // Use the direct blob URL instead of getDownloadUrl
      const baseUrl = process.env.NEXT_PUBLIC_BLOB_BASE_URL;
      
      if (!baseUrl) {
        throw new Error('NEXT_PUBLIC_BLOB_BASE_URL not configured');
      }
      
      const blobUrl = `${baseUrl}${key.startsWith('/') ? key.substring(1) : key}`;
      
      // Fetch the content from the blob URL
      const response = await fetch(blobUrl, { cache: "no-store" });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch blob: ${response.status}`);
      }
      
      const text = await response.text();
      const data = JSON.parse(text);
      return data;
    } catch (error) {
      console.error('Blob read error:', error);
      // Return fallback data instead of throwing
      return {
        episodes: [],
        error: `Blob read failed: ${error}`,
        refreshedAt: new Date().toISOString(),
        source: "error-fallback"
      };
    }
  }
  
  // Fallback: return empty data for local development
  console.warn("No Blob configured. Returning empty data (local development mode).");
  return {
    episodes: [],
    error: "Blob not configured - this is expected in local development",
    refreshedAt: new Date().toISOString(),
    source: "local-development"
  };
}

export async function GET() {
  try {
    const data = await readJSON("podcast/latest.json");
    return new NextResponse(JSON.stringify(data), {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "s-maxage=86400, stale-while-revalidate=604800"
      },
    });
  } catch (e: any) {
    console.error('Error reading podcast data:', e);
    return new NextResponse(JSON.stringify({ 
      episodes: [], 
      error: e.message,
      refreshedAt: new Date().toISOString()
    }), {
      status: 200,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
}
