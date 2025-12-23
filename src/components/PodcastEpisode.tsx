'use client';

import { useState, useCallback, useMemo } from 'react';
import { formatPodcastDate, hasMultiplePlatforms } from '@/lib/podcast-utils';
import type { Episode } from '@/types/podcast';

interface PodcastEpisodeProps {
  episode: Episode;
  index?: number;
}

const THUMBNAIL_QUALITIES = ['hqdefault.jpg', 'mqdefault.jpg', 'default.jpg'];
const FALLBACK_IMAGE = 'https://twxvicohcixbzang.public.blob.vercel-storage.com/podcast.jpg';

export function PodcastEpisode({ episode, index = 0 }: PodcastEpisodeProps) {
  const [currentQuality, setCurrentQuality] = useState(0);
  const [hasFailed, setHasFailed] = useState(false);

  // Handle thumbnail load errors with quality fallbacks
  const handleThumbnailError = useCallback(() => {
    if (!episode.thumbnail || !episode.thumbnail.includes('i.ytimg.com')) {
      setHasFailed(true);
      return;
    }

    if (currentQuality >= THUMBNAIL_QUALITIES.length - 1) {
      setHasFailed(true);
      return;
    }

    setCurrentQuality(prev => prev + 1);
  }, [currentQuality, episode.thumbnail]);

  // Get thumbnail URL with current quality level
  const thumbnailUrl = useMemo(() => {
    if (hasFailed) return FALLBACK_IMAGE;
    if (!episode.thumbnail) return FALLBACK_IMAGE;

    if (episode.thumbnail.includes('i.ytimg.com')) {
      return episode.thumbnail.replace(
        /\/[^\/]+\.jpg$/,
        `/${THUMBNAIL_QUALITIES[currentQuality]}`
      );
    }

    return episode.thumbnail;
  }, [episode.thumbnail, currentQuality, hasFailed]);

  const isMultiPlatform = hasMultiplePlatforms(episode);

  return (
    <article className="group relative bg-white border-2 border-[#153230]/10 hover:border-[#4D7DA3] transition-all duration-500 overflow-hidden">
      {/* Accent bar on left */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#4D7DA3] transform origin-left scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>

      <div className="p-6 md:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Thumbnail with play overlay */}
          <div className="shrink-0 relative">
            <div className="w-full lg:w-72 h-48 lg:h-48 bg-[#153230] overflow-hidden relative">
              {thumbnailUrl ? (
                <img
                  key={`${episode.id}-${currentQuality}`}
                  src={thumbnailUrl}
                  alt=""
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  onError={handleThumbnailError}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              )}

              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <svg className="w-6 h-6 text-[#153230] ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Episode number badge */}
            {index !== undefined && (
              <div className="absolute -top-3 -left-3 w-12 h-12 bg-[#4D7DA3] text-white flex items-center justify-center font-black text-sm border-4 border-white shadow-lg">
                #{index + 1}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <time className="text-sm font-mono font-bold text-[#153230] tracking-wider uppercase">
                {formatPodcastDate(episode.publishDate)}
              </time>
              {episode.duration && (
                <>
                  <span className="text-[#153230]/30">•</span>
                  <span className="text-sm font-mono font-bold text-[#153230]/70">
                    {episode.duration}
                  </span>
                </>
              )}
              {isMultiPlatform && (
                <>
                  <span className="text-[#153230]/30">•</span>
                  <span className="text-xs font-bold text-[#4D7DA3] uppercase tracking-wider bg-[#4D7DA3]/10 px-2 py-1">
                    Multi-Platform
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#153230] mb-4 leading-[1.1] tracking-tight">
              {episode.title}
            </h3>

            {/* Description */}
            <p className="text-base md:text-lg text-[#153230]/80 mb-6 leading-relaxed line-clamp-3 grow">
              {episode.description}
            </p>

            {/* Platform links */}
            <div className="flex flex-wrap gap-4 mt-auto">
              {/* Spotify link */}
              {(episode.platform === 'spotify' || episode.audioUrl) && (
                <a
                  href={episode.platform === 'spotify' ? episode.externalUrl : episode.audioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/spotify flex items-center gap-3 bg-[#1DB954] hover:bg-[#1ed760] text-white px-6 py-4 font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-2xl hover:shadow-[#1DB954]/30 hover:-translate-y-1"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  <span>Spotify</span>
                  <svg className="w-4 h-4 transform group-hover/spotify:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )}

              {/* YouTube link */}
              {(episode.platform === 'youtube' || episode.videoUrl) && (
                <a
                  href={episode.platform === 'youtube' ? episode.externalUrl : episode.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/youtube flex items-center gap-3 bg-[#FF0000] hover:bg-[#CC0000] text-white px-6 py-4 font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF0000]/30 hover:-translate-y-1"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span>YouTube</span>
                  <svg className="w-4 h-4 transform group-hover/youtube:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
