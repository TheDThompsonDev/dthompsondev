"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { motion } from "framer-motion";
import Link from "next/link";
import { TiltCard } from "@/components/ui/TiltCard";
import Image from "next/image";

const events = [
  { date: "June 4", name: "DSD Meetup (In Person)", type: "The Local Chapter" },
  { date: "June 10", name: "Discord Resume Review Night", type: "Community Event" },
  { date: "July 15", name: "CYC Early Bird Tickets End", type: "Conference" }
];

export default function CommunityPage() {
  return (
    <div className="text-[#153230] selection:bg-[#4D7DA3] selection:text-white pb-12">

      {/* 
        HERO SECTION 
        Brand Aligned: No Discord Blue. Uses Brand Green/Teal.
      */}
      <section className="relative px-4 sm:px-8 md:px-16 py-8 md:py-12 overflow-hidden">
        {/* Exact Homepage Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[700px] bg-gradient-to-br from-[#4D7DA3]/10 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[700px] bg-gradient-to-tr from-[#84803E]/8 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <ScrollReveal>
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 bg-[#153230] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg mb-6 md:mb-8 animate-float">
              <div className="relative flex items-center justify-center">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#4ade80] rounded-full animate-pulse"></div>
                <div className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-[#4ade80] rounded-full animate-ping"></div>
              </div>
              <span className="text-xs md:text-sm font-bold tracking-wide">
                JOIN 12,000+ DEVELOPERS
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#153230] leading-tight lg:leading-[1] tracking-tight mb-6 md:mb-8">
              Code is better <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4D7DA3] to-[#153230]">
                with company.
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#153230]/70 font-medium leading-relaxed max-w-2xl mx-auto mb-8 md:mb-12">
              From the heart of Dallas to a global community. <br className="hidden md:block" />
              Connect with developers who are leveling up together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
              <a
                href="https://discord.gg/pWGt6JMV9t"
                target="_blank"
                rel="noopener noreferrer"
                // UPDATED: Brand Color Button instead of Discord Blue
                className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-[#153230] hover:bg-[#1a3f3c] text-white rounded-full font-bold text-base md:text-lg transition-all transform hover:scale-105 shadow-lg shadow-[#153230]/20 flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.085 2.176 2.419 0 1.334-.966 2.419-2.176 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.085 2.176 2.419 0 1.334-.966 2.419-2.176 2.419z" />
                </svg>
                Join the Discord
              </a>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 
        BENTO GRID - Brand Aligned
        Promoting Conference & Meetups over Discord
      */}
      <section id="bento-grid" className="px-4 sm:px-8 pb-12">
        <ScrollReveal>
          <div className="grid md:grid-cols-12 gap-6 h-auto">

            {/* Card A: CONFERENCES - Takes center stage (6 cols) */}
            <div className="md:col-span-12 lg:col-span-8 h-[500px]">
              <TiltCard className="h-full">
                <div className="h-full bg-white rounded-2xl overflow-hidden relative group border border-[#E2F3F2] shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)] transition-all duration-300">
                  <div className="absolute inset-0 bg-[url('https://twxvicohcixbzang.public.blob.vercel-storage.com/about/CYC1.jpg')] opacity-[0.2] bg-cover bg-center group-hover:scale-105 transition-transform duration-700 mix-blend-multiply grayscale group-hover:grayscale-0 transition-all" />

                  <div className="relative z-10 p-6 sm:p-10 h-full flex flex-col justify-end">
                    <div className="bg-[#2e6089] w-fit px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider mb-4 text-white shadow-md">
                      Flagship Event
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black mb-3 text-[#153230]">Commit Your Code</h2>
                    <p className="text-[#153230] mb-6 max-w-lg font-bold text-lg">
                      The Anti-Conference. No sales pitches, just code. We rent out a massive venue and build stuff for 48 hours.
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="bg-[#153230] text-white px-4 py-2 rounded-full font-bold text-sm">Next: Oct 26-28</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Card B: COHORT (New) */}
            <div className="md:col-span-6 lg:col-span-4 h-[500px]">
              <TiltCard className="h-full">
                <div className="h-full bg-[#153230] rounded-2xl overflow-hidden relative group border border-[#153230] shadow-[0_20px_60px_rgba(21,50,48,0.4)] hover:shadow-[0_30px_80px_rgba(21,50,48,0.5)] transition-all duration-300">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />

                  <div className="relative z-10 p-6 sm:p-10 h-full flex flex-col justify-center text-center">
                    <div className="mx-auto w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </div>
                    <h2 className="text-3xl font-black mb-3 text-white">The Cohort</h2>
                    <p className="text-emerald-100/80 mb-6 text-sm font-medium leading-relaxed">
                      A rigorous 6-week program where we build a production-grade application from scratch.
                    </p>
                    <a
                      href="https://dallassoftwaredevelopers.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-[#153230] px-6 py-2 rounded-full font-bold text-sm w-fit mx-auto hover:bg-emerald-50 transition-colors inline-block"
                    >
                      Join Waitlist
                    </a>
                  </div>
                </div>
              </TiltCard>
            </div>


            {/* Card C: MEETUPS (Local Chapter) */}
            <div className="md:col-span-6 h-[450px]">
              <TiltCard className="h-full">
                <div className="h-full bg-white rounded-2xl overflow-hidden relative group border border-[#E2F3F2] shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)] transition-all duration-300">
                  <div className="absolute inset-0 bg-[url('https://twxvicohcixbzang.public.blob.vercel-storage.com/community/community-1.jpg')] opacity-[0.2] bg-cover bg-center group-hover:scale-105 transition-transform duration-700 mix-blend-multiply grayscale group-hover:grayscale-0 transition-all" />

                  <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-end">
                    <div className="flex items-center justify-between mb-2">
                      <div className="bg-[#5d5a2e] w-fit px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider text-white shadow-md">
                        DSD Meetups
                      </div>
                      <span className="text-[#84803E] font-bold text-xs uppercase tracking-wider">Dallas, TX</span>
                    </div>

                    <h2 className="text-3xl font-black mb-2 text-[#153230]">Dallas Software Developers Group</h2>
                    <p className="text-[#153230]/80 text-sm font-bold">
                      Monthly meetups. Free food. Zero ego. <br /> Come hang out with neighbors who code.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Card D: DISCORD (Rebranded to Community Hub) */}
            <div className="md:col-span-6 h-[450px]">
              <TiltCard className="h-full">
                {/* BRAND ALIGNED: Using Dark Teal/Blue gradient instead of Discord Blurple */}
                <div className="h-full bg-gradient-to-br from-[#1e4644] to-[#153230] rounded-2xl overflow-hidden relative group border border-[#153230] shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)] transition-all duration-300">
                  <div className="absolute inset-0 bg-[url('https://assets-global.website-files.com/6257adef93867e56f84d3101/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png')] opacity-10 bg-contain bg-right-bottom bg-no-repeat group-hover:scale-110 transition-transform duration-500 hue-rotate-180 grayscale" />

                  <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-center text-white">
                    <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
                      Global Chat
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    </h2>
                    <p className="text-white/80 mb-6 text-sm font-medium">
                      The 24/7 co-working space. Stuck on a bug? <br />
                      <span className="font-bold text-white">12,000+ devs are online.</span>
                    </p>
                    <a href="https://discord.gg/pWGt6JMV9t" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-bold text-sm w-fit hover:bg-white hover:text-[#153230] transition-all">
                      Open Discord
                    </a>
                  </div>
                </div>
              </TiltCard>
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* 
        NEW SECTION: Community Moments (Masonry Gallery)
      */}
      <section className="px-4 sm:px-8 pb-12">
        <ScrollReveal>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-black text-[#153230] mb-2">Community Moments</h2>
              <p className="text-[#153230]/60 font-medium">Pop-up coffees, late night hackathons, and everything in between.</p>
            </div>
            <button className="hidden sm:block text-sm font-bold text-[#4D7DA3] hover:text-[#153230] transition-colors">View All Photos &rarr;</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mt-8">
            {/* Top Row: 2 Wide Images */}
            <div className="md:col-span-3 relative aspect-video rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src="https://twxvicohcixbzang.public.blob.vercel-storage.com/community/community-1.jpg"
                alt="Community event group photo"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-xs font-bold uppercase tracking-wider mb-1">Meetup</p>
                <p className="text-white font-bold text-sm">Community Gathering</p>
              </div>
            </div>
            <div className="md:col-span-3 relative aspect-video rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src="https://twxvicohcixbzang.public.blob.vercel-storage.com/community/community-2.jpg"
                alt="Community workshop"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-xs font-bold uppercase tracking-wider mb-1">Workshop</p>
                <p className="text-white font-bold text-sm">Learning Together</p>
              </div>
            </div>

            {/* Bottom Row: 3 Smaller Images */}
            <div className="md:col-span-2 relative aspect-square rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src="https://twxvicohcixbzang.public.blob.vercel-storage.com/community/community-3.jpg"
                alt="Community networking"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="md:col-span-2 relative aspect-square rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src="https://twxvicohcixbzang.public.blob.vercel-storage.com/community/community-4.jpg"
                alt="Community fun"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="md:col-span-2 relative aspect-square rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src="https://twxvicohcixbzang.public.blob.vercel-storage.com/community/community-5.jpg"
                alt="Community mentorship"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 
        SOCIAL PROOF & ACTIVITY 
      */}
      <section className="px-4 sm:px-8 pb-12">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* 

            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E2F3F2] shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
              <h3 className="text-2xl font-black text-[#153230] mb-6 flex items-center gap-3">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                Community Activity
              </h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-[#E2F3F2]">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="font-mono text-green-600 text-sm font-bold">452 Members Online</span>
                  </div>
                  <span className="text-xs text-[#153230]/40 font-bold bg-[#F8FDFF] px-2 py-1 rounded border border-[#E2F3F2]">LIVE</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-4 p-4 hover:bg-[#F8FDFF] rounded-2xl transition-colors border border-transparent hover:border-[#E2F3F2]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 shrink-0 shadow-md" />
                    <div>
                      <p className="text-sm text-[#153230] font-medium leading-relaxed">
                        <span className="font-black">Sarah C.</span> just landed a job at <span className="text-[#4D7DA3] font-bold">Netflix</span>! 🎉
                      </p>
                      <p className="text-xs text-[#153230]/50 mt-1 font-bold">2m ago in #jobs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 hover:bg-[#F8FDFF] rounded-2xl transition-colors border border-transparent hover:border-[#E2F3F2]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 shrink-0 shadow-md" />
                    <div>
                      <p className="text-sm text-[#153230] font-medium leading-relaxed">
                        <span className="font-black">Marcus</span> is streaming: "React Performance Deep Dive" 📺
                      </p>
                      <p className="text-xs text-[#153230]/50 mt-1 font-bold">15m ago in #events</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 hover:bg-[#F8FDFF] rounded-2xl transition-colors border border-transparent hover:border-[#E2F3F2]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500 to-orange-500 shrink-0 shadow-md" />
                    <div>
                      <p className="text-sm text-[#153230] font-medium leading-relaxed">
                        <span className="font-black">New thread:</span> "Best resources for System Design?"
                      </p>
                      <p className="text-xs text-[#153230]/50 mt-1 font-bold">1h ago in #general</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E2F3F2] shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
              <h3 className="text-2xl font-black text-[#153230] mb-8">What's Happening This Month</h3>
              <div className="space-y-4">
                {events.map((event, i) => (
                  <div key={i} className="group bg-white hover:bg-[#F0FDF4] transition-all p-4 rounded-xl border border-[#E2F3F2] flex items-center gap-4 sm:gap-6 cursor-default shadow-sm hover:shadow-md hover:-translate-y-1 duration-300">
                    <div className="bg-[#F8FDFF] group-hover:bg-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-center min-w-[70px] sm:min-w-[80px] transition-colors border border-[#E2F3F2]">
                      <div className="text-xs text-[#153230]/50 uppercase font-black tracking-wider">{event.date.split(" ")[0]}</div>
                      <div className="text-lg sm:text-xl font-black text-[#153230]">{event.date.split(" ")[1]}</div>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#153230] text-base sm:text-lg group-hover:text-[#4D7DA3] transition-colors">{event.name}</h4>
                      <p className="text-xs sm:text-sm text-[#153230]/60 font-medium">{event.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}



          </div>
        </ScrollReveal>
      </section>

      {/* 
        LOGOS
      */}
      <section className="py-8 border-t border-[#E2F3F2] mt-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs md:text-sm text-[#153230]/70 mb-8 font-black uppercase tracking-[0.2em]">Members from companies like</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0">
            <span className="text-xl font-black text-[#153230]">GOOGLE</span>
            <span className="text-xl font-black text-[#153230]">NETFLIX</span>
            <span className="text-xl font-black text-[#153230]">MICROSOFT</span>
            <span className="text-xl font-black text-[#153230]">SPOTIFY</span>
            <span className="text-xl font-black text-[#153230]">STRIPE</span>
          </div>
        </div>
      </section>

    </div>
  );
}
