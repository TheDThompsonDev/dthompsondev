"use client";

import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

export const JourneySlider = () => {
    return (
        <div
            className="relative w-full rounded-xl sm:rounded-[2rem] overflow-hidden shadow-2xl border-2 sm:border-4 border-white group"
            style={{
                paddingBottom: '100%',
                position: 'relative'
            }}
        >
            <div
                className="absolute inset-0"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }}
            >
                <ReactCompareSlider
                    itemOne={
                        <div
                            className="relative"
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                inset: 0
                            }}
                        >
                            <ReactCompareSliderImage
                                src="/photos/frying.jpg"
                                alt="The Beginning - Gas Station Kitchen"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                            />
                            <div
                                className="absolute bg-black/80 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border-l-2 sm:border-l-4 border-red-500"
                                style={{
                                    bottom: '1rem',
                                    left: '0.75rem',
                                    WebkitBackdropFilter: 'blur(12px)',
                                    backdropFilter: 'blur(12px)',
                                    maxWidth: 'calc(50% - 1rem)'
                                }}
                            >
                                <p className="text-white font-mono text-xs sm:text-sm font-bold">2014: The Kitchen</p>
                                <p className="text-gray-300 text-[10px] sm:text-xs">Minimum Wage. Maximum Hunger.</p>
                            </div>
                        </div>
                    }
                    itemTwo={
                        <div
                            className="relative"
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                inset: 0
                            }}
                        >
                            <ReactCompareSliderImage
                                src="https://twxvicohcixbzang.public.blob.vercel-storage.com/polaroid/6.jpg"
                                alt="The Destination - Tech Leadership"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                            />
                            <div
                                className="absolute bg-[#153230]/90 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border-r-2 sm:border-r-4 border-[#4D7DA3] text-right"
                                style={{
                                    bottom: '1rem',
                                    right: '0.75rem',
                                    WebkitBackdropFilter: 'blur(12px)',
                                    backdropFilter: 'blur(12px)',
                                    maxWidth: 'calc(50% - 1rem)'
                                }}
                            >
                                <p className="text-white font-mono text-xs sm:text-sm font-bold">2025: The Stage</p>
                                <p className="text-gray-300 text-[10px] sm:text-xs">Director of Technology. Leader.</p>
                            </div>
                        </div>
                    }
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        inset: 0
                    }}
                    handle={
                        <div style={{
                            width: '3px',
                            height: '100%',
                            backgroundColor: 'white',
                            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                            position: 'relative'
                        }}>
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
                                border: '3px solid #153230'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#153230" style={{ width: '20px', height: '20px' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                </svg>
                            </div>
                        </div>
                    }
                />
            </div>
            <div
                className="absolute top-3 right-3 sm:top-8 sm:right-8 bg-white/10 p-2 sm:p-4 rounded-lg sm:rounded-xl border border-white/20 max-w-[140px] sm:max-w-xs text-left z-20 pointer-events-none"
                style={{
                    WebkitBackdropFilter: 'blur(12px)',
                    backdropFilter: 'blur(12px)'
                }}
            >
                <p className="text-white text-xs sm:text-sm font-bold italic">"Bite-sized goals lead to a full meal."</p>
            </div>
        </div>
    );
};
