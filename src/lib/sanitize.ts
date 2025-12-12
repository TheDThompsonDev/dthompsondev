import DOMPurify from 'isomorphic-dompurify';

/**
 * Escapes HTML entities to prevent XSS in plain text contexts
 * Use this for user input that will be placed in HTML templates
 */
export function escapeHtml(unsafe: string): string {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Sanitizes HTML content to remove potentially dangerous tags/attributes
 * Use this for rich content that needs to preserve some HTML formatting
 */
export function sanitizeHtml(dirty: string): string {
    return DOMPurify.sanitize(dirty, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'code', 'pre', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div'],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'id'],
        ALLOW_DATA_ATTR: false,
    });
}

/**
 * Strips all HTML tags, leaving only plain text
 * Use this when you need pure text content
 */
export function stripHtml(html: string): string {
    return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
}
