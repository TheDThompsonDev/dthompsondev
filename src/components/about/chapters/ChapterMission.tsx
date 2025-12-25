'use client';

import { ScrollReveal } from '@/components/ScrollReveal';
import Image from 'next/image';

export function ChapterMission() {
    return (
        <section className="px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 bg-[#E2F3F2]">
            <div className="max-w-5xl mx-auto text-center">
                <ScrollReveal>
                    <span className="text-[#153230] font-black text-sm tracking-[0.2em] uppercase mb-4 block">Chapter 7: The Mission</span>
                    <h2 className="text-4xl md:text-5xl font-black text-[#153230] mb-8 leading-tight">
                        The Measure of Success
                    </h2>

                    <div className="space-y-6 text-lg text-[#153230]/80 leading-relaxed max-w-3xl mx-auto text-center">
                        <p>
                            I achieved the goal. I climbed the ladder. But I realized that success that isn't shared is failure. I am no longer obsessed with making the most money. I am obsessed with leaving the world better than I found it.
                        </p>
                        <p>
                            That is why I founded the <strong>Commit Your Code</strong> conference. That is why I have spoken in prisons. When you teach a prisoner to code, you aren't just teaching them a skill. You are dropping their recidivism rate to near zero. You are handing them a tool to rewrite their future.
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={200}>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4 mt-6 sm:mt-8">
                        <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group">
                            <Image
                                src="https://twxvicohcixbzang.public.blob.vercel-storage.com/about/CYC1.jpg"
                                alt="Commit Your Code Conference"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group">
                            <Image
                                src="https://twxvicohcixbzang.public.blob.vercel-storage.com/about/impact-community-1.jpg"
                                alt="Community Selfie"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group">
                            <Image
                                src="https://twxvicohcixbzang.public.blob.vercel-storage.com/about/impact-community-2.jpg"
                                alt="Community Group Shot"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                            <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group">
                                <Image
                                    src="https://twxvicohcixbzang.public.blob.vercel-storage.com/about/impact-community-3.jpg"
                                    alt="Community Connection"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group">
                                <Image
                                    src="https://twxvicohcixbzang.public.blob.vercel-storage.com/about/impact-community-4.jpg"
                                    alt="Networking"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group">
                                <Image
                                    src="https://twxvicohcixbzang.public.blob.vercel-storage.com/about/impact-community-5.jpg"
                                    alt="Mentorship"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={400}>
                    <div className="space-y-6 text-lg text-[#153230]/80 leading-relaxed max-w-4xl mx-auto text-center mt-12">
                        <p className="text-xl font-bold text-[#153230] italic">
                            "I stand here today not just as a Director of Technology, but as proof of a simple truth: Potential is nothing without execution."
                        </p>
                        <p>
                            You can be Popeyes today, and you can be a leader tomorrow. The smell of grease was temporary. The skills I built were permanent.
                        </p>
                        <h3 className="text-3xl font-black text-[#153230] mt-8">
                            I changed my story. Now, I help others engineer theirs.
                        </h3>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
