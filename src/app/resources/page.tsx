"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { TiltCard } from "@/components/TiltCard";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ResourceCategory = "all" | "guides" | "tools" | "templates" | "learning" | "community";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  icon: string;
  color: string;
  glowColor: string;
  link?: string;
  tag?: string;
  featured?: boolean;
  stats?: {
    users?: string;
    downloads?: string;
    rating?: string;
  };
}

const resources: Resource[] = [
  {
    id: "linkedin-series",
    title: "The OFFICIAL LinkedIn Series",
    description: "Comprehensive guide to optimizing your LinkedIn profile, networking strategically, and landing your dream job. Free video series trusted by thousands of developers.",
    category: "learning",
    icon: "📚",
    color: "#84803E",
    glowColor: "rgba(132, 128, 62, 0.4)",
    tag: "FREE",
    featured: true,
    stats: {
      users: "10K+",
      rating: "4.9★"
    }
  },
  {
    id: "interview-prep",
    title: "Technical Interview Masterclass",
    description: "Battle-tested strategies for acing technical interviews. Includes common questions, system design patterns, and behavioral prep from someone who's conducted 500+ interviews.",
    category: "guides",
    icon: "🎯",
    color: "#4D7DA3",
    glowColor: "rgba(77, 125, 163, 0.4)",
    tag: "POPULAR",
    featured: true,
    stats: {
      downloads: "5K+",
      rating: "5.0★"
    }
  },
  {
    id: "resume-templates",
    title: "Developer Resume Templates",
    description: "ATS-friendly resume templates that actually get you interviews. Optimized for software engineers, with real examples from FAANG+ companies.",
    category: "templates",
    icon: "📄",
    color: "#153230",
    glowColor: "rgba(21, 50, 48, 0.4)",
    tag: "NEW",
    stats: {
      downloads: "3.2K+"
    }
  },
  {
    id: "salary-negotiation",
    title: "Salary Negotiation Guide",
    description: "Learn how to negotiate like a pro. Real scripts, email templates, and strategies that have helped developers increase offers by $20K-$50K+.",
    category: "guides",
    icon: "💰",
    color: "#4D7DA3",
    glowColor: "rgba(77, 125, 163, 0.4)",
    stats: {
      users: "2.8K+"
    }
  },
  {
    id: "portfolio-builder",
    title: "Portfolio Project Ideas",
    description: "Stand-out project ideas that demonstrate real-world skills. Includes architecture diagrams, tech stack recommendations, and implementation guides.",
    category: "guides",
    icon: "🚀",
    color: "#84803E",
    glowColor: "rgba(132, 128, 62, 0.4)",
    stats: {
      downloads: "4.5K+"
    }
  },
  {
    id: "job-search-tracker",
    title: "Job Search Tracker Template",
    description: "Stay organized during your job hunt. Notion template for tracking applications, interviews, follow-ups, and offers. Never lose track of opportunities.",
    category: "tools",
    icon: "📊",
    color: "#153230",
    glowColor: "rgba(21, 50, 48, 0.4)",
    stats: {
      downloads: "6.1K+"
    }
  },
  {
    id: "networking-playbook",
    title: "Developer Networking Playbook",
    description: "Build genuine relationships that lead to opportunities. Message templates, conversation starters, and follow-up strategies for introverted developers.",
    category: "guides",
    icon: "🤝",
    color: "#4D7DA3",
    glowColor: "rgba(77, 125, 163, 0.4)",
    stats: {
      users: "3.5K+"
    }
  },
  {
    id: "discord-community",
    title: "Dallas Devs Discord",
    description: "Join 12,000+ developers in our active community. Daily job posts, code reviews, career advice, and weekly study groups. Free forever.",
    category: "community",
    icon: "💬",
    color: "#84803E",
    glowColor: "rgba(132, 128, 62, 0.4)",
    tag: "ACTIVE",
    featured: true,
    link: "https://discord.gg/dallasdevs",
    stats: {
      users: "12K+"
    }
  },
  {
    id: "learning-roadmap",
    title: "Full-Stack Learning Roadmap",
    description: "A clear, opinionated path from beginner to senior developer. Curated resources, project milestones, and realistic timelines for each stage.",
    category: "learning",
    icon: "🗺️",
    color: "#4D7DA3",
    glowColor: "rgba(77, 125, 163, 0.4)",
    stats: {
      users: "8.2K+"
    }
  },
  {
    id: "code-review-checklist",
    title: "Code Review Checklist",
    description: "Level up your code reviews with this comprehensive checklist. Covers security, performance, readability, and best practices across multiple languages.",
    category: "tools",
    icon: "✅",
    color: "#153230",
    glowColor: "rgba(21, 50, 48, 0.4)",
    stats: {
      downloads: "2.9K+"
    }
  },
  {
    id: "side-project-starter",
    title: "Side Project Starter Kit",
    description: "Launch your side project faster. Includes boilerplate code, deployment guides, marketing checklists, and monetization strategies.",
    category: "templates",
    icon: "⚡",
    color: "#84803E",
    glowColor: "rgba(132, 128, 62, 0.4)",
    stats: {
      downloads: "5.7K+"
    }
  },
  {
    id: "meetup-calendar",
    title: "Tech Events Calendar",
    description: "Never miss a meetup, conference, or workshop. Curated calendar of Dallas-Fort Worth tech events, plus virtual opportunities worldwide.",
    category: "community",
    icon: "📅",
    color: "#4D7DA3",
    glowColor: "rgba(77, 125, 163, 0.4)",
    tag: "UPDATED WEEKLY"
  }
];

const categories = [
  { id: "all" as ResourceCategory, label: "All Resources", icon: "🌟" },
  { id: "guides" as ResourceCategory, label: "Guides", icon: "📖" },
  { id: "tools" as ResourceCategory, label: "Tools", icon: "🛠️" },
  { id: "templates" as ResourceCategory, label: "Templates", icon: "📋" },
  { id: "learning" as ResourceCategory, label: "Learning", icon: "🎓" },
  { id: "community" as ResourceCategory, label: "Community", icon: "👥" },
];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState<ResourceCategory>("all");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredResources = activeCategory === "all" 
    ? resources 
    : resources.filter(r => r.category === activeCategory);

  const featuredResources = resources.filter(r => r.featured);

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
                    className="text-[#153230] font-semibold"
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
              <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-gradient-to-br from-[#4D7DA3]/10 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#84803E]/8 to-transparent rounded-full blur-3xl"></div>

              <div className="relative z-10 max-w-4xl mx-auto text-center">
                <ScrollReveal>
                  <div className="inline-flex items-center gap-2.5 bg-[#153230] text-white px-4 py-2 rounded-full shadow-lg mb-8">
                    <svg className="w-5 h-5 text-[#4ade80]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-bold tracking-wide">
                      100% FREE • NO SIGNUP REQUIRED
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#153230] leading-tight mb-6">
                    Level Up Your{" "}
                    <span className="text-[#4D7DA3]">
                      Developer Career
                    </span>
                  </h1>

                  <p className="text-lg md:text-xl text-[#153230]/70 leading-relaxed max-w-3xl mx-auto mb-12">
                    Curated resources, templates, and guides to help you land better jobs, 
                    negotiate higher salaries, and build a thriving career in tech. 
                    <span className="text-[#4D7DA3] font-bold"> All completely free.</span>
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-[#4D7DA3]/10">
                      <div className="text-2xl md:text-4xl font-black text-[#4D7DA3]">50K+</div>
                      <div className="text-xs md:text-sm text-[#153230]/70 font-bold mt-1">Downloads</div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-[#84803E]/10">
                      <div className="text-2xl md:text-4xl font-black text-[#84803E]">12</div>
                      <div className="text-xs md:text-sm text-[#153230]/70 font-bold mt-1">Resources</div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-[#153230]/10">
                      <div className="text-2xl md:text-4xl font-black text-[#153230]">4.9★</div>
                      <div className="text-xs md:text-sm text-[#153230]/70 font-bold mt-1">Rating</div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </section>
          </div>

          {/* Featured Resources Section */}
          {featuredResources.length > 0 && (
            <section className="mx-4 mt-6">
              <ScrollReveal>
                <h2 className="text-2xl md:text-3xl font-black text-[#153230] mb-6 px-2">
                  🔥 Featured Resources
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {featuredResources.map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TiltCard>
                        <div
                          className="relative bg-white rounded-2xl p-6 border-2 overflow-hidden group cursor-pointer h-full"
                          style={{ borderColor: resource.color }}
                          onMouseEnter={() => setHoveredCard(resource.id)}
                          onMouseLeave={() => setHoveredCard(null)}
                        >
                          {/* Glow Effect */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                            style={{ background: `radial-gradient(circle at center, ${resource.glowColor}, transparent)` }}
                          />

                          {/* Tag */}
                          {resource.tag && (
                            <div
                              className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-black text-white"
                              style={{ backgroundColor: resource.color }}
                            >
                              {resource.tag}
                            </div>
                          )}

                          <div className="relative z-10">
                            {/* Icon */}
                            <div
                              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg"
                              style={{ backgroundColor: `${resource.color}15` }}
                            >
                              {resource.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-black text-[#153230] mb-3 leading-tight">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-[#153230]/70 leading-relaxed mb-4">
                              {resource.description}
                            </p>

                            {/* Stats */}
                            {resource.stats && (
                              <div className="flex flex-wrap gap-3 mb-4">
                                {resource.stats.users && (
                                  <div className="flex items-center gap-1 text-xs text-[#153230]/60">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                    </svg>
                                    <span className="font-bold">{resource.stats.users} users</span>
                                  </div>
                                )}
                                {resource.stats.downloads && (
                                  <div className="flex items-center gap-1 text-xs text-[#153230]/60">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-bold">{resource.stats.downloads}</span>
                                  </div>
                                )}
                                {resource.stats.rating && (
                                  <div className="flex items-center gap-1 text-xs text-[#153230]/60">
                                    <span className="font-bold">{resource.stats.rating}</span>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* CTA Button */}
                            <button
                              className="w-full py-3 rounded-xl font-bold text-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                              style={{ backgroundColor: resource.color }}
                            >
                              Access Resource →
                            </button>
                          </div>
                        </div>
                      </TiltCard>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </section>
          )}

          {/* Category Filter */}
          <section className="mx-4 mt-12">
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-[#4D7DA3]/10">
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`
                        px-6 py-3 rounded-xl font-bold transition-all duration-300
                        ${activeCategory === category.id
                          ? "bg-[#153230] text-white scale-105 shadow-lg"
                          : "bg-[#E2F3F2] text-[#153230]/70 hover:text-[#153230] hover:scale-105"
                        }
                      `}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Resources Grid */}
          <section className="mx-4 mt-8 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredResources.map((resource, index) => (
                  <ScrollReveal key={resource.id} delay={index * 50}>
                    <div
                      className="bg-white rounded-2xl p-6 border border-[#4D7DA3]/10 hover:border-[#4D7DA3]/30 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group h-full flex flex-col"
                      onMouseEnter={() => setHoveredCard(resource.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Icon & Tag Row */}
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: `${resource.color}15` }}
                        >
                          {resource.icon}
                        </div>
                        {resource.tag && (
                          <span
                            className="px-2 py-1 rounded-full text-[10px] font-black text-white"
                            style={{ backgroundColor: resource.color }}
                          >
                            {resource.tag}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-black text-[#153230] mb-2 leading-tight">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-[#153230]/70 leading-relaxed mb-4 flex-grow">
                        {resource.description}
                      </p>

                      {/* Stats */}
                      {resource.stats && (
                        <div className="flex flex-wrap gap-3 mb-4 text-xs text-[#153230]/60">
                          {resource.stats.users && (
                            <div className="flex items-center gap-1">
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                              </svg>
                              <span className="font-semibold">{resource.stats.users}</span>
                            </div>
                          )}
                          {resource.stats.downloads && (
                            <div className="flex items-center gap-1">
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                              <span className="font-semibold">{resource.stats.downloads}</span>
                            </div>
                          )}
                          {resource.stats.rating && (
                            <div className="flex items-center gap-1">
                              <span className="font-semibold">{resource.stats.rating}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* CTA */}
                      <button
                        className="w-full py-2.5 rounded-lg font-bold text-sm transition-all duration-300 group-hover:shadow-lg"
                        style={{
                          backgroundColor: hoveredCard === resource.id ? resource.color : `${resource.color}15`,
                          color: hoveredCard === resource.id ? "#ffffff" : resource.color
                        }}
                      >
                        Get Resource →
                      </button>
                    </div>
                  </ScrollReveal>
                ))}
              </motion.div>
            </AnimatePresence>
          </section>

          {/* CTA Section */}
          <section className="relative mx-4 mb-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#153230] via-[#4D7DA3] to-[#84803E] rounded-[32px]" />
            
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
            </div>

            <div className="relative px-8 md:px-16 py-16 md:py-20 text-center">
              <ScrollReveal>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                  Want More Resources?
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join our community of 12,000+ developers to get exclusive resources, 
                  early access to new content, and personalized career guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/#contact"
                    className="bg-white text-[#153230] px-8 py-4 rounded-full font-bold hover:scale-105 hover:shadow-2xl transition-all duration-300"
                  >
                    Get in Touch
                  </Link>
                  <Link
                    href="/blog"
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#153230] hover:scale-105 transition-all duration-300"
                  >
                    Read the Blog
                  </Link>
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

