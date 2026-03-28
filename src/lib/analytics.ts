'use client';

/**
 * Custom analytics event tracking utilities
 * Uses Vercel Analytics track() function for cookie-free tracking
 * Enhanced with Microsoft Clarity event forwarding for behavioral insights
 */

import { track } from '@vercel/analytics';

// Forward events to Microsoft Clarity when available
function clarityEvent(eventName: string) {
    if (typeof window !== 'undefined' && (window as any).clarity) {
        (window as any).clarity('event', eventName);
    }
}

type BlogEngagementEvent = {
    slug: string;
    depth: 'short' | 'medium' | 'long';
    action: 'view' | 'toggle' | 'reaction';
    reaction?: 'like' | 'dislike' | 'fire' | 'lightbulb' | 'clap';
};

type CTAEvent = {
    location: string;
    buttonText: string;
    destination?: string;
};

type CommandPaletteEvent = {
    action: 'open' | 'search' | 'navigate';
    query?: string;
    destination?: string;
};

type ContentEvent = {
    type: 'podcast' | 'talk' | 'resource';
    title: string;
    action: 'play' | 'click' | 'external_link';
};

type SectionViewEvent = {
    section: string;
    page: string;
};

type ScrollDepthEvent = {
    depth: 25 | 50 | 75 | 100;
    page: string;
};

type ExternalLinkEvent = {
    url: string;
    text: string;
    location: string;
};

type NavigationEvent = {
    from: string;
    to: string;
    method: 'navbar' | 'link' | 'cta' | 'footer';
};

type TimeOnPageEvent = {
    seconds: number;
    page: string;
};

// ── Existing tracking functions ──────────────────────────────────

export function trackBlogDepth(event: BlogEngagementEvent) {
    track('blog_engagement', {
        slug: event.slug,
        depth: event.depth,
        action: event.action,
        reaction: event.reaction,
    });
    clarityEvent(`blog_${event.action}_${event.depth}`);
}

export function trackCTA(event: CTAEvent) {
    track('cta_click', {
        location: event.location,
        button_text: event.buttonText,
        destination: event.destination,
    });
    clarityEvent(`cta_${event.location}`);
}

export function trackCommandPalette(event: CommandPaletteEvent) {
    track('command_palette', {
        action: event.action,
        query: event.query,
        destination: event.destination,
    });
    clarityEvent(`cmd_${event.action}`);
}

export function trackContent(event: ContentEvent) {
    track('content_engagement', {
        type: event.type,
        title: event.title,
        action: event.action,
    });
    clarityEvent(`content_${event.type}_${event.action}`);
}

export function trackContact(action: 'modal_open' | 'form_submit' | 'form_success' | 'form_error') {
    track('contact', { action });
    clarityEvent(`contact_${action}`);
}

export function trackPersona(personaId: string, action: 'view' | 'content_click') {
    track('persona', { persona_id: personaId, action });
    clarityEvent(`persona_${action}`);
}

// ── New tracking functions for bounce rate diagnosis ─────────────

export function trackSectionView(event: SectionViewEvent) {
    track('section_view', {
        section: event.section,
        page: event.page,
    });
    clarityEvent(`section_${event.section}`);
}

export function trackScrollDepth(event: ScrollDepthEvent) {
    track('scroll_depth', {
        depth: event.depth,
        page: event.page,
    });
    clarityEvent(`scroll_${event.depth}`);
}

export function trackExternalLink(event: ExternalLinkEvent) {
    track('external_link', {
        url: event.url,
        text: event.text,
        location: event.location,
    });
    clarityEvent(`external_${event.location}`);
}

export function trackNavigation(event: NavigationEvent) {
    track('navigation', {
        from: event.from,
        to: event.to,
        method: event.method,
    });
    clarityEvent(`nav_${event.method}`);
}

export function trackTimeOnPage(event: TimeOnPageEvent) {
    track('time_on_page', {
        seconds: event.seconds,
        page: event.page,
    });
    clarityEvent(`time_${event.seconds}s`);
}
