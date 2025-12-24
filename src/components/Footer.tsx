"use client";

import Link from "next/link";
import { useState } from "react";
import { NewsletterForm } from "./NewsletterForm";
import { Modal } from "./Modal";
import { ContactForm } from "./ContactForm";

export function Footer() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "Podcast", href: "/podcast" },
        { name: "Talks", href: "/talks" },
        { name: "About", href: "/about" },
    ];

    const socialLinks = [
        { name: "Twitter", href: "https://twitter.com/DThompsonDev", icon: "𝕏" },
        {
            name: "Bluesky",
            href: "https://bsky.app/profile/dthompsondev.bsky.social",
            icon: (
                <img
                    src="/logos/bluesky-white-icon.svg"
                    alt=""
                    aria-hidden="true"
                    className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity"
                />
            ),
        },
        {
            name: "LinkedIn",
            href: "https://linkedin.com/in/DThompsonDev",
            icon: "in",
        },
        { name: "YouTube", href: "https://youtube.com/@DThompsonDev", icon: "▶" },
        { name: "Topmate (1:1s)", href: "https://topmate.io/dthompsondev/", icon: "1:1" },
    ];

    return (
        <footer className="bg-[#153230] text-white">
            {/* Newsletter Section */}
            <NewsletterForm />

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-8 md:px-16 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 border-t border-white/10 pt-16">
                    {/* Brand & Contact Column */}
                    <div className="md:col-span-5 space-y-6">
                        <Link href="/" className="inline-block">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#153230] text-lg font-bold shadow-lg">
                                    DT
                                </div>
                                <span className="text-xl font-bold tracking-tight">
                                    DTHOMPSONDEV
                                </span>
                            </div>
                        </Link>
                        <p className="text-white/70 max-w-sm leading-relaxed">
                            Helping developers level up through mentorship, technical
                            leadership, and authentic community building.
                        </p>
                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="inline-flex items-center gap-2 bg-[#2e6089] text-white px-6 py-3 rounded-full font-bold hover:bg-[#3d7ba8] transition-colors shadow-lg group"
                        >
                            <span>Let's Work Together</span>
                            <svg
                                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Column */}
                    <div className="md:col-span-3 md:col-start-7">
                        <h3 className="font-bold text-lg mb-6 text-[#7eb9dc]">Explore</h3>
                        <ul className="space-y-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-white/70 hover:text-white transition-colors hover:translate-x-1 inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect Column */}
                    <div className="md:col-span-3">
                        <h3 className="font-bold text-lg mb-6 text-[#7eb9dc]">Connect</h3>
                        <div className="flex flex-col gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-white/70 hover:text-white group transition-colors"
                                >
                                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors" aria-hidden="true">
                                        <span className="text-sm font-bold">{social.icon}</span>
                                    </div>
                                    <span>{social.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
                    <p>
                        &copy; {new Date().getFullYear()} Danny Thompson. All rights reserved.
                    </p>
                    <p>Designed & Built with ❤️ by Danny Thompson</p>
                </div>
                <div className="mt-4 text-center">
                    <p className="inline-flex items-center gap-2 text-white/50 text-xs">
                        <span>Pro tip: Press</span>
                        <kbd className="px-1.5 py-0.5 font-mono bg-white/10 rounded">⌘ + K</kbd>
                        <span>or</span>
                        <kbd className="px-1.5 py-0.5 font-mono bg-white/10 rounded">Ctrl+K</kbd>
                        <span>to search</span>
                    </p>
                </div>
            </div>

            {/* Contact Modal */}
            <Modal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)}>
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-black text-[#153230] mb-2">
                        Let's Work Together
                    </h2>
                    <p className="text-[#153230]/70 text-sm">
                        I respond within 48 hours.
                    </p>
                </div>
                <ContactForm />
            </Modal>
        </footer>
    );
}
