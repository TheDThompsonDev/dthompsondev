// Types for talks page data
export type ContentFilter = "all" | "featured" | "interviews" | "conferences" | "tutorials";

export interface VideoTalk {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    youtubeUrl: string;
    views?: string;
    duration?: string;
    category: "talk" | "tutorial" | "interview";
    featured?: boolean;
    channel?: string;
}

export interface PastTalk {
    event: string;
    location: string;
    date: string;
    title: string;
    link?: string;
}

export interface SpeakingTopic {
    icon: string;
    title: string;
    description: string;
    color: string;
}

export interface SpeakingStat {
    value: string;
    label: string;
}

// Video talks data
export const videoTalks: VideoTalk[] = [
    {
        id: "32",
        title: "IMPROVE YOUR DATA FETCHING WITH REACT QUERY",
        description: "Breakout Session. How to use React Query successfully and knowing when to utilize it. RenderATL 2023.",
        thumbnail: "https://img.youtube.com/vi/aNwU0MwwvNY/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=aNwU0MwwvNY",
        category: "talk",
        channel: "RenderATL",
        featured: true
    },
    {
        id: "25",
        title: "TypeScript and Your Codebase: They Deserve Each Other!",
        description: "Insights on creating thriving tech communities, organizing events, and driving engagement.",
        thumbnail: "https://img.youtube.com/vi/ZxlzNTzIoqQ/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=ZxlzNTzIoqQ",
        category: "talk",
        channel: "Jetbrains Javascript Day Conference",
        featured: true
    },
    {
        id: "33",
        title: "Error Boundaries Save You From Crashes!",
        description: "Showcasing what an Error Boundary is in React and why you should use them to prevent the UI of your site from crashing. RenderATL 2022.",
        thumbnail: "https://img.youtube.com/vi/gooW831qwv4/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=gooW831qwv4",
        category: "talk",
        channel: "RenderATL"
    },
    {
        id: "34",
        title: "Death of AI Magic! Welcome to AI Engineering!",
        description: "Stop using AI like it's a magic wand and learn how to use it correctly.",
        thumbnail: "https://img.youtube.com/vi/-A3sMIAvqaA/hqdefault.jpg",
        youtubeUrl: "https://youtu.be/-A3sMIAvqaA?si=PvLKGGOghYNw5G9P&t=443",
        category: "talk",
        channel: "Dallas Software Developers Group"
    },
    {
        id: "35",
        title: "React Detective Danny Thompson! You don't need that useEffect!",
        description: "Fix your bad habits of using unnecessary useEffect hooks and learn how to use them correctly.",
        thumbnail: "https://img.youtube.com/vi/1FmgvjczoMs/hqdefault.jpg",
        youtubeUrl: "https://youtu.be/1FmgvjczoMs?si=M8vYx0V-sEqvEnzq&t=2031",
        category: "talk",
        channel: "Dallas Software Developers Group",
        featured: true
    },
    {
        id: "36",
        title: "Spanish Language Learning MCP Server!",
        description: "MCP Server for Spanish Language Learning talk!",
        thumbnail: "https://img.youtube.com/vi/RDgBnArxFLk/hqdefault.jpg",
        youtubeUrl: "https://youtu.be/RDgBnArxFLk?si=T8ZYijYbqMyxkN5E&t=5567",
        category: "talk",
        channel: "Dallas Software Developers Group"
    },
    {
        id: "40",
        title: "Keynote: The Community That Developers Built",
        description: "Building a thriving developer community is both challenging and rewarding. Danny shares insights on creating value and connection.",
        thumbnail: "https://img.youtube.com/vi/N7CxuV8ynNw/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=N7CxuV8ynNw",
        category: "talk",
        channel: "All Things Open"
    },
    {
        id: "41",
        title: "Keynote: THAT Conference Journey Into Tech",
        description: "Building a thriving developer community is both challenging and rewarding. Danny shares insights on creating value and connection.",
        thumbnail: "https://img.youtube.com/vi/pgFBitwKd6g/hqdefault.jpg",
        youtubeUrl: "https://www.youtube.com/live/pgFBitwKd6g?si=xZEpebC4Q23zmefU&t=1279",
        category: "talk",
        channel: "THAT Conference"
    },
    {
        id: "37",
        title: "The Agentic Shift: Moving from LLMs to Autonomous Systems",
        description: "Learn how to transition from simple chatbots to autonomous agents that drive revenue by reasoning through tasks and executing complex operations without human intervention.",
        thumbnail: "https://img.youtube.com/vi/YkiQipeOw3w/hqdefault.jpg",
        youtubeUrl: "https://youtu.be/YkiQipeOw3w?si=rawJOpMkHSYHNlb9&t=4527",
        category: "talk",
        channel: "Dallas Software Developers Group"
    },
    {
        id: "38",
        title: "The AI Playbook For Companies",
        description: "Commit Your Code Conference keynote on how companies can effectively leverage AI.",
        thumbnail: "https://img.youtube.com/vi/2GhuUdAzx2U/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=2GhuUdAzx2U",
        category: "talk",
        channel: "Commit Your Code Conference"
    },
    {
        id: "39",
        title: "AI Conversation with Matt McDole",
        description: "Conversation with CTO of Yum! Brands Matt McDole and Danny Thompson at Commit Your Code.",
        thumbnail: "https://img.youtube.com/vi/nrRLzASgeqE/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=nrRLzASgeqE&t=9s",
        category: "interview",
        channel: "Commit Your Code Conference"
    },
    {
        id: "12",
        title: "4 Hours to Build a Haunted App",
        description: "Web Dev Challenge on CodeTV - building a complete application under time pressure.",
        thumbnail: "https://img.youtube.com/vi/fNDSDWJaj2M/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=fNDSDWJaj2M",
        category: "tutorial",
        channel: "CodeTV"
    },
    {
        id: "1",
        title: "Playing the Developer Job Search Game to Win in 2025",
        description: "Discussion with Leon Noel on freeCodeCamp about winning the developer job search in 2025.",
        thumbnail: "https://img.youtube.com/vi/6_qwLx8jwBY/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=6_qwLx8jwBY",
        category: "interview",
        channel: "freeCodeCamp.org"
    },
    {
        id: "26",
        title: "Tutorial Purgatory!",
        description: "Exploring the challenges of learning new skills and how to navigate your journey.",
        thumbnail: "https://img.youtube.com/vi/SdcW_gCx6IM/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=SdcW_gCx6IM",
        category: "interview",
        channel: "Coder Foundry"
    },
    {
        id: "28",
        title: "AI Gaps 95% of Companies NEED to see!",
        description: " Danny Thompson and Leon sit down with Matt DeBergalis, CEO of Apollo GraphQL, to unpack what it will take to move from a gold rush of mediocrity to production-grade agentic experiences that users can trust.",
        thumbnail: "https://img.youtube.com/vi/JbJD98UF1fg/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=JbJD98UF1fg",
        category: "interview",
        channel: "The Programming Podcast"
    },
    {
        id: "2",
        title: "From Gas Station Cook To Google Engineer",
        description: "My journey from working at a gas station to becoming a software engineer, featured on NoDegree podcast.",
        thumbnail: "https://img.youtube.com/vi/67SEA5QGqtA/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=67SEA5QGqtA",
        category: "interview",
        channel: "NoDegree"
    },
    {
        id: "3",
        title: "Open Source and AI with Danny Thompson",
        description: "Discussion with GitHub about the intersection of open source development and artificial intelligence.",
        thumbnail: "https://img.youtube.com/vi/68qYBxBiofE/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=68qYBxBiofE",
        category: "talk",
        channel: "GitHub",
        featured: true
    },
    {
        id: "4",
        title: "How to Become a Software Developer with No Experience",
        description: "Interview with Du'An Lightfoot about breaking into tech without traditional experience.",
        thumbnail: "https://img.youtube.com/vi/4LSjr30UhKE/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=4LSjr30UhKE",
        category: "interview",
        channel: "Du'An Lightfoot"
    },
    {
        id: "5",
        title: "Stop Worrying About AI",
        description: "Backend Banter podcast discussing AI's impact on software development and why developers shouldn't panic.",
        thumbnail: "https://img.youtube.com/vi/Cc93qz4wPw4/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=Cc93qz4wPw4",
        category: "interview",
        channel: "Backend Banter",
        featured: true
    },
    {
        id: "6",
        title: "The Amazing, But Unsettling Future for Developers",
        description: "Appwrite discussion about the evolving landscape of software development and what's coming next.",
        thumbnail: "https://img.youtube.com/vi/PfnKyXo2k6o/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=PfnKyXo2k6o",
        category: "talk",
        channel: "Appwrite",
        featured: true
    },
    {
        id: "7",
        title: "Making It In Tech: Danny Thompson",
        description: "Pluralsight feature on my career journey and advice for aspiring developers.",
        thumbnail: "https://img.youtube.com/vi/A1HPmebIFQc/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=A1HPmebIFQc",
        category: "interview",
        channel: "Pluralsight"
    },
    {
        id: "8",
        title: "Interviews, Standing Out And Portfolio Projects",
        description: "Dennis Ivy interview covering job interviews, how to stand out, and building impressive portfolio projects.",
        thumbnail: "https://img.youtube.com/vi/j00vPfrYrsU/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=j00vPfrYrsU",
        category: "interview",
        channel: "Dennis Ivy",
        featured: true
    },
    {
        id: "9",
        title: "Coding Entrepreneurs Podcast",
        description: "Discussion about building a career in tech, community building, and the entrepreneurial side of coding.",
        thumbnail: "https://img.youtube.com/vi/rr0Dkip5dcg/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=rr0Dkip5dcg",
        category: "interview",
        channel: "CodingEntrepreneurs"
    },
    {
        id: "10",
        title: "From Frying Chicken to This Dot Labs",
        description: "Career Stories with Rob Ocel on The Dev Leader Podcast about my unconventional path into tech.",
        thumbnail: "https://img.youtube.com/vi/PFhvur-Zpxs/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=PFhvur-Zpxs",
        category: "interview",
        channel: "The Dev Leader"
    },
    {
        id: "11",
        title: "Forever Employable Stories",
        description: "Jeff Gothelf interviews me about being a software developer and community leader.",
        thumbnail: "https://img.youtube.com/vi/--Iyd6biNA4/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=--Iyd6biNA4",
        category: "interview",
        channel: "Jeff Gothelf"
    },
    {
        id: "13",
        title: "Gas Station Cook to Software Developer",
        description: "Mintbean io conversation about my journey from working at a gas station to becoming a software developer.",
        thumbnail: "https://img.youtube.com/vi/ODtz06-uSn8/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=ODtz06-uSn8",
        category: "interview",
        channel: "Mintbean"
    },
    {
        id: "14",
        title: "How To Grow An Audience",
        description: "Private Talk For Gumroad Creators - Discussion about growing an audience, building a community, and creating value for your audience.",
        thumbnail: "https://img.youtube.com/vi/blsgaR56jNs/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=blsgaR56jNs",
        category: "talk",
        channel: "Gumroad"
    },
    {
        id: "15",
        title: "Journey Into Tech",
        description: "Private Talk For JDHH Members - Discussion about my journey into tech and the strategies I used to break into the industry.",
        thumbnail: "https://img.youtube.com/vi/HEwx64EBMBw/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=HEwx64EBMBw",
        category: "talk",
        channel: "JDHH"
    },
    {
        id: "16",
        title: "Don't Stop!",
        description: "Discussion about personal branding, online presence, and standing out in the competitive tech landscape.",
        thumbnail: "https://img.youtube.com/vi/bttuRc-RXqs/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=bttuRc-RXqs",
        category: "interview",
        channel: "Driven By Doing"
    },
    {
        id: "17",
        title: "AMA with Danny Thompson - Developer Relations at Google",
        description: "Deep dive into building and scaling tech communities, fostering engagement, and creating value for members.",
        thumbnail: "https://img.youtube.com/vi/CvjgNm_O2n4/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=CvjgNm_O2n4",
        category: "talk",
        channel: "Pluralsight"
    },
    {
        id: "18",
        title: "Developer Success Stories",
        description: "Sharing success stories, lessons learned, and practical advice from my journey in tech.",
        thumbnail: "https://img.youtube.com/vi/jR4k0rcgxEg/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=jR4k0rcgxEg",
        category: "interview",
        channel: "Dice"
    },
    {
        id: "19",
        title: "Optimize your LinkedIn Page with Danny Thompson",
        description: "Discussion about current trends in tech, what's changing, and how developers can stay ahead.",
        thumbnail: "https://img.youtube.com/vi/YuL_JoDeBDM/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=YuL_JoDeBDM",
        category: "talk",
        channel: "Scrimba"
    },
    {
        id: "20",
        title: "Typescript and your codebase, Proof that they deserve each other!",
        description: "Conversation about overcoming obstacles, dealing with impostor syndrome, and building confidence as a developer.",
        thumbnail: "https://img.youtube.com/vi/ieRuo0YZg-I/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=ieRuo0YZg-I",
        category: "interview",
        channel: "All Things Open"
    },
    {
        id: "21",
        title: "Career Transition Advice",
        description: "Practical guidance for career changers looking to break into tech from non-traditional backgrounds.",
        thumbnail: "https://img.youtube.com/vi/f7zdJAPgGUA/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=f7zdJAPgGUA",
        category: "interview",
        channel: "Faraday Academy"
    },
    {
        id: "22",
        title: "Developer Networking Strategies",
        description: "How to network effectively, build meaningful connections, and leverage relationships for career growth.",
        thumbnail: "https://img.youtube.com/vi/gXmFs9RlCuI/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=GaDsu2aoGEw",
        category: "talk",
        channel: "Daily.dev"
    },
    {
        id: "23",
        title: "Tech Career Mentorship Scrimba Schools",
        description: "Discussion about mentorship in tech, finding mentors, and becoming a mentor to others.",
        thumbnail: "https://img.youtube.com/vi/85pfWXmjxVE/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=85pfWXmjxVE",
        category: "interview",
        channel: "Scrimba"
    },
    {
        id: "24",
        title: "Journey Into Tech",
        description: "Discussion about my journey into tech and the strategies I used to break into the industry.",
        thumbnail: "https://img.youtube.com/vi/bXafpkI6JZI/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=bXafpkI6JZI",
        category: "talk",
        channel: "Prentus"
    },
    {
        id: "29",
        title: "Keynote: From Frying Chicken To Software Engineer",
        description: "In this talk I will discuss my journey, going from frying chicken to helping 44 people land their first jobs in tech. To helping bring positive change to my city and to becoming a software engineer.",
        thumbnail: "https://img.youtube.com/vi/W_8La1xYNrQ/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=W_8La1xYNrQ",
        category: "interview",
        channel: "Juneteenth Conference"
    },
    {
        id: "31",
        title: "From Gas Station Employee to Software Development",
        description: "Workshop-style discussion covering essential topics for building a successful career in technology.",
        thumbnail: "https://img.youtube.com/vi/_M_dYZeqhfc/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=_M_dYZeqhfc",
        category: "tutorial",
        channel: "CodeStories"
    },
];

// Past speaking engagements without video
export const pastTalks: PastTalk[] = [
    {
        event: "RenderATL",
        location: "Atlanta, GA",
        date: "June 2024",
        title: "Building Communities in the AI Era",
        link: "https://renderatl.com"
    },
    {
        event: "KCDC",
        location: "Kansas City, MO",
        date: "June 2023",
        title: "The Future of DevRel",
    },
    {
        event: "University of Texas at Dallas",
        location: "Richardson, TX",
        date: "April 2023",
        title: "Guest Lecture: Software Engineering Realities",
    },
    {
        event: "React Miami",
        location: "Miami, FL",
        date: "April 2023",
        title: "Panel: The State of React",
    },
    {
        event: "Memphis Dev Group",
        location: "Memphis, TN",
        date: "March 2023",
        title: "Career Growth for Developers",
    }
];

// Speaking topics for booking section
export const speakingTopics: SpeakingTopic[] = [
    {
        icon: "🤖",
        title: "AI & The Future of Development",
        description: "Understanding AI's impact on software development and how developers can thrive in an AI-augmented world.",
        color: "#4D7DA3"
    },
    {
        icon: "🏢",
        title: "Technical Leadership",
        description: "Transitioning from IC to management. Building high-performing teams and driving technical excellence.",
        color: "#153230"
    },
    {
        icon: "👥",
        title: "Community Building at Scale",
        description: "How to grow developer communities from 0 to 10K+ members. Proven frameworks for engagement and retention.",
        color: "#84803E"
    },
    {
        icon: "🎯",
        title: "Personal Branding for Developers",
        description: "Building an authentic online presence that opens doors. Content creation, networking, and thought leadership.",
        color: "#84803E"
    },
    {
        icon: "💼",
        title: "Career Development & Growth",
        description: "Navigating the career ladder from junior to senior to leadership. Interview prep, negotiation, and advancement.",
        color: "#153230"
    },
    {
        icon: "🚀",
        title: "Breaking Into Tech",
        description: "From non-traditional backgrounds to tech careers. Real strategies that work for career changers and bootcamp grads.",
        color: "#84803E"
    }
];

// Stats for hero section
export const speakingStats: SpeakingStat[] = [
    { value: "60+", label: "Speaking Events" },
    { value: "450K+", label: "Developers Reached" },
    { value: "30+", label: "Video Appearances" },
    { value: "12K+", label: "Community Built" }
];

// Brand partnerships
export const brandLogos: string[] = [
    "freeCodeCamp", "GitHub", "Pluralsight", "Appwrite", "Microsoft",
    "Google", "Spotify", "Digital Ocean", "Grafana Labs", "NoDegree"
];
