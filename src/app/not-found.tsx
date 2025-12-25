import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import { CommandPaletteProvider } from '@/components/command-palette/CommandPaletteProvider';

export default function NotFound() {
    return (
        <CommandPaletteProvider>
            <div className="min-h-screen bg-[#E2F3F2] p-4">
                <div className="max-w-[1400px] mx-auto bg-white rounded-[32px] shadow-xl overflow-hidden border border-[#4D7DA3]/10 min-h-[calc(100vh-2rem)] flex flex-col">
                    <Navbar />

                    <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                        <div className="w-24 h-24 bg-[#4D7DA3]/10 rounded-full flex items-center justify-center mb-6 animate-bounce">
                            <svg className="w-12 h-12 text-[#4D7DA3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>

                        <h2 className="text-6xl font-black text-[#153230] mb-4">404</h2>
                        <h3 className="text-2xl font-bold text-[#153230] mb-6">Page Not Found</h3>

                        <p className="text-[#153230]/70 max-w-md mb-8 text-lg">
                            Could not find the requested resource. The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                        </p>

                        <Link
                            href="/"
                            className="bg-[#153230] text-white px-8 py-3 rounded-full font-bold hover:bg-[#1a4544] transition-all transform hover:scale-105 shadow-lg"
                        >
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        </CommandPaletteProvider>
    );
}
