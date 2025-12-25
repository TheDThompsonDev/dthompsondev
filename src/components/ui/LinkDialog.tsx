'use client';

import { useState, useEffect, useRef } from 'react';

interface LinkDialogProps {
  initialUrl?: string;
  initialText?: string;
  onInsert: (url: string, text: string) => void;
  onRemove?: () => void;
  onClose: () => void;
}

export function LinkDialog({ initialUrl = '', initialText = '', onInsert, onRemove, onClose }: LinkDialogProps) {
  const [url, setUrl] = useState(initialUrl);
  const [text, setText] = useState(initialText);
  const urlInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    urlInputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleInsert();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [url, text]);

  const handleInsert = () => {
    if (!url) return;

    let finalUrl = url;
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://') && !finalUrl.startsWith('/')) {
      finalUrl = 'https://' + finalUrl;
    }

    onInsert(finalUrl, text || url);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-full max-w-md animate-[fadeIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Insert Link</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL
            </label>
            <input
              ref={urlInputRef}
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D7DA3] focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter a full URL or relative path
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Link Text (optional)
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Leave empty to use URL as text"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D7DA3] focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-2">
            {onRemove && (
              <button
                onClick={() => {
                  onRemove();
                  onClose();
                }}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
              >
                Remove Link
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleInsert}
              disabled={!url}
              className="flex-1 px-4 py-3 bg-[#2e6089] text-white rounded-xl font-semibold hover:bg-[#2e6089]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Insert Link
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">Enter</kbd> Insert
            <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">Esc</kbd> Cancel
          </p>
        </div>
      </div>
    </div>
  );
}