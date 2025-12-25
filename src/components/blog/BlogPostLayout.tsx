'use client';

import { ReactNode } from 'react';
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

    // Logic to find the next post
    const sortedPosts = [...samplePosts].sort((a, b) =>
        new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime()
    );

    const currentIndex = sortedPosts.findIndex(p => p.slug === slug);
    const nextPost = currentIndex !== -1 && currentIndex < sortedPosts.length - 1
        ? sortedPosts[currentIndex + 1]
        : null;

    return (
        <>
            <ScrollProgress />

            <header className="px-8 md:px-12 py-8 max-w-5xl mx-auto w-full">
                <Link
                    href="/blog"
                    className="group inline-flex items-center gap-3 text-base font-bold text-[#153230]/80 hover:text-[#153230] transition-colors"
                >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border border-[#153230]/10 bg-white group-hover:border-[#153230] group-hover:bg-[#153230] group-hover:text-white transition-all duration-300 shadow-sm">
                        ←
                    </div>
                    Back to Blog
                </Link>
            </header>

            <article className="px-6 md:px-12 py-8 max-w-[1400px] mx-auto w-full">
                <ScrollReveal delay={100}>
                    {/* 1. Hero Image (Full Width) */}
                    {coverImage && (
                        <div className="mb-8 md:mb-12 rounded-2xl overflow-hidden shadow-2xl border border-[#4D7DA3]/10 max-w-5xl mx-auto">
                            <img
                                src={coverImage}
                                alt=""
                                className="w-full h-auto max-h-[600px] object-cover rounded-2xl"
                            />
                        </div>
                    )}

                    {/* 2. Split Header: Title + Compact Whiteboard */}
                    <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start mb-12 max-w-5xl mx-auto">
                        {/* Left: Metadata & Typography */}
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center gap-3 mb-4 md:mb-6">
                                <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold text-white bg-[#2e6089]">
                                    {category}
                                </span>
                                <span className="text-[#153230]/80 text-xs md:text-sm">{date} • {readTime}</span>
                            </div>

                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#153230] leading-[1.1] tracking-tight">
                                {title}
                            </h1>

                            <p className="text-lg md:text-xl text-[#153230]/70 leading-relaxed max-w-4xl">
                                {subtitle}
                            </p>
                        </div>

                        {/* Right: Compact Whiteboard (Desktop Only) */}
                        <div className="hidden lg:block w-[350px] flex-shrink-0 sticky top-8">
                            <div className="bg-[#f8fcfe] rounded-2xl p-1 border border-[#4D7DA3]/10 shadow-sm">
                                <VirtualWhiteboard
                                    title="Quick Notes"
                                    variant="compact"
                                    height={250}
                                    showInstructions={false}
                                />
                            </div>
                            <p className="text-center text-xs text-[#1e6088] mt-2 font-medium bg-[#E5F4FF]/50 py-1 rounded-lg">
                                💡 Pin this to keep notes while reading!
                            </p>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Mobile Notes Toggle (Collapsible) - Kept for small screens */}
                <div className="lg:hidden mb-12">
                    <details className="group bg-[#f8fcfe] rounded-xl border border-[#4D7DA3]/10 open:border-[#4D7DA3]/30 transition-all">
                        <summary className="flex items-center justify-between p-4 cursor-pointer list-none font-bold text-[#153230] select-none">
                            <span className="flex items-center gap-2">
                                📝 Show Notes & Ideas
                            </span>
                            <span className="transform group-open:rotate-180 transition-transform">
                                ▼
                            </span>
                        </summary>
                        <div className="p-4 pt-0 border-t border-[#4D7DA3]/10 mt-2">
                            <VirtualWhiteboard title="Notes & Ideas" showInstructions={true} />
                        </div>
                    </details>
                </div>

                {/* Content Depth Toggle - Only shown when depth content is provided */}
                {hasDepthContent && <ContentDepthToggle />}

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
                                className="text-[#1e6088] hover:text-[#153230] font-bold flex items-center gap-2 transition-colors"
                            >
                                ← Back to all posts
                            </Link>

                            {nextPost && (
                                <Link
                                    href={`/blog/${nextPost.slug}`}
                                    className="text-[#1e6088] hover:text-[#153230] font-bold flex items-center gap-2 transition-colors text-right"
                                >
                                    Next Post →
                                </Link>
                            )}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Engagement Bar - Floating at bottom */}
                <EngagementBar slug={slug || 'unknown-slug'} title={typeof title === 'string' ? title : 'Blog Post'} />
            </article>

            <footer className="px-8 md:px-12 py-8 border-t border-[#4D7DA3]/10 bg-[#f8fcfe]">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#153230]/80 text-sm">
                        © {new Date().getFullYear()} DTHOMPSONDEV. All rights reserved.
                    </p>
                    <Link
                        href="/feed.xml"
                        className="text-[#153230]/70 hover:text-[#1e6088] text-sm font-medium transition-colors flex items-center gap-2"
                        target="_blank"
                    >
                        <span className="w-4 h-4 flex items-center justify-center rounded-sm border border-current font-serif font-bold text-[10px] leading-none">R</span>
                        RSS Feed
                    </Link>
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
            <ContentDepthProvider articleSlug={slug}>
                <BlogPostLayoutInner slug={slug} {...rest} />
            </ContentDepthProvider>
        );
    }

    // Simple post without depth content
    return <BlogPostLayoutInner slug={props.slug} {...props} />;
}

// Re-export for backward compatibility
export { BlogPostLayout as DepthAwareBlogLayout };
