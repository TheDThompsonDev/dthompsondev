'use client';

import { ScrollReveal } from "@/components/ScrollReveal";
import { ContactModalButton } from "@/components/ContactModalButton";
import Link from "next/link";
import Image from "next/image";

export default function ResourcesPage() {
  const ecosystemItems = [
    {
      id: "podcast",
      title: "The Programming Podcast",
      subtitle: "Weekly technical deep dives & career advice. Join us as we explore the latest in tech, interview industry leaders, and break down complex concepts.",
      label: "PODCAST",
      color: "#5d5a2e",
      cardBg: "bg-[#54433A]", // Warm Brown
      image: "/resources/podcast-art.png",
      link: "/podcast",
      imageStyle: "object-cover scale-75 shadow-2xl rounded-lg rotate-[-2deg] hover:rotate-0 transition-all duration-500"
    },
    {
      id: "linkedin-series",
      title: "LinkedIn Series",
      subtitle: "Master your professional presence with our comprehensive video series. Learn to network, optimize your profile, and attract recruiters.",
      label: "SERIES",
      color: "#2e6089",
      cardBg: "bg-[#1E293B]", // Dark Slate Navy
      image: "/resources/linkedin-thumb.png",
      link: "#",
      imageStyle: "object-contain scale-[0.85] shadow-2xl rounded-lg hover:scale-90 transition-all duration-500"
    },
    {
      id: "discord",
      title: "Commit Your Code Discord!",
      subtitle: "Join 12,000+ developers in our active community. Daily job posts, code reviews, career advice, and weekly study groups. Free forever.",
      label: "COMMUNITY",
      color: "#15803d",
      cardBg: "bg-[#142A25]", // Deep Green
      image: "/resources/discord-logo.png",
      link: "https://discord.gg/pWGt6JMV9t",
      imageStyle: "object-contain scale-75 shadow-2xl rounded-2xl rotate-[2deg] hover:rotate-0 transition-all duration-500"
    },
    {
      id: "crash-course",
      title: "LinkedIn Crash Course",
      subtitle: "100% Free on LinkedIn Learning. A structured path to mastering LinkedIn for developers, from profile creation to content strategy.",
      label: "COURSE",
      color: "#0369a1",
      cardBg: "bg-[#0B1120]", // Deepest Blue
      image: "/resources/course-thumb.png",
      link: "#",
      imageStyle: "object-contain scale-[0.85] shadow-2xl rounded-lg hover:scale-90 transition-all duration-500"
    }
  ];

  return (
    <>
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

      {/* New Content Ecosystem Section - Updated Design */}
      <section className="mx-4 mt-8 mb-12">
        <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
          {ecosystemItems.map((item, index) => (
            <Link href={item.link} key={item.id} className="block group">
              <div className="bg-white rounded-[32px] overflow-hidden shadow-lg border-2 border-transparent hover:border-[#4D7DA3]/20 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] flex flex-col md:flex-row h-full">

                {/* Image Section */}
                <div className={`relative w-full md:w-[400px] h-[300px] md:h-auto overflow-hidden flex items-center justify-center ${item.cardBg}`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                      backgroundSize: '32px 32px'
                    }}
                  />

                  {/* Floating Image */}
                  <div className="relative w-full h-full p-8 flex items-center justify-center">
                    <div className="relative w-full h-full shadow-2xl">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className={item.imageStyle}
                      />
                    </div>
                  </div>

                  {/* Label Badge Overlay */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black text-white shadow-lg z-20" style={{ backgroundColor: item.color }}>
                    {item.label}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-center relative">
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, #153230 1px, transparent 0)',
                      backgroundSize: '24px 24px'
                    }}
                  />

                  <div className="relative z-10">
                    <h2 className="text-2xl md:text-4xl font-black text-[#153230] mb-4 leading-tight group-hover:text-[#4D7DA3] transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-lg text-[#153230]/70 leading-relaxed mb-6">
                      {item.subtitle}
                    </p>

                    <div className="flex items-center text-[#153230] font-bold group-hover:text-[#4D7DA3] transition-colors">
                      <span className="mr-2">View Resource</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
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
              <ContactModalButton
                className="bg-white text-[#153230] px-8 py-4 rounded-full font-bold hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                Get in Touch
              </ContactModalButton>
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
    </>
  );
}
