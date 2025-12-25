/**
 * Custom analytics event tracking utilities
 * Uses Vercel Analytics track() function for cookie-free tracking
 */

import { track } from '@vercel/analytics';

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

export function trackBlogDepth(event: BlogEngagementEvent) {
    track('blog_engagement', {
        slug: event.slug,
        depth: event.depth,
        action: event.action,
        reaction: event.reaction,
    });
}

export function trackCTA(event: CTAEvent) {
    track('cta_click', {
        location: event.location,
        button_text: event.buttonText,
        destination: event.destination,
    });
}

export function trackCommandPalette(event: CommandPaletteEvent) {
    track('command_palette', {
        action: event.action,
        query: event.query,
        destination: event.destination,
    });
}

export function trackContent(event: ContentEvent) {
    track('content_engagement', {
        type: event.type,
        title: event.title,
        action: event.action,
    });
}

export function trackContact(action: 'modal_open' | 'form_submit' | 'form_success' | 'form_error') {
    track('contact', { action });
}

export function trackPersona(personaId: string, action: 'view' | 'content_click') {
    track('persona', { persona_id: personaId, action });
}
