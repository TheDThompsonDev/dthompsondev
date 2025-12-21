"use client";

export const ImpactGraphic = () => {
    return (
        <div className="relative w-full max-w-5xl mx-auto my-12 bg-gradient-to-br from-[#153230] to-[#0F2927] rounded-[2rem] p-8 md:p-12 text-white overflow-hidden shadow-2xl border border-white/10">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4ade80]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10 grid md:grid-cols-3 gap-8 text-center">
                {/* Stat 1 */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/5 backdrop-blur-sm">
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">New Buying Power</p>
                    <div className="text-4xl md:text-5xl font-black text-[#4ade80]">$4M+</div>
                    <p className="text-xs text-gray-500 mt-2">Generated for Community</p>
                </div>

                {/* Stat 2 */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/5 backdrop-blur-sm scale-110 shadow-xl border-[#4ade80]/20 relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4ade80] text-[#153230] text-[10px] font-bold px-2 py-1 rounded-full uppercase">Impact</div>
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Income Growth</p>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-xl text-gray-500 line-through decoration-red-500/50">$18k</span>
                        <span className="text-2xl">→</span>
                        <span className="text-4xl md:text-5xl font-black text-white">$120k</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Avg. Household Change</p>
                </div>

                {/* Stat 3 */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/5 backdrop-blur-sm">
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Lives Changed</p>
                    <div className="text-4xl md:text-5xl font-black text-cyan-400">Thousands</div>
                    <p className="text-xs text-gray-500 mt-2">Through Speaking & Mentorship</p>
                </div>
            </div>

            <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                    <span className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse"></span>
                    <span className="text-sm font-medium">Mission Active & Ongoing</span>
                </div>
            </div>
        </div>
    );
};
