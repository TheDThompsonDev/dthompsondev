'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { trackSectionView } from '@/lib/analytics';

interface SectionTrackerProps {
    /** Unique name for the section (e.g., "hero", "trusted_by", "podcast") */
    section: string;
    /** Page path, defaults to current pathname */
    page?: string;
    /** Wrapped content */
    children: ReactNode;
    /** Percentage of element that must be visible to trigger (0-1), default 0.3 */
    threshold?: number;
}

/**
 * Wraps a homepage section and fires an analytics event when it scrolls into view.
 * Only fires once per section per page load.
 * This is the KEY component for diagnosing bounce rate — it tells you which sections
 * users actually see vs. abandon before reaching.
 */
export function SectionTracker({ section, page, children, threshold = 0.3 }: SectionTrackerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const hasFired = useRef(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const pagePath = page || (typeof window !== 'undefined' ? window.location.pathname : '/');

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasFired.current) {
                    hasFired.current = true;
                    trackSectionView({ section, page: pagePath });
                    observer.disconnect();
                }
            },
            { threshold }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [section, page, threshold]);

    return <div ref={ref}>{children}</div>;
}
