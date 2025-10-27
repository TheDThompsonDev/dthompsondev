export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  audioUrl?: string;
  videoUrl?: string;
  thumbnail?: string;
  duration?: string;
  publishDate: string;
  platform: 'spotify' | 'youtube';
  externalUrl: string;
}

interface PodcastEpisodeProps {
  episode: PodcastEpisode;
  index?: number;
}

export function PodcastEpisode({ episode, index = 0 }: PodcastEpisodeProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2F3F2] p-6 md:p-8 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Thumbnail */}
        <div className="shrink-0">
          <div className="w-full md:w-48 h-32 md:h-36 bg-gradient-to-br from-[#4D7DA3] to-[#153230] rounded-xl overflow-hidden relative group">
            {episode.thumbnail ? (
              <img 
                src={episode.thumbnail} 
                alt={episode.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-8V6a2 2 0 012-2h2a2 2 0 012 2v2M7 7h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z" />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <a 
                href={episode.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 text-[#153230] p-3 rounded-full hover:bg-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                episode.platform === 'youtube' 
                  ? 'bg-[#FF0000] text-white' 
                  : 'bg-[#1DB954] text-white'
              }`}>
                {episode.platform === 'youtube' ? 'YouTube' : 'Spotify'}
              </span>
              <span className="text-sm text-[#153230]/70">{formatDate(episode.publishDate)}</span>
            </div>
            {episode.duration && (
              <span className="text-sm text-[#153230]/70 font-bold">
                {episode.duration}
              </span>
            )}
          </div>

          <h3 className="text-xl md:text-2xl font-black text-[#153230] mb-3 leading-tight">
            {episode.title}
          </h3>

          <p className="text-[#153230]/80 mb-4 leading-relaxed line-clamp-3">
            {episode.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <a 
              href={episode.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#4D7DA3] text-white px-6 py-3 rounded-full hover:bg-[#3d6a8a] hover:scale-105 transition-all duration-300 font-bold flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              {episode.platform === 'youtube' ? 'Watch on YouTube' : 'Listen on Spotify'}
            </a>
            
            {episode.audioUrl && (
              <button className="bg-[#153230] text-white px-6 py-3 rounded-full hover:bg-[#0f2624] hover:scale-105 transition-all duration-300 font-bold flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Preview
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
