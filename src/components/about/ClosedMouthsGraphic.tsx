"use client";

import { motion } from "framer-motion";

export const ClosedMouthsGraphic = () => {
    return (
        <div className="relative w-full aspect-square md:aspect-[4/3] bg-white rounded-[2rem] border-4 border-[#153230]/10 shadow-xl overflow-hidden flex flex-col items-center justify-center p-8 group">
            <div className="absolute inset-0 bg-[#E2F3F2] opacity-50"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4ade80]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0.5, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">🤫</div>
                        <div className="text-left">
                            <div className="h-2 w-24 bg-gray-200 rounded mb-1"></div>
                            <div className="h-2 w-16 bg-gray-100 rounded"></div>
                        </div>
                    </div>
                    <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">The Old Me</p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <h3 className="text-4xl md:text-6xl font-black text-[#153230] leading-[0.9] mb-2">
                        DEMAND<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#153230] to-[#4ade80]">YOUR VALUE.</span>
                    </h3>
                    <div className="w-full h-2 bg-[#153230] mt-2 rounded-full"></div>
                </motion.div>

                <div className="mt-8 relative">
                    <div className="absolute -left-8 -top-8 text-6xl opacity-10 font-serif">"</div>
                    <p className="text-lg font-bold text-[#153230]/70 italic max-w-xs mx-auto">
                        I went in there, and I demanded it.
                    </p>
                    <div className="absolute -right-8 -bottom-4 text-6xl opacity-10 font-serif rotate-180">"</div>
                </div>
            </div>
        </div>
    );
};
