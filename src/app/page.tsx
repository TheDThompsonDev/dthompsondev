import { ScrollReveal } from '@/components/ScrollReveal';
import { TiltCard } from '@/components/TiltCard';
import { OrbitSwitcher } from '@/components/OrbitSwitcher';
import { BentoGrid } from '@/components/BentoGrid';
import { CodePlayground } from '@/components/CodePlayground';

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

                <BentoGrid images={[
                  { src: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/1.jpg', alt: 'Community moment 1' },
                  { src: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/2.jpg', alt: 'Community moment 2' },
                  { src: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/3.jpg', alt: 'Community moment 3' },
                  { src: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/4.jpg', alt: 'Community moment 4' },
                  { src: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/5.jpg', alt: 'Community moment 5' },
                  { src: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/6.jpg', alt: 'Community moment 6' },
                  { src: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/7.jpg', alt: 'Community moment 7' },
                  { src: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/8.jpg', alt: 'Community moment 8' },
                  { src: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/9.jpg', alt: 'Community moment 9' },
                  { src: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/10.jpg', alt: 'Community moment 10' },
                  { src: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/11.jpg', alt: 'Community moment 11' },
                  { src: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/12.jpg', alt: 'Community moment 12' },
                ]} />
              </div>
            </div>
          </section>

          <OrbitSwitcher />
        </div>

        <CodePlayground />

        <div className="relative">
          <section className="sticky top-0 z-[100] bg-[#153230] text-white px-6 md:px-10 py-8 md:py-10 rounded-[32px] mx-4 mt-6 shadow-2xl">
          <ScrollReveal>
            <h2 className="text-2xl md:text-4xl font-black mb-6 max-w-5xl leading-tight">
              Community Builder. Technical Leader. Career Champion.
            </h2>
            <p className="text-base md:text-lg mb-8 max-w-4xl leading-relaxed opacity-90">
              As Director of Technology and Community Leader, I've dedicated my career to bridging the gap between aspiring developers and their dream careers through mentorship, technical education, and authentic community building.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-6 border-t border-white/20">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-black mb-1 text-[#4ade80]">1000s</p>
                <p className="text-xs md:text-sm opacity-70">Developers Placed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-black mb-1 text-[#4ade80]">700+</p>
                <p className="text-xs md:text-sm opacity-70">Mentorship Calls</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-black mb-1 text-[#4ade80]">12K+</p>
                <p className="text-xs md:text-sm opacity-70">Community Members</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-black mb-1 text-[#4ade80]">60+</p>
                <p className="text-xs md:text-sm opacity-70">Speaking Events</p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="relative z-[50] bg-white rounded-[32px] mx-4 mt-6 px-6 md:px-12 py-16 md:py-20 shadow-lg border border-[#E2F3F2]">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-black text-[#153230] mb-6 leading-tight">
              Community Leadership<br />& Impact
            </h2>
            <p className="text-lg md:text-xl text-[#153230]/70 mb-16 max-w-3xl leading-relaxed">
              Building bridges between developers and opportunities through authentic engagement, technical excellence, and unwavering commitment to community success.
            </p>
          </ScrollReveal>

          <div className="space-y-12">
            <ScrollReveal delay={100}>
              <div className="border-l-4 border-[#4D7DA3] pl-6 md:pl-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-[#4D7DA3] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-[#153230] mb-2">Commit Your Code - Founder</h3>
                    <p className="text-sm md:text-base text-[#4D7DA3] font-bold mb-3">12,000+ Active Developer Community</p>
                  </div>
                </div>
                <p className="text-base md:text-lg text-[#153230]/80 leading-relaxed mb-4">
                  Created and scaled one of the most active developer communities globally, fostering collaboration, learning, and career growth. Organized weekly meetups, technical workshops, and networking events that have directly contributed to hundreds of job placements.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#4D7DA3]/10 text-[#4D7DA3] px-3 py-1.5 rounded-full text-sm font-bold">Discord Community</span>
                  <span className="bg-[#4D7DA3]/10 text-[#4D7DA3] px-3 py-1.5 rounded-full text-sm font-bold">Weekly Meetups</span>
                  <span className="bg-[#4D7DA3]/10 text-[#4D7DA3] px-3 py-1.5 rounded-full text-sm font-bold">Dallas Tech Hub</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="border-l-4 border-[#84803E] pl-6 md:pl-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-[#84803E] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-[#153230] mb-2">Commit Your Code Conference 2025</h3>
                    <p className="text-sm md:text-base text-[#84803E] font-bold mb-3">60 Speakers • 3 Technical Tracks • 100% Charity</p>
                  </div>
                </div>
                <p className="text-base md:text-lg text-[#153230]/80 leading-relaxed mb-4">
                  Organizing a flagship technical conference featuring industry leaders and cutting-edge tech talks. With $30 tickets and 100% of proceeds going to charity, this event demonstrates commitment to accessible education while giving back to the community.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#84803E]/10 text-[#84803E] px-3 py-1.5 rounded-full text-sm font-bold">Conference Organizer</span>
                  <span className="bg-[#84803E]/10 text-[#84803E] px-3 py-1.5 rounded-full text-sm font-bold">Event Management</span>
                  <span className="bg-[#84803E]/10 text-[#84803E] px-3 py-1.5 rounded-full text-sm font-bold">Charity Initiative</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="border-l-4 border-[#153230] pl-6 md:pl-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-[#153230] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-[#153230] mb-2">1:1 Mentorship Program</h3>
                    <p className="text-sm md:text-base text-[#153230] font-bold mb-3">700+ Career Calls • 130+ Five-Star Reviews</p>
                  </div>
                </div>
                <p className="text-base md:text-lg text-[#153230]/80 leading-relaxed mb-4">
                  Providing personalized career guidance, technical interview preparation, and strategic job search support. Proven track record of helping developers at all levels land roles at top companies including FAANG, startups, and Fortune 500 companies.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#153230]/10 text-[#153230] px-3 py-1.5 rounded-full text-sm font-bold">Career Coaching</span>
                  <span className="bg-[#153230]/10 text-[#153230] px-3 py-1.5 rounded-full text-sm font-bold">Resume Reviews</span>
                  <span className="bg-[#153230]/10 text-[#153230] px-3 py-1.5 rounded-full text-sm font-bold">Interview Prep</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
          </section>
        </div>

        <div className="relative">
          <section className="sticky top-0 z-[100] bg-gradient-to-br from-[#4D7DA3] to-[#153230] text-white px-6 md:px-10 py-8 md:py-10 rounded-[32px] mx-4 mt-6 shadow-2xl">
            <ScrollReveal>
              <h2 className="text-2xl md:text-4xl font-black mb-6 leading-tight">
                Thought Leadership & Education
              </h2>
              <p className="text-base md:text-lg max-w-4xl leading-relaxed opacity-90">
                Sharing knowledge and insights across multiple platforms to help developers navigate their careers and master the technical landscape.
              </p>
            </ScrollReveal>
          </section>

          <section className="relative z-[50] bg-white rounded-[32px] mx-4 mt-6 px-6 md:px-12 py-16 shadow-lg border border-[#E2F3F2]">
            <div className="grid md:grid-cols-2 gap-6">
              <ScrollReveal delay={100}>
                <div className="bg-gradient-to-br from-[#4D7DA3] to-[#153230] text-white rounded-2xl p-6 border border-[#4D7DA3]/20 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-black">The Programming Podcast</h3>
                  </div>
                  <p className="text-sm opacity-90 mb-3">
                    Host of popular tech podcast featuring industry leaders, career advice, and technical deep-dives. Thousands of downloads helping developers level up.
                  </p>
                  <div className="text-xs opacity-70 font-bold">60+ Episodes • Top Tech Podcast</div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="bg-gradient-to-br from-[#84803E] to-[#6a6731] text-white rounded-2xl p-6 border border-[#84803E]/20 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-black">LinkedIn Learning Courses</h3>
                  </div>
                  <p className="text-sm opacity-90 mb-3">
                    Creator of free educational content including The OFFICIAL LinkedIn Series, helping job seekers optimize profiles and land opportunities.
                  </p>
                  <div className="text-xs opacity-70 font-bold">Free Resources • Career Development</div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="bg-gradient-to-br from-[#153230] to-[#0f2624] text-white rounded-2xl p-6 border border-[#153230]/20 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-black">Conference Speaking</h3>
                  </div>
                  <p className="text-sm opacity-90 mb-3">
                    Regular speaker at major tech conferences and meetups, sharing insights on career development, community building, and technical leadership.
                  </p>
                  <div className="text-xs opacity-70 font-bold">60+ Speaking Engagements</div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="bg-gradient-to-br from-[#4D7DA3] to-[#3d6a8a] text-white rounded-2xl p-6 border border-[#4D7DA3]/20 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-black">Technical Workshops</h3>
                  </div>
                  <p className="text-sm opacity-90 mb-3">
                    Leading hands-on technical workshops covering modern development practices, career strategies, and emerging technologies for developers at all levels.
                  </p>
                  <div className="text-xs opacity-70 font-bold">Monthly Workshops • Hands-on Training</div>
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
              I bring a unique combination of technical expertise, community leadership, and proven mentorship success to help your organization thrive.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <ScrollReveal delay={100}>
              <TiltCard>
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#4D7DA3] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-black text-[#153230] mb-3">Proven Community Impact</h3>
                      <p className="text-[#153230]/70 text-sm md:text-base leading-relaxed">
                        Built and scaled a 12,000+ member developer community from scratch, demonstrating expertise in community engagement, event management, and creating lasting value for members. Skilled at fostering inclusive environments where developers thrive.
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
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-black text-[#153230] mb-3">Technical Leadership</h3>
                      <p className="text-[#153230]/70 text-sm md:text-base leading-relaxed">
                        As Director of Technology, I combine hands-on technical expertise with strategic vision. Experience managing technical teams, architecting solutions, and driving innovation while maintaining focus on business objectives and team growth.
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
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-black text-[#153230] mb-3">Mentorship Excellence</h3>
                      <p className="text-[#153230]/70 text-sm md:text-base leading-relaxed">
                        Over 700 1-on-1 mentorship calls with 130+ five-star reviews demonstrate my ability to develop talent, provide actionable guidance, and create measurable career outcomes. Track record of helping developers at all levels reach their goals.
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
                      <svg className="w-6 h-6 text-[#4D7DA3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-black text-[#153230] mb-3">Public Speaking & Brand Building</h3>
                      <p className="text-[#153230]/70 text-sm md:text-base leading-relaxed">
                        Experienced conference speaker and content creator with proven ability to represent organizations, engage audiences, and build brand awareness. Comfortable in front of large audiences and skilled at translating technical concepts for diverse stakeholders.
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
          <section className="sticky top-0 z-[100] bg-white rounded-[32px] mx-4 mt-6 shadow-xl border border-[#E2F3F2] px-6 md:px-10 py-8 md:py-10">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#153230] mb-6 leading-tight">
                Resources &<br />Initiatives
              </h2>
              <p className="text-base md:text-lg text-[#153230]/70 max-w-4xl leading-relaxed">
                Turning vision into impact through conferences, education, and community-driven initiatives that create real opportunities for developers worldwide.
              </p>
            </ScrollReveal>
          </section>

          <section className="relative z-[50] bg-white rounded-[32px] mx-4 mt-6 px-6 md:px-12 py-16 shadow-lg border border-[#E2F3F2]">
            <div className="space-y-6">
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
    </div>
  );
}
