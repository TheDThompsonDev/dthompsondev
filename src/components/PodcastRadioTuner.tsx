'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

type Episode = {
  id: string;
  title: string;
  description: string;
  audioUrl?: string;
  videoUrl?: string;
  thumbnail?: string;
  duration?: string;
  publishDate: string;
  platform: 'spotify' | 'youtube';
};

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
    
    const latest = merged.slice(0, 4);
    
    return latest;
  }, [episodes]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [thumbnailError, setThumbnailError] = useState<Record<number, number>>({});
  const [isMounted, setIsMounted] = useState(false);
  
  const selectedEpisode = mergedEpisodes[selectedIndex] || mergedEpisodes[0];
  
  // Set mounted flag on client side only to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Track episode changes
  useEffect(() => {
    // Episode changed
  }, [selectedIndex, selectedEpisode]);
  
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

  // Handle tuning knob interaction
  const handleKnobClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const knob = e.currentTarget;
    const rect = knob.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const normalizedAngle = (angle + Math.PI) / (2 * Math.PI); // 0 to 1
    const newIndex = Math.floor(normalizedAngle * mergedEpisodes.length) % mergedEpisodes.length;
    setSelectedIndex(newIndex);
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

  return (
    <div 
      className="relative bg-gradient-to-b from-[#1a4039] via-[#153230] to-[#0f2624] rounded-2xl p-3 md:p-4 border-6 border-[#0a1a18] shadow-2xl overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.15), 0 15px 45px rgba(0,0,0,0.6), 0 0 0 2px rgba(77,125,163,0.2)',
      }}
    >
      {/* Plastic/Metal texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, 
            transparent 0px, 
            transparent 1px, 
            rgba(255,255,255,0.05) 1px, 
            rgba(255,255,255,0.05) 2px
          )
        `,
      }}></div>

      {/* Carrying Handle */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-12">
        <div className="relative w-full h-full">
          {/* Handle arc */}
          <div className="absolute inset-x-0 top-0 h-10 border-4 border-[#4D7DA3] rounded-t-full bg-gradient-to-b from-[#5a8db3] to-[#4D7DA3]" style={{
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.4)',
          }}></div>
          {/* Handle connectors */}
          <div className="absolute bottom-0 left-2 w-6 h-4 bg-[#4D7DA3] rounded-b border-2 border-[#3d6a8a]" style={{
            boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.5)',
          }}></div>
          <div className="absolute bottom-0 right-2 w-6 h-4 bg-[#4D7DA3] rounded-b border-2 border-[#3d6a8a]" style={{
            boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.5)',
          }}></div>
        </div>
      </div>

      {/* Corner Screws - Chrome/Metal */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-3 h-3 rounded-full bg-gradient-to-br from-[#e8e8e8] to-[#a0a0a0] border border-[#707070] shadow-md ${
            i === 0 ? 'top-4 left-4' : i === 1 ? 'top-4 right-4' : i === 2 ? 'bottom-4 left-4' : 'bottom-4 right-4'
          }`}
          style={{
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1.5 h-0.5 bg-[#505050] rounded-full"></div>
          </div>
        </div>
      ))}

      {/* Top Brand Badge - Compact */}
      <div className="relative z-10 mb-3">
        <div className="bg-gradient-to-b from-[#0a1a18] to-[#061210] rounded-lg p-2 border-2 border-[#4D7DA3] shadow-lg relative"
          style={{
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), 0 3px 6px rgba(0,0,0,0.5)',
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-[#5a8db3] to-[#4D7DA3] rounded flex items-center justify-center shadow-md border border-[#3d6a8a]">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4V8h16v11zm-8-9.5c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-sm md:text-base font-black tracking-wider text-[#E2F3F2]" style={{ 
                fontFamily: 'system-ui, sans-serif',
                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
              }}>
                THE PROGRAMMING PODCAST
              </h2>
              <p className="text-[7px] uppercase tracking-[0.25em] text-[#4D7DA3] font-bold mt-0.5">
                EST. 2023 • WEEKLY BROADCASTS
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
          {/* Multi-Band Radio Dial Face with Flanking Knobs */}
          <div className="relative">
            <div className="flex items-center gap-4 md:gap-6">
              {/* LEFT KNOB - VOLUME */}
              <div className="flex-shrink-0">
                <div className="text-[8px] text-center text-[#c9a961] font-bold uppercase tracking-wider mb-1.5 opacity-70">
                  Volume
                </div>
                <div className="relative w-14 h-14 md:w-16 md:h-16">
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-[#5c3d2e] to-[#3d2817] border-4 border-[#2a1810] shadow-2xl relative"
                    style={{
                      boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.5), 0 6px 12px rgba(0,0,0,0.6)',
                    }}
                  >
                    {/* Knob ridges */}
                    <div className="absolute inset-0 rounded-full opacity-50" style={{
                      backgroundImage: 'repeating-conic-gradient(from 0deg, transparent 0deg 8deg, rgba(0,0,0,0.2) 8deg 10deg)',
                    }}></div>
                    
                    {/* Pointer indicator */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-[#c9a961] rounded-full shadow-lg"></div>
                    
                    {/* Center circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1a0f0a] border-2 border-[#5c3d2e]"></div>
                  </div>
                </div>
              </div>

              {/* CENTER - SINGLE HORIZONTAL DIAL */}
              <div className="flex-1">
                <div className="bg-black rounded-lg p-3 md:p-4 border-4 border-[#4D7DA3] shadow-2xl relative overflow-hidden" style={{
                  boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.9), 0 6px 12px rgba(0,0,0,0.6)',
                }}>
                  {/* Glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    {/* Single Horizontal Dial - FM/MW/SW Combined */}
                    <div className="relative h-16 md:h-20 bg-gradient-to-r from-[#8B0000] via-[#4D7DA3] via-[#00CED1] to-[#7BA05B] rounded-sm border-2 border-white/20 overflow-hidden">
                      {/* Frequency markers */}
                      <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4 text-[8px] md:text-[10px] font-bold text-white/90">
                        <span>FM</span>
                        <span>88</span>
                        <span>92</span>
                        <span>96</span>
                        <span>100</span>
                        <span>104</span>
                        <span>108</span>
                        <span>MC</span>
                      </div>
                      
                      {/* MW Band markers (second row) */}
                      <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-2 md:px-4 text-[7px] md:text-[9px] font-bold text-white/70 pb-1">
                        <span>MW</span>
                        <span>55</span>
                        <span>65</span>
                        <span>85</span>
                        <span>110</span>
                        <span>140</span>
                        <span>160</span>
                        <span>KC</span>
                      </div>
                      
                      {/* Sliding Tuning Indicator - moves left to right */}
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 md:w-1 bg-white shadow-lg transition-all duration-300 z-10"
                        style={{ 
                          left: `${(selectedIndex / Math.max(mergedEpisodes.length - 1, 1)) * 100}%`,
                          boxShadow: '0 0 12px rgba(255,255,255,0.9), 0 0 24px rgba(255,255,255,0.6)',
                        }}
                      ></div>
                      
                      {/* Red needle pointer at top */}
                      <div 
                        className="absolute -top-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#FF0000] transition-all duration-300 z-20"
                        style={{ 
                          left: `calc(${(selectedIndex / Math.max(mergedEpisodes.length - 1, 1)) * 100}% - 6px)`,
                          filter: 'drop-shadow(0 0 4px rgba(255,0,0,0.8))',
                        }}
                      ></div>
                    </div>

                    {/* Station indicator */}
                    <div className="text-center mt-2">
                      <span className="text-[10px] font-mono text-[#E2F3F2]/60 uppercase tracking-wider">
                        Station {selectedIndex + 1} of {mergedEpisodes.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT KNOB - TUNING (Interactive) */}
              <div className="flex-shrink-0">
                <div className="text-[8px] text-center text-[#c9a961] font-bold uppercase tracking-wider mb-1.5 opacity-70">
                  Tuning
                </div>
                <div className="relative w-14 h-14 md:w-16 md:h-16">
                  <div 
                    className="w-full h-full rounded-full bg-gradient-to-b from-[#5c3d2e] to-[#3d2817] border-4 border-[#2a1810] shadow-2xl relative cursor-pointer hover:from-[#6a4838] hover:to-[#4a3020] transition-all"
                    onClick={handleKnobClick}
                    style={{
                      boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.5), 0 6px 12px rgba(0,0,0,0.6)',
                    }}
                  >
                    {/* Knob ridges */}
                    <div className="absolute inset-0 rounded-full opacity-50 pointer-events-none" style={{
                      backgroundImage: 'repeating-conic-gradient(from 0deg, transparent 0deg 8deg, rgba(0,0,0,0.2) 8deg 10deg)',
                    }}></div>
                    
                    {/* Pointer indicator - rotates based on selected episode */}
                    <div 
                      className="absolute w-1.5 h-3 bg-[#c9a961] rounded-full shadow-lg transition-transform duration-300 pointer-events-none"
                      style={{
                        top: '8px',
                        left: '50%',
                        transformOrigin: `50% ${(14/2)}px`,
                        transform: `translateX(-50%) rotate(${(selectedIndex / Math.max(mergedEpisodes.length - 1, 1)) * 270 - 135}deg)`,
                      }}
                    ></div>
                    
                    {/* Center circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1a0f0a] border-2 border-[#5c3d2e] pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Display Section - Compact with side constraints to match dial width */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* LEFT SPACER - matches knob width */}
            <div className="flex-shrink-0 w-14 md:w-16"></div>
            
            {/* CENTER - Display content */}
            <div className="flex-1 relative bg-black rounded-xl p-3 md:p-4 border-3 border-[#153230] shadow-xl overflow-hidden" style={{
              boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.9), 0 4px 8px rgba(0,0,0,0.5)',
            }}>
              {/* Screen glow */}
              <div className="absolute inset-0 bg-gradient-radial from-[#4D7DA3]/5 via-transparent to-transparent"></div>

              <div className="relative z-10">
              {/* NOW BROADCASTING Indicator - Compact */}
              <div className="flex items-center gap-2 mb-3 justify-center flex-wrap">
                <div className="relative flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-[#FF0000] rounded-full animate-pulse shadow-lg" style={{
                    boxShadow: '0 0 8px rgba(255,0,0,0.8), 0 0 16px rgba(255,0,0,0.4)',
                  }}></div>
                  <div className="absolute w-2.5 h-2.5 bg-[#FF0000] rounded-full animate-ping"></div>
                  <div className="absolute w-4 h-4 border-2 border-[#FF0000]/30 rounded-full"></div>
                </div>
                <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#E2F3F2]" style={{ 
                  textShadow: '0 0 6px rgba(77,125,163,0.5)',
                }}>
                  NOW BROADCASTING
                </span>
                <div className="px-1.5 py-0.5 bg-[#153230] border border-[#4D7DA3] rounded">
                  <span className="text-[9px] font-mono font-black tracking-wider uppercase text-[#E2F3F2]">
                    EP. #{mergedEpisodes.length - selectedIndex}
                  </span>
                </div>
              </div>

              {/* Fixed height container to prevent layout shifts */}
              <div className="grid md:grid-cols-[160px_1fr] gap-3 min-h-[180px] md:min-h-[160px]">
                {/* Episode Thumbnail Display */}
                <div className="relative h-fit">
                  <div className="bg-[#0a1a18] p-2 rounded-lg border-2 border-[#4D7DA3] shadow-xl relative" style={{
                    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8), 0 3px 6px rgba(0,0,0,0.4)',
                  }}>
                    <div className="relative w-full aspect-square rounded overflow-hidden bg-black shadow-inner border border-[#153230]" key={`thumbnail-${selectedIndex}`}>
                      {selectedEpisode && getThumbnailUrl(selectedEpisode.thumbnail, selectedIndex) ? (
                        <>
                          <img
                            key={`${selectedEpisode.id}-${thumbnailError[selectedIndex] || 0}`}
                            src={getThumbnailUrl(selectedEpisode.thumbnail, selectedIndex)}
                            alt={selectedEpisode.title}
                            className="w-full h-full object-cover"
                            onError={() => handleThumbnailError(selectedIndex)}
                          />
                          {/* Screen scanlines */}
                          <div className="absolute inset-0 pointer-events-none opacity-20" style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)',
                          }}></div>
                          {/* Glass reflection */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40"></div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
                          <svg className="w-20 h-20 text-[#4D7DA3]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Platform indicator bulbs */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedEpisode.audioUrl && (
                        <div className="relative">
                          <div className="w-8 h-8 bg-gradient-to-b from-[#1DB954] to-[#127a3a] rounded-full flex items-center justify-center shadow-xl border-2 border-[#5c3d2e] animate-pulse" style={{
                            boxShadow: '0 3px 10px rgba(29,185,84,0.6), inset 0 1px 3px rgba(255,255,255,0.3)',
                            animationDuration: '2s',
                          }}>
                            <svg className="w-4 h-4 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                            </svg>
                          </div>
                          <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-1.5 bg-[#1DB954]/40 blur-sm"></div>
                        </div>
                      )}
                      {selectedEpisode.videoUrl && (
                        <div className="relative">
                          <div className="w-8 h-8 bg-gradient-to-b from-[#FF0000] to-[#b30000] rounded-full flex items-center justify-center shadow-xl border-2 border-[#5c3d2e] animate-pulse" style={{
                            boxShadow: '0 3px 10px rgba(255,0,0,0.6), inset 0 1px 3px rgba(255,255,255,0.3)',
                            animationDuration: '2s',
                            animationDelay: '0.5s',
                          }}>
                            <svg className="w-4 h-4 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          </div>
                          <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-1.5 bg-[#FF0000]/40 blur-sm"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Episode Details - Fixed height layout */}
                <div className="flex flex-col justify-between min-h-[160px]">
                  <div className="flex-1">
                    {/* Metadata row - fixed height */}
                    <div className="flex flex-wrap items-center gap-2 mb-2 h-5">
                      <span className="text-[10px] font-mono font-bold text-[#4D7DA3] tracking-wide">
                        {formatDate(selectedEpisode.publishDate)}
                      </span>
                      {selectedEpisode.duration && (
                        <>
                          <span className="text-[#4D7DA3]/40">●</span>
                          <span className="text-[10px] font-mono font-bold text-[#E2F3F2]/80 tracking-wide">
                            {selectedEpisode.duration}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title - fixed height for up to 2 lines */}
                    <h3 className="text-base md:text-lg font-black text-[#E2F3F2] mb-2 leading-snug line-clamp-2 h-[42px] md:h-[48px] overflow-hidden" style={{ 
                      textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                    }}>
                      {selectedEpisode.title}
                    </h3>
                    
                    {/* Description - fixed height for 2 lines */}
                    <p className="text-xs text-[#E2F3F2]/70 leading-relaxed line-clamp-2 mb-3 h-[36px] overflow-hidden">
                      {selectedEpisode.description}
                    </p>
                  </div>

                  {/* Platform buttons with retro style - fixed at bottom */}
                  <div className="flex gap-2">
                    {selectedEpisode.audioUrl && (
                      <a
                        href={selectedEpisode.audioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/sp relative flex items-center gap-1.5 bg-gradient-to-b from-[#1ed760] to-[#1DB954] hover:from-[#1DB954] hover:to-[#158c3e] text-white px-3 py-2 font-black text-[10px] uppercase tracking-wider transition-all duration-300 shadow-lg border-2 border-[#127a3a] hover:-translate-y-0.5 overflow-hidden"
                        style={{
                          boxShadow: '0 3px 6px rgba(29,185,84,0.4), inset 0 1px 2px rgba(255,255,255,0.3)',
                        }}
                      >
                        <svg className="w-3.5 h-3.5 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                        <span className="relative z-10">SPOTIFY</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/sp:translate-y-0 transition-transform duration-300"></div>
                      </a>
                    )}
                    
                    {selectedEpisode.videoUrl && (
                      <a
                        href={selectedEpisode.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/yt relative flex items-center gap-1.5 bg-gradient-to-b from-[#ff3333] to-[#FF0000] hover:from-[#FF0000] hover:to-[#cc0000] text-white px-3 py-2 font-black text-[10px] uppercase tracking-wider transition-all duration-300 shadow-lg border-2 border-[#b30000] hover:-translate-y-0.5 overflow-hidden"
                        style={{
                          boxShadow: '0 3px 6px rgba(255,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.3)',
                        }}
                      >
                        <svg className="w-3.5 h-3.5 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        <span className="relative z-10">YOUTUBE</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/yt:translate-y-0 transition-transform duration-300"></div>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              </div>
            </div>
            
            {/* RIGHT SPACER - matches knob width */}
            <div className="flex-shrink-0 w-14 md:w-16"></div>
          </div>

          {/* SPEAKER GRILLE - Compact */}
          <div className="relative bg-gradient-to-b from-[#0f2624] to-[#0a1a18] rounded-2xl p-4 md:p-6 border-4 border-[#153230] shadow-2xl overflow-hidden" style={{
            boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.8), 0 6px 12px rgba(0,0,0,0.6)',
          }}>
            {/* Speaker grille mesh pattern */}
            <div className="relative min-h-[150px] md:min-h-[180px] rounded-xl overflow-hidden bg-[#0a1a18] border-2 border-[#4D7DA3]/30" style={{
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.9)',
            }}>
              {/* Perforated mesh pattern */}
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  radial-gradient(circle at center, rgba(77,125,163,0.15) 1px, transparent 1px),
                  radial-gradient(circle at center, rgba(77,125,163,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '8px 8px, 8px 8px',
                backgroundPosition: '0 0, 4px 4px',
              }}></div>

              {/* Diagonal cross-hatch for depth */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `
                  repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(77,125,163,0.05) 10px, rgba(77,125,163,0.05) 11px),
                  repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(77,125,163,0.05) 10px, rgba(77,125,163,0.05) 11px)
                `,
              }}></div>

              {/* Sound wave animation effect */}
              <div className="absolute inset-0 flex items-center justify-center gap-2 md:gap-3 px-8">
                {[...Array(12)].map((_, i) => {
                  // Use deterministic heights based on index to avoid hydration mismatch
                  const baseHeights = [35, 50, 45, 40, 55, 38, 48, 42, 52, 46, 40, 36];
                  return (
                    <div
                      key={i}
                      className="w-1 md:w-1.5 bg-gradient-to-t from-[#4D7DA3] to-[#84803E] rounded-full opacity-40"
                      style={{
                        height: `${baseHeights[i]}%`,
                        animation: `pulse ${1 + (i % 3) * 0.2}s ease-in-out infinite`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    ></div>
                  );
                })}
              </div>

              {/* Brand badge in center of speaker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-gradient-to-b from-[#d4af6a] to-[#a8894d] rounded-lg px-6 py-3 border-2 border-[#8b7355] shadow-2xl" style={{
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 4px 12px rgba(0,0,0,0.6)',
                }}>
                  <div className="text-center">
                    <div className="text-xs md:text-sm font-black tracking-[0.3em] text-[#1a0f0a]" style={{ fontFamily: 'Georgia, serif' }}>
                      DTHOMPSON
                    </div>
                    <div className="text-[8px] uppercase tracking-widest text-[#5c3d2e] opacity-80 font-bold">
                      Podcast Radio
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Speaker label */}
            <div className="text-center mt-4">
              <span className="text-[10px] text-[#c9a961] font-bold uppercase tracking-[0.3em] opacity-60">
                High Fidelity Speaker System
              </span>
            </div>
          </div>

        {/* Large brass CTA */}
        <Link href="/podcast" className="relative z-10 group block mt-6">
        <div className="bg-gradient-to-b from-[#d4af6a] via-[#c9a961] to-[#a8894d] border-4 border-[#8b7355] shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden relative"
          style={{
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.3), 0 12px 24px rgba(0,0,0,0.4)',
          }}
        >
          {/* Brass texture */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
          }}></div>

          <div className="flex items-center justify-center gap-4 px-8 py-6 relative z-10">
            <div className="w-12 h-12 bg-[#1a0f0a] rounded-full flex items-center justify-center border-3 border-[#5c3d2e] shadow-xl">
              <svg className="w-6 h-6 text-[#c9a961]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            
            <span className="font-black text-xl md:text-2xl uppercase tracking-[0.25em] text-[#1a0f0a]" style={{ 
              fontFamily: 'Georgia, serif',
              textShadow: '2px 2px 0 rgba(255,255,255,0.3), -1px -1px 0 rgba(0,0,0,0.2)',
            }}>
              Browse All Episodes
            </span>
            
            <svg className="w-8 h-8 text-[#1a0f0a] transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        </div>
        </Link>
      </div>
    </div>
  );
}
