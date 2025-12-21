'use client';

import { useState, useEffect, useMemo } from 'react';
import { Episode } from './podcast/types';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const RadioTunerMobile = dynamic(() => import('./podcast/RadioTunerMobile').then(mod => mod.RadioTunerMobile), {
  loading: () => (
    <div className="h-[400px] flex items-center justify-center bg-[#0a1a18] rounded-xl border-4 border-[#153230]">
      <Loader2 className="w-8 h-8 text-[#4D7DA3] animate-spin" />
    </div>
  )
});

const RadioTunerDesktop = dynamic(() => import('./podcast/RadioTunerDesktop').then(mod => mod.RadioTunerDesktop), {
  loading: () => (
    <div className="h-[500px] flex items-center justify-center bg-[#0a1a18] rounded-2xl border-6 border-[#153230]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-[#4D7DA3] animate-spin" />
        <span className="text-[#4D7DA3] font-mono text-sm tracking-widest uppercase">Initializing Tuner...</span>
      </div>
    </div>
  )
});

interface PodcastRadioTunerProps {
  episodes: Episode[];
}

export function PodcastRadioTuner({ episodes }: PodcastRadioTunerProps) {
  // Merge episodes by order/index - YouTube and Spotify episodes are now perfectly aligned
  const mergedEpisodes = useMemo(() => {
    // Separate YouTube and Spotify episodes
    const youtubeEpisodes = episodes.filter(ep => ep.platform === 'youtube');
    const spotifyEpisodes = episodes.filter(ep => ep.platform === 'spotify');

    // Merge by index (order)
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
          thumbnail: youtube.thumbnail, // Prioritize YouTube thumbnail
          duration: youtube.duration || spotify.duration,
        });
      } else if (youtube) {
        merged.push(youtube);
      } else if (spotify) {
        merged.push(spotify);
      }
    }

    // Take the top 4
    const latest = merged.slice(0, 4);

    return latest;
  }, [episodes]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [thumbnailError, setThumbnailError] = useState<Record<number, number>>({});
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted flag on client side only to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get thumbnail URL with fallback quality levels
  const getThumbnailUrl = (baseUrl: string | undefined, episodeIndex: number): string | undefined => {
    if (!baseUrl) return undefined;

    const errorLevel = thumbnailError[episodeIndex] || 0;

    // YouTube thumbnail quality levels (highest to lowest)
    const qualities = ['hqdefault.jpg', 'mqdefault.jpg', 'default.jpg'];

    // If it's a YouTube thumbnail, try different quality levels
    if (baseUrl.includes('i.ytimg.com') && baseUrl.includes('hqdefault.jpg')) {
      const currentQuality = qualities[errorLevel];
      if (currentQuality) {
        return baseUrl.replace('hqdefault.jpg', currentQuality);
      }
    }

    return baseUrl;
  };

  // Handle thumbnail load error
  const handleThumbnailError = (episodeIndex: number) => {
    const currentErrorLevel = thumbnailError[episodeIndex] || 0;
    if (currentErrorLevel < 2) { // Try up to 3 quality levels
      setThumbnailError(prev => ({
        ...prev,
        [episodeIndex]: currentErrorLevel + 1
      }));
    }
  };

  // Auto-rotate (pause when hovering or dragging)
  useEffect(() => {
    if (!isHovering && !isDragging && mergedEpisodes.length > 1) {
      const interval = setInterval(() => {
        setSelectedIndex((prev) => (prev + 1) % mergedEpisodes.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovering, isDragging, mergedEpisodes.length]);

  // Calculate angle from client coordinates
  const calculateAngle = (clientX: number, clientY: number, knobElement: HTMLElement) => {
    const rect = knobElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(clientY - centerY, clientX - centerX);
    const normalizedAngle = (angle + Math.PI) / (2 * Math.PI); // 0 to 1
    return Math.floor(normalizedAngle * mergedEpisodes.length) % mergedEpisodes.length;
  };

  // Handle tuning knob interaction (click)
  const handleKnobClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newIndex = calculateAngle(e.clientX, e.clientY, e.currentTarget);
    setSelectedIndex(newIndex);
  };

  // Mouse drag support
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const newIndex = calculateAngle(e.clientX, e.clientY, e.currentTarget);
    setSelectedIndex(newIndex);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const newIndex = calculateAngle(e.clientX, e.clientY, e.currentTarget);
      setSelectedIndex(newIndex);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch support for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const touch = e.touches[0];
    const newIndex = calculateAngle(touch.clientX, touch.clientY, e.currentTarget);
    setSelectedIndex(newIndex);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      const touch = e.touches[0];
      const newIndex = calculateAngle(touch.clientX, touch.clientY, e.currentTarget);
      setSelectedIndex(newIndex);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Keyboard support for accessibility
  const handleKnobKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % mergedEpisodes.length);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + mergedEpisodes.length) % mergedEpisodes.length);
        break;
      case 'Home':
        e.preventDefault();
        setSelectedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setSelectedIndex(mergedEpisodes.length - 1);
        break;
    }
  };

  if (!mergedEpisodes.length) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T12:00:00Z');
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC'
    });
  };

  const knobHandlers = {
    onClick: handleKnobClick,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseUp,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onKeyDown: handleKnobKeyDown,
  };

  return (
    <>
      <RadioTunerMobile
        mergedEpisodes={mergedEpisodes}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        getThumbnailUrl={getThumbnailUrl}
        handleThumbnailError={handleThumbnailError}
        thumbnailError={thumbnailError}
        formatDate={formatDate}
      />
      <RadioTunerDesktop
        mergedEpisodes={mergedEpisodes}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        getThumbnailUrl={getThumbnailUrl}
        handleThumbnailError={handleThumbnailError}
        thumbnailError={thumbnailError}
        formatDate={formatDate}
        setIsHovering={setIsHovering}
        knobHandlers={knobHandlers}
      />
    </>
  );
}
