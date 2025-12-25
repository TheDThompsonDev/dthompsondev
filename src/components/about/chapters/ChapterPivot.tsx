'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import Image from 'next/image';

export function ChapterPivot() {
    return (
        <section className="px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 relative bg-white">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <ScrollReveal>
                    <div className="relative aspect-[4/5] sm:aspect-square md:aspect-auto md:h-[400px] lg:h-[500px] w-full max-w-full rounded-xl sm:rounded-[2rem] overflow-hidden shadow-2xl group">
                        <Image
                            src="https://twxvicohcixbzang.public.blob.vercel-storage.com/about/Day1.jpg"
                            alt="My first day at my first tech job"
                            fill
                            className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#153230] via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                            <p className="text-white/90 text-xs sm:text-sm font-mono pl-1 backdrop-blur-md bg-black/40 px-2 sm:px-3 py-1 rounded-lg inline-block border-l-2 sm:border-l-4 border-[#4D7DA3]">Day 1: The Pivot Realized</p>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={200}>
                    <div>
                        <span className="text-[#4D7DA3] font-black text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-3 sm:mb-4 block">Chapter 5: The Strategic Pivot</span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#153230] mb-4 sm:mb-6 leading-tight">
                            Strategy Over Spray and Pray
                        </h2>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#4D7DA3] mb-6 sm:mb-8 italic">
                            "Stop negotiating with your potential."
                        </h3>
                        <div className="space-y-6 text-lg text-[#153230]/80 leading-relaxed font-medium">
                            <p>
                                When I was ready to apply for jobs, I didn't just spray and pray. I used strategy.
                            </p>
                            <p>
                                I analyzed the market in Memphis. I saw that the top ten companies I wanted to work for weren't using the trendy new frameworks. They were using <strong>Java and Angular</strong>. So I didn't waste time on what was cool on Twitter. I learned exactly what my target market was buying.
                            </p>
                            <p>
                                I started cold messaging hiring managers on LinkedIn. I was terrified. But I did the risk analysis. If I send a message and they say no, I have lost nothing. They aren't coming to my gas station. I will never see them again. But if one person says yes, my entire family tree changes.
                            </p>
                            <p>
                                The strategy worked. But I didn't jump at the first offer. <strong>I turned down six job offers before accepting my first role.</strong>
                            </p>
                            <p>
                                People thought I was crazy. I was broke. But I wasn't desperate. I knew that if I took the wrong job, I would just be trading one depression for another. I wasn't looking for a paycheck. I was looking for a trajectory.
                            </p>
                            <p className="border-l-4 border-[#4D7DA3] pl-4">
                                I walked into interviews with a Value Mindset. I didn't beg for a chance. I said, "I am valuable. I will bring value to this team. If you give me the opportunity, I will bring so much value you won't be able to afford to lose me."
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
