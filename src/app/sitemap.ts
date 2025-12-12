import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    // Use VERCEL_URL if available (preview deployments), otherwise fallback to localhost or production domain
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    // Static routes
    const routes = [
        '',
        '/blog',
        '/about',
        '/contact', // Assuming there is a contact page or section
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // In a real app, we would fetch dynamic blog posts here and add them to the sitemap

    return routes;
}
