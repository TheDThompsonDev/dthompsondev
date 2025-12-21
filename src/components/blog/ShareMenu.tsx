'use client';

import { Copy, Twitter, Linkedin, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ShareMenuProps {
    isOpen: boolean;
    onClose: () => void;
    url?: string;
    title?: string;
    className?: string;
}

export function ShareMenu({ isOpen, onClose, url, title, className = '' }: ShareMenuProps) {
    const [copied, setCopied] = useState(false);

    const handleShare = async (platform: 'copy' | 'twitter' | 'linkedin') => {
        const shareUrl = url || window.location.href;
        const shareTitle = title || document.title;
        const text = `Check out "${shareTitle}" by @dthompsondev`;

        if (platform === 'copy') {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
                onClose();
            }, 1000);
        } else if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
            onClose();
        } else if (platform === 'linkedin') {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={`bg-white rounded-xl shadow-xl border border-[#E2F3F2] p-2 flex flex-col gap-1 min-w-[140px] overflow-hidden z-50 ${className}`}
                >
                    <button
                        onClick={() => handleShare('copy')}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-[#F8FDFF] rounded-lg text-sm font-bold text-[#153230] text-left transition-colors w-full"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                    <button
                        onClick={() => handleShare('twitter')}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-[#F8FDFF] rounded-lg text-sm font-bold text-[#153230] text-left transition-colors w-full"
                    >
                        <Twitter className="w-4 h-4 text-[#1DA1F2]" /> Twitter
                    </button>
                    <button
                        onClick={() => handleShare('linkedin')}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-[#F8FDFF] rounded-lg text-sm font-bold text-[#153230] text-left transition-colors w-full"
                    >
                        <Linkedin className="w-4 h-4 text-[#0077b5]" /> LinkedIn
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
