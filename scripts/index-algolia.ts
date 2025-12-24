/**
 * Algolia Indexing Script
 * 
 * Indexes blog posts and podcast episodes to Algolia for search
 * 
 * Usage: npx tsx scripts/index-algolia.ts
 * 
 * Required environment variables:
 * - ALGOLIA_APP_ID
 * - ALGOLIA_ADMIN_API_KEY (never expose this client-side!)
 */

import * as dotenv from 'dotenv';
dotenv.config();

import { algoliasearch } from 'algoliasearch';
import { samplePosts } from '../src/data/blogPosts';
import { fetchYouTubeEpisodes } from '../src/lib/youtube-fetcher';

// Load environment variables
const appId = process.env.ALGOLIA_APP_ID || process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const adminKey = process.env.ALGOLIA_ADMIN_API_KEY;

if (!appId || !adminKey) {
    console.error('❌ Missing Algolia credentials!');
    console.error('Please set ALGOLIA_APP_ID and ALGOLIA_ADMIN_API_KEY environment variables');
    process.exit(1);
}

const client = algoliasearch(appId, adminKey);
const INDEX_NAME = 'dthompsondev_content';

interface AlgoliaRecord {
    objectID: string;
    type: 'blog' | 'podcast';
    title: string;
    description: string;
    url: string;
    category?: string;
    date: string;
    thumbnail?: string;
    duration?: string;
    [key: string]: unknown;
}

async function indexBlogPosts(): Promise<AlgoliaRecord[]> {
    console.log('📝 Processing blog posts...');

    const blogRecords: AlgoliaRecord[] = samplePosts.map(post => ({
        objectID: `blog_${post.slug}`,
        type: 'blog' as const,
        title: post.title,
        description: post.excerpt || '',
        url: `/blog/${post.slug}`,
        category: post.category,
        date: post.published_at || post.created_at,
        thumbnail: post.cover_image_url,
    }));

    console.log(`   Found ${blogRecords.length} blog posts`);
    return blogRecords;
}

async function indexPodcastEpisodes(): Promise<AlgoliaRecord[]> {
    console.log('🎙️ Fetching podcast episodes...');

    try {
        const episodes = await fetchYouTubeEpisodes();

        const podcastRecords: AlgoliaRecord[] = episodes.map((episode: any, index: number) => ({
            objectID: `podcast_${episode.id || index}`,
            type: 'podcast',
            title: episode.title,
            description: episode.description?.substring(0, 500) || '',
            url: episode.externalUrl || episode.videoUrl || `/podcast`,
            category: 'Podcast',
            date: episode.publishedAt || new Date().toISOString(),
            thumbnail: episode.thumbnail,
            duration: episode.duration,
        }));

        console.log(`   Found ${podcastRecords.length} podcast episodes`);
        return podcastRecords;
    } catch (error) {
        console.error('   ⚠️ Error fetching podcasts:', error);
        return [];
    }
}

async function main() {
    console.log('🚀 Starting Algolia indexing...\n');

    // Fetch all content
    const blogRecords = await indexBlogPosts();
    const podcastRecords = await indexPodcastEpisodes();

    const allRecords = [...blogRecords, ...podcastRecords];
    console.log(`\n📊 Total records to index: ${allRecords.length}`);

    if (allRecords.length === 0) {
        console.log('⚠️ No records to index');
        return;
    }

    // Index to Algolia
    console.log(`\n⬆️ Uploading to Algolia index: ${INDEX_NAME}...`);

    try {
        const result = await client.saveObjects({
            indexName: INDEX_NAME,
            objects: allRecords,
        });

        console.log('\n✅ Successfully indexed all content!');
        console.log(`   Index: ${INDEX_NAME}`);
        console.log(`   Records: ${allRecords.length}`);
    } catch (error) {
        console.error('❌ Error indexing to Algolia:', error);
        process.exit(1);
    }

    // Configure searchable attributes
    console.log('\n⚙️ Configuring index settings...');
    try {
        await client.setSettings({
            indexName: INDEX_NAME,
            indexSettings: {
                searchableAttributes: [
                    'title',
                    'description',
                    'category',
                ],
                attributesForFaceting: [
                    'type',
                    'category',
                ],
                customRanking: [
                    'desc(date)',
                ],
            },
        });
        console.log('   ✅ Index settings configured');
    } catch (error) {
        console.error('   ⚠️ Error configuring settings:', error);
    }

    console.log('\n🎉 Done!');
}

main();
