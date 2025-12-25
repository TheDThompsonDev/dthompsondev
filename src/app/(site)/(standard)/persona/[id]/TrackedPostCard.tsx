'use client';

import Link from 'next/link';
import { TiltCard } from '@/components/ui/TiltCard';
import { trackPersona } from '@/lib/analytics';
import { BlogPost } from '@/types/blog';

const colors = ['#4D7DA3', '#84803E', '#A34D7D', '#7DA34D', '#D87D4A'];

function getColorForPost(index: number): string {
    return colors[index % colors.length];
}

interface TrackedPostCardProps {
    post: BlogPost;
    index: number;
    personaId: string;
}

export function TrackedPostCard({ post, index, personaId }: TrackedPostCardProps) {
    const handlePostClick = () => {
        trackPersona(personaId, 'content_click');
    };

    return (
        <TiltCard className="h-full">
            <Link
                href={`/blog/${post.slug}`}
                className="block h-full"
                onClick={handlePostClick}
            >
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#4D7DA3]/10 h-full">
                    <div
                        className="h-48 flex items-center justify-center relative overflow-hidden"
                        style={{ backgroundColor: getColorForPost(index) }}
                    >
                        {post.coverImageUrl ? (
                            <img
                                src={post.coverImageUrl}
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
                                {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                            </span>
                            <span className="text-sm text-[#4a5757]">• {post.readTime || '5 min'}</span>
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
    );
}
