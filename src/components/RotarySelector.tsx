'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import styles from './RotarySelector.module.css';
import { contentItems, type ContentItem } from '@/data/contentEcosystem';

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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const dialRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);

  // Minimum swipe distance (in px) to trigger navigation
  const minSwipeDistance = 50;

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

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

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
    <div className="rounded-3xl -mt-8 bg-white p-4 sm:p-8 shadow-xl border-2 border-[#4D7DA3]/20 relative z-20" style={{ boxShadow: '0 -10px 30px -10px rgba(77, 125, 163, 0.3), 0 10px 30px -10px rgba(0, 0, 0, 0.1)' }}>
      {/* Magnetic Field Visualization */}
      {isMounted && magneticField && (
        <div
          className="absolute pointer-events-none z-10 hidden lg:block"
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

      <div className="max-w-[1400px] mx-auto p-4 sm:p-8 py-4 sm:py-20 lg:min-h-0 min-h-[calc(100vh-8rem)]">
        {/* White Card Container */}

        {/* Enhanced Header */}
        <div className="text-center mb-4 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-[#153230] mb-2 sm:mb-4">
            My Content <span className="text-[#4D7DA3]">Ecosystem</span>
          </h2>
          <p className="text-[#153230]/70 text-sm sm:text-lg lg:text-xl mb-3 sm:mb-8 max-w-2xl mx-auto px-4">
            <span className="hidden lg:inline">Drag to rotate • Arrow keys to navigate</span>
            <span className="lg:hidden">Swipe through my content</span>
          </p>

          {/* Enhanced Controls */}
          <div className="flex gap-2 sm:gap-4 justify-center flex-wrap px-4">
            <button
              onClick={handlePrev}
              className="group bg-[#153230] hover:bg-[#4D7DA3] w-[100px] sm:w-[160px] text-white px-3 sm:px-8 py-2 sm:py-4 rounded-full font-bold text-xs sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span className="flex items-center gap-1 sm:gap-2 justify-center">
                <span>←</span>
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </span>
            </button>

            <button
              onClick={handleNext}
              className="group bg-[#153230] hover:bg-[#4D7DA3] w-[100px] sm:w-[160px] text-center flex justify-center text-white px-3 sm:px-8 py-2 sm:py-4 rounded-full font-bold text-xs sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span className="flex items-center gap-1 sm:gap-2 justify-center">
                <span>Next</span>
                <span>→</span>
              </span>
            </button>
          </div>
        </div>

        {/* Desktop View - Rotary Dial */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Rotary Dial - Desktop Only */}
          <div className="relative" ref={containerRef}>
            <div className="relative w-full aspect-square max-w-[700px] mx-auto">
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-[#4D7DA3]/20"></div>

              {/* Needle with Enhanced Effects */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className={styles['needle-enhanced']}
                  style={{
                    filter: `drop-shadow(0 0 20px ${currentColor}80) drop-shadow(0 0 40px ${currentColor}40)`,
                  }}
                />
              </div>

              {/* Enhanced Particles */}
              {isMounted && particles.map((particle) => (
                <div
                  key={particle.id}
                  className={styles['particle-enhanced']}
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) translate(${particle.x}px, ${particle.y}px)`,
                    background: particle.color,
                    boxShadow: `0 0 20px ${particle.color}, 0 0 40px ${particle.color}40`,
                  } as React.CSSProperties}
                />
              ))}

              {/* Main Dial */}
              <div
                ref={dialRef}
                className={styles['rotary-dial-enhanced']}
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
                      className={`${styles['dial-item-enhanced']} ${isSelected ? styles['selected'] : ''} ${isHovered ? styles['hovered'] : ''}`}
                      style={{
                        left: `calc(50% + ${x}%)`,
                        top: `calc(50% + ${y}%)`,
                        transform: isMounted ? `translate(-50%, -50%) rotate(${-rotation}deg)` : 'translate(-50%, -50%) rotate(0deg)',
                        '--item-color': itemColor,
                        '--item-glow': item.glowColor || itemColor,
                      } as React.CSSProperties}
                    >
                      <div className={styles['dial-item-inner-enhanced']}>
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
                      {isSelected && isMounted && <div className={styles['selection-ring-enhanced']}></div>}
                      {isHovered && isMounted && <div className={styles['hover-ring']}></div>}
                    </button>
                  );
                })}

                {/* Enhanced Center Hub */}
                <div className={styles['center-hub-enhanced']}>
                  <div className={styles['hub-inner-enhanced']}>
                    <div className="text-[#153230] text-lg font-black tracking-wider">OPEN</div>
                    <div className="w-3 h-3 bg-[#4D7DA3] rounded-full mt-3 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Detail Panel */}
          <div className={styles['detail-panel-enhanced']}>
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
                      className="w-[500px] h-36 object-cover rounded-2xl"
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
                      backgroundColor: `${currentColor}30`,
                      borderColor: currentColor,
                      color: '#153230',
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
                        backgroundColor: `${currentColor}25`,
                        borderColor: `${currentColor}50`,
                        color: '#153230',
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

        {/* Mobile View - Card Layout */}
        <div className="lg:hidden flex flex-col h-full">
          <div
            className="flex-1 flex flex-col space-y-4"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Mobile Icon Selector - MOVED TO TOP */}
            <div className="flex flex-col items-center shrink-0">
              <p className="text-[#153230]/60 text-xs font-semibold mb-2 animate-pulse">
                👇 Tap any icon to explore
              </p>
              <div className="inline-flex gap-2 flex-wrap justify-center p-3 bg-[#E2F3F2] rounded-xl max-w-full relative">
                {contentItems.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  const itemColor = item.color || '#4D7DA3';

                  return (
                    <button
                      key={item.id}
                      onClick={() => rotateToIndex(index, false)}
                      className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border-2 overflow-hidden transition-all duration-300 ${isSelected ? 'scale-110 shadow-lg' : `scale-100 shadow-sm hover:scale-105 ${styles['animate-subtle-pulse']}`
                        }`}
                      style={{
                        borderColor: isSelected ? itemColor : '#E2F3F2',
                        boxShadow: isSelected ? `0 2px 8px ${itemColor}40` : undefined,
                      }}
                      aria-label={`View ${item.title}`}
                    >
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-full"
                      />
                      {isSelected && (
                        <div
                          className="absolute inset-0 border-2 rounded-full"
                          style={{ borderColor: itemColor }}
                        />
                      )}
                      {!isSelected && (
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Card Display */}
            <div
              className="bg-white rounded-2xl p-4 border-2 relative overflow-hidden shadow-lg flex-1 flex flex-col"
              style={{
                borderColor: currentColor,
                boxShadow: `0 8px 32px ${currentColor}20, 0 4px 16px rgba(0,0,0,0.1)`,
              }}
            >
              <div className="relative z-10 flex flex-col h-full">
                {/* Image Section */}
                <div className="mb-3 shrink-0">
                  <Image
                    src={selectedItem.image || selectedItem.icon}
                    alt={selectedItem.title}
                    width={500}
                    height={160}
                    className="w-full h-36 object-cover rounded-xl"
                  />
                </div>

                {/* Title Section */}
                <div className="mb-3 shrink-0">
                  <h3 className="text-xl sm:text-2xl font-black text-[#153230] leading-tight mb-1">{selectedItem.title}</h3>
                  <p
                    className="text-base sm:text-lg font-bold"
                    style={{ color: currentColor }}
                  >
                    {selectedItem.subtitle}
                  </p>
                </div>

                {/* Selected Badge */}
                <div className="mb-3 shrink-0">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold border-2"
                    style={{
                      backgroundColor: `${currentColor}20`,
                      borderColor: currentColor,
                      color: currentColor,
                    }}
                  >
                    {selectedIndex + 1} OF {contentItems.length}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[#153230]/80 text-sm mb-3 leading-relaxed line-clamp-3 shrink-0">
                  {selectedItem.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4 shrink-0">
                  {selectedItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg text-xs font-bold border"
                      style={{
                        backgroundColor: `${currentColor}25`,
                        borderColor: `${currentColor}50`,
                        color: '#153230',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 shrink-0 mt-auto">
                  {selectedItem.link?.map((linkItem, index) => (
                    <button
                      key={index}
                      onClick={() => window.open(linkItem.url, '_blank')}
                      className="w-full bg-[#153230] hover:bg-[#4D7DA3] text-white px-4 py-2.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <span className="truncate">{linkItem.text}</span>
                      <span>→</span>
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
    <div className="relative bg-[#E2F3F2] py-8 sm:py-16 px-4 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-white rounded-[32px] p-6 sm:p-8 md:p-12 shadow-xl border border-[#4D7DA3]/10">
          <div className="text-center mb-8 sm:mb-16">
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
  ),
});

export default RotarySelector;