'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';

interface ContentItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  link?: { url: string; text: string }[];
  tags: string[];
  color?: string;
  glowColor?: string;
  image?: string | StaticImageData;
}

const contentItems: ContentItem[] = [
  {
    id: 'podcast',
    icon: '/rotaryIcons/1.png',
    title: 'The Programming Podcast',
    subtitle: "Podcast About Programming",
    description: 'Join Leon Noel and I as we talk about the latest in programming, technology, and career growth. We cover a wide range of topics, from the latest in AI to career advice.',
    tags: ['Audio', 'Weekly', 'AI Focus'],
    color: '#4D7DA3',
    glowColor: '#4D7DA3',
    image: '/podcast.jpg',
    link: [
      { url: 'https://www.youtube.com/@TheProgrammingPodcast', text: 'YouTube Channel' },
      { url: 'https://open.spotify.com/show/6d59PZ138KeoKfq5hoVvyQ?si=b83a2e884bd442e6', text: 'Spotify' },
      { url: 'https://podcasts.apple.com/us/podcast/the-programming-podcast/id1234567890', text: 'Apple Podcasts' },

    ],
  },
  {
    id: 'DSG',
    icon: '/rotaryIcons/3.png',
    title: 'Dallas Software Developers Group',
    subtitle: '1000+ Member Community',
    description: 'The largest software developer community in Dallas. Monthly meetups, networking events, and collaborative learning.',
    tags: ['Community', '1000+', 'In-Person'],
    color: '#153230',
    glowColor: '#153230',
    link: [
      { url: 'https://www.meetup.com/dallas-software-developers-meetup/', text: 'Meetup' },
      { url: 'https://discord.gg/pWGt6JMV9t', text: 'Discord' }
    ],
  },
  {
    id: 'developersGuideToAI',
    icon: '/rotaryIcons/11.png',
    title: 'Developers Guide to AI',
    subtitle: 'The Developer\'s Guide to AI',
    description: 'A comprehensive guide to AI for developers. Learn about the latest AI tools and techniques, and how to use them to build better software.',
    tags: ['AI', 'Guide', 'Education'],
    color: '#4D7DA3',
    glowColor: '#4D7DA3',
    link: [
      { url: 'https://developerguide.ai/', text: 'Link To Buy The Book!' },
    ],
  },
  {
    id: 'youtube',
    icon: '/rotaryIcons/2.png',
    title: 'YouTube Channel',
    subtitle: 'Technical Youtube Channel',
    description: 'In-depth coding tutorials, framework guides, and best practices for modern software development.',
    tags: ['Video', 'Weekly', 'Education'],
    color: '#84803E',
    glowColor: '#84803E',
    link: [
      { url: 'https://youtube.com/@dthompsondev', text: 'YouTube Channel' }
    ],
  },
  {
    id: 'linkedin-series',
    icon: '/rotaryIcons/8.png',
    title: 'The Official LinkedIn Series',
    subtitle: 'LinkedIn Series',
    description: 'This series has been included in colleges and universities around the world to help students get job offers on LinkedIn. I also created a course for LinkedIn to supplement the series!',
    tags: ['LinkedIn', 'Series', 'Professional'],
    color: '#4D7DA3',
    glowColor: '#4D7DA3',
    link: [
      { url: 'https://www.youtube.com/playlist?list=PL54X5yR8qizsMpvTCqUIEFMeEp-chvcxk', text: 'The Official LinkedIn Series' },
      { url: 'https://www.linkedin.com/learning/linkedin-profiles-for-technical-professionals/why-use-linkedin-to-get-you-a-job', text: '100% FREE Learning Course On Linkedin Learning' }
    ],
  },
  {
    id: 'linkedin-course',
    icon: '/rotaryIcons/6.png',
    title: 'LinkedIn Learning Course',
    subtitle: 'Professional Development',
    description: 'Comprehensive courses on modern development practices, AI integration, and career advancement strategies.',
    tags: ['Education', 'Course', 'Certificate'],
    color: '#153230',
    glowColor: '#153230',
    link: [
      { url: 'https://linkedin.com/learning/ai-for-developers', text: 'AI Course' },
      { url: 'https://linkedin.com/learning/career-advancement', text: 'Career Course' }
    ],
  },
  {
    id: 'leadership-lunches',
    icon: '/rotaryIcons/7.png',
    title: 'Leadership Exchange Lunches',
    subtitle: 'Monthly Networking Events',
    description: 'Intimate gatherings for engineering leaders to share experiences, challenges, and solutions over lunch.',
    tags: ['In-Person', 'Network', 'Leadership'],
    color: '#84803E',
    glowColor: '#84803E',
    link: [
      { url: 'https://meetup.com/leadership-lunches', text: 'Meetup' },
      { url: 'https://eventbrite.com/leadership-exchange', text: 'Eventbrite' }
    ],
  },
  {
    id: 'discord',
    icon: '/rotaryIcons/6.png',
    title: 'Commit Your Code Discord',
    subtitle: '24/7 Community Chat',
    description: 'Active developer community providing real-time help, code reviews, and discussions on all things software.',
    tags: ['Chat', '24/7', 'Community'],
    color: '#4D7DA3',
    glowColor: '#4D7DA3',
    link: [
      { url: 'https://discord.gg/pWGt6JMV9t', text: 'Main Discord' }
    ],
  },
  {
    id: 'Bluesky',
    icon: '/rotaryIcons/9.png',
    title: 'Bluesky',
    subtitle: 'Social Media Platform',
    description: 'Join me on Bluesky to connect with other developers and share your knowledge.',
    tags: ['Social', 'Community', 'Long-term'],
    color: '#84803E',
    glowColor: '#84803E',
    link: [
      { url: 'https://bsky.app/profile/dthompsondev.bsky.social', text: 'Bluesky Profile' },
    ],
  },
  {
    id: 'topmate',
    icon: '/rotaryIcons/10.png',
    title: '1:1 Calls on Topmate',
    subtitle: 'Book Expert Sessions',
    description: 'Direct access for code reviews, career advice, or technical discussions. Book a session that fits your schedule.',
    tags: ['Booking', 'Flexible', 'Expert'],
    color: '#84803E',
    glowColor: '#84803E',
    link: [
      { url: 'https://topmate.io/dthompsondev', text: 'Topmate Profile' },
    ],
  },
  {
    id: 'conference',
    icon: '/rotaryIcons/4.png',
    title: 'Commit Your Code Conference',
    subtitle: 'Annual Tech Conference',
    description: 'A full-day conference featuring industry experts, hands-on workshops, and networking opportunities.',
    tags: ['Annual', 'Conference', 'Workshops'],
    color: '#4D7DA3',
    glowColor: '#4D7DA3',
    link: [
      { url: 'https://commit-your-code.com/conference', text: 'Conference Site' },
      { url: 'https://eventbrite.com/cyc-conference', text: 'Eventbrite' }
    ],
  },
];

function RotarySelectorComponent() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartAngle, setDragStartAngle] = useState(0);
  const [dragStartRotation, setDragStartRotation] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [magneticField, setMagneticField] = useState<{ x: number; y: number; strength: number } | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dialRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);

  const itemCount = contentItems.length;
  const anglePerItem = 360 / itemCount;

  // Memoized calculations
  const selectedItem = useMemo(() => contentItems[selectedIndex], [selectedIndex]);
  const currentColor = useMemo(() => selectedItem.color || '#4D7DA3', [selectedItem]);

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const createParticleBurst = useCallback((color: string = currentColor) => {
    const newParticles = Array.from({ length: 16 }, (_, i) => ({
      id: particleIdRef.current++,
      x: Math.cos((i * Math.PI * 2) / 16) * (80 + Math.random() * 40),
      y: Math.sin((i * Math.PI * 2) / 16) * (80 + Math.random() * 40),
      color: color,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1200);
  }, [currentColor]);

  const rotateToIndex = useCallback((index: number, animated: boolean = true) => {
    if (animated) {
      setIsTransitioning(true);
    }
    setSelectedIndex(index);
    setRotation(-index * anglePerItem);
    createParticleBurst(contentItems[index].color);
    if (animated) {
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [anglePerItem, createParticleBurst]);

  const handleNext = useCallback(() => {
    const nextIndex = (selectedIndex + 1) % itemCount;
    rotateToIndex(nextIndex);
  }, [selectedIndex, itemCount, rotateToIndex]);

  const handlePrev = useCallback(() => {
    const prevIndex = (selectedIndex - 1 + itemCount) % itemCount;
    rotateToIndex(prevIndex);
  }, [selectedIndex, itemCount, rotateToIndex]);

  const calculateAngleFromMouse = useCallback((mouseX: number, mouseY: number, centerX: number, centerY: number) => {
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    setMousePosition({ x: mouseX - centerX, y: mouseY - centerY });
    
    if (isDragging && dialRef.current) {
      const angle = calculateAngleFromMouse(mouseX, mouseY, centerX, centerY);
      const deltaAngle = angle - dragStartAngle;
      const newRotation = dragStartRotation + deltaAngle;
      setRotation(newRotation);
      
      // Calculate which item should be selected based on rotation
      const normalizedRotation = ((newRotation % 360) + 360) % 360;
      const targetIndex = Math.round(normalizedRotation / anglePerItem) % itemCount;
      if (targetIndex !== selectedIndex) {
        setSelectedIndex(targetIndex);
      }
    }
  }, [isDragging, dragStartAngle, dragStartRotation, calculateAngleFromMouse, anglePerItem, itemCount, selectedIndex]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setIsDragging(true);
    setDragStartAngle(calculateAngleFromMouse(e.clientX, e.clientY, centerX, centerY));
    setDragStartRotation(rotation);
  }, [calculateAngleFromMouse, rotation]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      // Snap to nearest item
      const normalizedRotation = ((rotation % 360) + 360) % 360;
      const targetIndex = Math.round(normalizedRotation / anglePerItem) % itemCount;
      rotateToIndex(targetIndex);
    }
  }, [isDragging, rotation, anglePerItem, itemCount, rotateToIndex]);

  const handleItemHover = useCallback((index: number | null) => {
    setHoveredIndex(index);
    if (index !== null) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angle = index * anglePerItem;
        const x = Math.cos((angle - 90) * (Math.PI / 180)) * 45;
        const y = Math.sin((angle - 90) * (Math.PI / 180)) * 45;
        setMagneticField({ x: centerX + x, y: centerY + y, strength: 0.3 });
      }
    } else {
      setMagneticField(null);
    }
  }, [anglePerItem]);

  // Mouse tracking for magnetic effects
  useEffect(() => {
    const handleMouseMoveGlobal = (e: MouseEvent) => handleMouseMove(e);
    const handleMouseUpGlobal = () => handleMouseUp();
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMoveGlobal);
      document.addEventListener('mouseup', handleMouseUpGlobal);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMoveGlobal);
      document.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = contentItems[selectedIndex];
        if (item.link && item.link.length > 0) {
          window.open(item.link[0].url, '_blank');
        }
      } 
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  // Show loading state during hydration
  if (!isMounted) {
    return (
      <div className="relative bg-[#E2F3F2] py-16 px-4 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-[#4D7DA3]/10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-black text-[#153230] mb-4">
                Content <span className="text-[#4D7DA3]">My Content</span>
              </h2>
              <p className="text-[#153230]/70 text-xl mb-8 max-w-2xl mx-auto">
                Loading interactive experience...
              </p>
            </div>
            <div className="flex justify-center">
              <Loader2 className="w-16 h-16 text-[#4D7DA3] animate-spin" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl -mt-8 bg-white p-8 shadow-xl border-2 border-[#4D7DA3]/20" style={{ boxShadow: '0 -10px 30px -10px rgba(77, 125, 163, 0.3), 0 10px 30px -10px rgba(0, 0, 0, 0.1)' }}>
      {/* Magnetic Field Visualization */}
      {isMounted && magneticField && (
        <div 
          className="absolute pointer-events-none z-10"
          style={{
            left: magneticField.x - 50,
            top: magneticField.y - 50,
            width: 150,
            height: 150,
            background: `radial-gradient(circle, ${currentColor}20, transparent 70%)`,
            borderRadius: '50%',
            animation: 'magnetic-pulse 2s ease-in-out infinite',
          }}
        />
      )}
      
      <div className="max-w-[1400px] mx-auto p-8 py-20">
        {/* White Card Container */}

        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-[#153230] mb-4">
            My Content <span className="text-[#4D7DA3]">Ecosystem</span>
          </h2>
          <p className="text-[#153230]/70 text-xl mb-8 max-w-2xl mx-auto">
            Drag to rotate • Arrow keys to navigate
          </p>
          
          {/* Enhanced Controls */}
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={handlePrev}
              className="group bg-[#153230] hover:bg-[#4D7DA3] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span className="flex items-center gap-2">
                <span>←</span>
                <span>Previous</span>
              </span>
            </button>
              
            <button
              onClick={handleNext}
              className="group bg-[#153230] hover:bg-[#4D7DA3] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span className="flex items-center gap-2">
                <span>Next</span>
                <span>→</span>
              </span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Rotary Dial */}
          <div className="relative" ref={containerRef}>
            <div className="relative w-full aspect-square max-w-[700px] mx-auto">
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-[#4D7DA3]/20"></div>
              
              {/* Needle with Enhanced Effects */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div 
                  className="needle-enhanced"
                  style={{
                    filter: `drop-shadow(0 0 20px ${currentColor}80) drop-shadow(0 0 40px ${currentColor}40)`,
                  }}
                />
              </div>

              {/* Enhanced Particles */}
              {isMounted && particles.map((particle) => (
                <div
                  key={particle.id}
                  className="particle-enhanced"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) translate(${particle.x}px, ${particle.y}px)`,
                    background: particle.color,
                    boxShadow: `0 0 20px ${particle.color}, 0 0 40px ${particle.color}40`,
                  }}
                />
              ))}

              {/* Main Dial */}
              <div
                ref={dialRef}
                className="rotary-dial-enhanced"
                style={{
                  transform: isMounted ? `rotate(${rotation}deg)` : 'rotate(0deg)',
                  transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                }}
                onMouseDown={handleMouseDown}
              >
                {contentItems.map((item, index) => {
                  const angle = index * anglePerItem;
                  const radius = 50; // Slightly smaller radius
                  const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                  const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
                  const isSelected = index === selectedIndex;
                  const isHovered = hoveredIndex === index;
                  const itemColor = item.color || '#4D7DA3';

                  return (
                    <button
                      key={item.id}
                      onClick={() => rotateToIndex(index)}
                      onMouseEnter={() => handleItemHover(index)}
                      onMouseLeave={() => handleItemHover(null)}
                      className={`dial-item-enhanced ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
                        style={{
                          left: `calc(50% + ${x}%)`,
                          top: `calc(50% + ${y}%)`,
                          transform: isMounted ? `translate(-50%, -50%) rotate(${-rotation}deg)` : 'translate(-50%, -50%) rotate(0deg)',
                          '--item-color': itemColor,
                          '--item-glow': item.glowColor || itemColor,
                        } as React.CSSProperties}
                    >
                      <div className="dial-item-inner-enhanced">
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={100}
                          height={100}
                          className="w-27 h-27 overflow-hidden transition-transform duration-300 group-hover:scale-110 rounded-full object-cover [clip-path:circle(50%_at_50%_50%)]"
                          style={{ 
                            background: 'transparent',
                            mixBlendMode: 'normal'
                          }}
                        />
                      </div>
                      {isSelected && isMounted && <div className="selection-ring-enhanced"></div>}
                      {isHovered && isMounted && <div className="hover-ring"></div>}
                    </button>
                  );
                })}

                {/* Enhanced Center Hub */}
                <div className="center-hub-enhanced">
                  <div className="hub-inner-enhanced">
                    <div className="text-[#153230] text-lg font-black tracking-wider">OPEN</div>
                    <div className="w-3 h-3 bg-[#4D7DA3] rounded-full mt-3 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Detail Panel */}
          <div className="detail-panel-enhanced">
            <div 
              className="bg-white rounded-[24px] p-8 border-2 relative overflow-hidden group shadow-xl"
              style={{
                borderColor: currentColor,
                boxShadow: `0 8px 32px ${currentColor}20, 0 4px 16px rgba(0,0,0,0.1)`,
              }}
            >
              
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-6">
                  <div 
                    className="p-4 rounded-2xl transition-all duration-500 group-hover:scale-110"
                    style={{ 
                      backgroundColor: `${currentColor}15`,
                      color: currentColor 
                    }}
                  >
                    <Image
                      src={selectedItem.image || selectedItem.icon}
                      alt={selectedItem.title}
                      width={100}
                      height={100}
                      className="w-72 h-48 object-cover rounded-2xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-[#153230] mb-2">{selectedItem.title}</h3>
                    <p 
                      className="text-xl font-bold"
                      style={{ color: currentColor }}
                    >
                      {selectedItem.subtitle}
                    </p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <span 
                    className="inline-block px-4 py-2 rounded-full text-sm font-bold border-2"
                    style={{
                      backgroundColor: `${currentColor}20`,
                      borderColor: currentColor,
                      color: currentColor,
                    }}
                  >
                    SELECTED
                  </span>
                </div>

                <p className="text-[#153230]/80 text-lg mb-8 leading-relaxed">
                  {selectedItem.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {selectedItem.tags.map((tag, tagIndex) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-xl text-sm font-bold border transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: `${currentColor}15`,
                        borderColor: `${currentColor}40`,
                        color: currentColor,
                        animationDelay: `${tagIndex * 0.1}s`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {selectedItem.link?.map((linkItem, index) => (
                    <button 
                      key={index}
                      onClick={() => window.open(linkItem.url, '_blank')}
                      className="bg-[#153230] hover:bg-[#4D7DA3] text-white px-6 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <span>{linkItem.text}</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </button>
                  ))}
                
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
}

// Export with dynamic import to prevent SSR hydration issues
const RotarySelector = dynamic(() => Promise.resolve(RotarySelectorComponent), {
  ssr: false,
  loading: () => (
    <div className="relative bg-[#E2F3F2] py-16 px-4 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-[#4D7DA3]/10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black text-[#153230] mb-4">
              Content <span className="text-[#4D7DA3]">Ecosystem</span>
            </h2>
            <p className="text-[#153230]/70 text-xl mb-8 max-w-2xl mx-auto">
              Loading interactive experience...
            </p>
          </div>
          <div className="flex justify-center">
            <Loader2 className="w-16 h-16 text-[#4D7DA3] animate-spin" />
          </div>
        </div>
      </div>
    </div>
  ),
});

export default RotarySelector;