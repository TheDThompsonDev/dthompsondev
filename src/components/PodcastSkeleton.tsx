/**
 * Loading skeleton for podcast episodes
 */
export function PodcastEpisodeSkeleton() {
  return (
    <article className="relative bg-white border-2 border-[#153230]/10 overflow-hidden">
      <div className="p-6 md:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Thumbnail skeleton */}
          <div className="shrink-0 relative">
            <div className="w-full lg:w-72 h-48 lg:h-48 bg-[#153230]/10 animate-pulse"></div>
          </div>

          {/* Content skeleton */}
          <div className="flex-1 flex flex-col">
            {/* Meta info */}
            <div className="flex gap-3 mb-4">
              <div className="h-4 w-32 bg-[#153230]/10 animate-pulse"></div>
              <div className="h-4 w-16 bg-[#153230]/10 animate-pulse"></div>
            </div>

            {/* Title */}
            <div className="space-y-2 mb-4">
              <div className="h-8 w-full bg-[#153230]/10 animate-pulse"></div>
              <div className="h-8 w-3/4 bg-[#153230]/10 animate-pulse"></div>
            </div>

            {/* Description */}
            <div className="space-y-2 mb-6">
              <div className="h-4 w-full bg-[#153230]/10 animate-pulse"></div>
              <div className="h-4 w-full bg-[#153230]/10 animate-pulse"></div>
              <div className="h-4 w-2/3 bg-[#153230]/10 animate-pulse"></div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-auto">
              <div className="h-12 w-32 bg-[#153230]/10 animate-pulse"></div>
              <div className="h-12 w-32 bg-[#153230]/10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Loading skeleton for radio tuner
 */
export function PodcastRadioSkeleton() {
  return (
    <div className="relative bg-gradient-to-b from-[#1a4039] via-[#153230] to-[#0f2624] rounded-2xl p-3 md:p-4 border-6 border-[#0a1a18] shadow-2xl overflow-hidden">
      <div className="space-y-3">
        {/* Dial section skeleton */}
        <div className="h-32 bg-black/20 rounded-lg animate-pulse"></div>
        
        {/* Display section skeleton */}
        <div className="h-48 bg-black/20 rounded-xl animate-pulse"></div>
        
        {/* Speaker section skeleton */}
        <div className="h-48 bg-black/20 rounded-2xl animate-pulse"></div>
        
        {/* CTA skeleton */}
        <div className="h-16 bg-[#d4af6a]/20 rounded animate-pulse"></div>
      </div>
    </div>
  );
}


