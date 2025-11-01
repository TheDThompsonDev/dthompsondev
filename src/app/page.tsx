import { ScrollReveal } from "@/components/ScrollReveal";
import { TiltCard } from "@/components/TiltCard";
import { OrbitSwitcher } from "@/components/OrbitSwitcher";
import { BentoGrid } from "@/components/BentoGrid";
import RotarySelector from "@/components/RotarySelector";
import { PodcastRadioTuner } from "@/components/PodcastRadioTuner";
import { PodcastRadioSkeleton } from "@/components/PodcastSkeleton";
import { PodcastErrorBoundary } from "@/components/PodcastErrorBoundary";
import BottomNav from "@/components/BottomNav";
import { ContactForm } from "@/components/ContactForm";
import Link from "next/link";
import { headers } from "next/headers";
import { Suspense } from "react";

type Episode = {
  id: string;
  guid: string;
  title: string;
  link: string;
  pubDate: string;
  publishDate: string;
  description: string;
  audioUrl: string;
  videoUrl?: string;
  thumbnail: string;
  duration: string;
  platform: "spotify" | "youtube";
  externalUrl: string;
};

export default async function Home() {
  // Fetch podcast episodes
  let episodes: Episode[] = [];

  try {
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/podcast.json`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (res.ok) {
      const data = await res.json();
      episodes = data.episodes || [];
    }
  } catch (err) {
    // Failed to fetch episodes
  }
  return (
    <>
      <div className="min-h-screen bg-[#E2F3F2] pb-20 lg:pb-0">
        <div className="max-w-[1400px] mx-auto">
        <div className="bg-white rounded-[32px] shadow-xl m-4 overflow-hidden border border-[#4D7DA3]/10">
          <header className="px-6 md:px-16 py-6 md:py-8">
            <div className="flex items-center justify-between gap-4 md:gap-8">
              <Link
                href="/"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#153230] rounded-2xl flex items-center justify-center text-white text-xl md:text-2xl font-bold">
                  DT
                </div>
                <span className="text-lg md:text-xl font-bold tracking-tight text-[#153230] hidden sm:block">
                  DTHOMPSONDEV
                </span>
              </Link>

              <nav className="hidden lg:flex items-center gap-8">
                <Link
                  href="/blog"
                  className="text-[#153230]/70 hover:text-[#153230] font-semibold transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/podcast"
                  className="text-[#153230]/70 hover:text-[#153230] font-semibold transition-colors"
                >
                  Podcast
                </Link>
                <Link
                  href="/resources"
                  className="text-[#153230]/70 hover:text-[#153230] font-semibold transition-colors"
                >
                  Resources
                </Link>
                <Link
                  href="/community"
                  className="text-[#153230]/70 hover:text-[#153230] font-semibold transition-colors"
                >
                  Community
                </Link>
                <Link
                  href="/talks"
                  className="text-[#153230]/70 hover:text-[#153230] font-semibold transition-colors"
                >
                  Talks
                </Link>
              </nav>

              <Link href="#contact" className="hidden lg:flex bg-[#153230] text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-[#4D7DA3] hover:scale-105 transition-all duration-300 font-semibold text-sm md:text-base whitespace-nowrap">
                Contact Me
              </Link>
            </div>
          </header>

          <section className="relative px-4 sm:px-8 md:px-16 py-8 md:py-12">
            <div className="absolute top-0 right-0 w-[600px] h-[700px] bg-gradient-to-br from-[#4D7DA3]/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[700px] bg-gradient-to-tr from-[#84803E]/8 to-transparent rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="space-y-6 lg:space-y-8">
                  <div className="inline-flex items-center gap-2.5 bg-[#153230] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg">
                    <div className="relative flex items-center justify-center">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#4ade80] rounded-full animate-pulse"></div>
                      <div className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-[#4ade80] rounded-full animate-ping"></div>
                    </div>
                    <span className="text-xs md:text-sm font-bold tracking-wide">
                      ACCEPTING COMPANY CALLS
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#153230] leading-tight lg:leading-[1] tracking-tight">
                    Director of Tech,{" "}
                    <span className="text-[#4D7DA3]">
                      Executive Advisor,
                      <br />
                    </span>{" "}
                    & Community Leader.
                  </h1>

                  <p className="text-base sm:text-lg lg:text-xl text-[#153230]/70 leading-relaxed max-w-xl">
                    When organizations have engineering teams that have too many
                    priorities, too much complexity, and not enough clarity.
                    <span className="text-[#4D7DA3] font-bold">
                      {" "}
                      They call me.{" "}
                    </span>{" "}
                    I fix team alignment, simplify their systems, and deliver
                    results they're proud of.
                  </p>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4 pt-2 lg:pt-4">
                    <p className="text-xl sm:text-2xl text-[#4D7DA3] font-bold leading-relaxed">
                      Clarity. Confidence. Code.
                    </p>
                    <button className="group relative bg-[#4D7DA3] text-white px-8 py-4 lg:px-10 lg:py-5 rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-sm lg:text-md overflow-hidden w-full sm:w-auto">
                      <span className="relative z-10">
                        Let's work together!
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    </button>
                  </div>

                  <section aria-label="Impact and Reach" className="mt-6 lg:mt-10">
                    <div className="-mt-4 lg:-mt-6 grid gap-4 lg:gap-6">
                      <div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="rounded-xl lg:rounded-2xl border border-slate-200 p-2 lg:p-3 bg-white/60">
                            <div className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#4D7DA3]">
                              450K
                            </div>
                            <div className="text-xs lg:text-sm text-slate-600">
                              Dev reach
                            </div>
                          </div>
                          <div className="rounded-xl lg:rounded-2xl border border-slate-200 p-2 lg:p-3 bg-white/60">
                            <div className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#4D7DA3]">
                              200
                            </div>
                            <div className="text-xs lg:text-sm text-slate-600">
                              Talks
                            </div>
                          </div>
                          <div className="rounded-xl lg:rounded-2xl border border-slate-200 p-2 lg:p-3 bg-white/60">
                            <div className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#4D7DA3]">
                              22
                            </div>
                            <div className="text-xs lg:text-sm text-slate-600">
                              Brands
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <BentoGrid
                  images={[
                    {
                      src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/1.jpg",
                      alt: "Community moment 1",
                    },
                    {
                      src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/2.jpg",
                      alt: "Community moment 2",
                    },
                    {
                      src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/3.jpg",
                      alt: "Community moment 3",
                    },
                    {
                      src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/4.jpg",
                      alt: "Community moment 4",
                    },
                    {
                      src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/5.jpg",
                      alt: "Community moment 5",
                    },
                    {
                      src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/6.jpg",
                      alt: "Community moment 6",
                    },
                    {
                      src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/7.jpg",
                      alt: "Community moment 7",
                    },
                    {
                      src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/8.jpg",
                      alt: "Community moment 8",
                    },
                    {
                      src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/9.jpg",
                      alt: "Community moment 9",
                    },
                    {
                      src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/10.jpg",
                      alt: "Community moment 10",
                    },
                    {
                      src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/11.jpg",
                      alt: "Community moment 11",
                    },
                    {
                      src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/12.jpg",
                      alt: "Community moment 12",
                    },
                  ]}
                />
              </div>
            </div>
          </section>

          <RotarySelector />
          <ScrollReveal delay={100}>
            {/* OrbitSwitcher Section - Outside the main card */}
            <OrbitSwitcher />
          </ScrollReveal>
        </div>

        {/* Podcast Radio Tuner Section */}
        <section className="relative z-[50] bg-white rounded-[32px] mx-4 mt-6 px-6 md:px-12 py-16 shadow-lg border border-[#E2F3F2]">
          <ScrollReveal>
            <PodcastErrorBoundary 
              fallback={
                <div className="text-center py-8 text-[#153230]/70">
                  <p>Unable to load podcast player. Please refresh the page.</p>
                </div>
              }
            >
              {episodes.length > 0 ? (
                <PodcastRadioTuner episodes={episodes} />
              ) : (
                <PodcastRadioSkeleton />
              )}
            </PodcastErrorBoundary>
          </ScrollReveal>
        </section>

        <div className="relative">
          {/* Desktop View - Keep Original */}
          <section className="hidden md:block sticky top-0 z-[100] bg-[#153230] text-white px-6 md:px-8 py-5 md:py-6 rounded-[32px] mx-4 mt-6 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
              <div>
                <h2 className="text-xl md:text-2xl font-black leading-snug">
                  Community Builder. Technical Leader. Career Champion.
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 shrink-0">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-black text-[#4ade80]">
                    1000s
                  </p>
                  <p className="text-xs opacity-70">Placed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-black text-[#4ade80]">
                    700+
                  </p>
                  <p className="text-xs opacity-70">Calls</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-black text-[#4ade80]">
                    12K+
                  </p>
                  <p className="text-xs opacity-70">Community</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-black text-[#4ade80]">
                    60+
                  </p>
                  <p className="text-xs opacity-70">Speaking</p>
                </div>
              </div>
            </div>
          </section>

          {/* Mobile View - Optimized */}
          <section className="md:hidden sticky top-0 z-[100] bg-[#153230] text-white px-4 py-4 rounded-2xl mx-4 mt-6 shadow-2xl">
            {/* Title Section */}
            <div className="text-center mb-4 pb-3 border-b border-white/20">
              <h2 className="text-base font-black leading-tight">
                Community Builder
              </h2>
              <p className="text-xs font-semibold opacity-80 mt-1">
                Technical Leader • Career Champion
              </p>
            </div>

            {/* Stats Grid - Mobile Optimized */}
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                <div className="flex flex-col items-center">
                  <svg className="w-5 h-5 text-[#4ade80] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg font-black text-[#4ade80]">1000s</p>
                  <p className="text-[9px] opacity-70 leading-tight mt-0.5">Placed</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                <div className="flex flex-col items-center">
                  <svg className="w-5 h-5 text-[#4ade80] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <p className="text-lg font-black text-[#4ade80]">700+</p>
                  <p className="text-[9px] opacity-70 leading-tight mt-0.5">Calls</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                <div className="flex flex-col items-center">
                  <svg className="w-5 h-5 text-[#4ade80] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-lg font-black text-[#4ade80]">12K+</p>
                  <p className="text-[9px] opacity-70 leading-tight mt-0.5">Members</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                <div className="flex flex-col items-center">
                  <svg className="w-5 h-5 text-[#4ade80] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <p className="text-lg font-black text-[#4ade80]">60+</p>
                  <p className="text-[9px] opacity-70 leading-tight mt-0.5">Events</p>
                </div>
              </div>
            </div>
          </section>

          <section className="relative z-[50] bg-white rounded-[32px] mx-4 mt-6 px-4 md:px-12 py-8 md:py-20 shadow-lg border border-[#E2F3F2]">
            <ScrollReveal>
              <h2 className="text-2xl md:text-5xl font-black text-[#153230] mb-3 md:mb-6 leading-tight">
                Community Leadership
                <br className="hidden md:block" />
                <span className="md:hidden"> </span>& Impact
              </h2>
              <p className="text-base md:text-xl text-[#153230]/70 mb-8 md:mb-16 max-w-3xl leading-relaxed">
                Building bridges between developers and opportunities through
                authentic engagement, technical excellence, and unwavering
                commitment to community success.
                <span className="hidden md:inline"> As a community builder and
                personality, I scale communities that create lasting impact.</span>
              </p>
            </ScrollReveal>

            {/* Community Gallery Section */}
            <ScrollReveal delay={100}>
              <div className="mb-8 md:mb-16">
                <h3 className="text-xl md:text-3xl font-black text-[#153230] mb-4 md:mb-8 text-center">
                  Community in Action
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <img
                      src="https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/1.jpg"
                      alt="Dallas Software Developers Group meetup - large group of developers networking"
                      className="w-full h-48 md:h-80 object-cover"
                    />
                    <div className="bg-linear-to-r from-[#84803E] to-[#6a6731] text-white p-3 md:p-4">
                      <h4 className="font-bold text-base md:text-lg">
                        Dallas Software Developers Group
                      </h4>
                      <p className="text-xs md:text-sm opacity-90 mt-1">
                        Weekly meetups bringing together 12,000+ developers
                      </p>
                    </div>
                  </div>
                  <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <img
                      src="https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/2.jpg"
                      alt="Commit Your Code Conference - large conference hall with hundreds of attendees"
                      className="w-full h-48 md:h-80 object-cover"
                    />
                    <div className="bg-linear-to-r from-[#4D7DA3] to-[#3d6a8a] text-white p-3 md:p-4">
                      <h4 className="font-bold text-base md:text-lg">
                        Commit Your Code Conference
                      </h4>
                      <p className="text-xs md:text-sm opacity-90 mt-1">
                        2-day technical conference with 8,960+ total attendees
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="space-y-6 md:space-y-12">
              <ScrollReveal delay={200}>
                <div className="bg-linear-to-br from-[#4D7DA3]/5 to-[#4D7DA3]/10 rounded-2xl md:rounded-3xl p-4 md:p-10 border border-[#4D7DA3]/20">
                  <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-4 md:mb-6">
                    <div className="w-12 h-12 md:w-20 md:h-20 bg-[#4D7DA3] rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                      <svg
                        className="w-6 h-6 md:w-10 md:h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-4xl font-black text-[#153230] mb-2 md:mb-3 leading-tight">
                        The Commit Your Code Conference 2025
                      </h3>
                      <p className="text-sm md:text-xl text-[#4D7DA3] font-bold mb-3 md:mb-4 leading-snug">
                        2-Day Conference • 60 Speakers • 3 Tracks
                        <span className="hidden md:inline"> • 100% Charity • Global Reach</span>
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
                        <div className="text-center bg-white/60 rounded-lg md:rounded-xl p-2 md:p-4">
                          <div className="text-xl md:text-3xl font-black text-[#4D7DA3]">
                            8,960
                          </div>
                          <div className="text-[10px] md:text-sm text-[#153230]/70 font-bold mt-0.5">
                            Total
                          </div>
                        </div>
                        <div className="text-center bg-white/60 rounded-lg md:rounded-xl p-2 md:p-4">
                          <div className="text-xl md:text-3xl font-black text-[#4D7DA3]">
                            860
                          </div>
                          <div className="text-[10px] md:text-sm text-[#153230]/70 font-bold mt-0.5">
                            In-Person
                          </div>
                        </div>
                        <div className="text-center bg-white/60 rounded-lg md:rounded-xl p-2 md:p-4">
                          <div className="text-xl md:text-3xl font-black text-[#4D7DA3]">
                            8,100
                          </div>
                          <div className="text-[10px] md:text-sm text-[#153230]/70 font-bold mt-0.5">
                            Online
                          </div>
                        </div>
                        <div className="text-center bg-white/60 rounded-lg md:rounded-xl p-2 md:p-4">
                          <div className="text-xl md:text-3xl font-black text-[#4D7DA3]">
                            300%
                          </div>
                          <div className="text-[10px] md:text-sm text-[#153230]/70 font-bold mt-0.5">
                            Growth
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Desktop Description */}
                  <p className="hidden md:block text-lg md:text-xl text-[#153230]/80 leading-relaxed mb-6">
                    Founded and organized Dallas's premier technical conference
                    with <strong>8,960+ total attendees</strong> (860 in-person,
                    8,100 online) representing <strong>300% growth</strong> from
                    CYC24. The event{" "}
                    <strong>trended globally on social media</strong> with
                    people still making CYC posts 3 weeks post-conference.{" "}
                    <strong>
                      37% of attendees work in tech but had never attended a
                      tech conference
                    </strong>
                    , demonstrating our ability to reach new audiences and
                    create accessible learning opportunities.
                  </p>

                  {/* Mobile Description - Condensed */}
                  <div className="md:hidden space-y-2 mb-4">
                    <p className="text-sm text-[#153230]/80 leading-relaxed">
                      Founded Dallas's premier technical conference with <strong>8,960+ attendees</strong> and <strong>300% growth</strong>.
                    </p>
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-[#4D7DA3] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xs text-[#153230]/70">Trended globally on social media</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-[#4D7DA3] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xs text-[#153230]/70">37% were first-time conference attendees</p>
                    </div>
                  </div>

                  <div className="bg-white/40 rounded-xl md:rounded-2xl p-3 md:p-6 mb-4 md:mb-6">
                    <h4 className="text-base md:text-lg font-black text-[#153230] mb-3 md:mb-4">
                      Past Sponsors & Speakers
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <p className="text-xs md:text-sm font-bold text-[#4D7DA3] mb-1.5 md:mb-2">
                          SPONSORS
                        </p>
                        <p className="text-xs md:text-sm text-[#153230]/80 leading-relaxed">
                          Agora, Vonage, GitHub, Grafana Labs, TuxCare, Yum!
                          Brands, Appwrite
                          <span className="hidden md:inline">, and more</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs md:text-sm font-bold text-[#4D7DA3] mb-1.5 md:mb-2">
                          SPEAKERS
                        </p>
                        <p className="text-xs md:text-sm text-[#153230]/80 leading-relaxed">
                          Google, Microsoft, Digital Ocean, Neo4j, Spotify
                          <span className="hidden md:inline">, and
                          more</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 md:gap-3">
                    <span className="bg-[#4D7DA3] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold">
                      Conference Organizer
                    </span>
                    <span className="bg-[#4D7DA3] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold">
                      300% Growth
                    </span>
                    <span className="bg-[#4D7DA3] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold">
                      Trending
                    </span>
                    <span className="bg-[#4D7DA3] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold">
                      Accessible
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Large Conference Group Photo */}
              <ScrollReveal delay={250}>
                <div className="my-8 md:my-16">
                  <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src="https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/3.jpg"
                      alt="Commit Your Code Conference 2025 - Large group photo showing hundreds of conference attendees in a conference hall"
                      className="w-full h-56 md:h-[500px] object-cover"
                    />
                    <div className="bg-linear-to-r from-[#4D7DA3] to-[#3d6a8a] text-white p-4 md:p-8">
                      <h4 className="text-lg md:text-3xl font-black mb-1 md:mb-2">
                        Commit Your Code Conference 2025
                      </h4>
                      <p className="text-xs md:text-lg opacity-90 leading-relaxed">
                        <span className="hidden md:inline">8,960+ attendees • 300% growth • Global social media
                        trending • 37% first-time conference attendees</span>
                        <span className="md:hidden">8,960+ attendees • 300% growth • Global trending</span>
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="bg-linear-to-br from-[#84803E]/5 to-[#84803E]/10 rounded-2xl md:rounded-3xl p-4 md:p-10 border border-[#84803E]/20">
                  <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-4 md:mb-6">
                    <div className="w-12 h-12 md:w-20 md:h-20 bg-[#84803E] rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                      <svg
                        className="w-6 h-6 md:w-10 md:h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-4xl font-black text-[#153230] mb-2 md:mb-3 leading-tight">
                        Dallas Software Developers Group
                      </h3>
                      <p className="text-sm md:text-xl text-[#84803E] font-bold mb-3 md:mb-4 leading-snug">
                        12,000+ Members • Weekly Meetups
                        <span className="hidden md:inline"> • Discord Community</span>
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
                        <div className="text-center bg-white/60 rounded-lg md:rounded-xl p-2 md:p-4">
                          <div className="text-xl md:text-3xl font-black text-[#84803E]">
                            12K+
                          </div>
                          <div className="text-[10px] md:text-sm text-[#153230]/70 font-bold mt-0.5">
                            Members
                          </div>
                        </div>
                        <div className="text-center bg-white/60 rounded-lg md:rounded-xl p-2 md:p-4">
                          <div className="text-xl md:text-3xl font-black text-[#84803E]">
                            200+
                          </div>
                          <div className="text-[10px] md:text-sm text-[#153230]/70 font-bold mt-0.5">
                            Meetups
                          </div>
                        </div>
                        <div className="text-center bg-white/60 rounded-lg md:rounded-xl p-2 md:p-4">
                          <div className="text-xl md:text-3xl font-black text-[#84803E]">
                            500+
                          </div>
                          <div className="text-[10px] md:text-sm text-[#153230]/70 font-bold mt-0.5">
                            Placements
                          </div>
                        </div>
                        <div className="text-center bg-white/60 rounded-lg md:rounded-xl p-2 md:p-4">
                          <div className="text-xl md:text-3xl font-black text-[#84803E]">
                            5+
                          </div>
                          <div className="text-[10px] md:text-sm text-[#153230]/70 font-bold mt-0.5">
                            Years
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop Description */}
                  <p className="hidden md:block text-lg md:text-xl text-[#153230]/80 leading-relaxed mb-6">
                    Built and scaled one of the most active developer
                    communities globally from the ground up. Through weekly
                    meetups, technical workshops, and strategic networking
                    events, I've created a thriving ecosystem that directly
                    contributes to career growth and job placements across the
                    Dallas tech scene.
                  </p>

                  {/* Mobile Description - Condensed with bullets */}
                  <div className="md:hidden space-y-2 mb-4">
                    <p className="text-sm text-[#153230]/80 leading-relaxed">
                      Built one of the most active developer communities globally from the ground up.
                    </p>
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-[#84803E] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xs text-[#153230]/70">Weekly meetups & technical workshops</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-[#84803E] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xs text-[#153230]/70">Direct impact on career growth & placements</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 md:gap-3">
                    <span className="bg-[#84803E] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold">
                      Community Builder
                    </span>
                    <span className="bg-[#84803E] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold">
                      Discord
                    </span>
                    <span className="bg-[#84803E] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold">
                      Events
                    </span>
                    <span className="bg-[#84803E] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold">
                      Career Dev
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Large Meetup Group Photo */}
              <ScrollReveal delay={350}>
                <div className="my-8 md:my-16">
                  <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src="https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/4.jpg"
                      alt="Dallas Software Developers Group meetup - Large group of developers networking and collaborating"
                      className="w-full h-56 md:h-[500px] object-cover"
                    />
                    <div className="bg-linear-to-r from-[#84803E] to-[#6a6731] text-white p-4 md:p-8">
                      <h4 className="text-lg md:text-3xl font-black mb-1 md:mb-2">
                        Dallas Software Developers Group
                      </h4>
                      <p className="text-xs md:text-lg opacity-90 leading-relaxed">
                        <span className="hidden md:inline">12,000+ members • Weekly meetups • 200+ events • 500+
                        career placements</span>
                        <span className="md:hidden">12K+ members • 200+ events • 500+ placements</span>
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="bg-linear-to-br from-[#153230]/5 to-[#153230]/10 rounded-2xl md:rounded-3xl p-4 md:p-10 border border-[#153230]/20">
                  <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-4 md:mb-6">
                    <div className="w-12 h-12 md:w-20 md:h-20 bg-[#153230] rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                      <svg
                        className="w-6 h-6 md:w-10 md:h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-4xl font-black text-[#153230] mb-2 md:mb-3 leading-tight">
                        Community Scaling Expertise
                      </h3>
                      <p className="text-sm md:text-xl text-[#153230] font-bold mb-3 md:mb-4 leading-snug">
                        Proven Ability to Build & Scale<span className="hidden md:inline"> Developer</span> Communities
                      </p>
                      
                      {/* Desktop Grid */}
                      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="text-center bg-white/60 rounded-xl p-6">
                          <div className="text-3xl font-black text-[#153230] mb-2">
                            Strategy
                          </div>
                          <div className="text-sm text-[#153230]/70">
                            Community architecture, engagement frameworks, and
                            growth strategies that scale
                          </div>
                        </div>
                        <div className="text-center bg-white/60 rounded-xl p-6">
                          <div className="text-3xl font-black text-[#153230] mb-2">
                            Execution
                          </div>
                          <div className="text-sm text-[#153230]/70">
                            Event management, content creation, and member
                            retention at scale
                          </div>
                        </div>
                        <div className="text-center bg-white/60 rounded-xl p-6">
                          <div className="text-3xl font-black text-[#153230] mb-2">
                            Impact
                          </div>
                          <div className="text-sm text-[#153230]/70">
                            Measurable outcomes in career development and
                            community value
                          </div>
                        </div>
                      </div>

                      {/* Mobile Compact List */}
                      <div className="md:hidden space-y-2 mb-4">
                        <div className="bg-white/60 rounded-lg p-3">
                          <div className="text-sm font-black text-[#153230] mb-1">Strategy</div>
                          <div className="text-xs text-[#153230]/70">Community architecture & growth frameworks</div>
                        </div>
                        <div className="bg-white/60 rounded-lg p-3">
                          <div className="text-sm font-black text-[#153230] mb-1">Execution</div>
                          <div className="text-xs text-[#153230]/70">Event management & content creation</div>
                        </div>
                        <div className="bg-white/60 rounded-lg p-3">
                          <div className="text-sm font-black text-[#153230] mb-1">Impact</div>
                          <div className="text-xs text-[#153230]/70">Measurable career development outcomes</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop Description */}
                  <p className="hidden md:block text-lg md:text-xl text-[#153230]/80 leading-relaxed mb-6">
                    As a community builder and personality, I specialize in
                    creating scalable developer communities that deliver real
                    value. My approach combines authentic engagement, strategic
                    content creation, and systematic growth methodologies that
                    can be replicated across different markets and
                    organizations.
                  </p>

                  {/* Mobile Description - Condensed */}
                  <p className="md:hidden text-sm text-[#153230]/80 leading-relaxed mb-4">
                    Specializing in scalable developer communities with authentic engagement, strategic content, and systematic growth methodologies.
                  </p>

                  <div className="flex flex-wrap gap-2 md:gap-3">
                    <span className="bg-[#153230] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold">
                      Strategy
                    </span>
                    <span className="bg-[#153230] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold">
                      Growth
                    </span>
                    <span className="bg-[#153230] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold">
                      Brand Building
                    </span>
                    <span className="bg-[#153230] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold">
                      Scalable
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </div>

        <div className="relative">
          <section className="sticky top-0 z-[100] bg-gradient-to-br from-[#4D7DA3] to-[#153230] text-white px-6 md:px-8 py-5 md:py-6 rounded-[32px] mx-4 mt-6 shadow-2xl">
            <h2 className="text-xl md:text-2xl font-black leading-snug">
              Thought Leadership & Education
            </h2>
          </section>

          <section className="relative z-[50] bg-white rounded-[32px] mx-4 mt-6 px-6 md:px-12 py-16 shadow-lg border border-[#E2F3F2]">
            <div className="grid md:grid-cols-2 gap-6">
              <ScrollReveal delay={200}>
                <div className="bg-gradient-to-br from-[#84803E] to-[#6a6731] text-white rounded-2xl p-6 border border-[#84803E]/20 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-black">
                      LinkedIn Learning Courses
                    </h3>
                  </div>
                  <p className="text-sm opacity-90 mb-3">
                    Creator of free educational content including The OFFICIAL
                    LinkedIn Series, helping job seekers optimize profiles and
                    land opportunities.
                  </p>
                  <div className="text-xs opacity-70 font-bold">
                    Free Resources • Career Development
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="bg-gradient-to-br from-[#153230] to-[#0f2624] text-white rounded-2xl p-6 border border-[#153230]/20 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-black">Conference Speaking</h3>
                  </div>
                  <p className="text-sm opacity-90 mb-3">
                    Regular speaker at major tech conferences and meetups,
                    sharing insights on career development, community building,
                    and technical leadership.
                  </p>
                  <div className="text-xs opacity-70 font-bold">
                    60+ Speaking Engagements
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="bg-gradient-to-br from-[#4D7DA3] to-[#3d6a8a] text-white rounded-2xl p-6 border border-[#4D7DA3]/20 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-black">Technical Workshops</h3>
                  </div>
                  <p className="text-sm opacity-90 mb-3">
                    Leading hands-on technical workshops covering modern
                    development practices, career strategies, and emerging
                    technologies for developers at all levels.
                  </p>
                  <div className="text-xs opacity-70 font-bold">
                    Monthly Workshops • Hands-on Training
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <section className="relative z-[50] bg-white rounded-[32px] mx-4 mt-6 px-6 md:px-12 py-16 md:py-20 shadow-lg border border-[#E2F3F2]">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-black text-[#153230] mb-6 leading-tight">
                Why Work With Me
              </h2>
              <p className="text-lg md:text-xl text-[#153230]/70 mb-16 max-w-3xl leading-relaxed">
                I bring a unique combination of technical expertise, community
                leadership, and proven mentorship success to help your
                organization thrive.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <ScrollReveal delay={100}>
                <TiltCard>
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#4D7DA3] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-black text-[#153230] mb-3">
                          Proven Community Impact
                        </h3>
                        <p className="text-[#153230]/70 text-sm md:text-base leading-relaxed">
                          Built and scaled a 12,000+ member developer community
                          from scratch, demonstrating expertise in community
                          engagement, event management, and creating lasting
                          value for members. Skilled at fostering inclusive
                          environments where developers thrive.
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <TiltCard>
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#84803E] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-black text-[#153230] mb-3">
                          Technical Leadership
                        </h3>
                        <p className="text-[#153230]/70 text-sm md:text-base leading-relaxed">
                          As Director of Technology, I combine hands-on
                          technical expertise with strategic vision. Experience
                          managing technical teams, architecting solutions, and
                          driving innovation while maintaining focus on business
                          objectives and team growth.
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <TiltCard>
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#4D7DA3] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-black text-[#153230] mb-3">
                          Mentorship Excellence
                        </h3>
                        <p className="text-[#153230]/70 text-sm md:text-base leading-relaxed">
                          Over 700 1-on-1 mentorship calls with 130+ five-star
                          reviews demonstrate my ability to develop talent,
                          provide actionable guidance, and create measurable
                          career outcomes. Track record of helping developers at
                          all levels reach their goals.
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <TiltCard>
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#153230] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <svg
                          className="w-6 h-6 text-[#4D7DA3]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-black text-[#153230] mb-3">
                          Public Speaking & Brand Building
                        </h3>
                        <p className="text-[#153230]/70 text-sm md:text-base leading-relaxed">
                          Experienced conference speaker and content creator
                          with proven ability to represent organizations, engage
                          audiences, and build brand awareness. Comfortable in
                          front of large audiences and skilled at translating
                          technical concepts for diverse stakeholders.
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            </div>
          </section>
        </div>

        <div className="relative">
          <section className="sticky top-0 z-[100] bg-white rounded-[32px] mx-4 mt-6 shadow-xl border border-[#E2F3F2] px-6 md:px-8 py-5 md:py-6">
            <h2 className="text-xl md:text-2xl font-black text-[#153230] leading-snug">
              Resources & Initiatives
            </h2>
          </section>
        </div>
        </div>

        {/* Contact Section - Ultra Premium Design */}
        <section id="contact" className="relative mx-4 mt-6 mb-6 overflow-hidden">
          {/* Advanced Animated Background with Mesh Gradient */}
          <div className="absolute inset-0 bg-[#0a1f1e] rounded-[32px]" />
          
          {/* Animated Gradient Mesh */}
          <div className="absolute inset-0 opacity-60">
            <div className="absolute top-0 -left-20 w-96 h-96 bg-[#4D7DA3] rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute top-20 right-20 w-96 h-96 bg-[#84803E] rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
            <div className="absolute -bottom-20 left-40 w-96 h-96 bg-[#153230] rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
          </div>
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          
          <div className="relative px-4 md:px-16 py-16 md:py-24">
            <ScrollReveal>
              <div className="max-w-7xl mx-auto">
                {/* Split Layout: Left Content, Right Form */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                  
                  {/* LEFT SIDE - Content & Social Proof */}
                  <div className="space-y-8 lg:sticky lg:top-24">
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-xl border border-emerald-400/20 px-6 py-3 rounded-full">
                      <div className="relative">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                        <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                      </div>
                      <span className="text-sm font-bold text-emerald-100 tracking-wide">
                        AVAILABLE FOR NEW PROJECTS
                      </span>
                    </div>

                    {/* Main Headline */}
                    <div className="space-y-6">
                      <h2 className="text-5xl md:text-7xl font-black leading-[1.2] tracking-tight pb-2">
                        <span className="block text-white">Let's Make</span>
                        <span className="block bg-gradient-to-r from-[#4D7DA3] via-[#7eb5d4] to-[#4D7DA3] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                          Something Epic
                        </span>
                      </h2>
                      
                      <p className="text-xl text-white/70 leading-relaxed font-medium max-w-xl">
                        From community scaling to brand partnerships. I bring 
                        <span className="text-white font-bold"> extensive experience in the tech industry </span>
                        to help you build, scale, and succeed. Let's give people something to talk about!
                      </p>
                    </div>

                    {/* Animated Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#4D7DA3]/20">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4D7DA3]/0 to-[#4D7DA3]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                          <div className="text-4xl font-black text-white mb-2 group-hover:scale-110 transition-transform">450K+</div>
                          <div className="text-sm text-white/60 font-semibold uppercase tracking-wide">Community Reach</div>
                        </div>
                      </div>
                      
                      <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#84803E]/20">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#84803E]/0 to-[#84803E]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                          <div className="text-4xl font-black text-white mb-2 group-hover:scale-110 transition-transform">30+</div>
                          <div className="text-sm text-white/60 font-semibold uppercase tracking-wide">Brand Partnerships</div>
                        </div>
                      </div>
                      
                      <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#4D7DA3]/20">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4D7DA3]/0 to-[#4D7DA3]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                          <div className="text-4xl font-black text-white mb-2 group-hover:scale-110 transition-transform">200+</div>
                          <div className="text-sm text-white/60 font-semibold uppercase tracking-wide">Events Hosted</div>
                        </div>
                      </div>
                      
                      <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-400/20">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                          <div className="text-4xl font-black text-white mb-2 group-hover:scale-110 transition-transform">&lt;48h</div>
                          <div className="text-sm text-white/60 font-semibold uppercase tracking-wide">Response Time</div>
                        </div>
                      </div>
                    </div>

                    {/* Value Props with Icons */}
                    <div className="space-y-4 pt-4">
                      <div className="flex items-start gap-4 group">
                        <div className="shrink-0 w-12 h-12 bg-gradient-to-br from-[#4D7DA3] to-[#5a8fb5] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-white mb-1">Proven Track Record</h3>
                          <p className="text-sm text-white/60 leading-relaxed">Senior engineering leader with Fortune 500 & startup experience</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group">
                        <div className="shrink-0 w-12 h-12 bg-gradient-to-br from-[#84803E] to-[#a09d4f] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-white mb-1">Lightning Fast Response</h3>
                          <p className="text-sm text-white/60 leading-relaxed">Typical response within 24 hours, often same-day</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group">
                        <div className="shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-white mb-1">100% Confidential</h3>
                          <p className="text-sm text-white/60 leading-relaxed">NDA ready to sign, enterprise-grade security</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE - Premium Form Card */}
                  <div className="relative">
                    {/* Floating glow effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#4D7DA3] via-[#84803E] to-[#4D7DA3] rounded-[40px] opacity-20 blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
                    
                    {/* Form Container */}
                    <div className="relative bg-white/95 backdrop-blur-2xl rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/20">
                      {/* Form Header */}
                      <div className="mb-8 pb-8 border-b border-gray-200">
                        <h3 className="text-3xl font-black text-[#153230] mb-3">
                          Start Your Project
                        </h3>
                        <p className="text-base text-[#153230]/70 leading-relaxed">
                          What can I help you with? 
                          <span className="font-semibold text-[#153230]"> I'll get back to you within 48 hours.</span>
                        </p>
                      </div>

                      {/* Form Component */}
                      <ContactForm />

                      {/* Security Footer */}
                      <div className="mt-8 pt-8 border-t border-gray-200">
                        <div className="flex items-center justify-center gap-6 text-xs text-[#153230]/50">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <span className="font-semibold">SSL Encrypted</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-semibold">GDPR Compliant</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span className="font-semibold">No Spam Ever</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
      <BottomNav />
    </>
  );
}
