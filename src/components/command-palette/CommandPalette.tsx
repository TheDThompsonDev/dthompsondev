'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommandPalette } from './CommandPaletteProvider';
import { MatrixRain } from '@/components/home/MatrixRain';
import { useAlgoliaSearch, AlgoliaHit } from '@/hooks/useAlgoliaSearch';
import {
    HomeIcon,
    BlogIcon,
    PodcastIcon,
    ResourcesIcon,
    CommunityIcon,
    TalksIcon,
    AboutIcon,
    ContactIcon,
    MatrixIcon
} from './icons';
import { trackCommandPalette } from '@/lib/analytics';

interface Command {
    id: string;
    label: string;
    icon: React.ReactNode;
    category: 'navigation' | 'action' | 'easter-egg';
    action: () => void;
    keywords?: string[];
}

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
    const { results: algoliaResults, isLoading: isSearching, search: searchAlgolia, clearResults } = useAlgoliaSearch();

    useEffect(() => {
        setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
    }, []);

    const MAX_QUERY_LENGTH = 100;

    useEffect(() => {
        if (search.trim().length < 2) {
            clearResults();
            return;
        }
        const sanitizedQuery = search.trim().slice(0, MAX_QUERY_LENGTH);
        const timer = setTimeout(() => {
            searchAlgolia(sanitizedQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [search, searchAlgolia, clearResults]);

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
            trackCommandPalette({ action: 'open' });
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
                    trackCommandPalette({
                        action: 'navigate',
                        destination: filteredCommands[selectedIndex].id,
                        query: search || undefined
                    });
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
                                    maxLength={100}
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
                                {filteredCommands.length === 0 && algoliaResults.length === 0 && !isSearching ? (
                                    <div className="px-4 py-8 text-center text-[#153230]/50">
                                        No results found for &quot;{search}&quot;
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

                                        {search.trim().length >= 2 && (
                                            <>
                                                <div className="px-3 py-1.5 mt-2 border-t border-gray-100">
                                                    <p className="text-xs font-semibold text-[#153230]/40 uppercase tracking-wider px-2 mt-2 flex items-center gap-2">
                                                        📚 Content
                                                        {isSearching && <span className="animate-pulse">...</span>}
                                                    </p>
                                                </div>
                                                {algoliaResults.length === 0 && !isSearching && (
                                                    <div className="px-5 py-3 text-[#153230]/50 text-sm">
                                                        No content found for "{search}"
                                                    </div>
                                                )}
                                                {algoliaResults.map((hit, idx) => (
                                                    <button
                                                        key={hit.objectID}
                                                        onClick={() => {
                                                            if (hit.url.startsWith('http')) {
                                                                window.open(hit.url, '_blank');
                                                            } else {
                                                                router.push(hit.url);
                                                            }
                                                            closePalette();
                                                        }}
                                                        className="w-full flex items-center gap-3 px-5 py-3 text-left transition-colors text-[#153230]/70 hover:bg-gray-50"
                                                    >
                                                        <span className="flex-shrink-0 text-[#153230]/60">
                                                            {hit.type === 'blog' ? <BlogIcon /> : <PodcastIcon />}
                                                        </span>
                                                        <div className="flex-1 min-w-0">
                                                            <span className="font-medium block truncate">{hit.title}</span>
                                                            <span className="text-xs text-[#153230]/40 block truncate">
                                                                {hit.type === 'blog' ? 'Blog' : 'Podcast'} · {hit.category || 'Content'}
                                                            </span>
                                                        </div>
                                                    </button>
                                                ))}
                                            </>
                                        )}
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
