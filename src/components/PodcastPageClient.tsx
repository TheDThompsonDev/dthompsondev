'use client';

import { useState } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PodcastEpisode, type PodcastEpisode as PodcastEpisodeType } from '@/components/PodcastEpisode';
import { PodcastFilter } from '@/components/PodcastFilter';

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
  const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>(episodes);

  const handleFilterChange = (newFilteredEpisodes: Episode[]) => {
    setFilteredEpisodes(newFilteredEpisodes);
  };

  return (
    <>
      {/* Platform Filter */}
      <section className="px-8 md:px-16 pb-8">
        <ScrollReveal delay={100}>
          <PodcastFilter episodes={episodes} onFilterChange={handleFilterChange} />
        </ScrollReveal>
      </section>

      {/* Episodes Grid */}
      <section className="px-8 md:px-16 pb-16">
        <ScrollReveal delay={200}>
          <div className="grid gap-6 md:gap-8">
            {error ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold text-[#153230] mb-4">Error Loading Episodes</h3>
                <p className="text-[#153230]/70 mb-6">{error}</p>
                <p className="text-sm text-[#153230]/50">Episodes are refreshed automatically every Thursday</p>
              </div>
            ) : filteredEpisodes.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold text-[#153230] mb-4">No Episodes Found</h3>
                <p className="text-[#153230]/70">Check back soon for new episodes!</p>
              </div>
            ) : (
              filteredEpisodes.map((episode, index) => (
                <PodcastEpisode key={episode.id} episode={episode as PodcastEpisodeType} index={index} />
              ))
            )}
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
