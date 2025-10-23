import { NextResponse } from 'next/server';
import { queryBlogPosts } from '@/lib/db';

export async function GET() {
  try {
    const posts = await queryBlogPosts('published');
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching published posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}