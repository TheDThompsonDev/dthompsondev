"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { useState } from "react";
import { JourneySlider } from "@/components/about/JourneySlider";
import { ForkInTheRoadDiagram } from "@/components/about/ForkInTheRoadDiagram";
import { StrategyGraphic } from "@/components/about/StrategyGraphic";
import { ClosedMouthsGraphic } from "@/components/about/ClosedMouthsGraphic";
import { ImpactGraphic } from "@/components/about/ImpactGraphic";

type ContentTab = "all" | "talks" | "podcasts" | "conferences";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<ContentTab>("all");

  return (
    <>
      {/* --- HERO SECTION --- */}
      <section className="relative px-4 sm:px-8 md:px-20 py-10 sm:py-16 md:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#4D7DA3]/10 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#84803E]/10 to-transparent rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <ScrollReveal>

            {/* Floating Inspiration Badge */}
            <div className="inline-block mb-4 sm:mb-8 animate-float">
              <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white shadow-xl border border-[#4D7DA3]/20 flex items-center gap-3">
                <span className="text-[#153230] font-bold italic text-xs sm:text-sm md:text-base">
                  "You are one decision away from a completely different life."
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-[#153230] leading-[0.9] mb-4 sm:mb-8 tracking-tight">
              Potential is nothing<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4D7DA3] to-[#153230]">without execution.</span>
            </h1>

            <p className="text-base sm:text-xl md:text-2xl text-[#153230]/70 font-medium leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-12">
              I didn't know coding was for me. I thought it was for the PhDs and the rocket scientists.
              I didn't wait for the tech industry to invite me in. I built the door myself.
            </p>

            <a href="#origin" className="inline-block bg-[#153230] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg hover:bg-[#4D7DA3] transition-all transform hover:scale-105 shadow-xl">
              See The Blueprint ↓
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* --- CHAPTER 1: THE ORIGIN --- */}
      <section id="origin" className="px-6 sm:px-12 md:px-20 py-24 relative bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[45%_55%] gap-12 items-center">

          <ScrollReveal>
            <div className="order-2 lg:order-1">
              <span className="text-[#84803E] font-black text-sm tracking-[0.2em] uppercase mb-4 block">Chapter 1: The Ceiling and the Fear</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#153230] mb-8 leading-tight">
                The Full Story: From the Fryer to the Future
              </h2>
              <div className="space-y-6 text-lg text-[#153230]/80 leading-relaxed font-medium">
                <p>
                  For over ten years, my life was defined by the smell of old grease. It is a distinct scent. It clings to your clothes. It seeps into your pores. Eventually, it tries to settle into your soul.
                </p>
                <p>
                  I was working at a gas station frying chicken. I was working eighty hours a week. Sometimes one hundred hours a week. When my son was born, I worked one hundred and two hours in a single week. I was killing myself with effort, but I was standing still.
                </p>
                <p>
                  To be honest, for a long time I thought I was doing great. I grew up in the hood in Brooklyn. I wasn't in jail. I wasn't dead. I had a job. The bills were kind of paid. But there was a looming fear that lived in the back of my mind every single day. I knew that if I took even one week off work, the lights would go out. I couldn't afford to be sick. I couldn't afford to rest. I was working hard enough to survive, but I was working hard enough to still be broke.
                </p>
                <p>
                  That gas station was my ceiling. I thought a guy like me wasn't allowed to do anything else.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative order-1 lg:order-2">
              <div className="absolute -inset-4 bg-[#84803E] rounded-[2rem] rotate-[3deg] opacity-20"></div>
              <JourneySlider />
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* --- CHAPTER 2: THE FORK --- */}
      <section className="px-6 sm:px-12 md:px-20 py-24 bg-white relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <ScrollReveal>
            <span className="text-[#153230] font-black text-sm tracking-[0.2em] uppercase mb-4 block">Chapter 2: The Fork in the Road</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#153230] mb-8 leading-tight">
              The Moment Everything Changed
            </h2>
            <div className="space-y-6 text-lg text-[#153230]/80 leading-relaxed font-medium">
              <p>
                I was thirty years old when I finally hit the wall. I looked at my life and had a terrifying realization. I was at a fork in the road.
              </p>
              <blockquote className="border-l-4 border-l-[#153230] pl-6 py-2 my-8 relative text-left mx-auto max-w-2xl bg-gray-50 p-6 rounded-r-xl">
                <p className="text-2xl font-black text-[#153230] italic leading-tight relative z-10">
                  "If I go right, I'm going to work in this gas station until the day I die. If I go left, I had to make a change. It had to be now."
                </p>
              </blockquote>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200}>
          <div className="mb-16">
            <ForkInTheRoadDiagram />
          </div>

          <div className="max-w-3xl mx-auto space-y-6 text-lg text-[#153230]/80 leading-relaxed font-medium text-center">
            <p>
              Around that time, I saw an interview on TV. A rapper had invested millions into a tech company. The interviewer asked him why. He said simply, "I am learning how to code."
            </p>
            <p>
              It blew my mind. My thought process was that coding was for PhDs and rocket scientists. It wasn't for average people. It certainly wasn't for me. But his reasoning hit me hard. He asked why we wouldn't want to understand the machine we touch ninety percent of our day.
            </p>
            <p>
              I realized he was right. From the RAM to the Application Layer, I was clueless about the tool I used daily.
            </p>
            <p className="font-bold text-[#153230] text-xl">
              So I opened my laptop. I went to FreeCodeCamp.org. I started to learn.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* --- CHAPTER 3: THE LESSON --- */}
      <section className="px-6 sm:px-12 md:px-20 py-24 bg-[#F0FDF4] relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">

          <ScrollReveal>
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-[#4ade80] rounded-[2rem] rotate-[-2deg] opacity-10"></div>
              <ClosedMouthsGraphic />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="order-1 lg:order-2">
              <span className="text-[#4ade80] font-black text-sm tracking-[0.2em] uppercase mb-4 block">Chapter 3: The Lost Promotion and the Lesson</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#153230] mb-6 leading-tight">
                Closed Mouths Don't Get Fed
              </h2>

              <div className="space-y-6 text-lg text-[#153230]/80 leading-relaxed">
                <p>
                  While I was learning, something happened at the gas station that changed my entire perspective on value.
                </p>
                <p>
                  I had been working there for years. I was outworking everyone. I was covering shifts. I was doing everything I thought a good employee should do. A new guy joined the team. Four or five months later, he walked into the boss's office. When he came out, he was the Store Manager.
                </p>
                <p>
                  I couldn't comprehend it. I had been there longer. I worked harder. I knew the job better. I asked him how he did it.
                </p>
                <p className="text-[#153230] font-bold text-xl italic border-l-4 border-[#4ade80] pl-4">
                  He looked at me and said, "I went in there, and I demanded it."
                </p>
                <p>
                  That moment changed my life. I realized I had missed out on life changing opportunities simply because I didn't raise my hand. I missed out because I didn't say, "I am interested. I think I can do that." I was waiting for someone to tap me on the shoulder and reward my hard work. I learned the hard way that closed mouths don't get fed.
                </p>
                <p className="font-bold text-[#4ade80]">
                  I made a vow to myself that day. I will never miss an opportunity again simply because I was too afraid to speak.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* --- CHAPTER 4: THE GRIND --- */}
      <section className="px-6 sm:px-12 md:px-20 py-32 bg-[#153230] text-white relative overflow-hidden">
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4ade80]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <ScrollReveal>
            <div>
              <span className="text-[#4ade80] font-black text-sm tracking-[0.2em] uppercase mb-4 block">Chapter 4: The Grind and "Popeyes"</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                Motivation is Fleeting.<br />Drive is Reliable.
              </h2>
              <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                <p>
                  I took that energy into my studies. But finding the time was brutal. I had a wife, a kid, and that one hundred hour work week. The math didn't work.
                </p>
                <p>
                  The only time that belonged to me was before the sun came up. My family woke up at 7:00 AM. So I started waking up at 4:00 AM every single day. I wasn't motivated. I hate mornings. But I was <strong>driven</strong>. Motivation is fleeting. Drive is doing it because you have to.
                </p>
                <p>
                  I built my first app. It was a terrible image filter that was Instagram's worst nightmare. But I was proud of it. I decided to go to a local meetup.
                </p>
                <p>
                  I walked into that first room and instantly realized I knew nothing. They were speaking a foreign language. Java. C Sharp. SQL. I felt small. I realized in that moment that I was being excluded from the conversation.
                </p>
                <p>
                  I vowed that night: <strong>I will never be excluded again.</strong>
                </p>
                <p>
                  But the reality of those meetups was harsh. My nickname became "Popeyes." I would time my shift to end at 6:30 PM so I could sprint to a 7:00 PM meetup. I didn't have time to shower. Within twenty minutes, the entire room smelled like fried chicken because of me.
                </p>
                <p className="bg-white/5 p-6 rounded-xl border-l-4 border-[#4ade80] italic">
                  "I sat there fighting suffocating imposter syndrome. I told myself they wanted a professional developer, not a professional chicken fryer."
                </p>
                <p>
                  But I kept showing up. I went to fifty four meetups in my first year. I realized that while I couldn't choose my family, I could choose my influences. I asked senior engineers to tear apart my code. I weaponized my ignorance to learn faster.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#4ade80] rounded-[2rem] rotate-[3deg] opacity-20"></div>
              <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-black/50 border border-white/10 shadow-2xl group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/firstMeetup.png"
                  alt="My First Local Meetup"
                  className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#153230] via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6">
                  <div className="text-white font-mono text-xs sm:text-sm font-bold bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border-l-4 border-[#4ade80] inline-block mb-1">
                    07:30 PM
                  </div>
                  <p className="text-white/90 text-sm font-mono pl-1">The First Meetup that changed everything.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* --- CHAPTER 5: THE PIVOT --- */}
      <section className="px-6 sm:px-12 md:px-20 py-24 relative bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#4D7DA3] rounded-[2rem] rotate-[-2deg] opacity-20"></div>
              <StrategyGraphic />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div>
              <span className="text-[#4D7DA3] font-black text-sm tracking-[0.2em] uppercase mb-4 block">Chapter 5: The Strategic Pivot</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#153230] mb-6 leading-tight">
                Strategy Over Spray and Pray
              </h2>
              <h3 className="text-2xl font-bold text-[#4D7DA3] mb-8 italic">
                "Stop negotiating with your potential."
              </h3>
              <div className="space-y-6 text-lg text-[#153230]/80 leading-relaxed font-medium">
                <p>
                  When I was ready to apply for jobs, I didn't just spray and pray. I used strategy.
                </p>
                <p>
                  I analyzed the market in Memphis. I saw that the top ten companies I wanted to work for weren't using the trendy new frameworks. They were using <strong>Java and Angular</strong>. So I didn't waste time on what was cool on Twitter. I learned exactly what my target market was buying.
                </p>
                <p>
                  I started cold messaging hiring managers on LinkedIn. I was terrified. But I did the risk analysis. If I send a message and they say no, I have lost nothing. They aren't coming to my gas station. I will never see them again. But if one person says yes, my entire family tree changes.
                </p>
                <p>
                  The strategy worked. But I didn't jump at the first offer. <strong>I turned down six job offers before accepting my first role.</strong>
                </p>
                <p>
                  People thought I was crazy. I was broke. But I wasn't desperate. I knew that if I took the wrong job, I would just be trading one depression for another. I wasn't looking for a paycheck. I was looking for a trajectory.
                </p>
                <p className="border-l-4 border-[#4D7DA3] pl-4">
                  I walked into interviews with a Value Mindset. I didn't beg for a chance. I said, "I am valuable. I will bring value to this team. If you give me the opportunity, I will bring so much value you won't be able to afford to lose me."
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* --- CHAPTER 6: THE EVOLUTION --- */}
      <section className="px-6 sm:px-12 md:px-20 py-24 bg-[#0B1120] text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual (Left) */}
          <ScrollReveal>
            <div className="relative">
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

          {/* Text (Right) */}
          <ScrollReveal delay={200}>
            <div>
              <span className="text-cyan-400 font-black text-sm tracking-[0.2em] uppercase mb-4 block">Chapter 6: The Evolution to Director</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                From Syntax to Strategy
              </h2>
              <p className="text-xl font-bold text-cyan-200 mb-8 italic">
                "I don't hire credentials. I hire trajectory."
              </p>
              <div className="space-y-6 text-lg text-cyan-50/80 leading-relaxed">
                <p>
                  Getting the job was just the starting line. My journey wasn't linear. It was exponential.
                </p>
                <p>
                  I learned early on that a hard worker is the poorest person in the room. A hard worker with a plan owns the room.
                </p>
                <p>
                  My technical evolution mirrored the industry. I started by mastering the Enterprise Stack with Java and Angular because that built stability. But as I moved into leadership and became a Director of Technology, I realized stability isn't enough. You need velocity.
                </p>
                <p>
                  I led teams in migrating legacy monoliths to Microservices using <strong>Go (Golang) and React</strong>. I learned that Go offers the concurrency needed for modern speed, and React offers the scale for modern UIs.
                </p>
                <p>
                  Today, my role isn't just about writing code. It is about de-risking architecture. It is about aligning engineering with revenue. I leverage tools like <strong>Snowflake</strong> for data and **AWS** for scale. I don't sugarcoat code reviews. When you sugarcoat something, people eat it instead of looking at it. I give my teams the raw data so we can fix the problem and ship.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* --- CHAPTER 7: THE MISSION --- */}
      <section className="px-6 sm:px-12 md:px-20 py-24 bg-[#E2F3F2]">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <span className="text-[#153230] font-black text-sm tracking-[0.2em] uppercase mb-4 block">Chapter 7: The Mission</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#153230] mb-8 leading-tight">
              The Measure of Success
            </h2>

            <div className="space-y-6 text-lg text-[#153230]/80 leading-relaxed max-w-3xl mx-auto text-center">
              <p>
                I achieved the goal. I climbed the ladder. But I realized that success that isn't shared is failure. I am no longer obsessed with making the most money. I am obsessed with leaving the world better than I found it.
              </p>
              <p>
                That is why I founded the <strong>Commit Your Code</strong> conference. That is why I speak in prisons. When you teach a prisoner to code, you aren't just teaching them a skill. You are dropping their recidivism rate to near zero. You are handing them a tool to rewrite their future.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <ImpactGraphic />
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="space-y-6 text-lg text-[#153230]/80 leading-relaxed max-w-4xl mx-auto text-center mt-12">
              <p className="text-xl font-bold text-[#153230] italic">
                "I stand here today not just as a Director of Technology, but as proof of a simple truth: Potential is nothing without execution."
              </p>
              <p>
                You can be Popeyes today, and you can be a leader tomorrow. The smell of grease was temporary. The skills I built were permanent.
              </p>
              <h3 className="text-3xl font-black text-[#153230] mt-8">
                I changed my story. Now, I help others engineer theirs.
              </h3>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative px-6 sm:px-12 md:px-20 py-24 bg-gradient-to-br from-[#153230] via-[#1E4B48] to-[#153230] text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              I changed my story.<br />
              <span className="text-[#4ade80]">Let's engineer yours.</span>
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Whether you need a Director to overhaul your architecture, or a Speaker to shift your organization's mindset from 'maintenance' to 'growth', I am ready to execute.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="mailto:contact@dthompsondev.com" className="bg-white text-[#153230] px-10 py-5 rounded-full font-black text-lg hover:scale-105 hover:shadow-2xl transition-all shadow-xl">
                Consult with Danny
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
