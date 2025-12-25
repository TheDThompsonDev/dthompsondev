'use client';

import { useMemo } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { PodcastEpisode } from '@/components/PodcastEpisode';
import { PodcastErrorBoundary } from '@/components/PodcastErrorBoundary';
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
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#153230]/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#153230]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#153230] mb-4">Unable to Load Episodes</h3>
            <p className="text-[#153230]/70 mb-6">{error}</p>
            <p className="text-sm text-[#153230]/50 mb-6">Episodes are refreshed automatically. Please try again later.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#153230] text-white px-6 py-3 font-bold uppercase tracking-wider hover:bg-[#4D7DA3] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      ) : mergedEpisodes.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#153230]/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-[#153230]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[#153230] mb-4">No Episodes Available</h3>
          <p className="text-[#153230]/70">Check back soon for new episodes!</p>
        </div>
      ) : (
        <PodcastErrorBoundary>
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
        </PodcastErrorBoundary>
      )}
    </section>
  );
}
