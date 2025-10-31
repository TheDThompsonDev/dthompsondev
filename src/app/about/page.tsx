"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { TiltCard } from "@/components/TiltCard";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

interface Achievement {
  year: string;
  title: string;
  description: string;
  color: string;
}

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  audience: "executive" | "developer";
  color: string;
}

const achievements: Achievement[] = [
  {
    year: "2025",
    title: "Commit Your Code Conference 2025",
    description: "Grew conference to 8,960 attendees (300% YoY growth), trending globally on social media",
    color: "#4D7DA3"
  },
  {
    year: "2024",
    title: "Director of Technology",
    description: "Leading technical strategy, team development, and engineering excellence initiatives",
    color: "#153230"
  },
  {
    year: "2023",
    title: "Community Scale: 12K+ Members",
    description: "Built Dallas Software Developers Group into one of the most active dev communities globally",
    color: "#84803E"
  },
  {
    year: "2022",
    title: "500+ Career Placements",
    description: "Directly helped 500+ developers land roles at top companies through mentorship and community",
    color: "#4D7DA3"
  }
];

const services: Service[] = [
  {
    icon: "🎯",
    title: "Technical Advisory",
    description: "Strategic guidance for organizations navigating complex technical challenges and scaling their engineering teams.",
    features: [
      "Engineering team structure & scaling",
      "Technical strategy & roadmap planning",
      "Developer experience optimization",
      "Community building for technical brands"
    ],
    audience: "executive",
    color: "#153230"
  },
  {
    icon: "🚀",
    title: "Executive Consulting",
    description: "Leadership consulting for companies looking to build developer communities, improve retention, or enhance technical culture.",
    features: [
      "Engineering leadership coaching",
      "Team alignment & productivity",
      "Technical hiring & retention strategies",
      "Developer relations programs"
    ],
    audience: "executive",
    color: "#4D7DA3"
  },
  {
    icon: "💡",
    title: "1-on-1 Career Mentorship",
    description: "Personalized guidance to help developers at any level advance their careers, nail interviews, and negotiate better offers.",
    features: [
      "Career transition strategy",
      "Technical interview preparation",
      "Resume & portfolio review",
      "Salary negotiation coaching"
    ],
    audience: "developer",
    color: "#84803E"
  },
  {
    icon: "🎤",
    title: "Speaking & Workshops",
    description: "Engaging keynotes and workshops on community building, career development, and technical leadership.",
    features: [
      "Conference keynotes",
      "Technical workshops",
      "Corporate training sessions",
      "Panel moderation"
    ],
    audience: "executive",
    color: "#4D7DA3"
  }
];

const companyLogos = [
  "Google", "Microsoft", "Amazon", "Spotify", "Stripe", 
  "Digital Ocean", "GitHub", "Grafana Labs", "Vonage", "Appwrite"
];

export default function AboutPage() {
  const [activeAudience, setActiveAudience] = useState<"all" | "executive" | "developer">("all");

  const filteredServices = activeAudience === "all" 
    ? services 
    : services.filter(s => s.audience === activeAudience);

  return (
    <>
      <div className="min-h-screen bg-[#E2F3F2] pb-20 lg:pb-0">
        <div className="max-w-[1400px] mx-auto">
          {/* Header Card */}
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
                    href="/about"
                    className="text-[#153230] font-semibold"
                  >
                    About
                  </Link>
                </nav>

                <Link
                  href="/#contact"
                  className="hidden lg:flex bg-[#153230] text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-[#4D7DA3] hover:scale-105 transition-all duration-300 font-semibold text-sm md:text-base whitespace-nowrap"
                >
                  Contact Me
                </Link>
              </div>
            </header>

            {/* Hero Section */}
            <section className="relative px-4 sm:px-8 md:px-16 py-12 md:py-20">
              <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-gradient-to-br from-[#4D7DA3]/10 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-[400px] h-[500px] bg-gradient-to-tr from-[#84803E]/8 to-transparent rounded-full blur-3xl"></div>

              <div className="relative z-10 max-w-5xl mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2.5 bg-[#153230] text-white px-4 py-2 rounded-full shadow-lg mb-6">
                      <div className="relative flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse"></div>
                        <div className="absolute w-2 h-2 bg-[#4ade80] rounded-full animate-ping"></div>
                      </div>
                      <span className="text-sm font-bold tracking-wide">
                        ACCEPTING EXECUTIVE CALLS & MENTORSHIP BOOKINGS
                      </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#153230] leading-tight mb-6">
                      Danny Thompson
                    </h1>

                    <p className="text-xl md:text-2xl font-bold text-[#4D7DA3] mb-6">
                      Director of Technology • Executive Advisor • Community Leader
                    </p>

                    <p className="text-lg md:text-xl text-[#153230]/70 leading-relaxed max-w-3xl mx-auto">
                      I help organizations scale their engineering teams and build thriving developer 
                      communities, while mentoring individual developers to accelerate their careers. 
                      <span className="text-[#4D7DA3] font-bold"> When things are too complex, 
                      priorities are unclear, and results matter—they call me.</span>
                    </p>
                  </div>
                </ScrollReveal>

                {/* Key Metrics */}
                <ScrollReveal delay={100}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {[
                      { value: "450K+", label: "Developer Reach", icon: "🌍" },
                      { value: "12K+", label: "Community Built", icon: "👥" },
                      { value: "700+", label: "Mentorship Calls", icon: "💬" },
                      { value: "200+", label: "Events Organized", icon: "🎪" }
                    ].map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#4D7DA3]/10 text-center hover:scale-105 transition-all group"
                      >
                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                          {metric.icon}
                        </div>
                        <div className="text-2xl md:text-3xl font-black text-[#4D7DA3] mb-1">
                          {metric.value}
                        </div>
                        <div className="text-xs md:text-sm text-[#153230]/70 font-bold">
                          {metric.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </section>
          </div>

          {/* The Value I Bring Section */}
          <section className="mx-4 mt-6">
            <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-[#4D7DA3]/10">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-black text-[#153230] mb-8 text-center">
                  The Value I Bring
                </h2>
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <TiltCard>
                    <div className="bg-gradient-to-br from-[#153230]/10 to-transparent rounded-2xl p-6 h-full border border-[#153230]/10">
                      <div className="w-16 h-16 bg-[#153230] rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg">
                        🎯
                      </div>
                      <h3 className="text-xl font-black text-[#153230] mb-3">
                        Clarity in Complexity
                      </h3>
                      <p className="text-sm text-[#153230]/70 leading-relaxed">
                        I cut through technical debt, alignment issues, and organizational chaos 
                        to deliver clear strategies that actually work. No fluff, no theory—just 
                        actionable solutions.
                      </p>
                    </div>
                  </TiltCard>

                  <TiltCard>
                    <div className="bg-gradient-to-br from-[#4D7DA3]/10 to-transparent rounded-2xl p-6 h-full border border-[#4D7DA3]/10">
                      <div className="w-16 h-16 bg-[#4D7DA3] rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg">
                        🚀
                      </div>
                      <h3 className="text-xl font-black text-[#153230] mb-3">
                        Proven Track Record
                      </h3>
                      <p className="text-sm text-[#153230]/70 leading-relaxed">
                        From scaling a conference to 9,000 attendees to building communities of 
                        12K+ members, I don't just advise—I execute. My results speak for themselves.
                      </p>
                    </div>
                  </TiltCard>

                  <TiltCard>
                    <div className="bg-gradient-to-br from-[#84803E]/10 to-transparent rounded-2xl p-6 h-full border border-[#84803E]/10">
                      <div className="w-16 h-16 bg-[#84803E] rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg">
                        💪
                      </div>
                      <h3 className="text-xl font-black text-[#153230] mb-3">
                        Developer-First Mindset
                      </h3>
                      <p className="text-sm text-[#153230]/70 leading-relaxed">
                        I understand developers because I am one. I know what motivates them, 
                        what frustrates them, and how to build cultures where they thrive.
                      </p>
                    </div>
                  </TiltCard>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Journey/Timeline Section */}
          <section className="mx-4 mt-6">
            <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-[#4D7DA3]/10">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-black text-[#153230] mb-8 text-center">
                  Journey & Milestones
                </h2>
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-6">
                    {achievements.map((achievement, index) => (
                      <ScrollReveal key={achievement.year} delay={index * 100}>
                        <div className="flex gap-6 group">
                          <div className="flex flex-col items-center">
                            <div 
                              className="w-16 h-16 rounded-full flex items-center justify-center font-black text-white text-sm shadow-lg group-hover:scale-110 transition-transform"
                              style={{ backgroundColor: achievement.color }}
                            >
                              {achievement.year}
                            </div>
                            {index < achievements.length - 1 && (
                              <div className="w-1 flex-1 bg-gradient-to-b from-[#4D7DA3] to-[#4D7DA3]/20 mt-2"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <div className="bg-gradient-to-r from-[#E2F3F2] to-white rounded-2xl p-6 border border-[#4D7DA3]/10 hover:shadow-xl hover:scale-105 transition-all">
                              <h3 className="text-xl font-black text-[#153230] mb-2">
                                {achievement.title}
                              </h3>
                              <p className="text-sm text-[#153230]/70 leading-relaxed">
                                {achievement.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Companies I've Worked With */}
          <section className="mx-4 mt-6">
            <div className="bg-gradient-to-br from-[#153230] to-[#4D7DA3] rounded-[32px] p-8 md:p-12 shadow-xl overflow-hidden relative">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              </div>
              <ScrollReveal>
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4 text-center">
                    Speakers & Sponsors I've Worked With
                  </h2>
                  <p className="text-white/80 text-center mb-8 max-w-2xl mx-auto">
                    Through conferences, community events, and advisory work, I've collaborated 
                    with leading tech companies and industry experts.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {companyLogos.map((company, index) => (
                      <motion.div
                        key={company}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 hover:bg-white/20 hover:scale-110 transition-all"
                      >
                        <span className="text-white font-bold">{company}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Services Section */}
          <section className="mx-4 mt-6">
            <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-[#4D7DA3]/10">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-black text-[#153230] mb-4 text-center">
                  How I Can Help You
                </h2>
                <p className="text-center text-[#153230]/70 mb-8 max-w-3xl mx-auto">
                  Whether you're an executive looking to scale your engineering organization or 
                  a developer looking to accelerate your career, I provide tailored guidance that delivers results.
                </p>

                {/* Audience Filter */}
                <div className="flex justify-center gap-3 mb-8">
                  {[
                    { id: "all" as const, label: "All Services", icon: "🌟" },
                    { id: "executive" as const, label: "For Executives", icon: "👔" },
                    { id: "developer" as const, label: "For Developers", icon: "💻" }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setActiveAudience(option.id)}
                      className={`
                        px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300
                        ${activeAudience === option.id
                          ? "bg-[#153230] text-white scale-105 shadow-lg"
                          : "bg-[#E2F3F2] text-[#153230]/70 hover:text-[#153230] hover:scale-105"
                        }
                      `}
                    >
                      <span className="mr-2">{option.icon}</span>
                      {option.label}
                    </button>
                  ))}
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredServices.map((service, index) => (
                    <ScrollReveal key={service.title} delay={index * 100}>
                      <TiltCard>
                        <div className="bg-gradient-to-br from-white to-[#E2F3F2] rounded-2xl p-6 border border-[#4D7DA3]/10 h-full hover:shadow-xl transition-all">
                          <div 
                            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg"
                            style={{ backgroundColor: `${service.color}15` }}
                          >
                            {service.icon}
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <h3 className="text-xl font-black text-[#153230]">
                              {service.title}
                            </h3>
                            <span 
                              className="px-2 py-1 rounded-full text-[10px] font-black text-white"
                              style={{ backgroundColor: service.color }}
                            >
                              {service.audience === "executive" ? "EXEC" : "DEV"}
                            </span>
                          </div>
                          <p className="text-sm text-[#153230]/70 leading-relaxed mb-4">
                            {service.description}
                          </p>
                          <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-[#153230]/70">
                                <svg className="w-5 h-5 text-[#4D7DA3] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TiltCard>
                    </ScrollReveal>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="mx-4 mt-6">
            <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-[#4D7DA3]/10">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-black text-[#153230] mb-8 text-center">
                  What People Say
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      type: "Executive",
                      name: "Sarah Johnson",
                      role: "VP of Engineering @ Tech Startup",
                      quote: "Danny's guidance helped us restructure our engineering team and improve retention by 40%. His understanding of both technical and people challenges is unmatched.",
                      color: "#153230"
                    },
                    {
                      type: "Developer",
                      name: "Michael Chen",
                      role: "Senior Engineer @ Google",
                      quote: "Danny's mentorship was instrumental in my transition from mid-level to senior. His practical advice on interviewing and negotiation helped me increase my offer by $60K.",
                      color: "#4D7DA3"
                    },
                    {
                      type: "Executive",
                      name: "Jennifer Martinez",
                      role: "CTO @ Series B Startup",
                      quote: "We brought Danny in to help build our developer community strategy. Within 6 months, we went from 0 to 3,000 engaged developers. His execution is flawless.",
                      color: "#84803E"
                    },
                    {
                      type: "Developer",
                      name: "Alex Williams",
                      role: "Full Stack Developer @ Stripe",
                      quote: "I was stuck in my career for 2 years. After 3 calls with Danny, I had a clear roadmap, revamped my approach, and landed my dream role at Stripe within 8 weeks.",
                      color: "#4D7DA3"
                    }
                  ].map((testimonial, index) => (
                    <ScrollReveal key={testimonial.name} delay={index * 100}>
                      <div className="bg-gradient-to-br from-[#E2F3F2] to-white rounded-2xl p-6 border border-[#4D7DA3]/10 hover:shadow-xl hover:scale-105 transition-all h-full">
                        <div className="flex items-center gap-3 mb-4">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: testimonial.color }}
                          >
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-black text-[#153230]">{testimonial.name}</div>
                            <div className="text-xs text-[#153230]/60">{testimonial.role}</div>
                          </div>
                          <span 
                            className="ml-auto px-2 py-1 rounded-full text-[10px] font-black text-white"
                            style={{ backgroundColor: testimonial.color }}
                          >
                            {testimonial.type}
                          </span>
                        </div>
                        <p className="text-sm text-[#153230]/80 leading-relaxed italic">
                          "{testimonial.quote}"
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Dual CTA Section */}
          <section className="mx-4 mt-6 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Executive CTA */}
              <ScrollReveal>
                <div className="relative overflow-hidden rounded-[32px] group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#153230] to-[#4D7DA3]"></div>
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                  </div>
                  <div className="relative p-8 md:p-12 text-center">
                    <div className="text-5xl mb-4">👔</div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                      For Executives & Leaders
                    </h3>
                    <p className="text-white/90 mb-6 leading-relaxed">
                      Strategic advisory for engineering teams, community building, and 
                      organizational challenges that require proven expertise.
                    </p>
                    <Link
                      href="/#contact"
                      className="inline-block bg-white text-[#153230] px-8 py-4 rounded-full font-bold hover:scale-105 hover:shadow-2xl transition-all duration-300"
                    >
                      Schedule Executive Call
                    </Link>
                  </div>
                </div>
              </ScrollReveal>

              {/* Developer CTA */}
              <ScrollReveal delay={100}>
                <div className="relative overflow-hidden rounded-[32px] group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#84803E] to-[#4D7DA3]"></div>
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
                  </div>
                  <div className="relative p-8 md:p-12 text-center">
                    <div className="text-5xl mb-4">💻</div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                      For Software Developers
                    </h3>
                    <p className="text-white/90 mb-6 leading-relaxed">
                      1-on-1 mentorship to accelerate your career, nail interviews, and 
                      negotiate offers that reflect your true value.
                    </p>
                    <Link
                      href="/#contact"
                      className="inline-block bg-white text-[#84803E] px-8 py-4 rounded-full font-bold hover:scale-105 hover:shadow-2xl transition-all duration-300"
                    >
                      Book Mentorship Call
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </div>
      </div>
      <BottomNav />
    </>
  );
}

