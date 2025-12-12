"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import BottomNav from "@/components/BottomNav";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

type ContentTab = "all" | "talks" | "podcasts" | "conferences";

// Interfaces
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

// Data Arrays
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
];

const JourneySlider = () => {
  return (
    <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white group [&_*]:!transition-none">
      <ReactCompareSlider
        itemOne={
          <div className="relative w-full h-full">
            {/* Gritty B&W Kitchen/Gas Station Photo Placeholder */}
            <ReactCompareSliderImage 
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop" 
              alt="The Beginning - Gas Station Kitchen" 
              style={{ filter: 'grayscale(100%) contrast(120%)' }}
            />
            <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border-l-4 border-red-500">
              <p className="text-white font-mono text-sm font-bold">2014: The Kitchen</p>
              <p className="text-gray-300 text-xs">Minimum Wage. Maximum Hunger.</p>
            </div>
          </div>
        }
        itemTwo={
          <div className="relative w-full h-full">
            {/* Speaking/Tech Photo */}
            <ReactCompareSliderImage 
              src="https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/4.jpg" 
              alt="The Destination - Tech Leadership" 
            />
            <div className="absolute bottom-8 right-8 bg-[#153230]/90 backdrop-blur-md px-4 py-2 rounded-lg border-r-4 border-[#4D7DA3] text-right">
              <p className="text-white font-mono text-sm font-bold">2025: The Stage</p>
              <p className="text-gray-300 text-xs">Director of Technology. Leader.</p>
            </div>
          </div>
        }
        style={{ width: '100%', height: '100%' }}
        handle={
          <div style={{ width: '3px', height: '100%', backgroundColor: 'white', boxShadow: '0 0 10px rgba(0,0,0,0.5)', transition: 'none' }}>
            <div style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              width: '40px', 
              height: '40px', 
              backgroundColor: 'white', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              border: '3px solid #153230',
              transition: 'none'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#153230" style={{ width: '20px', height: '20px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
              </svg>
            </div>
          </div>
        }
      />
      {/* Floating Quote Card */}
       <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 max-w-xs text-left z-20 pointer-events-none">
          <p className="text-white text-sm font-bold italic">"Bite-sized goals lead to a full meal."</p>
       </div>
    </div>
  );
};

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<ContentTab>("all");

  return (
    <>
      <div className="min-h-screen bg-[#E2F3F2] pb-20 lg:pb-0 font-sans">
        <div className="max-w-[1400px] mx-auto">
          {/* Main Container Card */}
          <div className="bg-white rounded-[32px] shadow-2xl m-4 overflow-hidden border border-[#4D7DA3]/10 relative">
            <Navbar />

            {/* --- HERO SECTION --- */}
            <section className="relative px-6 sm:px-12 md:px-20 py-24 md:py-32 overflow-hidden">
               {/* Background Elements */}
               <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#4D7DA3]/10 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
               <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#84803E]/10 to-transparent rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

               <div className="relative z-10 max-w-5xl mx-auto text-center">
                 <ScrollReveal>
                   
                   {/* Floating Inspiration Badge */}
                   <div className="inline-block mb-8 animate-float">
                      <div className="px-6 py-3 rounded-full bg-white shadow-xl border border-[#4D7DA3]/20 flex items-center gap-3">
                         <span className="text-[#153230] font-bold italic text-sm md:text-base">
                           "You are one decision away from a completely different life."
                         </span>
                      </div>
                   </div>

                   <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-[#153230] leading-[0.9] mb-8 tracking-tight">
                     Potential is nothing<br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4D7DA3] to-[#153230]">without execution.</span>
                   </h1>
                   
                   <p className="text-xl md:text-2xl text-[#153230]/70 font-medium leading-relaxed max-w-3xl mx-auto mb-12">
                     I didn't know coding was for me. I thought it was for the PhDs and the rocket scientists.
                     I didn't wait for the tech industry to invite me in. I built the door myself.
                   </p>

                   <a href="#origin" className="inline-block bg-[#153230] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#4D7DA3] transition-all transform hover:scale-105 shadow-xl">
                     See The Blueprint ↓
                   </a>
                 </ScrollReveal>
               </div>
            </section>

            {/* --- SECTION 1: THE ORIGIN --- */}
            <section id="origin" className="px-6 sm:px-12 md:px-20 py-24 relative bg-[#F8FAFC]">
              <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <ScrollReveal>
                  <div className="relative">
                     <div className="absolute -inset-4 bg-[#84803E] rounded-[2rem] rotate-[-3deg] opacity-20"></div>
                     <JourneySlider />
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={200}>
                  <div>
                    <span className="text-[#84803E] font-black text-sm tracking-[0.2em] uppercase mb-4 block">The "Fork in the Road"</span>
                    <h2 className="text-4xl md:text-5xl font-black text-[#153230] mb-8 leading-tight">
                      To Work Here Until I Die, Or Change Everything Now.
                    </h2>
                    <div className="space-y-6 text-lg text-[#153230]/80 leading-relaxed font-medium">
                      <p>
                        I spent over 10 years working in gas stations frying chicken. I was 30 years old, feeling stuck. Then I saw an interview with a famous rapper who was learning to code. He asked a question that changed my life: <em>"Why wouldn't you want to know more about the thing you touch 90% of your day?"</em>
                      </p>
                      <p>
                        I knew if my car made a noise, I needed a mechanic. But I used technology every single day and had no clue how it worked. I thought coding was for PhDs and rocket scientists. That interview proved me wrong.
                      </p>
                      <blockquote className="border-l-4 border-[#84803E] pl-6 py-2 my-8 relative">
                         <p className="text-2xl font-black text-[#153230] italic leading-tight relative z-10">
                           "If I go right, I'm going to work in this gas station until the day I die. Or I can go left and I will change whatever I'm doing, but it has to be now."
                         </p>
                      </blockquote>
                      <p>
                        I have no problem failing in public. I’ll cry if I have to, just to get the strength to keep pushing. That night, I chose to go left.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </section>

            {/* --- SECTION 2: THE METHOD --- */}
            <section className="px-6 sm:px-12 md:px-20 py-24 bg-[#153230] text-white relative overflow-hidden">
               {/* Noise Texture */}
               <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
               
               <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
                 <ScrollReveal>
                   <div className="order-2 lg:order-1">
                     <span className="text-[#4ade80] font-black text-sm tracking-[0.2em] uppercase mb-4 block">The 4 AM Contract</span>
                     <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                       Motivation is Fleeting. Discipline is Reliable.
                     </h2>
                      <p className="text-[#4ade80] font-bold text-xl mb-8 italic">
                          "Your preparation will make way for your destination."
                      </p>

                      <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                       <p>
                         I built my first "app"—a terrible image filter that was Instagram's worst nightmare. I was proud. Then I went to my first local meetup.
                       </p>
                       <p>
                         They were speaking a foreign language: Java, C#, SQL. I realized I knew *nothing*. To make it worse, I'd rush there straight from my shift. The room would smell like fried chicken within 20 minutes. My nickname became "Popeyes".
                       </p>
                       <p className="border-l-4 border-[#4ade80] pl-4 italic text-white/90">
                         The Imposter Syndrome was suffocating. But realizing I was being excluded from the conversation was the fuel I needed. I vowed: <strong>"I will never be excluded again."</strong>
                       </p>
                       <p>
                         I had a wife, a kid, and a 100-hour work week. The only time that belonged to me was before the sun came up. So I started waking up at 4:00 AM every single day.
                       </p>
                      </div>

                      <div className="mt-8 bg-white/5 border border-white/10 p-6 rounded-2xl">
                          <p className="text-xl font-bold text-white italic">
                            "How many opportunities in life have you missed out on just because you didn't say <span className="text-[#4ade80]">'I'm interested'</span>?"
                          </p>
                      </div>
                   </div>

                 </ScrollReveal>

                 <ScrollReveal delay={200}>
                   <div className="relative order-1 lg:order-2">
                      <div className="absolute -inset-4 bg-[#4ade80] rounded-[2rem] rotate-[3deg] opacity-20"></div>
                      <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-black/50 backdrop-blur-sm border border-white/10 shadow-2xl flex items-center justify-center">
                         <div className="text-left font-mono text-[#4ade80] p-8">
                            <p className="opacity-50">// 04:03:12 AM</p>
                            <p className="mb-4"><span className="text-purple-400">while</span> (<span className="text-yellow-300">!success</span>) {"{"}</p>
                            <p className="pl-4">study();</p>
                            <p className="pl-4">build();</p>
                            <p className="pl-4">fail();</p>
                            <p className="pl-4">retry();</p>
                            <p>{"}"}</p>
                         </div>
                      </div>
                   </div>
                 </ScrollReveal>
               </div>
            </section>

            {/* --- SECTION 3: THE PIVOT --- */}
            <section className="px-6 sm:px-12 md:px-20 py-24 relative bg-white">
              <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <ScrollReveal>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-[#4D7DA3] rounded-[2rem] rotate-[-2deg] opacity-20"></div>
                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-200 shadow-xl flex items-center justify-center">
                       {/* Placeholder for Value Prop Canvas */}
                       <div className="text-center p-8">
                          <h3 className="text-2xl font-black text-[#153230]">Value &gt; Syntax</h3>
                          <p className="text-[#153230]/60 mt-2 mb-6">Solving Business Problems</p>
                          <div className="inline-block bg-[#E2F3F2] text-[#153230] px-4 py-2 rounded-lg text-sm font-bold italic">
                              "If you bring value, they will bring a checkbook."
                          </div>
                       </div>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={200}>
                  <div>
                    <span className="text-[#4D7DA3] font-black text-sm tracking-[0.2em] uppercase mb-4 block">The Value Mindset</span>
                    <h2 className="text-4xl md:text-5xl font-black text-[#153230] mb-6 leading-tight">
                      Code is a Commodity. Solution is the Product.
                    </h2>
                    <h3 className="text-2xl font-bold text-[#4D7DA3] mb-8 italic">
                        "Stop negotiating with your potential."
                    </h3>
                    <div className="space-y-6 text-lg text-[#153230]/80 leading-relaxed font-medium">
                      <p>
                        The hiring managers were never going to walk into my gas station. The only way I'd see them is if I invited myself to their world.
                      </p>
                      <p>
                        I turned to LinkedIn. I was terrified to hit 'Connect', but I realized: <strong>"If they say no, I will literally never see them again. The risk is zero."</strong>
                      </p>
                      <p>
                         I didn't just apply. I built relationships. I turned down six job offers before landing my first because I had a clear vision, not just a need for a paycheck.
                      </p>
                      <p className="border-l-4 border-[#4D7DA3] pl-4">
                        <strong>No one is hiring you to follow a YouTube tutorial.</strong> They are hiring you to solve problems.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </section>

             {/* --- SECTION 4: THE EVOLUTION --- */}
            <section className="px-6 sm:px-12 md:px-20 py-24 bg-[#0B1120] text-white relative overflow-hidden">
               <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                 <ScrollReveal>
                   <div className="order-2 lg:order-1">
                     <span className="text-cyan-400 font-black text-sm tracking-[0.2em] uppercase mb-4 block">Technical Leadership</span>
                     <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                       From Syntax to Strategy
                     </h2>
                     <p className="text-xl font-bold text-cyan-200 mb-8 italic">
                         "I don't hire credentials. I hire trajectory."
                     </p>
                       <div className="space-y-6 text-lg text-cyan-50/80 leading-relaxed">
                       <p>
                         My journey wasn't linear; it was exponential. As I moved from Contributor to Director, my focus shifted from 'How do I write this function?' to 'How do we architect this system?'
                       </p>
                       <p className="italic text-cyan-400/80">
                           "A failure is only a failure if you're too stubborn to take a lesson from it."
                       </p>
                       <ul className="space-y-6 mt-8">
                          <li className="flex gap-4 items-start">
                             <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20"></div>
                             <div>
                                <span className="block font-bold text-cyan-400 text-xl mb-1">The Foundation</span>
                                <span className="text-base">I cut my teeth on the Enterprise Stack (Java/Angular), learning strict typing and object-oriented design.</span>
                             </div>
                          </li>
                          <li className="flex gap-4 items-start">
                             <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20"></div>
                             <div>
                                <span className="block font-bold text-cyan-400 text-xl mb-1">The Scale</span>
                                <span className="text-base">I led teams migrating legacy monoliths to Microservices using Go and React for higher velocity.</span>
                             </div>
                          </li>
                          <li className="flex gap-4 items-start">
                             <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20"></div>
                             <div>
                                <span className="block font-bold text-cyan-400 text-xl mb-1">The Architecture</span>
                                <span className="text-base">Today, I leverage Snowflake for data insights and AWS/GCP for scale. I evaluate technical debt vs. competitive advantage.</span>
                             </div>
                          </li>
                       </ul>
                     </div>
                   </div>
                 </ScrollReveal>

                 <ScrollReveal delay={200}>
                   <div className="relative order-1 lg:order-2">
                      <div className="absolute -inset-4 bg-cyan-500/20 rounded-[2rem] rotate-[2deg] blur-xl"></div>
                      <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-[#0F172A] border border-cyan-500/30 flex items-center justify-center p-8 shadow-2xl">
                         {/* CSS Architecture Diagram */}
                         <div className="relative w-full h-full flex flex-col justify-between">
                            {/* Top Node */}
                            <div className="flex justify-center">
                               <div className="bg-cyan-500/10 border border-cyan-400/50 text-cyan-300 px-4 py-2 rounded-lg font-mono text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                                  Client_App
                               </div>
                            </div>
                            
                            {/* Middle Layer */}
                            <div className="flex justify-between items-center px-4 relative">
                               {/* Connecting Lines (SVG overlay could be better but CSS borders work for simple) */}
                               <div className="absolute top-1/2 left-0 w-full h-px bg-cyan-500/20 -z-10"></div>
                               
                               <div className="bg-[#1E293B] border border-cyan-500/30 text-cyan-100 p-3 rounded-lg w-24 text-center text-[10px] font-mono shadow-lg">
                                  Auth_Svc
                               </div>
                               <div className="bg-[#1E293B] border border-cyan-500/30 text-cyan-100 p-3 rounded-lg w-24 text-center text-[10px] font-mono shadow-lg scale-110 ring-2 ring-cyan-500/20">
                                  API_Gateway
                               </div>
                               <div className="bg-[#1E293B] border border-cyan-500/30 text-cyan-100 p-3 rounded-lg w-24 text-center text-[10px] font-mono shadow-lg">
                                  Payment_Svc
                               </div>
                            </div>

                            {/* Bottom Layer */}
                            <div className="flex justify-center gap-8">
                               <div className="bg-indigo-900/30 border border-indigo-500/30 text-indigo-200 px-4 py-3 rounded-lg flex flex-col items-center gap-1">
                                  <span className="text-[10px] font-mono">PostgreSQL</span>
                               </div>
                               <div className="bg-indigo-900/30 border border-indigo-500/30 text-indigo-200 px-4 py-3 rounded-lg flex flex-col items-center gap-1">
                                  <span className="text-[10px] font-mono">Snowflake</span>
                               </div>
                            </div>

                            {/* Vertical Connectors (Pseudo-elements simulation) */}
                            <div className="absolute inset-0 pointer-events-none">
                               <svg className="w-full h-full opacity-30">
                                  <path d="M150 40 L150 120" stroke="#22d3ee" strokeWidth="2" strokeDasharray="4 4" />
                                  <path d="M150 180 L100 240" stroke="#22d3ee" strokeWidth="2" />
                                  <path d="M150 180 L200 240" stroke="#22d3ee" strokeWidth="2" />
                               </svg>
                            </div>
                         </div>
                      </div>
                   </div>
                 </ScrollReveal>
               </div>
            </section>

            {/* --- SECTION 5: THE DIRECTOR --- */}
            <section className="px-6 sm:px-12 md:px-20 py-24 bg-[#E2F3F2]">
              <div className="max-w-5xl mx-auto text-center">
                <ScrollReveal>
                   <span className="text-[#153230] font-black text-sm tracking-[0.2em] uppercase mb-4 block">The Director's Lens</span>
                   <h2 className="text-4xl md:text-5xl font-black text-[#153230] mb-8 leading-tight">
                     The Force Multiplier
                   </h2>
                   <p className="text-xl text-[#153230]/80 leading-relaxed mb-4 max-w-3xl mx-auto">
                     Being a Senior Engineer means <em>you</em> are the weapon.
                   </p>
                   <p className="text-xl font-bold text-[#153230] mb-12">
                       "It is not up to them to validate your idea. It is your job to make the world recognize your genius."
                   </p>
                </ScrollReveal>

                <ScrollReveal delay={200}>
                   <div className="grid md:grid-cols-3 gap-8 text-left">
                      <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#4D7DA3]/10 hover:-translate-y-2 transition-transform">
                         <h3 className="text-xl font-black text-[#153230] mb-3">On Process</h3>
                         <p className="text-[#153230]/70">I implement Agile methodologies not as a ritual, but as a mechanism to shorten feedback loops and increase delivery speed.</p>
                      </div>
                      <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#4D7DA3]/10 hover:-translate-y-2 transition-transform relative overflow-hidden">
                         <div className="relative z-10">
                            <h3 className="text-xl font-black text-[#153230] mb-3">On Talent</h3>
                            <p className="text-[#153230]/70 mb-4">I identify talent that traditional metrics miss.</p>
                            <p className="text-sm font-bold italic text-[#4D7DA3]">"Don't tell a big dream to a small mind. They’re going to kill it."</p>
                         </div>
                      </div>
                      <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#4D7DA3]/10 hover:-translate-y-2 transition-transform h-full flex flex-col">
                         <h3 className="text-xl font-black text-[#153230] mb-3">On Impact</h3>
                         <p className="text-[#153230]/70 flex-grow">
                             "Positive impact creates MORE positive impact! If you can positively effect a life, you will create a ripple. One ripple can make a change so lasting that my grandchildren in the future will feel it."
                         </p>
                      </div>
                   </div>
                   <div className="mt-16">
                       <p className="text-3xl font-black text-[#153230]/90 leading-tight italic">
                        "I don't look for validation. I look for results."
                      </p>
                   </div>
                </ScrollReveal>
              </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="relative px-6 sm:px-12 md:px-20 py-24 bg-gradient-to-br from-[#153230] via-[#1E4B48] to-[#153230] text-center overflow-hidden">
               <div className="relative z-10 max-w-4xl mx-auto">
                 <ScrollReveal>
                   <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                     I changed my story.<br/>
                     <span className="text-[#4ade80]">Let's engineer yours.</span>
                   </h2>
                   <p className="text-xl text-white/80 mb-10 leading-relaxed">
                     Whether you need a Director to overhaul your architecture, or a Speaker to shift your organization's mindset from 'maintenance' to 'growth'—I am ready to execute.
                   </p>
                   <div className="flex flex-col sm:flex-row gap-6 justify-center">
                     <a href="mailto:contact@dthompsondev.com" className="bg-white text-[#153230] px-10 py-5 rounded-full font-black text-lg hover:scale-105 hover:shadow-2xl transition-all shadow-xl">
                       Consult with Danny
                     </a>
                     <a href="/#contact" className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-full font-black text-lg hover:bg-white hover:text-[#153230] hover:scale-105 transition-all">
                       Partner With Me
                     </a>
                   </div>
                 </ScrollReveal>
               </div>
            </section>

             {/* --- EXPLORE CONTENT (Existing Tabbed Section) --- */}
             <section className="px-6 sm:px-12 md:px-20 py-24 bg-white">
                <div className="max-w-6xl mx-auto">
                   <div className="text-center mb-12">
                      <h3 className="text-2xl font-black text-[#153230] uppercase tracking-widest opacity-50">Content Library</h3>
                      <h2 className="text-4xl font-black text-[#153230]">Explore My Talks & Media</h2>
                   </div>

                   {/* Tabs */}
                   <div className="flex justify-center gap-4 mb-12 flex-wrap">
                      {["all", "talks", "podcasts", "conferences"].map((tab) => (
                         <button
                            key={tab}
                            onClick={() => setActiveTab(tab as ContentTab)}
                            className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === tab ? "bg-[#153230] text-white shadow-lg" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                         >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                         </button>
                      ))}
                   </div>

                   <AnimatePresence mode="wait">
                      <motion.div
                         key={activeTab}
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -20 }}
                         transition={{ duration: 0.3 }}
                         className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                      >
                         {/* Filter Logic Implementation (Simplified for brevity, expanding on the pattern) */}
                         {(activeTab === "all" || activeTab === "talks") && videoTalks.map(talk => (
                            <a href={talk.youtubeUrl} key={talk.id} target="_blank" className="group block">
                               <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative mb-4">
                                  <img src={talk.thumbnail} alt={talk.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"/>
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                     <span className="bg-white text-[#153230] px-4 py-2 rounded-full font-bold text-sm">Watch Now</span>
                                  </div>
                               </div>
                               <h3 className="font-bold text-lg text-[#153230] group-hover:text-[#4D7DA3] transition-colors">{talk.title}</h3>
                               <p className="text-sm text-gray-500 mt-2 line-clamp-2">{talk.description}</p>
                            </a>
                         ))}
                         
                         {(activeTab === "all" || activeTab === "podcasts") && podcastAppearances.map(pod => (
                             <a href={pod.listenUrl} key={pod.id} target="_blank" className="group block bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                   <img src={pod.coverArt} alt={pod.podcastName} className="w-16 h-16 rounded-xl shadow-md"/>
                                   <div>
                                      <h4 className="font-bold text-[#153230]">{pod.podcastName}</h4>
                                      <span className="text-xs text-gray-500 uppercase">{pod.platform}</span>
                                   </div>
                                </div>
                                <h3 className="font-bold text-lg mb-2 group-hover:text-[#4D7DA3] transition-colors">{pod.episodeTitle}</h3>
                                <p className="text-sm text-gray-600 line-clamp-2">{pod.description}</p>
                             </a>
                         ))}
                         
                         {(activeTab === "all" || activeTab === "conferences") && conferenceAppearances.map(conf => (
                             <div key={conf.id} className="group block">
                                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative mb-4">
                                   <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                      {conf.date}
                                   </div>
                                   <img src={conf.photo} alt={conf.conferenceName} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"/>
                                </div>
                                <h3 className="font-bold text-xl text-[#153230]">{conf.conferenceName}</h3>
                                <p className="text-sm text-[#4D7DA3] font-bold text-sm mb-2">{conf.talkTitle}</p>
                                <p className="text-sm text-gray-500">{conf.location}</p>
                             </div>
                         ))}
                      </motion.div>
                   </AnimatePresence>
                </div>
             </section>

          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
