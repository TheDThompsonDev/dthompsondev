'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { ContactModalButton } from './ContactModalButton';

interface MobileMenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuLinks = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Podcast', href: '/podcast' },
    { name: 'Resources', href: '/resources' },
    { name: 'Community', href: '/community' },
    { name: 'Talks', href: '/talks' },
    { name: 'About', href: '/about' },
];

const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/DThompsonDev', icon: '𝕏' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/DThompsonDev', icon: 'in' },
    { name: 'YouTube', href: 'https://youtube.com/@DThompsonDev', icon: '▶' },
];

export function MobileMenuOverlay({ isOpen, onClose }: MobileMenuOverlayProps) {
    const pathname = usePathname();
    const prevPathname = useRef(pathname);

    // Close menu on route change (but not on initial mount)
    useEffect(() => {
        if (prevPathname.current !== pathname && isOpen) {
            onClose();
        }
        prevPathname.current = pathname;
    }, [pathname, isOpen, onClose]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-[999] transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#153230]/95 backdrop-blur-xl"
                onClick={onClose}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full px-8 py-12 pb-24">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <Link href="/" onClick={onClose} className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#153230] text-xl font-bold shadow-lg">
                            DT
                        </div>
                        <span className="text-xl font-bold text-white">DTHOMPSONDEV</span>
                    </Link>

                    <button
                        onClick={onClose}
                        className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        aria-label="Close menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 flex flex-col justify-center -mt-16">
                    <ul className="space-y-2">
                        {menuLinks.map((link, index) => {
                            const isActive = pathname === link.href ||
                                (link.href !== '/' && pathname?.startsWith(link.href));

                            return (
                                <li
                                    key={link.name}
                                    className="animate-fade-in-up"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={onClose}
                                        className={`block py-3 text-3xl font-black transition-all duration-300 ${isActive
                                            ? 'text-[#4D7DA3]'
                                            : 'text-white/80 hover:text-white hover:translate-x-2'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Contact CTA */}
                <div className="mb-8">
                    <ContactModalButton
                        onClick={onClose}
                        className="block w-full bg-[#4D7DA3] text-white text-center py-4 rounded-full font-bold text-lg hover:bg-[#5a8fb8] transition-colors shadow-lg cursor-pointer"
                    >
                        Get In Touch
                    </ContactModalButton>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-6">
                    {socialLinks.map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white font-bold hover:bg-white/20 transition-colors"
                            aria-label={social.name}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
