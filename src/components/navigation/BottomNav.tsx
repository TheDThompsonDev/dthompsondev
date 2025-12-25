"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MobileMenuOverlay } from "./MobileMenuOverlay";
import { Modal } from "@/components/ui/Modal";
import { ContactForm } from "@/components/contact/ContactForm";

export default function BottomNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const navItems = [
    {
      name: "Blog",
      href: "/blog",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      name: "Podcast",
      href: "/podcast",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      ),
    },
    {
      name: "About",
      href: "/about",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  const contactIcon = (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );

  return (
    <>
      <MobileMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Contact Modal */}
      <Modal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-[#153230] mb-2">
            Let's Work Together
          </h2>
          <p className="text-[#153230]/70 text-sm">
            I respond within 48 hours.
          </p>
        </div>
        <ContactForm />
      </Modal>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2F3F2] shadow-2xl lg:hidden z-[1000]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname?.startsWith(item.href.replace('/#', '/')));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 min-w-[56px] transition-colors ${isActive
                    ? "text-[#4D7DA3]"
                    : "text-[#153230]/50 hover:text-[#153230]"
                    }`}
                >
                  <div
                    className={`transition-transform ${isActive ? "scale-110" : "scale-100"
                      }`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`text-xs font-semibold ${isActive ? "text-[#4D7DA3]" : "text-[#153230]/70"
                      }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}

            {/* Contact Button */}
            <button
              onClick={() => setIsContactOpen(!isContactOpen)}
              className={`flex flex-col items-center gap-1 min-w-[56px] transition-colors ${isContactOpen
                ? "text-[#4D7DA3]"
                : "text-[#153230]/50 hover:text-[#153230]"
                }`}
              aria-label={isContactOpen ? "Close contact form" : "Open contact form"}
            >
              <div className="transition-transform">
                {contactIcon}
              </div>
              <span className="text-xs font-semibold text-[#153230]/70">
                Contact
              </span>
            </button>

            {/* More Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex flex-col items-center gap-1 min-w-[56px] transition-colors ${isMenuOpen
                ? "text-[#4D7DA3]"
                : "text-[#153230]/50 hover:text-[#153230]"
                }`}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="transition-transform">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
              <span className="text-xs font-semibold text-[#153230]/70">
                More
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
