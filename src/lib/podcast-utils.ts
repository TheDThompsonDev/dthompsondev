/**
 * Shared utility functions for podcast functionality
 * Centralized to avoid duplication across components
 */

import type { Episode } from '@/types/podcast';

/**
 * Format a date string to a human-readable format
 * Uses UTC to avoid timezone issues with YYYY-MM-DD dates
 */
export function formatPodcastDate(dateString: string): string {
  const date = new Date(dateString + 'T12:00:00Z');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
}

/**
 * Format a date string to a shorter format for compact displays
 */
export function formatPodcastDateShort(dateString: string): string {
  const date = new Date(dateString + 'T12:00:00Z');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  });
}

/**
 * Get YouTube thumbnail URL with fallback quality levels
 * @param baseUrl - The original thumbnail URL
 * @param qualityLevel - 0 = hq, 1 = mq, 2 = default
 */
export function getYouTubeThumbnailUrl(baseUrl: string | undefined, qualityLevel: number = 0): string | undefined {
  if (!baseUrl) return undefined;
  
  const qualities = ['hqdefault.jpg', 'mqdefault.jpg', 'default.jpg'];
  const targetQuality = qualities[qualityLevel];
  
  if (!baseUrl.includes('i.ytimg.com') || !targetQuality) {
    return baseUrl;
  }
  
  return baseUrl.replace(/hqdefault\.jpg|mqdefault\.jpg|default\.jpg/, targetQuality);
}

/**
 * Normalize title for comparison
 * Removes episode numbers and common prefixes to focus on content
 */
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    // Remove common episode prefixes and numbers
    .replace(/^(episode|ep\.?|#)\s*\d+[\s:-]*/i, '')
    .replace(/^e\d+[\s:-]*/i, '') // e.g., "E123: Title"
    // Remove special characters but keep spaces
    .replace(/[^a-z0-9\s]/g, ' ')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Check if two titles are similar enough to be considered the same episode
 * Uses multiple strategies with appropriate thresholds
 */
function areTitlesSimilar(title1: string, title2: string, threshold: number = 0.75): boolean {
  const norm1 = normalizeTitle(title1);
  const norm2 = normalizeTitle(title2);
  
  // Exact match after normalization
  if (norm1 === norm2) return true;
  
  // Check if one contains the other (handles "Title" vs "Title - Guest Name")
  if (norm1.includes(norm2) || norm2.includes(norm1)) return true;
  
  // Jaccard similarity for partial matches
  // Filter out short words (< 3 chars) to reduce noise
  const words1 = new Set(norm1.split(' ').filter(w => w.length > 2));
  const words2 = new Set(norm2.split(' ').filter(w => w.length > 2));
  
  // If either title has no significant words, can't compare
  if (words1.size === 0 || words2.size === 0) return false;
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  const similarity = intersection.size / union.size;
  
  // Adjust threshold based on title length
  // Shorter titles need higher similarity to avoid false positives
  const adjustedThreshold = words1.size < 3 || words2.size < 3 
    ? 0.85 
    : threshold;
  
  return similarity >= adjustedThreshold;
}

/**
 * Merge YouTube and Spotify episodes by index
 * 
 * Strategy: Simple index-based merging that works because:
 * 1. Deleted videos are filtered out before this function is called
 * 2. Both platforms publish episodes in the same order
 * 3. Arrays are perfectly aligned after filtering
 * 
 * This simple approach prevents duplicate episodes that complex matching can create.
 */
export function mergeEpisodesByIndex(episodes: Episode[]): Episode[] {
  const youtubeEpisodes = episodes.filter(ep => ep.platform === 'youtube');
  const spotifyEpisodes = episodes.filter(ep => ep.platform === 'spotify');
  
  const merged: Episode[] = [];
  const maxLength = Math.max(youtubeEpisodes.length, spotifyEpisodes.length);
  
  // Simple index-based merging - arrays are aligned after deleted video filtering
  for (let i = 0; i < maxLength; i++) {
    const youtube = youtubeEpisodes[i];
    const spotify = spotifyEpisodes[i];
    
    if (youtube && spotify) {
      // Both exist at this index - merge them
      merged.push({
        ...spotify,
        videoUrl: youtube.videoUrl,
        thumbnail: youtube.thumbnail,
        duration: youtube.duration || spotify.duration,
        externalUrl: youtube.videoUrl || youtube.externalUrl,
      });
    } else if (youtube) {
      // YouTube-only episode
      merged.push(youtube);
    } else if (spotify) {
      // Spotify-only episode
      merged.push(spotify);
    }
  }
  
  // Sort by publish date (newest first)
  merged.sort((a, b) => {
    const dateA = new Date(a.publishDate).getTime();
    const dateB = new Date(b.publishDate).getTime();
    return dateB - dateA;
  });
  
  return merged;
}

/**
 * Check if an episode has multiple platform links
 */
export function hasMultiplePlatforms(episode: Episode): boolean {
  return !!(episode.audioUrl && episode.videoUrl);
}

/**
 * Get the appropriate link for an episode based on platform
 */
export function getEpisodeLink(episode: Episode, preferredPlatform: 'spotify' | 'youtube' = 'spotify'): string {
  if (preferredPlatform === 'spotify' && episode.audioUrl) {
    return episode.platform === 'spotify' ? episode.externalUrl : episode.audioUrl;
  }
  
  if (preferredPlatform === 'youtube' && episode.videoUrl) {
    return episode.platform === 'youtube' ? episode.externalUrl : episode.videoUrl;
  }
  
  return episode.externalUrl;
}

