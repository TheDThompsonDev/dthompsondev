'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommandPalette } from './CommandPaletteProvider';
import { MatrixRain } from './MatrixRain';

interface Command {
    id: string;
    label: string;
    icon: React.ReactNode;
    category: 'navigation' | 'action' | 'easter-egg';
    action: () => void;
    keywords?: string[];
}

const HomeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const BlogIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
);

const PodcastIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
);

const ResourcesIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const CommunityIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const TalksIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const AboutIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const ContactIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const MatrixIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

export function CommandPalette() {
    const { isOpen, closePalette } = useCommandPalette();
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isMac, setIsMac] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);
    const router = useRouter();
    const [matrixActive, setMatrixActive] = useState(false);

    useEffect(() => {
        setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
    }, []);

    const commands: Command[] = useMemo(() => [
        {
            id: 'home',
            label: 'Home',
            icon: <HomeIcon />,
            category: 'navigation',
            action: () => router.push('/'),
            keywords: ['main', 'landing', 'start'],
        },
        {
            id: 'blog',
            label: 'Blog',
            icon: <BlogIcon />,
            category: 'navigation',
            action: () => router.push('/blog'),
            keywords: ['posts', 'articles', 'writing'],
        },
        {
            id: 'podcast',
            label: 'Podcast',
            icon: <PodcastIcon />,
            category: 'navigation',
            action: () => router.push('/podcast'),
            keywords: ['episodes', 'audio', 'listen'],
        },
        {
            id: 'resources',
            label: 'Resources',
            icon: <ResourcesIcon />,
            category: 'navigation',
            action: () => router.push('/resources'),
            keywords: ['tools', 'links', 'helpful'],
        },
        {
            id: 'community',
            label: 'Community',
            icon: <CommunityIcon />,
            category: 'navigation',
            action: () => router.push('/community'),
            keywords: ['discord', 'members', 'join'],
        },
        {
            id: 'talks',
            label: 'Talks',
            icon: <TalksIcon />,
            category: 'navigation',
            action: () => router.push('/talks'),
            keywords: ['speaking', 'presentations', 'videos', 'conferences'],
        },
        {
            id: 'about',
            label: 'About',
            icon: <AboutIcon />,
            category: 'navigation',
            action: () => router.push('/about'),
            keywords: ['bio', 'danny', 'thompson', 'story'],
        },
        {
            id: 'contact',
            label: 'Contact Me',
            icon: <ContactIcon />,
            category: 'action',
            action: () => {
                window.dispatchEvent(new CustomEvent('openContactModal'));
            },
            keywords: ['email', 'message', 'reach', 'hire', 'book'],
        },
        {
            id: 'matrix',
            label: 'Enter the Matrix',
            icon: <MatrixIcon />,
            category: 'easter-egg',
            action: () => setMatrixActive(true),
            keywords: ['neo', 'red pill', 'blue pill', 'morpheus', 'code', 'rain', 'hack', 'easter egg'],
        },
    ], [router]);

    const filteredCommands = useMemo(() => {
        if (!search.trim()) return commands;
        const searchLower = search.toLowerCase();
        return commands.filter(cmd =>
            cmd.label.toLowerCase().includes(searchLower) ||
            cmd.keywords?.some(kw => kw.toLowerCase().includes(searchLower))
        );
    }, [commands, search]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);
    useEffect(() => {
        if (isOpen) {
            previousActiveElement.current = document.activeElement as HTMLElement;
            document.body.style.overflow = 'hidden';
            // Focus input after animation
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            document.body.style.overflow = 'unset';
            setSearch('');
            setSelectedIndex(0);
            previousActiveElement.current?.focus();
        }
    }, [isOpen]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        e.stopPropagation();

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < filteredCommands.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev > 0 ? prev - 1 : filteredCommands.length - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredCommands[selectedIndex]) {
                    filteredCommands[selectedIndex].action();
                    closePalette();
                }
                break;
            case 'Escape':
                e.preventDefault();
                closePalette();
                break;
        }
    }, [filteredCommands, selectedIndex, closePalette]);

    useEffect(() => {
        if (listRef.current) {
            const selectedEl = listRef.current.children[selectedIndex] as HTMLElement;
            selectedEl?.scrollIntoView({ block: 'nearest' });
        }
    }, [selectedIndex]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) {
            closePalette();
        }
    };

    const executeCommand = (command: Command) => {
        command.action();
        closePalette();
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <div
                        className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Command palette"
                    >
                        <motion.div
                            ref={overlayRef}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            onClick={handleOverlayClick}
                            className="absolute inset-0 bg-[#153230]/60 backdrop-blur-sm cursor-pointer"
                            aria-hidden="true"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ type: "spring", duration: 0.3, bounce: 0.1 }}
                            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                            onKeyDown={handleKeyDown}
                        >
                            <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
                                <svg
                                    className="w-5 h-5 text-[#153230]/40 flex-shrink-0"
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
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Type a command or search..."
                                    className="flex-1 text-[#153230] placeholder:text-[#153230]/40 outline-none text-base bg-transparent"
                                    aria-label="Search commands"
                                />
                                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-[#153230]/50 bg-gray-100 rounded font-mono">
                                    {isMac ? '⌘' : 'Ctrl'} + K
                                </kbd>
                            </div>

                            <div
                                ref={listRef}
                                className="max-h-[50vh] overflow-y-auto py-2"
                                role="listbox"
                                aria-label="Available commands"
                            >
                                {filteredCommands.length === 0 ? (
                                    <div className="px-4 py-8 text-center text-[#153230]/50">
                                        No commands found for &quot;{search}&quot;
                                    </div>
                                ) : (
                                    <>
                                        {filteredCommands.some(c => c.category === 'navigation') && (
                                            <div className="px-3 py-1.5">
                                                <p className="text-xs font-semibold text-[#153230]/40 uppercase tracking-wider px-2">
                                                    Navigation
                                                </p>
                                            </div>
                                        )}
                                        {filteredCommands
                                            .filter(c => c.category === 'navigation')
                                            .map((command, idx) => {
                                                const globalIdx = filteredCommands.findIndex(c => c.id === command.id);
                                                return (
                                                    <button
                                                        key={command.id}
                                                        onClick={() => executeCommand(command)}
                                                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                                                        className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${selectedIndex === globalIdx
                                                            ? 'bg-[#E2F3F2] text-[#153230]'
                                                            : 'text-[#153230]/70 hover:bg-gray-50'
                                                            }`}
                                                        role="option"
                                                        aria-selected={selectedIndex === globalIdx}
                                                    >
                                                        <span className="flex-shrink-0 text-[#153230]/60">{command.icon}</span>
                                                        <span className="font-medium">{command.label}</span>
                                                        {selectedIndex === globalIdx && (
                                                            <span className="ml-auto text-xs text-[#153230]/40">
                                                                Press Enter ↵
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })}

                                        {filteredCommands.some(c => c.category === 'action') && (
                                            <div className="px-3 py-1.5 mt-2 border-t border-gray-100">
                                                <p className="text-xs font-semibold text-[#153230]/40 uppercase tracking-wider px-2 mt-2">
                                                    Actions
                                                </p>
                                            </div>
                                        )}
                                        {filteredCommands
                                            .filter(c => c.category === 'action')
                                            .map((command) => {
                                                const globalIdx = filteredCommands.findIndex(c => c.id === command.id);
                                                return (
                                                    <button
                                                        key={command.id}
                                                        onClick={() => executeCommand(command)}
                                                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                                                        className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${selectedIndex === globalIdx
                                                            ? 'bg-[#E2F3F2] text-[#153230]'
                                                            : 'text-[#153230]/70 hover:bg-gray-50'
                                                            }`}
                                                        role="option"
                                                        aria-selected={selectedIndex === globalIdx}
                                                    >
                                                        <span className="flex-shrink-0 text-[#153230]/60">{command.icon}</span>
                                                        <span className="font-medium">{command.label}</span>
                                                        {selectedIndex === globalIdx && (
                                                            <span className="ml-auto text-xs text-[#153230]/40">
                                                                Press Enter ↵
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })}

                                        {filteredCommands.some(c => c.category === 'easter-egg') && (
                                            <div className="px-3 py-1.5 mt-2 border-t border-gray-100">
                                                <p className="text-xs font-semibold text-[#153230]/40 uppercase tracking-wider px-2 mt-2">
                                                    ✨ Easter Eggs
                                                </p>
                                            </div>
                                        )}
                                        {filteredCommands
                                            .filter(c => c.category === 'easter-egg')
                                            .map((command) => {
                                                const globalIdx = filteredCommands.findIndex(c => c.id === command.id);
                                                return (
                                                    <button
                                                        key={command.id}
                                                        onClick={() => executeCommand(command)}
                                                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                                                        className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${selectedIndex === globalIdx
                                                            ? 'bg-[#E2F3F2] text-[#153230]'
                                                            : 'text-[#153230]/70 hover:bg-gray-50'
                                                            }`}
                                                        role="option"
                                                        aria-selected={selectedIndex === globalIdx}
                                                    >
                                                        <span className="flex-shrink-0 text-[#153230]/60">{command.icon}</span>
                                                        <span className="font-medium">{command.label}</span>
                                                        {selectedIndex === globalIdx && (
                                                            <span className="ml-auto text-xs text-[#153230]/40">
                                                                Press Enter ↵
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                    </>
                                )}
                            </div>

                            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                                <div className="flex items-center justify-between text-xs text-[#153230]/40">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1">
                                            <kbd className="px-1.5 py-0.5 bg-white rounded shadow-sm font-mono">↑</kbd>
                                            <kbd className="px-1.5 py-0.5 bg-white rounded shadow-sm font-mono">↓</kbd>
                                            <span className="ml-1">Navigate</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <kbd className="px-1.5 py-0.5 bg-white rounded shadow-sm font-mono">↵</kbd>
                                            <span className="ml-1">Select</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <kbd className="px-1.5 py-0.5 bg-white rounded shadow-sm font-mono">Esc</kbd>
                                            <span className="ml-1">Close</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <MatrixRain isActive={matrixActive} onClose={() => setMatrixActive(false)} />
        </>
    );
}
