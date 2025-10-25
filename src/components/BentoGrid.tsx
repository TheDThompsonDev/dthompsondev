'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface BentoGridProps {
  images?: {
    src: string;
    alt: string;
  }[];
}

export function BentoGrid({ images }: BentoGridProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const defaultImages = [
    { src: '/placeholder1.jpg', alt: 'Conference speaking' },
    { src: '/placeholder2.jpg', alt: 'Mentoring session' },
    { src: '/placeholder3.jpg', alt: 'Community meetup' },
    { src: '/placeholder4.jpg', alt: 'Tech event' },
    { src: '/placeholder5.jpg', alt: 'Workshop' },
  ];

  const displayImages = images || defaultImages;

  const polaroidCards = [
    { delay: '0ms', rotate: '-6deg', top: '1%', left: '-10%', size: 'w-[220px]', zIndex: 10, color: '#DC2626' },
    { delay: '100ms', rotate: '5deg', top: '2%', left: '22%', size: 'w-[220px]', zIndex: 11, color: '#4D7DA3' },
    { delay: '200ms', rotate: '-4deg', top: '1%', left: '54%', size: 'w-[220px]', zIndex: 12, color: '#84803E' },
    { delay: '300ms', rotate: '3deg', top: '2%', left: '76%', size: 'w-[220px]', zIndex: 13, color: '#EAB308' },
    { delay: '200ms', rotate: '-5deg', top: '36%', left: '-6%', size: 'w-[220px]', zIndex: 14, color: '#3B82F6' },
    { delay: '300ms', rotate: '6deg', top: '37%', left: '24%', size: 'w-[220px]', zIndex: 15, color: '#10B981' },
    { delay: '200ms', rotate: '4deg', top: '36%', left: '46%', size: 'w-[220px]', zIndex: 16, color: '#153230' },
    { delay: '100ms', rotate: '-3deg', top: '37%', left: '76%', size: 'w-[220px]', zIndex: 17, color: '#F59E0B' },
    { delay: '200ms', rotate: '5deg', top: '71%', left: '-5%', size: 'w-[220px]', zIndex: 18, color: '#8B5CF6' },
    { delay: '100ms', rotate: '-4deg', top: '72%', left: '22%', size: 'w-[220px]', zIndex: 19, color: '#EC4899' },
    { delay: '300ms', rotate: '3deg', top: '71%', left: '44%', size: 'w-[220px]', zIndex: 20, color: '#06B6D4' },
    { delay: '100ms', rotate: '-5deg', top: '72%', left: '76%', size: 'w-[220px]', zIndex: 21, color: '#14B8A6' },
  ];

  return (
    <div className="relative w-full h-[850px] perspective-[2000px]">
      <div className="absolute -inset-8 bg-gradient-to-br from-[#4D7DA3]/20 via-[#84803E]/20 to-[#153230]/20 blur-[120px]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(77,125,163,0.1),transparent_70%)]"></div>
      
      <div className="relative w-full h-full">
        {polaroidCards.map((card, index) => {
          if (!displayImages[index]) return null;
          
          return (
            <div
              key={index}
              className={`absolute ${card.size} transition-all duration-700 ease-out cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                top: card.top,
                left: card.left,
                rotate: hoveredIndex === index ? '0deg' : card.rotate,
                zIndex: hoveredIndex === index ? 100 : card.zIndex,
                transitionDelay: card.delay,
                transform: hoveredIndex === index
                  ? `scale(1.15) translateY(-20px) rotate(0deg)`
                  : `scale(1) translateY(0) rotate(${card.rotate})`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative bg-white rounded-2xl p-3 pb-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)] transition-all duration-700">
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full shadow-lg transition-all duration-700 z-20"
                  style={{
                    backgroundColor: card.color,
                    opacity: hoveredIndex === index ? 0 : 1,
                    transform: hoveredIndex === index
                      ? 'translateX(-50%) translateY(-10px) scale(0.5)'
                      : 'translateX(-50%) translateY(0) scale(1)',
                  }}
                >
                  <div className="absolute inset-0 rounded-full" style={{
                    background: `radial-gradient(circle at 30% 30%, ${card.color}, ${card.color}dd)`,
                  }}></div>
                  <div className="absolute inset-0 rounded-full" style={{
                    background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.3), transparent)',
                  }}></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black/20"></div>
                </div>
                
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={displayImages[index].src}
                    alt={displayImages[index].alt}
                    fill
                    className={`object-fit transition-all duration-700 ${
                      hoveredIndex === index ? 'scale-110 brightness-110 saturate-110' : 'scale-100'
                    }`}
                    sizes="350px"
                  />
                  
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-500 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}