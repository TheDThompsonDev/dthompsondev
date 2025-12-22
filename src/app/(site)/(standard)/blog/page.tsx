'use client';

import { ScrollReveal } from '@/components/ScrollReveal';
import { TiltCard } from '@/components/TiltCard';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BlogPost } from '@/types/blog';

const colors = ['#4D7DA3', '#84803E', '#A34D7D', '#7DA34D', '#D87D4A'];

// Persona labels for display
const PERSONA_LABELS: Record<string, string> = {
  p1: 'Junior Developer',
  p2: 'Senior Engineer',
  p3: 'Engineering Manager',
  p4: 'Developer Relations',
  p5: 'Career Changer',
  p6: 'Executive Leader',
};

function getColorForPost(index: number): string {
  return colors[index % colors.length];
}

const samplePosts: BlogPost[] = [

  {
    id: 3,
    title: 'The Death of Magic: Welcome to AI Engineering',
    slug: 'death-of-magic-ai-engineering',
    excerpt: 'The "Magic Era" of AI is dead. Learn the four architectural pillars that separate weekend prompt-tinkerers from production AI engineers.',
    content: { blocks: [] },
    category: 'AI Engineering',
    featured: true,
    read_time: '15 min',
    status: 'published',
    author_name: 'Danny Thompson',
    created_at: new Date('2025-12-21').toISOString(),
    updated_at: new Date('2025-12-21').toISOString(),
    published_at: new Date('2025-12-21').toISOString(),
    targetPersonas: ['p2', 'p3'], // Senior Engineer, Engineering Manager
    cover_image_url: '/blog-covers/ai-engineering.png',
  },
  {
    id: 6,
    title: 'The $58 Billion Pivot: Are You Building a Business or Just a "Meme Generator"?',
    slug: 'the-58-billion-pivot',
    excerpt: 'The story of how Figma almost didn\'t exist. A lesson on radical pivots, innovation, and escaping the trap of the technically impressive.',
    content: { blocks: [] },
    category: 'Leadership',
    featured: true,
    read_time: '12 min',
    status: 'published',
    author_name: 'DTHOMPSONDEV',
    created_at: new Date('2025-12-20').toISOString(),
    updated_at: new Date('2025-12-20').toISOString(),
    published_at: new Date('2025-12-20').toISOString(),
    targetPersonas: ['p3', 'p6'], // Engineering Manager, Executive
    cover_image_url: '/blog-covers/58-billion-pivot.jpeg',
  },
  {
    id: 5,
    title: 'The Invisible Framework: Mental Models That Separate Senior Devs',
    slug: 'the-invisible-framework',
    excerpt: 'Stop focusing on syntax. Learn the invisible mental models-Radical Intentionality, Second-Order Thinking, and Occam\'s Razor-that separate Senior Developers from everyone else.',
    content: { blocks: [] },
    category: 'Career',
    featured: true,
    read_time: '10 min',
    status: 'published',
    author_name: 'DTHOMPSONDEV',
    created_at: new Date('2025-12-06').toISOString(),
    updated_at: new Date('2025-12-06').toISOString(),
    published_at: new Date('2025-12-06').toISOString(),
    targetPersonas: ['p1', 'p2', 'p5'], // Junior, Senior, Career Changer
    cover_image_url: '/blog-covers/invisible-framework.jpg',
  },
  {
    id: 4,
    title: 'Understanding Schema-Enforced Outputs',
    slug: 'schema-enforced-outputs',
    excerpt: 'Stop parsing LLM output with regex. Learn how to use JSON Schemas to make your AI integrations reliable, type-safe, and production-ready.',
    content: { blocks: [] },
    category: 'AI Engineering',
    featured: true,
    read_time: '8 min',
    status: 'published',
    author_name: 'DTHOMPSONDEV',
    created_at: new Date('2025-12-13').toISOString(),
    updated_at: new Date('2025-12-13').toISOString(),
    published_at: new Date('2025-12-13').toISOString(),
    targetPersonas: ['p2', 'p3', 'p6'], // Senior Engineer, Engineering Manager, Executive
    cover_image_url: '/blog-covers/schema-outputs.jpeg',
  },
  {
    id: 2,
    title: 'React Hooks: The Mental Models You\'re Missing',
    slug: 'react-hooks-visualized',
    excerpt: 'Learn how React Hooks work under the hood with interactive examples and visual diagrams.',
    content: { blocks: [] },
    category: 'React',
    featured: false,
    read_time: '10 min',
    status: 'published',
    author_name: 'DTHOMPSONDEV',
    created_at: new Date('2025-11-22').toISOString(),
    updated_at: new Date('2025-11-22').toISOString(),
    published_at: new Date('2025-11-22').toISOString(),
    targetPersonas: ['p1', 'p2'], // Junior Dev, Senior Engineer
    cover_image_url: '/blog-covers/react-hooks-visualized.jpeg',
  },
  {
    id: 7,
    title: 'The $47,000 Bug That Taught Me to Stop Using ||',
    slug: 'the-47000-bug',
    excerpt: 'A property management company lost thousands due to a single character. Learn why || is dangerous and how ?? saves your production apps.',
    content: { blocks: [] },
    category: 'JavaScript',
    featured: false,
    read_time: '6 min',
    status: 'published',
    author_name: 'Danny Thompson',
    created_at: new Date('2025-11-19').toISOString(),
    updated_at: new Date('2025-11-19').toISOString(),
    published_at: new Date('2025-11-19').toISOString(),
    targetPersonas: ['p1', 'p2'], // Junior Developer, Senior Engineer
    cover_image_url: '/blog-covers/bug_fix_code_snippet_1766352858325.png',
  },
];

function getRelevanceScore(post: BlogPost, personaId: string | null): number {
  if (!personaId || !post.targetPersonas) return 0;
  return post.targetPersonas.includes(personaId) ? 1 : 0;
}

function BlogContent() {
  const searchParams = useSearchParams();
  const selectedPersona = searchParams.get('persona');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(samplePosts);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>(['All', 'AI Engineering', 'Leadership', 'Career', 'React']);

  useEffect(() => {
    // fetchPosts(); // Disabled - showing sample posts only
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog/posts');
      if (res.ok) {
        const posts: BlogPost[] = await res.json();

        if (posts.length > 0) {
          setBlogPosts(posts);
          const uniqueCategories = ['All', ...Array.from(new Set(posts.map(p => p.category).filter(Boolean) as string[]))];
          setCategories(uniqueCategories);
        }
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  // Filter by category and persona
  let filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  // If persona is selected, prioritize relevant content and separate into matched and all posts
  let personaRelevantPosts: BlogPost[] = [];
  let otherPosts: BlogPost[] = [];

  if (selectedPersona) {
    personaRelevantPosts = filteredPosts.filter(post => post.targetPersonas?.includes(selectedPersona));
    otherPosts = filteredPosts.filter(post => !post.targetPersonas?.includes(selectedPersona));
  } else {
    personaRelevantPosts = filteredPosts;
  }



  if (loading) {
    return (
      <div className="min-h-screen bg-[#E2F3F2] flex items-center justify-center">
        <div className="text-[#153230] text-xl">Loading posts...</div>
      </div>
    );
  }

  return (
    <>

      <section className="relative px-4 sm:px-8 md:px-16 py-10 sm:py-16 md:py-32">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-16">
              <div className="flex flex-col items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="inline-flex items-center gap-2 sm:gap-2.5 bg-[#153230] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg">
                  <div className="relative flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse"></div>
                    <div className="absolute w-2 h-2 bg-[#4ade80] rounded-full animate-ping"></div>
                  </div>
                  <span className="text-xs sm:text-sm font-bold tracking-wide">FRESH INSIGHTS</span>
                </div>
                {selectedPersona && PERSONA_LABELS[selectedPersona] && (
                  <div className="inline-flex items-center gap-2 bg-[#4D7DA3]/20 text-[#4D7DA3] px-4 py-2 rounded-full border border-[#4D7DA3]/40">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-bold">Curated for {PERSONA_LABELS[selectedPersona]}</span>
                  </div>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#153230] leading-[1.1] tracking-tight mb-4 sm:mb-6">
                Community, Career,<br />
                <span className="text-[#4D7DA3]">& Code</span>
              </h1>

              <p className="text-base sm:text-xl text-[#153230]/70 leading-relaxed max-w-3xl mx-auto">
                {selectedPersona ? `Content tailored for ${PERSONA_LABELS[selectedPersona]}. Discover insights on building communities, advancing careers, and mastering technical leadership.` : 'Insights on building communities, advancing careers, and mastering the art of technical leadership.'}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${selectedCategory === category
                    ? 'bg-[#4D7DA3] text-white shadow-lg scale-105'
                    : 'bg-white text-[#153230] border-2 border-[#4D7DA3]/20 hover:border-[#4D7DA3] hover:scale-105'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {personaRelevantPosts
              .sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime())
              .map((post, index) => (
                <ScrollReveal key={post.id} delay={300 + index * 100}>
                  <TiltCard className="h-full">
                    <Link href={`/blog/${post.slug}`} className="block h-full">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#4D7DA3]/10 h-full">
                        <div
                          className="h-48 flex items-center justify-center relative overflow-hidden"
                          style={{
                            backgroundColor: getColorForPost(index)
                          }}
                        >
                          {post.cover_image_url ? (
                            <img
                              src={post.cover_image_url}
                              alt={post.title}
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
                            <span className="text-sm text-[#153230]/60">
                              {new Date(post.published_at || post.created_at).toLocaleDateString()}
                            </span>
                            <span className="text-sm text-[#153230]/60">• {post.read_time || '5 min'}</span>
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
                </ScrollReveal>
              ))}
          </div>

          {personaRelevantPosts.length === 0 && (
            <ScrollReveal delay={300}>
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-[#4D7DA3]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-[#4D7DA3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 515.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-[#153230] mb-3">No posts found</h3>
                <p className="text-[#153230]/70">{selectedPersona ? 'Try selecting a different category or browse all content' : 'Try selecting a different category'}</p>
              </div>
            </ScrollReveal>
          )}
          {selectedPersona && otherPosts.length > 0 && (
            <div className="mt-20 pt-16 border-t-2 border-[#4D7DA3]/20">
              <ScrollReveal>
                <h2 className="text-3xl font-black text-[#153230] mb-8">Explore More Content</h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-8">
                {otherPosts.slice(0, 3).map((post, index) => (
                  <ScrollReveal key={post.id} delay={500 + index * 100}>
                    <TiltCard className="h-full">
                      <Link href={`/blog/${post.slug}`} className="block h-full">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#4D7DA3]/10 h-full">
                          <div
                            className="h-48 opacity-60 relative overflow-hidden"
                            style={{
                              backgroundColor: getColorForPost(index)
                            }}
                          >
                            {post.cover_image_url ? (
                              <img
                                src={post.cover_image_url}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                              />
                            ) : (
                              <div className="text-white text-center p-6 bg-black/10 w-full h-full flex flex-col items-center justify-center backdrop-blur-[2px]">
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
                              <span className="text-sm text-[#153230]/60">
                                {new Date(post.published_at || post.created_at).toLocaleDateString()}
                              </span>
                              <span className="text-sm text-[#153230]/60">• {post.read_time || '5 min'}</span>
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
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="px-8 md:px-16 py-8 border-t border-[#4D7DA3]/10">
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
            <a href="#" className="text-[#153230]/60 hover:text-[#4D7DA3] text-sm font-semibold transition-colors">
              Twitter
            </a>
            <a href="#" className="text-[#153230]/60 hover:text-[#4D7DA3] text-sm font-semibold transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#E2F3F2] flex items-center justify-center">
        <div className="text-[#153230] text-xl">Loading...</div>
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
}
