"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="px-6 md:px-16 py-6 md:py-8">
      <div className="flex items-center justify-between gap-4 md:gap-8">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#153230] rounded-2xl flex items-center justify-center text-white text-xl md:text-2xl font-bold">
            DT
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tight text-[#153230] hidden sm:block">
            DTHOMPSONDEV
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="/blog"
            className={`font-semibold transition-colors ${
              pathname === "/blog" || pathname?.startsWith("/blog/")
                ? "text-[#153230]"
                : "text-[#153230]/70 hover:text-[#153230]"
            }`}
          >
            Blog
          </Link>
          <Link
            href="/podcast"
            className={`font-semibold transition-colors ${
              pathname === "/podcast"
                ? "text-[#153230]"
                : "text-[#153230]/70 hover:text-[#153230]"
            }`}
          >
            Podcast
          </Link>
          <Link
            href="/resources"
            className={`font-semibold transition-colors ${
              pathname === "/resources"
                ? "text-[#153230]"
                : "text-[#153230]/70 hover:text-[#153230]"
            }`}
          >
            Resources
          </Link>
          <Link
            href="/community"
            className={`font-semibold transition-colors ${
              pathname === "/community"
                ? "text-[#153230]"
                : "text-[#153230]/70 hover:text-[#153230]"
            }`}
          >
            Community
          </Link>
          <Link
            href="/talks"
            className={`font-semibold transition-colors ${
              pathname === "/talks"
                ? "text-[#153230]"
                : "text-[#153230]/70 hover:text-[#153230]"
            }`}
          >
            Talks
          </Link>
          <Link
            href="/about"
            className={`font-semibold transition-colors ${
              pathname === "/about"
                ? "text-[#153230]"
                : "text-[#153230]/70 hover:text-[#153230]"
            }`}
          >
            About
          </Link>
        </nav>

        <Link
          href="/#contact"
          className="hidden lg:flex bg-[#153230] text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-[#4D7DA3] hover:scale-105 transition-all duration-300 font-semibold text-sm md:text-base whitespace-nowrap"
        >
          Contact Me
        </Link>
      </div>
    </header>
  );
}
