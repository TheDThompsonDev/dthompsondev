'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ThumbsUp, ThumbsDown, Share2, Check } from 'lucide-react';
import { ShareMenu } from './ShareMenu';

interface EngagementBarProps {
    slug: string;
    title: string;
}

export function EngagementBar({ slug, title }: EngagementBarProps) {
    const [stats, setStats] = useState({ views: 0, likes: 0, dislikes: 0 });
    const [hasLiked, setHasLiked] = useState(false);
    const [hasDisliked, setHasDisliked] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const shareMenuRef = useRef<HTMLDivElement>(null);
    // const [copied, setCopied] = useState(false); removed
    const copied = false; // Dummy to avoid breaking render below for now or remove Copied logic from button too?


    // Initial Fetch & View Increment
    useEffect(() => {
        // Fetch current stats
        fetch(`/api/blog/${slug}/engagement`)
            .then(res => res.json())
            .then(data => {
                if (!data.error) setStats(data);
            })
            .catch(err => console.error(err));

        // Increment view (once per session ideally, but simple for now)
        // We use a small timeout to ensure it's a "real" read
        const timer = setTimeout(() => {
            fetch(`/api/blog/${slug}/engagement`, {
                method: 'POST',
                body: JSON.stringify({ action: 'view' })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) console.error('View increment failed:', data.error);
                    else setStats(data);
                })
                .catch(err => console.error('View increment error:', err));
        }, 2000);

        return () => clearTimeout(timer);
    }, [slug]);

    // Check local storage for reactions
    useEffect(() => {
        const reaction = localStorage.getItem(`reaction-${slug}`);
        if (reaction === 'like') setHasLiked(true);
        if (reaction === 'dislike') setHasDisliked(true);
    }, [slug]);

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

    const handleReaction = async (type: 'like' | 'dislike') => {
        // Prevent multiple reactions or changing reaction (simplification: one-way or strict toggle logic)
        // For this "MVP", let's just allow one reaction per user per post.
        if (hasLiked || hasDisliked) return;

        // Optimistic Update
        setStats(prev => ({
            ...prev,
            [type + 's']: prev[type + 's' as keyof typeof prev] + 1
        }));

        if (type === 'like') setHasLiked(true);
        if (type === 'dislike') setHasDisliked(true);

        localStorage.setItem(`reaction-${slug}`, type);

        try {
            await fetch(`/api/blog/${slug}/engagement`, {
                method: 'POST',
                body: JSON.stringify({ action: type })
            });
        } catch (error) {
            console.error('Failed to react');
            // Revert on error? Skipping for now.
        }
    };

    // handleShare moved to ShareMenu component

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 print:hidden">
            <div className="bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#E2F3F2] rounded-full px-2 py-2 flex items-center gap-1 sm:gap-2">

                {/* View Counter */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 text-[#153230]/60 border-r border-[#153230]/10 mr-1">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-bold tabular-nums">{stats.views.toLocaleString()}</span>
                </div>

                {/* Like Button */}
                <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => handleReaction('like')}
                    disabled={hasLiked || hasDisliked}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${hasLiked
                        ? 'bg-green-100 text-green-700'
                        : 'hover:bg-[#E2F3F2] text-[#153230]/70'
                        } ${hasDisliked ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-bold tabular-nums">{stats.likes > 0 ? stats.likes : ''}</span>
                </motion.button>

                {/* Dislike Button */}
                <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => handleReaction('dislike')}
                    disabled={hasLiked || hasDisliked}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${hasDisliked
                        ? 'bg-red-100 text-red-700'
                        : 'hover:bg-[#E2F3F2] text-[#153230]/70'
                        } ${hasLiked ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <ThumbsDown className={`w-4 h-4 ${hasDisliked ? 'fill-current' : ''}`} />
                </motion.button>

                <div className="w-px h-4 bg-[#153230]/10 mx-1"></div>

                {/* Share Menu */}
                <div className="relative" ref={shareMenuRef}>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-[#E2F3F2] text-[#153230] transition-colors"
                    >
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm font-bold hidden sm:inline">Share</span>
                    </motion.button>

                    <ShareMenu
                        isOpen={showShareMenu}
                        onClose={() => setShowShareMenu(false)}
                        url={typeof window !== 'undefined' ? window.location.href : undefined}
                        title={title}
                        className="absolute bottom-full right-0 mb-3"
                    />
                </div>

            </div>
        </div>
    );
}
