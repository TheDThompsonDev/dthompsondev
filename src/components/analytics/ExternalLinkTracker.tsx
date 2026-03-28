'use client';

import { useEffect } from 'react';
import { trackExternalLink } from '@/lib/analytics';

/**
 * Intercepts clicks on external links (links starting with http that aren't same-origin)
 * and fires analytics events. This helps understand which outbound links users click,
 * such as social media, podcast apps, and partner links.
 *
 * Drop this once into the layout — it uses event delegation on the document.
 */
export function ExternalLinkTracker() {
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            const target = (e.target as Element)?.closest('a');
            if (!target) return;

            const href = target.getAttribute('href');
            if (!href || !href.startsWith('http')) return;

            // Skip same-origin links
            try {
                const linkUrl = new URL(href);
                if (linkUrl.hostname === window.location.hostname) return;
            } catch {
                return;
            }

            const text = target.textContent?.trim().slice(0, 50) || '';
            const section = target.closest('[data-section]')?.getAttribute('data-section') || 'unknown';

            trackExternalLink({
                url: href,
                text,
                location: section,
            });
        }

        document.addEventListener('click', handleClick, { capture: true });
        return () => document.removeEventListener('click', handleClick, { capture: true });
    }, []);

    return null;
}
