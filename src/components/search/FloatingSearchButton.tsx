'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommandPalette } from '@/components/command-palette/CommandPaletteProvider';

const STORAGE_KEY = 'floating-search-tooltip-shown';

export function FloatingSearchButton() {
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
        <div className="fixed bottom-24 lg:bottom-8 left-4 lg:left-8 z-[100]">
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.4 }}
                        className="absolute left-14 -top-20 pointer-events-none flex flex-col items-start"
                    >
                        <p
                            className="text-[#FF3B30] text-2xl whitespace-nowrap font-bold drop-shadow-sm"
                            style={{
                                fontFamily: "var(--font-caveat), 'Segoe Script', cursive",
                                transform: 'rotate(-5deg)',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                            }}
                        >
                            Press {isMac ? '⌘' : 'Ctrl'}+K to search!
                        </p>

                        <svg
                            className="w-12 h-10 -ml-1"
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
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={handleClick}
                className="flex items-center justify-center w-12 h-12 bg-[#153230] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
                aria-label="Open search"
            >
                <svg
                    className="w-5 h-5"
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
            </button>
        </div>
    );
}
