'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body className="bg-[#E2F3F2]">
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-[#4D7DA3]/10">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-black text-[#153230] mb-2">Something went wrong!</h2>
                        <p className="text-[#153230]/60 mb-6">
                            We decided to keep this page simple to avoid further errors.
                        </p>

                        <button
                            onClick={() => reset()}
                            className="bg-[#153230] text-white px-6 py-3 rounded-full font-bold hover:bg-[#1a4544] transition-all w-full"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
