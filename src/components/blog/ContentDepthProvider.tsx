'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode, Suspense, useRef } from 'react';
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

// Internal component to handle URL synchronization
// This component uses useSearchParams, so it must be wrapped in Suspense
function ContentDepthUrlSync() {
    const { depth, setDepth, articleSlug } = useContentDepth();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const isInitialMount = useRef(true);

    // Sync URL -> State (Initial load & Back/Forward navigation)
    useEffect(() => {
        const urlParam = searchParams.get('view');
        // If URL has a valid depth and it's different from current state, update state
        if (isValidDepth(urlParam) && urlParam !== depth) {
            setDepth(urlParam);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, setDepth]);

    // Sync State -> URL
    useEffect(() => {
        // Skip first run to avoid overwriting URL param with default 'short'
        // unless there is no param at all, but we want to be careful not to push unnecessarily.
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const currentParam = searchParams.get('view');
        if (currentParam !== depth) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('view', depth);
            router.push(`${pathname}?${params.toString()}`, { scroll: false });

            // Fire analytics event
            if (typeof window !== 'undefined' && 'gtag' in window) {
                (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'content_depth_toggle', {
                    from: currentParam || 'short',
                    to: depth,
                    article_slug: articleSlug || pathname
                });
            }
        }
    }, [depth, router, pathname, searchParams, articleSlug]);

    return null;
}

interface ContentDepthProviderProps {
    children: ReactNode;
    articleSlug?: string;
    defaultDepth?: ContentDepth;
}

export function ContentDepthProvider({
    children,
    articleSlug,
    defaultDepth = 'short' // Default to short (Quick Takes) for SEO/Server render
}: ContentDepthProviderProps) {

    // Initialize directly with defaultDepth (no URL check here)
    const [depth, setDepthState] = useState<ContentDepth>(defaultDepth);

    const setDepth = useCallback((newDepth: ContentDepth) => {
        setDepthState(newDepth);

        // Persist to localStorage (side effect safe for event handlers)
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, newDepth);
        }
    }, []);

    return (
        <ContentDepthContext.Provider value={{ depth, setDepth, articleSlug }}>
            {children}
            <Suspense fallback={null}>
                <ContentDepthUrlSync />
            </Suspense>
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
