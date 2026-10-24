import { SITE_URL } from '@/lib/site';

const PERSON_ID = `${SITE_URL}/#person`;

// Matches the @id used by the book's own site so search engines merge the two records
const BOOK_ID = 'https://www.developersguide.ai#book';

// Profiles that belong to Danny himself (not brands he runs). Search engines use
// these to tie the accounts together as one person.
export const profileLinks = [
    'https://www.linkedin.com/in/dthompsondev',
    'https://x.com/DThompsonDev',
    'https://www.youtube.com/@DThompsonDev',
    'https://github.com/TheDThompsonDev',
    'https://bsky.app/profile/dthompsondev.bsky.social',
    'https://topmate.io/dthompsondev',
];

// schema.org structured data for the homepage: who Danny is, his profiles, and his book
export const homepageJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: 'Danny Thompson',
            alternateName: 'DThompsonDev',
            publisher: { '@id': PERSON_ID },
        },
        {
            '@type': 'Person',
            '@id': PERSON_ID,
            name: 'Danny Thompson',
            alternateName: 'DThompsonDev',
            url: SITE_URL,
            image: 'https://twxvicohcixbzang.public.blob.vercel-storage.com/about/speaking-at-meetup.jpg',
            jobTitle: 'Senior Developer Advocate',
            description: "Author and developer advocate. Co-author of The Developer's Guide to AI, host of The Programming Podcast, and organizer of the Dallas Software Developers community and the Commit Your Code conference.",
            knowsAbout: [
                'Developer relations',
                'Software engineering',
                'AI engineering',
                'Developer community building',
                'Tech career growth',
            ],
            sameAs: profileLinks,
        },
        {
            '@type': 'Book',
            '@id': BOOK_ID,
            name: "The Developer's Guide to AI: From Prompts to Agents",
            url: 'https://www.developersguide.ai',
            isbn: '978-1-7185-0476-9',
            datePublished: '2026',
            inLanguage: 'en',
            publisher: {
                '@type': 'Organization',
                name: 'No Starch Press',
                url: 'https://nostarch.com',
            },
            author: [
                { '@type': 'Person', name: 'Jacob Orshalick', url: 'https://focus.dev' },
                { '@type': 'Person', name: 'Jerry M. Reghunadh', url: 'https://jerrymannel.me' },
                { '@id': PERSON_ID },
            ],
            sameAs: [
                'https://nostarch.com/developers-guide-to-ai',
                'https://www.amazon.com/dp/1718504764',
            ],
        },
    ],
};
