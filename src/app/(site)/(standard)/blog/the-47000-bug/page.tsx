'use client';

import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function The47000DollarBugPost() {
    return (
        <BlogPostLayout
            category="JavaScript"
            date="December 27, 2025"
            readTime="6 min read"
            title={<>The $47,000 Bug:<br /><span className="text-[#4D7DA3]">That Taught Me to Stop Using ||</span></>}
            subtitle="A property management company lost thousands due to a single character. Learn why || is dangerous and how ?? saves your production apps."
            slug="the-47000-bug"
            coverImage="/blog-covers/bug_fix_code_snippet_1766352858325.png"
            short={{
                content: (
                    <>
                        <p className="mb-6 font-bold text-xl text-[#153230]">
                            Danny's Quick Takes:
                        </p>

                        <ul className="space-y-4 mb-8">
                            <li className="flex gap-3">
                                <span className="text-[#4D7DA3] font-bold">→</span>
                                <span><strong>0 is Data, Not Nothing.</strong> The <code>||</code> operator treats 0 as falsy, which destroys valid data like "0 pets" or "0 items in cart".</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#4D7DA3] font-bold">→</span>
                                <span><strong>Use ?? by Default.</strong> The Nullish Coalescing Operator (<code>??</code>) only triggers on <code>null</code> or <code>undefined</code>, respecting valid falsy values like <code>0</code>, <code>false</code>, and <code>""</code>.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#4D7DA3] font-bold">→</span>
                                <span><strong>The Cost of Invisible Bugs.</strong> This bug cost a client $47,000 in manual labor. "It looks fine" is not an engineering standard.</span>
                            </li>
                        </ul>

                        <div className="bg-[#153230] text-white p-6 rounded-2xl">
                            <p className="font-bold text-lg">The Bottom Line:</p>
                            <p className="mt-2">Stop using <code>||</code> for default values. It's a legacy habit that introduces subtle, expensive bugs. Switch your mental model to <code>??</code>.</p>
                        </div>
                    </>
                )
            }}
            medium={{
                content: (
                    <>
                        <p className="mb-6 font-medium text-xl text-[#153230]">
                            I was on a call with a developer who’d just spent three weeks debugging a production bug. Three weeks.
                        </p>

                        <p className="mb-6">
                            The bug? A single character. Actually, two characters: <code>||</code>
                        </p>

                        <h2 className="text-3xl font-bold text-[#153230] mb-4 mt-8">The Setup</h2>
                        <p className="mb-4">
                            Here’s what happened: An apartment management company had a tenant portal. Tenants fill out applications. The system tracks how many pets they have. Simple stuff.
                        </p>

                        <div className="bg-[#1e1e1e] text-gray-300 p-6 rounded-xl my-6 font-mono text-sm border border-gray-700 shadow-xl">
                            <div className="flex gap-2 mb-4 border-b border-gray-700 pb-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <p>const numberOfPets = tenant.numberOfPets <span className="text-pink-400">||</span> <span className="text-green-400">"Data unavailable"</span>;</p>
                        </div>

                        <p className="mb-4">
                            Looks innocent, right? Except one day, a property manager noticed something weird. Every tenant with <strong>zero pets</strong> was showing "Data unavailable" in their dashboard. But these tenants had submitted their applications. They’d explicitly written "0" in the pets field.
                        </p>

                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl my-8">
                            <h3 className="font-bold text-red-900 mb-2">The Fallout</h3>
                            <p className="text-red-900/80">
                                The support tickets started rolling in. The property managers thought the portal was broken. They started calling tenants manually to re-verify information. Three weeks of phone calls. Confusion. Frustrated staff. One property manager estimated it cost them <strong>$47,000 in wasted labor and delayed move-ins.</strong>
                            </p>
                        </div>

                        <h2 className="text-3xl font-bold text-[#153230] mb-4 mt-12">The Dirty Secret of ||</h2>
                        <p className="mb-4">
                            When you write <code>value || fallback</code>, JavaScript doesn't check if value is null or undefined. It checks if value is <strong>falsy</strong>. And in JavaScript, "falsy" is a surprisingly long list:
                        </p>

                        <ul className="space-y-2 mb-6 ml-4">
                            <li>✅ <code>null</code> (you probably want to catch this)</li>
                            <li>✅ <code>undefined</code> (you probably want to catch this)</li>
                            <li>❌ <code>0</code> (this is a real number!)</li>
                            <li>❌ <code>""</code> (this is a valid empty string!)</li>
                            <li>❌ <code>false</code> (this is a legitimate boolean!)</li>
                        </ul>

                        <p className="mb-6">
                            The <code>||</code> operator can't tell the difference between "we never got this data" and "the user explicitly entered zero."
                        </p>
                    </>
                )
            }}
            long={{
                content: (
                    <>
                        <ScrollReveal delay={100}>
                            <p className="text-xl text-[#153230]/70 leading-relaxed font-medium mb-8">
                                I was on a call with a developer who’d just spent three weeks debugging a production bug.
                            </p>
                            <p className="text-xl text-[#153230] leading-relaxed font-bold mb-12">
                                Three weeks.
                            </p>

                            <p className="text-[#153230]/80 leading-relaxed mb-6">
                                The bug? A single character. Actually, two characters: <code>||</code>
                            </p>

                            <p className="text-[#153230]/80 leading-relaxed mb-6">
                                Here’s what happened: An apartment management company had a tenant portal. Tenants fill out applications. The system tracks how many pets they have. Simple stuff.
                            </p>

                            <div className="bg-[#1e1e1e] text-gray-300 p-6 rounded-xl my-8 font-mono text-sm border border-gray-700 shadow-xl">
                                <p>const numberOfPets = tenant.numberOfPets || "Data unavailable";</p>
                            </div>

                            <p className="text-[#153230]/80 leading-relaxed mb-6">
                                Looks innocent, right?
                            </p>

                            <p className="text-[#153230]/80 leading-relaxed mb-6">
                                Except one day, a property manager noticed something weird. Every tenant with zero pets was showing "Data unavailable" in their dashboard. But these tenants had submitted their applications. They’d explicitly written "0" in the pets field.
                            </p>

                            <p className="text-[#153230]/80 leading-relaxed mb-6">
                                The support tickets started rolling in. The property managers thought the portal was broken. They started calling tenants manually to re-verify information.
                            </p>

                            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl my-8">
                                <p className="text-red-900 font-bold mb-2">The Fallout</p>
                                <p className="text-red-900/80">
                                    Three weeks of phone calls. Confusion. Frustrated staff. One property manager estimated it cost them <strong>$47,000 in wasted labor and delayed move-ins.</strong>
                                </p>
                            </div>

                            <p className="text-[#153230]/80 leading-relaxed mb-12">
                                All because JavaScript treats 0 as falsy.
                            </p>

                            <h2 className="text-3xl font-bold text-[#153230] mb-6">The || Operator Has a Dirty Secret</h2>
                            <p className="text-[#153230]/80 leading-relaxed mb-6">
                                When you write <code>value || fallback</code>, JavaScript doesn't check if value is null or undefined. It checks if value is falsy.
                            </p>
                            <p className="text-[#153230]/80 leading-relaxed mb-6">
                                And in JavaScript, "falsy" is a surprisingly long list:
                            </p>

                            <ul className="space-y-3 mb-12 ml-4">
                                <li className="flex items-center gap-3">
                                    <span className="text-green-500 text-xl">✅</span>
                                    <span className="text-[#153230]/80"><code>null</code> (you probably want to catch this)</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-green-500 text-xl">✅</span>
                                    <span className="text-[#153230]/80"><code>undefined</code> (you probably want to catch this)</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-red-500 text-xl">❌</span>
                                    <span className="text-[#153230]/80"><code>0</code> (this is a real number!)</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-red-500 text-xl">❌</span>
                                    <span className="text-[#153230]/80"><code>""</code> (this is a valid empty string!)</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-red-500 text-xl">❌</span>
                                    <span className="text-[#153230]/80"><code>false</code> (this is a legitimate boolean!)</span>
                                </li>
                            </ul>

                            <p className="text-[#153230]/80 leading-relaxed mb-6">
                                The <code>||</code> operator can't tell the difference between "we never got this data" and "the user explicitly entered zero."
                            </p>
                            <p className="text-[#153230]/80 leading-relaxed mb-12">
                                This is the exact bug I've seen in production systems at least a dozen times in my coaching sessions. It's one of those bugs that's invisible until it isn't.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <h2 className="text-3xl font-bold text-[#153230] mb-6">The Mental Model Shift</h2>
                            <p className="text-[#153230]/80 leading-relaxed mb-6">
                                Here’s how I want you to think about this:
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 my-8">
                                <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                                    <h3 className="text-xl font-bold text-red-800 mb-2">|| asks:</h3>
                                    <p className="text-red-900/90 font-medium text-lg">"Is this value truthy?"</p>
                                </div>
                                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                                    <h3 className="text-xl font-bold text-green-800 mb-2">?? asks:</h3>
                                    <p className="text-green-900/90 font-medium text-lg">"Does this value exist?"</p>
                                </div>
                            </div>

                            <p className="text-[#153230]/80 leading-relaxed mb-6">
                                That’s the Nullish Coalescing Operator (<code>??</code>). Two question marks. And it only triggers on null or undefined—the values that actually mean "nothing is here."
                            </p>

                            <div className="bg-[#1e1e1e] text-gray-300 p-6 rounded-xl my-8 font-mono text-sm border border-gray-700 shadow-xl overflow-x-auto">
                                <pre><code>{`// || treats 0 as "nothing"
const pets = 0 || "No data";  // Result: "No data" ❌

// ?? treats 0 as a valid value
const pets = 0 ?? "No data";  // Result: 0 ✅`}</code></pre>
                            </div>

                            <p className="text-[#153230]/80 leading-relaxed mb-12">
                                The <code>??</code> operator respects your zeros. It respects your empty strings. It respects your explicit false values. It only falls back when there’s genuinely nothing there.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <h2 className="text-3xl font-bold text-[#153230] mb-6">The Tenant Portal, Fixed</h2>
                            <p className="text-[#153230]/80 leading-relaxed mb-6">
                                Let’s revisit that apartment management system with the right tool:
                            </p>

                            <div className="bg-[#1e1e1e] text-gray-300 p-6 rounded-xl my-8 font-mono text-sm border border-gray-700 shadow-xl overflow-x-auto">
                                <pre><code>{`const tenant1 = {
  name: "John Doe",
  cars: null,      // Never submitted this field
  numberOfPets: 0, // Explicitly said they have zero pets
};

const tenant2 = {
  name: "Jane Smith",
  cars: 2,
  numberOfPets: null, // Forgot to fill this in
};

function getTenantInfo(tenant) {
  // Using ?? means we only show fallback text when data is actually missing
  const cars = tenant.cars ?? "No car information available";
  const numberOfPets = tenant.numberOfPets ?? "No pet data available";

  console.log(\`Tenant: \${tenant.name}\`);
  console.log(\`Cars: \${cars}\`);
  console.log(\`Number of pets: \${numberOfPets}\`);
}

getTenantInfo(tenant1);
// Tenant: John Doe
// Cars: No car information available
// Number of pets: 0  ← Correct! We know they have 0 pets.

getTenantInfo(tenant2);
// Tenant: Jane Smith
// Cars: 2
// Number of pets: No pet data available  ← Correct! This field is missing.`}</code></pre>
                            </div>

                            <p className="text-[#153230]/80 leading-relaxed mb-12">
                                Zero pets is data. Null pets is the absence of data. The <code>??</code> operator knows the difference.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <h2 className="text-3xl font-bold text-[#153230] mb-6">When to Use Which</h2>
                            <p className="text-[#153230]/80 leading-relaxed mb-6">
                                Here’s my rule of thumb after years of production debugging:
                            </p>

                            <div className="space-y-8 mb-12">
                                <div>
                                    <h4 className="font-bold text-xl text-[#153230] mb-3">Use || when you want to replace ALL falsy values:</h4>
                                    <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                                        <p className="text-gray-500 mb-2">// User display names - empty string should show fallback</p>
                                        <p>const displayName = user.nickname || user.fullName || "Anonymous";</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold text-xl text-[#153230] mb-3">Use ?? when you want to replace ONLY null/undefined:</h4>
                                    <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                                        <p className="text-gray-500 mb-2">// Configuration with valid zero/false values</p>
                                        <p className="mb-1">const timeout = config.timeout ?? 3000;        <span className="text-gray-500">// 0 is a valid timeout</span></p>
                                        <p className="mb-1">const isEnabled = settings.feature ?? true;    <span className="text-gray-500">// false is a valid setting</span></p>
                                        <p>const port = process.env.PORT ?? 8080;         <span className="text-gray-500">// could legitimately be 0</span></p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[#153230]/80 leading-relaxed font-bold mb-12">
                                The question to ask yourself: "Is zero (or empty string, or false) a valid value in this context?"
                                <br />
                                If yes → use <code>??</code>
                                <br />
                                If no → use <code>||</code>
                            </p>

                            <h2 className="text-3xl font-bold text-[#153230] mb-6">The Pattern That Keeps Showing Up</h2>
                            <p className="text-[#153230]/80 leading-relaxed mb-6">
                                In my 700+ coaching sessions, I’ve noticed this bug shows up most often in these places:
                            </p>

                            <ul className="space-y-3 mb-12 ml-4">
                                <li className="text-[#153230]/80"><strong>Form inputs</strong> - Users enter 0 for quantity fields.</li>
                                <li className="text-[#153230]/80"><strong>API responses</strong> - Backends return 0 for counts or empty strings for optional fields.</li>
                                <li className="text-[#153230]/80"><strong>Configuration</strong> - Environment variables that should legitimately be 0 or false.</li>
                                <li className="text-[#153230]/80"><strong>Feature flags</strong> - Boolean toggles where false is a valid state.</li>
                            </ul>

                            <p className="text-[#153230]/80 leading-relaxed mb-12">
                                Every one of these gets silently broken by <code>||</code> and silently fixed by <code>??</code>.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={500}>
                            <div className="bg-amber-50 rounded-2xl p-8 border-l-4 border-amber-500 my-12">
                                <h3 className="text-amber-900 font-bold text-xl mb-4">Your Action Item</h3>
                                <p className="text-amber-900/80 leading-relaxed mb-4">
                                    Go search your codebase for <code>||</code>. Every time you see it, ask yourself: <strong>"What if this value is legitimately zero?"</strong>
                                </p>
                                <p className="text-amber-900/80 leading-relaxed">
                                    If the answer makes you uncomfortable, you’ve found a bug waiting to happen. The <code>??</code> operator has been in JavaScript since ES2020. It’s not new. It’s not exotic. It’s just underutilized.
                                </p>
                                <p className="text-amber-900 font-bold mt-4">
                                    Stop treating zero like nothing. Start using ??.
                                </p>
                            </div>

                            <p className="text-[#153230]/80 leading-relaxed mb-8">
                                The $47,000 bug was real. The property management company eventually found the fix—a two-character change. But they’ll never get those three weeks back.
                            </p>

                            <p className="text-[#153230]/60 italic mt-12">
                                You are closer to your goals than you think. Don't let a typo be the reason you stumble.
                            </p>
                        </ScrollReveal>
                    </>
                )
            }}
        />
    );
}
