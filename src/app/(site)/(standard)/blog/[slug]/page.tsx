'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { BlogRenderer } from '@/components/BlogRenderer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FloatingTOC } from '@/components/FloatingTOC';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/blog/posts/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Failed to fetch post:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E2F3F2] flex items-center justify-center">
        <div className="text-[#153230] text-xl">Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#E2F3F2] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#153230] mb-4">Post Not Found</h1>
          <p className="text-[#153230]/70 mb-6">The post you're looking for doesn't exist.</p>
          <Link
            href="/blog"
            className="inline-block px-6 py-3 bg-[#153230] text-white rounded-full hover:bg-[#4D7DA3] transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const headings = post.content.blocks
    .filter(block => block.type === 'heading')
    .map(block => ({
      id: block.id || block.content?.toLowerCase().replace(/\s+/g, '-') || '',
      title: block.content || '',
      level: block.level || 2,
    }));

  return (
    <>
      <ScrollProgress />
      <FloatingTOC items={headings} />

      <div className="min-h-screen bg-[#E2F3F2]">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-white rounded-[32px] shadow-xl m-4 overflow-hidden border border-[#4D7DA3]/10">
            <header className="px-8 md:px-16 py-8 flex justify-between items-center border-b border-[#4D7DA3]/10">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 bg-[#153230] rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  DT
                </div>
                <span className="text-xl font-bold tracking-tight text-[#153230]">DTHOMPSONDEV</span>
              </Link>
              <Link
                href="/blog"
                className="bg-[#153230] text-white px-8 py-4 rounded-full hover:bg-[#4D7DA3] hover:scale-105 transition-all duration-300 font-semibold"
              >
                Back to Blog
              </Link>
            </header>

            <article className="px-8 md:px-16 py-16">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  {post.category && (
                    <span className="inline-block px-4 py-2 bg-[#4D7DA3] text-white rounded-full text-sm font-bold mb-4">
                      {post.category}
                    </span>
                  )}

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#153230] mb-6 leading-tight">
                    {post.title}
                  </h1>

                  {post.excerpt && (
                    <p className="text-xl text-[#153230]/70 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#153230]/60">
                    <span className="font-medium">{post.author_name}</span>
                    <span>•</span>
                    <time>
                      {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    {post.read_time && (
                      <>
                        <span>•</span>
                        <span>{post.read_time}</span>
                      </>
                    )}
                  </div>
                </div>

                {post.cover_image_url && (
                  <div className="mb-12">
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="w-full rounded-2xl shadow-lg"
                    />
                  </div>
                )}

                <div className="prose prose-lg max-w-none">
                  <BlogRenderer content={post.content} />
                </div>
              </div>
            </article>

            <footer className="px-8 md:px-16 py-8 border-t border-[#4D7DA3]/10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[#153230]/60 text-sm">
                  © {new Date().getFullYear()} DTHOMPSONDEV. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
