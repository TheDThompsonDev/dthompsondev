'use client';

import { useState } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { track } from '@vercel/analytics';

export function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        track('newsletter', { action: 'submit' });

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setStatus('success');
                track('newsletter', { action: 'success' });
                setEmail('');
            } else {
                setStatus('error');
                track('newsletter', { action: 'error' });
            }
        } catch (error) {
            setStatus('error');
            track('newsletter', { action: 'error' });
        }
    };

    return (
        <section className="bg-[#153230] text-white px-8 md:px-16 py-16 md:py-20">
            <ScrollReveal>
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-black mb-6">Stay Updated</h2>
                    <p className="text-lg mb-8 opacity-90">
                        Get the latest insights on community building, career development, and technical leadership delivered to your inbox.
                    </p>

                    {status === 'success' ? (
                        <div className="p-4 bg-green-500/20 text-green-300 rounded-xl border border-green-500/30">
                            <p className="font-bold">Thanks for subscribing! 🎉</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                            <div className="flex-1 relative">
                                <label htmlFor="newsletter-email" className="block text-left text-sm font-medium mb-2 text-white/90">
                                    Email Address
                                </label>
                                <input
                                    id="newsletter-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={status === 'loading'}
                                    className="w-full px-6 py-4 rounded-full bg-white border border-white/20 text-[#153230] font-semibold focus:outline-none focus:ring-4 focus:ring-white/30 transition-all disabled:opacity-50"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="bg-white text-[#2e6089] px-8 py-4 rounded-full font-bold hover:scale-105 hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 sm:self-end"
                            >
                                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>
                    )}
                    {status === 'error' && (
                        <p className="mt-4 text-red-300 text-sm">Something went wrong. Please try again.</p>
                    )}
                </div>
            </ScrollReveal>
        </section>
    );
}
