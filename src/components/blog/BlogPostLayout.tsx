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
import { ShareMenu } from './ShareMenu';

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

    const [showShareMenu, setShowShareMenu] = useState(false);
    const shareMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
                setShowShareMenu(false);
            }
        }

        if (showShareMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showShareMenu]);

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
                                className="text-[#4D7DA3] hover:text-[#153230] font-bold flex items-center gap-2 transition-colors"
                            >
                                ← Back to all posts
                            </Link>
                            <div className="relative" ref={shareMenuRef}>
                                <button
                                    onClick={() => setShowShareMenu(!showShareMenu)}
                                    className="text-[#4D7DA3] hover:text-[#153230] font-bold transition-colors min-w-[80px] text-right"
                                >
                                    Share →
                                </button>
                                <ShareMenu
                                    isOpen={showShareMenu}
                                    onClose={() => setShowShareMenu(false)}
                                    className="absolute bottom-full right-0 mb-2"
                                />
                            </div>
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
                        <Link href="/" className="text-[#153230]/60 hover:text-[#4D7DA3] text-sm font-semibold transition-colors">
                            Home
                        </Link>
                        <Link href="/blog" className="text-[#153230]/60 hover:text-[#4D7DA3] text-sm font-semibold transition-colors">
                            Blog
                        </Link>
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
