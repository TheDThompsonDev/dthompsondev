'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function FloatingHomeLogo() {
    const pathname = usePathname();

    // Don't show on homepage - the Navbar shows the logo there
    if (pathname === '/') return null;

    return (
        <Link
            href="/"
            className="fixed top-4 left-4 z-[998] lg:hidden w-12 h-12 bg-[#153230] rounded-2xl flex items-center justify-center text-white font-bold shadow-2xl hover:scale-110 transition-all duration-300 border-2 border-white/30"
            style={{
                boxShadow: '0 0 20px rgba(77, 125, 163, 0.4), 0 4px 20px rgba(21, 50, 48, 0.3)'
            }}
            aria-label="Go to homepage"
        >
            DT
        </Link>
    );
}
