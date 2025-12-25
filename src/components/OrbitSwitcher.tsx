"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { samplePosts } from "@/data/blogPosts";
import { PERSONA_INFO } from "@/data/personaContent";
import { CENTER_PERSON, VISITOR_ARCHETYPES, ROOMS, type PersonaArchetype } from "@/data/personaArchetypes";

function ArchetypeAvatar({ archetype, size = 64, isCenter = false }: { archetype: any; size?: number; isCenter?: boolean }) {
  const colors = {
    danny: "from-[#153230] via-[#4D7DA3] to-[#3d6a8a]",
    p1: "from-[#4D7DA3] to-[#3d6a8a]",
    p2: "from-[#84803E] to-[#6a6731]",
    p3: "from-[#153230] to-[#0f2624]",
    p4: "from-[#4D7DA3] to-[#3d6a8a]",
    p5: "from-[#84803E] to-[#6a6731]",
    p6: "from-[#153230] to-[#0f2624]",
  };

  const gradient = colors[archetype.id as keyof typeof colors] || colors.danny;

  return (
    <div className="flex items-center justify-center">
      <div
        className={`rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl ${isCenter ? 'ring-4 ring-[#4D7DA3]/30' : 'ring-2 ring-white'}`}
        style={{ width: size, height: size, fontSize: size > 70 ? '32px' : '24px' }}
      >
        {isCenter ? CENTER_PERSON.initials : archetype.icon}
      </div>
    </div>
  );
}

export function OrbitSwitcher() {
  const [mode, setMode] = React.useState<"orbit" | "rooms">("orbit");
  const [selectedPerson, setSelectedPerson] = React.useState<string | null>(null);
  const [hoveredPerson, setHoveredPerson] = React.useState<string | null>(null);
  const [isOrbitHovered, setIsOrbitHovered] = React.useState(false);

  const containerHeight = 700;
  const containerWidth = 1000;
  const radius = 280;
  const center = { x: 0, y: 0 };

  const selected = selectedPerson ? VISITOR_ARCHETYPES.find(p => p.id === selectedPerson) : null;
  const activePersonId = selectedPerson || hoveredPerson;

  const personPositions = [
    { angle: 155, radiusOffset: 1.25, curveDir: 1.5 },
    { angle: 340, radiusOffset: 1.7, curveDir: -1.5 },
    { angle: 225, radiusOffset: 1.45, curveDir: 1 },
    { angle: 190, radiusOffset: 1.65, curveDir: -1 },
    { angle: 380, radiusOffset: 1.25, curveDir: -1.2 },
    { angle: 290, radiusOffset: 1.15, curveDir: -1 },
  ];

  return (
    <div className="rounded-3xl bg-white p-4 sm:p-8 shadow-xl border-2 -mt-8 border-[#4D7DA3]/20 relative z-30" style={{ boxShadow: '0 -10px 30px -10px rgba(77, 125, 163, 0.3), 0 10px 30px -10px rgba(0, 0, 0, 0.1)' }}>
      {/* Toggle hidden for now per user request
      <div className="mb-4 sm:mb-6 inline-flex rounded-full bg-[#E2F3F2] p-1.5 shadow-inner w-full sm:w-auto justify-center">
        {(["orbit", "rooms"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setMode(t)}
            className={`rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 flex-1 sm:flex-initial ${
              mode === t ? "bg-white shadow-lg text-[#153230]" : "text-[#153230]/60 hover:text-[#153230]"
            }`}
          >
            {t === "orbit" ? "Orbit View" : "Room View"}
          </button>
        ))}
      </div>
      */}

      <AnimatePresence mode="wait">
        {mode === "orbit" ? (
          <motion.div
            key="orbit"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#E2F3F2] to-white p-4 sm:p-12"
            style={{ position: 'relative' }}
          >
            <div className="text-center mb-4 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-black text-[#153230] mb-2">What persona matches you?</h3>
              <p className="text-xs sm:text-sm text-[#153230]/60">
                <span className="hidden sm:inline">Click to discover tailored resources for your role</span>
                <span className="sm:hidden">Tap a card to learn more</span>
              </p>
            </div>

            {/* Mobile Card Grid */}
            <div className="lg:hidden grid grid-cols-2 gap-3 sm:gap-4">
              {VISITOR_ARCHETYPES.map((p) => (
                <motion.div
                  key={`mobile-${p.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedPerson(selectedPerson === p.id ? null : p.id)}
                  className={`rounded-xl p-3 sm:p-4 cursor-pointer transition-all duration-300 border-2 ${selectedPerson === p.id
                    ? 'bg-white border-[#4D7DA3] shadow-lg scale-105'
                    : 'bg-white border-[#E2F3F2] shadow-sm hover:shadow-md hover:border-[#4D7DA3]/40'
                    }`}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <ArchetypeAvatar archetype={p} size={56} />
                    <div>
                      <div className="text-sm font-black text-[#153230] leading-tight">{p.label}</div>
                      <div className="text-xs text-[#153230]/60 mt-0.5">{p.description}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop Orbit View */}
            <div
              className="hidden lg:block relative w-full mx-auto"
              style={{ height: `${containerHeight}px`, maxWidth: `${containerWidth}px` }}
              onMouseEnter={() => setIsOrbitHovered(true)}
              onMouseLeave={() => setIsOrbitHovered(false)}
            >
              {/* Curved connection paths - properly meeting each icon */}
              <svg
                className="absolute inset-0 pointer-events-none"
                viewBox={`0 0 ${containerWidth} ${containerHeight}`}
                preserveAspectRatio="xMidYMid meet"
                style={{ width: '100%', height: '100%' }}
              >
                {VISITOR_ARCHETYPES.map((p, i) => {
                  const pos = personPositions[i];
                  const angle = (pos.angle * Math.PI) / 180;
                  const effectiveRadius = radius * pos.radiusOffset;

                  const centerX = containerWidth / 2;
                  const centerY = containerHeight / 2;
                  const px = centerX + effectiveRadius * Math.cos(angle);
                  const py = centerY + effectiveRadius * Math.sin(angle);
                  const isActive = activePersonId === p.id;

                  const midX = (centerX + px) / 2;
                  const midY = (centerY + py) / 2;
                  const curveMagnitude = 60 * pos.curveDir;
                  const controlX = midX + curveMagnitude * Math.cos(angle + Math.PI / 2);
                  const controlY = midY + curveMagnitude * Math.sin(angle + Math.PI / 2);

                  return (
                    <React.Fragment key={`line-group-${p.id}`}>
                      <motion.path
                        d={`M ${centerX} ${centerY} Q ${controlX} ${controlY}, ${px} ${py}`}
                        stroke="#4D7DA3"
                        strokeWidth={isActive ? "4" : "2"}
                        fill="none"
                        strokeDasharray={isActive ? "0" : "8,8"}
                        initial={{ opacity: 0.08, pathLength: 0 }}
                        animate={{
                          opacity: isActive ? 1 : (isOrbitHovered ? 0.25 : 0.08),
                          pathLength: 1
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                      {isActive && (
                        <motion.path
                          d={`M ${centerX} ${centerY} Q ${controlX} ${controlY}, ${px} ${py}`}
                          stroke="#4D7DA3"
                          strokeWidth="8"
                          fill="none"
                          opacity="0.4"
                          filter="blur(8px)"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </svg>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-[#4D7DA3]/20 rounded-full blur-xl animate-pulse"></div>
                  <ArchetypeAvatar archetype={CENTER_PERSON} size={90} isCenter={true} />
                  <div className="mt-3 text-center">
                    <div className="text-base font-black text-[#153230]">{CENTER_PERSON.name}</div>
                    <div className="text-xs text-[#153230]/60 font-medium">{CENTER_PERSON.role}</div>
                  </div>
                </motion.div>
              </div>

              {VISITOR_ARCHETYPES.map((p, i) => {
                const pos = personPositions[i];
                const angle = (pos.angle * Math.PI) / 180;
                const effectiveRadius = radius * pos.radiusOffset;
                const x = center.x + effectiveRadius * Math.cos(angle);
                const y = center.y + effectiveRadius * Math.sin(angle);
                const isSelected = selectedPerson === p.id;
                const isHovered = hoveredPerson === p.id;
                const isActive = isSelected || isHovered;

                return (
                  <motion.div
                    key={p.id}
                    layoutId={`avatar-${p.id}`}
                    style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                    initial={{ scale: 0, opacity: 0, y: 20 }}
                    animate={{
                      scale: isSelected ? 1.3 : (isOrbitHovered ? 1 : 0.5),
                      opacity: isOrbitHovered ? 1 : 0.4,
                      y: isOrbitHovered ? 0 : 20
                    }}
                    whileHover={{
                      scale: 1.5,
                      y: -5
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: isOrbitHovered ? i * 0.08 : 0
                    }}
                    onClick={() => setSelectedPerson(isSelected ? null : p.id)}
                    onMouseEnter={() => setHoveredPerson(p.id)}
                    onMouseLeave={() => setHoveredPerson(null)}
                  >
                    <motion.div
                      className={`rounded-full ${isActive ? 'ring-4 ring-[#4D7DA3] ring-offset-2' : ''}`}
                    >
                      <ArchetypeAvatar archetype={p} size={70} />
                    </motion.div>
                    <motion.div
                      className="mt-3 text-center max-w-[150px] absolute left-1/2 -translate-x-1/2 top-full"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{
                        opacity: isOrbitHovered ? 1 : 0,
                        y: isOrbitHovered ? 0 : -10,
                        scale: isActive ? 1.1 : 1
                      }}
                      transition={{ delay: isOrbitHovered ? (i * 0.08 + 0.15) : 0 }}
                    >
                      <div className="text-sm font-bold text-[#153230] leading-tight bg-white px-3 py-2 rounded-lg shadow-md border border-[#4D7DA3]/20">{p.label}</div>
                      <div className="text-xs text-[#153230]/70 mt-1 bg-white/95 px-2 py-1 rounded">{p.description}</div>
                    </motion.div>
                  </motion.div>
                );
              })}

            </div>

            <AnimatePresence>
              {selectedPerson && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-black/20 z-40 rounded-2xl"
                  onClick={() => setSelectedPerson(null)}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {selectedPerson && selected && (
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute right-0 top-0 h-full w-full lg:max-w-md bg-white shadow-2xl p-4 sm:p-6 lg:p-8 border-l-2 border-[#4D7DA3] z-50 overflow-y-auto rounded-r-2xl"
                >
                  <button
                    onClick={() => setSelectedPerson(null)}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-[#153230]/10 hover:bg-[#153230]/20 flex items-center justify-center transition-colors font-bold text-[#153230] z-10"
                  >
                    ✕
                  </button>

                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <ArchetypeAvatar archetype={selected} size={64} />
                    <div className="flex-1 pr-8">
                      <h3 className="font-black text-lg sm:text-2xl text-[#153230] mb-1 leading-tight">{selected.label}</h3>
                      <p className="text-sm sm:text-base text-[#153230]/60 font-medium">{selected.description}</p>
                    </div>
                  </div>

                  {/* Content Focus */}
                  <div className="bg-gradient-to-br from-[#E2F3F2] to-[#E2F3F2]/30 rounded-xl p-3 sm:p-4 mb-4 border border-[#4D7DA3]/20">
                    <p className="text-xs sm:text-sm text-[#153230] font-medium">
                      {PERSONA_INFO[selected.id]?.contentFocus || 'Curated content for your journey'}
                    </p>
                  </div>

                  {/* Blog Posts for this Persona */}
                  <div className="mb-4">
                    <p className="text-xs sm:text-sm font-bold text-[#153230]/70 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span className="text-base">📚</span> Recommended Reading
                    </p>
                    <div className="space-y-3">
                      {samplePosts
                        .filter(post => post.targetPersonas?.includes(selected.id))
                        .slice(0, 3)
                        .map((post) => (
                          <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="block bg-white rounded-xl p-3 border border-[#4D7DA3]/10 hover:border-[#4D7DA3]/40 hover:shadow-md transition-all duration-300 group"
                          >
                            <div className="flex gap-3">
                              {post.coverImageUrl && (
                                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#4D7DA3]/10">
                                  <img
                                    src={post.coverImageUrl}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <span className="text-[10px] font-bold text-[#4D7DA3] uppercase tracking-wide">{post.category}</span>
                                <h4 className="text-sm font-bold text-[#153230] leading-tight group-hover:text-[#4D7DA3] transition-colors line-clamp-2">
                                  {post.title}
                                </h4>
                                <span className="text-[10px] text-[#153230]/60">{post.readTime}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      {samplePosts.filter(post => post.targetPersonas?.includes(selected.id)).length === 0 && (
                        <p className="text-sm text-[#153230]/60 text-center py-4">More content coming soon!</p>
                      )}
                    </div>
                  </div>

                  {/* Podcast Section */}
                  <div className="mb-4">
                    <p className="text-xs sm:text-sm font-bold text-[#153230]/70 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span className="text-base">🎙️</span> From The Podcast
                    </p>
                    <Link
                      href="/podcast"
                      className="block bg-gradient-to-br from-[#153230] to-[#1a3d3a] rounded-xl p-4 border border-[#4D7DA3]/20 hover:border-[#4D7DA3]/40 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#4D7DA3] flex items-center justify-center shrink-0">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-white leading-tight group-hover:text-[#4D7DA3] transition-colors">
                            The Programming Podcast
                          </h4>
                          <p className="text-xs text-white/70 mt-0.5">
                            Deep dives on career, tech & growth
                          </p>
                        </div>
                        <div className="text-white/60 group-hover:text-white transition-colors">
                          →
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Impact Stats */}
                  <div className="bg-gradient-to-r from-[#4D7DA3] to-[#3d6a8a] rounded-xl p-3 sm:p-4 mb-4 text-white">
                    <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-90">🚀 Real Impact</p>
                    <p className="text-sm font-bold leading-tight">{selected.stats}</p>
                  </div>

                  <Link
                    href={`/persona/${selected.id}`}
                    className="block w-full bg-gradient-to-r from-[#153230] to-[#4D7DA3] text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
                  >
                    View All Content for {selected.label}s →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="rooms"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            style={{ minHeight: '400px' }}
            className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 content-start"
          >
            {ROOMS.map((room) => (
              <div key={room.id} className="rounded-xl sm:rounded-2xl bg-[#E2F3F2] p-4 sm:p-5 shadow-lg border border-[#4D7DA3]/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="mb-3 sm:mb-4 flex items-center justify-between">
                  <div className="text-sm sm:text-base font-bold text-[#153230]">{room.icon} {room.title}</div>
                </div>

                <div className="mb-3 sm:mb-4 flex -space-x-2">
                  {VISITOR_ARCHETYPES.filter((p) => p.rooms.includes(room.id)).map((p) => (
                    <motion.div key={p.id} layoutId={`avatar-${p.id}`} className="inline-block">
                      <ArchetypeAvatar archetype={p} size={40} />
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-2">
                  {room.pins.map((pin) => (
                    <div
                      key={pin.id}
                      className="flex items-center justify-between rounded-lg sm:rounded-xl bg-white px-3 py-2.5 text-xs font-medium shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-[#4D7DA3]/10"
                    >
                      <span className="text-[#153230]">{pin.title}</span>
                      <span className="text-[#4D7DA3] font-bold">→</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-[#153230]/60 font-medium px-2">
        <span className="font-bold text-[#153230]">Orbit View:</span> Discover your path
      </div>
    </div>
  );
}