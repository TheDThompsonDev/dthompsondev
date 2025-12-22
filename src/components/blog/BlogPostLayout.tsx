'use client';

import { Suspense, ReactNode, useState, useEffect, useRef } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import Link from 'next/link';
import { ScrollProgress } from '@/components/ScrollProgress';
import { VirtualWhiteboard } from '@/components/VirtualWhiteboard';
import { ContentDepthProvider } from './ContentDepthProvider';
import { ContentDepthToggle } from './ContentDepthToggle';
import { ContentDepthPanel } from './ContentDepthPanel';
import { EngagementBar } from './EngagementBar';
import { samplePosts } from '@/data/blogPosts';

interface DepthContent {
    content: ReactNode;
}

// Props for backward compatibility with simple posts
interface SimpleBlogPostLayoutProps {
    category: string;
    date: string;
    readTime: string;
    title: ReactNode;
    subtitle: string;
    children: ReactNode;
    slug?: string;
    coverImage?: string;
    short?: never;
    medium?: never;
    long?: never;
}

// Props for depth-aware posts
interface DepthAwareBlogPostLayoutProps {
    category: string;
    date: string;
    readTime: string;
    title: ReactNode;
    subtitle: string;
    slug: string;
    coverImage?: string;
    short: DepthContent;
    medium: DepthContent;
    long: DepthContent;
    children?: never;
}

type BlogPostLayoutProps = SimpleBlogPostLayoutProps | DepthAwareBlogPostLayoutProps;

function isDepthAware(props: BlogPostLayoutProps): props is DepthAwareBlogPostLayoutProps {
    return 'short' in props && 'medium' in props && 'long' in props && props.short !== undefined;
}

function BlogPostLayoutInner({
    category,
    date,
    readTime,
    title,
    subtitle,
    children,
    short,
    medium,
    long,
    slug,
    coverImage
}: Omit<BlogPostLayoutProps, 'slug'> & { children?: ReactNode; slug?: string; coverImage?: string }) {
    const hasDepthContent = short && medium && long;

    // Calculate Next Post
    // Sort posts by date descending (newest first)
    const sortedPosts = [...samplePosts].sort((a, b) =>
        new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime()
    );

    // Find current post index
    const currentIndex = sortedPosts.findIndex(p => p.slug === slug);

    // Next post is the one AFTER this one (older in time, or next in reading sequence)
    // If we want chronological order (Oldest -> Newest), we'd go index - 1.
    // If we want "Next in feed" (Newest -> Oldest), we go index + 1.
    // The user said "next blog in order". Usually implies "Continue Reading" -> next one in the list.
    // Since the list is Newest First, "Next" usually means the *previous chronological* post?
    // OR, if reading a series, you want the *next chronological* post (Newer).
    // Let's assume standard blog behavior: "Next Post" usually points to the Previous one in time (the one before this one).
    // Wait, if I am on the newest, "Next" should be the second newest.
    // So index + 1.
    const nextPost = currentIndex !== -1 && currentIndex < sortedPosts.length - 1
        ? sortedPosts[currentIndex + 1]
        : null;

    return (
        <>
            <ScrollProgress />

            <header className="px-8 md:px-12 py-8 max-w-5xl mx-auto w-full">
                <Link
                    href="/blog"
                    className="group inline-flex items-center gap-3 text-base font-bold text-[#153230]/60 hover:text-[#153230] transition-colors"
                >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border border-[#153230]/10 bg-white group-hover:border-[#153230] group-hover:bg-[#153230] group-hover:text-white transition-all duration-300 shadow-sm">
                        ←
                    </div>
                    Back to Blog
                </Link>
            </header>

            <article className="px-8 md:px-12 py-12 max-w-5xl mx-auto">
                <ScrollReveal delay={100}>
                    <div className={hasDepthContent ? "mb-8" : "mb-12"}>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-[#4D7DA3]">
                                {category}
                            </span>
                            <span className="text-[#153230]/60 text-sm">{date} • {readTime}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#153230] leading-[1.1] mb-6">
                            {title}
                        </h1>

                        <p className="text-xl text-[#153230]/70 leading-relaxed max-w-4xl">
                            {subtitle}
                        </p>
                    </div>

                    {coverImage && (
                        <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl border border-[#4D7DA3]/10">
                            <img
                                src={coverImage}
                                alt={typeof title === 'string' ? title : 'Blog post cover'}
                                className="w-full h-auto rounded-2xl"
                            />
                        </div>
                    )}
                </ScrollReveal>

                <div className="my-16">
                    <VirtualWhiteboard title="Notes & Ideas" showInstructions={true} />
                </div>
                {/* Content Toggle Removed - delivering all content by default as requested */}

                <ScrollReveal delay={200}>
                    <div className={`prose prose-lg max-w-none text-[#153230]/80 ${hasDepthContent ? 'mt-8' : ''}`}>
                        {hasDepthContent ? (
                            <>
                                {/* SEO: Long content first in DOM order (canonical) */}
                                <ContentDepthPanel depth="long">
                                    {long.content}
                                </ContentDepthPanel>

                                <ContentDepthPanel depth="medium">
                                    {medium.content}
                                </ContentDepthPanel>

                                <ContentDepthPanel depth="short">
                                    {short.content}
                                </ContentDepthPanel>
                            </>
                        ) : (
                            children
                        )}
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={300}>
                    <div className="mt-12 pt-8">
                        <div className="flex items-center justify-between">
                            <Link
                                href="/blog"
                                className="text-[#4D7DA3] hover:text-[#153230] font-bold flex items-center gap-2 transition-colors"
                            >
                                ← Back to all posts
                            </Link>
                            {nextPost ? (
                                <Link
                                    href={`/blog/${nextPost.slug}`}
                                    className="text-[#4D7DA3] hover:text-[#153230] font-bold text-right transition-colors"
                                >
                                    Next: {nextPost.title} →
                                </Link>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Engagement Bar - Floating at bottom */}
                <EngagementBar slug={slug || 'unknown-slug'} title={typeof title === 'string' ? title : 'Blog Post'} />
            </article>

            <footer className="px-8 md:px-12 py-8 border-t border-[#4D7DA3]/10 bg-[#f8fcfe]">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#153230]/60 text-sm">
                        © 2025 DTHOMPSONDEV. All rights reserved.
                    </p>
                    <div className="flex gap-6">

                    </div>
                </div>
            </footer>
        </>
    );
}

export function BlogPostLayout(props: BlogPostLayoutProps) {
    // If depth content is provided, wrap with ContentDepthProvider
    if (isDepthAware(props)) {
        const { slug, ...rest } = props;
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <ContentDepthProvider articleSlug={slug}>
                    <BlogPostLayoutInner slug={slug} {...rest} />
                </ContentDepthProvider>
            </Suspense>
        );
    }

    // Simple post without depth content
    return <BlogPostLayoutInner slug={props.slug} {...props} />;
}

// Re-export for backward compatibility
export { BlogPostLayout as DepthAwareBlogLayout };
