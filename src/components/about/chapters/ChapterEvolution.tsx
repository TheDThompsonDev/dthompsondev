'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import Image from 'next/image';

export function ChapterEvolution() {
    return (
        <section className="px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 bg-[#0B1120] text-white relative overflow-hidden">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-cyan-500/20 rounded-[2rem] rotate-[2deg] blur-xl"></div>
                        <div className="relative aspect-square rounded-xl sm:rounded-[2rem] overflow-hidden bg-[#0F172A] border border-cyan-500/30 flex items-center justify-center shadow-2xl">
                            <Image
                                src="https://twxvicohcixbzang.public.blob.vercel-storage.com/about/speaking-at-meetup.jpg"
                                alt="Speaking at a tech meetup in Memphis"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={200}>
                    <div>
                        <span className="text-cyan-400 font-black text-sm tracking-[0.2em] uppercase mb-4 block">Chapter 6: The Evolution to Director</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                            From Syntax to Strategy
                        </h2>
                        <p className="text-xl font-bold text-cyan-200 mb-8 italic">
                            "I don't hire credentials. I hire trajectory."
                        </p>
                        <div className="space-y-6 text-lg text-cyan-50/80 leading-relaxed">
                            <p>
                                Getting the job was just the starting line. My journey wasn't linear. It was exponential.
                            </p>
                            <p>
                                I learned early on that a hard worker is the poorest person in the room. A hard worker with a plan owns the room.
                            </p>
                            <p>
                                My technical evolution mirrored the industry. I started by mastering the Enterprise Stack with Java and Angular because that built stability. But as I moved into leadership and became a Director of Technology, I realized stability isn't enough. You need velocity.
                            </p>
                            <p>
                                I led teams in migrating legacy monoliths to Microservices using <strong>Go (Golang) and React</strong>. I learned that Go offers the concurrency needed for modern speed, and React offers the scale for modern UIs.
                            </p>
                            <p>
                                Today, my role isn't just about writing code. It is about de-risking architecture. It is about aligning engineering with revenue. I leverage tools like <strong>Snowflake</strong> for data and <strong>AWS</strong> for scale. I don't sugarcoat code reviews. When you sugarcoat something, people eat it instead of looking at it. I give my teams the raw data so we can fix the problem and ship.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
