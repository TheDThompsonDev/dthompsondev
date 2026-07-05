'use client';

import { BlogPostLayout } from '@/components/blog/BlogPostLayout';


export default function WrongModelForTheJobPost() {
    return (
        <BlogPostLayout
            category="AI Engineering"
            date="July 5, 2026"
            readTime="9 min read"
            title={<>You Are Using the<br /><span className="text-[#4D7DA3]">Wrong Model for the Job</span></>}
            subtitle="Lessons from two opposite bugs that turned out to be the same mistake. Drawn from building SembleOps, a personal operations ensemble."
            slug="wrong-model-for-the-job"
            coverImage="https://twxvicohcixbzang.public.blob.vercel-storage.com/blog-covers/wrong-model-for-the-job.png"
            short={{
                content: (
                    <>
                        <p className="mb-6 font-bold text-xl text-[#153230]">
                            Danny's Quick Takes:
                        </p>

                        <ul className="space-y-4 mb-8">
                            <li className="flex gap-3">
                                <span className="text-[#4D7DA3] font-bold">→</span>
                                <span><strong>max_tokens and max_completion_tokens are not the same.</strong> One caps the visible answer. The other caps thinking <em>plus</em> the answer, and reasoning models spend the thinking tokens first.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#4D7DA3] font-bold">→</span>
                                <span><strong>A low cap on a reasoning model gives you nothing, not something short.</strong> The model burns the budget thinking, returns an empty answer, and still reports HTTP 200. It looks like a success.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#4D7DA3] font-bold">→</span>
                                <span><strong>Empty completion = failure.</strong> Detect it, log the <code>finish_reason</code>, and retry or fall through to the next model. Never pass a blank result to a user.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#4D7DA3] font-bold">→</span>
                                <span><strong>Not every task needs a reasoning model.</strong> Routing, classification, and extraction are pattern-matching jobs. Minimal reasoning took my routing call from 33 seconds down to 2.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#4D7DA3] font-bold">→</span>
                                <span><strong>Control length in the prompt, not the cap.</strong> Give a word range and a structure. The token cap is runaway protection, not a steering wheel.</span>
                            </li>
                        </ul>

                        <div className="bg-[#153230] text-white p-6 rounded-2xl">
                            <p className="font-bold text-lg">The Bottom Line:</p>
                            <p className="mt-2">Choose the smallest model that does the job, tell it how long the answer should be, and never accept an empty result as a success. A token cap is there for safety, not for control, and a powerful model is a tool, not the default.</p>
                        </div>
                    </>
                )
            }}
            medium={{
                content: (
                    <>
                        <p className="mb-6 font-medium text-xl text-[#153230]">
                            The model did not technically fail, which was the core issue.
                        </p>

                        <p className="mb-6">
                            It returned an HTTP 200, tokens were billed, and the system marked the job as a success. But the answer was completely blank. Then I hit the opposite problem: a simple yes-or-no routing question came back with four paragraphs of reasoning, a summary, and a closing sentence. Both failures had the same cause. <strong>I picked the wrong model for the job.</strong>
                        </p>

                        <h2 className="text-3xl font-bold text-[#153230] mb-4 mt-8">Failure One: The Reasoning Model That Writes Nothing</h2>
                        <p className="mb-4">
                            Older models cap output with <code>max_tokens</code>. Reasoning models use <code>max_completion_tokens</code>, and the difference matters:
                        </p>

                        <ul className="space-y-2 mb-6 ml-4">
                            <li>• <code>max_tokens</code> caps the <strong>visible answer</strong>.</li>
                            <li>• <code>max_completion_tokens</code> caps the <strong>thinking plus the visible answer</strong>.</li>
                        </ul>

                        <p className="mb-4">
                            Reasoning models think before they respond, and those thinking tokens come out of the same budget, first. Set a 400-token cap and the model might spend 380 tokens thinking, leaving 20 for the answer. Often it never gets to the answer at all. The <code>finish_reason</code> is <code>'length'</code>, usage shows tokens spent, and <code>message.content</code> is empty.
                        </p>

                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl my-8">
                            <h3 className="font-bold text-red-900 mb-2">The Trap</h3>
                            <p className="text-red-900/80">
                                I set a low cap because I wanted a short response. That works on a normal model. On a reasoning model, it prevents the answer from being written at all — and it still looks like a success.
                            </p>
                        </div>

                        <h2 className="text-3xl font-bold text-[#153230] mb-4 mt-12">Failure Two: The Powerful Model That Overwrites</h2>
                        <p className="mb-4">
                            Use a high-reasoning model like Opus 4.8 for a trivial question and it still runs its full process: weighing edge cases you never had, considering interpretations, writing a detailed answer when you needed one word. The output looks fine, so nothing seems broken. But it's slower and more expensive than the task allowed, on every single call. Multiply that across a system and your product feels slow and your bill climbs for no obvious reason.
                        </p>

                        <h2 className="text-3xl font-bold text-[#153230] mb-4 mt-12">The Unifying Rule</h2>
                        <p className="mb-4">
                            Before you make any call, ask two questions:
                        </p>

                        <ul className="space-y-2 mb-6 ml-4">
                            <li><strong>1. Does this task need reasoning at all?</strong> Routing, classification, extraction, tagging: no. Use a fast model or minimal reasoning. Save the deep-reasoning models for genuinely hard, multi-step problems.</li>
                            <li><strong>2. How long should the answer really be?</strong> A verdict needs one line. A research packet might need a page. Different tasks shouldn't share the same settings.</li>
                        </ul>

                        <p className="mb-6">
                            In my side project SembleOps, applying this took routing from about 33 seconds down to 2. Token caps became runaway protection only, length targets moved into the prompt, and empty completions now count as failures that fall through to the next model.
                        </p>

                        <div className="bg-[#153230] text-white p-6 rounded-2xl">
                            <p className="font-bold text-lg">The Mindset:</p>
                            <p className="mt-2">A token cap is there for safety, not for control. A powerful model is a tool, not the default. Choose the smallest model that does the job.</p>
                        </div>
                    </>
                )
            }}
            long={{
                content: (
                    <>
                        <p className="text-xl text-[#153230]/70 leading-relaxed font-medium mb-8">
                            The model did not technically fail, which was the core issue.
                        </p>

                        <p className="text-[#153230]/80 leading-relaxed mb-6">
                            It returned an HTTP 200, tokens were billed, and the system marked the job as a success. But the answer was completely blank.
                        </p>

                        <p className="text-[#153230]/80 leading-relaxed mb-6">
                            Then I ran into the opposite problem. A simple yes-or-no routing question came back with four paragraphs of reasoning, a summary, and a closing sentence. It was technically correct, but operationally it was terrible: slow, expensive, and way more output than needed.
                        </p>

                        <p className="text-[#153230]/80 leading-relaxed mb-6">
                            These seemed like unrelated failures, but they were actually caused by the same mistake.
                        </p>

                        <p className="text-[#153230]/80 leading-relaxed mb-6">
                            In both cases, I picked the wrong model for the job. One model didn't have enough resources to answer, while the other was too powerful for a task that barely needed any thought.
                        </p>

                        <p className="text-xl text-[#153230] leading-relaxed font-bold mb-12">
                            When your model choice and output length don't fit the task, your system pays the price in cost, speed, and user experience.
                        </p>

                        <h2 className="text-3xl font-bold text-[#153230] mb-6">Failure One: The Reasoning Model That Writes Nothing</h2>

                        <p className="text-[#153230]/80 leading-relaxed mb-6">
                            Every chat completion has a limit on how many tokens it can generate. With older models, you set this using <code>max_tokens</code>. For reasoning models, you use <code>max_completion_tokens</code>. These settings look similar, but they aren't — the difference is what each one actually limits.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 my-8">
                            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                                <h3 className="text-xl font-bold text-green-800 mb-2">max_tokens caps:</h3>
                                <p className="text-green-900/90 font-medium text-lg">The visible answer.</p>
                            </div>
                            <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                                <h3 className="text-xl font-bold text-red-800 mb-2">max_completion_tokens caps:</h3>
                                <p className="text-red-900/90 font-medium text-lg">The thinking <em>plus</em> the visible answer.</p>
                            </div>
                        </div>

                        <p className="text-[#153230]/80 leading-relaxed mb-6">
                            Reasoning models use tokens to think before they respond, and those tokens come from the same budget you set. These thinking tokens don't show up in the response, but you still get billed for them, and they're used up <strong>first</strong>.
                        </p>

                        <p className="text-[#153230]/80 leading-relaxed mb-6">
                            So if you set a 400-token cap, you won't get a 400-token answer. The model might use 380 tokens just to think, leaving only 20 for the answer. Sometimes you get a cut-off fragment, but often you get nothing at all because it never gets to the answer.
                        </p>

                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl my-8">
                            <h3 className="font-bold text-red-900 mb-2">The Failure Signature</h3>
                            <p className="text-red-900/80">
                                The <code>finish_reason</code> will be <code>'length'</code>, usage will show tokens spent, and <code>message.content</code> will be empty. Billed tokens, blank answer, and your system calls it a success.
                            </p>
                        </div>

                        <p className="text-[#153230]/80 leading-relaxed mb-12">
                            If you set the cap too low on a reasoning model, you don't get a short answer. You get <strong>no answer at all</strong>, but it still looks like a success. My mistake made sense: I set a low cap because I wanted a short response, thinking the cap would control the length. That works on a normal model, but on a reasoning model, it prevents the answer from being written at all.
                        </p>

                        <h2 className="text-3xl font-bold text-[#153230] mb-6">Failure Two: The Powerful Model That Overwrites</h2>

                        <p className="text-[#153230]/80 leading-relaxed mb-6">
                            Now for the opposite problem, which is something almost everyone does without realizing it.
                        </p>

                        <p className="text-[#153230]/80 leading-relaxed mb-6">
                            A high-reasoning model like Opus 4.8 is great for tough problems. But if you use it for something simple, it still goes through its full process. Ask it whether a message is a task or a question, and it will consider edge cases you never had, weigh different interpretations, and give you a detailed answer when you only needed one word. The answer is right, but it's slow, and you pay for every token it uses to think and write.
                        </p>

                        <p className="text-[#153230]/80 leading-relaxed mb-6">
                            This is a quieter and more expensive failure because nothing seems broken. The output looks fine, but it's much more than the task needed, created by a pricier model than necessary, and it takes longer than the task allows. If you do this for every call in your system, your product feels slow and your costs go up for no obvious reason.
                        </p>

                        <p className="text-[#153230]/80 leading-relaxed mb-12">
                            It feels safe to always use the best model, but this is the biggest reason for wasted money and slowdowns in AI products today. These tasks need a direct answer, not a college essay of an explanation.
                        </p>

                        <h2 className="text-3xl font-bold text-[#153230] mb-6">The Unifying Rule: Size the Model and the Length to the Task</h2>

                        <p className="text-[#153230]/80 leading-relaxed mb-6">
                            Before you make any calls, ask yourself two specific questions:
                        </p>

                        <div className="space-y-6 mb-8">
                            <div className="bg-white p-6 rounded-xl border-2 border-[#4D7DA3]/20 shadow-sm">
                                <h4 className="font-bold text-xl text-[#153230] mb-2">1. Does this task need reasoning at all?</h4>
                                <p className="text-[#153230]/80 leading-relaxed">
                                    For things like routing, classification, extraction, tagging, or short replies, the answer is no — these are pattern-matching jobs. Use a fast, inexpensive model, or set reasoning to a minimum. Save the deep-reasoning models for truly hard, multi-step problems where accuracy is worth the extra time and cost.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border-2 border-[#4D7DA3]/20 shadow-sm">
                                <h4 className="font-bold text-xl text-[#153230] mb-2">2. How long should the answer really be?</h4>
                                <p className="text-[#153230]/80 leading-relaxed">
                                    A verdict only needs one line. A research packet might need a whole page. These are different tasks and shouldn't use the same settings.
                                </p>
                            </div>
                        </div>

                        <p className="text-[#153230]/80 leading-relaxed mb-12">
                            Most systems do not consider these questions and instead rely on a single large model with default settings for all tasks. This approach simultaneously deprives complex tasks of necessary resources and overwhelms simple tasks with excessive output.
                        </p>

                        <h2 className="text-3xl font-bold text-[#153230] mb-6">What I Changed</h2>

                        <p className="text-[#153230]/80 leading-relaxed mb-6">
                            Here's how I applied this in a side project I built called SembleOps: a coordinator named Marco Maestro, my router, routes every request, and a group of specialist agents handles the actual work.
                        </p>

                        <h3 className="text-2xl font-bold text-[#153230] mb-4 mt-10">Routing uses minimal reasoning</h3>

                        <p className="text-[#153230]/80 leading-relaxed mb-6">
                            When Marco decides who should handle a request, it's just classification, not problem-solving. So the routing call sets reasoning to minimal and skips the deep reasoning path:
                        </p>

                        <div className="bg-[#1e1e1e] text-gray-300 p-6 rounded-xl my-8 font-mono text-sm border border-gray-700 shadow-xl overflow-x-auto">
                            <pre><code>{`// Routing is classification, not problem-solving: skip deep reasoning.
...(opts.minimalReasoning &&
  model.startsWith("gpt-5") &&
  { reasoning_effort: "minimal" }),`}</code></pre>
                        </div>

                        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl my-8">
                            <h3 className="font-bold text-green-900 mb-2">The Result</h3>
                            <p className="text-green-900/80">
                                That single change took routing from about <strong>33 seconds</strong> on a heavier CLI runtime down to just <strong>2 seconds</strong>. The task never needed deep reasoning, so removing it dropped the cost and made everything faster.
                            </p>
                        </div>

                        <h3 className="text-2xl font-bold text-[#153230] mb-4 mt-10">Token caps are runaway protection, not length control</h3>

                        <p className="text-[#153230]/80 leading-relaxed mb-6">
                            I moved the length target into the prompt, where I specify a word range and structure. The cap is only there to stop a real runaway, and for reasoning models, I add extra room so thinking tokens don't use up the whole budget before the answer.
                        </p>

                        <div className="bg-[#1e1e1e] text-gray-300 p-6 rounded-xl my-8 font-mono text-sm border border-gray-700 shadow-xl overflow-x-auto">
                            <pre><code>{`// Reasoning models spend thinking tokens from the same budget, so a
// tight cap yields an EMPTY completion. The cap here is runaway
// protection only; the real length target travels in the prompt.
...(opts.maxCompletionTokens &&
  (model.startsWith("gpt-5")
    ? { max_completion_tokens: opts.maxCompletionTokens + 1500 }
    : { max_tokens: opts.maxCompletionTokens })),`}</code></pre>
                        </div>

                        <p className="text-[#153230]/80 leading-relaxed mb-6">
                            This distinction is important: reasoning models require additional token allocation, whereas older models only need a straightforward cap. Although the objective remains consistent, token budgets must be tailored to the operational characteristics of each model.
                        </p>

                        <h3 className="text-2xl font-bold text-[#153230] mb-4 mt-10">Empty output counts as a failure, not a success</h3>

                        <p className="text-[#153230]/80 leading-relaxed mb-6">
                            This is the rule I'd give anyone using reasoning models: if the model returns an empty result, don't pass it along as if it worked. Treat it as a failed call and try the next model instead.
                        </p>

                        <div className="bg-[#1e1e1e] text-gray-300 p-6 rounded-xl my-8 font-mono text-sm border border-gray-700 shadow-xl overflow-x-auto">
                            <pre><code>{`const text = data.choices?.[0]?.message?.content ?? "";
if (text.trim().length === 0) {
  // Never report an empty completion as success (a length-capped
  // reasoning model does exactly this) — fall through to the next model.
  lastError = \`\${model}: empty completion (finish_reason \${
    data.choices?.[0]?.finish_reason ?? "unknown"
  })\`;
  continue;
}`}</code></pre>
                        </div>

                        <p className="text-[#153230]/80 leading-relaxed mb-6">
                            A blank result presented to a user is more problematic than an explicit error. An error at least indicates a failure, whereas a blank output provides no feedback.
                        </p>

                        <p className="text-[#153230]/80 leading-relaxed mb-12">
                            Instead of limiting output with a low cap, agents get a word budget and a required structure in the prompt. There's also an appendix rule: anything under an "Appendix" heading collapses in the UI and doesn't count against the budget. This way, answers are short and easy to read by default, but users can get more detail if they want, without using the token cap to limit output.
                        </p>

                        <h2 className="text-3xl font-bold text-[#153230] mb-6">The Lessons Are Portable to Any Stack</h2>

                        <ul className="space-y-4 mb-12 ml-4">
                            <li className="text-[#153230]/80"><strong>max_tokens and max_completion_tokens are not the same.</strong> One limits just the answer, the other limits both thinking and the answer. Make sure you know which model you're using.</li>
                            <li className="text-[#153230]/80"><strong>A low cap on a reasoning model gives you empty output, not a short one.</strong> If you want a short answer, ask for it in the prompt and give the cap some extra room.</li>
                            <li className="text-[#153230]/80"><strong>An empty completion means failure.</strong> Never treat it as a success. Detect it, log the finish_reason, and either retry or move on to the next model.</li>
                            <li className="text-[#153230]/80"><strong>Not every task needs a reasoning model.</strong> For routing, classification, and extraction, use a fast model or minimal reasoning. Save the heavy models for the tough problems.</li>
                            <li className="text-[#153230]/80"><strong>Defaulting to the most advanced model is the most expensive habit in AI development.</strong> Model selection should be based on task complexity rather than concerns about output quality.</li>
                            <li className="text-[#153230]/80"><strong>Control answer length by agreement, not by cutting it off.</strong> Giving a word range and structure in the prompt works better than a token cap for anything people need to read.</li>
                            <li className="text-[#153230]/80"><strong>Cost and speed are design choices, not accidents.</strong> Every call is a decision about how much intelligence the task really needs. Make that choice on purpose.</li>
                        </ul>

                        <div className="bg-amber-50 rounded-2xl p-8 border-l-4 border-amber-500 my-12">
                            <h3 className="text-amber-900 font-bold text-xl mb-4">The Mindset That Ties It All Together</h3>
                            <p className="text-amber-900/80 leading-relaxed mb-4">
                                A token cap is there for <strong>safety</strong>, not for control. A powerful model is a <strong>tool</strong>, not the default.
                            </p>
                            <p className="text-amber-900 font-bold">
                                Choose the smallest model that does the job, tell it how long the answer should be, and never accept an empty result as a success.
                            </p>
                        </div>

                        <p className="text-[#153230]/60 italic mt-12">
                            Two opposite bugs, one mistake. Size the intelligence to the task, and both of them disappear.
                        </p>

                    </>
                )
            }}
        />
    );
}
