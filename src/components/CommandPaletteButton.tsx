'use client';

import { useState, useEffect } from 'react';
import { useCommandPalette } from './CommandPaletteProvider';

export function CommandPaletteButton() {
    const { openPalette } = useCommandPalette();
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
    }, []);

    return (
        <button
            onClick={openPalette}
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
            <span className="hidden sm:inline text-[#153230]/50">Search...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-mono bg-[#153230]/5 border border-[#153230]/10 rounded text-[#153230]/50 group-hover:bg-[#153230]/10 transition-colors">
                {isMac ? '⌘' : 'Ctrl'}K
            </kbd>
        </button>
    );
}
