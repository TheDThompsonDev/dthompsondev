'use client';

import { useState, useEffect } from 'react';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface FloatingTOCProps {
  items: TOCItem[];
}

export function FloatingTOC({ items }: FloatingTOCProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="fixed top-32 left-1/2 -translate-x-1/2 w-full max-w-[1400px] pointer-events-none z-50">
        <div className="relative w-full px-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-8 bg-[#153230] text-white p-3 rounded-xl shadow-lg hover:bg-[#153230]/90 transition-all hover:scale-105 group pointer-events-auto"
            aria-label="Table of Contents (Ctrl+K)"
            title="Table of Contents (Ctrl+K)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="absolute -bottom-8 right-0 bg-[#153230] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Ctrl+K
            </span>
          </button>
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="fixed top-48 left-1/2 -translate-x-1/2 w-full max-w-[1400px] pointer-events-none z-50">
            <div className="relative w-full px-4">
              <div className="absolute right-8 bg-white rounded-2xl shadow-2xl border border-[#4D7DA3]/20 w-72 max-h-[500px] overflow-hidden animate-[fadeIn_0.3s_ease-out] pointer-events-auto">
                <div className="bg-[#E2F3F2] px-6 py-4 border-b border-[#4D7DA3]/10 flex items-center justify-between">
                  <h3 className="font-bold text-[#153230]">Table of Contents</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-[#153230]/60 hover:text-[#153230] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="overflow-y-auto max-h-[400px] p-4">
                  <nav>
                    <ul className="space-y-1">
                      {items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => scrollToSection(item.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                              activeId === item.id
                                ? 'bg-[#4D7DA3]/10 text-[#4D7DA3] font-semibold'
                                : 'text-[#153230]/70 hover:bg-[#E2F3F2] hover:text-[#153230]'
                            }`}
                            style={{ paddingLeft: `${(item.level - 1) * 12 + 12}px` }}
                          >
                            {item.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}