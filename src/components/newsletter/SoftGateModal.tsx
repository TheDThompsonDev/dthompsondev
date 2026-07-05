'use client';

import { useState } from 'react';
import { track } from '@vercel/analytics';
import { Modal } from '@/components/ui/Modal';

interface SoftGateModalProps {
    isOpen: boolean;
    onClose: () => void;
    destinationUrl: string | null;
}

export function SoftGateModal({ isOpen, onClose, destinationUrl }: SoftGateModalProps) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleContinue = () => {
        if (destinationUrl) {
            window.open(destinationUrl, '_blank');
        }
        onClose();
        // Reset state after closing
        setTimeout(() => {
            setEmail('');
            setStatus('idle');
        }, 500);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        track('soft_gate_newsletter', { action: 'submit' });

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setStatus('success');
                track('soft_gate_newsletter', { action: 'success' });
                // Automatically continue after 2 seconds on success
                setTimeout(handleContinue, 2000);
            } else {
                setStatus('error');
                track('soft_gate_newsletter', { action: 'error' });
            }
        } catch (error) {
            setStatus('error');
            track('soft_gate_newsletter', { action: 'error' });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleContinue}>
            <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-black text-[#153230] mb-2">
                    Heading Out? 🚀
                </h2>
                <p className="text-[#153230]/70 text-sm md:text-base mb-6">
                    Before you go to {destinationUrl && new URL(destinationUrl).hostname.replace('www.', '')}, drop your email to get my best tech & career tips sent weekly. No spam, ever.
                </p>

                {status === 'success' ? (
                    <div className="p-4 bg-green-500/20 text-green-700 rounded-xl border border-green-500/30 mb-6">
                        <p className="font-bold">Thanks for subscribing! Redirecting you now...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
                        <div className="relative text-left">
                            <input
                                id="gate-email"
                                type="email"
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'loading'}
                                className="w-full px-6 py-4 rounded-xl bg-[#E2F3F2] border border-[#4D7DA3]/10 text-[#153230] font-semibold focus:outline-none focus:ring-4 focus:ring-[#4D7DA3]/20 transition-all disabled:opacity-50"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-[#2e6089] hover:bg-[#153230] text-white px-8 py-4 rounded-xl font-bold hover:scale-[1.02] shadow-lg transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {status === 'loading' ? 'Subscribing...' : 'Subscribe & Continue'}
                        </button>
                    </form>
                )}

                {status === 'error' && (
                    <p className="mt-[-10px] mb-4 text-red-500 text-sm font-semibold">Something went wrong. Please try again.</p>
                )}

                <button
                    onClick={handleContinue}
                    className="text-[#153230]/50 hover:text-[#153230] font-semibold text-sm transition-colors underline underline-offset-4"
                >
                    No thanks, just take me to my destination
                </button>
            </div>
        </Modal>
    );
}
