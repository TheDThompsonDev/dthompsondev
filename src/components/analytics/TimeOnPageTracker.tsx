'use client';

import { useEffect, useRef } from 'react';
import { trackTimeOnPage } from '@/lib/analytics';

interface TimeOnPageTrackerProps {
    page: string;
}

/**
 * Tracks time-on-page engagement milestones (10s, 30s, 60s, 120s).
 * If users rarely hit 30s, the above-the-fold content isn't engaging enough.
 * If they hit 60s+ but still bounce, the page isn't converting engaged visitors.
 *
 * Pauses when the tab is hidden (visibility API) so you get active time only.
 */
export function TimeOnPageTracker({ page }: TimeOnPageTrackerProps) {
    const firedRef = useRef<Set<number>>(new Set());
    const elapsedRef = useRef(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const milestones = [10, 30, 60, 120];

        function tick() {
            if (document.hidden) return; // Don't count hidden tabs

            elapsedRef.current += 1;

            for (const milestone of milestones) {
                if (elapsedRef.current >= milestone && !firedRef.current.has(milestone)) {
                    firedRef.current.add(milestone);
                    trackTimeOnPage({ seconds: milestone, page });
                }
            }

            // Stop after the last milestone is hit
            if (firedRef.current.size === milestones.length && intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        intervalRef.current = setInterval(tick, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [page]);

    return null;
}
