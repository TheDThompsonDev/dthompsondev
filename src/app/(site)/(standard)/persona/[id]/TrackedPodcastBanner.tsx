'use client';

import Link from 'next/link';
import { trackContent } from '@/lib/analytics';

export function TrackedPodcastBanner() {
    const handlePodcastClick = () => {
        trackContent({ type: 'podcast', title: 'The Programming Podcast', action: 'click' });
    };

    return (
        <Link
            href="/podcast"
            onClick={handlePodcastClick}
            className="block bg-gradient-to-br from-[#153230] to-[#1a3d3a] rounded-2xl p-6 sm:p-8 border border-[#4D7DA3]/20 hover:border-[#4D7DA3]/40 hover:shadow-xl transition-all duration-300 group"
        >
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-[#4D7DA3] flex items-center justify-center shrink-0">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
                    </svg>
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight group-hover:text-[#4D7DA3] transition-colors">
                        The Programming Podcast
                    </h3>
                    <p className="text-white/70 mt-2 max-w-xl">
                        Join Danny Thompson and Leon Noel for real talk about AI, career advice, and everything developers need to thrive.
                    </p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white/80 bg-white/10 px-3 py-1.5 rounded-full">
                            <svg className="w-4 h-4 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                            </svg>
                            YouTube
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white/80 bg-white/10 px-3 py-1.5 rounded-full">
                            <svg className="w-4 h-4 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02z" />
                            </svg>
                            Spotify
                        </span>
                    </div>
                </div>
                <div className="text-white/60 group-hover:text-white transition-colors text-2xl hidden sm:block">
                    →
                </div>
            </div>
        </Link>
    );
}
