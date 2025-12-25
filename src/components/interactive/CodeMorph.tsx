'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeStep {
  title: string;
  description: string;
  code: string;
}

interface CodeMorphProps {
  steps: CodeStep[];
  title?: string;
  subtitle?: string;
}

interface Token {
  value: string;
  type: 'keyword' | 'string' | 'operator' | 'text' | 'number';
  key: string;
}

export function CodeMorph({ steps, title, subtitle }: CodeMorphProps) {
  const [activeStep, setActiveStep] = useState(0);

  // Tokenize the full text at once to track global occurrence counts
  const getGlobalTokens = (fullCode: string) => {
    const lines = fullCode.split('\n');
    const globalWordCounts: Record<string, number> = {};
    const lineTokenGroups: Token[][] = [];

    const regex = /([a-zA-Z_$][a-zA-Z0-9_$]*)|(\s+)|([(){}[\];,.<>=!+\-*/]|=>)|(['"`][^'"`]*['"`])|(\d+)/g;

    lines.forEach((line, lineIdx) => {
      const tokens: Token[] = [];
      let match;

      // If empty line, push empty array
      if (!line) {
        lineTokenGroups.push([]);
        return;
      }

      while ((match = regex.exec(line)) !== null) {
        const value = match[0];
        let type: Token['type'] = 'text';

        const trimmed = value.trim();
        if (['const', 'let', 'var', 'function', 'return', 'if', 'else', 'import', 'export', 'from', 'use', 'client', 'useState', 'setCount', 'setIsActive', 'prevCount'].includes(trimmed)) {
          type = 'keyword';
        } else if (value.match(/^['"`]/)) {
          type = 'string';
        } else if (value.match(/^\d+$/)) {
          type = 'number';
        } else if (value.match(/^[=<>!+\-*/(){}[\];,.]/) || value === '=>') {
          type = 'operator';
        }

        // Count occurrences globally to create stable IDs across lines
        const wordKey = trimmed || 'space';
        globalWordCounts[wordKey] = (globalWordCounts[wordKey] || 0) + 1;

        // UNIQUE ID: This allows "const" #1 to move from Line 2 to Line 8
        const uniqueLayoutId = `${wordKey}-${globalWordCounts[wordKey]}`;

        tokens.push({
          value,
          type,
          key: uniqueLayoutId
        });
      }
      lineTokenGroups.push(tokens);
    });

    return lineTokenGroups;
  };

  const getColor = (type: Token['type']): string => {
    switch (type) {
      case 'keyword': return '#ff79c6';
      case 'string': return '#50fa7b';
      case 'operator': return '#8be9fd';
      case 'number': return '#bd93f9';
      default: return '#f8f8f2';
    }
  };

  const handleStepChange = (newStep: number) => {
    if (newStep === activeStep || newStep < 0 || newStep >= steps.length) return;
    setActiveStep(newStep);
  };

  const groupedTokens = getGlobalTokens(steps[activeStep].code);

  return (
    <div className="my-16">
      {title && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">{title}</h2>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="grid lg:grid-cols-[2fr,3fr]">
          {/* Left Panel: Description */}
          <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-gray-100">
            <div className="lg:sticky lg:top-24 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold text-lg">
                    {activeStep + 1}
                  </div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Step {activeStep + 1} of {steps.length}
                  </span>
                </div>

                <motion.div
                  key={`desc-${activeStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {steps[activeStep].description}
                  </p>
                </motion.div>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <div className="flex gap-2 mb-4">
                  {steps.map((step, index) => (
                    <button
                      key={index}
                      onClick={() => handleStepChange(index)}
                      aria-label={`Go to step ${index + 1}: ${step.title}`}
                      className={`flex-1 h-1.5 rounded-lg transition-all duration-500 ${index === activeStep ? 'bg-gray-900' : index < activeStep ? 'bg-gray-400' : 'bg-gray-200'
                        }`}
                    />
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleStepChange(activeStep - 1)}
                    disabled={activeStep === 0}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => handleStepChange(activeStep + 1)}
                    disabled={activeStep === steps.length - 1}
                    className="flex-1 bg-gray-900 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Code */}
          <div className="bg-[#0d1117] p-8 lg:p-12 min-h-[600px] overflow-hidden">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-lg bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-lg bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-lg bg-[#27c93f]"></div>
              </div>
              <span className="text-xs text-gray-400 font-mono ml-2">example.js</span>
            </div>

            <div className="font-mono text-sm leading-loose">
              {groupedTokens.map((lineTokens, lineIdx) => (
                <div key={`line-${lineIdx}`} className="flex min-h-[1.75rem]">
                  <span className="inline-block w-10 text-gray-400 select-none text-right mr-4 text-xs flex-shrink-0">
                    {lineIdx + 1}
                  </span>
                  <div className="flex-1 whitespace-pre-wrap">
                    <AnimatePresence initial={false} mode="popLayout">
                      {lineTokens.map((token) => (
                        <motion.span
                          key={token.key}
                          layoutId={token.key} // Matches ID across lines!
                          initial={{ opacity: 0, filter: 'blur(4px)' }}
                          animate={{ opacity: 1, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, filter: 'blur(4px)' }}
                          transition={{
                            layout: {
                              duration: 0.6,
                              type: "spring",
                              bounce: 0.15
                            },
                            opacity: { duration: 0.4 }
                          }}
                          className="inline-block" // Crucial for layout animations
                          style={{
                            color: getColor(token.type)
                          }}
                        >
                          {token.value}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}