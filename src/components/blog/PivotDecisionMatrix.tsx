'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Quadrant = 'high-value-hard' | 'high-value-easy' | 'low-value-hard' | 'low-value-easy';

interface ProjectItem {
    id: string;
    label: string;
    quadrant: Quadrant;
    description: string;
    color: string;
}

export const PivotDecisionMatrix = () => {
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const items: ProjectItem[] = [
        {
            id: 'memegen',
            label: 'Meme Generator',
            quadrant: 'low-value-hard',
            description: 'Technically brilliant WebGL, but low market cap.',
            color: 'bg-red-500'
        },
        {
            id: 'figma',
            label: 'Figma (Multiplayer)',
            quadrant: 'high-value-hard',
            description: 'Incredibly hard tech, massive market value.',
            color: 'bg-green-500'
        },
        {
            id: 'legacy',
            label: 'Legacy Tools',
            quadrant: 'high-value-easy',
            description: 'Proven market, tech is already solved (Desktop).',
            color: 'bg-blue-500'
        }
    ];

    return (
        <div className="w-full bg-slate-900 rounded-xl p-6 md:p-8 text-white my-12 shadow-2xl border border-slate-700">
            <h3 className="text-2xl font-bold mb-6 text-center">The "Hard Problem" Matrix</h3>

            <div className="relative aspect-square md:aspect-[16/9] w-full bg-slate-800 rounded-lg border-2 border-slate-600 grid grid-cols-2 grid-rows-2">
                {/* Axes Labels */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-600 -translate-x-1/2"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-600 -translate-y-1/2"></div>

                    <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs uppercase tracking-wider text-slate-400 bg-slate-900 px-2 rounded">Hard Technical Problem</span>
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs uppercase tracking-wider text-slate-400 bg-slate-900 px-2 rounded">Easy Technical Problem</span>

                    <span className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs uppercase tracking-wider text-slate-400 bg-slate-900 px-2 rounded origin-center">High Market Value</span>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-xs uppercase tracking-wider text-slate-400 bg-slate-900 px-2 rounded origin-center">Low Market Value</span>
                </div>

                {/* Quadrants (Background Hints) */}
                <div className="p-4 flex items-start justify-end opacity-20 hover:opacity-10 transition-opacity">
                    <span className="text-2xl font-bold text-green-300">The Unicorn Zone</span>
                </div>
                <div className="p-4 flex items-end justify-end opacity-20 hover:opacity-10 transition-opacity">
                    <span className="text-2xl font-bold text-red-300">The Trap (MemeGen)</span>
                </div>
                <div className="p-4 flex items-start justify-start opacity-20 hover:opacity-10 transition-opacity">
                    <span className="text-2xl font-bold text-blue-300">Commodity Business</span>
                </div>
                <div className="p-4 flex items-end justify-start opacity-20 hover:opacity-10 transition-opacity">
                    <span className="text-2xl font-bold text-gray-300">Hobby / Toy</span>
                </div>

                {/* Interactive Items */}
                {items.map((item) => (
                    <motion.button
                        key={item.id}
                        layoutId={item.id}
                        onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
                        className={`absolute z-10 w-12 h-12 rounded-full ${item.color} shadow-lg ring-4 ring-white/10 flex items-center justify-center font-bold text-xs cursor-pointer hover:scale-110 transition-transform`}
                        style={{
                            top: item.id === 'memegen' ? '25%' : item.id === 'figma' ? '25%' : '75%',
                            left: item.id === 'memegen' ? '75%' : item.id === 'figma' ? '25%' : '25%',
                        }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {item.label.charAt(0)}
                    </motion.button>
                ))}

                {/* Tooltip / Details Panel */}
                <AnimatePresence>
                    {activeItem && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-600 shadow-2xl z-20"
                        >
                            {items.map(item => item.id === activeItem && (
                                <div key={item.id} className="flex gap-4 items-center">
                                    <div className={`w-12 h-12 rounded-full ${item.color} flex-shrink-0 flex items-center justify-center font-bold text-white`}>
                                        {item.label.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{item.label}</h4>
                                        <p className="text-slate-300 text-sm">{item.description}</p>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setActiveItem(null); }}
                                        className="ml-auto text-slate-400 hover:text-white"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <p className="text-center text-slate-400 text-sm mt-4">
                Click dots to explore the pivots.
            </p>
        </div>
    );
};
