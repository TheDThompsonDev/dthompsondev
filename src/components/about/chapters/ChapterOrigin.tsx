'use client';

import { ScrollReveal } from '@/components/ScrollReveal';
import { JourneySlider } from '@/components/about/JourneySlider';

export function ChapterOrigin() {
    return (
        <section id="origin" className="px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 relative bg-[#F8FAFC] overflow-hidden">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[45%_55%] gap-8 lg:gap-12 items-center">
                <ScrollReveal>
                    <div className="order-2 lg:order-1">
                        <span className="text-[#84803E] font-black text-sm tracking-[0.2em] uppercase mb-4 block">Chapter 1: The Ceiling and the Fear</span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#153230] mb-8 leading-tight">
                            The Full Story: From the Fryer to the Future
                        </h2>
                        <div className="space-y-6 text-lg text-[#153230]/80 leading-relaxed font-medium">
                            <p>
                                For over ten years, my life was defined by the smell of old grease. It is a distinct scent. It clings to your clothes. It seeps into your pores. Eventually, it tries to settle into your soul.
                            </p>
                            <p>
                                I was working at a gas station frying chicken. I was working eighty hours a week. Sometimes one hundred hours a week. When my son was born, I worked one hundred and two hours in a single week. I was killing myself with effort, but I was standing still.
                            </p>
                            <p>
                                To be honest, for a long time I thought I was doing great. I grew up in the hood in Brooklyn. I wasn't in jail. I wasn't dead. I had a job. The bills were kind of paid. But there was a looming fear that lived in the back of my mind every single day. I knew that if I took even one week off work, the lights would go out. I couldn't afford to be sick. I couldn't afford to rest. I was working hard enough to survive, but I was working hard enough to still be broke.
                            </p>
                            <p>
                                That gas station was my ceiling. I thought a guy like me wasn't allowed to do anything else.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={200}>
                    <div className="relative order-1 lg:order-2">
                        <div className="absolute -inset-4 bg-[#84803E] rounded-[2rem] rotate-[3deg] opacity-20"></div>
                        <JourneySlider />
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
