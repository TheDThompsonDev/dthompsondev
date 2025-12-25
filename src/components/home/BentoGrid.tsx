'use client';

import { useEffect, useState, useCallback } from 'react';
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

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

  const handleCardClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Keyboard navigation handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(index);
    }
  }, [activeIndex]);

  return (
    <>
      {/* Desktop View - Original Polaroid Layout */}
      <div
        className="hidden lg:block relative w-full h-[850px] perspective-[2000px]"
        role="region"
        aria-label="Photo gallery of community events"
      >
        <div className="absolute -inset-8 bg-gradient-to-br from-[#4D7DA3]/20 via-[#84803E]/20 to-[#153230]/20 blur-[120px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(77,125,163,0.1),transparent_70%)]"></div>

        <div className="relative w-full h-full">
          {polaroidCards.map((card, index) => {
            if (!displayImages[index]) return null;
            const isHighlighted = hoveredIndex === index || focusedIndex === index;

            return (
              <div
                key={index}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${displayImages[index].alt}`}
                className={`absolute ${card.size} transition-all duration-700 ease-out cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{
                  top: card.top,
                  left: card.left,
                  rotate: isHighlighted ? '0deg' : card.rotate,
                  zIndex: isHighlighted ? 100 : card.zIndex,
                  transitionDelay: card.delay,
                  transform: isHighlighted
                    ? `scale(1.15) translateY(-20px) rotate(0deg)`
                    : `scale(1) translateY(0) rotate(${card.rotate})`,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                <div className="relative bg-white rounded-2xl p-3 pb-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)] transition-all duration-700">
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full shadow-lg transition-all duration-700 z-20"
                    style={{
                      backgroundColor: card.color,
                      opacity: isHighlighted ? 0 : 1,
                      transform: isHighlighted
                        ? 'translateX(-50%) translateY(-10px) scale(0.5)'
                        : 'translateX(-50%) translateY(0) scale(1)',
                    }}
                    aria-hidden="true"
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
                      className={`object-cover transition-all duration-700 ${isHighlighted ? 'scale-110 brightness-110 saturate-110' : 'scale-100'
                        }`}
                      sizes="600px"
                      quality={90}
                    />

                    <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-500 ${isHighlighted ? 'opacity-100' : 'opacity-0'
                      }`}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile View - Compact Grid Layout */}
      <div
        className="lg:hidden relative w-full"
        role="region"
        aria-label="Photo gallery of community events"
      >
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {displayImages.slice(0, 9).map((image, index) => {
            const isActive = activeIndex === index;
            const card = polaroidCards[index];

            return (
              <div
                key={index}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${image.alt}`}
                aria-pressed={isActive}
                className={`relative transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                  } ${isActive ? 'col-span-2 row-span-2' : 'col-span-1'}`}
                style={{
                  transitionDelay: card.delay,
                }}
                onClick={() => handleCardClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                <div className={`relative bg-white rounded-lg p-1.5 sm:p-2 pb-3 sm:pb-4 shadow-lg transition-all duration-300 ${isActive ? 'shadow-2xl scale-105' : 'shadow-md'
                  }`}>
                  <div
                    className="absolute -top-1.5 sm:-top-2 left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full shadow-md z-10"
                    style={{
                      backgroundColor: card.color,
                    }}
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 rounded-full" style={{
                      background: `radial-gradient(circle at 30% 30%, ${card.color}, ${card.color}dd)`,
                    }}></div>
                    <div className="absolute inset-0 rounded-full" style={{
                      background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.3), transparent)',
                    }}></div>
                  </div>

                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded bg-gray-100">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className={`object-cover transition-all duration-300 ${isActive ? 'scale-105' : 'scale-100'
                        }`}
                      sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 400px"
                      quality={90}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subtle background effect for mobile */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#4D7DA3]/10 via-transparent to-[#84803E]/10 blur-2xl"></div>
      </div>
    </>
  );
}