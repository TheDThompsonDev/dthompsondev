'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export type ContentDepth = 'short' | 'medium' | 'long';

interface ContentDepthContextValue {
    depth: ContentDepth;
    setDepth: (depth: ContentDepth) => void;
    articleSlug?: string;
}

const ContentDepthContext = createContext<ContentDepthContextValue | null>(null);

const STORAGE_KEY = 'preferred_content_depth';
const VALID_DEPTHS: ContentDepth[] = ['short', 'medium', 'long'];

function isValidDepth(value: string | null): value is ContentDepth {
    return value !== null && VALID_DEPTHS.includes(value as ContentDepth);
}

interface ContentDepthProviderProps {
    children: ReactNode;
    articleSlug?: string;
    defaultDepth?: ContentDepth;
}

export function ContentDepthProvider({
    children,
    articleSlug,
    defaultDepth = 'long'
}: ContentDepthProviderProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [depth, setDepthState] = useState<ContentDepth>(() => {
        // Priority: URL param > default (short for Quick Takes)
        // We INTENTIONALLY ignore localStorage here so every fresh page load starts
        // on "Quick Takes" as requested by the user.
        const urlParam = searchParams.get('view');
        if (isValidDepth(urlParam)) return urlParam;

        return 'short';
    });

    const [previousDepth, setPreviousDepth] = useState<ContentDepth>(depth);

    const setDepth = useCallback((newDepth: ContentDepth) => {
        setPreviousDepth(depth);
        setDepthState(newDepth);

        // Persist to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, newDepth);
        }

        // Update URL without reload
        const params = new URLSearchParams(searchParams.toString());
        params.set('view', newDepth);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });

        // Fire analytics event
        if (typeof window !== 'undefined' && 'gtag' in window) {
            (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'content_depth_toggle', {
                from: depth,
                to: newDepth,
                article_slug: articleSlug || pathname
            });
        }
    }, [depth, searchParams, router, pathname, articleSlug]);

    // Sync with URL changes (e.g., browser back/forward)
    useEffect(() => {
        const urlParam = searchParams.get('view');
        if (isValidDepth(urlParam) && urlParam !== depth) {
            setDepthState(urlParam);
        }
    }, [searchParams, depth]);

    return (
        <ContentDepthContext.Provider value={{ depth, setDepth, articleSlug }}>
            {children}
        </ContentDepthContext.Provider>
    );
}

export function useContentDepth() {
    const context = useContext(ContentDepthContext);
    if (!context) {
        throw new Error('useContentDepth must be used within a ContentDepthProvider');
    }
    return context;
}
