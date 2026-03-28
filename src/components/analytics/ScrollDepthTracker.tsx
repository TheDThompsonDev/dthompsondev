'use client';

import { useEffect, useRef } from 'react';
import { trackScrollDepth } from '@/lib/analytics';

interface ScrollDepthTrackerProps {
    page: string;
}

/**
 * Tracks scroll depth milestones (25%, 50%, 75%, 100%).
 * Each milestone fires only once per page load.
 * Drop this into any page to understand how far users scroll.
 */
export function ScrollDepthTracker({ page }: ScrollDepthTrackerProps) {
    const firedRef = useRef<Set<number>>(new Set());

    useEffect(() => {
        const thresholds = [25, 50, 75, 100] as const;

        function handleScroll() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

            if (docHeight <= 0) return;

            const scrollPercent = Math.round((scrollTop / docHeight) * 100);

            for (const threshold of thresholds) {
                if (scrollPercent >= threshold && !firedRef.current.has(threshold)) {
                    firedRef.current.add(threshold);
                    trackScrollDepth({ depth: threshold, page });
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page]);

    return null;
}
