'use client';

import { ScrollReveal } from '@/components/ScrollReveal';

export function ChapterGrind() {
    return (
        <section className="px-4 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-24 md:py-32 bg-[#153230] text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4ade80]/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
                <ScrollReveal>
                    <div>
                        <span className="text-[#4ade80] font-black text-sm tracking-[0.2em] uppercase mb-4 block">Chapter 4: The Grind and "Popeyes"</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                            Motivation is Fleeting.<br />Drive is Reliable.
                        </h2>
                        <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                            <p>
                                I took that energy into my studies. But finding the time was brutal. I had a wife, a kid, and that one hundred hour work week. The math didn't work.
                            </p>
                            <p>
                                The only time that belonged to me was before the sun came up. My family woke up at 7:00 AM. So I started waking up at 4:00 AM every single day. I wasn't motivated. I hate mornings. But I was <strong>driven</strong>. Motivation is fleeting. Drive is doing it because you have to.
                            </p>
                            <p>
                                I built my first app. It was a terrible image filter that was Instagram's worst nightmare. But I was proud of it. I decided to go to a local meetup.
                            </p>
                            <p>
                                I walked into that first room and instantly realized I knew nothing. They were speaking a foreign language. Java. C Sharp. SQL. I felt small. I realized in that moment that I was being excluded from the conversation.
                            </p>
                            <p>
                                I vowed that night: <strong>I will never be excluded again.</strong>
                            </p>
                            <p>
                                But the reality of those meetups was harsh. My nickname became "Popeyes." I would time my shift to end at 6:30 PM so I could sprint to a 7:00 PM meetup. I didn't have time to shower. Within twenty minutes, the entire room smelled like fried chicken because of me.
                            </p>
                            <p className="bg-white/5 p-6 rounded-xl border-l-4 border-[#4ade80] italic">
                                "I sat there fighting suffocating imposter syndrome. I told myself they wanted a professional developer, not a professional chicken fryer."
                            </p>
                            <p>
                                But I kept showing up. I went to fifty four meetups in my first year. I realized that while I couldn't choose my family, I could choose my influences. I asked senior engineers to tear apart my code. I weaponized my ignorance to learn faster.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={200}>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-[#4ade80] rounded-[2rem] rotate-[3deg] opacity-20"></div>
                        <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-black/50 border border-white/10 shadow-2xl group">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/firstMeetup.png"
                                alt="My First Local Meetup"
                                className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#153230] via-transparent to-transparent opacity-80"></div>
                            <div className="absolute bottom-6 left-6">
                                <div className="text-white font-mono text-xs sm:text-sm font-bold bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border-l-4 border-[#4ade80] inline-block mb-1">
                                    07:30 PM
                                </div>
                                <p className="text-white/90 text-sm font-mono pl-1">The First Meetup that changed everything.</p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
