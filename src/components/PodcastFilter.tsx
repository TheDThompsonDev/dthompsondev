'use client';

import { useState } from 'react';

interface PodcastFilterProps {
  episodes: any[];
  onFilterChange: (filteredEpisodes: any[]) => void;
}

export function PodcastFilter({ episodes, onFilterChange }: PodcastFilterProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'spotify' | 'youtube'>('all');

  const handlePlatformChange = (platform: 'all' | 'spotify' | 'youtube') => {
    setSelectedPlatform(platform);

    const filtered = platform === 'all'
      ? episodes
      : episodes.filter(episode => episode.platform === platform);

    onFilterChange(filtered);
  };

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-[#E2F3F2] rounded-full p-2 flex gap-2">
        <button
          onClick={() => handlePlatformChange('all')}
          className={`px-6 py-3 rounded-full font-bold transition-all ${selectedPlatform === 'all'
            ? 'bg-[#153230] text-white shadow-lg'
            : 'text-[#153230]/70 hover:text-[#153230]'
            }`}
        >
          All Episodes
        </button>
        <button
          onClick={() => handlePlatformChange('youtube')}
          className={`px-6 py-3 rounded-full font-bold transition-all ${selectedPlatform === 'youtube'
            ? 'bg-[#CC0000] text-white shadow-lg'
            : 'text-[#153230]/70 hover:text-[#153230]'
            }`}
        >
          YouTube
        </button>
        <button
          onClick={() => handlePlatformChange('spotify')}
          className={`px-6 py-3 rounded-full font-bold transition-all ${selectedPlatform === 'spotify'
            ? 'bg-[#15803d] text-white shadow-lg'
            : 'text-[#153230]/70 hover:text-[#153230]'
            }`}
        >
          Spotify
        </button>
      </div>
    </div>
  );
}
