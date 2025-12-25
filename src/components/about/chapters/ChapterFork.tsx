'use client';

import { ScrollReveal } from '@/components/ScrollReveal';
import { ForkInTheRoadDiagram } from '@/components/about/ForkInTheRoadDiagram';

export function ChapterFork() {
    return (
        <section className="px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 bg-white relative">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <ScrollReveal>
                    <span className="text-[#153230] font-black text-sm tracking-[0.2em] uppercase mb-4 block">Chapter 2: The Fork in the Road</span>
                    <h2 className="text-4xl md:text-5xl font-black text-[#153230] mb-8 leading-tight">
                        The Moment Everything Changed
                    </h2>
                    <div className="space-y-6 text-lg text-[#153230]/80 leading-relaxed font-medium">
                        <p>
                            I was thirty years old when I finally hit the wall. I looked at my life and had a terrifying realization. I was at a fork in the road.
                        </p>
                        <blockquote className="border-l-4 border-l-[#153230] pl-6 py-2 my-8 relative text-left mx-auto max-w-2xl bg-gray-50 p-6 rounded-r-xl">
                            <p className="text-2xl font-black text-[#153230] italic leading-tight relative z-10">
                                "If I go right, I'm going to work in this gas station until the day I die. If I go left, I had to make a change. It had to be now."
                            </p>
                        </blockquote>
                    </div>
                </ScrollReveal>
            </div>

            <ScrollReveal delay={200}>
                <div className="mb-16">
                    <ForkInTheRoadDiagram />
                </div>

                <div className="max-w-3xl mx-auto space-y-6 text-lg text-[#153230]/80 leading-relaxed font-medium text-center">
                    <p>
                        Around that time, I saw an interview on TV. A rapper had invested millions into a tech company. The interviewer asked him why. He said simply, "I am learning how to code."
                    </p>
                    <p>
                        It blew my mind. My thought process was that coding was for PhDs and rocket scientists. It wasn't for average people. It certainly wasn't for me. But his reasoning hit me hard. He asked why we wouldn't want to understand the machine we touch ninety percent of our day.
                    </p>
                    <p>
                        I realized he was right. From the RAM to the Application Layer, I was clueless about the tool I used daily.
                    </p>
                    <p className="font-bold text-[#153230] text-xl">
                        So I opened my laptop. I went to FreeCodeCamp.org. I started to learn.
                    </p>
                </div>
            </ScrollReveal>
        </section>
    );
}
