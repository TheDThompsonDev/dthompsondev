import { ScrollReveal } from '@/components/ScrollReveal';
import { PodcastPageClient } from '@/components/PodcastPageClient';
import { headers } from 'next/headers';
import type { Episode, PodcastData } from '@/types/podcast';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'The Programming Podcast | Danny Thompson & Leon Noel',
  description: 'Deep dives into programming, technology, and career growth with Leon Noel and Danny Thompson.',
};

export default async function PodcastPage() {
  let episodes: Episode[] = [];
  let error: string | null = null;

  try {
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/podcast.json`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch podcast data: ${res.status}`);
    }

    const data: PodcastData = await res.json();
    episodes = data.episodes || [];

    if (data.error) {
      error = data.error;
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error';
  }

  return (
    <>
      {/* Hero Section */}
      <section className="px-4 sm:px-8 md:px-16 py-8 sm:py-12 md:py-24 border-b-2 border-[#153230]/10">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 sm:gap-2.5 bg-[#153230] text-white px-3 sm:px-5 py-2 sm:py-2.5 mb-4 sm:mb-8 font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase">
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse"></div>
                <div className="absolute w-2 h-2 bg-[#4ade80] rounded-full animate-ping"></div>
              </div>
              <span>New Episodes Weekly</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-[#153230] mb-4 sm:mb-8 leading-[0.95] tracking-tighter">
              The Programming<br />
              Podcast
            </h1>

            <p className="text-base sm:text-xl md:text-2xl text-[#153230]/70 mb-6 sm:mb-12 leading-relaxed max-w-3xl font-medium">
              Deep dives into programming, technology, and career growth with Leon Noel and Danny Thompson.
              Real talk about AI, career advice, and everything developers need to thrive.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-4">
              <a
                href="https://www.youtube.com/@TheProgrammingPodcast"
                target="_blank"
                rel="noopener noreferrer"
                className="group/yt flex items-center gap-2 sm:gap-3 bg-[#CC0000] hover:bg-[#990000] text-white px-4 sm:px-8 py-3 sm:py-5 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-2xl hover:shadow-[#CC0000]/30 hover:-translate-y-1"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span>YouTube</span>
              </a>
              <a
                href="https://open.spotify.com/show/6d59PZ138KeoKfq5hoVvyQ"
                target="_blank"
                rel="noopener noreferrer"
                className="group/sp flex items-center gap-2 sm:gap-3 bg-[#15803d] hover:bg-[#16a34a] text-white px-4 sm:px-8 py-3 sm:py-5 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-2xl hover:shadow-[#15803d]/30 hover:-translate-y-1"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                <span>Spotify</span>
              </a>
              <a
                href="https://podcasts.apple.com/us/podcast/the-programming-podcast/id1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="group/ap flex items-center gap-2 sm:gap-3 bg-[#153230] hover:bg-[#4D7DA3] text-white px-4 sm:px-8 py-3 sm:py-5 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-2xl hover:shadow-[#153230]/30 hover:-translate-y-1"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <span>Apple Podcasts</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Episodes Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="px-4 sm:px-8 md:px-16 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#153230] tracking-tight">
            All Episodes
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-[#4D7DA3] mt-3 sm:mt-4"></div>
        </div>
        <PodcastPageClient episodes={episodes} error={error} />
      </section>
    </>
  );
}