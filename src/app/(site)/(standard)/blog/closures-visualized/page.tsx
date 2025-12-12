'use client';

import { ScrollProgress } from '@/components/ScrollProgress';
import { InteractiveCode } from '@/components/InteractiveCode';
import { AnimatedDiagram } from '@/components/AnimatedDiagram';
import { ScrollReveal } from '@/components/ScrollReveal';
import { VirtualWhiteboard } from '@/components/VirtualWhiteboard';
import { CodeMorph } from '@/components/CodeMorph';
import { CodePlayground } from '@/components/CodePlayground';
import Link from 'next/link';
import { useState } from 'react';

export default function ClosuresVisualizedPost() {
  const [counter, setCounter] = useState(0);
  const [privateValue, setPrivateValue] = useState(42);

  const createCounter = () => {
    let count = 0;
    return {
      increment: () => ++count,
      decrement: () => --count,
      getCount: () => count
    };
  };

  const closureEvolution = [
    {
      title: 'Regular Function',
      description: 'Start with a regular function that has a local variable. Once the function completes, the variable is gone.',
      code: `function greet() {
  const message = 'Hello';
  console.log(message);
}

greet(); // Logs: "Hello"
// message is destroyed after function returns`,
      highlights: [2],
    },
    {
      title: 'Return Inner Function',
      description: 'Now we return an inner function from the outer function. The inner function is defined but not yet executing.',
      code: `function greet() {
  const message = 'Hello';
  
  return function() {
    console.log(message);
  };
}

const sayHello = greet();`,
      highlights: [4, 5, 6],
    },
    {
      title: 'Execute the Closure',
      description: 'When we call the returned function, it still has access to the message variable, even though greet() has finished! This is the closure.',
      code: `function greet() {
  const message = 'Hello';
  
  return function() {
    console.log(message); // Still accessible!
  };
}

const sayHello = greet();
sayHello(); // Logs: "Hello"`,
      highlights: [5, 10],
    },
    {
      title: 'Multiple Closures',
      description: 'Each call to the outer function creates a new closure with its own private variables. They don\'t interfere with each other.',
      code: `function greet(name) {
  const message = \`Hello, \${name}\`;
  
  return function() {
    console.log(message);
  };
}

const greetDanny = greet('Danny');
const greetSarah = greet('Sarah');

greetDanny(); // "Hello, Danny"
greetSarah(); // "Hello, Sarah"`,
      highlights: [1, 2, 9, 10],
    },
  ];

  const closureExamples = [
    {
      title: 'Basic Closure',
      code: `function outer() {
  const message = 'Hello';
  
  function inner() {
    console.log(message); // Access outer's variable
  }
  
  return inner;
}

const myFunc = outer();
myFunc(); // Logs: "Hello"`,
      explanation: 'A closure is created when an inner function has access to variables from its outer function, even after the outer function has returned.',
      color: '#4D7DA3',
    },
    {
      title: 'Private Variables',
      code: `function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.getCount()); // 0
counter.increment();
console.log(counter.getCount()); // 1`,
      explanation: 'Closures enable data privacy by keeping variables accessible only through specific functions. The count variable is truly private.',
      color: '#84803E',
    },
    {
      title: 'Function Factory',
      code: `function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15`,
      explanation: 'Each closure maintains its own reference to the factor variable, creating specialized functions with different behaviors.',
      color: '#10B981',
    },
  ];

  const closureLifecycle = [
    {
      title: 'Function Declared',
      description: 'When a function is declared, it creates a scope that can hold variables. This is where potential closures begin.',
      color: '#4D7DA3',
      icon: '📦',
    },
    {
      title: 'Inner Function Created',
      description: 'An inner function is defined inside the outer function. It can "see" all variables from its parent scope.',
      color: '#84803E',
      icon: '👁️',
    },
    {
      title: 'Function Returned',
      description: 'The outer function returns the inner function. Now the inner function carries its scope chain with it.',
      color: '#F59E0B',
      icon: '🎁',
    },
    {
      title: 'Closure Persists',
      description: 'Even after the outer function completes, the inner function maintains access to the outer variables. This is the closure!',
      color: '#8B5CF6',
      icon: '✨',
    },
  ];

  const commonPatterns = [
    {
      title: 'Event Handlers',
      description: 'Closures are commonly used in event handlers to maintain access to component state and props.',
      color: '#EF4444',
      icon: '🖱️',
    },
    {
      title: 'Module Pattern',
      description: 'Create private methods and variables while exposing a public API using the module pattern with closures.',
      color: '#3B82F6',
      icon: '🏗️',
    },
    {
      title: 'Callbacks & Async',
      description: 'Closures preserve the context when functions are called asynchronously, like in setTimeout or API calls.',
      color: '#10B981',
      icon: '⏱️',
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
                title="Visualize Closures & Take Notes"
                height={400}
              />

              <ScrollReveal delay={400}>
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-[#84803E]">
                      JavaScript
                    </span>
                    <span className="text-[#153230]/60 text-sm">March 18, 2025 • 10 min read</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl font-bold text-[#153230] leading-[1.1] mb-6">
                    Understanding Closures<br />
                    <span className="text-[#84803E]">Through Animation</span>
                  </h1>
                  
                  <p className="text-xl text-[#153230]/70 leading-relaxed">
                    Closures are one of JavaScript's most powerful features, yet they often confuse developers. Let's demystify them with interactive examples and visual explanations.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold text-[#153230] mb-4 mt-12">
                    What is a Closure?
                  </h2>
                  <p className="text-[#153230]/80 leading-relaxed mb-6">
                    A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In simpler terms: a closure gives you access to an outer function's scope from an inner function.
                  </p>
                  
                  <div className="bg-amber-50 rounded-2xl p-6 border-l-4 border-[#84803E] my-8">
                    <p className="text-[#153230] font-semibold mb-2 flex items-center gap-2">
                      <span className="text-2xl">💡</span>
                      <span>The Magic Moment</span>
                    </p>
                    <p className="text-[#153230]/80 leading-relaxed">
                      The magic happens when the inner function "remembers" variables from the outer function, even after the outer function has finished executing. This is the essence of closures!
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16">
                  See It In Action
                </h2>
                <p className="text-[#153230]/80 leading-relaxed mb-8">
                  Let's visualize how closures work with an interactive counter. Notice how the count persists between function calls.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="border border-gray-200 rounded-2xl shadow-lg p-8 my-8 bg-white">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Interactive Closure Demo</h3>
                  <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                    <pre className="text-sm font-mono overflow-x-auto text-gray-800">
                      <code>{`function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}`}</code>
                    </pre>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <button
                      onClick={() => setCounter(counter + 1)}
                      className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-gray-800 transition-all"
                    >
                      Increment
                    </button>
                    <div className="text-5xl font-bold text-gray-900 tabular-nums">
                      {counter}
                    </div>
                    <button
                      onClick={() => setCounter(counter - 1)}
                      className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-gray-800 transition-all"
                    >
                      Decrement
                    </button>
                  </div>
                  <p className="text-center mt-6 text-gray-600 text-sm">
                    The count value is "closed over" and persists between clicks!
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <CodeMorph steps={closureEvolution} title="Understanding Closures: Step by Step" />
              </ScrollReveal>

              <ScrollReveal delay={800}>
                <InteractiveCode examples={closureExamples} title="Closure Patterns" />
              </ScrollReveal>

              <ScrollReveal delay={600}>
                <AnimatedDiagram 
                  title="How Closures Work: The Journey"
                  steps={closureLifecycle}
                  
                />
              </ScrollReveal>

              <ScrollReveal delay={700}>
                <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16">
                  The Scope Chain
                </h2>
                <p className="text-[#153230]/80 leading-relaxed mb-8">
                  Understanding closures requires understanding the scope chain. Every function has access to variables in its own scope, its parent's scope, and all the way up to the global scope.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={800}>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#4D7DA3]/10 my-12">
                  <div className="bg-[#4D7DA3] text-white px-6 py-4 font-bold text-xl">
                    Visualizing the Scope Chain
                  </div>
                  <div className="p-8">
                    <div className="space-y-4">
                      <div className="bg-[#EF4444]/10 border-2 border-[#EF4444] rounded-xl p-6">
                        <p className="font-bold text-[#EF4444] mb-2">Global Scope</p>
                        <code className="text-sm text-[#153230]/70">const globalVar = "I'm global";</code>
                        
                        <div className="mt-4 ml-6 bg-[#F59E0B]/10 border-2 border-[#F59E0B] rounded-xl p-6">
                          <p className="font-bold text-[#F59E0B] mb-2">Outer Function Scope</p>
                          <code className="text-sm text-[#153230]/70">const outerVar = "I'm outer";</code>
                          
                          <div className="mt-4 ml-6 bg-[#10B981]/10 border-2 border-[#10B981] rounded-xl p-6">
                            <p className="font-bold text-[#10B981] mb-2">Inner Function Scope (The Closure!)</p>
                            <code className="text-sm text-[#153230]/70">
                              const innerVar = "I'm inner";<br/>
                              // Can access: innerVar, outerVar, globalVar
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={900}>
                <AnimatedDiagram 
                  title="Common Closure Use Cases"
                  steps={commonPatterns}
                  
                />
              </ScrollReveal>

              <ScrollReveal delay={1000}>
                <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16">
                  The Classic Loop Problem
                </h2>
                <p className="text-[#153230]/80 leading-relaxed mb-8">
                  One of the most famous closure gotchas involves loops. Let's see why this happens and how to fix it.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={1100}>
                <div className="grid md:grid-cols-2 gap-6 my-12">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-lg bg-red-500"></div>
                      <h4 className="text-sm font-semibold text-gray-700">Common Mistake</h4>
                    </div>
                    <div className="p-6">
                      <pre className="bg-[#0d1117] text-gray-100 p-6 rounded-lg overflow-x-auto text-sm border border-gray-800">
                        <code>{`for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}
// Logs: 3, 3, 3`}</code>
                      </pre>
                      <p className="mt-4 text-sm text-[#153230]/70">
                        All callbacks share the same variable reference!
                      </p>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-lg bg-emerald-500"></div>
                      <h4 className="text-sm font-semibold text-gray-700">Solution with Closure</h4>
                    </div>
                    <div className="p-6">
                      <pre className="bg-[#0d1117] text-gray-100 p-6 rounded-lg overflow-x-auto text-sm border border-gray-800">
                        <code>{`for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}
// Logs: 0, 1, 2`}</code>
                      </pre>
                      <p className="mt-4 text-sm text-[#153230]/70">
                        'let' creates a new binding for each iteration!
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={1100}>
                <div className="my-12">
                  <h2 className="text-3xl font-bold text-[#153230] mb-6">
                    Practical Example: Data Privacy
                  </h2>
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#4D7DA3]/10">
                    <div className="bg-[#8B5CF6] text-white px-6 py-4 font-bold">
                      Building a Private Counter Module
                    </div>
                    <div className="p-6">
                      <pre className="bg-[#1e293b] text-white p-4 rounded-lg overflow-x-auto text-sm mb-6">
                        <code>{`const SecureCounter = (function() {
  let privateValue = 0; // Truly private
  
  return {
    increment() {
      privateValue++;
      console.log('Value:', privateValue);
    },
    decrement() {
      privateValue--;
      console.log('Value:', privateValue);
    },
    reset() {
      privateValue = 0;
      console.log('Reset!');
    }
  };
})();

// privateValue is not accessible from outside
// Only through the public methods!`}</code>
                      </pre>
                      
                      <div className="flex gap-4 flex-wrap">
                        <button
                          onClick={() => setPrivateValue(privateValue + 1)}
                          className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
                        >
                          Increment
                        </button>
                        <button
                          onClick={() => setPrivateValue(privateValue - 1)}
                          className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
                        >
                          Decrement
                        </button>
                        <button
                          onClick={() => setPrivateValue(0)}
                          className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all"
                        >
                          Reset
                        </button>
                        <div className="flex items-center px-6 py-3 bg-gray-100 rounded-lg font-bold text-gray-900 text-xl border border-gray-200">
                          Value: {privateValue}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={1300}>
                <div className="border-2 border-gray-900 rounded-2xl p-8 my-16 bg-white">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 tracking-tight">Key Takeaways</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4 text-gray-700 leading-relaxed">
                      <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-lg bg-blue-600"></div>
                      </div>
                      <span>Closures provide data privacy by creating private variables and methods</span>
                    </li>
                    <li className="flex items-start gap-4 text-gray-700 leading-relaxed">
                      <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-lg bg-purple-600"></div>
                      </div>
                      <span>Inner functions remember their lexical scope even after outer functions return</span>
                    </li>
                    <li className="flex items-start gap-4 text-gray-700 leading-relaxed">
                      <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-lg bg-amber-600"></div>
                      </div>
                      <span>Use closures to create function factories with customized behavior</span>
                    </li>
                    <li className="flex items-start gap-4 text-gray-700 leading-relaxed">
                      <div className="w-6 h-6 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-lg bg-red-600"></div>
                      </div>
                      <span>Be careful with closures in loops - use 'let' instead of 'var'</span>
                    </li>
                    <li className="flex items-start gap-4 text-gray-700 leading-relaxed">
                      <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-lg bg-emerald-600"></div>
                      </div>
                      <span>Closures are fundamental to callbacks, event handlers, and async code</span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={1400}>
                <div className="mt-16 pt-8 border-t border-[#4D7DA3]/20">
                  <div className="flex items-center justify-between">
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
                  © 2025 DTHOMPSONDEV. All rights reserved.
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