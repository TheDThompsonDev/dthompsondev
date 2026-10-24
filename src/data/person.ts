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
    'https://www.amazon.com/stores/author/B0H46RPLQD',
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
            worksFor: {
                '@type': 'Organization',
                name: 'Atlassian',
                url: 'https://www.atlassian.com',
            },
            description: "Author and developer advocate. Co-author of The Developer's Guide to AI, co-host of The Programming Podcast, and organizer of the Dallas Software Developers community and the Commit Your Code conference.",
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
            name: "The Developer's Guide to AI: A Field Guide for the Working Developer",
            alternateName: "The Developer's Guide to AI",
            url: 'https://www.developersguide.ai',
            isbn: '978-1-7185-0476-9',
            datePublished: '2026-06-09',
            numberOfPages: 320,
            inLanguage: 'en',
            workExample: [
                { '@type': 'Book', bookFormat: 'https://schema.org/Paperback', isbn: '978-1-7185-0476-9' },
                { '@type': 'Book', bookFormat: 'https://schema.org/EBook', isbn: '978-1-7185-0477-6' },
            ],
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
        {
            // The show is its own entity, so it links to Danny as co-host rather than going in his sameAs
            '@type': 'PodcastSeries',
            '@id': `${SITE_URL}/podcast#podcast`,
            name: 'The Programming Podcast',
            url: `${SITE_URL}/podcast`,
            author: [
                { '@id': PERSON_ID },
                { '@type': 'Person', name: 'Leon Noel' },
            ],
            sameAs: ['https://www.youtube.com/@TheProgrammingPodcast'],
        },
    ],
};
