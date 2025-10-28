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
 * Merge YouTube and Spotify episodes by index
 * Assumes episodes are already aligned after filtering deleted videos
 */
export function mergeEpisodesByIndex(episodes: Episode[]): Episode[] {
  const youtubeEpisodes = episodes.filter(ep => ep.platform === 'youtube');
  const spotifyEpisodes = episodes.filter(ep => ep.platform === 'spotify');
  
  const merged: Episode[] = [];
  const maxLength = Math.max(youtubeEpisodes.length, spotifyEpisodes.length);
  
  for (let i = 0; i < maxLength; i++) {
    const youtube = youtubeEpisodes[i];
    const spotify = spotifyEpisodes[i];
    
    if (youtube && spotify) {
      // Both exist - merge them, prioritizing YouTube thumbnail and Spotify metadata
      merged.push({
        ...spotify,
        videoUrl: youtube.videoUrl,
        thumbnail: youtube.thumbnail,
        duration: youtube.duration || spotify.duration,
        externalUrl: youtube.videoUrl || youtube.externalUrl,
      });
    } else if (youtube) {
      merged.push(youtube);
    } else if (spotify) {
      merged.push(spotify);
    }
  }
  
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

