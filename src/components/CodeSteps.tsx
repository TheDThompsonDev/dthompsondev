'use client';

import { useState, useEffect, useRef } from 'react';

interface CodeStep {
  title: string;
  description: string;
  code: string;
  highlights?: number[];
}

interface CodeStepsProps {
  steps: CodeStep[];
  title?: string;
}

export function CodeSteps({ steps, title }: CodeStepsProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentStep = steps[activeStep];
  const codeLines = currentStep.code.split('\n');

  const handleStepChange = (newStep: number) => {
    if (newStep === activeStep) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveStep(newStep);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  };

  return (
    <div className="my-16" ref={containerRef}>
      {title && (
        <h3 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">{title}</h3>
      )}

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="grid lg:grid-cols-2 divide-x divide-gray-100">
          <div className="p-8 lg:p-12 flex flex-col">
            <div className="space-y-6 flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold">
                  {activeStep + 1}
                </div>
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Step {activeStep + 1} of {steps.length}
                </span>
              </div>

              <div className={`transition-all duration-300 ${
                isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}>
                <h4 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  {currentStep.title}
                </h4>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {currentStep.description}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex gap-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleStepChange(index)}
                    className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                      index === activeStep
                        ? 'bg-gray-900'
                        : index < activeStep
                        ? 'bg-gray-300'
                        : 'bg-gray-100'
                    }`}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleStepChange(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => handleStepChange(Math.min(steps.length - 1, activeStep + 1))}
                  disabled={activeStep === steps.length - 1}
                  className="flex-1 bg-gray-900 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#0d1117] p-8 lg:p-12 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-gray-400 font-mono">example.js</span>
            </div>

            <div className="relative">
              <div className={`transition-all duration-500 ${
                isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
              }`}>
                <pre className="text-sm font-mono text-gray-100 leading-relaxed">
                  <code>
                    {codeLines.map((line, index) => (
                      <div
                        key={index}
                        className={`transition-all duration-300 ${
                          currentStep.highlights?.includes(index + 1)
                            ? 'bg-blue-500/20 -mx-4 px-4 border-l-2 border-blue-500'
                            : ''
                        }`}
                      >
                        <span className="inline-block w-8 text-gray-500 select-none text-right mr-4">
                          {index + 1}
                        </span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}