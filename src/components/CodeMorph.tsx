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
}

interface Token {
  value: string;
  type: 'keyword' | 'string' | 'operator' | 'text';
  key: string;
}

export function CodeMorph({ steps, title }: CodeMorphProps) {
  const [activeStep, setActiveStep] = useState(0);

  const tokenizeLine = (line: string, lineIdx: number): Token[] => {
    if (!line) return [];
    
    const tokens: Token[] = [];
    const regex = /([a-zA-Z_$][a-zA-Z0-9_$]*)|(\s+)|([(){}[\];,.<>=!+\-*/]|=>)|(['"`][^'"`]*['"`])/g;
    let match;
    const wordCounts: Record<string, number> = {};
    
    while ((match = regex.exec(line)) !== null) {
      const value = match[0];
      let type: Token['type'] = 'text';
      
      const trimmed = value.trim();
      if (['const', 'let', 'var', 'function', 'return', 'if', 'else', 'import', 'export', 'from', 'use', 'client', 'useState', 'setCount', 'setIsActive', 'prevCount'].includes(trimmed)) {
        type = 'keyword';
      } else if (value.match(/^['"`]/)) {
        type = 'string';
      } else if (value.match(/^[=<>!+\-*/(){}[\];,.]/) || value === '=>') {
        type = 'operator';
      }
      
      const wordKey = trimmed || `space`;
      wordCounts[wordKey] = (wordCounts[wordKey] || 0) + 1;
      
      const uniqueKey = `${wordKey}-L${lineIdx}-N${wordCounts[wordKey]}`;
      
      tokens.push({
        value,
        type,
        key: uniqueKey
      });
    }
    
    return tokens;
  };

  const getColor = (type: Token['type']): string => {
    switch (type) {
      case 'keyword': return '#ff79c6';
      case 'string': return '#50fa7b';
      case 'operator': return '#8be9fd';
      default: return '#f8f8f2';
    }
  };

  const handleStepChange = (newStep: number) => {
    if (newStep === activeStep || newStep < 0 || newStep >= steps.length) return;
    setActiveStep(newStep);
  };

  const currentCode = steps[activeStep].code;
  const lines = currentCode.split('\n');

  return (
    <div className="my-16">
      {title && (
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">{title}</h3>
          <p className="text-gray-600">Watch each word smoothly slide into place</p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="grid lg:grid-cols-[2fr,3fr]">
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
                  <h4 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">
                    {steps[activeStep].title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {steps[activeStep].description}
                  </p>
                </motion.div>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <div className="flex gap-2 mb-4">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleStepChange(index)}
                      className={`flex-1 h-1.5 rounded-lg transition-all duration-500 ${
                        index === activeStep ? 'bg-gray-900' : index < activeStep ? 'bg-gray-400' : 'bg-gray-200'
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

          <div className="bg-[#0d1117] p-8 lg:p-12 min-h-[600px]">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-lg bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-lg bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-lg bg-[#27c93f]"></div>
              </div>
              <span className="text-xs text-gray-500 font-mono ml-2">example.js</span>
            </div>

            <div className="font-mono text-sm leading-loose">
              {lines.map((line, lineIdx) => {
                const lineTokens = tokenizeLine(line, lineIdx);
                
                return (
                  <div key={`line-${lineIdx}`} className="flex min-h-[1.75rem]">
                    <span className="inline-block w-10 text-gray-600 select-none text-right mr-4 text-xs flex-shrink-0">
                      {lineIdx + 1}
                    </span>
                    <div className="flex-1">
                      <AnimatePresence initial={false} mode="popLayout">
                        {lineTokens.map((token) => (
                          <motion.span
                            key={token.key}
                            layout="position"
                            initial={{ opacity: 0, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(4px)' }}
                            transition={{
                              layout: { 
                                duration: 0.7,
                                ease: [0.4, 0, 0.2, 1]
                              },
                              opacity: { duration: 0.5 },
                              filter: { duration: 0.5 }
                            }}
                            style={{ 
                              color: getColor(token.type),
                              whiteSpace: 'pre'
                            }}
                          >
                            {token.value}
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}