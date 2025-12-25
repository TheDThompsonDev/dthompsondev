'use client';

import { useContentDepth, ContentDepth } from './ContentDepthProvider';
import { useEffect, useState } from 'react';
import { trackBlogDepth } from '@/lib/analytics';

const DEPTH_LABELS: Record<ContentDepth, string> = {
    short: 'Quick Takes',
    medium: 'Core Concepts',
    long: 'Deep Dive'
};

const DEPTH_ORDER: ContentDepth[] = ['short', 'medium', 'long'];

export function ContentDepthToggle() {
    const { depth, setDepth } = useContentDepth();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent, targetDepth: ContentDepth) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setDepth(targetDepth);
        }

        const currentIndex = DEPTH_ORDER.indexOf(depth);
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = Math.min(currentIndex + 1, DEPTH_ORDER.length - 1);
            setDepth(DEPTH_ORDER[nextIndex]);
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = Math.max(currentIndex - 1, 0);
            setDepth(DEPTH_ORDER[prevIndex]);
        }
    };

    // Show default state during SSR to prevent hydration mismatch
    const displayDepth = mounted ? depth : 'long';

    return (
        <div
            className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#4D7DA3]/10 py-4 px-4 -mx-4 md:-mx-8"
            role="tablist"
            aria-label="Content depth selector"
        >
            <div className="flex items-center justify-center gap-2 sm:gap-4">
                {DEPTH_ORDER.map((d) => (
                    <button
                        key={d}
                        role="tab"
                        aria-selected={displayDepth === d}
                        aria-controls={`content-${d}`}
                        tabIndex={displayDepth === d ? 0 : -1}
                        onClick={() => {
                            setDepth(d);
                            trackBlogDepth({ slug: '', depth: d, action: 'toggle' });
                        }}
                        onKeyDown={(e) => handleKeyDown(e, d)}
                        className={`
                            px-4 py-3 sm:px-8 sm:py-3 rounded-full text-sm sm:text-base font-bold
                            transition-all duration-200 border-2
                            focus:outline-none focus-visible:ring-4 focus-visible:ring-[#4D7DA3]/20
                            ${displayDepth === d
                                ? 'bg-[#153230] text-white border-[#153230] shadow-lg scale-105'
                                : 'bg-white text-[#153230]/70 border-[#153230]/10 hover:border-[#4D7DA3]/50 hover:bg-[#f0f7f7] hover:text-[#153230]'
                            }
                        `}
                    >
                        {DEPTH_LABELS[d]}
                    </button>
                ))}
            </div>

            <div className="text-center mt-2 text-xs text-[#153230]/40 font-medium hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Press <span className="font-mono bg-[#153230]/5 px-1 rounded">←</span> / <span className="font-mono bg-[#153230]/5 px-1 rounded">→</span> to switch views
            </div>
        </div>
    );
}
