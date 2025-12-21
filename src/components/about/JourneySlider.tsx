"use client";

import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

export const JourneySlider = () => {
    return (
        <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white group [&_*]:!transition-none">
            <ReactCompareSlider
                itemOne={
                    <div className="relative w-full h-full">
                        <ReactCompareSliderImage
                            src="/photos/frying.jpg"
                            alt="The Beginning - Gas Station Kitchen"
                        />
                        <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border-l-4 border-red-500">
                            <p className="text-white font-mono text-sm font-bold">2014: The Kitchen</p>
                            <p className="text-gray-300 text-xs">Minimum Wage. Maximum Hunger.</p>
                        </div>
                    </div>
                }
                itemTwo={
                    <div className="relative w-full h-full">
                        <ReactCompareSliderImage
                            src="https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/6.jpg"
                            alt="The Destination - Tech Leadership"
                        />
                        <div className="absolute bottom-8 right-8 bg-[#153230]/90 backdrop-blur-md px-4 py-2 rounded-lg border-r-4 border-[#4D7DA3] text-right">
                            <p className="text-white font-mono text-sm font-bold">2025: The Stage</p>
                            <p className="text-gray-300 text-xs">Director of Technology. Leader.</p>
                        </div>
                    </div>
                }
                style={{ width: '100%', height: '100%' }}
                handle={
                    <div style={{ width: '3px', height: '100%', backgroundColor: 'white', boxShadow: '0 0 10px rgba(0,0,0,0.5)', transition: 'none' }}>
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            border: '3px solid #153230',
                            transition: 'none'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#153230" style={{ width: '20px', height: '20px' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </div>
                    </div>
                }
            />
            {/* Floating Quote Card */}
            <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 max-w-xs text-left z-20 pointer-events-none">
                <p className="text-white text-sm font-bold italic">"Bite-sized goals lead to a full meal."</p>
            </div>
        </div>
    );
};
