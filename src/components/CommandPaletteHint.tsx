'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommandPalette } from './CommandPaletteProvider';

const STORAGE_KEY = 'command-palette-hint-shown';

export function CommandPaletteHint() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMac, setIsMac] = useState(false);
    const { openPalette } = useCommandPalette();

    useEffect(() => {
        setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);

        const hasSeenHint = localStorage.getItem(STORAGE_KEY);
        if (!hasSeenHint) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem(STORAGE_KEY, 'true');
    };

    const handleTryIt = () => {
        handleDismiss();
        openPalette();
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-[150] max-w-sm"
                >
                    <div className="bg-[#153230] text-white rounded-2xl shadow-2xl overflow-hidden border border-white/10">
                        <div className="p-4">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-10 h-10 bg-[#4D7DA3] rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-sm mb-1">Pro Tip: Quick Navigation</h3>
                                    <p className="text-white/70 text-sm leading-relaxed">
                                        Press{' '}
                                        <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-mono bg-white/10 rounded">
                                            {isMac ? '⌘' : 'Ctrl'}+K
                                        </kbd>{' '}
                                        to open the command palette and navigate anywhere instantly.
                                    </p>
                                </div>
                                <button
                                    onClick={handleDismiss}
                                    className="flex-shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors"
                                    aria-label="Dismiss"
                                >
                                    <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="px-4 pb-4 flex gap-2">
                            <button
                                onClick={handleTryIt}
                                className="flex-1 bg-[#4D7DA3] hover:bg-[#5d8db3] text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
                            >
                                Try it now
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
