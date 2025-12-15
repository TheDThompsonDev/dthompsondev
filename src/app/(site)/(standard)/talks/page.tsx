"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { TiltCard } from "@/components/TiltCard";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ContentFilter = "all" | "featured" | "interviews" | "conferences" | "tutorials";

interface VideoTalk {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  views?: string;
  duration?: string;
  category: "talk" | "tutorial" | "interview";
  featured?: boolean;
  channel?: string;
}

interface SpeakingTopic {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const featuredVideoIds = ["1", "2", "3", "5", "6", "8"];

const rawTalks: VideoTalk[] = [
  {
    id: "1",
    title: "Playing the Developer Job Search Game to Win in 2025",
    description: "Discussion with Leon Noel on freeCodeCamp about winning the developer job search in 2025.",
    thumbnail: "https://img.youtube.com/vi/6_qwLx8jwBY/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=6_qwLx8jwBY",
    category: "interview",
    channel: "freeCodeCamp.org",
    featured: true
  },
  {
    id: "2",
    title: "From Gas Station Cook To Google Engineer",
    description: "My journey from working at a gas station to becoming a software engineer, featured on NoDegree podcast.",
    thumbnail: "https://img.youtube.com/vi/67SEA5QGqtA/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=67SEA5QGqtA",
    category: "interview",
    channel: "NoDegree",
    featured: true
  },
  {
    id: "3",
    title: "Open Source and AI with Danny Thompson",
    description: "Discussion with GitHub about the intersection of open source development and artificial intelligence.",
    thumbnail: "https://img.youtube.com/vi/68qYBxBiofE/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=68qYBxBiofE",
    category: "talk",
    channel: "GitHub",
    featured: true
  },
  {
    id: "4",
    title: "How to Become a Software Developer with No Experience",
    description: "Interview with Du'An Lightfoot about breaking into tech without traditional experience.",
    thumbnail: "https://img.youtube.com/vi/4LSjr30UhKE/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=4LSjr30UhKE",
    category: "interview",
    channel: "Du'An Lightfoot"
  },
  {
    id: "5",
    title: "Stop Worrying About AI",
    description: "Backend Banter podcast discussing AI's impact on software development and why developers shouldn't panic.",
    thumbnail: "https://img.youtube.com/vi/Cc93qz4wPw4/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=Cc93qz4wPw4",
    category: "interview",
    channel: "Backend Banter",
    featured: true
  },
  {
    id: "6",
    title: "The Amazing, But Unsettling Future for Developers",
    description: "Appwrite discussion about the evolving landscape of software development and what's coming next.",
    thumbnail: "https://img.youtube.com/vi/PfnKyXo2k6o/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=PfnKyXo2k6o",
    category: "talk",
    channel: "Appwrite",
    featured: true
  },
  {
    id: "7",
    title: "Making It In Tech: Danny Thompson",
    description: "Pluralsight feature on my career journey and advice for aspiring developers.",
    thumbnail: "https://img.youtube.com/vi/A1HPmebIFQc/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=A1HPmebIFQc",
    category: "interview",
    channel: "Pluralsight"
  },
  {
    id: "8",
    title: "Interviews, Standing Out And Portfolio Projects",
    description: "Dennis Ivy interview covering job interviews, how to stand out, and building impressive portfolio projects.",
    thumbnail: "https://img.youtube.com/vi/j00vPfrYrsU/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=j00vPfrYrsU",
    category: "interview",
    channel: "Dennis Ivy",
    featured: true
  },
  {
    id: "9",
    title: "Coding Entrepreneurs Podcast",
    description: "Discussion about building a career in tech, community building, and the entrepreneurial side of coding.",
    thumbnail: "https://img.youtube.com/vi/rr0Dkip5dcg/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=rr0Dkip5dcg",
    category: "interview",
    channel: "CodingEntrepreneurs"
  },
  {
    id: "10",
    title: "From Frying Chicken to This Dot Labs",
    description: "Career Stories with Rob Ocel on The Dev Leader Podcast about my unconventional path into tech.",
    thumbnail: "https://img.youtube.com/vi/PFhvur-Zpxs/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=PFhvur-Zpxs",
    category: "interview",
    channel: "The Dev Leader"
  },
  {
    id: "11",
    title: "Forever Employable Stories",
    description: "Jeff Gothelf interviews me about being a software developer and community leader.",
    thumbnail: "https://img.youtube.com/vi/--Iyd6biNA4/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=--Iyd6biNA4",
    category: "interview",
    channel: "Jeff Gothelf"
  },
  {
    id: "12",
    title: "4 Hours to Build a Haunted App",
    description: "Web Dev Challenge on CodeTV - building a complete application under time pressure.",
    thumbnail: "https://img.youtube.com/vi/fNDSDWJaj2M/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=fNDSDWJaj2M",
    category: "tutorial",
    channel: "CodeTV"
  },
  {
    id: "13",
    title: "Gas Station Cook to Software Developer",
    description: "Mintbean io conversation about my journey from working at a gas station to becoming a software developer.",
    thumbnail: "https://img.youtube.com/vi/ODtz06-uSn8/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=ODtz06-uSn8",
    category: "interview",
    channel: "Mintbean"
  },
  {
    id: "14",
    title: "Developer Career Insights",
    description: "In-depth discussion about career development, breaking into tech, and building sustainable growth as a developer.",
    thumbnail: "https://img.youtube.com/vi/blsgaR56jNs/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=blsgaR56jNs",
    category: "talk"
  },
  {
    id: "15",
    title: "Tech Career Growth Strategies",
    description: "Exploring strategies for advancing your career in tech and making meaningful progress as a developer.",
    thumbnail: "https://img.youtube.com/vi/HEwx64EBMBw/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=HEwx64EBMBw",
    category: "talk"
  },
  {
    id: "16",
    title: "Building Your Developer Brand",
    description: "Discussion about personal branding, online presence, and standing out in the competitive tech landscape.",
    thumbnail: "https://img.youtube.com/vi/bttuRc-RXqs/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=bttuRc-RXqs",
    category: "interview"
  },
  {
    id: "17",
    title: "Community Building in Tech",
    description: "Deep dive into building and scaling tech communities, fostering engagement, and creating value for members.",
    thumbnail: "https://img.youtube.com/vi/CvjgNm_O2n4/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=CvjgNm_O2n4",
    category: "talk"
  },
  {
    id: "18",
    title: "Developer Success Stories",
    description: "Sharing success stories, lessons learned, and practical advice from my journey in tech.",
    thumbnail: "https://img.youtube.com/vi/jR4k0rcgxEg/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=jR4k0rcgxEg",
    category: "interview"
  },
  {
    id: "19",
    title: "Tech Industry Insights",
    description: "Discussion about current trends in tech, what's changing, and how developers can stay ahead.",
    thumbnail: "https://img.youtube.com/vi/YuL_JoDeBDM/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=YuL_JoDeBDM",
    category: "talk"
  },
  {
    id: "20",
    title: "Breaking Barriers in Tech",
    description: "Conversation about overcoming obstacles, dealing with impostor syndrome, and building confidence as a developer.",
    thumbnail: "https://img.youtube.com/vi/ieRuo0YZg-I/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=ieRuo0YZg-I",
    category: "interview"
  },
  {
    id: "21",
    title: "Career Transition Advice",
    description: "Practical guidance for career changers looking to break into tech from non-traditional backgrounds.",
    thumbnail: "https://img.youtube.com/vi/f7zdJAPgGUA/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=f7zdJAPgGUA",
    category: "interview"
  },
  {
    id: "22",
    title: "Developer Networking Strategies",
    description: "How to network effectively, build meaningful connections, and leverage relationships for career growth.",
    thumbnail: "https://img.youtube.com/vi/gXmFs9RlCuI/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=gXmFs9RlCuI",
    category: "talk"
  },
  {
    id: "23",
    title: "Tech Career Mentorship",
    description: "Discussion about mentorship in tech, finding mentors, and becoming a mentor to others.",
    thumbnail: "https://img.youtube.com/vi/85pfWXmjxVE/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=85pfWXmjxVE",
    category: "interview"
  },
  {
    id: "24",
    title: "Developer Job Search Tips",
    description: "Proven strategies for job searching in tech, optimizing your applications, and landing interviews.",
    thumbnail: "https://img.youtube.com/vi/bXafpkI6JZI/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=bXafpkI6JZI",
    category: "talk"
  },
  {
    id: "25",
    title: "Building Tech Communities",
    description: "Insights on creating thriving tech communities, organizing events, and driving engagement.",
    thumbnail: "https://img.youtube.com/vi/ZxlzNTzIoqQ/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=ZxlzNTzIoqQ",
    category: "talk"
  },
  {
    id: "26",
    title: "Software Developer Career Path",
    description: "Exploring different career paths in software development and how to navigate your journey.",
    thumbnail: "https://img.youtube.com/vi/SdcW_gCx6IM/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=SdcW_gCx6IM",
    category: "interview"
  },
  {
    id: "27",
    title: "Tech Career Growth & Development",
    description: "Strategies for continuous learning, skill development, and advancing in your tech career.",
    thumbnail: "https://img.youtube.com/vi/nrRLzASgeqE/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=nrRLzASgeqE",
    category: "talk"
  },
  {
    id: "28",
    title: "Developer Success Mindset",
    description: "Building the right mindset for success in tech, staying motivated, and overcoming challenges.",
    thumbnail: "https://img.youtube.com/vi/JbJD98UF1fg/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=JbJD98UF1fg",
    category: "interview"
  },
  {
    id: "29",
    title: "Tech Industry Conversations",
    description: "Engaging discussions about the tech industry, trends, and what the future holds for developers.",
    thumbnail: "https://img.youtube.com/vi/W_8La1xYNrQ/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=W_8La1xYNrQ",
    category: "interview"
  },
  {
    id: "30",
    title: "Software Development Insights",
    description: "Deep dive into software development practices, methodologies, and career advancement strategies.",
    thumbnail: "https://img.youtube.com/vi/2GhuUdAzx2U/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=2GhuUdAzx2U",
    category: "talk"
  },
  {
    id: "31",
    title: "Tech Career Workshop",
    description: "Workshop-style discussion covering essential topics for building a successful career in technology.",
    thumbnail: "https://img.youtube.com/vi/_M_dYZeqhfc/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=_M_dYZeqhfc",
    category: "tutorial"
  }
];

const videoTalks: VideoTalk[] = rawTalks.map(talk => ({
  ...talk,
  featured: featuredVideoIds.includes(talk.id) || talk.featured
}));

const speakingTopics: SpeakingTopic[] = [
  {
    icon: "🚀",
    title: "Breaking Into Tech",
    description: "From non-traditional backgrounds to tech careers. Real strategies that work for career changers and bootcamp grads.",
    color: "#4D7DA3"
  },
  {
    icon: "👥",
    title: "Community Building at Scale",
    description: "How to grow developer communities from 0 to 10K+ members. Proven frameworks for engagement and retention.",
    color: "#84803E"
  },
  {
    icon: "💼",
    title: "Career Development & Growth",
    description: "Navigating the career ladder from junior to senior to leadership. Interview prep, negotiation, and advancement.",
    color: "#153230"
  },
  {
    icon: "🤖",
    title: "AI & The Future of Development",
    description: "Understanding AI's impact on software development and how developers can thrive in an AI-augmented world.",
    color: "#4D7DA3"
  },
  {
    icon: "🎯",
    title: "Personal Branding for Developers",
    description: "Building an authentic online presence that opens doors. Content creation, networking, and thought leadership.",
    color: "#84803E"
  },
  {
    icon: "🏢",
    title: "Technical Leadership",
    description: "Transitioning from IC to management. Building high-performing teams and driving technical excellence.",
    color: "#153230"
  }
];

const speakingStats = [
  { value: "60+", label: "Speaking Events" },
  { value: "450K+", label: "Developers Reached" },
  { value: "30+", label: "Video Appearances" },
  { value: "12K+", label: "Community Built" }
];

const brandLogos = [
  "freeCodeCamp", "GitHub", "Pluralsight", "Appwrite", "Microsoft",
  "Google", "Spotify", "Digital Ocean", "Grafana Labs", "NoDegree"
];

export default function TalksPage() {
  const [activeFilter, setActiveFilter] = useState<ContentFilter>("all");
  const [selectedVideo, setSelectedVideo] = useState<VideoTalk | null>(null);

  const filteredVideos = activeFilter === "all"
    ? videoTalks
    : activeFilter === "featured"
      ? videoTalks.filter(v => v.featured)
      : activeFilter === "interviews"
        ? videoTalks.filter(v => v.category === "interview")
        : activeFilter === "tutorials"
          ? videoTalks.filter(v => v.category === "tutorial")
          : videoTalks.filter(v => v.category === "talk");

  const featuredVideos = videoTalks.filter(v => v.featured).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative px-4 sm:px-8 md:px-16 py-16 md:py-24">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-linear-to-br from-[#4D7DA3]/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-linear-to-tr from-[#84803E]/10 to-transparent rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 bg-[#153230] text-white px-5 py-2.5 rounded-full shadow-lg mb-8">
              <div className="relative flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-[#4ade80] rounded-full animate-pulse"></div>
                <div className="absolute w-2.5 h-2.5 bg-[#4ade80] rounded-full animate-ping"></div>
              </div>
              <span className="text-sm font-bold tracking-wide">
                BOOKING NOW FOR 2025 EVENTS
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#153230] leading-[1.1] mb-8">
              Speaker.
              <br />
              <span className="text-[#4D7DA3]">Storyteller.</span>
              <br />
              <span className="text-[#84803E]">Community Leader.</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#153230]/70 leading-relaxed max-w-4xl mx-auto mb-12">
              Conference keynotes • Podcast appearances • Corporate workshops • Panel moderation
              <br />
              <span className="text-[#4D7DA3] font-bold text-2xl md:text-3xl">
                Reaching 450,000+ developers globally
              </span>
            </p>

            {/* Speaking Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
              {speakingStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#4D7DA3]/20 hover:border-[#4D7DA3] hover:scale-110 transition-all duration-300 group"
                >
                  <div className="text-3xl md:text-4xl font-black text-[#4D7DA3] mb-2 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-[#153230]/70 font-bold">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="group relative bg-[#153230] text-white px-10 py-5 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg overflow-hidden"
              >
                <span className="relative z-10">Book Me to Speak</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </Link>
              <a
                href="#speaking-topics"
                className="bg-transparent border-2 border-[#153230] text-[#153230] px-10 py-5 rounded-full hover:bg-[#153230] hover:text-white hover:scale-105 transition-all duration-300 font-bold text-lg"
              >
                View Speaking Topics
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Talks Section */}
      <section className="mx-4 mt-8">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-[#153230] mb-4">
              🌟 Featured Talks
            </h2>
            <p className="text-lg md:text-xl text-[#153230]/70 max-w-3xl mx-auto">
              Highlights from my most impactful speaking engagements and interviews
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featuredVideos.map((video, index) => (
            <ScrollReveal key={video.id} delay={index * 100}>
              <motion.a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-3xl overflow-hidden border-2 border-[#4D7DA3]/20 hover:border-[#4D7DA3] hover:shadow-2xl transition-all duration-500"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                      <svg className="w-10 h-10 text-[#153230] ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-[#4D7DA3] text-white px-3 py-1 rounded-full text-xs font-black uppercase">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  {video.channel && (
                    <div className="text-xs font-bold text-[#4D7DA3] mb-2 uppercase tracking-wide">
                      {video.channel}
                    </div>
                  )}
                  <h3 className="text-xl font-black text-[#153230] mb-3 leading-tight group-hover:text-[#4D7DA3] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-[#153230]/70 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Speaking Topics Section */}
      <section id="speaking-topics" className="mx-4 mt-12">
        <div className="bg-gradient-to-br from-[#153230] to-[#4D7DA3] rounded-[32px] p-8 md:p-16 shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
          </div>

          <ScrollReveal>
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                  🎤 Speaking Topics
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Engaging, authentic talks that inspire developers and drive action
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {speakingTopics.map((topic, index) => (
                  <motion.div
                    key={topic.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300"
                  >
                    <div className="text-5xl mb-4">{topic.icon}</div>
                    <h3 className="text-xl font-black text-white mb-3">{topic.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{topic.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* All Talks Library */}
      <section className="mx-4 mt-12">
        <ScrollReveal>
          <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-[#4D7DA3]/10">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-black text-[#153230] mb-4">
                📺 Complete Talk Library
              </h2>
              <p className="text-lg md:text-xl text-[#153230]/70 max-w-3xl mx-auto mb-8">
                30+ speaking engagements covering career development, community building, and technical leadership
              </p>

              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { id: "all" as ContentFilter, label: "All Talks", count: videoTalks.length },
                  { id: "featured" as ContentFilter, label: "Featured", count: videoTalks.filter(v => v.featured).length },
                  { id: "interviews" as ContentFilter, label: "Interviews", count: videoTalks.filter(v => v.category === "interview").length },
                  { id: "conferences" as ContentFilter, label: "Talks", count: videoTalks.filter(v => v.category === "talk").length },
                  { id: "tutorials" as ContentFilter, label: "Workshops", count: videoTalks.filter(v => v.category === "tutorial").length },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`
                      px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300
                      ${activeFilter === filter.id
                        ? "bg-[#153230] text-white scale-105 shadow-lg"
                        : "bg-[#E2F3F2] text-[#153230]/70 hover:text-[#153230] hover:scale-105"
                      }
                    `}
                  >
                    {filter.label} <span className="text-xs">({filter.count})</span>
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {filteredVideos.map((video, index) => (
                  <motion.a
                    key={video.id}
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group block bg-gradient-to-br from-white to-[#E2F3F2]/30 rounded-2xl overflow-hidden border border-[#4D7DA3]/10 hover:border-[#4D7DA3]/40 hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -4 }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-[#153230] ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                      {video.featured && (
                        <div className="absolute top-2 right-2 bg-[#4D7DA3] text-white px-2 py-1 rounded text-[10px] font-black">
                          ★
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      {video.channel && (
                        <div className="text-[10px] font-bold text-[#4D7DA3] mb-1 uppercase">
                          {video.channel}
                        </div>
                      )}
                      <h3 className="text-sm font-black text-[#153230] mb-2 leading-tight line-clamp-2 group-hover:text-[#4D7DA3] transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-xs text-[#153230]/60 line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </section>

      {/* Featured Channels */}
      <section className="mx-4 mt-12">
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-[#4D7DA3]/10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-[#153230] mb-6 text-center">
              Featured On Leading Tech Platforms
            </h2>
            <p className="text-center text-[#153230]/70 mb-8 max-w-2xl mx-auto">
              Trusted by top tech brands and media outlets to share insights with developer audiences
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {brandLogos.map((brand, index) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-linear-to-r from-[#E2F3F2] to-white border border-[#4D7DA3]/10 rounded-xl px-6 py-3 hover:scale-110 hover:shadow-lg hover:border-[#4D7DA3]/30 transition-all"
                >
                  <span className="text-[#153230] font-bold">{brand}</span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative mx-4 mt-12 mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#153230] via-[#4D7DA3] to-[#84803E] rounded-[32px]" />

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        </div>

        <div className="relative px-8 md:px-16 py-20 md:py-28 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Let's Create Something
              <br />
              Amazing Together
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Available for conference keynotes, podcast appearances, corporate workshops,
              and brand partnerships. Let's inspire developers together.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/#contact"
                className="group relative bg-white text-[#153230] px-12 py-6 rounded-full font-black text-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Book Me to Speak</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4D7DA3]/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </Link>
              <a
                href="mailto:contact@dthompsondev.com"
                className="bg-transparent border-3 border-white text-white px-12 py-6 rounded-full font-black text-xl hover:bg-white hover:text-[#153230] hover:scale-110 transition-all duration-300"
              >
                Download Speaker Kit
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
