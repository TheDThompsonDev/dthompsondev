'use client';

import { useMemo } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PodcastEpisode, type PodcastEpisode as PodcastEpisodeType } from '@/components/PodcastEpisode';

type Episode = {
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
};

interface PodcastPageClientProps {
  episodes: Episode[];
  error: string | null;
}

export function PodcastPageClient({ episodes, error }: PodcastPageClientProps) {
  // Merge episodes by publish date - same date = same episode on different platforms
  const mergedEpisodes = useMemo(() => {
    const dateMap = new Map<string, Episode>();
    
    episodes.forEach(episode => {
      // Use just the date (YYYY-MM-DD) for comparison
      const dateKey = episode.publishDate; // Already in YYYY-MM-DD format
      
      const existing = dateMap.get(dateKey);
      if (existing) {
        // Merge platform links if we find a match on the same date
        if (episode.platform === 'youtube') {
          existing.videoUrl = episode.videoUrl;
          // Keep the longer/better title
          if (episode.title.length > existing.title.length) {
            existing.title = episode.title;
          }
        } else if (episode.platform === 'spotify') {
          existing.audioUrl = episode.audioUrl;
          // Keep Spotify as primary if it exists
          if (!existing.audioUrl) {
            existing.title = episode.title;
            existing.description = episode.description;
          }
        }
      } else {
        // Add new episode
        dateMap.set(dateKey, { ...episode });
      }
    });
    
    // Sort by date, newest first
    return Array.from(dateMap.values()).sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return dateB - dateA;
    });
  }, [episodes]);

  return (
    <section className="px-4 md:px-8 pb-16">
      {error ? (
        <div className="text-center py-16">
          <h3 className="text-2xl font-bold text-[#153230] mb-4">Error Loading Episodes</h3>
          <p className="text-[#153230]/70 mb-6">{error}</p>
          <p className="text-sm text-[#153230]/50">Episodes are refreshed automatically every Thursday</p>
        </div>
      ) : mergedEpisodes.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-2xl font-bold text-[#153230] mb-4">No Episodes Found</h3>
          <p className="text-[#153230]/70">Check back soon for new episodes!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {mergedEpisodes.map((episode, index) => (
            <ScrollReveal key={episode.id} delay={index * 50}>
              <PodcastEpisode episode={episode as PodcastEpisodeType} index={index} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </section>
  );
}
