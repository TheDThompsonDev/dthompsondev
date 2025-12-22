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

    const isActive = activeDepth === depth;

    return (
        <div
            id={`content-${depth}`}
            role="tabpanel"
            aria-labelledby={`tab-${depth}`}
            aria-hidden={!isActive}
            className={`
                ${isActive ? 'block' : 'hidden'}
                ${!prefersReducedMotion && isActive ? 'animate-fadeIn' : ''}
            `}
        // SEO: Content is always in DOM, just visually hidden
        // The 'hidden' class uses display:none which is fine for SEO
        // as search engines still index hidden content
        >
            {children}
        </div>
    );
}
