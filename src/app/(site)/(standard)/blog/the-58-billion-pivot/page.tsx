'use client';

import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import { PivotDecisionMatrix } from '@/components/blog/PivotDecisionMatrix';

import Image from 'next/image';

export default function The58BillionPivotPost() {
    return (
        <BlogPostLayout
            category="Leadership"
            date="December 20, 2025"
            readTime="3-12 min read"
            title={<>The $58 Billion<br /><span className="text-[#4D7DA3]">Pivot</span></>}
            subtitle="Are you building a business or just a Meme Generator? The story of how Figma almost didn't exist."
            slug="the-58-billion-pivot"
            coverImage="/blog-covers/58-billion-pivot.jpeg"
            short={{
                content: (
                    <>
                        <p className="mb-6 font-bold text-xl text-[#153230]">
                            Danny's Quick Takes:
                        </p>

                        <ul className="space-y-4 mb-8">
                            <li className="flex gap-3">
                                <span className="text-[#4D7DA3] font-bold">→</span>
                                <span><strong>Technical impressive ≠ valuable.</strong> Figma's founders built the world's best meme generator first. It was technically brilliant and strategically useless.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#4D7DA3] font-bold">→</span>
                                <span><strong>Build for the future infrastructure.</strong> They bet that browser tech would catch up. It did. Don't optimize for today's constraints.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#4D7DA3] font-bold">→</span>
                                <span><strong>Fire yourself from roles you're failing at.</strong> Dylan Field was a terrible micromanager. He hired someone else to do it. Ego kills companies.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#4D7DA3] font-bold">→</span>
                                <span><strong>Compete on workflow, not features.</strong> Multiplayer wasn't a feature, it was a paradigm shift. Adobe couldn't touch it.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#4D7DA3] font-bold">→</span>
                                <span><strong>$58 billion wasn't destiny.</strong> It was a series of painful pivots. Be willing to scrap everything.</span>
                            </li>
                        </ul>

                        <div className="bg-[#153230] text-white p-6 rounded-2xl">
                            <p className="font-bold text-lg">The Bottom Line:</p>
                            <p className="mt-2">Don't settle for the meme generator. Fail, pivot, and grow.</p>
                        </div>
                    </>
                )
            }}
            medium={{
                content: (
                    <>
                        <p className="mb-6 font-medium text-xl text-[#153230]">
                            We almost didn't have Figma.
                        </p>

                        <p className="mb-6">
                            Dylan Field and Evan Wallace didn't start with design software. They built the world's best meme generator using cutting-edge WebGL. Then they had to face a painful truth: <strong className="text-[#4D7DA3]">"We are building the best possible version of the wrong thing."</strong>
                        </p>

                        <h2 className="text-3xl font-bold text-[#153230] mb-4 mt-12">The Core Lessons</h2>

                        <div className="bg-[#f8fcfe] border-l-4 border-[#4D7DA3] p-6 rounded-r-xl my-8">
                            <h3 className="font-bold text-[#153230] mb-2">1. Hard Problems ≠ Valuable Problems</h3>
                            <p>They were solving technically impressive challenges for a low-value use case. Ask: "Even if we win, is this market worth winning?"</p>
                        </div>

                        <div className="bg-[#f8fcfe] border-l-4 border-[#4D7DA3] p-6 rounded-r-xl my-8">
                            <h3 className="font-bold text-[#153230] mb-2">2. Build for Tomorrow's Infrastructure</h3>
                            <p>In 2012, "professional software" lived on desktop. Figma spent 3 years in stealth building for where the browser *would* be. They didn't wait, they made it happen.</p>
                        </div>

                        <div className="bg-[#f8fcfe] border-l-4 border-[#4D7DA3] p-6 rounded-r-xl my-8">
                            <h3 className="font-bold text-[#153230] mb-2">3. Fire Yourself When Needed</h3>
                            <p>Dylan Field was brilliant at vision but terrible at management. Instead of ego-driving into the ground, he hired professionals. Know your weaknesses.</p>
                        </div>

                        <div className="bg-[#f8fcfe] border-l-4 border-[#4D7DA3] p-6 rounded-r-xl my-8">
                            <h3 className="font-bold text-[#153230] mb-2">4. Compete on Workflow, Not Features</h3>
                            <p>Multiplayer wasn't just a feature, it was Google Docs for creativity. They stopped competing on "Does it have a pen tool?" and started competing on "Can we work together?"</p>
                        </div>

                        <div className="mt-12 pt-8 border-t border-[#4D7DA3]/20">
                            <h3 className="text-2xl font-black text-[#153230] mb-4">The Bottom Line</h3>
                            <p className="text-lg leading-relaxed text-[#153230]/80">
                                $58 billion wasn't destiny. It was surviving the meme generator phase, the bad management phase, and the skeptics. Don't settle. Pivot.
                            </p>
                        </div>
                    </>
                )
            }}
            long={{
                content: (
                    <>

                        <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-gray-100">
                            <Image
                                src="/blog-images/58-billion-pivot/figma-valuation.jpg"
                                alt="Figma logo dissolving into pixels"
                                width={1200}
                                height={600}
                                className="w-full"
                            />
                        </div>

                        <p className="mb-6 font-medium text-xl text-[#153230]">
                            We almost didn't have Figma.
                        </p>
                        <p className="mb-6">
                            If you look at the alternate timeline of tech history, Dylan Field and Evan Wallace didn't build the world's most valuable design software. Instead, they took their Ivy League brains, dropped out of Brown, and built the world's best meme generator.
                        </p>

                        <p className="mb-8">
                            I'm not joking. In the early days, they built a tool called "MemeGen." It was technically impressive. It leveraged cutting-edge WebGL technology. It was the best in its class. But they had to look in the mirror and realize something painful: <strong className="text-[#4D7DA3]">We are building the best possible version of the wrong thing.</strong>
                        </p>

                        <p className="mb-8">
                            If you are leading a team, a department, or a startup, this story forces you to ask some uncomfortable questions.
                        </p>

                        <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16">1. The Trap of the "Technically Impressive"</h2>
                        <p className="mb-6">
                            In 2012, Dylan and Evan were obsessed with WebGL. They were doing things in the browser that no one thought was possible. They applied this groundbreaking tech to... putting text on funny cat pictures.
                        </p>
                        <p className="mb-6">
                            They fell into a classic engineer's trap: solving a hard technical problem for a low-value use case. They had a "Gem City" moment where they realized that even if they won the meme market, they would still just be a meme company. They wanted greater meaning.
                        </p>


                        <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-gray-100">
                            <Image
                                src="/blog-images/58-billion-pivot/technical-trap.jpg"
                                alt="Steampunk machine representing the trap of solving technically hard but useless problems"
                                width={1200}
                                height={600}
                                className="w-full"
                            />
                        </div>

                        <PivotDecisionMatrix />

                        <div className="bg-[#f8fcfe] border-l-4 border-[#4D7DA3] p-6 rounded-r-xl my-8">

                            <h3 className="font-bold text-[#153230] mb-2 uppercase text-sm tracking-wider">Question for Leaders</h3>
                            <p className="mb-4">Look at your current roadmap. Are you solving a problem because it matters to the market, or simply because it's a "hard problem" that makes you feel smart?</p>
                            <p className="italic text-[#153230]/70">What is the project you are holding onto right now that is technically impressive but strategically useless?</p>
                        </div>

                        <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16">2. Betting Against the Infrastructure</h2>
                        <p className="mb-6">
                            When they decided to build a design tool in the browser, the industry laughed. In 2012, "professional software" lived on the desktop.
                        </p>
                        <p className="mb-6">
                            Figma didn't just wait for the browser to catch up. They spent three years in stealth mode building the infrastructure to make the browser catch up. They compiled C++ to the web. They built their own tile engines. They bet that by the time they launched, the internet speeds and hardware would be ready.
                        </p>
                        <p className="mb-8 font-bold">
                            They didn't build for the world as it was; they built for the world as it was going to be.
                        </p>

                        <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-gray-100">
                            <Image
                                src="/blog-images/58-billion-pivot/infrastructure-bet.jpg"
                                alt="A betting ticket against infrastructure futures on a crumbling bridge"
                                width={1200}
                                height={600}
                                className="w-full"
                            />
                        </div>

                        <div className="bg-[#f8fcfe] border-l-4 border-[#4D7DA3] p-6 rounded-r-xl my-8">
                            <h3 className="font-bold text-[#153230] mb-2 uppercase text-sm tracking-wider">Question for Leaders</h3>
                            <p className="mb-4">If you are building for the constraints of today, you are already obsolete. Where will the infrastructure be in 3 years?</p>
                            <p className="italic text-[#153230]/70">Are you building a product that will feel "native" to the future, or are you just optimizing a legacy workflow?</p>
                        </div>


                        <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16">3. The "Founder's Trap" (Fire Yourself)</h2>
                        <p className="mb-6">
                            We love the myth of the "All-Knowing Founder," but the reality of Figma's stealth years was messy. Morale was low. There were internal mutinies. Why? Because Dylan Field, as brilliant as he was, was a terrible micromanager.
                        </p>
                        <p className="mb-6">
                            Instead of letting his ego drive the ship into the ground, he made a radical decision: <strong className="text-[#4D7DA3]">He fired himself from management.</strong> He hired a professional to handle the people operations so he could focus on the vision.
                        </p>

                        <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-gray-100">
                            <Image
                                src="/blog-images/58-billion-pivot/founder-trap.jpg"
                                alt="A cage representing the Founder's Trap of trying to do everything"
                                width={1200}
                                height={600}
                                className="w-full"
                            />
                        </div>

                        <div className="bg-[#f8fcfe] border-l-4 border-[#4D7DA3] p-6 rounded-r-xl my-8">
                            <h3 className="font-bold text-[#153230] mb-2 uppercase text-sm tracking-wider">Question for Leaders</h3>
                            <p className="mb-4">What is the role you are playing right now that you are actually failing at?</p>
                            <p className="italic text-[#153230]/70">If you were an outside consultant auditing your own performance, would you fire yourself from that specific set of responsibilities?</p>
                        </div>

                        <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16">4. Finding the "Six-Lane Superhighway"</h2>
                        <p className="mb-6">
                            When Figma finally launched, designers were skeptical. Figma needed a wedge. They found it in Multiplayer.
                        </p>
                        <p className="mb-6">
                            They realized that design wasn't just about pixels; it was about communication. By allowing people to be in the same file at the same time, they didn't just build a better Photoshop; they built Google Docs for creativity.
                        </p>
                        <p className="mb-8">
                            They stopped competing on "features" (Does it have a pen tool?) and started competing on "workflow" (Can we work on this together?). That distinction opened up a six-lane superhighway of growth that Adobe couldn't touch.
                        </p>

                        <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-gray-100">
                            <Image
                                src="/blog-images/58-billion-pivot/changing-rules.jpg"
                                alt="Chess board comparison: Playing the same game vs Changing the rules"
                                width={1200}
                                height={600}
                                className="w-full"
                            />
                        </div>

                        <div className="bg-[#f8fcfe] border-l-4 border-[#4D7DA3] p-6 rounded-r-xl my-8">
                            <h3 className="font-bold text-[#153230] mb-2 uppercase text-sm tracking-wider">Question for Leaders</h3>
                            <p className="mb-4">Are you trying to be 10% better than your competitor at the same game, or are you changing the rules of the game entirely?</p>
                            <p className="italic text-[#153230]/70">Where is the friction in your customer's day that isn't about the "tool," but about the "process"?</p>
                        </div>

                        <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16">5. The $20 Billion Validation</h2>
                        <p className="mb-6">
                            We all know the end of the story. The pandemic hit, the world went remote, and Figma became the operating system for design. Adobe got so scared they offered $20 billion to buy them.
                        </p>
                        <p className="mb-8">
                            When regulators killed the deal, Figma didn't collapse. They took the $1 billion breakup fee and kept building. But that result was only possible because they survived the "Meme Generator" phase. They survived the bad management phase. They survived the skeptics.
                        </p>



                        <div className="mt-16 pt-8 border-t border-[#4D7DA3]/20">
                            <h3 className="text-2xl font-black text-[#153230] mb-4">The Bottom Line</h3>
                            <p className="text-lg leading-relaxed text-[#153230]/80">
                                It is easy to look at a $58 billion valuation and think it was destiny. It wasn't. It was a series of pivots.
                                My challenge to you is this: Don't settle for the meme generator. Fail, pivot, and grow. If something isn't working, have the courage to ask the hard questions, change the leadership structure, or scrap the product entirely to find the thing that actually matters.
                            </p>
                        </div>
                    </>
                )
            }}
        />
    );
}
