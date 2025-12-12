'use client';

import { ScrollProgress } from '@/components/ScrollProgress';
import { InteractiveCode } from '@/components/InteractiveCode';
import { AnimatedDiagram } from '@/components/AnimatedDiagram';
import { ScrollReveal } from '@/components/ScrollReveal';
import { VirtualWhiteboard } from '@/components/VirtualWhiteboard';
import { CodeMorph } from '@/components/CodeMorph';
import { CodeSteps } from '@/components/CodeSteps';
import Link from 'next/link';

export default function DeathOfMagicPost() {
  const stateOrchestrationEvolution = [
    {
      title: 'The Monolithic Agent (Anti-Pattern)',
      description: 'Stuffing history, instructions, reasoning, and tools all into one context window. This leads to context rot.',
      code: `// ❌ The Monolithic Agent
async function askAgent(userMessage: string) {
  const response = await llm.complete({
    messages: [
      ...historyMessages,      // Growing unbounded
      ...systemInstructions,   // Complex instructions
      ...reasoningContext,     // Previous reasoning
      { role: 'user', content: userMessage }
    ],
    tools: allAvailableTools   // Everything thrown in
  });
  
  // Hope the model figures it out...
  return response;
}`,
    },
    {
      title: 'Define States in Code',
      description: 'Your states live in YOUR code, not the model\'s context. The model is a stateless CPU, not an employee.',
      code: `// ✅ States live in YOUR code
enum AgentState {
  RESEARCH = 'research',
  CODE = 'code',
  REVIEW = 'review',
  COMPLETE = 'complete'
}

interface WorkflowContext {
  state: AgentState;
  taskId: string;
  artifacts: string[];
  iteration: number;
}`,
    },
    {
      title: 'Persist State Externally',
      description: 'State persists in Redis/Postgres, NOT the context window. Hydrate only what\'s needed for each state.',
      code: `// State persists in Redis/Postgres, NOT the context window
async function persistState(ctx: WorkflowContext): Promise<void> {
  await redis.set(\`workflow:\${ctx.taskId}\`, JSON.stringify(ctx));
}

// Hydrate context for *that specific state only*
async function executeState(
  state: AgentState, 
  context: string
): Promise<Action> {
  const prompt = buildPromptForState(state, context);
  const result = await llm.complete(prompt);
  return parseAction(result);
}

// The model is the engine; YOU are the driver`,
    },
  ];

  const constrainedGenExamples = [
    {
      title: 'Prefilling (Context Injection)',
      code: `// Force JSON output by prefilling the response
const messages = [
  { role: 'user', content: 'Extract the user data from this text: ...' },
  { role: 'assistant', content: '{' }  // <- Prefill the opening brace
];

const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-20250514',
  messages,
  max_tokens: 1024
});

// Response continues from '{', bypassing "Sure! Here's the JSON..."`,
      explanation: 'By putting that brace in the model\'s mouth, you bypass the preamble and force the probability distribution to align with your schema immediately.',
      color: '#4D7DA3',
    },
    {
      title: 'Type Safety with Pydantic',
      code: `from pydantic import BaseModel
from instructor import from_anthropic
import anthropic

class UserExtraction(BaseModel):
    name: str
    age: int   # Must be an integer - enforced at sampling time
    email: str

client = from_anthropic(anthropic.Anthropic())

user = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Extract: John Doe, 29 years old, john@example.com"}],
    response_model=UserExtraction,
)

# user.age is guaranteed to be an int, not "twenty-nine"`,
      explanation: 'Tools like Pydantic and Instructor hook into the sampling loop. If your schema requires an integer and the model attempts to sample a letter, the sampler rejects it and forces a resample.',
      color: '#10B981',
    },
  ];

  const infrastructureSteps = [
    {
      title: 'Define Multiple Providers',
      description: 'Create a list of provider fallbacks. Don\'t rely on a single API.',
      code: `const providers = [
  { name: 'claude', fn: () => anthropic.messages.create() },
  { name: 'gpt4', fn: () => openai.chat.completions.create() },
  { name: 'gemini', fn: () => google.complete(prompt) },
];`,
    },
    {
      title: 'Implement Retry with Backoff',
      description: 'Wrap each provider call with exponential backoff retry logic.',
      code: `async function withRetry<T>(
  fn: () => Promise<T>,
  opts: RetryOptions
): Promise<T> {
  let lastError: Error;
  for (let i = 0; i < opts.maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const delay = opts.initialDelay * Math.pow(2, i);
      await sleep(delay);
    }
  }
  throw lastError;
}`,
    },
    {
      title: 'Cascade Through Providers',
      description: 'If one provider fails all retries, move to the next. Only fail if ALL providers fail.',
      code: `async function robustCompletion(prompt: string): Promise<string> {
  for (const provider of providers) {
    try {
      return await withRetry(provider.fn, {
        maxRetries: 3,
        backoff: 'exponential',
        initialDelay: 1000,
      });
    } catch (error) {
      console.error(\`\${provider.name} failed, trying next provider\`);
      continue;
    }
  }
  throw new Error('All providers failed');
}`,
    },
  ];

  const evalPipeline = [
    {
      title: 'Golden Dataset',
      description: '100+ examples of perfect input/output pairs that define "correct" behavior.',
      color: '#4D7DA3',
      icon: '📊',
    },
    {
      title: 'Run on Every PR',
      description: 'Any change that touches prompts triggers the eval suite automatically.',
      color: '#F59E0B',
      icon: '🔄',
    },
    {
      title: 'LLM-as-Judge',
      description: 'Since you can\'t assert text equality, use a model to grade outputs against criteria.',
      color: '#8B5CF6',
      icon: '⚖️',
    },
    {
      title: 'Break the Build',
      description: 'If pass rate drops from 94% to 89%, you break the build. Don\'t ship it.',
      color: '#EF4444',
      icon: '🛑',
    },
  ];

  const architectPillars = [
    {
      title: 'State Orchestration',
      description: 'Build smart orchestrators that manage stateless models with external state persistence.',
      color: '#4D7DA3',
      icon: '🎯',
    },
    {
      title: 'Constrained Generation',
      description: 'English is a compiled language. Use prefilling and type-safe schemas.',
      color: '#10B981',
      icon: '🔒',
    },
    {
      title: 'Infrastructure Reliability',
      description: 'Retry backoffs, fallback providers, assume inference will fail.',
      color: '#F59E0B',
      icon: '🏗️',
    },
    {
      title: 'Regression Testing',
      description: 'Evals, not vibes. Golden datasets, LLM-as-judge, break the build on degradation.',
      color: '#8B5CF6',
      icon: '✅',
    },
  ];

  return (
    <>
      <ScrollProgress />

      <div className="min-h-screen bg-[#E2F3F2]">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-white rounded-[32px] shadow-xl m-4 border border-[#4D7DA3]/10">

            <header className="px-8 md:px-16 py-6 flex justify-between items-center border-b border-[#4D7DA3]/10">
              <Link href="/blog" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-[#153230] rounded-xl flex items-center justify-center text-white text-lg font-bold">
                  ←
                </div>
                <span className="text-lg font-bold tracking-tight text-[#153230]">Back to Blog</span>
              </Link>
            </header>

            <article className="px-8 md:px-16 py-12 max-w-4xl mx-auto">
              <VirtualWhiteboard
                title="Take Notes While Reading"
                height={300}
              />

              <ScrollReveal delay={400}>
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-[#4D7DA3]">
                      AI Engineering
                    </span>
                    <span className="text-[#153230]/60 text-sm">December 11, 2025 • 15 min read</span>
                  </div>

                  <h1 className="text-5xl md:text-6xl font-bold text-[#153230] leading-[1.1] mb-6">
                    The Death of Magic:<br />
                    <span className="text-[#4D7DA3]">Welcome to AI Engineering</span>
                  </h1>

                  <p className="text-xl text-[#153230]/70 leading-relaxed">
                    For the last two years, we've all been guilty of the same workflow. You type something into a box, hit enter, and pray. <strong>Prompt and pray.</strong> As we move into 2026, the "Magic Era" of AI is dead. And honestly? That's the best thing that could happen to us.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold text-[#153230] mb-4 mt-12">
                    The Engineering Reality
                  </h2>
                  <p className="text-[#153230]/80 leading-relaxed mb-6">
                    Sometimes the AI gods smile on us. We get a perfect function back. We screenshot it. We feel like wizards. But if you've tried to build anything <em>real</em>—something that runs in production at 3 AM without you watching it—you know the truth.
                  </p>
                  <p className="text-[#153230]/80 leading-relaxed mb-6">
                    The magic is fragile. It breaks on edge cases. It hallucinates when the inputs get messy. Because here's what we've been ignoring: <strong>we are trying to build deterministic systems on top of probabilistic foundations.</strong>
                  </p>

                  <div className="bg-amber-50 rounded-2xl p-6 border-l-4 border-amber-500 my-8">
                    <p className="text-amber-900 font-semibold mb-2 flex items-center gap-2">
                      <span className="text-2xl">⚠️</span>
                      <span>The Problem</span>
                    </p>
                    <p className="text-amber-900/80 leading-relaxed">
                      We've spent fifty years building tools for deterministic systems—type checkers, unit tests, state machines, CI/CD pipelines. Then we threw it all out the window because the demo looked cool. It's time to stop doing that.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <AnimatedDiagram
                  title="The Four Pillars of AI Engineering"
                  steps={architectPillars}
                />
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16">
                  Pillar 1: State Orchestration
                </h2>
                <p className="text-[#153230]/80 leading-relaxed mb-6">
                  We all want to build "agents." But the biggest mistake I see developers make is building the <strong>Monolithic Agent</strong>—stuffing the history, instructions, reasoning, and tools all into one context window and hoping the model figures it out.
                </p>
                <p className="text-[#153230]/80 leading-relaxed mb-6">
                  Here's what actually happens: the context window fills up, recall degrades, and the model gets confused. If you've used agentic coding tools, you've seen this. The moment it hits the context limit, it "magically" gets more space. It doesn't magically get anything—it's dropping context. This is <strong>context rot</strong>.
                </p>

                <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-500 my-8">
                  <p className="text-blue-900 font-semibold mb-2 flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    <span>The Mental Model Shift</span>
                  </p>
                  <p className="text-blue-900/80 leading-relaxed">
                    <strong>The model is not an employee. The model is a stateless CPU.</strong> If you rely on the model to remember what step of the project it's on, you've already failed. Use a Finite State Machine (FSM) pattern.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <CodeMorph steps={stateOrchestrationEvolution} title="From Monolithic to State-Managed" />
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <div className="bg-emerald-50 rounded-2xl p-6 border-l-4 border-emerald-500 my-8">
                  <p className="text-emerald-900 font-semibold mb-2 flex items-center gap-2">
                    <span className="text-2xl">✅</span>
                    <span>Key Insight</span>
                  </p>
                  <p className="text-emerald-900/80 leading-relaxed">
                    <strong>Senior engineers don't build "smart agents." They build smart orchestrators that manage stateless models.</strong>
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16">
                  Pillar 2: Constrained Generation
                </h2>
                <p className="text-[#153230]/80 leading-relaxed mb-6">
                  If the harness is the state machine, what is the prompt? Stop chatting with the bot. "Please," "thank you," "could you maybe..."—delete that from your vocabulary when building production systems.
                </p>
                <p className="text-[#153230]/80 leading-relaxed mb-8">
                  In 2026, <strong>English is a compiled language.</strong> When you write a prompt, you're writing code that compiles into a probability distribution. Ambiguity is a syntax error.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <InteractiveCode
                  examples={constrainedGenExamples}
                  title="Constrained Generation Patterns"
                />
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <div className="bg-purple-50 rounded-2xl p-6 border-l-4 border-purple-500 my-8">
                  <p className="text-purple-900 font-semibold mb-2 flex items-center gap-2">
                    <span className="text-2xl">🧠</span>
                    <span>Karpathy's Insight: Stop Asking "What Do You Think?"</span>
                  </p>
                  <p className="text-purple-900/80 leading-relaxed">
                    When you ask a model "what do you think about X?"—you're forcing it to sample a random persona from its training distribution. Instead, ask: <strong>"What group of people would identify with X?"</strong> The results are dramatically different. The model stops roleplaying a generic assistant and starts reasoning about actual perspectives.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16">
                  Pillar 3: Infrastructure Reliability
                </h2>
                <p className="text-[#153230]/80 leading-relaxed mb-6">
                  "I trust the API. It's Google. It's OpenAI. It's solid." <strong>No. It isn't.</strong>
                </p>

                <div className="bg-red-50 rounded-2xl p-6 border-l-4 border-red-500 my-8">
                  <p className="text-red-900 font-semibold mb-2 flex items-center gap-2">
                    <span className="text-2xl">🚨</span>
                    <span>Real-World Post-Mortem</span>
                  </p>
                  <p className="text-red-900/80 leading-relaxed mb-4">
                    Anthropic published a post-mortem tracing a bug where Claude was outputting corrupted text—random characters appearing in responses—down to a <strong>hardware failure in the TPU</strong>.
                  </p>
                  <p className="text-red-900/80 leading-relaxed">
                    An optimization for approximate top-k sampling had a floating-point precision mismatch. When outputting English text, the bug would substitute Thai characters—because Thai had the lowest probability of being correct. The precision error was inverting the probability distribution.
                  </p>
                </div>

                <p className="text-[#153230]/80 leading-relaxed mb-8">
                  <strong>We treat these APIs like magic black boxes. They aren't.</strong> They're distributed systems running on experimental hardware that gets hot, drops packets, and has bit-flips. If the people <em>building</em> the models are dealing with corrupted tensors, you cannot build your app assuming the AI will work perfectly.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <CodeSteps steps={infrastructureSteps} />
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16">
                  Pillar 4: Regression Testing (Vibes vs. Evals)
                </h2>
                <p className="text-[#153230]/80 leading-relaxed mb-6">
                  In traditional engineering, we have unit tests. <code className="bg-gray-100 px-2 py-1 rounded">assert(2 + 2 === 4)</code>. In AI, we have "vibe checks." We look at the output and say, "Yeah, looks good."
                </p>
                <p className="text-[#153230]/80 leading-relaxed mb-8">
                  <strong>You cannot scale vibes.</strong> You need <strong>Evals</strong>—regression testing for probabilities.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <AnimatedDiagram
                  title="Building an Eval Pipeline"
                  steps={evalPipeline}
                />
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <div className="border border-gray-200 rounded-lg overflow-hidden my-8">
                  <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-lg bg-purple-500"></div>
                    <h4 className="text-sm font-semibold text-gray-700">Eval Pipeline Implementation (Python)</h4>
                  </div>
                  <div className="p-6">
                    <pre className="bg-[#0d1117] text-gray-100 p-6 rounded-lg overflow-x-auto text-sm border border-gray-800">
                      <code>{`from dataclasses import dataclass
from enum import Enum

class EvalResult(Enum):
    PASS = "pass"
    FAIL = "fail"

@dataclass
class GoldenExample:
    input: str
    expected_output: str
    criteria: list[str]  # What makes this output "correct"

async def evaluate_output(
    actual: str, 
    expected: str, 
    criteria: list[str]
) -> EvalResult:
    """Use a smaller, cheaper model as judge"""
    judge_prompt = f"""
    Evaluate if the ACTUAL output meets the criteria for the EXPECTED output.
    EXPECTED: {expected}
    ACTUAL: {actual}
    CRITERIA:
    {chr(10).join(f'- {c}' for c in criteria)}
    
    Respond with only PASS or FAIL.
    """
    result = await cheap_model.complete(judge_prompt)
    return EvalResult.PASS if "PASS" in result else EvalResult.FAIL

async def run_eval_suite(
    golden_dataset: list[GoldenExample],
    prompt_template: str
) -> float:
    """Returns pass rate as percentage"""
    results = []
    for example in golden_dataset:
        actual = await your_model.complete(
            prompt_template.format(input=example.input)
        )
        result = await evaluate_output(
            actual, 
            example.expected_output,
            example.criteria
        )
        results.append(result)
    
    pass_count = sum(1 for r in results if r == EvalResult.PASS)
    return (pass_count / len(results)) * 100`}</code>
                    </pre>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={600}>
                <div className="bg-red-50 rounded-2xl p-6 border-l-4 border-red-500 my-8">
                  <p className="text-red-900 font-semibold mb-2 flex items-center gap-2">
                    <span className="text-2xl">🛑</span>
                    <span>The Golden Rule</span>
                  </p>
                  <p className="text-red-900/80 leading-relaxed">
                    <strong>If your pass rate drops from 94% to 89%, you break the build.</strong> Don't ship it. Even though 89% might seem "pretty good," that 5% degradation is a signal. Investigate before it compounds. This is the only way to refactor prompts without fear.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16">
                  The AI Architect Role
                </h2>
                <p className="text-[#153230]/80 leading-relaxed mb-6">
                  The "Prompt Engineer" title is dying. But the <strong>AI Architect</strong> role is just being born.
                </p>
                <p className="text-[#153230]/80 leading-relaxed mb-8">
                  The moat isn't the model. We all have access to the same models—and honestly, they're converging in capability. The moat is your <strong>harness</strong>:
                </p>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="border-2 border-gray-900 rounded-2xl p-8 my-8 bg-white">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 tracking-tight">Key Takeaways</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4 text-gray-700 leading-relaxed">
                      <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-lg bg-blue-600"></div>
                      </div>
                      <span>Your <strong>state machine</strong> manages workflow, not the LLM's context window</span>
                    </li>
                    <li className="flex items-start gap-4 text-gray-700 leading-relaxed">
                      <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-lg bg-emerald-600"></div>
                      </div>
                      <span>Your <strong>type safety</strong> controls the chaos of probabilistic outputs</span>
                    </li>
                    <li className="flex items-start gap-4 text-gray-700 leading-relaxed">
                      <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-lg bg-amber-600"></div>
                      </div>
                      <span>Your <strong>fallback strategies</strong> handle the reality of infrastructure failures</span>
                    </li>
                    <li className="flex items-start gap-4 text-gray-700 leading-relaxed">
                      <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-lg bg-purple-600"></div>
                      </div>
                      <span>Your <strong>evals</strong> prove the truth when vibes can't scale</span>
                    </li>
                  </ul>

                  <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <p className="text-xl font-bold text-[#153230]">
                      Stop looking for magic. Start building the machine.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <div className="mt-16 pt-8 border-t border-[#4D7DA3]/20">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <p className="text-[#153230]/80 leading-relaxed italic">
                      <strong>Danny Thompson</strong> is Director of Technology at This Dot Labs, co-host of The Programming Podcast, and co-author of <a href="https://developersguide.ai" className="text-[#4D7DA3] hover:underline">The Developer's Guide to AI</a>. He's helped over 1,000 developers land tech jobs and runs the Commit Your Code community.
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-8">
                    <Link
                      href="/blog"
                      className="text-[#4D7DA3] hover:text-[#153230] font-bold flex items-center gap-2 transition-colors"
                    >
                      ← Back to all posts
                    </Link>
                    <div className="flex gap-4">
                      <button className="text-[#4D7DA3] hover:text-[#153230] font-bold transition-colors">
                        Share →
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </article>

            <footer className="px-8 md:px-16 py-8 border-t border-[#4D7DA3]/10 bg-[#f8fcfe]">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[#153230]/60 text-sm">
                  © {new Date().getFullYear()} DTHOMPSONDEV. All rights reserved.
                </p>
                <div className="flex gap-6">
                  <Link href="/" className="text-[#153230]/60 hover:text-[#4D7DA3] text-sm font-semibold transition-colors">
                    Home
                  </Link>
                  <Link href="/blog" className="text-[#153230]/60 hover:text-[#4D7DA3] text-sm font-semibold transition-colors">
                    Blog
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
