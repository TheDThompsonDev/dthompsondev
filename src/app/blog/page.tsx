'use client';

import { ScrollReveal } from '@/components/ScrollReveal';
import { TiltCard } from '@/components/TiltCard';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BlogPost } from '@/types/blog';

const colors = ['#4D7DA3', '#84803E', '#A34D7D', '#7DA34D', '#D87D4A'];

function getColorForPost(index: number): string {
  return colors[index % colors.length];
}

const samplePosts: BlogPost[] = [
  {
    id: 1,
    title: 'Closures Visualized: Understanding JavaScript\'s Secret Weapon',
    slug: 'closures-visualized',
    excerpt: 'Master one of JavaScript\'s most powerful features through interactive visualizations and real-world examples.',
    content: { blocks: [] },
    category: 'JavaScript',
    featured: true,
    read_time: '8 min',
    status: 'published',
    author_name: 'DTHOMPSONDEV',
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date('2024-01-15').toISOString(),
    published_at: new Date('2024-01-15').toISOString(),
  },
  {
    id: 2,
    title: 'React Hooks Visualized: A Complete Guide',
    slug: 'react-hooks-visualized',
    excerpt: 'Learn how React Hooks work under the hood with interactive examples and visual diagrams.',
    content: { blocks: [] },
    category: 'React',
    featured: false,
    read_time: '10 min',
    status: 'published',
    author_name: 'DTHOMPSONDEV',
    created_at: new Date('2024-01-20').toISOString(),
    updated_at: new Date('2024-01-20').toISOString(),
    published_at: new Date('2024-01-20').toISOString(),
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(samplePosts);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>(['All', 'JavaScript', 'React']);

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

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E2F3F2] flex items-center justify-center">
        <div className="text-[#153230] text-xl">Loading posts...</div>
      </div>
    );
  }

  return (
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
              href="/"
              className="bg-[#153230] text-white px-8 py-4 rounded-full hover:bg-[#4D7DA3] hover:scale-105 transition-all duration-300 font-semibold"
            >
              Back to Home
            </Link>
          </header>

          <section className="relative px-8 md:px-16 py-20 md:py-32">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2.5 bg-[#153230] text-white px-4 py-2 rounded-full shadow-lg mb-6">
                    <div className="relative flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse"></div>
                      <div className="absolute w-2 h-2 bg-[#4ade80] rounded-full animate-ping"></div>
                    </div>
                    <span className="text-sm font-bold tracking-wide">FRESH INSIGHTS</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#153230] leading-[1.1] tracking-tight mb-6">
                    Community, Career,<br />
                    <span className="text-[#4D7DA3]">& Code</span>
                  </h1>
                  
                  <p className="text-xl text-[#153230]/70 leading-relaxed max-w-3xl mx-auto">
                    Insights on building communities, advancing careers, and mastering the art of technical leadership.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-[#4D7DA3] text-white shadow-lg scale-105'
                          : 'bg-white text-[#153230] border-2 border-[#4D7DA3]/20 hover:border-[#4D7DA3] hover:scale-105'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </ScrollReveal>

              {selectedCategory === 'All' && featuredPosts.length > 0 && (
                <div className="mb-16">
                  <ScrollReveal delay={200}>
                    <h2 className="text-3xl font-black text-[#153230] mb-8">Featured Posts</h2>
                  </ScrollReveal>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {featuredPosts.map((post, index) => (
                      <ScrollReveal key={post.id} delay={300 + index * 100}>
                        <TiltCard className="h-full">
                          <Link href={`/blog/${post.slug}`} className="block h-full">
                            <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#4D7DA3]/10 h-full">
                              <div
                                className="h-48 flex items-center justify-center"
                                style={{
                                  backgroundColor: getColorForPost(index)
                                }}
                              >
                                <div className="text-white text-center p-6">
                                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                  </div>
                                  <span className="text-xs font-bold tracking-wider uppercase">Featured</span>
                                </div>
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

              <div>
                {(selectedCategory === 'All' && regularPosts.length > 0) && (
                  <ScrollReveal delay={400}>
                    <h2 className="text-3xl font-black text-[#153230] mb-8">Recent Posts</h2>
                  </ScrollReveal>
                )}
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(selectedCategory === 'All' ? regularPosts : filteredPosts).map((post, index) => (
                    <ScrollReveal key={post.id} delay={500 + index * 100}>
                      <TiltCard className="h-full">
                        <Link href={`/blog/${post.slug}`} className="block h-full">
                          <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-[#4D7DA3]/10 h-full">
                            <div
                              className="h-32"
                              style={{
                                backgroundColor: getColorForPost(index)
                              }}
                            ></div>
                            <div className="p-5">
                              <div className="flex items-center gap-2 mb-3">
                                <span 
                                  className="px-2.5 py-1 rounded-full text-xs font-black text-white"
                                  style={{ backgroundColor: getColorForPost(index) }}
                                >
                                  {post.category}
                                </span>
                                <span className="text-xs text-[#153230]/60">{post.read_time || '5 min'}</span>
                              </div>
                              <h3 className="text-xl font-black text-[#153230] mb-2 leading-tight">
                                {post.title}
                              </h3>
                              <p className="text-sm text-[#153230]/70 leading-relaxed mb-3">
                                {post.excerpt}
                              </p>
                              <div className="text-xs text-[#153230]/60 font-medium">
                                {new Date(post.published_at || post.created_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </TiltCard>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              {filteredPosts.length === 0 && (
                <ScrollReveal delay={300}>
                  <div className="text-center py-20">
                    <div className="w-24 h-24 bg-[#4D7DA3]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-[#4D7DA3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-black text-[#153230] mb-3">No posts found</h3>
                    <p className="text-[#153230]/70">Try selecting a different category</p>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </section>

          <section className="bg-[#153230] text-white px-8 md:px-16 py-16 md:py-20">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-black mb-6">Stay Updated</h2>
                <p className="text-lg mb-8 opacity-90">
                  Get the latest insights on community building, career development, and technical leadership delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 rounded-full text-[#153230] font-semibold focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
                  />
                  <button className="bg-white text-[#4D7DA3] px-8 py-4 rounded-full font-bold hover:scale-105 hover:shadow-2xl transition-all duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </ScrollReveal>
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
        </div>
      </div>
    </div>
  );
}
