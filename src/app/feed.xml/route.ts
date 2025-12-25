
import { samplePosts } from '@/data/blogPosts';

const baseUrl = 'https://dthompson.dev';

export async function GET() {
  const sortedPosts = [...samplePosts].sort((a, b) =>
    new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
  );

  const rssItems = sortedPosts.map((post) => {
    const postUrl = `${baseUrl}/blog/${post.slug}`;
    const date = new Date(post.publishedAt || post.createdAt).toUTCString();

    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${date}</pubDate>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <category>${post.category}</category>
    </item>`;
  }).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Danny Thompson's Blog</title>
    <link>${baseUrl}</link>
    <description>Thoughts on AI, Software Engineering, and the Future of Tech.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
