'use client';

import { useState, useCallback, useRef } from 'react';
import { algoliasearch } from 'algoliasearch';

// Use search-only API key (safe to expose client-side)
const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '';
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || '';
const indexName = 'dthompsondev_content';

export interface AlgoliaHit {
    objectID: string;
    type: 'blog' | 'podcast';
    title: string;
    description: string;
    url: string;
    category?: string;
    date: string;
    thumbnail?: string;
    duration?: string;
}

export interface UseAlgoliaSearchResult {
    results: AlgoliaHit[];
    isLoading: boolean;
    error: Error | null;
    search: (query: string) => void;
    clearResults: () => void;
}

export function useAlgoliaSearch(): UseAlgoliaSearchResult {
    const [results, setResults] = useState<AlgoliaHit[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const requestIdRef = useRef(0);
    const [client] = useState(() => {
        if (!appId || !searchKey) {
            console.warn('Algolia credentials not configured');
            return null;
        }
        return algoliasearch(appId, searchKey);
    });

    const clearResults = useCallback(() => {
        setResults([]);
        setIsLoading(false);
    }, []);

    const search = useCallback(async (query: string) => {
        if (!client) {
            return;
        }

        if (!query.trim()) {
            setResults([]);
            setIsLoading(false);
            return;
        }

        // Increment request ID for this search
        const currentRequestId = ++requestIdRef.current;
        setIsLoading(true);
        setError(null);

        try {
            const response = await client.search<AlgoliaHit>({
                requests: [{
                    indexName,
                    query,
                    hitsPerPage: 10,
                }],
            });

            // Only update results if this is still the latest request
            if (currentRequestId === requestIdRef.current) {
                const firstResult = response.results[0];
                const hits = 'hits' in firstResult ? firstResult.hits : [];
                setResults(hits as AlgoliaHit[]);
                setIsLoading(false);
            }
        } catch (err) {
            // Only update error if this is still the latest request
            if (currentRequestId === requestIdRef.current) {
                console.error('Algolia search error:', err);
                setError(err instanceof Error ? err : new Error('Search failed'));
                setResults([]);
                setIsLoading(false);
            }
        }
    }, [client]);

    return { results, isLoading, error, search, clearResults };
}
