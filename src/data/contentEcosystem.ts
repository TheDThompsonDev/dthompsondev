import { StaticImageData } from 'next/image';

// Content ecosystem data types
export interface ContentItem {
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

// Content ecosystem items for the rotary selector
export const contentItems: ContentItem[] = [
    {
        id: 'podcast',
        icon: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/rotary/1.png',
        title: 'The Programming Podcast',
        subtitle: "Podcast About Programming",
        description: 'Join Leon Noel and I as we talk about the latest in programming, technology, and career growth. We cover a wide range of topics, from the latest in AI to career advice.',
        tags: ['Audio', 'Weekly', 'AI Focus'],
        color: '#4D7DA3',
        glowColor: '#4D7DA3',
        image: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/podcast.jpg',
        link: [
            { url: 'https://www.youtube.com/@TheProgrammingPodcast', text: 'YouTube Channel' },
            { url: 'https://open.spotify.com/show/6d59PZ138KeoKfq5hoVvyQ?si=b83a2e884bd442e6', text: 'Spotify' },
            { url: 'https://podcasts.apple.com/us/podcast/the-programming-podcast/id1234567890', text: 'Apple Podcasts' },
        ],
    },
    {
        id: 'DSD',
        icon: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/rotary/3.png',
        title: 'Dallas Software Developers Group',
        subtitle: '1000+ Member Community',
        description: 'The largest software developer community in Dallas. Monthly meetups, networking events, and collaborative learning.',
        tags: ['Community', '1000+', 'In-Person'],
        color: '#153230',
        glowColor: '#153230',
        image: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/dsdLogo.png',
        link: [
            { url: 'https://www.meetup.com/dallas-software-developers-meetup/', text: 'Meetup' },
            { url: 'https://discord.gg/pWGt6JMV9t', text: 'Discord' }
        ],
    },
    {
        id: 'developersGuideToAI',
        icon: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/rotary/11.png',
        title: 'Developers Guide to AI',
        subtitle: 'The Developer\'s Guide to AI',
        description: 'A comprehensive guide to AI for developers. Learn about the latest AI tools and techniques, and how to use them to build better software.',
        tags: ['AI', 'Guide', 'Education'],
        color: '#4D7DA3',
        glowColor: '#4D7DA3',
        image: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/aiBook.jpg',
        link: [
            { url: 'https://developerguide.ai/', text: 'Link To Buy The Book!' },
        ],
    },
    {
        id: 'youtube',
        icon: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/rotary/2.png',
        title: 'YouTube Channel',
        subtitle: 'Technical Youtube Channel',
        description: 'In-depth coding tutorials, framework guides, and best practices for modern software development.',
        tags: ['Video', 'Weekly', 'Education'],
        color: '#84803E',
        glowColor: '#84803E',
        image: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/youtube.png',
        link: [
            { url: 'https://youtube.com/@dthompsondev', text: 'YouTube Channel' }
        ],
    },
    {
        id: 'linkedin-series',
        icon: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/rotary/8.png',
        title: 'The Official LinkedIn Series',
        subtitle: 'LinkedIn Series',
        description: 'This series has been included in colleges and universities around the world to help students get job offers on LinkedIn. I also created a course for LinkedIn to supplement the series!',
        tags: ['LinkedIn', 'Series', 'Professional'],
        color: '#4D7DA3',
        glowColor: '#4D7DA3',
        image: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/linkedinSeries.png',
        link: [
            { url: 'https://www.youtube.com/playlist?list=PL54X5yR8qizsMpvTCqUIEFMeEp-chvcxk', text: 'The Official LinkedIn Series' },
            { url: 'https://www.linkedin.com/learning/linkedin-profiles-for-technical-professionals/why-use-linkedin-to-get-you-a-job', text: '100% FREE Learning Course On Linkedin Learning' }
        ],
    },
    {
        id: 'twitter',
        icon: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/rotary/twitter.png',
        title: 'Twitter',
        subtitle: 'Social Media Platform',
        description: 'Join me on Twitter to connect with other developers and share your knowledge.',
        tags: ['Social', 'Community', 'Long-term'],
        color: '#153230',
        glowColor: '#153230',
        image: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/twitterhero.png',
        link: [
            { url: 'https://x.com/dthompsondev', text: 'Twitter Profile' }
        ],
    },
    {
        id: '1:1 Help',
        icon: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/rotary/7.png',
        title: 'Mentoring',
        subtitle: 'Need 1:1 Guidance?',
        description: 'Need 1:1 Guidance? I offer personalized calls for managers and developers to help them grow their careers.',
        tags: ['Personal', 'Growth', 'Long-term'],
        color: '#84803E',
        glowColor: '#84803E',
        image: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/topmate1.png',
        link: [
            { url: 'https://topmate.io/dthompsondev', text: 'Topmate' }
        ],
    },
    {
        id: 'discord',
        icon: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/rotary/6.png',
        title: 'Commit Your Code Discord',
        subtitle: '24/7 Community Chat',
        description: 'Active developer community providing real-time help, code reviews, and discussions on all things software.',
        tags: ['Chat', '24/7', 'Community'],
        color: '#4D7DA3',
        glowColor: '#4D7DA3',
        image: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/discordHero2.png',
        link: [
            { url: 'https://discord.gg/pWGt6JMV9t', text: 'Main Discord' }
        ],
    },
    {
        id: 'Bluesky',
        icon: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/rotary/9.png',
        title: 'Bluesky',
        subtitle: 'Social Media Platform',
        description: 'Join me on Bluesky to connect with other developers and share your knowledge.',
        tags: ['Social', 'Community', 'Long-term'],
        color: '#84803E',
        glowColor: '#84803E',
        image: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/blueskyHero.png',
        link: [
            { url: 'https://bsky.app/profile/dthompsondev.bsky.social', text: 'Bluesky Profile' },
        ],
    },
    {
        id: 'Linkedin',
        icon: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/rotary/10.png',
        title: 'Linkedin',
        subtitle: 'Social Media Platform',
        description: 'Join me on Linkedin to connect with other developers and share your knowledge.',
        tags: ['Social', 'Community', 'Long-term'],
        color: '#84803E',
        glowColor: '#84803E',
        image: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/linkedinHero.png',
        link: [
            { url: 'https://linkedin.com/in/dthompsondev', text: 'Linkedin Profile' },
        ],
    },
    {
        id: 'conference',
        icon: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/rotary/4.png',
        title: 'Commit Your Code Conference',
        subtitle: 'Annual Tech Conference',
        description: 'A full-day conference featuring industry experts, hands-on workshops, and networking opportunities.',
        tags: ['Annual', 'Conference', 'Workshops'],
        color: '#4D7DA3',
        glowColor: '#4D7DA3',
        image: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/cycHero.png',
        link: [
            { url: 'https://commit-your-code.com/conference', text: 'Conference Site' },
            { url: 'https://eventbrite.com/cyc-conference', text: 'Eventbrite' }
        ],
    },
];
