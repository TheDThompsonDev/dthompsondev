// Persona archetypes and related data for OrbitSwitcher

export interface PersonaArchetype {
    id: string;
    label: string;
    icon: string;
    description: string;
    rooms: string[];
    whatYouGet: string[];
    challenges: string[];
    resources: string[];
    impact: string;
    stats: string;
    cta: string;
}

export interface CenterPerson {
    id: string;
    name: string;
    initials: string;
    role: string;
}

export interface Room {
    id: string;
    title: string;
    icon: string;
    pins: { id: string; title: string }[];
}

export const CENTER_PERSON: CenterPerson = {
    id: "danny",
    name: "Danny Thompson",
    initials: "DT",
    role: "Director of Tech",
};

export const VISITOR_ARCHETYPES: PersonaArchetype[] = [
    {
        id: "p1",
        label: "Junior Developer",
        icon: "👨‍💻",
        description: "0-2 years experience",
        rooms: ["Community", "Tech"],
        whatYouGet: [
            "Code review and best practices guidance",
            "Building your first portfolio projects",
            "Landing your first or second dev role",
            "Navigating team dynamics"
        ],
        challenges: [
            "Struggling with fundamental concepts like closures, async/await, or state management",
            "Building portfolio projects that actually impress hiring managers",
            "Feeling overwhelmed by the breadth of technologies and not knowing where to focus",
            "Preparing for technical interviews and whiteboarding problems"
        ],
        resources: [
            "Weekly 1:1 mentorship calls focused on your growth",
            "Access to 12,000+ community members for support and networking",
            "Technical blog posts with interactive visualizations",
            "Resume reviews tailored to junior dev positions",
            "Interview preparation workshops"
        ],
        impact: "700+ junior developers have landed their first or next roles through mentorship",
        stats: "700+ junior devs mentored to their next role",
        cta: "Get Mentorship"
    },
    {
        id: "p2",
        label: "Senior Engineer",
        icon: "🚀",
        description: "5+ years, seeking Staff/Principal",
        rooms: ["Tech", "Leadership"],
        whatYouGet: [
            "Technical leadership development",
            "System design interview prep",
            "Promotion strategy & visibility",
            "Building cross-team influence"
        ],
        challenges: [
            "Unclear what the next step in your career looks like (Staff vs Principal)",
            "Struggling to get visibility for your technical contributions",
            "Not sure how to transition from individual contributor to leader",
            "Preparing for system design interviews and architect-level thinking"
        ],
        resources: [
            "1:1 coaching on staff engineer expectations and promotion paths",
            "System design mentorship tailored to your tech stack",
            "Strategies for increasing technical visibility across the organization",
            "Networking with other senior+ engineers in the community",
            "Deep dives into architecture and scalability concepts"
        ],
        impact: "150+ engineers successfully promoted to Staff, Principal, and leadership roles",
        stats: "150+ engineers promoted to senior+ levels",
        cta: "Level Up"
    },
    {
        id: "p3",
        label: "Engineering Manager",
        icon: "📄",
        description: "Leading teams & processes",
        rooms: ["Leadership", "Tech"],
        whatYouGet: [
            "Team management coaching",
            "Hiring & performance reviews",
            "Stakeholder communication",
            "Career path strategy for reports"
        ],
        challenges: [
            "Transitioning from IC to manager, maintaining credibility without hands-on code",
            "Building and scaling high-performing engineering teams",
            "Having difficult conversations: performance reviews, feedback, and terminations",
            "Balancing technical decisions with business constraints and team well-being"
        ],
        resources: [
            "Weekly coaching on leadership challenges and team dynamics",
            "Hiring strategies and interview frameworks proven to identify top talent",
            "Performance management best practices and difficult conversation scripts",
            "Engineering manager community for peer learning and support",
            "Executive coaching for navigating organizational politics"
        ],
        impact: "60+ engineers successfully transitioned to management and built thriving teams",
        stats: "60+ successful EM transitions",
        cta: "Enhance Leadership"
    },
    {
        id: "p4",
        label: "Developer Relations",
        icon: "📫",
        description: "DevRel, advocacy & community",
        rooms: ["Community", "Content"],
        whatYouGet: [
            "Building developer communities",
            "Content strategy & creation",
            "Public speaking coaching",
            "Conference & event connections"
        ],
        challenges: [
            "Measuring the ROI of community and content initiatives",
            "Creating content that resonates and drives engagement",
            "Building authentic communities that don't feel sales-focused",
            "Developing speaking skills and overcoming stage fright"
        ],
        resources: [
            "DevRel strategy coaching from someone who built 12K+ communities",
            "Content creation frameworks for blog, video, and podcasts",
            "Public speaking coaching and conference application strategies",
            "Access to 12,000+ developers for testing ideas and gathering feedback",
            "Metrics and analytics frameworks for measuring community impact"
        ],
        impact: "40+ DevRel professionals building thriving, engaged communities",
        stats: "40+ DevRel professionals coached",
        cta: "Grow Your Impact"
    },
    {
        id: "p5",
        label: "Career Changer",
        icon: "🔄",
        description: "Transitioning into tech",
        rooms: ["Community", "Content"],
        whatYouGet: [
            "Portfolio building from scratch",
            "Resume for career changers",
            "Breaking into first tech role",
            "Community support & networking"
        ],
        challenges: [
            "Proving you're serious about tech despite coming from a different field",
            "Building a portfolio that shows real skills, not just bootcamp projects",
            "Addressing the 'why' in interviews and explaining your pivot",
            "Competing with computer science graduates with traditional tech backgrounds"
        ],
        resources: [
            "Personalized career transition roadmap based on your background",
            "Portfolio projects that actually get you interview callbacks",
            "Interview prep focused on career changer narratives",
            "Resume and LinkedIn optimization for non-traditional backgrounds",
            "Supportive community of 12,000+ developers who've walked similar paths"
        ],
        impact: "500+ career changers have successfully landed their first tech roles",
        stats: "500+ successful career transitions",
        cta: "Start Your Transition"
    },
    {
        id: "p6",
        label: "Executive Leader",
        icon: "⚡",
        description: "VPs, Directors, CTOs",
        rooms: ["Leadership", "Tech"],
        whatYouGet: [
            "Technical strategy & vision",
            "Executive presence & communication",
            "Building high-performing teams",
            "Industry connections & insights"
        ],
        challenges: [
            "Balancing short-term delivery with long-term technical vision",
            "Building and retaining world-class engineering teams",
            "Making data-driven decisions in the face of uncertainty",
            "Communicating technical strategy to non-technical stakeholders"
        ],
        resources: [
            "1:1 executive coaching on technical leadership and organizational strategy",
            "Board-ready communication frameworks for technical initiatives",
            "Talent acquisition and retention strategies for senior engineering roles",
            "Access to network of 25+ fellow executives for peer learning",
            "Industry trend analysis and competitive intelligence"
        ],
        impact: "25+ executives transforming their organizations through better technical leadership",
        stats: "25+ executives coached",
        cta: "Strategic Coaching"
    },
];

export const ROOMS: Room[] = [
    { id: "Leadership", title: "Leadership", icon: "👔", pins: [{ id: "r1", title: "Exec workshops" }, { id: "r2", title: "Strategy calls" }] },
    { id: "Tech", title: "Tech", icon: "💻", pins: [{ id: "r3", title: "Code reviews" }, { id: "r4", title: "Architecture" }] },
    { id: "Content", title: "Content", icon: "📝", pins: [{ id: "r5", title: "Podcast" }, { id: "r6", title: "Blog posts" }] },
    { id: "Community", title: "Community", icon: "🫱🏻‍🫲🏽", pins: [{ id: "r7", title: "Discord (12K+)" }, { id: "r8", title: "Meetups" }] },
];
