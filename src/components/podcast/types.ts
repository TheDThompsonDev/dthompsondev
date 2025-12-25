export type Episode = {
    id: string;
    title: string;
    description: string;
    audioUrl?: string;
    videoUrl?: string;
    thumbnail?: string;
    duration?: string;
    publishDate: string;
    platform: 'spotify' | 'youtube';
};

export interface RadioTunerProps {
    mergedEpisodes: Episode[];
    selectedIndex: number;
    setSelectedIndex: (index: number | ((prev: number) => number)) => void;
    getThumbnailUrl: (baseUrl: string | undefined, episodeIndex: number) => string | undefined;
    handleThumbnailError: (episodeIndex: number) => void;
    thumbnailError: Record<number, number>;
    formatDate: (dateString: string) => string;
    onPlatformClick?: (platform: 'spotify' | 'youtube', episodeTitle: string) => void;
}

export interface RadioTunerDesktopProps extends RadioTunerProps {
    setIsHovering: (isHovering: boolean) => void;
    knobHandlers: {
        onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
        onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
        onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
        onMouseUp: () => void;
        onMouseLeave: () => void;
        onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
        onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
        onTouchEnd: () => void;
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    };
}
