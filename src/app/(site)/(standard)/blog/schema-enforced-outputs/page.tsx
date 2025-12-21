'use client';

import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import Link from 'next/link';

export default function SchemaEnforcedOutputsPost() {
    return (
        <BlogPostLayout
            category="AI Engineering"
            date="December 13, 2025"
            readTime="8 min read"
            title={<>Understanding Schema-Enforced<br /><span className="text-[#4D7DA3]">Outputs</span></>}
            subtitle="If you've integrated an LLM by parsing its prose output with regex, you've likely experienced the moment when everything breaks. It's time to make the model speak JSON."
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
                        <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-12">The Broken Parser Problem</h2>
                        <p className="mb-6">
                            The model updates, changes a single phrase, and suddenly your carefully crafted parser fails routing urgent customer issues to the wrong department or missing critical data entirely.
                        </p>

                        <div className="bg-red-50 rounded-2xl p-6 border-l-4 border-red-500 my-8">
                            <p className="font-bold text-red-700 mb-2">This isn't a theoretical problem.</p>
                            <p className="text-red-800/80">
                                Day 1: "You charged me twice!" -&gt; Routes correctly.<br />
                                Day 8: "This is a payment problem." -&gt; Parser fails. Ticket misrouted.
                            </p>
                        </div>

                        <p className="mb-6">
                            The root cause isn't the model,it's the approach. Unstructured text is designed for humans; production applications need structured data. The durable solution is to make the model speak JSON and enforce the shape at generation time.
                        </p>

                        <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-12">Understanding Schema-Enforced Outputs</h2>
                        <p className="mb-6">
                            Most modern LLM APIs now support structured outputs: you provide a JSON Schema, and the model is constrained to produce output matching that schema. This isn't a prompt engineering trick,it's an API-level contract designed for production reliability.
                        </p>
                        <p className="mb-6">
                            OpenAI describes this as "Structured Outputs," ensuring responses exactly match a developer-supplied JSON Schema. Use tools like Zod to define the data shape you need upfront, and receive exactly that shape back,no parsing, no guesswork.
                        </p>

                        <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-12">The Four Compounding Benefits</h2>
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

                        <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-12">Implementation: A Provider-Agnostic Pattern</h2>
                        <p className="mb-6">
                            We'll use TypeScript and Zod for a single source of truth that provides types, runtime validation, and schema generation.
                        </p>

                        <h3 className="text-2xl font-bold text-[#153230] mb-4 mt-8">Step 1: Define Your Schema</h3>
                        <div className="bg-[#1e293b] text-gray-100 p-6 rounded-xl overflow-x-auto text-sm my-6 font-mono">
                            <pre>{`import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const SupportTicketSchema = z.object({
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
    .describe("Model's confidence in this classification (0-1)"),
  
  suggestedReply: z.string().min(1)
    .describe("Professional, actionable response for the customer")
});

export type SupportTicket = z.infer<typeof SupportTicketSchema>;
export const SupportJSONSchema = zodToJsonSchema(SupportTicketSchema);`}</pre>
                        </div>

                        <h3 className="text-2xl font-bold text-[#153230] mb-4 mt-8">Step 2: Configure Your LLM Call</h3>
                        <div className="bg-[#1e293b] text-gray-100 p-6 rounded-xl overflow-x-auto text-sm my-6 font-mono">
                            <pre>{`import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function classifyMessage(message: string): Promise<SupportTicket> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-2024-08-06",
    messages: [
      { 
        role: "system", 
        content: "Classify customer support messages and suggest appropriate replies. Return structured JSON only." 
      },
      { role: "user", content: message }
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "support_ticket_classification",
        schema: SupportJSONSchema
      }
    }
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error('No response from model');

  // Two-step validation
  const parsedData = JSON.parse(content);
  return SupportTicketSchema.parse(parsedData);
}`}</pre>
                        </div>

                        <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-12">Integrating with Modern Data Architectures</h2>
                        <p className="mb-6">
                            For teams using GraphQL, the LLM becomes a reliable transformation layer. Instead of a black box, it's a typed data source that populates your graph.
                        </p>

                        <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-12">Real-World Business Applications</h2>
                        <ul className="space-y-4 mb-8">
                            <li className="flex gap-3">
                                <span className="font-bold text-[#4D7DA3]">Customer Support Triage:</span>
                                <span>Automatically classify and route messages without brittle logic.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-[#4D7DA3]">Invoice Parsing:</span>
                                <span>Extract dates, amounts, and tax IDs from PDFs with high reliability.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-[#4D7DA3]">Data Normalization:</span>
                                <span>Turn messy user input into standardized database records.</span>
                            </li>
                        </ul>
                    </>
                )
            }}
        />
    );
}
