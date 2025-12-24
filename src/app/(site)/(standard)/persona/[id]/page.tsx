import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { samplePosts } from '@/data/blogPosts';
import { PERSONA_INFO } from '@/data/personaContent';
import { TiltCard } from '@/components/TiltCard';
import { ScrollReveal } from '@/components/ScrollReveal';

// Define valid persona IDs
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

    // Filter blog posts for this persona
    const relevantPosts = samplePosts.filter(post =>
        post.targetPersonas?.includes(personaId)
    ).sort((a, b) =>
        new Date(b.published_at || b.created_at).getTime() -
        new Date(a.published_at || a.created_at).getTime()
    );

    // Get other posts that might be interesting
    const otherPosts = samplePosts.filter(post =>
        !post.targetPersonas?.includes(personaId)
    ).slice(0, 3);

    return (
        <>
            {/* Hero Section */}
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

            {/* Curated Content Section */}
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
                                <TiltCard className="h-full" key={post.id}>
                                    <Link href={`/blog/${post.slug}`} className="block h-full">
                                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#4D7DA3]/10 h-full">
                                            <div
                                                className="h-48 flex items-center justify-center relative overflow-hidden"
                                                style={{ backgroundColor: getColorForPost(index) }}
                                            >
                                                {post.cover_image_url ? (
                                                    <img
                                                        src={post.cover_image_url}
                                                        alt=""
                                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="text-white text-center p-6 bg-black/10 w-full h-full flex flex-col items-center justify-center backdrop-blur-[2px]">
                                                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-xs font-bold tracking-wider uppercase">Read Post</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span
                                                        className="px-3 py-1 rounded-full text-xs font-black text-white"
                                                        style={{ backgroundColor: getColorForPost(index) }}
                                                    >
                                                        {post.category}
                                                    </span>
                                                    <span className="text-sm text-[#4a5757]">
                                                        {new Date(post.published_at || post.created_at).toLocaleDateString()}
                                                    </span>
                                                    <span className="text-sm text-[#4a5757]">• {post.read_time || '5 min'}</span>
                                                </div>
                                                <h3 className="text-2xl font-black text-[#153230] mb-3 leading-tight">
                                                    {post.title}
                                                </h3>
                                                <p className="text-[#153230]/70 leading-relaxed">
                                                    {post.excerpt}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </TiltCard>
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

                    {/* Podcast Section */}
                    <div className="mb-16">
                        <div className="mb-6">
                            <h2 className="text-2xl font-black text-[#153230] flex items-center gap-3">
                                <span className="text-3xl">🎙️</span> From The Podcast
                            </h2>
                            <p className="text-[#153230]/60 mt-1">
                                Deep dives on career, tech, and growth
                            </p>
                        </div>
                        <Link
                            href="/podcast"
                            className="block bg-gradient-to-br from-[#153230] to-[#1a3d3a] rounded-2xl p-6 sm:p-8 border border-[#4D7DA3]/20 hover:border-[#4D7DA3]/40 hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="w-24 h-24 rounded-2xl bg-[#4D7DA3] flex items-center justify-center shrink-0">
                                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
                                    </svg>
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight group-hover:text-[#4D7DA3] transition-colors">
                                        The Programming Podcast
                                    </h3>
                                    <p className="text-white/70 mt-2 max-w-xl">
                                        Join Danny Thompson and Leon Noel for real talk about AI, career advice, and everything developers need to thrive.
                                    </p>
                                    <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
                                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white/80 bg-white/10 px-3 py-1.5 rounded-full">
                                            <svg className="w-4 h-4 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                                            </svg>
                                            YouTube
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white/80 bg-white/10 px-3 py-1.5 rounded-full">
                                            <svg className="w-4 h-4 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02z" />
                                            </svg>
                                            Spotify
                                        </span>
                                    </div>
                                </div>
                                <div className="text-white/60 group-hover:text-white transition-colors text-2xl hidden sm:block">
                                    →
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Explore More Content */}
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
                                                {post.cover_image_url && (
                                                    <img
                                                        src={post.cover_image_url}
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

                    {/* CTA Section */}
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
