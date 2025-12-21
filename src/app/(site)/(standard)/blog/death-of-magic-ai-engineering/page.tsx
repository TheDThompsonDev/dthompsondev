'use client';

import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import { InteractiveCode } from '@/components/InteractiveCode';
import { AnimatedDiagram } from '@/components/AnimatedDiagram';
import { ScrollReveal } from '@/components/ScrollReveal';
import { VirtualWhiteboard } from '@/components/VirtualWhiteboard';
import { CodeMorph } from '@/components/CodeMorph';

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
    <BlogPostLayout
      category="AI Engineering"
      date="November 29, 2025"
      readTime="15 min read"
      title={<>The Death of Magic:<br /><span className="text-[#4D7DA3]">Welcome to AI Engineering</span></>}
      subtitle="The 'Magic Era' of AI is dead. Learn the four architectural pillars that separate weekend prompt-tinkerers from production AI engineers."
      slug="death-of-magic-ai-engineering"
      coverImage="/blog-covers/ai-engineering.png"
      short={{
        content: (
          <>
            <p className="mb-6 font-bold text-xl text-[#153230]">
              Danny's Quick Takes:
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex gap-3">
                <span className="text-[#4D7DA3] font-bold">→</span>
                <span><strong>Use State Machines, not Context.</strong> The model is a stateless CPU, not an employee. Stop context rot by managing state in <em>your</em> code, not the prompt.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#4D7DA3] font-bold">→</span>
                <span><strong>English is a Compiled Language.</strong> Treat prompts like code. Ambiguity = Syntax Error. Use schemas and type safety to force deterministic outputs.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#4D7DA3] font-bold">→</span>
                <span><strong>Assume Inference Will Fail.</strong> APIs are distributed systems on experimental hardware. If you don't have fallbacks and exponential backoff, you're not in production.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#4D7DA3] font-bold">→</span>
                <span><strong>Evals, Not Vibes.</strong> You cannot scale "looking at it." Build a regression testing suite using golden datasets and LLM-as-judge. If pass rate drops, break the build.</span>
              </li>
            </ul>

            <div className="bg-[#153230] text-white p-6 rounded-2xl">
              <p className="font-bold text-lg">The Bottom Line:</p>
              <p className="mt-2">Stop looking for magic. Start building the machine. Engineering discipline wins over prompt wizardry.</p>
            </div>
          </>
        )
      }}
      medium={{
        content: (
          <>
            <p className="mb-6 font-medium text-xl text-[#153230]">
              The "Magic Era" of AI is dead. We are moving from "Prompt and Pray" to true Engineering.
            </p>

            <p className="mb-6">
              We've spent fifty years building tools for deterministic systems. Then we threw it all away because the ChatGPT demo looked cool. It's time to bring engineering discipline back to AI.
            </p>

            <h2 className="text-3xl font-bold text-[#153230] mb-4 mt-12">The 4 Pillars of AI Engineering</h2>

            <AnimatedDiagram
              title="The Architectural Pillars"
              steps={architectPillars}
            />

            <div className="space-y-8 mt-12">
              <div className="bg-[#f8fcfe] border-l-4 border-[#4D7DA3] p-6 rounded-r-xl">
                <h3 className="font-bold text-[#153230] mb-2 text-xl">1. State Orchestration</h3>
                <p className="mb-2"><strong>The Problem:</strong> Context Rot. Stuffing everything into one context window degrades recall and reasoning.</p>
                <p><strong>The Fix:</strong> Use a Finite State Machine (FSM). Keep the model stateless. Manage the workflow iteration, task ID, and artifact state in <em>your</em> database/code, and only hydrate the prompt with exactly what's needed for the current state.</p>
              </div>

              <div className="bg-[#f8fcfe] border-l-4 border-[#10B981] p-6 rounded-r-xl">
                <h3 className="font-bold text-[#153230] mb-2 text-xl">2. Constrained Generation</h3>
                <p className="mb-2"><strong>The Problem:</strong> Probabilistic chaos. "Sure! Here is the JSON you asked for..." breaks your parser.</p>
                <p><strong>The Fix:</strong> Force the probability distribution. Use tools like Pydantic or Instructor to hook into the sampling loop and reject tokens that don't match your schema.</p>
              </div>

              <div className="bg-[#f8fcfe] border-l-4 border-[#F59E0B] p-6 rounded-r-xl">
                <h3 className="font-bold text-[#153230] mb-2 text-xl">3. Infrastructure Reliability</h3>
                <p className="mb-2"><strong>The Problem:</strong> Hardware failures, packet drops, and bit-flips on experimental TPU hardware.</p>
                <p><strong>The Fix:</strong> Defensive programming. Wrap every call in retry logic with exponential backoff. Cascade through multiple providers (Anthropic fail &rarr; OpenAI fail &rarr; Google).</p>
              </div>

              <div className="bg-[#f8fcfe] border-l-4 border-[#8B5CF6] p-6 rounded-r-xl">
                <h3 className="font-bold text-[#153230] mb-2 text-xl">4. Regression Testing (Evals)</h3>
                <p className="mb-2"><strong>The Problem:</strong> "Vibes" don't scale. You can't manually check every output.</p>
                <p><strong>The Fix:</strong> Build an Eval Pipeline. Defining "Golden Datasets" of correct input/outputs. Use a cheaper "Judge" LLM to grade your production model's outputs. Break the build if the score drops.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-[#153230] mb-6 mt-16">The Eval Pipeline Visualized</h3>
            <AnimatedDiagram
              title="Automated Quality Control"
              steps={evalPipeline}
            />
          </>
        )
      }}
      long={{
        content: (
          <>
            <VirtualWhiteboard
              title="Take Notes While Reading"
              height={300}
            />

            <ScrollReveal delay={400}>
              <div className="mb-12">
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
                  Sometimes the AI overlords smile on us. We get a perfect function back. We screenshot it. We feel like wizards. But if you've tried to build anything <em>real</em>, something that runs in production at 3 AM without you watching it,you know the truth.
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
                    We've spent fifty years building tools for deterministic systems, type checkers, unit tests, state machines, CI/CD pipelines. Then we threw it all out the window because the demo looked cool. It's time to stop doing that.
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
                We all want to build "agents." But the biggest mistake I see developers make is building the <strong>Monolithic Agent</strong>, stuffing the history, instructions, reasoning, and tools all into one context window and hoping the model figures it out.
              </p>
              <p className="text-[#153230]/80 leading-relaxed mb-6">
                Here's what actually happens: the context window fills up, recall degrades, and the model gets confused. If you've used agentic coding tools, you've seen this. The moment it hits the context limit, it "magically" gets more space. It doesn't magically get anything,it's dropping context. This is <strong>context rot</strong>.
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
                If the harness is the state machine, what is the prompt? Stop chatting with the bot. "Please," "thank you," "could you maybe...", delete that from your vocabulary when building production systems.
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
                  When you ask a model "what do you think about X?", you're forcing it to sample a random persona from its training distribution. Instead, ask: <strong>"What group of people would identify with X?"</strong> The results are dramatically different. The model stops roleplaying a generic assistant and starts reasoning about actual perspectives.
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
                  Anthropic published a post-mortem tracing a bug where Claude was outputting corrupted text,random characters appearing in responses,down to a <strong>hardware failure in the TPU</strong>.
                </p>
                <p className="text-red-900/80 leading-relaxed">
                  An optimization for approximate top-k sampling had a floating-point precision mismatch. When outputting English text, the bug would substitute Thai characters, because Thai had the lowest probability of being correct. The precision error was inverting the probability distribution.
                </p>
              </div>

              <p className="text-[#153230]/80 leading-relaxed mb-8">
                <strong>We treat these APIs like magic black boxes. They aren't.</strong> They're distributed systems running on experimental hardware that gets hot, drops packets, and has bit-flips. If the people <em>building</em> the models are dealing with corrupted tensors, you cannot build your app assuming the AI will work perfectly.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <CodeMorph steps={infrastructureSteps} title="Infrastructure Resilience Pattern" />
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16">
                Pillar 4: Regression Testing (Vibes vs. Evals)
              </h2>
              <p className="text-[#153230]/80 leading-relaxed mb-6">
                In traditional engineering, we have unit tests. <code className="bg-gray-100 px-2 py-1 rounded">assert(2 + 2 === 4)</code>. In AI, we have "vibe checks." We look at the output and say, "Yeah, looks good."
              </p>
              <p className="text-[#153230]/80 leading-relaxed mb-8">
                <strong>You cannot scale vibes.</strong> You need <strong>Evals</strong>,regression testing for probabilities.
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
          </>
        )
      }}
    />
  );
}
