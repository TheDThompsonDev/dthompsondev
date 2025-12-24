/**
 * Persona content mappings for curated recommendations
 * Maps persona IDs to relevant content categories and recommendations
 */

// Podcast topic recommendations per persona
// These are keywords that match episode titles/descriptions
export const PODCAST_KEYWORDS: Record<string, string[]> = {
    p1: ['beginner', 'learning', 'first job', 'junior', 'portfolio', 'interview', 'getting started', 'career'],
    p2: ['system design', 'architecture', 'senior', 'staff', 'principal', 'scaling', 'performance', 'leadership'],
    p3: ['management', 'team', 'hiring', 'leadership', 'engineering manager', 'culture', 'feedback', 'performance review'],
    p4: ['community', 'devrel', 'content', 'speaking', 'advocacy', 'developer experience', 'conference'],
    p5: ['career change', 'transition', 'bootcamp', 'self-taught', 'breaking into tech', 'first role', 'non-traditional'],
    p6: ['strategy', 'executive', 'cto', 'director', 'vp', 'organization', 'scaling teams', 'technical vision'],
};

// Persona display information (matching VISITOR_ARCHETYPES in OrbitSwitcher)
export const PERSONA_INFO: Record<string, {
    label: string;
    description: string;
    icon: string;
    color: string;
    contentFocus: string;
}> = {
    p1: {
        label: 'Junior Developer',
        description: '0-2 years experience',
        icon: '👨‍💻',
        color: 'from-[#4D7DA3] to-[#3d6a8a]',
        contentFocus: 'Building fundamentals, landing your first role, and growing your skills',
    },
    p2: {
        label: 'Senior Engineer',
        description: '5+ years, seeking Staff/Principal',
        icon: '🚀',
        color: 'from-[#84803E] to-[#6a6731]',
        contentFocus: 'Technical leadership, system design, and career advancement',
    },
    p3: {
        label: 'Engineering Manager',
        description: 'Leading teams & processes',
        icon: '📄',
        color: 'from-[#153230] to-[#0f2624]',
        contentFocus: 'Team management, hiring, and engineering leadership',
    },
    p4: {
        label: 'Developer Relations',
        description: 'DevRel, advocacy & community',
        icon: '📫',
        color: 'from-[#4D7DA3] to-[#3d6a8a]',
        contentFocus: 'Community building, content creation, and public speaking',
    },
    p5: {
        label: 'Career Changer',
        description: 'Transitioning into tech',
        icon: '🔄',
        color: 'from-[#84803E] to-[#6a6731]',
        contentFocus: 'Breaking into tech, building your portfolio, and landing your first role',
    },
    p6: {
        label: 'Executive Leader',
        description: 'VPs, Directors, CTOs',
        icon: '⚡',
        color: 'from-[#153230] to-[#0f2624]',
        contentFocus: 'Technical strategy, organizational leadership, and scaling teams',
    },
};

// Helper function to check if episode matches persona keywords
export function episodeMatchesPersona(
    episodeTitle: string,
    episodeDescription: string,
    personaId: string
): boolean {
    const keywords = PODCAST_KEYWORDS[personaId] || [];
    const searchText = `${episodeTitle} ${episodeDescription}`.toLowerCase();

    return keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
}
