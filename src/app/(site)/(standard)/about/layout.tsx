import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// page.tsx is a client component, so its metadata lives here
export const metadata: Metadata = {
    title: 'About Danny Thompson | Author & Developer Advocate',
    description: 'How Danny Thompson went from frying chicken at a gas station to senior developer advocate, author, podcast host, and community organizer.',
    alternates: {
        canonical: '/about',
    },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
    return children;
}
