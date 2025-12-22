'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useContentDepth, ContentDepth } from './ContentDepthProvider';

interface ContentDepthPanelProps {
    depth: ContentDepth;
    children: ReactNode;
}

export function ContentDepthPanel({ depth, children }: ContentDepthPanelProps) {
    const { depth: activeDepth } = useContentDepth();
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    // SEO: Content is always in DOM, and now always visible to satisfy user request
    // The user requested to display all info by default, so we remove the hidden logic.
    return (
        <div
            id={`content-${depth}`}
            role="region"
            aria-labelledby={`tab-${depth}`}
            className="block mb-12"
        >
            {children}
        </div>
    );
}
