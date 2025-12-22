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

interface PastTalk {
  event: string;
  location: string;
  date: string;
  title: string;
  link?: string;
}

interface SpeakingTopic {
  icon: string;
  title: string;
  description: string;
  color: string;
}



const rawTalks: VideoTalk[] = [

  {
    id: "32",
    title: "IMPROVE YOUR DATA FETCHING WITH REACT QUERY",
    description: "Breakout Session. How to use React Query successfully and knowing when to utilize it. RenderATL 2023.",
    thumbnail: "https://img.youtube.com/vi/aNwU0MwwvNY/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=aNwU0MwwvNY",
    category: "talk",
    channel: "RenderATL",
    featured: true
  },
  {
    id: "25",
    title: "TypeScript and Your Codebase: They Deserve Each Other!",
    description: "Insights on creating thriving tech communities, organizing events, and driving engagement.",
    thumbnail: "https://img.youtube.com/vi/ZxlzNTzIoqQ/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=ZxlzNTzIoqQ",
    category: "talk",
    channel: "Jetbrains Javascript Day Conference",
    featured: true
  },
  {
    id: "33",
    title: "Error Boundaries Save You From Crashes!",
    description: "Showcasing what an Error Boundary is in React and why you should use them to prevent the UI of your site from crashing. RenderATL 2022.",
    thumbnail: "https://img.youtube.com/vi/gooW831qwv4/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=gooW831qwv4",
    category: "talk",
    channel: "RenderATL"
  },
  {
    id: "34",
    title: "Death of AI Magic! Welcome to AI Engineering!",
    description: "Stop using AI like it's a magic wand and learn how to use it correctly.",
    thumbnail: "https://img.youtube.com/vi/-A3sMIAvqaA/hqdefault.jpg",
    youtubeUrl: "https://youtu.be/-A3sMIAvqaA?si=PvLKGGOghYNw5G9P&t=443",
    category: "talk",
    channel: "Dallas Software Developers Group"
  },
  {
    id: "35",
    title: "React Detective Danny Thompson! You don't need that useEffect!",
    description: "Fix your bad habits of using unnecessary useEffect hooks and learn how to use them correctly.",
    thumbnail: "https://img.youtube.com/vi/1FmgvjczoMs/hqdefault.jpg",
    youtubeUrl: "https://youtu.be/1FmgvjczoMs?si=M8vYx0V-sEqvEnzq&t=2031",
    category: "talk",
    channel: "Dallas Software Developers Group",
    featured: true
  },
  {
    id: "36",
    title: "Spanish Language Learning MCP Server!",
    description: "MCP Server for Spanish Language Learning talk!",
    thumbnail: "https://img.youtube.com/vi/RDgBnArxFLk/hqdefault.jpg",
    youtubeUrl: "https://youtu.be/RDgBnArxFLk?si=T8ZYijYbqMyxkN5E&t=5567",
    category: "talk",
    channel: "Dallas Software Developers Group"
  },
  {
    id: "40",
    title: "Keynote: The Community That Developers Built",
    description: "Building a thriving developer community is both challenging and rewarding. Danny shares insights on creating value and connection.",
    thumbnail: "https://img.youtube.com/vi/N7CxuV8ynNw/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=N7CxuV8ynNw",
    category: "talk",
    channel: "All Things Open"
  },
  {
    id: "41",
    title: "Keynote: THAT Conference Journey Into Tech",
    description: "Building a thriving developer community is both challenging and rewarding. Danny shares insights on creating value and connection.",
    thumbnail: "https://img.youtube.com/vi/pgFBitwKd6g/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/live/pgFBitwKd6g?si=xZEpebC4Q23zmefU&t=1279",
    category: "talk",
    channel: "THAT Conference"
  },
  {
    id: "37",
    title: "The Agentic Shift: Moving from LLMs to Autonomous Systems",
    description: "Learn how to transition from simple chatbots to autonomous agents that drive revenue by reasoning through tasks and executing complex operations without human intervention.",
    thumbnail: "https://img.youtube.com/vi/YkiQipeOw3w/hqdefault.jpg",
    youtubeUrl: "https://youtu.be/YkiQipeOw3w?si=rawJOpMkHSYHNlb9&t=4527",
    category: "talk",
    channel: "Dallas Software Developers Group"
  },
  {
    id: "38",
    title: "The AI Playbook For Companies",
    description: "Commit Your Code Conference keynote on how companies can effectively leverage AI.",
    thumbnail: "https://img.youtube.com/vi/2GhuUdAzx2U/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=2GhuUdAzx2U",
    category: "talk",
    channel: "Commit Your Code Conference"
  },
  {
    id: "39",
    title: "AI Conversation with Matt McDole",
    description: "Conversation with CTO of Yum! Brands Matt McDole and Danny Thompson at Commit Your Code.",
    thumbnail: "https://img.youtube.com/vi/nrRLzASgeqE/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=nrRLzASgeqE&t=9s",
    category: "interview",
    channel: "Commit Your Code Conference"
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
    id: "1",
    title: "Playing the Developer Job Search Game to Win in 2025",
    description: "Discussion with Leon Noel on freeCodeCamp about winning the developer job search in 2025.",
    thumbnail: "https://img.youtube.com/vi/6_qwLx8jwBY/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=6_qwLx8jwBY",
    category: "interview",
    channel: "freeCodeCamp.org"
  },
  {
    id: "26",
    title: "Tutorial Purgatory!",
    description: "Exploring the challenges of learning new skills and how to navigate your journey.",
    thumbnail: "https://img.youtube.com/vi/SdcW_gCx6IM/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=SdcW_gCx6IM",
    category: "interview",
    channel: "Coder Foundry"
  },
  {
    id: "28",
    title: "AI Gaps 95% of Companies NEED to see!",
    description: " Danny Thompson and Leon sit down with Matt DeBergalis, CEO of Apollo GraphQL, to unpack what it will take to move from a gold rush of mediocrity to production-grade agentic experiences that users can trust.",
    thumbnail: "https://img.youtube.com/vi/JbJD98UF1fg/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=JbJD98UF1fg",
    category: "interview",
    channel: "The Programming Podcast"
  },
  {
    id: "2",
    title: "From Gas Station Cook To Google Engineer",
    description: "My journey from working at a gas station to becoming a software engineer, featured on NoDegree podcast.",
    thumbnail: "https://img.youtube.com/vi/67SEA5QGqtA/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=67SEA5QGqtA",
    category: "interview",
    channel: "NoDegree"
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
    title: "How To Grow An Audience",
    description: "Private Talk For Gumroad Creators - Discussion about growing an audience, building a community, and creating value for your audience.",
    thumbnail: "https://img.youtube.com/vi/blsgaR56jNs/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=blsgaR56jNs",
    category: "talk",
    channel: "Gumroad"
  },
  {
    id: "15",
    title: "Journey Into Tech",
    description: "Private Talk For JDHH Members - Discussion about my journey into tech and the strategies I used to break into the industry.",
    thumbnail: "https://img.youtube.com/vi/HEwx64EBMBw/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=HEwx64EBMBw",
    category: "talk",
    channel: "JDHH"
  },
  {
    id: "16",
    title: "Don't Stop!",
    description: "Discussion about personal branding, online presence, and standing out in the competitive tech landscape.",
    thumbnail: "https://img.youtube.com/vi/bttuRc-RXqs/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=bttuRc-RXqs",
    category: "interview",
    channel: "Driven By Doing"
  },
  {
    id: "17",
    title: "AMA with Danny Thompson - Developer Relations at Google",
    description: "Deep dive into building and scaling tech communities, fostering engagement, and creating value for members.",
    thumbnail: "https://img.youtube.com/vi/CvjgNm_O2n4/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=CvjgNm_O2n4",
    category: "talk",
    channel: "Pluralsight"
  },
  {
    id: "18",
    title: "Developer Success Stories",
    description: "Sharing success stories, lessons learned, and practical advice from my journey in tech.",
    thumbnail: "https://img.youtube.com/vi/jR4k0rcgxEg/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=jR4k0rcgxEg",
    category: "interview",
    channel: "Dice"
  },
  {
    id: "19",
    title: "Optimize your LinkedIn Page with Danny Thompson",
    description: "Discussion about current trends in tech, what's changing, and how developers can stay ahead.",
    thumbnail: "https://img.youtube.com/vi/YuL_JoDeBDM/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=YuL_JoDeBDM",
    category: "talk",
    channel: "Scrimba"
  },
  {
    id: "20",
    title: "Typescript and your codebase, Proof that they deserve each other!",
    description: "Conversation about overcoming obstacles, dealing with impostor syndrome, and building confidence as a developer.",
    thumbnail: "https://img.youtube.com/vi/ieRuo0YZg-I/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=ieRuo0YZg-I",
    category: "interview",
    channel: "All Things Open"
  },
  {
    id: "21",
    title: "Career Transition Advice",
    description: "Practical guidance for career changers looking to break into tech from non-traditional backgrounds.",
    thumbnail: "https://img.youtube.com/vi/f7zdJAPgGUA/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=f7zdJAPgGUA",
    category: "interview",
    channel: "Faraday Academy"
  },
  {
    id: "22",
    title: "Developer Networking Strategies",
    description: "How to network effectively, build meaningful connections, and leverage relationships for career growth.",
    thumbnail: "https://img.youtube.com/vi/gXmFs9RlCuI/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=GaDsu2aoGEw",
    category: "talk",
    channel: "Daily.dev"
  },
  {
    id: "23",
    title: "Tech Career Mentorship Scrimba Schools",
    description: "Discussion about mentorship in tech, finding mentors, and becoming a mentor to others.",
    thumbnail: "https://img.youtube.com/vi/85pfWXmjxVE/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=85pfWXmjxVE",
    category: "interview",
    channel: "Scrimba"
  },
  {
    id: "24",
    title: "Journey Into Tech",
    description: "Discussion about my journey into tech and the strategies I used to break into the industry.",
    thumbnail: "https://img.youtube.com/vi/bXafpkI6JZI/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=bXafpkI6JZI",
    category: "talk",
    channel: "Prentus"
  },
  {
    id: "29",
    title: "Keynote: From Frying Chicken To Software Engineer",
    description: "In this talk I will discuss my journey, going from frying chicken to helping 44 people land their first jobs in tech. To helping bring positive change to my city and to becoming a software engineer.",
    thumbnail: "https://img.youtube.com/vi/W_8La1xYNrQ/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=W_8La1xYNrQ",
    category: "interview",
    channel: "Juneteenth Conference"
  },

  {
    id: "31",
    title: "From Gas Station Employee to Software Development",
    description: "Workshop-style discussion covering essential topics for building a successful career in technology.",
    thumbnail: "https://img.youtube.com/vi/_M_dYZeqhfc/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=_M_dYZeqhfc",
    category: "tutorial",
    channel: "CodeStories"
  },
];

const pastTalks: PastTalk[] = [
  {
    event: "RenderATL",
    location: "Atlanta, GA",
    date: "June 2024",
    title: "Building Communities in the AI Era",
    link: "https://renderatl.com"
  },
  {
    event: "KCDC",
    location: "Kansas City, MO",
    date: "June 2023",
    title: "The Future of DevRel",
  },
  {
    event: "University of Texas at Dallas",
    location: "Richardson, TX",
    date: "April 2023",
    title: "Guest Lecture: Software Engineering Realities",
  },
  {
    event: "React Miami",
    location: "Miami, FL",
    date: "April 2023",
    title: "Panel: The State of React",
  },
  {
    event: "Memphis Dev Group",
    location: "Memphis, TN",
    date: "March 2023",
    title: "Career Growth for Developers",
  }
];

const videoTalks: VideoTalk[] = rawTalks;

const speakingTopics: SpeakingTopic[] = [
  {
    icon: "🤖",
    title: "AI & The Future of Development",
    description: "Understanding AI's impact on software development and how developers can thrive in an AI-augmented world.",
    color: "#4D7DA3"
  },
  {
    icon: "🏢",
    title: "Technical Leadership",
    description: "Transitioning from IC to management. Building high-performing teams and driving technical excellence.",
    color: "#153230"
  },
  {
    icon: "�",
    title: "Community Building at Scale",
    description: "How to grow developer communities from 0 to 10K+ members. Proven frameworks for engagement and retention.",
    color: "#84803E"
  },
  {
    icon: "🎯",
    title: "Personal Branding for Developers",
    description: "Building an authentic online presence that opens doors. Content creation, networking, and thought leadership.",
    color: "#84803E"
  },
  {
    icon: "💼",
    title: "Career Development & Growth",
    description: "Navigating the career ladder from junior to senior to leadership. Interview prep, negotiation, and advancement.",
    color: "#153230"
  },
  {
    icon: "🚀",
    title: "Breaking Into Tech",
    description: "From non-traditional backgrounds to tech careers. Real strategies that work for career changers and bootcamp grads.",
    color: "#84803E"
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
              <span className="text-[#4D7DA3]">Developer.</span>
              <br />
              <span className="text-[#84803E]">Community Leader.</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#153230]/70 leading-relaxed max-w-4xl mx-auto mb-12">
              Conference keynotes • Podcasts • Corporate workshops • Panel moderation
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
      <section id="speaking-topics" className="mx-4 mt-20 mb-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#4D7DA3] font-black tracking-widest uppercase text-sm mb-4 block">
                Expertise & Focus Areas
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#153230] mb-6">
                Speaking Topics
              </h2>
              <p className="text-xl text-[#153230]/70 max-w-2xl mx-auto leading-relaxed">
                Engaging, actionable talks designed to inspire developers and provide real-world strategies for growth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {speakingTopics.map((topic, index) => (
                <TiltCard key={topic.title} className="h-full">
                  <div className="bg-white rounded-3xl p-8 h-full border border-[#E2F3F2] shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col group">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 shadow-sm`} style={{ backgroundColor: `${topic.color}15` }}>
                      {/* Icon switching based on title because we removed emoji icons from data */}
                      {topic.title.includes("Breaking") && (
                        <svg className="w-7 h-7" style={{ color: topic.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16 8a6 6 0 016 6v7h-4v-8m-4-3a6 6 0 01-6-6v-2h4v8" /></svg>
                      )}
                      {topic.title.includes("Breaking") && ( // Fallback/Correction for Rocket Icon above which was actually a generic shape? Let's use a clear Rocket
                        <svg className="w-7 h-7" style={{ color: topic.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      )}

                      {topic.title.includes("Community") && (
                        <svg className="w-7 h-7" style={{ color: topic.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      )}

                      {topic.title.includes("Career") && (
                        <svg className="w-7 h-7" style={{ color: topic.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                      )}

                      {topic.title.includes("AI") && (
                        <svg className="w-7 h-7" style={{ color: topic.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      )}

                      {topic.title.includes("Branding") && (
                        <svg className="w-7 h-7" style={{ color: topic.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                      )}

                      {topic.title.includes("Leadership") && (
                        <svg className="w-7 h-7" style={{ color: topic.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                      )}
                    </div>

                    <h3 className="text-xl font-black text-[#153230] mb-3 group-hover:text-[#4D7DA3] transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-[#153230]/70 text-sm leading-relaxed font-medium">
                      {topic.description}
                    </p>
                  </div>
                </TiltCard>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 text-[#153230] font-black border-b-2 border-[#4D7DA3]/30 hover:border-[#4D7DA3] pb-0.5 transition-all text-sm uppercase tracking-wide"
              >
                Inquire about a topic
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
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

      {/* Past Engagements List - Hidden for now */}
      {/* <section className="mx-4 mt-12 mb-20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-[#153230] mb-4">
                🗓️ Past Speaking Engagements
              </h2>
              <p className="text-lg text-[#153230]/70">
                A collection of conferences, meetups, and workshops I've had the privilege to speak at
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#4D7DA3]/10 shadow-lg overflow-hidden">
              {pastTalks.map((talk, index) => (
                <div
                  key={`${talk.event}-${index}`}
                  className={`
                    group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8
                    hover:bg-[#E2F3F2]/30 transition-colors duration-300
                    ${index !== pastTalks.length - 1 ? 'border-b border-gray-100' : ''}
                  `}
                >
                  <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex items-center gap-3 text-sm font-bold text-[#4D7DA3] mb-2">
                      <span>{talk.date}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>{talk.location}</span>
                    </div>
                    <h3 className="text-xl font-black text-[#153230] mb-1 group-hover:text-[#4D7DA3] transition-colors">
                      {talk.title}
                    </h3>
                    <div className="text-[#153230]/70 font-medium">
                      {talk.event}
                    </div>
                  </div>

                  {talk.link && (
                    <a
                      href={talk.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 border-[#153230]/10 text-[#153230] font-bold text-sm hover:border-[#4D7DA3] hover:text-[#4D7DA3] transition-all group-hover:translate-x-1"
                    >
                      View Event
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section> */}
    </>
  );
}
