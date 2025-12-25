"use client";

import Link from 'next/link';
import Image from 'next/image';
import { RadioTunerProps } from './types';

export const RadioTunerMobile = ({
    mergedEpisodes,
    selectedIndex,
    setSelectedIndex,
    getThumbnailUrl,
    handleThumbnailError,
    thumbnailError,
    formatDate,
    onPlatformClick
}: RadioTunerProps) => {
    const selectedEpisode = mergedEpisodes[selectedIndex] || mergedEpisodes[0];

    return (
        <div className="lg:hidden">
            <div
                className="relative bg-linear-to-b from-[#1a4039] via-[#153230] to-[#0f2624] rounded-xl p-3 border-4 border-[#0a1a18] shadow-2xl overflow-hidden"
                style={{
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.15), 0 15px 45px rgba(0,0,0,0.6), 0 0 0 2px rgba(77,125,163,0.2)',
                }}
            >
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(255,255,255,0.05) 1px, rgba(255,255,255,0.05) 2px)',
                }}></div>

                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-2.5 h-2.5 rounded-full bg-linear-to-br from-[#e8e8e8] to-[#a0a0a0] border border-[#707070] shadow-md z-10 ${i === 0 ? 'top-2 left-2' : i === 1 ? 'top-2 right-2' : i === 2 ? 'bottom-2 left-2' : 'bottom-2 right-2'
                            }`}
                        style={{
                            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.3)',
                        }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-1 h-0.5 bg-[#505050] rounded-full"></div>
                        </div>
                    </div>
                ))}

                <div className="relative z-10 mb-2">
                    <div className="bg-linear-to-b from-[#0a1a18] to-[#061210] rounded-lg p-2 border-2 border-[#4D7DA3] shadow-lg"
                        style={{
                            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), 0 3px 6px rgba(0,0,0,0.5)',
                        }}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 bg-linear-to-br from-[#5a8db3] to-[#4D7DA3] rounded flex items-center justify-center shadow-md border border-[#3d6a8a]">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4V8h16v11zm-8-9.5c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <h2 className="text-xs font-black tracking-wider text-[#E2F3F2]" style={{
                                    fontFamily: 'system-ui, sans-serif',
                                    textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                                }}>
                                    THE PROGRAMMING PODCAST
                                </h2>
                                <p className="text-[6px] uppercase tracking-[0.2em] text-[#4D7DA3] font-bold">
                                    EST. 2023 • WEEKLY
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="flex gap-1 mb-2 px-12">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex-1 h-1 bg-linear-to-b from-[#0a1a18] to-[#061210] rounded-full border border-[#4D7DA3]/30" style={{
                                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)',
                            }}></div>
                        ))}
                    </div>

                    <div className="bg-linear-to-b from-[#1a1a1a] to-[#000000] rounded-lg p-2 border-4 border-[#4D7DA3] shadow-2xl mb-2 relative" style={{
                        boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.9), inset 0 -1px 3px rgba(255,255,255,0.1), 0 6px 12px rgba(0,0,0,0.6)',
                    }}>
                        <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-lg"></div>

                        <div className="relative h-10 bg-linear-to-r from-[#8B0000] via-[#4D7DA3] to-[#7BA05B] rounded-sm border-2 border-white/30 overflow-hidden shadow-inner">
                            <div className="absolute inset-0 flex items-start justify-between px-2 pt-0.5 text-[7px] font-bold text-white/90">
                                <span className="text-[#FFD700]">FM</span>
                                <span>88</span>
                                <span>92</span>
                                <span>96</span>
                                <span>100</span>
                                <span>104</span>
                                <span className="text-[#FFD700]">MC</span>
                            </div>

                            <div className="absolute bottom-0 inset-x-0 flex items-end justify-between px-2 pb-0.5 text-[6px] font-bold text-white/60">
                                <span>MW</span>
                                <span>55</span>
                                <span>85</span>
                                <span>110</span>
                                <span>140</span>
                                <span>KC</span>
                            </div>

                            <div
                                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg transition-all duration-300 z-10"
                                style={{
                                    left: `${(selectedIndex / Math.max(mergedEpisodes.length - 1, 1)) * 100}%`,
                                    boxShadow: '0 0 12px rgba(255,255,255,0.9), 0 0 24px rgba(255,255,255,0.6)',
                                }}
                            ></div>

                            <div
                                className="absolute -top-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-8 border-t-[#FF0000] transition-all duration-300 z-20"
                                style={{
                                    left: `calc(${(selectedIndex / Math.max(mergedEpisodes.length - 1, 1)) * 100}% - 6px)`,
                                    filter: 'drop-shadow(0 0 4px rgba(255,0,0,0.8))',
                                }}
                            ></div>
                        </div>

                        <div className="text-center mt-1.5">
                            <span className="text-[9px] font-mono font-black text-[#E2F3F2] uppercase tracking-wider" style={{
                                textShadow: '0 0 6px rgba(77,125,163,0.5)',
                            }}>
                                STATION {selectedIndex + 1} OF {mergedEpisodes.length}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="relative flex items-center justify-center">
                            <div className="w-2 h-2 bg-[#FF0000] rounded-full animate-pulse" style={{
                                boxShadow: '0 0 6px rgba(255,0,0,0.8)',
                            }}></div>
                            <div className="absolute w-2 h-2 bg-[#FF0000] rounded-full animate-ping"></div>
                        </div>
                        <span className="text-[9px] font-black tracking-wider uppercase text-[#E2F3F2]">
                            NOW BROADCASTING
                        </span>
                        <div className="px-1.5 py-0.5 bg-[#153230] border border-[#4D7DA3] rounded">
                            <span className="text-[8px] font-mono font-black text-[#E2F3F2]">
                                EP. #{mergedEpisodes.length - selectedIndex}
                            </span>
                        </div>
                    </div>

                    <div className="bg-black rounded-lg p-2 border-3 border-[#153230] shadow-xl" style={{
                        boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.9), 0 4px 8px rgba(0,0,0,0.5)',
                    }}>
                        <div className="flex gap-2">
                            <div className="shrink-0 relative">
                                <div className="bg-[#0a1a18] p-1.5 rounded border-2 border-[#4D7DA3] shadow-lg relative" style={{
                                    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8)',
                                }}>
                                    <div className="relative w-24 h-24 rounded overflow-hidden bg-black" key={`mobile-thumb-${selectedIndex}`}>
                                        {selectedEpisode && getThumbnailUrl(selectedEpisode.thumbnail, selectedIndex) ? (
                                            <>
                                                <Image
                                                    key={`mobile-${selectedEpisode.id}-${thumbnailError[selectedIndex] || 0}`}
                                                    src={getThumbnailUrl(selectedEpisode.thumbnail, selectedIndex) || ''}
                                                    alt={selectedEpisode.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="96px"
                                                    onError={() => handleThumbnailError(selectedIndex)}
                                                />
                                                <div className="absolute inset-0 pointer-events-none opacity-20" style={{
                                                    backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)',
                                                }}></div>
                                                <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-40"></div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <svg className="w-12 h-12 text-[#4D7DA3]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1.5">
                                        {selectedEpisode.audioUrl && (
                                            <div className="w-6 h-6 bg-linear-to-b from-[#1DB954] to-[#127a3a] rounded-full flex items-center justify-center shadow-lg border border-[#5c3d2e] animate-pulse" style={{
                                                animationDuration: '2s',
                                            }}>
                                                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                                                </svg>
                                            </div>
                                        )}
                                        {selectedEpisode.videoUrl && (
                                            <div className="w-6 h-6 bg-linear-to-b from-[#FF0000] to-[#b30000] rounded-full flex items-center justify-center shadow-lg border border-[#5c3d2e] animate-pulse" style={{
                                                animationDuration: '2s',
                                                animationDelay: '0.5s',
                                            }}>
                                                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1 text-[8px] text-[#4D7DA3] mb-1">
                                    <span className="font-mono">{formatDate(selectedEpisode.publishDate)}</span>
                                    {selectedEpisode.duration && (
                                        <>
                                            <span>●</span>
                                            <span className="font-mono">{selectedEpisode.duration}</span>
                                        </>
                                    )}
                                </div>

                                <h3 className="text-xs font-black text-[#E2F3F2] mb-1 leading-tight line-clamp-2" style={{
                                    textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                                }}>
                                    {selectedEpisode.title}
                                </h3>

                                <p className="text-[9px] text-[#E2F3F2]/70 leading-snug line-clamp-2 mb-2">
                                    {selectedEpisode.description}
                                </p>

                                <div className="flex gap-1">
                                    {selectedEpisode.audioUrl && (
                                        <a
                                            href={selectedEpisode.audioUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-1 bg-linear-to-b from-[#1ed760] to-[#1DB954] hover:from-[#1DB954] hover:to-[#158c3e] text-white px-2 py-1.5 rounded font-black text-[8px] uppercase tracking-wide transition-all shadow-md border border-[#127a3a]"
                                            onClick={() => onPlatformClick?.('spotify', selectedEpisode.title)}
                                        >
                                            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                                            </svg>
                                            <span>SPOTIFY</span>
                                        </a>
                                    )}

                                    {selectedEpisode.videoUrl && (
                                        <a
                                            href={selectedEpisode.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-1 bg-linear-to-b from-[#ff3333] to-[#FF0000] hover:from-[#FF0000] hover:to-[#cc0000] text-white px-2 py-1.5 rounded font-black text-[8px] uppercase tracking-wide transition-all shadow-md border border-[#b30000]"
                                            onClick={() => onPlatformClick?.('youtube', selectedEpisode.title)}
                                        >
                                            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                            </svg>
                                            <span>YOUTUBE</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative bg-linear-to-b from-[#0f2624] to-[#0a1a18] rounded-lg p-3 border-3 border-[#153230] shadow-xl mt-2 overflow-hidden" style={{
                        boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.5)',
                    }}>
                        <div className="relative h-12 rounded overflow-hidden bg-[#0a1a18] border border-[#4D7DA3]/30" style={{
                            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.9)',
                        }}>
                            <div className="absolute inset-0" style={{
                                backgroundImage: 'radial-gradient(circle at center, rgba(77,125,163,0.15) 0.5px, transparent 0.5px), radial-gradient(circle at center, rgba(77,125,163,0.1) 0.5px, transparent 0.5px)',
                                backgroundSize: '4px 4px, 4px 4px',
                                backgroundPosition: '0 0, 2px 2px',
                            }}></div>

                            <div className="absolute inset-0 flex items-center justify-center gap-1 px-4">
                                {[...Array(16)].map((_, i) => {
                                    const heights = [30, 45, 40, 35, 50, 33, 43, 38, 48, 41, 36, 32, 44, 39, 47, 34];
                                    return (
                                        <div
                                            key={i}
                                            className="w-0.5 bg-linear-to-t from-[#4D7DA3] to-[#84803E] rounded-full opacity-40"
                                            style={{
                                                height: `${heights[i]}%`,
                                                animation: `pulse ${1 + (i % 3) * 0.2}s ease-in-out infinite`,
                                                animationDelay: `${i * 0.08}s`,
                                            }}
                                        ></div>
                                    );
                                })}
                            </div>

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="bg-linear-to-b from-[#d4af6a] to-[#a8894d] rounded px-3 py-1 border border-[#8b7355] shadow-lg" style={{
                                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 2px 6px rgba(0,0,0,0.6)',
                                }}>
                                    <div className="text-[8px] font-black tracking-[0.15em] text-[#1a0f0a]" style={{ fontFamily: 'Georgia, serif' }}>
                                        DTHOMPSON
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-1">
                            <span className="text-[7px] text-[#c9a961] font-bold uppercase tracking-widest opacity-60">
                                High Fidelity Speaker
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                        <button
                            onClick={() => setSelectedIndex((prev: number) => (prev - 1 + mergedEpisodes.length) % mergedEpisodes.length)}
                            className="flex-1 relative"
                        >
                            <div className="text-[7px] text-center text-[#c9a961] font-bold uppercase tracking-wider mb-1 opacity-70">
                                Previous
                            </div>
                            <div className="bg-linear-to-b from-[#5c3d2e] to-[#3d2817] border-3 border-[#2a1810] text-[#c9a961] py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:from-[#6a4838] hover:to-[#4a3020] active:scale-95 relative" style={{
                                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.6)',
                            }}>
                                <div className="absolute inset-0 rounded-full opacity-40 pointer-events-none" style={{
                                    backgroundImage: 'repeating-conic-gradient(from 0deg, transparent 0deg 8deg, rgba(0,0,0,0.2) 8deg 10deg)',
                                }}></div>
                                <span className="relative z-10">← PREV</span>
                            </div>
                        </button>

                        <button
                            onClick={() => setSelectedIndex((prev: number) => (prev + 1) % mergedEpisodes.length)}
                            className="flex-1 relative"
                        >
                            <div className="text-[7px] text-center text-[#c9a961] font-bold uppercase tracking-wider mb-1 opacity-70">
                                Next
                            </div>
                            <div className="bg-linear-to-b from-[#5c3d2e] to-[#3d2817] border-3 border-[#2a1810] text-[#c9a961] py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:from-[#6a4838] hover:to-[#4a3020] active:scale-95 relative" style={{
                                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.6)',
                            }}>
                                <div className="absolute inset-0 rounded-full opacity-40 pointer-events-none" style={{
                                    backgroundImage: 'repeating-conic-gradient(from 0deg, transparent 0deg 8deg, rgba(0,0,0,0.2) 8deg 10deg)',
                                }}></div>
                                <span className="relative z-10">NEXT →</span>
                            </div>
                        </button>
                    </div>
                </div>

                <Link href="/podcast" className="relative z-10 block mt-3 group">
                    <div className="bg-linear-to-b from-[#d4af6a] via-[#c9a961] to-[#a8894d] border-4 border-[#8b7355] rounded-lg py-3 transition-all overflow-hidden relative hover:-translate-y-1 active:translate-y-0"
                        style={{
                            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.3), 0 6px 12px rgba(0,0,0,0.5)',
                        }}
                    >
                        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
                        }}></div>

                        <div className="flex items-center justify-center gap-2 relative z-10">
                            <div className="w-6 h-6 bg-[#1a0f0a] rounded-full flex items-center justify-center border-2 border-[#5c3d2e] shadow-lg">
                                <svg className="w-3 h-3 text-[#c9a961]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                </svg>
                            </div>
                            <span className="font-black text-sm uppercase tracking-[0.15em] text-[#1a0f0a]" style={{
                                fontFamily: 'Georgia, serif',
                                textShadow: '1px 1px 0 rgba(255,255,255,0.3), -0.5px -0.5px 0 rgba(0,0,0,0.2)',
                            }}>
                                Browse All Episodes
                            </span>
                            <svg className="w-5 h-5 text-[#1a0f0a] transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>

                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none"></div>
                    </div>
                </Link>
            </div>
        </div>
    );
};
