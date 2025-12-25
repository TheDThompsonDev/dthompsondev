'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ClosedMouthsGraphic } from '@/components/about/ClosedMouthsGraphic';

export function ChapterLesson() {
    return (
        <section className="px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 bg-[#F0FDF4] relative overflow-hidden">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
                <ScrollReveal>
                    <div className="order-2 lg:order-1 relative">
                        <div className="absolute -inset-4 bg-[#4ade80] rounded-[2rem] rotate-[-2deg] opacity-10"></div>
                        <ClosedMouthsGraphic />
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={200}>
                    <div className="order-1 lg:order-2">
                        <span className="text-[#4ade80] font-black text-sm tracking-[0.2em] uppercase mb-4 block">Chapter 3: The Lost Promotion and the Lesson</span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#153230] mb-6 leading-tight">
                            Closed Mouths Don't Get Fed
                        </h2>

                        <div className="space-y-6 text-lg text-[#153230]/80 leading-relaxed">
                            <p>
                                While I was learning, something happened at the gas station that changed my entire perspective on value.
                            </p>
                            <p>
                                I had been working there for years. I was outworking everyone. I was covering shifts. I was doing everything I thought a good employee should do. A new guy joined the team. Four or five months later, he walked into the boss's office. When he came out, he was the Store Manager.
                            </p>
                            <p>
                                I couldn't comprehend it. I had been there longer. I worked harder. I knew the job better. I asked him how he did it.
                            </p>
                            <p className="text-[#153230] font-bold text-xl italic border-l-4 border-[#4ade80] pl-4">
                                He looked at me and said, "I went in there, and I demanded it."
                            </p>
                            <p>
                                That moment changed my life. I realized I had missed out on life changing opportunities simply because I didn't raise my hand. I missed out because I didn't say, "I am interested. I think I can do that." I was waiting for someone to tap me on the shoulder and reward my hard work. I learned the hard way that closed mouths don't get fed.
                            </p>
                            <p className="font-bold text-[#4ade80]">
                                I made a vow to myself that day. I will never miss an opportunity again simply because I was too afraid to speak.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
