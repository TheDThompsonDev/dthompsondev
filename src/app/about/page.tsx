"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { TiltCard } from "@/components/TiltCard";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ContentTab = "all" | "talks" | "podcasts" | "conferences";

interface VideoTalk {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  views?: string;
  duration?: string;
  category: "talk" | "tutorial" | "interview";
}

interface PodcastAppearance {
  id: string;
  podcastName: string;
  episodeTitle: string;
  description: string;
  coverArt: string;
  listenUrl: string;
  date: string;
  platform: string;
}

interface ConferenceAppearance {
  id: string;
  conferenceName: string;
  talkTitle: string;
  description: string;
  date: string;
  location: string;
  attendees?: string;
  photo: string;
  color: string;
}

const videoTalks: VideoTalk[] = [
  {
    id: "1",
    title: "Playing the Developer Job Search Game to Win in 2025",
    description: "Discussion with Leon Noel on freeCodeCamp about winning the developer job search in 2025.",
    thumbnail: "https://img.youtube.com/vi/6_qwLx8jwBY/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=6_qwLx8jwBY",
    category: "interview"
  },
  {
    id: "2",
    title: "From Gas Station Cook To Google Engineer",
    description: "My journey from working at a gas station to becoming a software engineer, featured on NoDegree podcast.",
    thumbnail: "https://img.youtube.com/vi/67SEA5QGqtA/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=67SEA5QGqtA",
    category: "interview"
  },
  {
    id: "3",
    title: "Open Source and AI with Danny Thompson",
    description: "Discussion with GitHub about the intersection of open source development and artificial intelligence.",
    thumbnail: "https://img.youtube.com/vi/68qYBxBiofE/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=68qYBxBiofE",
    category: "talk"
  },
  {
    id: "4",
    title: "How to Become a Software Developer with No Experience",
    description: "Interview with Du'An Lightfoot about breaking into tech without traditional experience.",
    thumbnail: "https://img.youtube.com/vi/4LSjr30UhKE/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=4LSjr30UhKE",
    category: "interview"
  },
  {
    id: "5",
    title: "Stop Worrying About AI",
    description: "Backend Banter podcast discussing AI's impact on software development and why developers shouldn't panic.",
    thumbnail: "https://img.youtube.com/vi/Cc93qz4wPw4/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=Cc93qz4wPw4",
    category: "interview"
  },
  {
    id: "6",
    title: "The Amazing, But Unsettling Future for Developers",
    description: "Appwrite discussion about the evolving landscape of software development and what's coming next.",
    thumbnail: "https://img.youtube.com/vi/PfnKyXo2k6o/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=PfnKyXo2k6o",
    category: "talk"
  },
  {
    id: "7",
    title: "Making It In Tech: Danny Thompson",
    description: "Pluralsight feature on my career journey and advice for aspiring developers.",
    thumbnail: "https://img.youtube.com/vi/A1HPmebIFQc/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=A1HPmebIFQc",
    category: "interview"
  },
  {
    id: "8",
    title: "Interviews, Standing Out And Portfolio Projects",
    description: "Dennis Ivy interview covering job interviews, how to stand out, and building impressive portfolio projects.",
    thumbnail: "https://img.youtube.com/vi/j00vPfrYrsU/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=j00vPfrYrsU",
    category: "interview"
  },
  {
    id: "9",
    title: "Coding Entrepreneurs Podcast",
    description: "Discussion about building a career in tech, community building, and the entrepreneurial side of coding.",
    thumbnail: "https://img.youtube.com/vi/rr0Dkip5dcg/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=rr0Dkip5dcg",
    category: "interview"
  },
  {
    id: "10",
    title: "From Frying Chicken to This Dot Labs",
    description: "Career Stories with Rob Ocel on The Dev Leader Podcast about my unconventional path into tech.",
    thumbnail: "https://img.youtube.com/vi/PFhvur-Zpxs/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=PFhvur-Zpxs",
    category: "interview"
  },
  {
    id: "11",
    title: "Forever Employable Stories",
    description: "Jeff Gothelf interviews me about being a software developer and community leader.",
    thumbnail: "https://img.youtube.com/vi/--Iyd6biNA4/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=--Iyd6biNA4",
    category: "interview"
  },
  {
    id: "12",
    title: "4 Hours to Build a Haunted App",
    description: "Web Dev Challenge on CodeTV - building a complete application under time pressure.",
    thumbnail: "https://img.youtube.com/vi/fNDSDWJaj2M/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=fNDSDWJaj2M",
    category: "tutorial"
  },
  {
    id: "13",
    title: "Gas Station Cook to Software Developer",
    description: "Mintbean io conversation about my journey from working at a gas station to becoming a software developer.",
    thumbnail: "https://img.youtube.com/vi/ODtz06-uSn8/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=ODtz06-uSn8",
    category: "interview"
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

const podcastAppearances: PodcastAppearance[] = [
  {
    id: "1",
    podcastName: "The Scrimba Podcast",
    episodeTitle: "From Retail to Tech: Danny Thompson's Journey",
    description: "Discussing career transitions, community building, and how to break into tech without a CS degree.",
    coverArt: "https://via.placeholder.com/400x400/4D7DA3/ffffff?text=Scrimba",
    listenUrl: "https://podcast.link",
    date: "March 2024",
    platform: "Spotify"
  },
  {
    id: "2",
    podcastName: "Frontend Happy Hour",
    episodeTitle: "Building Communities & Personal Brands",
    description: "How developers can build authentic personal brands and leverage community for career growth.",
    coverArt: "https://via.placeholder.com/400x400/84803E/ffffff?text=Frontend+HH",
    listenUrl: "https://podcast.link",
    date: "January 2024",
    platform: "Apple Podcasts"
  },
  {
    id: "3",
    podcastName: "Developer Tea",
    episodeTitle: "The Art of Developer Mentorship",
    description: "Insights from 700+ mentorship calls on what truly helps developers level up their careers.",
    coverArt: "https://via.placeholder.com/400x400/153230/ffffff?text=Dev+Tea",
    listenUrl: "https://podcast.link",
    date: "November 2023",
    platform: "Spotify"
  },
  {
    id: "4",
    podcastName: "CodeNewbie",
    episodeTitle: "Organizing a 9,000-Person Conference",
    description: "Behind the scenes of Commit Your Code Conference: challenges, wins, and lessons learned.",
    coverArt: "https://via.placeholder.com/400x400/4D7DA3/ffffff?text=CodeNewbie",
    listenUrl: "https://podcast.link",
    date: "February 2025",
    platform: "Apple Podcasts"
  }
];

const conferenceAppearances: ConferenceAppearance[] = [
  {
    id: "1",
    conferenceName: "Commit Your Code Conference",
    talkTitle: "Organizer & Host",
    description: "Organized Dallas's premier tech conference with 8,960 attendees, 60 speakers, and speakers from Google, Microsoft, and Spotify.",
    date: "February 2025",
    location: "Dallas, TX",
    attendees: "8,960",
    photo: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/3.jpg",
    color: "#4D7DA3"
  },
  {
    id: "2",
    conferenceName: "React Summit",
    talkTitle: "Building Developer Communities at Scale",
    description: "Keynote on strategies for growing authentic developer communities from 0 to 10K+ members.",
    date: "June 2024",
    location: "Amsterdam, Netherlands",
    photo: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/1.jpg",
    color: "#84803E"
  },
  {
    id: "3",
    conferenceName: "DevRelCon",
    talkTitle: "The Economics of Free: Community-Driven Growth",
    description: "How free resources and genuine community building drive sustainable business growth.",
    date: "December 2023",
    location: "San Francisco, CA",
    photo: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/2.jpg",
    color: "#153230"
  },
  {
    id: "4",
    conferenceName: "All Things Open",
    talkTitle: "Career Development for Self-Taught Developers",
    description: "Panel discussion on breaking into tech and advancing careers without traditional CS backgrounds.",
    date: "October 2023",
    location: "Raleigh, NC",
    photo: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/4.jpg",
    color: "#4D7DA3"
  }
];

const brandMetrics = [
  { value: "450K+", label: "Developer Reach", icon: "🌍" },
  { value: "12K+", label: "Community Members", icon: "👥" },
  { value: "60+", label: "Speaking Events", icon: "🎤" },
  { value: "8,960", label: "Conference Attendees", icon: "🎪" },
  { value: "700+", label: "Mentorship Calls", icon: "💬" },
  { value: "30+", label: "Video Appearances", icon: "📺" }
];

const brandPartners = [
  "GitHub", "Microsoft", "Google", "Spotify", "Digital Ocean",
  "Grafana Labs", "Vonage", "Appwrite", "Agora", "TuxCare"
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<ContentTab>("all");

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
              <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-linear-to-br from-[#4D7DA3]/10 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-[400px] h-[500px] bg-linear-to-tr from-[#84803E]/8 to-transparent rounded-full blur-3xl"></div>

              <div className="relative z-10 max-w-5xl mx-auto text-center">
                <ScrollReveal>
                  <div className="inline-flex items-center gap-2.5 bg-[#153230] text-white px-4 py-2 rounded-full shadow-lg mb-8">
                    <div className="relative flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse"></div>
                      <div className="absolute w-2 h-2 bg-[#4ade80] rounded-full animate-ping"></div>
                    </div>
                    <span className="text-sm font-bold tracking-wide">
                      AVAILABLE FOR BRAND PARTNERSHIPS & SPEAKING
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#153230] leading-tight mb-6">
                    Speaking, Content
                    <br />
                    <span className="text-[#4D7DA3]">& Community</span>
                  </h1>

                  <p className="text-lg md:text-xl text-[#153230]/70 leading-relaxed max-w-3xl mx-auto mb-12">
                    Conference speaker, podcast guest, and community leader reaching 
                    <span className="text-[#4D7DA3] font-bold"> 450,000+ developers globally</span>. 
                    Available for keynotes, brand partnerships, and content collaborations.
                  </p>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {brandMetrics.map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[#4D7DA3]/10 hover:scale-105 transition-all group"
                      >
                        <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                          {metric.icon}
                        </div>
                        <div className="text-xl md:text-2xl font-black text-[#4D7DA3] mb-1">
                          {metric.value}
                        </div>
                        <div className="text-[10px] md:text-xs text-[#153230]/70 font-bold">
                          {metric.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </section>
          </div>

          {/* Why Partner With Me Section */}
          <section className="mx-4 mt-6">
            <div className="bg-linear-to-br from-[#153230] to-[#4D7DA3] rounded-[32px] p-8 md:p-12 shadow-xl overflow-hidden relative">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              </div>
              <ScrollReveal>
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-8 text-center">
                    Why Brands Partner With Me
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                      <div className="text-4xl mb-4">🎯</div>
                      <h3 className="text-xl font-black text-white mb-3">Authentic Reach</h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        450K+ developer reach built on genuine relationships, not bought followers. 
                        My audience trusts my recommendations because I only promote what I believe in.
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                      <div className="text-4xl mb-4">🚀</div>
                      <h3 className="text-xl font-black text-white mb-3">Proven Execution</h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        From organizing 9,000-person conferences to building 12K+ communities, 
                        I deliver measurable results and ROI for partners.
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                      <div className="text-4xl mb-4">💎</div>
                      <h3 className="text-xl font-black text-white mb-3">Premium Content</h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        High-quality keynotes, workshops, and content that elevate your brand 
                        and create lasting impressions with developer audiences.
                      </p>
                    </div>
                  </div>
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
                    { id: "all" as ContentTab, label: "All Content", icon: "🌟" },
                    { id: "talks" as ContentTab, label: "YouTube Talks", icon: "📺" },
                    { id: "podcasts" as ContentTab, label: "Podcasts", icon: "🎙️" },
                    { id: "conferences" as ContentTab, label: "Conferences", icon: "🎪" },
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

          {/* Content Grid */}
          <section className="mx-4 mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* YouTube Talks */}
                {(activeTab === "all" || activeTab === "talks") && (
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-black text-[#153230] mb-6 px-2">
                      📺 YouTube Talks & Interviews
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {videoTalks.map((video, index) => (
                        <ScrollReveal key={video.id} delay={index * 100}>
                          <a
                            href={video.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-white rounded-2xl overflow-hidden border border-[#4D7DA3]/10 hover:border-[#4D7DA3]/30 hover:shadow-xl hover:scale-105 transition-all group"
                          >
                            <div className="relative">
                              <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-48 md:h-56 object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                  <svg className="w-8 h-8 text-[#153230] ml-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                  </svg>
                                </div>
                              </div>
                              {video.duration && (
                                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-bold">
                                  {video.duration}
                                </div>
                              )}
                            </div>
                            <div className="p-6">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="px-2 py-1 bg-[#4D7DA3]/10 text-[#4D7DA3] rounded-full text-[10px] font-black uppercase">
                                  {video.category}
                                </span>
                                {video.views && (
                                  <span className="text-xs text-[#153230]/60 font-semibold">
                                    👁️ {video.views} views
                                  </span>
                                )}
                              </div>
                              <h3 className="text-lg font-black text-[#153230] mb-2 leading-tight">
                                {video.title}
                              </h3>
                              <p className="text-sm text-[#153230]/70 leading-relaxed">
                                {video.description}
                              </p>
                            </div>
                          </a>
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>
                )}

                {/* Podcast Appearances */}
                {(activeTab === "all" || activeTab === "podcasts") && (
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-black text-[#153230] mb-6 px-2">
                      🎙️ Podcast Appearances
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {podcastAppearances.map((podcast, index) => (
                        <ScrollReveal key={podcast.id} delay={index * 100}>
                          <a
                            href={podcast.listenUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-4 bg-white rounded-2xl p-6 border border-[#4D7DA3]/10 hover:border-[#4D7DA3]/30 hover:shadow-xl hover:scale-105 transition-all group"
                          >
                            <img
                              src={podcast.coverArt}
                              alt={podcast.podcastName}
                              className="w-24 h-24 rounded-xl object-cover shrink-0"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-black text-[#153230]/50">
                                  {podcast.platform}
                                </span>
                                <span className="text-xs text-[#153230]/40">•</span>
                                <span className="text-xs text-[#153230]/60">
                                  {podcast.date}
                                </span>
                              </div>
                              <h3 className="text-base font-black text-[#153230] mb-1">
                                {podcast.podcastName}
                              </h3>
                              <p className="text-sm font-semibold text-[#4D7DA3] mb-2">
                                {podcast.episodeTitle}
                              </p>
                              <p className="text-xs text-[#153230]/70 leading-relaxed">
                                {podcast.description}
                              </p>
                            </div>
                          </a>
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>
                )}

                {/* Conference Appearances */}
                {(activeTab === "all" || activeTab === "conferences") && (
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-[#153230] mb-6 px-2">
                      🎪 Conference Speaking
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {conferenceAppearances.map((conference, index) => (
                        <ScrollReveal key={conference.id} delay={index * 100}>
                          <div className="bg-white rounded-2xl overflow-hidden border border-[#4D7DA3]/10 hover:shadow-xl hover:scale-105 transition-all">
                            <img
                              src={conference.photo}
                              alt={conference.conferenceName}
                              className="w-full h-48 md:h-64 object-cover"
                            />
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-3">
                                <span 
                                  className="px-3 py-1 rounded-full text-xs font-black text-white"
                                  style={{ backgroundColor: conference.color }}
                                >
                                  {conference.date}
                                </span>
                                {conference.attendees && (
                                  <span className="text-xs text-[#153230]/60 font-semibold">
                                    👥 {conference.attendees} attendees
                                  </span>
                                )}
                              </div>
                              <h3 className="text-xl font-black text-[#153230] mb-1">
                                {conference.conferenceName}
                              </h3>
                              <p className="text-sm font-bold text-[#4D7DA3] mb-3">
                                {conference.talkTitle}
                              </p>
                              <p className="text-sm text-[#153230]/70 leading-relaxed mb-3">
                                {conference.description}
                              </p>
                              <p className="text-xs text-[#153230]/50 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                {conference.location}
                              </p>
                            </div>
                          </div>
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </section>

          {/* Past Brand Partners */}
          <section className="mx-4 mt-12">
            <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-[#4D7DA3]/10">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-black text-[#153230] mb-6 text-center">
                  Past Brand Partners & Collaborations
                </h2>
                <p className="text-center text-[#153230]/70 mb-8 max-w-2xl mx-auto">
                  I've had the privilege of working with and featuring speakers from leading tech 
                  companies through conferences, events, and content collaborations.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {brandPartners.map((brand, index) => (
                    <motion.div
                      key={brand}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-linear-to-r from-[#E2F3F2] to-white border border-[#4D7DA3]/10 rounded-xl px-6 py-3 hover:scale-110 hover:shadow-lg transition-all"
                    >
                      <span className="text-[#153230] font-bold">{brand}</span>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative mx-4 mt-6 mb-6 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-[#153230] via-[#4D7DA3] to-[#84803E] rounded-[32px]" />
            
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
            </div>

            <div className="relative px-8 md:px-16 py-16 md:py-20 text-center">
              <ScrollReveal>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                  Let's Create Something Together
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Available for keynotes, brand partnerships, podcast appearances, and content collaborations. 
                  Let's reach and inspire developers together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/#contact"
                    className="bg-white text-[#153230] px-8 py-4 rounded-full font-bold hover:scale-105 hover:shadow-2xl transition-all duration-300"
                  >
                    Book Me to Speak
                  </Link>
                  <a
                    href="mailto:contact@dthompsondev.com"
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#153230] hover:scale-105 transition-all duration-300"
                  >
                    Partner With Me
                  </a>
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
