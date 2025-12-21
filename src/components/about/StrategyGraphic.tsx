"use client";

export const StrategyGraphic = () => {
    return (
        <div className="relative w-full aspect-[4/3] bg-white rounded-[2rem] border-4 border-[#4D7DA3]/20 shadow-xl overflow-hidden flex flex-col items-center justify-center p-8">
            <div className="absolute inset-0 bg-blue-50/50"></div>

            <div className="relative z-10 w-full grid grid-cols-2 gap-4 h-full">
                {/* Left: Spray and Pray */}
                <div className="flex flex-col items-center justify-center border-r-2 border-gray-100 pr-4 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                    <div className="text-4xl mb-2">📄</div>
                    <h4 className="font-bold text-gray-400 text-sm uppercase mb-2">Spray & Pray</h4>
                    <div className="flex flex-wrap justify-center gap-1 w-full max-w-[120px]">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-6 h-8 bg-gray-200 rounded-sm"></div>
                        ))}
                    </div>
                    <div className="mt-4 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
                        0 Responses
                    </div>
                </div>

                {/* Right: Strategy */}
                <div className="flex flex-col items-center justify-center pl-4">
                    <div className="text-4xl mb-2 animate-bounce">🎯</div>
                    <h4 className="font-bold text-[#4D7DA3] text-sm uppercase mb-2">The Sniper</h4>
                    <div className="w-16 h-20 bg-white border-2 border-[#4D7DA3] rounded-lg shadow-lg flex items-center justify-center relative">
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border-2 border-white">
                            ✓
                        </div>
                        <div className="space-y-1 w-full px-2">
                            <div className="h-1 bg-gray-200 rounded w-full"></div>
                            <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-1 bg-gray-200 rounded w-full"></div>
                        </div>
                    </div>
                    <div className="mt-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold text-center">
                        Offer Accepted
                    </div>
                </div>
            </div>
        </div>
    );
};
