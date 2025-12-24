import { ScrollReveal } from "@/components/ScrollReveal";
import { TrustedBy } from "@/components/TrustedBy";
import { NewsletterForm } from "@/components/NewsletterForm";
import { TiltCard } from "@/components/TiltCard";
import { BentoGrid } from "@/components/BentoGrid";
import RotarySelector from "@/components/RotarySelector";
import { PodcastRadioTuner } from "@/components/PodcastRadioTuner";
import { PodcastRadioSkeleton } from "@/components/PodcastSkeleton";
import { PodcastErrorBoundary } from "@/components/PodcastErrorBoundary";
import Navbar from "@/components/Navbar";
import { HeroContactButton } from "@/components/HeroContactButton";
import Link from "next/link";
import { headers } from "next/headers";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Lazy load below-the-fold components
const WallOfLove = dynamic(() => import("@/components/WallOfLove").then(mod => mod.WallOfLove), {
  loading: () => <div className="h-[600px] bg-[#F8FDFF] animate-pulse" />
});

const ContactForm = dynamic(() => import("@/components/ContactForm").then(mod => mod.ContactForm), {
  loading: () => <div className="h-[400px] bg-white rounded-[32px] animate-pulse" />
});

const OrbitSwitcher = dynamic(() => import("@/components/OrbitSwitcher").then(mod => mod.OrbitSwitcher), {
  loading: () => <div className="h-[400px] bg-transparent" />
});

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
      <main id="main-content">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-white rounded-[32px] shadow-xl m-4 overflow-hidden border border-[#4D7DA3]/10">
            <Navbar />

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
                      <HeroContactButton />
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
                        alt: "Snapshot of a community event with developers networking",
                      },
                      {
                        src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/2.jpg",
                        alt: "Group photo from a local tech meetup",
                      },
                      {
                        src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/3.jpg",
                        alt: "Developers collaborating during a hackathon",
                      },
                      {
                        src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/4.jpg",
                        alt: "Candid shot of attendees at a conference",
                      },
                      {
                        src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/5.jpg",
                        alt: "Community members discussing code at a workshop",
                      },
                      {
                        src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/6.jpg",
                        alt: "Speaker presenting at a tech event",
                      },
                      {
                        src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/7.jpg",
                        alt: "Large group photo of the developer community",
                      },
                      {
                        src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/8.jpg",
                        alt: "Developers having coffee and chatting",
                      },
                      {
                        src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/9.jpg",
                        alt: "Attendees smiling at a social gathering",
                      },
                      {
                        src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/10.jpg",
                        alt: "Panel discussion at a developer conference",
                      },
                      {
                        src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/11.jpg",
                        alt: "Community members working together on laptops",
                      },
                      {
                        src: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/12.jpg",
                        alt: "Closing ceremony of a tech event",
                      },
                    ]}
                  />
                </div>
              </div>
            </section>

            <TrustedBy />

            <RotarySelector />
            <div className="relative z-30">
              <ScrollReveal delay={100}>
                {/* OrbitSwitcher Section - Outside the main card */}
                <OrbitSwitcher />
              </ScrollReveal>
            </div>
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

          {/* Option 1: Wall of Love
        <div className="relative z-40 mt-8 mb-8">
          <div className="mx-4 rounded-[32px] overflow-hidden shadow-xl border border-[#E2F3F2]">
            <WallOfLove />
          </div>
        </div>
        */}

          {/* Newsletter Section - Moved from global layout */}
          <div className="relative z-40 mt-8 mb-8">
            <div className="mx-4 rounded-[32px] overflow-hidden shadow-xl border border-[#E2F3F2]">
              <NewsletterForm />
            </div>
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

          <div className="relative px-3 sm:px-4 md:px-16 py-8 sm:py-12 md:py-24">
            <ScrollReveal>
              <div className="max-w-7xl mx-auto">
                {/* Split Layout: Left Content, Right Form */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

                  {/* LEFT SIDE - Content & Social Proof (Hidden on mobile for cleaner UX) */}
                  <div className="hidden lg:block space-y-8 lg:sticky lg:top-24">
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
                  <div className="relative lg:min-w-0">
                    {/* Floating glow effect - hide on mobile for performance */}
                    <div className="hidden lg:block absolute -inset-4 bg-gradient-to-r from-[#4D7DA3] via-[#84803E] to-[#4D7DA3] rounded-[40px] opacity-20 blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />

                    {/* Form Container */}
                    <div className="relative bg-white/95 backdrop-blur-2xl rounded-2xl lg:rounded-[32px] p-5 sm:p-8 md:p-12 shadow-2xl border border-white/20">
                      {/* Form Header - Compact on mobile */}
                      <div className="mb-4 lg:mb-8 pb-4 lg:pb-8 border-b border-gray-200 text-center lg:text-left">
                        <div className="lg:hidden inline-flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-full mb-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                          <span className="text-xs font-bold text-emerald-700">AVAILABLE NOW</span>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-black text-[#153230] mb-2 lg:mb-3">
                          Let's Work Together
                        </h3>
                        <p className="text-sm lg:text-base text-[#153230]/70 leading-relaxed">
                          What can I help you with? <span className="font-semibold text-[#153230]">I respond within 48 hours.</span>
                        </p>
                      </div>

                      {/* Form Component */}
                      <ContactForm />

                      {/* Security Footer - Hide on mobile */}
                      <div className="hidden sm:block mt-6 pt-6 border-t border-gray-200">
                        <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 text-xs text-[#153230]/50">
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
            </ScrollReveal >
          </div >
        </section>
      </main>

    </>
  );
}
