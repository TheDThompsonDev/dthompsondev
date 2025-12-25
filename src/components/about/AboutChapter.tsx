'use client';

import { ReactNode } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';

interface AboutChapterProps {
    id?: string;
    chapterLabel: string;
    title: string;
    subtitle?: string;
    paragraphs: string[];
    highlightedQuote?: string;
    accentColor?: string;
    bgClass?: string;
    textColorClass?: string;
    children?: ReactNode;
    reversed?: boolean;
}

export function AboutChapter({
    id,
    chapterLabel,
    title,
    subtitle,
    paragraphs,
    highlightedQuote,
    accentColor = '#4D7DA3',
    bgClass = 'bg-white',
    textColorClass = 'text-[#153230]',
    children,
    reversed = false,
}: AboutChapterProps) {
    return (
        <section id={id} className={`px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 ${bgClass} relative overflow-hidden`}>
            <div className={`max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center`}>
                <ScrollReveal delay={reversed ? 200 : 0}>
                    <div className={reversed ? 'order-2 lg:order-1' : ''}>
                        {children}
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={reversed ? 0 : 200}>
                    <div className={reversed ? 'order-1 lg:order-2' : ''}>
                        <span
                            className="font-black text-sm tracking-[0.2em] uppercase mb-4 block"
                            style={{ color: accentColor }}
                        >
                            {chapterLabel}
                        </span>
                        <h2 className={`text-4xl md:text-5xl font-black mb-6 leading-tight ${textColorClass}`}>
                            {title}
                        </h2>
                        {subtitle && (
                            <h3
                                className="text-xl md:text-2xl font-bold mb-8 italic"
                                style={{ color: accentColor }}
                            >
                                {subtitle}
                            </h3>
                        )}
                        <div className={`space-y-6 text-lg leading-relaxed font-medium ${textColorClass}/80`}>
                            {paragraphs.map((paragraph, index) => (
                                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                            ))}
                            {highlightedQuote && (
                                <p
                                    className="italic pl-4"
                                    style={{ borderLeftWidth: '4px', borderLeftColor: accentColor }}
                                >
                                    {highlightedQuote}
                                </p>
                            )}
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
