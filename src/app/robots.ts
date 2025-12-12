import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    // Use VERCEL_URL if available (preview deployments), otherwise fallback to localhost or production domain
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/',
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
