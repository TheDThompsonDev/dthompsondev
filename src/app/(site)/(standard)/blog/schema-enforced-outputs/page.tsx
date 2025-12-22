'use client';

import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ScrollReveal';
import { CodeMorph } from '@/components/CodeMorph';
import Image from 'next/image';

export default function SchemaEnforcedOutputsPost() {
    const schemaImplementationSteps = [
        {
            title: 'Step 1: Define Your Schema',
            description: 'Use Zod to define schema, types, and guidance in one place. The .describe() annotations steer the model toward the right values.',
            code: `import { z } from "zod";

export const SupportTicketSchema = z.object({
  schemaVersion: z.literal("v1")
    .describe("Schema version for analytics and migrations"),
    
  language: z.string()
    .describe("BCP-47 language code of the input, e.g., en-US"),
    
  sentiment: z.enum(["positive", "neutral", "negative"])
    .describe("Overall sentiment of the customer's message"),
    
  department: z.enum([
    "customer_support",
    "online_ordering",
    "product_quality",
    "shipping_and_delivery",
    "other_off_topic"
  ]).describe("Primary routing category for this ticket"),
  
  priority: z.enum(["low", "medium", "high"])
    .describe("Urgency level based on content and tone"),
    
  confidence: z.number().min(0).max(1)
    .describe("Model confidence in this classification, 0 to 1"),
    
  suggestedReply: z.string().min(1).max(500).describe(
    "Friendly, professional tone. 60-120 words. Acknowledge the issue, " +
    "provide next steps and contact info. No emojis. Match the user's language."
  )
});

export type SupportTicket = z.infer<typeof SupportTicketSchema>;`
        },
        {
            title: 'Step 2: Configure Your LLM Call',
            description: 'Use the native zodResponseFormat helper. This eliminates manual JSON schema conversion and enforces strict mode by default.',
            code: `import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function classifyMessage(message: string): Promise<SupportTicket> {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-11-20", 
    temperature: 0, // Low temp for consistency
    messages: [
      {
        role: "system",
        content: "Classify customer support messages and suggest replies."
      },
      { role: "user", content: message }
    ],
    response_format: zodResponseFormat(SupportTicketSchema, "support_ticket")
  });

  const result = completion.choices[0]?.message?.parsed;
  if (!result) {
    throw new Error("Failed to parse structured response");
  }
  
  // Step 3 shows why we still parse manually...
  return result; 
}`
        },
        {
            title: 'Step 3: Use Typed Data',
            description: 'The result is fully typed. You can use it immediately in your application logic with confidence.',
            code: `  // ... inside your app logic

  const result = await classifyMessage("Order #8841 is two weeks late!");

  console.log(result.sentiment);        // "negative"
  console.log(result.department);       // "shipping_and_delivery"
  console.log(result.priority);         // "high"
  console.log(result.confidence);       // 0.94
  
  // Confidence gating for automation
  if (result.confidence >= 0.85) {
    await sendAutomatedReply(result.suggestedReply);
  } else {
    await flagForHumanReview(result);
  }`
        }
    ];

    return (
        <BlogPostLayout
            category="AI Engineering"
            date="December 13, 2025"
            readTime="8 min read"
            title={<>Understanding Schema-Enforced<br /><span className="text-[#4D7DA3]">Outputs</span></>}
            subtitle="If you've integrated an LLM by parsing its output with regex, you've likely experienced the moment when everything breaks. It's time to make the model speak JSON."
            slug="schema-enforced-outputs"
            coverImage="/blog-covers/schema-outputs.jpeg"
            short={{
                content: (
                    <>
                        <p className="mb-6 font-bold text-xl text-[#153230]">
                            Danny's Quick Rules for Schemas:
                        </p>

                        <ul className="space-y-4 mb-8">
                            <li className="flex gap-3">
                                <span className="text-[#4D7DA3] font-bold">→</span>
                                <span><strong>Regex is not a Parser.</strong> Stop parsing LLM output with regex. It works for 100 examples and breaks on the 101st.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#4D7DA3] font-bold">→</span>
                                <span><strong>Use Native Structured Outputs.</strong> OpenAI, Anthropic, and Gemini all support JSON mode or Tool Use. This isn't a suggestion; it's the standard.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#4D7DA3] font-bold">→</span>
                                <span><strong>Type Safety is Mandatory.</strong> If you can't satisfy TypeScript at compile tiime, you shouldn't be shipping it. Use Zod to define your runtime contract.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#4D7DA3] font-bold">→</span>
                                <span><strong>Validation &gt; Correction.</strong> Don't try to "fix" bad JSON. Reject it. Force the model to retry or fail gracefully.</span>
                            </li>
                        </ul>

                        <div className="bg-[#153230] text-white p-6 rounded-2xl">
                            <p className="font-bold text-lg">The Bottom Line:</p>
                            <p className="mt-2">Unstructured text is for humans. Machines need schemas.</p>
                        </div>
                    </>
                )
            }}
            medium={{
                content: (
                    <>
                        <p className="mb-6 font-medium text-xl text-[#153230]">
                            The core problem with LLM integrations is fragility. A single word change in the output breaks your regex parser.
                        </p>

                        <h2 className="text-3xl font-bold text-[#153230] mb-4 mt-8">Why "Structured Outputs" Matter</h2>
                        <p className="mb-6">
                            Modern APIs (OpenAI, Anthropic) don't just "try" to output JSON. They constrain the sampling loop. If the schema expects an integer, the model literally <em>cannot</em> generate a letter. It's an API-level guarantee.
                        </p>

                        <h2 className="text-3xl font-bold text-[#153230] mb-4 mt-8">The 4 Benefits</h2>
                        <div className="grid md:grid-cols-2 gap-6 my-8">
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                <h3 className="font-bold text-[#4D7DA3] text-xl mb-2">1. Zero Parsing Logic</h3>
                                <p className="text-sm">Stop writing fragile regex. The model emits exact keys and types.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                <h3 className="font-bold text-[#4D7DA3] text-xl mb-2">2. End-to-End Type Safety</h3>
                                <p className="text-sm">Define schema with Zod, derive TypeScript types, and validate at runtime.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                <h3 className="font-bold text-[#4D7DA3] text-xl mb-2">3. Operational Reliability</h3>
                                <p className="text-sm">Reduced retry rates and format drift. Predictable error handling.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                <h3 className="font-bold text-[#4D7DA3] text-xl mb-2">4. Maintainable Codebase</h3>
                                <p className="text-sm">Consistent keys make dashboards and QA reliable.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-[#153230] mb-4 mt-8">The Pattern: Zod + TypeScript</h2>
                        <div className="bg-[#1e293b] text-gray-100 p-6 rounded-xl overflow-x-auto text-sm my-6 font-mono">
                            <pre>{`// 1. Define Schema
const TicketSchema = z.object({
  department: z.enum(["sales", "support"]),
  priority: z.enum(["high", "low"])
});

// 2. Call LLM
const completion = await openai.chat.completions.create({
  // ...
  response_format: {
    type: "json_schema",
    json_schema: { schema: zodToJsonSchema(TicketSchema) }
  }
});

// 3. Validate
const ticket = TicketSchema.parse(JSON.parse(completion.content));`}</pre>
                        </div>
                    </>
                )
            }}
            long={{
                content: (
                    <>
                        <ScrollReveal>
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl mb-12">
                                <p className="font-bold text-yellow-800 mb-2">Prerequisites</p>
                                <ul className="list-disc list-inside text-yellow-900/80 space-y-1">
                                    <li>Node.js 18+ installed</li>
                                    <li>An API key from OpenAI, Anthropic, or Azure OpenAI</li>
                                    <li>Basic TypeScript familiarity</li>
                                </ul>
                                <code className="block mt-3 bg-yellow-100/50 p-2 rounded text-sm font-mono text-yellow-900">
                                    npm install zod openai
                                </code>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <h2 className="text-3xl font-bold text-[#153230] mb-6">The Regex Trap</h2>
                            <p className="mb-6">
                                If you've integrated an LLM by parsing its output with regex, you've likely experienced the moment when everything breaks.
                                The model updates, changes a single phrase, and suddenly your carefully crafted parser fails, routing urgent customer issues to the wrong department or missing critical data entirely.
                            </p>

                            <div className="mb-8">
                                <p className="font-bold mb-2">This is not a theoretical problem. <span className="font-normal">Consider this real scenario:</span></p>

                                <p className="mb-4">
                                    <strong>Day 1:</strong> Your customer support classifier works perfectly. A message like "You charged me twice! I want a refund NOW" produces: "The user is very upset about a duplicate charge. This is a billing issue. Sentiment is negative, and it seems urgent." Your regex <code className="bg-gray-100 px-1 rounded">const department = output.match(/billing issue/i) ? 'billing' : 'general';</code> routes it correctly.
                                </p>

                                <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-[#a3cef1]">
                                    <Image
                                        src="/blog-images/schema-outputs/routing-logic.png"
                                        alt="Flow chart showing message routing based on sentiment and intent analysis"
                                        width={1200}
                                        height={600}
                                        className="w-full"
                                    />
                                </div>

                                <p className="mb-4">
                                    <strong>Day 8:</strong> The same input now returns: "This is a payment problem. The customer was double-billed and is demanding a refund." Your parser fails. The ticket is misrouted. Your metrics tank.
                                </p>
                            </div>

                            <p className="mb-6">
                                The root cause is not the model. It is the approach. Unstructured text is designed for humans. Production applications need structured data. The durable solution is to make the model speak JSON and enforce the shape at generation time.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal>
                            <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-12">Understanding Schema-Enforced Outputs</h2>
                            <p className="mb-6">
                                Most modern LLM APIs now support structured outputs. You provide a JSON Schema, and the model is constrained to produce output that matches that schema. This is not a prompt trick. It is an API-level contract for production reliability. OpenAI calls this Structured Outputs and distinguishes it from older JSON mode. JSON mode guarantees valid JSON syntax. Structured Outputs enforces your schema, including required properties and enums. <Link href="https://platform.openai.com/docs/guides/structured-outputs" className="text-[#4D7DA3] hover:underline">OpenAI Platform</Link>
                            </p>
                            <p className="mb-6">
                                Azure’s documentation mirrors this approach and lists the supported subset of JSON Schema. For example, you cannot use an anyOf clause at the very top level of an Azure Policy rule. Design within the published subset for optimal adherence. <Link href="https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/structured-outputs" className="text-[#4D7DA3] hover:underline">Microsoft Learn</Link>
                            </p>
                            <p className="mb-6">
                                If you know GraphQL, the mental model is familiar. Define the shape you need up front, then receive exactly that shape. No parsing. No guesswork.
                            </p>

                            <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-gray-100">
                                <Image
                                    src="/blog-images/schema-outputs/robust-integration.png"
                                    alt="Diagram showing the flow from fragile text output to robust AI features via schema validation"
                                    width={1200}
                                    height={600}
                                    className="w-full"
                                />
                            </div>

                            <ul className="space-y-4 mb-8 text-[#153230]/80">
                                <li>
                                    <strong>OpenAI</strong> calls this Structured Outputs. It enforces your schema, including required properties and enums.
                                </li>
                                <li>
                                    <strong>Anthropic</strong> supports this through tool use with input schemas.
                                </li>
                                <li>
                                    <strong>Azure OpenAI</strong> mirrors this approach with supported JSON Schema subsets.
                                </li>
                            </ul>
                        </ScrollReveal>

                        <ScrollReveal>
                            <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-12">The Four Compounding Benefits</h2>

                            <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-[#333]">
                                <Image
                                    src="/blog-images/schema-outputs/benefits-diagram.png"
                                    alt="Diagram of 4 benefits: Maintainable Codebase, Operational Reliability, Zero Parsing Logic, End-to-End Type Safety"
                                    width={1200}
                                    height={800}
                                    className="w-full"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 my-8">
                                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                    <h3 className="font-bold text-[#4D7DA3] text-xl mb-2">1. Zero Parsing Logic</h3>
                                    <p className="text-sm">Stop scraping paragraphs. The API constrains the model to your keys and types.</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                    <h3 className="font-bold text-[#4D7DA3] text-xl mb-2">2. End-to-End Type Safety</h3>
                                    <p className="text-sm">Define once with Zod, derive TypeScript types, and validate at runtime. TypeScript ends at compile time; Zod closes the runtime gap.</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                    <h3 className="font-bold text-[#4D7DA3] text-xl mb-2">3. Operational Reliability</h3>
                                    <p className="text-sm">Schema adherence reduces retries and format drift. Predictable error handling.</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                    <h3 className="font-bold text-[#4D7DA3] text-xl mb-2">4. Maintainable Codebase</h3>
                                    <p className="text-sm">Every response has the same keys. Dashboards stabilize. Alerts are deterministic.</p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="bg-[#f0f9ff] border-l-4 border-[#4D7DA3] p-6 rounded-r-xl my-12">
                                <h3 className="font-bold text-[#153230] mb-2 text-lg">What Structured Outputs Don't Solve</h3>
                                <p className="mb-4 text-[#153230]/80">
                                    Schema enforcement guarantees shape, not truth. If your schema has a <code className="bg-blue-100 px-1 rounded">companyName</code> field, the model will return a string in that field, but it might be the wrong company name.
                                </p>
                                <p className="text-[#153230]/80">
                                    Think of structured outputs as solving the <strong>format problem</strong> so you can focus on the <strong>accuracy problem</strong>.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-12">Implementation: A Provider-Agnostic Pattern</h2>
                            <p className="mb-6">
                                The pattern below works with any API that accepts a response schema. We'll use TypeScript and Zod as a single source of truth.
                            </p>

                            <div className="my-12">
                                <CodeMorph steps={schemaImplementationSteps} title="Implementing Structured Outputs" />
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-12">Reliability and Resilience</h2>
                            <p className="mb-6">
                                For production, add retry logic with exponential backoff. Even with structured outputs, networks fail and models time out.
                            </p>
                            <div className="bg-[#1e293b] text-gray-100 p-6 rounded-xl overflow-x-auto text-sm font-mono mb-8">
                                <pre>{`async function withRetry<T>(
  operation: () => Promise<T>,
  maxAttempts = 3,
  baseDelayMs = 300
): Promise<T> {
  let lastError: unknown;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        await new Promise(r => setTimeout(r, baseDelayMs * attempt));
      }
    }
  }
  
  throw lastError;
}`}</pre>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-12">Integrating With Modern Data Architectures</h2>
                            <p className="mb-6">
                                For teams using GraphQL, treat the LLM as a typed upstream source.
                            </p>
                            <div className="bg-[#1e293b] text-gray-100 p-6 rounded-xl overflow-x-auto text-sm font-mono mb-6">
                                <pre>{`type Mutation {
  enrichLead(rawInquiry: String!): EnrichedLead!
}

type EnrichedLead {
  companyName: String!
  inquiryType: InquiryType!
  urgency: Urgency!
  potentialValue: DealSize!
}`}</pre>
                            </div>
                            <p className="mb-6">
                                The LLM is no longer a black box. It is a reliable transformer that converts free text into typed graph data.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal>
                            <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-12">Considering a Framework for Scale</h2>
                            <p className="mb-6">
                                While using Zod with a provider's native schema is robust, teams managing numerous LLM integrations may benefit from a higher level of abstraction.
                            </p>
                            <p className="mb-6">
                                Frameworks like <strong>BAML</strong> (Boundary AI Markup Language) allow you to define, version, and test functions separately from application code. This lets you swap providers (e.g., from OpenAI to Anthropic) with configuration changes and provides a workflow for collaboration between engineers and prompt designers.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal>
                            <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-12">Streaming Without Breaking JSON</h2>
                            <p className="mb-6">
                                Streaming feels great in UI, but there's a common trap: <strong>don't parse partial JSON mid-stream.</strong> Instead, accumulate the stream in a buffer and parse once when complete.
                            </p>
                            <div className="bg-[#1e293b] text-gray-100 p-6 rounded-xl overflow-x-auto text-sm font-mono mb-8">
                                <pre>{`let buffer = "";

for await (const chunk of stream) {
  buffer += chunk;
  // Update UI with raw text if needed, but don't parse yet
}

// Parse only after stream completes
const result = SupportTicketSchema.parse(JSON.parse(buffer));`}</pre>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-12">Real-World Business Applications</h2>

                            <div className="mb-8">
                                <h3 className="font-bold text-[#153230] text-lg mb-2">Customer support triage</h3>
                                <p className="mb-6 text-[#153230]/80">
                                    Classify sentiment, department, priority, and confidence. Preload a safe reply. Auto route high confidence results. Queue the rest for human review.
                                </p>

                                <h3 className="font-bold text-[#153230] text-lg mb-2">Lead enrichment</h3>
                                <p className="mb-6 text-[#153230]/80">
                                    Transform free text into company name, intent, urgency, and potential value. Feed clean fields into your CRM.
                                </p>

                                <h3 className="font-bold text-[#153230] text-lg mb-2">Document processing</h3>
                                <p className="mb-6 text-[#153230]/80">
                                    Take OCR output from PDFs or emails and transform it into database-ready records using a schema that matches your tables.
                                </p>
                            </div>

                            <div className="my-12 rounded-xl overflow-hidden shadow-lg border border-gray-100">
                                <Image
                                    src="/blog-images/schema-outputs/business-comparison.png"
                                    alt="Comparison table of Customer Support, Lead Enrichment, and Document Processing workflows"
                                    width={1200}
                                    height={800}
                                    className="w-full"
                                />
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-12">Production Best Practices</h2>
                            <ul className="list-disc list-inside text-[#153230]/80 space-y-4 mb-8">
                                <li>
                                    <strong>Constrain branching fields with enums.</strong> Do not accept free text for routing. Design within the published schema subset for better adherence.
                                </li>
                                <li>
                                    <strong>Add short, specific .describe() texts.</strong> Providers use these descriptions as guidance for generation.
                                </li>
                                <li>
                                    <strong>Keep schemas relatively flat.</strong> Deep nesting detects adherence. Start simple and add nesting only when it clearly helps.
                                </li>
                                <li>
                                    <strong>Validate at runtime with Zod.</strong> Even when the API enforces your schema, <code>.parse()</code> yields safe objects or actionable errors.
                                </li>
                                <li>
                                    <strong>Include a confidence score.</strong> Gate automation by threshold.
                                </li>
                                <li>
                                    <strong>Version your schemas.</strong> Add <code>schemaVersion</code> and migrate intentionally.
                                </li>
                            </ul>
                        </ScrollReveal>

                        <ScrollReveal>
                            <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-12">Security Considerations</h2>
                            <p className="mb-6">
                                Structured outputs don't eliminate prompt injection risks, they just make the attack surface different.
                            </p>
                            <ul className="list-disc list-inside text-[#153230]/80 space-y-2 mb-8">
                                <li><strong>Delimit user input tightly:</strong> Use triple quotes or XML tags.</li>
                                <li><strong>Repeat constraints:</strong> Place critical instructions <em>after</em> user content.</li>
                                <li><strong>Detect PII:</strong> Add PII detection fields to your schema and redact before logging.</li>
                            </ul>
                        </ScrollReveal>

                        <ScrollReveal>
                            <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-12">A Minimal, Repeatable Micro-Benchmark</h2>
                            <p className="mb-6">
                                Invite your team to measure rather than guess.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-3">
                                    <span className="font-bold text-[#4D7DA3]">Task:</span>
                                    <span>Classify 100 real tickets into your schema.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-[#4D7DA3]">Metrics:</span>
                                    <span>Schema valid rate using Zod, average latency, tokens, and manual spot check accuracy.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-[#4D7DA3] whitespace-nowrap">Goal:</span>
                                    <span>Prove that schema enforcement gives you a higher valid rate and fewer retries than prose parsing.</span>
                                </li>
                            </ul>
                        </ScrollReveal>

                        <ScrollReveal>
                            <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-12">Complete Working Example</h2>
                            <div className="bg-[#1e293b] text-gray-100 p-6 rounded-xl overflow-x-auto text-sm font-mono mb-12">
                                <pre>{`// npm install zod openai

import { z } from "zod";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";

// 1. Define schema with clear descriptions
const ProductReviewSchema = z.object({
  rating: z.number().min(1).max(5)
    .describe("Star rating from 1 to 5"),
  pros: z.array(z.string())
    .describe("Positive aspects mentioned by reviewer"),
  cons: z.array(z.string())
    .describe("Negative aspects mentioned by reviewer"),
  wouldRecommend: z.boolean()
    .describe("Whether reviewer would recommend this product"),
  summary: z.string().max(200)
    .describe("Brief summary suitable for UI display")
});

type ProductReview = z.infer<typeof ProductReviewSchema>;

// 2. Create typed API function
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function analyzeReview(reviewText: string): Promise<ProductReview> {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-11-20",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: "Extract structured insights from product reviews. Be concise and accurate."
      },
      { role: "user", content: reviewText }
    ],
    response_format: zodResponseFormat(ProductReviewSchema, "product_review")
  });

  const result = completion.choices[0]?.message?.parsed;
  if (!result) {
    throw new Error("Failed to parse response");
  }
  
  return ProductReviewSchema.parse(result);
}`}</pre>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-12">Moving Forward</h2>
                            <p className="mb-6">
                                Structured JSON output turns LLM integration from fragile text parsing into reliable, typed data processing. It reduces incidents, improves maintainability, and makes AI features feel native to your application.
                            </p>
                            <p className="font-medium text-lg text-[#4D7DA3]">
                                Start with your most brittle endpoint. Replace prose parsing with schema enforcement. Let the numbers guide your rollout.
                            </p>
                        </ScrollReveal>
                    </>
                )
            }}
        />
    );
}
