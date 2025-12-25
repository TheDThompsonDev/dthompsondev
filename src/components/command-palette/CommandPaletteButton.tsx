'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommandPalette } from './CommandPaletteProvider';

const STORAGE_KEY = 'navbar-search-tooltip-shown';

export function CommandPaletteButton() {
    const { openPalette } = useCommandPalette();
    const [isMac, setIsMac] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);

        const hasSeenTooltip = localStorage.getItem(STORAGE_KEY);
        if (!hasSeenTooltip) {
            const showTimer = setTimeout(() => {
                setShowTooltip(true);
            }, 2000);

            const hideTimer = setTimeout(() => {
                setShowTooltip(false);
                localStorage.setItem(STORAGE_KEY, 'true');
            }, 10000);

            return () => {
                clearTimeout(showTimer);
                clearTimeout(hideTimer);
            };
        }
    }, []);

    const handleClick = () => {
        setShowTooltip(false);
        localStorage.setItem(STORAGE_KEY, 'true');
        openPalette();
    };

    return (
        <div className="relative">
            {/* Handwritten Tooltip */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.4 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 pointer-events-none flex flex-col items-center"
                    >
                        <svg
                            className="w-10 h-8 -mb-1 rotate-180"
                            viewBox="0 0 50 40"
                            fill="none"
                        >
                            <path
                                d="M45 2 Q 25 5, 8 32"
                                stroke="#FF3B30"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                fill="none"
                            />
                            <path
                                d="M2 25 L8 33 L15 28"
                                stroke="#FF3B30"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                            />
                        </svg>
                        <p
                            className="text-[#FF3B30] text-xl whitespace-nowrap font-bold drop-shadow-sm"
                            style={{
                                fontFamily: "var(--font-caveat), 'Segoe Script', cursive",
                                transform: 'rotate(-3deg)',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                            }}
                        >
                            Press {isMac ? '⌘' : 'Ctrl'}+ K to search!
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={handleClick}
                className="flex items-center gap-2 px-3 py-2 text-sm text-[#153230]/70 hover:text-[#153230] bg-white/50 hover:bg-white border border-[#153230]/10 rounded-lg transition-all duration-200 group"
                aria-label="Open command palette"
            >
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <span className="hidden sm:inline text-[#153230]/80">Search...</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-mono bg-[#153230]/15 border border-[#153230]/20 rounded text-[#153230]/80 group-hover:bg-[#153230]/20 transition-colors whitespace-nowrap">
                    {isMac ? '⌘' : 'Ctrl'} + K
                </kbd>
            </button>
        </div>
    );
}
