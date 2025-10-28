/**
 * Shared TypeScript types for podcast functionality
 * Centralized to avoid duplication across components
 */

export interface Episode {
  id: string;
  guid: string;
  title: string;
  link: string;
  pubDate: string;
  publishDate: string;
  description: string;
  audioUrl: string;
  videoUrl?: string;
  thumbnail: string;
  duration: string;
  platform: 'spotify' | 'youtube';
  externalUrl: string;
}

export interface PodcastData {
  episodes: Episode[];
  refreshedAt: string;
  source: string;
  error?: string;
}

export interface PodcastError {
  message: string;
  code?: string;
  timestamp: string;
}

