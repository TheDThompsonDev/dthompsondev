"use client";

import { motion } from "framer-motion";

export const ForkInTheRoadDiagram = () => {
    return (
        <div className="relative w-full max-w-4xl mx-auto aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/9] bg-[#0F172A] rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-[#153230] shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/30 to-[#0F172A]"></div>

            <div className="relative z-10 w-full flex flex-col items-center">
                {/* Starting Point */}
                <div className="mb-6 sm:mb-8 md:mb-12 flex flex-col items-center">
                    <div className="bg-white text-[#153230] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-3 sm:mb-4 text-center">
                        The Moment of Choice
                    </div>
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: 40 }}
                        transition={{ duration: 1 }}
                        className="w-1 bg-gradient-to-b from-white to-gray-500 sm:hidden"
                    ></motion.div>
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: 60 }}
                        transition={{ duration: 1 }}
                        className="w-1 bg-gradient-to-b from-white to-gray-500 hidden sm:block"
                    ></motion.div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between w-full gap-4 sm:gap-6 md:gap-8 relative">
                    {/* Left Path: Change */}
                    <div className="flex-1 flex flex-col items-center group cursor-default">
                        <motion.div
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="hidden sm:block w-full h-1 bg-gradient-to-r from-gray-500 to-[#4ade80] origin-right transform -translate-y-1/2"
                            style={{ borderRadius: '100% 0 0 0', height: '4px', marginTop: '-2px' }}
                        />
                        <div className="w-1 h-12 sm:h-16 md:h-20 bg-[#4ade80] sm:-mt-1 relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 sm:w-4 h-3 sm:h-4 bg-[#4ade80] rounded-full blur-sm animate-pulse"></div>
                        </div>

                        <div className="mt-4 sm:mt-6 bg-[#4ade80]/10 border border-[#4ade80]/30 p-4 sm:p-5 md:p-6 rounded-xl text-center backdrop-blur-sm group-hover:bg-[#4ade80]/20 transition-colors w-full">
                            <h4 className="text-[#4ade80] font-black text-lg sm:text-xl mb-1 sm:mb-2">GO LEFT</h4>
                            <p className="text-white/80 text-xs sm:text-sm">The Unknown. The Struggle.<br />The Opportunity.</p>
                        </div>
                    </div>

                    {/* Center Node - visible only on sm+ */}
                    <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+2px)] w-6 sm:w-8 h-6 sm:h-8 bg-white rounded-full border-4 border-[#0F172A] z-20 shadow-[0_0_30px_rgba(255,255,255,0.5)]"></div>

                    {/* Right Path: Stagnation */}
                    <div className="flex-1 flex flex-col items-center group cursor-default">
                        <motion.div
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="hidden sm:block w-full h-1 bg-gradient-to-l from-gray-500 to-red-500 origin-left transform -translate-y-1/2"
                            style={{ borderRadius: '0 100% 0 0', height: '4px', marginTop: '-2px' }}
                        />
                        <div className="w-1 h-12 sm:h-16 md:h-20 bg-red-500 sm:-mt-1 relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 sm:w-4 h-3 sm:h-4 bg-red-500 rounded-full blur-sm animate-pulse"></div>
                        </div>

                        <div className="mt-4 sm:mt-6 bg-red-500/10 border border-red-500/30 p-4 sm:p-5 md:p-6 rounded-xl text-center backdrop-blur-sm group-hover:bg-red-500/20 transition-colors w-full">
                            <h4 className="text-red-500 font-black text-lg sm:text-xl mb-1 sm:mb-2">GO RIGHT</h4>
                            <p className="text-white/80 text-xs sm:text-sm">Comfort. Stagnation.<br />Dead End.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
