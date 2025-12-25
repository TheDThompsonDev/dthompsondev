"use client";

import {
  AboutHero,
  ChapterOrigin,
  ChapterFork,
  ChapterLesson,
  ChapterGrind,
  ChapterPivot,
  ChapterEvolution,
  ChapterMission,
  AboutCTA
} from "@/components/about/chapters";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ChapterOrigin />
      <ChapterFork />
      <ChapterLesson />
      <ChapterGrind />
      <ChapterPivot />
      <ChapterEvolution />
      <ChapterMission />
      <AboutCTA />
    </>
  );
}
