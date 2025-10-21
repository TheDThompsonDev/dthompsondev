import { ScrollReveal } from '@/components/ScrollReveal';
import { TiltCard } from '@/components/TiltCard';
import { OrbitSwitcher } from '@/components/OrbitSwitcher';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#E2F3F2]">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-white rounded-[32px] shadow-xl m-4 overflow-hidden border border-[#4D7DA3]/10">
          <header className="px-8 md:px-16 py-8 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#153230] rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                DT
              </div>
              <span className="text-xl font-bold tracking-tight text-[#153230]">DTHOMPSONDEV</span>
            </div>
            <button className="bg-[#153230] text-white px-8 py-4 rounded-full hover:bg-[#4D7DA3] hover:scale-105 transition-all duration-300 font-semibold">
              Attend a Meetup
            </button>
          </header>

          <section className="relative px-8 md:px-16 py-20 md:py-32 overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#4D7DA3]/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#84803E]/8 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left: Core message */}
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2.5 bg-[#153230] text-white px-4 py-2 rounded-full shadow-lg">
                    <div className="relative flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse"></div>
                      <div className="absolute w-2 h-2 bg-[#4ade80] rounded-full animate-ping"></div>
                    </div>
                    <span className="text-sm font-bold tracking-wide">ACCEPTING 1:1 CALLS</span>
                  </div>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#153230] leading-[1] tracking-tight">
                    Director of Tech,{' '}
                    <span className="text-[#4D7DA3]">Community</span>{' '}
                    Leader & Speaker
                  </h1>
                  
                  <p className="text-xl text-[#153230]/70 leading-relaxed max-w-xl">
                    Helping developers land jobs, level up careers, and build lasting connections in tech through mentorship and community.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button className="group relative bg-[#4D7DA3] text-white px-10 py-5 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg overflow-hidden">
                      <span className="relative z-10">Book a 1:1 Call</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    </button>
                    
                    <div className="flex items-center gap-3 text-[#153230]/70">
                      <div className="flex -space-x-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4D7DA3] to-[#3d6a8a] border-2 border-white shadow"></div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#84803E] to-[#6a6731] border-2 border-white shadow"></div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#153230] to-[#0f2624] border-2 border-white shadow"></div>
                      </div>
                      <div className="text-sm">
                        <div className="font-bold text-[#153230]">12,000+</div>
                        <div>developers</div>
                      </div>
                    </div>
                  </div>

                  {/* Key metrics */}
                  <div className="flex gap-8 pt-6 border-t border-[#4D7DA3]/10">
                    {[
                      { n: "700+", l: "1-on-1 calls" },
                      { n: "130+", l: "5-star reviews" },
                      { n: "1000s", l: "Jobs landed" }
                    ].map((x, i) => (
                      <div key={i}>
                        <div className="text-3xl font-black text-[#4D7DA3]">{x.n}</div>
                        <div className="text-xs text-[#153230]/60 font-medium">{x.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Visual proof */}
                <div>
                  <TiltCard>
                    <div className="relative bg-gradient-to-br from-white to-[#E2F3F2]/40 rounded-3xl p-6 shadow-2xl border-2 border-[#4D7DA3]/20 overflow-hidden">
                      <div className="absolute -right-16 -top-16 w-40 h-40 bg-[#4D7DA3]/10 rounded-full blur-3xl"></div>
                      
                      {/* Visual grid */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#153230]/5 to-[#4D7DA3]/5 mb-5">
                        <div className="grid h-full w-full grid-cols-12 grid-rows-6 gap-2 p-2">
                          <div className="col-span-7 row-span-6 bg-gradient-to-br from-[#4D7DA3] to-[#3d6a8a] rounded-xl flex flex-col items-center justify-center text-white p-4">
                            <div className="text-2xl mb-2">🎤</div>
                            <div className="text-sm font-bold text-center">CYC Conference</div>
                            <div className="text-xs opacity-80">125+ speakers</div>
                          </div>
                          <div className="col-span-5 row-span-3 bg-gradient-to-br from-[#84803E] to-[#6a6731] rounded-xl flex flex-col items-center justify-center text-white p-3">
                            <div className="text-xl mb-1">🤝</div>
                            <div className="text-xs font-bold text-center">Exec Lunches</div>
                          </div>
                          <div className="col-span-5 row-span-3 bg-gradient-to-br from-[#153230] to-[#0f2624] rounded-xl flex flex-col items-center justify-center text-white p-3">
                            <div className="text-xl mb-1">🎙️</div>
                            <div className="text-xs font-bold text-center">Podcast</div>
                          </div>
                        </div>
                      </div>

                      {/* Quick stats */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-xl p-4 text-center shadow border border-[#4D7DA3]/10">
                          <div className="text-2xl font-black text-[#4D7DA3]">10k+</div>
                          <div className="text-xs text-[#153230]/60 font-medium">Mentored</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 text-center shadow border border-[#4D7DA3]/10">
                          <div className="text-2xl font-black text-[#84803E]">50+</div>
                          <div className="text-xs text-[#153230]/60 font-medium">Episodes</div>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </div>
            </div>
          </section>

          <OrbitSwitcher />
        </div>

        <div className="relative">
          <section className="sticky top-0 z-[100] bg-[#153230] text-white px-6 md:px-10 py-6 rounded-[32px] mx-4 mt-6 shadow-2xl">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 max-w-5xl leading-snug">
                My mission is to empower aspiring developers and career changers by providing mentorship, resources, and community support to help them break into tech and thrive.
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <div className="flex flex-wrap gap-6 md:gap-8 items-center opacity-70">
                <span className="text-xl md:text-2xl font-black">Microsoft</span>
                <span className="text-lg md:text-xl font-bold">LinkedIn</span>
                <span className="text-base md:text-lg font-bold">Discord</span>
                <span className="text-base md:text-lg font-black">Commit Your Code</span>
                <span className="text-lg md:text-xl font-black">Tech Community</span>
              </div>
            </ScrollReveal>
          </section>

          <section className="relative z-[50] bg-white rounded-[32px] mx-4 mt-6 px-6 md:px-12 py-16 shadow-lg border border-[#E2F3F2]">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#153230] mb-12 leading-tight">
                How Can I<br />Help You?
              </h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <ScrollReveal delay={100}>
                <TiltCard>
                  <div className="flex gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-[#4D7DA3] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl md:text-2xl font-black text-[#153230]">1:1 Mentorship</h3>
                        <span className="text-4xl md:text-5xl font-extralight text-[#E2F3F2]">01</span>
                      </div>
                      <p className="text-[#153230]/70 text-sm md:text-base leading-relaxed">
                        Get personalized career advice, resume reviews, and interview prep. Over 700+ successful 1-on-1 calls helping developers level up their careers.
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <TiltCard>
                  <div className="flex gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-[#84803E] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl md:text-2xl font-black text-[#153230]">Community</h3>
                        <span className="text-4xl md:text-5xl font-extralight text-[#E2F3F2]">02</span>
                      </div>
                      <p className="text-[#153230]/70 text-sm md:text-base leading-relaxed">
                        Join the Commit Your Code Discord - a tech-focused community with over 12,000 developers from around the world, with a special Dallas area section.
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <TiltCard>
                  <div className="flex gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-[#4D7DA3] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl md:text-2xl font-black text-[#153230]">Speaking</h3>
                        <span className="text-4xl md:text-5xl font-extralight text-[#E2F3F2]">03</span>
                      </div>
                      <p className="text-[#153230]/70 text-sm md:text-base leading-relaxed">
                        Host of The Programming Podcast and frequent tech speaker. Available for conference talks, meetups, and panel discussions on career development.
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <TiltCard>
                  <div className="flex gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-[#153230] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-6 h-6 md:w-7 md:h-7 text-[#4D7DA3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl md:text-2xl font-black text-[#153230]">Education</h3>
                        <span className="text-4xl md:text-5xl font-extralight text-[#E2F3F2]">04</span>
                      </div>
                      <p className="text-[#153230]/70 text-sm md:text-base leading-relaxed">
                        Free LinkedIn courses on LinkedIn Learning and The OFFICIAL LinkedIn Series - helping job seekers optimize their profiles and land opportunities.
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            </div>
          </section>
        </div>

        <div className="relative">
          <section className="sticky top-0 z-[100] bg-[#153230] text-white px-6 md:px-10 py-6 rounded-[32px] mx-4 mt-6 shadow-2xl">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 max-w-5xl leading-snug">
                I've helped thousands of developers land their dream jobs in tech through personalized mentorship, community support, and proven strategies that actually work.
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-black mb-1">1000s</p>
                  <p className="text-xs md:text-sm opacity-70">Jobs Landed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-black mb-1">700+</p>
                  <p className="text-xs md:text-sm opacity-70">1-on-1 Calls</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-black mb-1">130+</p>
                  <p className="text-xs md:text-sm opacity-70">5-Star Reviews</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-black mb-1">12K+</p>
                  <p className="text-xs md:text-sm opacity-70">Community Members</p>
                </div>
              </div>
            </ScrollReveal>
          </section>

          <section className="relative z-[50] bg-white rounded-[32px] mx-4 mt-6 px-6 md:px-12 py-16 shadow-lg border border-[#E2F3F2]">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#153230] mb-12 leading-tight">
                How Can I<br />Help You?
              </h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <ScrollReveal delay={100}>
                <TiltCard>
                  <div className="flex gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-[#4D7DA3] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl md:text-2xl font-black text-[#153230]">1:1 Mentorship</h3>
                        <span className="text-4xl md:text-5xl font-extralight text-[#E2F3F2]">01</span>
                      </div>
                      <p className="text-[#153230]/70 text-sm md:text-base leading-relaxed">
                        Get personalized career advice, resume reviews, and interview prep. Over 700+ successful 1-on-1 calls helping developers level up their careers.
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <TiltCard>
                  <div className="flex gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-[#84803E] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl md:text-2xl font-black text-[#153230]">Community</h3>
                        <span className="text-4xl md:text-5xl font-extralight text-[#E2F3F2]">02</span>
                      </div>
                      <p className="text-[#153230]/70 text-sm md:text-base leading-relaxed">
                        Join the Commit Your Code Discord - a tech-focused community with over 12,000 developers from around the world, with a special Dallas area section.
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <TiltCard>
                  <div className="flex gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-[#4D7DA3] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl md:text-2xl font-black text-[#153230]">Speaking</h3>
                        <span className="text-4xl md:text-5xl font-extralight text-[#E2F3F2]">03</span>
                      </div>
                      <p className="text-[#153230]/70 text-sm md:text-base leading-relaxed">
                        Host of The Programming Podcast and frequent tech speaker. Available for conference talks, meetups, and panel discussions on career development.
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <TiltCard>
                  <div className="flex gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-[#153230] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-6 h-6 md:w-7 md:h-7 text-[#4D7DA3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl md:text-2xl font-black text-[#153230]">Education</h3>
                        <span className="text-4xl md:text-5xl font-extralight text-[#E2F3F2]">04</span>
                      </div>
                      <p className="text-[#153230]/70 text-sm md:text-base leading-relaxed">
                        Free LinkedIn courses on LinkedIn Learning and The OFFICIAL LinkedIn Series - helping job seekers optimize their profiles and land opportunities.
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            </div>
          </section>
        </div>

        <section className="bg-white rounded-[32px] mx-4 mt-6 shadow-xl border border-[#E2F3F2]">
          <div className="sticky top-0 z-[100] bg-white rounded-t-[32px] px-6 md:px-12 py-8 shadow-lg border-b border-[#E2F3F2]">
            <div className="flex justify-between items-end">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#153230] leading-tight">
                  Resources &<br />Initiatives
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <button className="bg-[#4D7DA3] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-[#3d6a8a] hover:scale-105 transition-all duration-300 font-semibold text-sm md:text-base">
                  View All
                </button>
              </ScrollReveal>
            </div>
          </div>

          <div className="px-6 md:px-12 pb-16 pt-6 space-y-6 bg-white">
            <ScrollReveal delay={200}>
              <TiltCard className="bg-[#4D7DA3] rounded-[24px] overflow-hidden shadow-2xl hover:shadow-[0_25px_50px_rgba(77,125,163,0.3)] transition-all duration-500 cursor-pointer">
                <div className="aspect-[16/9] flex items-center justify-center p-8 md:p-10">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center border border-white/20">
                    <p className="text-white text-xl md:text-2xl font-black">Commit Your Code 2025</p>
                  </div>
                </div>
                <div className="bg-white p-5 md:p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg md:text-xl font-black text-[#153230]">TECH CONFERENCE</h3>
                    <span className="text-base md:text-lg font-bold text-[#4D7DA3]">2025</span>
                  </div>
                  <p className="text-[#153230]/70 mb-3 text-sm md:text-base">60 speakers, 3 tracks, highly technical. $30 tickets with 100% proceeds to charity.</p>
                  <div className="flex gap-2">
                    <span className="bg-[#4D7DA3] text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-black">CONFERENCE</span>
                    <span className="bg-[#153230] text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-black">CHARITY</span>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6">
              <ScrollReveal delay={300}>
                <TiltCard className="bg-[#E2F3F2] rounded-[24px] overflow-hidden shadow-2xl hover:shadow-[0_25px_50px_rgba(132,128,62,0.2)] transition-all duration-500 cursor-pointer border border-[#4D7DA3]/20">
                  <div className="aspect-[4/3] flex items-center justify-center p-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-[#4D7DA3]/20">
                      <p className="text-[#153230] text-lg md:text-xl font-black">LinkedIn Mastery</p>
                    </div>
                  </div>
                  <div className="bg-white p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-base md:text-lg font-black text-[#153230]">LINKEDIN COURSE</h3>
                      <span className="text-sm md:text-base font-bold text-[#84803E]">FREE</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-[#84803E] text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-black">EDUCATION</span>
                      <span className="bg-[#153230] text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-black">CAREER</span>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <TiltCard className="bg-[#84803E] rounded-[24px] overflow-hidden shadow-2xl hover:shadow-[0_25px_50px_rgba(77,125,163,0.3)] transition-all duration-500 cursor-pointer">
                  <div className="aspect-[4/3] flex items-center justify-center p-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                      <p className="text-white text-lg md:text-xl font-black">Discord Community</p>
                    </div>
                  </div>
                  <div className="bg-white p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-base md:text-lg font-black text-[#153230]">COMMIT YOUR CODE</h3>
                      <span className="text-sm md:text-base font-bold text-[#4D7DA3]">12K+</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-[#4D7DA3] text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-black">COMMUNITY</span>
                      <span className="bg-[#153230] text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-black">SUPPORT</span>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <ScrollReveal delay={500}>
                <TiltCard className="bg-[#153230] rounded-[24px] overflow-hidden shadow-2xl hover:shadow-[0_25px_50px_rgba(132,128,62,0.2)] transition-all duration-500 cursor-pointer">
                  <div className="aspect-[4/3] flex items-center justify-center p-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                      <p className="text-white text-lg md:text-xl font-black">The Programming Podcast</p>
                    </div>
                  </div>
                  <div className="bg-white p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-base md:text-lg font-black text-[#153230]">PODCAST</h3>
                      <span className="text-sm md:text-base font-bold text-[#84803E]">TOP TECH</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-[#84803E] text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-black">PODCAST</span>
                      <span className="bg-[#153230] text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-black">INTERVIEWS</span>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal delay={600}>
                <TiltCard className="bg-[#d4d0c8] rounded-[24px] overflow-hidden shadow-2xl hover:shadow-[0_25px_50px_rgba(77,125,163,0.3)] transition-all duration-500 cursor-pointer border border-[#4D7DA3]/10">
                  <div className="aspect-[4/3] flex items-center justify-center p-8">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-[#153230]/10">
                      <p className="text-[#153230] text-lg md:text-xl font-black">LinkedIn Series</p>
                    </div>
                  </div>
                  <div className="bg-white p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-base md:text-lg font-black text-[#153230]">OFFICIAL SERIES</h3>
                      <span className="text-sm md:text-base font-bold text-[#4D7DA3]">VIDEO</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-[#4D7DA3] text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-black">LINKEDIN</span>
                      <span className="bg-[#153230] text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-black">JOBS</span>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
