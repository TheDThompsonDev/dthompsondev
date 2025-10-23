'use client';

import { ScrollProgress } from '@/components/ScrollProgress';
import { InteractiveCode } from '@/components/InteractiveCode';
import { AnimatedDiagram } from '@/components/AnimatedDiagram';
import { ScrollReveal } from '@/components/ScrollReveal';
import { VirtualWhiteboard } from '@/components/VirtualWhiteboard';
import { CodeMorph } from '@/components/CodeMorph';
import { FloatingTOC } from '@/components/FloatingTOC';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ReactHooksVisualizedPost() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const stateEvolutionSteps = [
    {
      title: 'Start with a Simple Variable',
      description: 'In traditional JavaScript, we might use a variable to track state. But this doesn\'t cause re-renders in React.',
      code: `let count = 0;

function increment() {
  count = count + 1;
  console.log(count);
}`,
      highlights: [1],
    },
    {
      title: 'Add useState Hook',
      description: 'React\'s useState Hook provides both the state value and a setter function. This triggers re-renders when state changes.',
      code: `const [count, setCount] = useState(0);

function increment() {
  setCount(count + 1);
  console.log(count);
}`,
      highlights: [1, 4],
    },
    {
      title: 'Use Functional Updates',
      description: 'For more reliable updates, especially with multiple rapid changes, use the functional form that receives the previous state.',
      code: `const [count, setCount] = useState(0);

function increment() {
  setCount(prevCount => prevCount + 1);
  console.log(count);
}`,
      highlights: [4],
    },
    {
      title: 'Add Multiple State Variables',
      description: 'You can call useState multiple times in a component to manage different pieces of state independently.',
      code: `const [count, setCount] = useState(0);
const [isActive, setIsActive] = useState(false);

function increment() {
  setCount(prevCount => prevCount + 1);
  setIsActive(true);
}`,
      highlights: [1, 2, 6],
    },
  ];

  const tocItems = [
    { id: 'what-are-hooks', title: 'What are Hooks?', level: 1 },
    { id: 'usestate', title: 'useState: Managing State', level: 1 },
    { id: 'state-evolution', title: 'Evolution of State Management', level: 2 },
    { id: 'useeffect', title: 'useEffect: Side Effects', level: 1 },
    { id: 'rules-of-hooks', title: 'Rules of Hooks', level: 1 },
    { id: 'custom-hooks', title: 'Custom Hooks', level: 1 },
    { id: 'key-takeaways', title: 'Key Takeaways', level: 1 },
  ];

  const useStateExamples = [
    {
      title: 'Basic Counter',
      code: `const [count, setCount] = useState(0);

return (
  <button onClick={() => setCount(count + 1)}>
    Clicked {count} times
  </button>
);`,
      explanation: 'useState returns a stateful value and a function to update it. The component re-renders whenever the state changes.',
      color: '#4D7DA3',
    },
    {
      title: 'With Objects',
      code: `const [user, setUser] = useState({
  name: 'Danny',
  age: 25
});

const updateName = () => {
  setUser({ ...user, name: 'New Name' });
};`,
      explanation: 'When updating objects, always spread the previous state to maintain other properties. This ensures you don\'t lose data.',
      color: '#84803E',
    },
    {
      title: 'Functional Updates',
      code: `const [count, setCount] = useState(0);

const increment = () => {
  setCount(prev => prev + 1);
};

// Multiple updates work correctly
increment();
increment();
increment();`,
      explanation: 'Use functional updates when the new state depends on the previous state. This ensures accuracy with multiple rapid updates.',
      color: '#10B981',
    },
  ];

  const useEffectSteps = [
    {
      title: 'Component Mounts',
      description: 'When the component first appears on screen, useEffect runs for the first time.',
      color: '#4D7DA3',
      icon: '🚀',
    },
    {
      title: 'Dependencies Change',
      description: 'If any dependency in the array changes, useEffect runs again to sync with the new values.',
      color: '#84803E',
      icon: '🔄',
    },
    {
      title: 'Cleanup Function',
      description: 'Before re-running or unmounting, the cleanup function (if provided) runs to prevent memory leaks.',
      color: '#F59E0B',
      icon: '🧹',
    },
    {
      title: 'Component Unmounts',
      description: 'When the component is removed from the screen, the cleanup function runs one final time.',
      color: '#8B5CF6',
      icon: '👋',
    },
  ];

  const hookRulesSteps = [
    {
      title: 'Only Call at Top Level',
      description: 'Don\'t call Hooks inside loops, conditions, or nested functions. Keep them at the top of your component.',
      color: '#EF4444',
      icon: '⚠️',
    },
    {
      title: 'Only Call from React Functions',
      description: 'Call Hooks from React function components or custom Hooks, not regular JavaScript functions.',
      color: '#F59E0B',
      icon: '✅',
    },
    {
      title: 'Custom Hooks Start with "use"',
      description: 'If you extract Hook logic, name it starting with "use" so linters can detect issues automatically.',
      color: '#10B981',
      icon: '🎣',
    },
  ];

  return (
  <>
    <ScrollProgress />
    <FloatingTOC items={tocItems} />
      
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
                title="Take Notes while you read!"
                height={400}
              />

              <ScrollReveal delay={200}>
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-[#4D7DA3]">
                      React
                    </span>
                    <span className="text-[#153230]/60 text-sm">March 15, 2025 • 12 min read</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl font-bold text-[#153230] leading-[1.1] mb-6">
                    React Hooks,<br />
                    <span className="text-[#4D7DA3]">Visualized</span>
                  </h1>
                  
                  <p className="text-xl text-[#153230]/70 leading-relaxed">
                    Hooks fundamentally changed how we write React components. Let's explore how they work through interactive examples and visual diagrams.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold text-[#153230] mb-4 mt-12">
                    What are Hooks?
                  </h2>
                  <p className="text-[#153230]/80 leading-relaxed mb-6">
                    Hooks are functions that let you "hook into" React state and lifecycle features from function components. Before Hooks, you could only use state and lifecycle methods in class components. Now, you can use them in function components too!
                  </p>
                  
                  <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-[#4D7DA3] my-8">
                    <p className="text-[#153230] font-semibold mb-2 flex items-center gap-2">
                      <span className="text-2xl">💡</span>
                      <span>Key Insight</span>
                    </p>
                    <p className="text-[#153230]/80 leading-relaxed">
                      Hooks don't work inside classes — they let you use React without classes. You can think of them as a way to "hook into" React's internal mechanisms.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16">
                  useState: Managing State
                </h2>
                <p className="text-[#153230]/80 leading-relaxed mb-8">
                  The useState Hook lets you add state to function components. It's the most commonly used Hook and forms the foundation of interactive React applications.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="border border-gray-200 rounded-2xl shadow-lg p-8 my-8 bg-white">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Try it yourself</h3>
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <button
                      onClick={() => setCount(count + 1)}
                      className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-gray-800 transition-all"
                    >
                      Click me
                    </button>
                    <div className="text-4xl font-bold text-gray-900 tabular-nums">
                      {count} {count === 1 ? 'click' : 'clicks'}
                    </div>
                    <button
                      onClick={() => setCount(0)}
                      className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={400}>
                <CodeMorph steps={stateEvolutionSteps} title="Evolution of State Management" />
              </ScrollReveal>


              <ScrollReveal delay={800}>
                <InteractiveCode examples={useStateExamples} title="useState Patterns" />
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16">
                  useEffect: Side Effects
                </h2>
                <p className="text-[#153230]/80 leading-relaxed mb-8">
                  The useEffect Hook lets you perform side effects in function components. Think of it as componentDidMount, componentDidUpdate, and componentWillUnmount combined, but with a cleaner API.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={700}>
                <AnimatedDiagram 
                  title="The useEffect Lifecycle"
                  steps={useEffectSteps}
                  
                />
              </ScrollReveal>

              <ScrollReveal delay={700}>
                <div className="my-12">
                  <h3 className="text-2xl font-bold text-[#153230] mb-6">
                    Common useEffect Patterns
                  </h3>
                  
                  <div className="space-y-8">
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-lg bg-blue-500"></div>
                        <h4 className="text-sm font-semibold text-gray-700">Running Once (On Mount)</h4>
                      </div>
                      <div className="p-6">
                        <pre className="bg-[#0d1117] text-gray-100 p-6 rounded-lg overflow-x-auto text-sm border border-gray-800">
                          <code>{`useEffect(() => {
  console.log('Component mounted!');
  // Fetch data, set up subscriptions, etc.
}, []); // Empty array = run once`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-lg bg-amber-500"></div>
                        <h4 className="text-sm font-semibold text-gray-700">Running on Specific Changes</h4>
                      </div>
                      <div className="p-6">
                        <pre className="bg-[#0d1117] text-gray-100 p-6 rounded-lg overflow-x-auto text-sm border border-gray-800">
                          <code>{`useEffect(() => {
  console.log(\`Count changed to \${count}\`);
  // React to count changes
}, [count]); // Runs when count changes`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-lg bg-emerald-500"></div>
                        <h4 className="text-sm font-semibold text-gray-700">Cleanup Function</h4>
                      </div>
                      <div className="p-6">
                        <pre className="bg-[#0d1117] text-gray-100 p-6 rounded-lg overflow-x-auto text-sm border border-gray-800">
                          <code>{`useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  return () => clearInterval(timer);
}, []); // Cleanup when unmounting`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={1000}>
                <div className="border border-gray-200 rounded-2xl shadow-lg p-8 my-12 bg-white">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Interactive Example</h3>
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => setIsVisible(!isVisible)}
                      className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-gray-800 transition-all"
                    >
                      {isVisible ? 'Hide' : 'Show'} Component
                    </button>
                    {isVisible && (
                      <div className="bg-blue-50 border-2 border-blue-200 p-8 rounded-xl text-center animate-[fadeIn_0.5s_ease-in-out]">
                        <p className="text-xl font-semibold text-gray-900">
                          Component is mounted! Check the console for lifecycle messages.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={1100}>
                <AnimatedDiagram 
                  title="Rules of Hooks"
                  steps={hookRulesSteps}
                  
                />
              </ScrollReveal>

              <ScrollReveal delay={1100}>
                <div className="my-12">
                  <h2 className="text-3xl font-bold text-[#153230] mb-6">
                    Custom Hooks: Reusable Logic
                  </h2>
                  <p className="text-[#153230]/80 leading-relaxed mb-6">
                    Custom Hooks let you extract component logic into reusable functions. They're just JavaScript functions that can call other Hooks.
                  </p>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-lg bg-purple-500"></div>
                      <h4 className="text-sm font-semibold text-gray-700">Example: useLocalStorage Hook</h4>
                    </div>
                    <div className="p-6">
                      <pre className="bg-[#0d1117] text-gray-100 p-6 rounded-lg overflow-x-auto text-sm border border-gray-800">
                        <code>{`function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', 'Guest');
  
  return (
    <input 
      value={name}
      onChange={e => setName(e.target.value)}
    />
  );
}`}</code>
                      </pre>
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
                      <span>Hooks let you use state and other React features without writing a class</span>
                    </li>
                    <li className="flex items-start gap-4 text-gray-700 leading-relaxed">
                      <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-lg bg-purple-600"></div>
                      </div>
                      <span>useState manages local component state with a simple, functional API</span>
                    </li>
                    <li className="flex items-start gap-4 text-gray-700 leading-relaxed">
                      <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-lg bg-amber-600"></div>
                      </div>
                      <span>useEffect handles side effects and replaces lifecycle methods</span>
                    </li>
                    <li className="flex items-start gap-4 text-gray-700 leading-relaxed">
                      <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-lg bg-emerald-600"></div>
                      </div>
                      <span>Custom Hooks let you extract and reuse stateful logic across components</span>
                    </li>
                    <li className="flex items-start gap-4 text-gray-700 leading-relaxed">
                      <div className="w-6 h-6 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-lg bg-pink-600"></div>
                      </div>
                      <span>Always follow the Rules of Hooks to avoid bugs and issues</span>
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