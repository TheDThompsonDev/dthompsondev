import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { samplePosts } from '@/data/blogPosts';
import { PERSONA_INFO } from '@/data/personaContent';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TrackedPostCard } from './TrackedPostCard';
import { TrackedPodcastBanner } from './TrackedPodcastBanner';

const VALID_PERSONA_IDS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];

const colors = ['#4D7DA3', '#84803E', '#A34D7D', '#7DA34D', '#D87D4A'];

function getColorForPost(index: number): string {
    return colors[index % colors.length];
}

export async function generateStaticParams() {
    return VALID_PERSONA_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const persona = PERSONA_INFO[id];

    if (!persona) {
        return { title: 'Content Hub | Danny Thompson' };
    }

    return {
        title: `${persona.label} Content Hub | Danny Thompson`,
        description: persona.contentFocus,
    };
}

export default async function PersonaPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: personaId } = await params;

    if (!VALID_PERSONA_IDS.includes(personaId)) {
        notFound();
    }

    const persona = PERSONA_INFO[personaId];

    const relevantPosts = samplePosts.filter(post =>
        post.targetPersonas?.includes(personaId)
    ).sort((a, b) =>
        new Date(b.publishedAt || b.createdAt).getTime() -
        new Date(a.publishedAt || a.createdAt).getTime()
    );

    const otherPosts = samplePosts.filter(post =>
        !post.targetPersonas?.includes(personaId)
    ).slice(0, 3);

    return (
        <>
            <section className="px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24 border-b-2 border-[#153230]/10">
                <ScrollReveal>
                    <div className="max-w-5xl mx-auto">
                        <Link
                            href="/#orbit"
                            className="inline-flex items-center gap-2 text-[#4D7DA3] hover:text-[#153230] font-bold mb-6 transition-colors"
                        >
                            ← Back to Orbit
                        </Link>

                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${persona.color} flex items-center justify-center text-3xl shadow-xl`}>
                                {persona.icon}
                            </div>
                            <div>
                                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#153230] leading-[0.95] tracking-tight">
                                    {persona.label}
                                </h1>
                                <p className="text-lg text-[#153230]/60 font-medium mt-1">{persona.description}</p>
                            </div>
                        </div>

                        <p className="text-xl text-[#153230]/80 leading-relaxed max-w-3xl">
                            {persona.contentFocus}
                        </p>
                    </div>
                </ScrollReveal>
            </section>

            <section className="px-4 sm:px-8 md:px-16 py-12 sm:py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2.5 bg-[#153230] text-white px-4 py-2 rounded-full shadow-lg mb-4">
                            <div className="relative flex items-center justify-center">
                                <div className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse"></div>
                                <div className="absolute w-2 h-2 bg-[#4ade80] rounded-full animate-ping"></div>
                            </div>
                            <span className="text-xs font-bold tracking-wide">CURATED FOR YOU</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-[#153230] mb-2">
                            Recommended Content
                        </h2>
                        <p className="text-[#153230]/60">
                            {relevantPosts.length} article{relevantPosts.length !== 1 ? 's' : ''} selected for {persona.label}s
                        </p>
                    </div>

                    {relevantPosts.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                            {relevantPosts.map((post, index) => (
                                <TrackedPostCard
                                    key={post.id}
                                    post={post}
                                    index={index}
                                    personaId={personaId}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-[#E2F3F2]/50 rounded-2xl mb-16">
                            <div className="w-20 h-20 bg-[#4D7DA3]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">📝</span>
                            </div>
                            <h3 className="text-2xl font-black text-[#153230] mb-3">Content Coming Soon</h3>
                            <p className="text-[#153230]/70 max-w-md mx-auto">
                                We&apos;re creating tailored content for {persona.label}s. Check back soon!
                            </p>
                        </div>
                    )}

                    <div className="mb-16">
                        <div className="mb-6">
                            <h2 className="text-2xl font-black text-[#153230] flex items-center gap-3">
                                <span className="text-3xl">🎙️</span> From The Podcast
                            </h2>
                            <p className="text-[#153230]/60 mt-1">
                                Deep dives on career, tech, and growth
                            </p>
                        </div>
                        <TrackedPodcastBanner />
                    </div>

                    {otherPosts.length > 0 && (
                        <div className="pt-12 border-t-2 border-[#4D7DA3]/20">
                            <h2 className="text-2xl font-black text-[#153230] mb-6">Explore More Content</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {otherPosts.map((post, index) => (
                                    <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                                        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-[#4D7DA3]/10">
                                            <div
                                                className="h-32 relative overflow-hidden opacity-70"
                                                style={{ backgroundColor: getColorForPost(index) }}
                                            >
                                                {post.coverImageUrl && (
                                                    <img
                                                        src={post.coverImageUrl}
                                                        alt=""
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <span className="text-xs font-bold text-[#4D7DA3]">{post.category}</span>
                                                <h4 className="font-bold text-[#153230] leading-tight group-hover:text-[#4D7DA3] transition-colors">
                                                    {post.title}
                                                </h4>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-16 text-center">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#153230] to-[#4D7DA3] text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            Browse All Content →
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
