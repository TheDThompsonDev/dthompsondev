
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const post = await prisma.blogPost.findUnique({
            where: { slug: slug },
            select: { views: true, likes: true, dislikes: true }
        });

        if (!post) {
            return NextResponse.json({ views: 0, likes: 0, dislikes: 0 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching engagement stats:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const body = await request.json();
        const { action } = body; // 'view', 'like', 'dislike'

        if (!['view', 'like', 'dislike'].includes(action)) {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        // Determine which field to increment
        const fieldToIncrement = action === 'view' ? 'views' : action === 'like' ? 'likes' : 'dislikes';

        // Use UPSERT to ensure the record exists.
        // If the post doesn't exist in the DB (only in file system), we create a "stub" record for stats.
        const updatedPost = await prisma.blogPost.upsert({
            where: { slug },
            create: {
                slug,
                title: slug, // Fallback title
                content: {}, // Empty content required by schema
                // Initialize the specific action to 1, others to 0 (default)
                views: action === 'view' ? 1 : 0,
                likes: action === 'like' ? 1 : 0,
                dislikes: action === 'dislike' ? 1 : 0,
            },
            update: {
                [fieldToIncrement]: { increment: 1 }
            },
            select: { views: true, likes: true, dislikes: true }
        });

        return NextResponse.json(updatedPost);

    } catch (error) {
        console.error('Error updating engagement stats:', error);
        return NextResponse.json({ error: 'Failed to update stats' }, { status: 500 });
    }
}
