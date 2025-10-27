# Podcast API Integration

This API integrates both Spotify and YouTube podcast episodes into a unified feed.

## Environment Variables Required

### Required
- `NEXT_PUBLIC_YOUTUBE_URL` - Your YouTube RSS feed URL
  - **Channel RSS**: `https://www.youtube.com/feeds/videos.xml?channel_id=YOUR_CHANNEL_ID`
  - **Playlist RSS**: `https://www.youtube.com/feeds/videos.xml?playlist_id=YOUR_PLAYLIST_ID`
- `NEXT_PUBLIC_APP_URL` - Your application URL (e.g., `https://yourdomain.com` or `http://localhost:3000` for local dev)
- `PODCAST_RSS_URL` - Your Spotify podcast RSS feed URL (defaults to anchor.fm feed)

### Optional
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage token for persisting episode data

## API Endpoints

### `/api/podcast/youtube`
Fetches episodes from your YouTube playlist.

**Returns:**
```json
{
  "ok": true,
  "episodes": [...],
  "count": 10,
  "refreshedAt": "2023-10-27T12:00:00.000Z"
}
```

### `/api/podcast/refresh`
Fetches and merges episodes from both Spotify RSS feed and YouTube playlist.

**Returns:**
```json
{
  "ok": true,
  "episodesCount": 20,
  "spotifyCount": 10,
  "youtubeCount": 10,
  "refreshedAt": "2023-10-27T12:00:00.000Z",
  "blobConfigured": true,
  "episodes": [...]
}
```

### `/api/podcast.json`
Serves the cached episode data from Vercel Blob storage. Falls back to refresh endpoint if blob is not available.

## Finding Your YouTube RSS Feed URL

### For a Playlist:
1. Go to your YouTube playlist
2. Look at the URL: `https://www.youtube.com/playlist?list=PLAYLIST_ID`
3. Copy the `PLAYLIST_ID`
4. Use: `https://www.youtube.com/feeds/videos.xml?playlist_id=PLAYLIST_ID`

### For a Channel:
1. Go to your YouTube channel
2. View page source and search for `channelId` or `channel_id`
3. Use: `https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID`

**Note**: YouTube RSS feeds return the most recent 15 videos. For more episodes, consider using a playlist.

## How It Works

1. The `/api/podcast/refresh` endpoint fetches:
   - Spotify episodes from the RSS feed
   - YouTube episodes from the playlist
   
2. Episodes are merged and sorted by publication date (newest first)

3. The merged data is stored in Vercel Blob (if configured) for fast subsequent loads

4. The podcast page displays episodes from both platforms with appropriate badges and links

## Testing

To test the integration locally:

```bash
# Test YouTube endpoint
curl http://localhost:3000/api/podcast/youtube

# Test refresh endpoint (fetches both sources)
curl http://localhost:3000/api/podcast/refresh

# Test the main podcast data endpoint
curl http://localhost:3000/api/podcast.json
```

## Platform Detection

Episodes are automatically tagged with the correct platform:
- Spotify episodes: Tagged as `platform: 'spotify'` with green badge
- YouTube episodes: Tagged as `platform: 'youtube'` with red badge

The UI will display appropriate links and styling for each platform.

