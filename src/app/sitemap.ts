import { MetadataRoute } from 'next';
import { samplePosts } from '@/data/blogPosts';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_URL;

    // Static routes
    const routes = [
        '',
        '/about',
        '/blog',
        '/talks',
        '/podcast',
        '/community',
        '/resources',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const blogRoutes = samplePosts
        .filter((post) => post.status === 'published')
        .map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.updatedAt),
            changeFrequency: 'monthly' as const,
            priority: post.featured ? 0.8 : 0.7,
        }));

    return [...routes, ...blogRoutes];
}
