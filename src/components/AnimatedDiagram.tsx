"use client";

import { useState } from "react";

interface Step {
  title: string;
  description: string;
  color: string;
  icon?: string;
}

interface AnimatedDiagramProps {
  title: string;
  steps: Step[];
}

export function AnimatedDiagram({ title, steps }: AnimatedDiagramProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="my-12">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#153230] tracking-tight">
          {title}
        </h3>
        <p className="text-gray-600 mt-2">Click through each step to explore</p>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100">
        <div className="p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Main Content Area */}
            <div className="relative min-h-[280px] flex-1">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${index === activeStep
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
                    }`}
                >
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-md border border-gray-100">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                        style={{ backgroundColor: step.color }}
                      >
                        {index + 1}
                      </div>
                      <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        Step {index + 1} of {steps.length}
                      </span>
                    </div>

                    <h4 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                      {step.title}
                    </h4>

                    <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex lg:flex-col gap-3 justify-center lg:justify-start flex-shrink-0">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`group relative transition-all duration-300 ${index === activeStep ? "scale-105" : "hover:scale-105"
                    }`}
                >
                  <div
                    className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-300 ${index === activeStep
                        ? "shadow-xl"
                        : "shadow-md hover:shadow-lg bg-white border-2"
                      }`}
                    style={
                      index === activeStep
                        ? {
                          backgroundColor: step.color,
                          color: "white",
                          borderColor: step.color,
                        }
                        : {
                          borderColor: step.color + "40",
                          color: step.color,
                        }
                    }
                  >
                    {index + 1}
                  </div>

                  {index === activeStep && (
                    <div
                      className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full"
                      style={{ backgroundColor: step.color }}
                    ></div>
                  )}

                  <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 hidden lg:block z-50">
                    <div className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg whitespace-nowrap shadow-xl">
                      {step.title}
                      <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-gray-900"></div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-2 bg-gray-100">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${((activeStep + 1) / steps.length) * 100}%`,
              backgroundColor: steps[activeStep].color,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
