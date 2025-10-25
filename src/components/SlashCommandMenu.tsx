'use client';

import { useState, useEffect, useRef } from 'react';
import { AVAILABLE_COMPONENTS } from '@/lib/components-registry';

interface SlashCommandMenuProps {
  position: { top: number; left: number };
  onSelect: (componentType: string) => void;
  onClose: () => void;
  searchQuery?: string;
}

export function SlashCommandMenu({ position, onSelect, onClose, searchQuery = '' }: SlashCommandMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredComponents = Object.entries(AVAILABLE_COMPONENTS).filter(([type, config]) =>
    config.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    config.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredComponents.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredComponents.length) % filteredComponents.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredComponents[selectedIndex]) {
          onSelect(filteredComponents[selectedIndex][0]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [filteredComponents, selectedIndex, onSelect, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  if (filteredComponents.length === 0) {
    return (
      <div
        ref={menuRef}
        className="fixed bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 w-80"
        style={{ top: `${position.top}px`, left: `${position.left}px` }}
      >
        <p className="text-gray-500 text-sm text-center">No components found</p>
        <p className="text-gray-400 text-xs text-center mt-1">Try a different search</p>
      </div>
    );
  }

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-xl shadow-2xl border border-gray-200 p-2 z-50 w-80 max-h-96 overflow-y-auto"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <div className="space-y-1">
        {filteredComponents.map(([type, config], index) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={`w-full text-left p-3 rounded-lg transition-colors flex items-start gap-3 ${
              index === selectedIndex
                ? 'bg-[#4D7DA3] text-white'
                : 'hover:bg-gray-100 text-gray-900'
            }`}
          >
            <span className="text-2xl flex-shrink-0">{config.icon}</span>
            <div className="flex-1 min-w-0">
              <div className={`font-semibold text-sm ${index === selectedIndex ? 'text-white' : 'text-gray-900'}`}>
                {config.name}
              </div>
              <div className={`text-xs mt-0.5 ${index === selectedIndex ? 'text-white/80' : 'text-gray-500'}`}>
                {config.description}
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-2 pt-2 border-t border-gray-200 px-2">
        <p className="text-xs text-gray-500 flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">↑↓</kbd> Navigate
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">Enter</kbd> Select
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">Esc</kbd> Close
        </p>
      </div>
    </div>
  );
}