'use client';

import { ScrollReveal } from '@/components/ScrollReveal';

export function AboutHero() {
    return (
        <section className="relative px-4 sm:px-8 md:px-20 py-10 sm:py-16 md:py-32 overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#4D7DA3]/10 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#84803E]/10 to-transparent rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <ScrollReveal>
                    <div className="inline-block mb-4 sm:mb-8 animate-float">
                        <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white shadow-xl border border-[#4D7DA3]/20 flex items-center gap-3">
                            <span className="text-[#153230] font-bold italic text-xs sm:text-sm md:text-base">
                                "You are one decision away from a completely different life."
                            </span>
                        </div>
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-[#153230] leading-[0.9] mb-4 sm:mb-8 tracking-tight">
                        Potential is nothing<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4D7DA3] to-[#153230]">without execution.</span>
                    </h1>

                    <p className="text-base sm:text-xl md:text-2xl text-[#153230]/70 font-medium leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-12">
                        I didn't know coding was for me. I thought it was for the PhDs and the rocket scientists.
                        I didn't wait for the tech industry to invite me in. I built the door myself.
                    </p>

                    <a href="#origin" className="inline-block bg-[#153230] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg hover:bg-[#4D7DA3] transition-all transform hover:scale-105 shadow-xl">
                        See The Blueprint ↓
                    </a>
                </ScrollReveal>
            </div>
        </section>
    );
}
