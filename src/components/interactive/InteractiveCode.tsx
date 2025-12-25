'use client';

import { useState } from 'react';

interface CodeExample {
  title: string;
  code: string;
  explanation: string;
  color: string;
}

interface InteractiveCodeProps {
  examples: CodeExample[];
  title?: string;
}

export function InteractiveCode({ examples, title }: InteractiveCodeProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="my-16">
      {title && (
        <h2 className="text-3xl font-bold text-[#153230] mb-8 tracking-tight">{title}</h2>
      )}

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="flex gap-1 p-2 bg-gray-50 border-b border-gray-200">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`flex-1 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 ${activeIndex === index
                ? 'bg-white text-gray-900 shadow-lg shadow-gray-200/50 scale-[1.02]'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
            >
              {example.title}
            </button>
          ))}
        </div>

        <div className="p-8">
          <div className="bg-[#0d1117] rounded-2xl p-8 mb-6 overflow-x-auto shadow-inner">
            <pre className="text-sm font-mono text-gray-100 leading-relaxed">
              <code>{examples[activeIndex].code}</code>
            </pre>
          </div>

          <div
            className="relative p-8 rounded-2xl text-white font-medium leading-relaxed overflow-hidden"
            style={{ backgroundColor: examples[activeIndex].color }}
          >
            <div className="relative flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="flex-1 pt-1.5">{examples[activeIndex].explanation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}