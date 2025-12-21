
export interface VideoTalk {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    youtubeUrl: string;
    views?: string;
    duration?: string;
    category: "talk" | "tutorial" | "interview";
}

export interface PodcastAppearance {
    id: string;
    podcastName: string;
    episodeTitle: string;
    description: string;
    coverArt: string;
    listenUrl: string;
    date: string;
    platform: string;
}

export interface ConferenceAppearance {
    id: string;
    conferenceName: string;
    talkTitle: string;
    description: string;
    date: string;
    location: string;
    attendees?: string;
    photo: string;
    color: string;
}

export const videoTalks: VideoTalk[] = [
    {
        id: "1",
        title: "Playing the Developer Job Search Game to Win in 2025",
        description: "Discussion with Leon Noel on freeCodeCamp about winning the developer job search in 2025.",
        thumbnail: "https://img.youtube.com/vi/6_qwLx8jwBY/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=6_qwLx8jwBY",
        category: "interview"
    },
    {
        id: "2",
        title: "From Gas Station Cook To Google Engineer",
        description: "My journey from working at a gas station to becoming a software engineer, featured on NoDegree podcast.",
        thumbnail: "https://img.youtube.com/vi/67SEA5QGqtA/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=67SEA5QGqtA",
        category: "interview"
    },
    {
        id: "3",
        title: "Open Source and AI with Danny Thompson",
        description: "Discussion with GitHub about the intersection of open source development and artificial intelligence.",
        thumbnail: "https://img.youtube.com/vi/68qYBxBiofE/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=68qYBxBiofE",
        category: "talk"
    },
];

export const podcastAppearances: PodcastAppearance[] = [
    {
        id: "1",
        podcastName: "The Scrimba Podcast",
        episodeTitle: "From Retail to Tech: Danny Thompson's Journey",
        description: "Discussing career transitions, community building, and how to break into tech without a CS degree.",
        coverArt: "https://via.placeholder.com/400x400/4D7DA3/ffffff?text=Scrimba",
        listenUrl: "https://podcast.link",
        date: "March 2024",
        platform: "Spotify"
    },
    {
        id: "2",
        podcastName: "Frontend Happy Hour",
        episodeTitle: "Building Communities & Personal Brands",
        description: "How developers can build authentic personal brands and leverage community for career growth.",
        coverArt: "https://via.placeholder.com/400x400/84803E/ffffff?text=Frontend+HH",
        listenUrl: "https://podcast.link",
        date: "January 2024",
        platform: "Apple Podcasts"
    },
];

export const conferenceAppearances: ConferenceAppearance[] = [
    {
        id: "1",
        conferenceName: "Commit Your Code Conference",
        talkTitle: "Organizer & Host",
        description: "Organized Dallas's premier tech conference with 8,960 attendees, 60 speakers, and speakers from Google, Microsoft, and Spotify.",
        date: "February 2025",
        location: "Dallas, TX",
        attendees: "8,960",
        photo: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/3.jpg",
        color: "#4D7DA3"
    },
    {
        id: "2",
        conferenceName: "React Summit",
        talkTitle: "Building Developer Communities at Scale",
        description: "Keynote on strategies for growing authentic developer communities from 0 to 10K+ members.",
        date: "June 2024",
        location: "Amsterdam, Netherlands",
        photo: "https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/1.jpg",
        color: "#84803E"
    },
];
