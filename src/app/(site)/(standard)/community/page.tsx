"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { TiltCard } from "@/components/TiltCard";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CommunityTab = "overview" | "conferences" | "meetups" | "mentorship" | "speaking";

interface CommunityMetric {
  value: string;
  label: string;
  icon: string;
  color: string;
}

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

const metrics: CommunityMetric[] = [
  { value: "12K+", label: "Community Members", icon: "👥", color: "#4D7DA3" },
  { value: "8,960", label: "Conference Attendees", icon: "🎉", color: "#84803E" },
  { value: "700+", label: "Mentorship Calls", icon: "💬", color: "#153230" },
  { value: "60+", label: "Speaking Events", icon: "🎤", color: "#4D7DA3" },
  { value: "500+", label: "Career Placements", icon: "💼", color: "#84803E" },
  { value: "200+", label: "Meetups Hosted", icon: "📅", color: "#153230" },
];

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Senior Software Engineer @ Google",
    quote: "Danny's mentorship was instrumental in helping me transition from bootcamp grad to landing my dream job at Google. His practical advice and genuine support made all the difference.",
    avatar: "SC"
  },
  {
    name: "Marcus Johnson",
    role: "Engineering Manager @ Microsoft",
    quote: "The Dallas Software Developers community Danny built is unlike anything else. It's where I found my first job, my best friends, and countless opportunities to grow.",
    avatar: "MJ"
  },
  {
    name: "Priya Patel",
    role: "Full Stack Developer @ Stripe",
    quote: "Commit Your Code Conference changed my career trajectory. The accessibility and quality of speakers was world-class, and it's 100% free. Incredible.",
    avatar: "PP"
  }
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<CommunityTab>("overview");

  return (
    <>
      {/* Hero Section */}
      <section className="relative px-4 sm:px-8 md:px-16 py-12 md:py-20">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-gradient-to-br from-[#4D7DA3]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#84803E]/8 to-transparent rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 bg-[#153230] text-white px-4 py-2 rounded-full shadow-lg mb-8">
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse"></div>
                <div className="absolute w-2 h-2 bg-[#4ade80] rounded-full animate-ping"></div>
              </div>
              <span className="text-sm font-bold tracking-wide">
                BUILDING COMMUNITIES • CHANGING LIVES
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#153230] leading-tight mb-6">
              Community{" "}
              <span className="text-[#4D7DA3]">
                Builder,
              </span>
              <br />
              Career{" "}
              <span className="text-[#84803E]">
                Champion
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#153230]/70 leading-relaxed max-w-3xl mx-auto mb-12">
              From organizing Dallas's premier tech conference to building one of the most active developer
              communities globally, I've dedicated my career to creating spaces where developers thrive.
              <span className="text-[#4D7DA3] font-bold"> Real impact. Real careers. Real community.</span>
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-[#4D7DA3]/10 hover:border-[#4D7DA3]/30 hover:scale-105 transition-all duration-300 group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {metric.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-black mb-1" style={{ color: metric.color }}>
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

      {/* Tab Navigation */}
      <section className="mx-4 mt-6">
        <ScrollReveal>
          <div className="bg-white rounded-2xl p-3 shadow-lg border border-[#4D7DA3]/10 overflow-x-auto">
            <div className="flex gap-2 min-w-max md:min-w-0 md:justify-center">
              {[
                { id: "overview" as CommunityTab, label: "Overview", icon: "🌟" },
                { id: "conferences" as CommunityTab, label: "Conferences", icon: "🎪" },
                { id: "meetups" as CommunityTab, label: "Meetups", icon: "🤝" },
                { id: "mentorship" as CommunityTab, label: "Mentorship", icon: "💡" },
                { id: "speaking" as CommunityTab, label: "Speaking", icon: "🎤" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-4 md:px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300
                    ${activeTab === tab.id
                      ? "bg-[#153230] text-white scale-105 shadow-lg"
                      : "bg-transparent text-[#153230]/70 hover:text-[#153230] hover:bg-[#E2F3F2]"
                    }
                  `}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Tab Content */}
      <section className="mx-4 mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && <OverviewTab />}
            {activeTab === "conferences" && <ConferencesTab />}
            {activeTab === "meetups" && <MeetupsTab />}
            {activeTab === "mentorship" && <MentorshipTab />}
            {activeTab === "speaking" && <SpeakingTab />}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Testimonials Section */}
      <section className="mx-4 mt-12 mb-6">
        <ScrollReveal>
          <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-[#4D7DA3]/10">
            <h2 className="text-3xl md:text-4xl font-black text-[#153230] mb-8 text-center">
              What the Community Says
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <ScrollReveal key={testimonial.name} delay={index * 100}>
                  <div className="bg-gradient-to-br from-[#E2F3F2] to-white rounded-2xl p-6 border border-[#4D7DA3]/10 hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#4D7DA3] rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-black text-[#153230]">{testimonial.name}</div>
                        <div className="text-xs text-[#153230]/60">{testimonial.role}</div>
                      </div>
                    </div>
                    <p className="text-sm text-[#153230]/80 leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA Section */}
      <section className="relative mx-4 mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#153230] to-[#4D7DA3] rounded-[32px]" />

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        </div>

        <div className="relative px-8 md:px-16 py-16 md:py-20 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Ready to Join the Community?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Whether you're looking to connect, learn, or grow your career,
              there's a place for you in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://discord.gg/dallasdevs"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#153230] px-8 py-4 rounded-full font-bold hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                Join Discord Community
              </a>
              <Link
                href="/#contact"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#153230] hover:scale-105 transition-all duration-300"
              >
                Work With Me
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-[#4D7DA3]/10">
        <h2 className="text-3xl md:text-4xl font-black text-[#153230] mb-6">
          Community Impact Overview
        </h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-[#153230]/80 leading-relaxed mb-6">
            Over the past 5+ years, I've built and scaled multiple community initiatives that have
            directly impacted thousands of developers' careers. From organizing conferences that
            trend globally to running weekly meetups that foster genuine connections, my approach
            to community building focuses on <span className="text-[#4D7DA3] font-bold">authenticity,
              accessibility, and measurable impact</span>.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <TiltCard>
              <div className="bg-gradient-to-br from-[#4D7DA3]/10 to-[#4D7DA3]/5 rounded-2xl p-6 h-full">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-xl font-black text-[#153230] mb-3">Mission-Driven</h3>
                <p className="text-sm text-[#153230]/70 leading-relaxed">
                  Every initiative is designed to create real opportunities for developers,
                  whether that's landing their first job, transitioning careers, or advancing
                  to senior positions.
                </p>
              </div>
            </TiltCard>

            <TiltCard>
              <div className="bg-gradient-to-br from-[#84803E]/10 to-[#84803E]/5 rounded-2xl p-6 h-full">
                <div className="text-3xl mb-3">🌍</div>
                <h3 className="text-xl font-black text-[#153230] mb-3">Global Reach</h3>
                <p className="text-sm text-[#153230]/70 leading-relaxed">
                  While rooted in Dallas, our community has grown to include developers
                  worldwide, with online events and resources reaching 450K+ developers globally.
                </p>
              </div>
            </TiltCard>

            <TiltCard>
              <div className="bg-gradient-to-br from-[#153230]/10 to-[#153230]/5 rounded-2xl p-6 h-full">
                <div className="text-3xl mb-3">💪</div>
                <h3 className="text-xl font-black text-[#153230] mb-3">Sustainable Growth</h3>
                <p className="text-sm text-[#153230]/70 leading-relaxed">
                  Our communities aren't built on hype—they're built on systems, processes,
                  and genuine value that keeps members engaged for years, not weeks.
                </p>
              </div>
            </TiltCard>

            <TiltCard>
              <div className="bg-gradient-to-br from-[#4D7DA3]/10 to-[#84803E]/5 rounded-2xl p-6 h-full">
                <div className="text-3xl mb-3">🔓</div>
                <h3 className="text-xl font-black text-[#153230] mb-3">Always Accessible</h3>
                <p className="text-sm text-[#153230]/70 leading-relaxed">
                  Free conferences, free resources, open Discord—we believe in removing
                  barriers so everyone has access to opportunities regardless of budget.
                </p>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConferencesTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-[#4D7DA3]/10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-[#4D7DA3] rounded-2xl flex items-center justify-center text-3xl shadow-lg">
            🎪
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#153230]">
              Commit Your Code Conference
            </h2>
            <p className="text-[#4D7DA3] font-bold">Dallas's Premier Tech Conference</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#E2F3F2] rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-[#4D7DA3]">8,960</div>
            <div className="text-sm text-[#153230]/70 font-bold">Total Attendees</div>
          </div>
          <div className="bg-[#E2F3F2] rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-[#84803E]">300%</div>
            <div className="text-sm text-[#153230]/70 font-bold">Growth YoY</div>
          </div>
          <div className="bg-[#E2F3F2] rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-[#153230]">60</div>
            <div className="text-sm text-[#153230]/70 font-bold">Speakers</div>
          </div>
          <div className="bg-[#E2F3F2] rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-[#4D7DA3]">100%</div>
            <div className="text-sm text-[#153230]/70 font-bold">Charity Event</div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="text-2xl font-black text-[#153230]">Conference Highlights</h3>
          <ul className="space-y-3">
            {[
              "Trended globally on social media for 3 weeks post-event",
              "37% of attendees were first-time conference goers",
              "3 concurrent tracks covering frontend, backend, and career development",
              "Speakers from Google, Microsoft, Digital Ocean, Spotify, and more",
              "Sponsors: GitHub, Grafana Labs, Vonage, Appwrite, Yum! Brands",
              "Both in-person (860) and online (8,100) attendance options"
            ].map((highlight, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#4D7DA3] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-[#153230]/80">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-r from-[#4D7DA3]/10 to-[#84803E]/10 rounded-xl p-6 border border-[#4D7DA3]/20">
          <h4 className="text-xl font-black text-[#153230] mb-3">Why It Matters</h4>
          <p className="text-[#153230]/80 leading-relaxed">
            Commit Your Code Conference proves that high-quality technical education doesn't
            have to come with a $1,000+ price tag. By making it 100% free and accessible,
            we've democratized access to world-class speakers and created pathways for
            developers who otherwise couldn't afford traditional conferences.
          </p>
        </div>
      </div>
    </div>
  );
}

function MeetupsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-[#4D7DA3]/10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-[#84803E] rounded-2xl flex items-center justify-center text-3xl shadow-lg">
            🤝
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#153230]">
              Dallas Software Developers Group
            </h2>
            <p className="text-[#84803E] font-bold">12,000+ Active Developer Community</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#E2F3F2] rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-[#84803E]">12K+</div>
            <div className="text-sm text-[#153230]/70 font-bold">Members</div>
          </div>
          <div className="bg-[#E2F3F2] rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-[#4D7DA3]">200+</div>
            <div className="text-sm text-[#153230]/70 font-bold">Meetups</div>
          </div>
          <div className="bg-[#E2F3F2] rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-[#153230]">500+</div>
            <div className="text-sm text-[#153230]/70 font-bold">Placements</div>
          </div>
          <div className="bg-[#E2F3F2] rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-[#84803E]">5+</div>
            <div className="text-sm text-[#153230]/70 font-bold">Years</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#84803E]/10 to-transparent rounded-xl p-6 border border-[#84803E]/20">
            <h3 className="text-xl font-black text-[#153230] mb-3">Weekly Meetups</h3>
            <p className="text-sm text-[#153230]/70 mb-4 leading-relaxed">
              Every week, we bring together developers of all levels for networking,
              learning, and collaboration. From technical workshops to career panels,
              there's always something valuable happening.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#84803E] text-white rounded-full text-xs font-bold">
                Technical Talks
              </span>
              <span className="px-3 py-1 bg-[#84803E] text-white rounded-full text-xs font-bold">
                Networking
              </span>
              <span className="px-3 py-1 bg-[#84803E] text-white rounded-full text-xs font-bold">
                Code Reviews
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#4D7DA3]/10 to-transparent rounded-xl p-6 border border-[#4D7DA3]/20">
            <h3 className="text-xl font-black text-[#153230] mb-3">Discord Community</h3>
            <p className="text-sm text-[#153230]/70 mb-4 leading-relaxed">
              Our Discord server is active 24/7 with job postings, technical discussions,
              code help, and genuine friendships. It's not just a Slack alternative—it's
              where careers are built.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#4D7DA3] text-white rounded-full text-xs font-bold">
                Daily Jobs
              </span>
              <span className="px-3 py-1 bg-[#4D7DA3] text-white rounded-full text-xs font-bold">
                Study Groups
              </span>
              <span className="px-3 py-1 bg-[#4D7DA3] text-white rounded-full text-xs font-bold">
                24/7 Support
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-black text-[#153230]">Community Offerings</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "💼", title: "Job Board", desc: "Exclusive job postings from our network of 200+ companies" },
              { icon: "🎓", title: "Workshops", desc: "Monthly technical workshops on React, Node.js, system design, and more" },
              { icon: "🤝", title: "Mentorship", desc: "Connect with experienced developers for guidance and support" },
              { icon: "📚", title: "Resources", desc: "Curated learning materials, templates, and career guides" },
              { icon: "🎉", title: "Social Events", desc: "Happy hours, game nights, and casual hangouts for real connections" },
              { icon: "💡", title: "Project Collab", desc: "Team up on side projects and open source contributions" }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-[#4D7DA3]/10 rounded-xl p-4 hover:shadow-lg hover:scale-105 transition-all">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h4 className="font-black text-[#153230] mb-1">{item.title}</h4>
                <p className="text-xs text-[#153230]/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MentorshipTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-[#4D7DA3]/10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-[#153230] rounded-2xl flex items-center justify-center text-3xl shadow-lg">
            💡
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#153230]">
              1-on-1 Career Mentorship
            </h2>
            <p className="text-[#153230] font-bold">Personalized Guidance for Your Career</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#E2F3F2] rounded-xl p-6 text-center">
            <div className="text-4xl font-black text-[#153230]">700+</div>
            <div className="text-sm text-[#153230]/70 font-bold mt-1">Mentorship Calls</div>
          </div>
          <div className="bg-[#E2F3F2] rounded-xl p-6 text-center">
            <div className="text-4xl font-black text-[#4D7DA3]">130+</div>
            <div className="text-sm text-[#153230]/70 font-bold mt-1">Five-Star Reviews</div>
          </div>
          <div className="bg-[#E2F3F2] rounded-xl p-6 text-center">
            <div className="text-4xl font-black text-[#84803E]">4.9★</div>
            <div className="text-sm text-[#153230]/70 font-bold mt-1">Average Rating</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#153230]/5 to-[#4D7DA3]/5 rounded-2xl p-8 mb-8 border border-[#153230]/10">
          <h3 className="text-2xl font-black text-[#153230] mb-6">What I Help With</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "🎯",
                title: "Career Transitions",
                items: ["Breaking into tech", "Switching specializations", "Moving to senior roles", "Management transitions"]
              },
              {
                icon: "💼",
                title: "Job Search Strategy",
                items: ["Resume optimization", "Interview preparation", "Salary negotiation", "Offer evaluation"]
              },
              {
                icon: "🚀",
                title: "Skill Development",
                items: ["Learning roadmaps", "Project portfolio", "Technical leadership", "Communication skills"]
              },
              {
                icon: "🌱",
                title: "Career Growth",
                items: ["Personal branding", "Community building", "Speaking opportunities", "Side projects"]
              }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-[#4D7DA3]/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{category.icon}</div>
                  <h4 className="text-lg font-black text-[#153230]">{category.title}</h4>
                </div>
                <ul className="space-y-2">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-[#153230]/70">
                      <div className="w-1.5 h-1.5 bg-[#4D7DA3] rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#4D7DA3]/10 rounded-xl p-6 border border-[#4D7DA3]/20">
          <h4 className="text-xl font-black text-[#153230] mb-3">My Approach to Mentorship</h4>
          <p className="text-[#153230]/80 leading-relaxed mb-4">
            I don't believe in generic advice. Every mentorship call is tailored to your specific
            situation, goals, and challenges. Whether you're a bootcamp grad trying to land your
            first role or a senior engineer looking to make the leap to leadership, I provide
            actionable, practical guidance based on real experience—not theory.
          </p>
          <p className="text-[#153230]/80 leading-relaxed">
            My mentorship has helped developers land roles at Google, Microsoft, Amazon, Stripe,
            and hundreds of other companies. But more importantly, it's helped them build careers
            they're genuinely excited about.
          </p>
        </div>
      </div>
    </div>
  );
}

function SpeakingTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-[#4D7DA3]/10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-[#4D7DA3] rounded-2xl flex items-center justify-center text-3xl shadow-lg">
            🎤
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#153230]">
              Conference Speaking & Workshops
            </h2>
            <p className="text-[#4D7DA3] font-bold">Inspiring Developers Worldwide</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#E2F3F2] rounded-xl p-6 text-center">
            <div className="text-4xl font-black text-[#4D7DA3]">60+</div>
            <div className="text-sm text-[#153230]/70 font-bold mt-1">Speaking Engagements</div>
          </div>
          <div className="bg-[#E2F3F2] rounded-xl p-6 text-center">
            <div className="text-4xl font-black text-[#84803E]">450K+</div>
            <div className="text-sm text-[#153230]/70 font-bold mt-1">Developers Reached</div>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <h3 className="text-2xl font-black text-[#153230]">Speaking Topics</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Community Building at Scale",
                desc: "How to grow developer communities from 0 to 10,000+ members",
                color: "#4D7DA3"
              },
              {
                title: "Career Development in Tech",
                desc: "Strategies for advancing from junior to senior to leadership",
                color: "#84803E"
              },
              {
                title: "Breaking Into Tech",
                desc: "Practical advice for career changers and bootcamp grads",
                color: "#153230"
              },
              {
                title: "Technical Leadership",
                desc: "Transitioning from IC to management and leading teams effectively",
                color: "#4D7DA3"
              },
              {
                title: "Personal Branding for Developers",
                desc: "Building an authentic online presence that opens doors",
                color: "#84803E"
              },
              {
                title: "Conference Organization",
                desc: "Behind the scenes of running a 9,000-person tech conference",
                color: "#153230"
              }
            ].map((topic, index) => (
              <div key={index} className="bg-white border border-[#4D7DA3]/10 rounded-xl p-6 hover:shadow-lg hover:scale-105 transition-all group">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white font-bold text-xl"
                  style={{ backgroundColor: topic.color }}
                >
                  {index + 1}
                </div>
                <h4 className="text-lg font-black text-[#153230] mb-2">{topic.title}</h4>
                <p className="text-sm text-[#153230]/70 leading-relaxed">{topic.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#4D7DA3]/10 via-[#84803E]/10 to-[#153230]/10 rounded-2xl p-8 border border-[#4D7DA3]/20">
          <h3 className="text-2xl font-black text-[#153230] mb-4">Book Me to Speak</h3>
          <p className="text-[#153230]/80 leading-relaxed mb-6">
            I'm available for conference keynotes, workshop facilitation, panel discussions,
            and corporate training. My speaking style is energetic, authentic, and packed with
            actionable takeaways. I don't do generic motivation—I share real strategies, real
            stories, and real results.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-[#4D7DA3] text-white rounded-full text-sm font-bold">
              In-Person Events
            </span>
            <span className="px-4 py-2 bg-[#84803E] text-white rounded-full text-sm font-bold">
              Virtual Conferences
            </span>
            <span className="px-4 py-2 bg-[#153230] text-white rounded-full text-sm font-bold">
              Corporate Workshops
            </span>
            <span className="px-4 py-2 bg-[#4D7DA3] text-white rounded-full text-sm font-bold">
              Panel Moderation
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
