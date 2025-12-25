import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | DThompsonDev',
    description: 'Privacy Policy for DThompsonDev - Learn how we handle your data and protect your privacy.',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl sm:text-5xl font-black text-[#153230] mb-8">
                    Privacy Policy
                </h1>

                <div className="prose prose-lg max-w-none text-[#153230]/80">
                    <p className="text-xl leading-relaxed mb-8">
                        Your privacy matters. This site is designed to be transparent about what data we collect and how we use it.
                    </p>

                    <p className="text-sm text-[#153230]/60 mb-12">
                        Last updated: December 25, 2025
                    </p>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[#153230] mb-4">Analytics</h2>
                        <p className="mb-4">
                            We use <strong>Vercel Analytics</strong> to understand how visitors use this site. Vercel Analytics is privacy-focused and:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li><strong>Does not use cookies</strong></li>
                            <li><strong>Does not collect personal data</strong></li>
                            <li><strong>Does not track you across websites</strong></li>
                            <li>Collects only aggregate, anonymous data (page views, referrers, device types)</li>
                        </ul>
                        <p>
                            This means you don't need to consent to cookies to use this site, because we don't use them for tracking.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[#153230] mb-4">Local Storage</h2>
                        <p className="mb-4">
                            We store some preferences locally on your device (not on our servers) to improve your experience:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Content depth preference</strong> - Remember if you prefer Quick Takes, Core Concepts, or Deep Dives</li>
                            <li><strong>UI hints</strong> - Remember if you've seen first-time user tips</li>
                            <li><strong>Blog reactions</strong> - Remember which posts you've liked</li>
                        </ul>
                        <p className="mt-4">
                            This data stays on your device and is never sent to our servers.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[#153230] mb-4">Contact Form</h2>
                        <p className="mb-4">
                            When you use the contact form, we collect:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Your name</li>
                            <li>Your email address</li>
                            <li>Your message</li>
                            <li>Optionally, your company/organization</li>
                        </ul>
                        <p>
                            This information is used solely to respond to your inquiry. We do not share your contact information with third parties.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[#153230] mb-4">Third-Party Services</h2>
                        <p className="mb-4">We use the following third-party services:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Vercel</strong> - Hosting and analytics</li>
                            <li><strong>Algolia</strong> - Search functionality (no cookies)</li>
                            <li><strong>YouTube/Spotify</strong> - External links to podcast content (clicking these takes you to their platforms)</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[#153230] mb-4">Your Rights</h2>
                        <p className="mb-4">You have the right to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Clear your local storage at any time (via browser settings)</li>
                            <li>Request deletion of any contact form data you've submitted</li>
                            <li>Ask questions about how your data is handled</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[#153230] mb-4">Contact</h2>
                        <p>
                            If you have any questions about this privacy policy, please reach out via the contact form on this site or connect with me on social media.
                        </p>
                    </section>

                    <div className="bg-[#E2F3F2] rounded-2xl p-6 mt-12">
                        <p className="text-[#153230] font-bold mb-2">TL;DR</p>
                        <p className="text-[#153230]/80">
                            No cookies. No tracking across sites. No selling your data. Just simple, privacy-respecting analytics to help me create better content for you.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
