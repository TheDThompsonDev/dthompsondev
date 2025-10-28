'use client';

import { useMemo } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PodcastEpisode } from '@/components/PodcastEpisode';
import { mergeEpisodesByIndex } from '@/lib/podcast-utils';
import type { Episode } from '@/types/podcast';

interface PodcastPageClientProps {
  episodes: Episode[];
  error: string | null;
}

export function PodcastPageClient({ episodes, error }: PodcastPageClientProps) {
  // Merge episodes by order/index using shared utility
  const mergedEpisodes = useMemo(() => {
    return mergeEpisodesByIndex(episodes);
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
                episode={episode}
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
