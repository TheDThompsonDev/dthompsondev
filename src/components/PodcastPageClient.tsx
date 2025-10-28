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
  // Merge episodes by order/index - YouTube and Spotify episodes are now perfectly aligned after filtering deleted videos
  const mergedEpisodes = useMemo(() => {
    // Separate YouTube and Spotify episodes
    const youtubeEpisodes = episodes.filter(ep => ep.platform === 'youtube');
    const spotifyEpisodes = episodes.filter(ep => ep.platform === 'spotify');
    
    console.log(`Found ${youtubeEpisodes.length} YouTube and ${spotifyEpisodes.length} Spotify episodes`);
    
    // Since they're now perfectly aligned after filtering deleted videos,
    // we can merge them by index (order)
    const merged: Episode[] = [];
    const maxLength = Math.max(youtubeEpisodes.length, spotifyEpisodes.length);
    
    for (let i = 0; i < maxLength; i++) {
      const youtube = youtubeEpisodes[i];
      const spotify = spotifyEpisodes[i];
      
      if (youtube && spotify) {
        // Both exist - merge them, prioritizing YouTube thumbnail and Spotify metadata
        merged.push({
          ...spotify, // Use Spotify as base (title, description, audioUrl)
          videoUrl: youtube.videoUrl,
          thumbnail: youtube.thumbnail, // Prioritize YouTube thumbnail
          duration: youtube.duration || spotify.duration,
          externalUrl: youtube.videoUrl || youtube.externalUrl,
        });
        console.log(`Merged by index ${i}: "${spotify.title.substring(0, 40)}"`);
      } else if (youtube) {
        // Only YouTube exists
        merged.push(youtube);
        console.log(`YouTube only at index ${i}: "${youtube.title.substring(0, 40)}"`);
      } else if (spotify) {
        // Only Spotify exists
        merged.push(spotify);
        console.log(`Spotify only at index ${i}: "${spotify.title.substring(0, 40)}"`);
      }
    }
    
    console.log('Top 3 merged episodes:', merged.slice(0, 3).map((ep, idx) => ({
      index: idx + 1,
      title: ep.title.substring(0, 40),
      platform: ep.platform,
      hasAudio: !!ep.audioUrl,
      hasVideo: !!ep.videoUrl,
      videoUrl: ep.videoUrl?.substring(0, 60),
      externalUrl: ep.externalUrl?.substring(0, 60),
    })));
    
    return merged;
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
              <PodcastEpisode 
                episode={episode as PodcastEpisodeType}
                // Reverse numbering: Episode 1 = oldest, highest number = newest
                index={mergedEpisodes.length - index - 1} 
              />
            </ScrollReveal>
          ))}
        </div>
      )}
    </section>
  );
}
