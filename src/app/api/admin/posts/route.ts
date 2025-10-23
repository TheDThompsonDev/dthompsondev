import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { queryBlogPosts, createBlogPost } from '@/lib/db';

export async function GET() {
  try {
    const isAuthenticated = await verifySession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const posts = await queryBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const isAuthenticated = await verifySession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const post = await createBlogPost({
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content || { blocks: [] },
      category: data.category,
      featured: data.featured,
      read_time: data.read_time,
      cover_image_url: data.cover_image_url,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}