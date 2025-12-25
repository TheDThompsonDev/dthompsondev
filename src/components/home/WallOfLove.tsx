'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Daisy Le",
    handle: "LinkedIn",
    role: "Software Engineer",
    platform: "linkedin",
    content: "Danny is not only a skilled software engineer but also a dedicated mentor who genuinely cares about helping others succeed in tech. His guidance and support have been invaluable to me, and I'm grateful for his mentorship.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daisy"
  },
  {
    id: 2,
    name: "Matthew Smith",
    handle: "LinkedIn",
    role: "Software Engineer",
    platform: "linkedin",
    content: "Danny gave me the guidance I needed and told me what I needed to hear to land my first job in tech. I wouldn’t be where I am if Danny didn’t take an interest in helping me.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Matthew"
  },
  {
    id: 3,
    name: "Dennis Garcia",
    handle: "LinkedIn",
    role: "Full Stack Engineer",
    platform: "linkedin",
    content: "Danny is an outstanding individual who has not only inspired me to excel in my technical skills but has also imparted invaluable wisdom on handling interviews. I highly recommend Danny as he is a remarkable individual, an exceptional mentor, and a great advocate.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dennis"
  },
  {
    id: 4,
    name: "Tessa Mero",
    handle: "LinkedIn",
    role: "Head of Developer Relations",
    platform: "linkedin",
    content: "Danny always goes above and beyond expectations and has impressed us. The goals and metrics we have worked with he’s always outperformed and has brought so much value to our business. Anyone who works with him is extremely lucky.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tessa"
  },
  {
    id: 5,
    name: "David Godinez",
    handle: "LinkedIn",
    role: "Founder | Data Architect",
    platform: "linkedin",
    content: "Danny has a huge heart for the tech community. As a self-taught engineer, his skills are second to none. I've seen his work first hand and he is truly remarkable.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidG"
  },
  {
    id: 6,
    name: "Haider Tiwana",
    handle: "LinkedIn",
    role: "Developer",
    platform: "linkedin",
    content: "Danny does not mess around. He’s been an invaluable asset in my career path dropping knowledge bomb after knowledge bomb. I’m consistently impressed with his ability to deliver actionable insights in such short time.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Haider"
  },
  {
    id: 7,
    name: "Tanish Surmawala",
    handle: "LinkedIn",
    role: "Site Reliability Engineer",
    platform: "linkedin",
    content: "Danny is one of the most motivated people I have seen. He gave me lots of advice on what I should do in order to better myself and my skills. He has also offered to be there for me if I ever need any sort of help.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tanish"
  },
  {
    id: 8,
    name: "Manuel Cubillo",
    handle: "LinkedIn",
    role: "Senior Software Engineer",
    platform: "linkedin",
    content: "Danny gave me great advice on how I could improve my own marketing of myself, as well as offering to help with mock interviews. Not everyone takes out of their Sunday afternoon to offer mentorship. I appreciate all of his help.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Manuel"
  },
  {
    id: 9,
    name: "David Nguyen",
    handle: "LinkedIn",
    role: "Staff Software Engineer",
    platform: "linkedin",
    content: "I am amazed at the growth of GDG Memphis under Danny Thompson's leadership. Danny is an amazing communicator and is always looking to help people. He is also extremely hard working.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidN"
  },
  {
    id: 10,
    name: "Sam Horne",
    handle: "LinkedIn",
    role: "Android Software Engineer",
    platform: "linkedin",
    content: "Danny is a huge role model of mine... At the center of the Memphis tech movement is someone who is inspiring others, instilling confidence, and developing leaders.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam"
  },
  {
    id: 11,
    name: "John Durham",
    handle: "LinkedIn",
    role: "IT Support & Developer",
    platform: "linkedin",
    content: "Danny is exemplary in leadership. He is a success driven asset to any team, displaying in depth knowledge of Python, Javascript, HTML/CSS, and much more. Danny take your team and project beyond success.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
  },
  {
    id: 12,
    name: "Walker Laury",
    handle: "LinkedIn",
    role: "IT & Programming",
    platform: "linkedin",
    content: "Danny is a very talented developer. He goes above and beyond with his projects, his teamwork, and leadership. He is constantly working on his skills, while also helping to bring up others around them.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Walker"
  },
  {
    id: 13,
    name: "JC Smiley",
    handle: "LinkedIn",
    role: "Full Stack Engineer",
    platform: "linkedin",
    content: "Danny Thompson is very skilled in python and web development. He has exceeded the requirement for every task he has been given and just wants to do a good job. He is also a leader at the non-profit, Code Connective.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JC"
  },
  {
    id: 14,
    name: "Lawrence Lockhart",
    handle: "LinkedIn",
    role: "Developer Advocate",
    platform: "linkedin",
    content: "It's always a pleasure to work on initiatives with a partner who engages at an equal or higher level than yourself. Danny is such a person. A team that has Danny is a team destined to win.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lawrence"
  },
  {
    id: 15,
    name: "Sara Baqla",
    handle: "LinkedIn",
    role: "Developer",
    platform: "linkedin",
    content: "Danny is a man of action. He’s created incredible opportunities for developers like myself to grow and level up. Most notably, his new Commit Your Talk series has been an amazing, supportive space to practice public speaking in a way that directly relates to tech roles and strengthening our own skills. I feel more confident with every meeting and am embracing the uncomfortable feeling of growth. You can definitely catch me speaking at a conference in 2026!",
    avatar: "https://twxvicohcixbzang.public.blob.vercel-storage.com/testimonials/sara-baqla.jpg"
  }
];

const Column = ({ testimonials, duration = 20, className = "" }: { testimonials: typeof TESTIMONIALS, duration?: number, className?: string }) => (
  <div className={`flex flex-col gap-6 ${className}`}>
    <motion.div
      animate={{ y: [0, -1000] }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop"
      }}
      className="flex flex-col gap-6"
    >
      {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
        <div key={`${t.id}-${i}`} className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2F3F2] hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Image src={t.avatar} alt="" width={40} height={40} className="rounded-full bg-gray-100" />
              <div>
                <div className="font-bold text-[#153230] text-sm">{t.name}</div>
                <div className="text-xs text-[#153230]/60">{t.handle}</div>
              </div>
            </div>
            <div className="text-[#4D7DA3]">
              {t.platform === 'twitter' && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              )}
              {t.platform === 'linkedin' && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              )}
              {t.platform === 'discord' && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" /></svg>
              )}
            </div>
          </div>
          <p className="text-[#153230]/80 text-sm leading-relaxed">
            "{t.content}"
          </p>
          <div className="mt-4 pt-4 border-t border-[#E2F3F2] flex items-center gap-2">
            <span className="text-xs font-bold text-[#4D7DA3] bg-[#4D7DA3]/10 px-2 py-1 rounded-full">
              {t.role}
            </span>
          </div>
        </div>
      ))}
    </motion.div>
  </div>
);

export const WallOfLove = () => {
  return (
    <section className="relative py-20 bg-[#F8FDFF] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#153230] mb-6">
            Loved by <span className="text-[#4D7DA3]">Developers</span>
          </h2>
          <p className="text-lg text-[#153230]/70 max-w-2xl mx-auto">
            Join thousands of developers who have accelerated their careers through our community, mentorship, and events.
          </p>
        </div>

        <div className="relative h-[600px] overflow-hidden mask-image-gradient">
          {/* Gradient Masks */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F8FDFF] to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F8FDFF] to-transparent z-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Column testimonials={TESTIMONIALS.slice(0, 5)} duration={45} />
            <Column testimonials={TESTIMONIALS.slice(5, 10)} duration={55} className="hidden md:flex" />
            <Column testimonials={TESTIMONIALS.slice(10, 15)} duration={50} className="hidden lg:flex" />
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-[#153230] text-white px-8 py-4 rounded-full font-bold hover:bg-[#4D7DA3] transition-colors shadow-lg hover:shadow-xl hover:scale-105 transform duration-300">
            Join the Community
          </button>
        </div>
      </div>
    </section>
  );
};
