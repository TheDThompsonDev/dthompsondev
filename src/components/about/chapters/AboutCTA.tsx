'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function AboutCTA() {
    return (
        <section className="relative px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 bg-gradient-to-br from-[#153230] via-[#1E4B48] to-[#153230] text-center overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto">
                <ScrollReveal>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        I changed my story.<br />
                        <span className="text-[#4ade80]">Let's engineer yours.</span>
                    </h2>
                    <p className="text-xl text-white/80 mb-10 leading-relaxed">
                        Whether you need a Director to overhaul your architecture, or a Speaker to shift your organization's mindset from 'maintenance' to 'growth', I am ready to execute.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <a href="mailto:contact@dthompsondev.com" className="bg-white text-[#153230] px-10 py-5 rounded-full font-black text-lg hover:scale-105 hover:shadow-2xl transition-all shadow-xl">
                            Consult with Danny
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
