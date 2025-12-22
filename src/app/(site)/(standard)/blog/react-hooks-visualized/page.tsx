'use client';

import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import { InteractiveCode } from '@/components/InteractiveCode';
import { CodeMorph } from '@/components/CodeMorph';
import { FloatingTOC } from '@/components/FloatingTOC';
import {
  XCircle, CheckCircle2, ArrowDown, RefreshCw,
  Settings, Database, Zap, Layers
} from 'lucide-react';

export default function ReactHooksVisualizedPost() {
  // Data for CodeMorph (Array Model)
  const stateEvolutionSteps = [
    {
      title: 'The Golden Rule',
      description: 'The first hook is always Index 0. The second is Index 1. The order must never change.',
      code: `function Form() {
  const [name, setName] = useState(''); // Index 0
  const [age, setAge] = useState(0);    // Index 1
}`,
      highlights: [2, 3],
    },
    {
      title: 'The Conditional Trap',
      description: 'If you wrap a hook in a condition, you risk breaking the chain.',
      code: `function Form({ showEmail }) {
  const [name, setName] = useState(''); // Index 0

  if (showEmail) {
    //  If this runs, it takes Index 1
    const [email, setEmail] = useState(''); 
  }

  const [age, setAge] = useState(0); // Index 1 or 2 Chaos.
}`,
      highlights: [4, 5, 8],
    },
    {
      title: 'The Crash',
      description: 'React tries to assign "Age" (number) to "Email" (string) slot. The app crashes.',
      code: `// Reacts Internal Clipboard
[
  "John", // Index 0
  25 // Index 1 - Wait, this was email!
]
// Error: Rendered fewer hooks than expected.`,
      highlights: [4, 5],
    },
  ];

  const tocItems = [
    { id: 'array-model', title: '1. The Array Model', level: 1 },
    { id: 'stale-closures', title: '2. Stale Closures', level: 1 },
    { id: 'synchronization', title: '3. Synchronization', level: 1 },
    { id: 'useref-pocket', title: '4. useRef Secret Pocket', level: 1 },
    { id: 'performance-myth', title: '5. The Performance Myth', level: 1 },
    { id: 'context-cost', title: '6. The Cost of Context', level: 1 },
  ];

  const staleClosureExamples = [
    {
      title: 'THE BUG: Stale closure',
      code: `function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // If count is 0 when this function runs, 
    // it effectively captures "0" forever in this scope.
    setTimeout(() => {
      setCount(count + 1);  // Always sets to 0 + 1 = 1
    }, 1000);
  };

  return <button onClick={handleClick}>Add after 1s</button>;
}`,
      explanation: 'When you clicked that button, the function "captured" the state *at that specific moment in time*. It’s like taking a photograph.',
      color: '#EF4444',
    },
    {
      title: 'THE FIX: Functional updates',
      code: `const handleClick = () => {
  setTimeout(() => {
    // Tell React HOW to update it, not WHAT to set it to.
    setCount(prev => prev + 1);  // Always uses the LATEST value
  }, 1000);
};`,
      explanation: 'Functional updates bypass the closure and ask React for the current value in the latest frame.',
      color: '#10B981',
    },
  ];

  const useEffectSteps = [
    {
      title: 'Mount (Run Effect)',
      description: 'React paints the screen, then runs your effect to synchronize with the outside world.',
      color: '#4D7DA3',
      icon: <ArrowDown className="w-6 h-6" />,
    },
    {
      title: 'Unmount (Cleanup)',
      description: 'Strict Mode: React immediately unmounts to check if you provided a cleanup function.',
      color: '#F59E0B',
      icon: <CheckCircle2 className="w-6 h-6" />,
    },
    {
      title: 'Remount (Run Again)',
      description: 'React mounts again. If your API call fires twice, it is testing your resilience.',
      color: '#10B981',
      icon: <RefreshCw className="w-6 h-6" />,
    },
  ];

  return (
    <>
      <FloatingTOC items={tocItems} />
      <BlogPostLayout
        category="React"
        date="November 22, 2025"
        readTime="15 min read"
        title={<>React Hooks: <br /><span className="text-[#4D7DA3]">The Mental Models You're Missing</span></>}
        subtitle="Hooks fundamentally changed how we write React components. But too many developers are coding with superstition. Let's build the mental models."
        slug="react-hooks-visualized"
        coverImage="/blog-covers/react-hooks-visualized.jpeg"
        short={{
          content: (
            <>
              <p className="mb-6 font-bold text-xl text-[#153230]">
                The "Senior Dev" Cheat Sheet
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex gap-3">
                  <span className="text-[#4D7DA3] font-bold">1.</span>
                  <span><strong>The Golden Rule of Order.</strong> React tracks hooks using a simple array index (0, 1, 2). It does not know names. <em>Rule: Never put a hook inside an if statement, loop, or nested function.</em></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#4D7DA3] font-bold">2.</span>
                  <span><strong>The useState Trap.</strong> State variables inside functions (like setTimeout) are stale "photographs" of the past. <em>Rule: If your update depends on the previous value, always use the functional update: <code>setCount(prev {'=>'} prev + 1)</code>.</em></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#4D7DA3] font-bold">3.</span>
                  <span><strong>The useEffect Mindset.</strong> useEffect is not componentDidMount. It is a synchronization engine. <em>Rule: Your effect must handle being run twice (Strict Mode). If it breaks, your cleanup logic is missing.</em></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#4D7DA3] font-bold">4.</span>
                  <span><strong>The Performance Lie.</strong> Wrapping functions in useCallback does not make your app faster. It adds memory overhead. <em>Rule: Only use useCallback if the child component receiving the function is wrapped in React.memo. Otherwise, delete it.</em></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#4D7DA3] font-bold">5.</span>
                  <span><strong>The Context Warning.</strong> Context is not a state manager; it is a dependency injection tool. <em>Rule: When Context changes, every component consuming it re-renders. Use it for Theme/Auth only.</em></span>
                </li>
              </ul>
            </>
          )
        }}
        medium={{
          content: (
            <>
              <p className="mb-6 font-medium text-xl text-[#153230]">
                The Logic Behind The Magic
              </p>

              <h3 className="font-bold text-[#153230] text-lg mb-2">1. The Array Model (Why Hooks Can’t Be Conditional)</h3>
              <p className="mb-4">You can't call hooks conditionally because React relies on call order to identify state. React has a clipboard with a list: <code>[State A, State B, Effect A]</code>. If you hide State A behind an <code>if (false)</code>, React tries to assign State B's data to State A's slot. The entire index mapping shifts, causing data corruption.</p>

              <h3 className="font-bold text-[#153230] text-lg mb-2 mt-8">2. Stale Closures (Why Your State Isn’t Updating)</h3>
              <p className="mb-4">JavaScript functions "capture" variables when they are created. This is called a Closure. Think of a render as a "frame" in a movie. When you click a button, that function runs inside Frame 1. Even if the movie moves to Frame 10, that function is still holding onto the data from Frame 1.</p>
              <div className="bg-blue-50 p-4 rounded-lg text-sm mb-4"><strong>The Solution:</strong> Functional updates (prev {'=>'} prev + 1) bypass the closure and ask React for the current value.</div>

              <h3 className="font-bold text-[#153230] text-lg mb-2 mt-8">3. Synchronization (Why Effects Run Twice)</h3>
              <p className="mb-4">useEffect is a machine that keeps external systems (DOM, API) in sync with internal state. React 18+ intentionally mounts, unmounts, and remounts your component to ensure your cleanup function works. If your effect creates a subscription but doesn't clean it up, the double-fire exposes the memory leak immediately.</p>

              <h3 className="font-bold text-[#153230] text-lg mb-2 mt-8">4. useRef (The Secret Pocket)</h3>
              <p className="mb-4">useState is a doorbell, it rings (re-renders) every time you change it. useRef is a secret pocket. You can put things in and take them out, and React’s rendering engine doesn't even know you did it.</p>

              <h3 className="font-bold text-[#153230] text-lg mb-2 mt-8">5. The Memoization Equation</h3>
              <p className="mb-4">useCallback stabilizes the reference of a function. But if the Child component isn't checking for stable references (via React.memo), it re-renders anyway because the Parent re-rendered. <strong>Formula:</strong> useCallback (Parent) + React.memo (Child) = Performance. One without the other is waste.</p>

              <h3 className="font-bold text-[#153230] text-lg mb-2 mt-8">6. The "Nuclear" Context</h3>
              <p className="mb-4">There is no way to "subscribe" to just part of a Context. If the Provider updates value, every consumer re-renders. Don't put currentUser (rare change) and mousePosition (fast change) in the same Context.</p>
            </>
          )
        }}
        long={{
          content: (
            <>

              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-[#153230] mb-4 mt-12">
                  React Hooks: From "Magic" to Mental Models
                </h2>
                <p className="text-[#153230]/80 leading-relaxed mb-6">
                  Since they dropped in 2019, hooks have fundamentally changed how we build UI. But I see a problem in the industry right now. Too many developers are just memorizing the syntax. They know <em>how</em> to write <code>useEffect</code>, but they don't understand <em>why</em> it behaves the way it does. They are coding with superstition, not understanding.
                </p>
                <p className="text-[#153230]/80 leading-relaxed mb-6">
                  Today, we are going to fix that. We aren't just going to look at syntax; we are going to break down the <strong>Mental Models</strong>, the invisible rules of physics inside React, that will take you from a junior "guesser" to a senior engineer.
                </p>
                <p className="text-[#153230]/80 leading-relaxed mb-8">
                  Get your notebooks out. This is a Gem City deep dive.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16" id="array-model">
                1. What Are Hooks, Really? (The "Array" Model)
              </h2>
              <p className="text-[#153230]/80 leading-relaxed mb-6">
                Hooks are functions that let you "hook into" React's internal systems. But here is the key insight that most tutorials miss: <strong>React relies strictly on call order.</strong>
              </p>
              <p className="text-[#153230]/80 leading-relaxed mb-6">
                Imagine React keeps a clipboard for every component. On that clipboard is a simple list of values.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-8 text-[#153230]/80">
                <li>The first <code>useState</code> you call is <strong>Index 0</strong>.</li>
                <li>The second <code>useState</code> is <strong>Index 1</strong>.</li>
                <li>The <code>useEffect</code> is <strong>Index 2</strong>.</li>
              </ul>
              <p className="text-[#153230]/80 leading-relaxed mb-8">
                *(Technically, under the hood, React uses a linked list of Fiber nodes, not a simple array. But the "Array Mental Model" is the best way to visualize why breaking the order crashes your app.)*
              </p>

              <CodeMorph
                steps={stateEvolutionSteps}
                title="React's Internal Arrays"
                subtitle="Visualize how React tracks Hooks using a simple array index. Breaking the order corrupts the data."
              />

              <div className="bg-amber-50 rounded-2xl p-6 border-l-4 border-amber-500 my-8">
                <p className="text-amber-900 font-semibold mb-2">
                  Ask yourself
                </p>
                <p className="text-amber-900/80 leading-relaxed">
                  When you write code, are you following rules because you memorized them, or because you understand the mechanical consequence (the index mismatch) of breaking them?
                </p>
              </div>

              <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16" id="stale-closures">
                2. <code>useState</code> and the "Stale Closure" Trap
              </h2>
              <p className="text-[#153230]/80 leading-relaxed mb-6">
                The <code>useState</code> hook gives your component memory. But there is one bug that catches every single developer at least once. I call it the <strong>Stale Closure Trap</strong>.
              </p>
              <p className="text-[#153230]/80 leading-relaxed mb-6">
                Picture this: You have a counter. You click a button that sets a timeout to update that counter. You click it 5 times fast. You expect the count to go up to 5. Instead, it stays at 1.
              </p>

              <InteractiveCode examples={staleClosureExamples} title="The Stale Closure Bug" />

              <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-500 my-8">
                <p className="text-blue-900 font-semibold mb-2">Rule of Thumb:</p>
                <p className="text-blue-900/80 leading-relaxed">
                  If your update logic depends on the <em>previous</em> value (especially in async code), always use the functional form.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16" id="synchronization">
                3. <code>useEffect</code>: Synchronization, Not Lifecycle
              </h2>
              <p className="text-[#153230]/80 leading-relaxed mb-6">
                This is the hardest mental shift. We want to think in terms of "Mount," "Update," and "Unmount." <strong>Stop it.</strong>
              </p>
              <p className="text-[#153230]/80 leading-relaxed mb-8">
                Think about <strong>Synchronization</strong>. The mental model is: <em>"Keep this external thing (API, Title, DOM) in sync with this React state."</em>
              </p>

              <div className="bg-[#1e293b] text-gray-100 p-6 rounded-xl overflow-x-auto text-sm my-6 font-mono">
                <pre>{`useEffect(() => {
  // This runs after render to synchronize the document title
  document.title = \`You clicked \${count} times\`;
}, [count]); // Only re-sync when 'count' changes`}</pre>
              </div>

              <div className="grid md:grid-cols-2 gap-6 my-12">
                {useEffectSteps.map((step, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ backgroundColor: step.color + '20' }}>
                      {step.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-[#153230]">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-[#153230] mt-8 mb-4">The Strict Mode "Gotcha" (React 18+)</h3>
              <p className="text-[#153230]/80 leading-relaxed mb-6">
                If you are running this in development, you might notice your API calls firing twice. You might panic. <em>"Is my code broken?"</em>
              </p>
              <p className="text-[#153230]/80 leading-relaxed mb-6">
                No. React is doing that on purpose. It mounts, unmounts, and mounts again immediately to see if you wrote a <strong>cleanup function</strong>.
              </p>

              <div className="bg-[#1e293b] text-gray-100 p-6 rounded-xl overflow-x-auto text-sm my-6 font-mono">
                <pre>{`useEffect(() => {
  let cancelled = false;

  async function fetchData() {
    const data = await api.get();
    if (!cancelled) setUser(data);
  }
  
  fetchData();

  // The Cleanup Function
  return () => { cancelled = true; };
}, [userId]);`}</pre>
              </div>

              <p className="text-[#153230]/80 leading-relaxed my-6">
                If your effect breaks when it runs twice, your synchronization logic is flawed. Don't fight the framework; let it teach you resiliency.
              </p>


              <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16" id="useref-pocket">
                4. <code>useRef</code>: The Silent Storage (Bonus)
              </h2>
              <p className="text-[#153230]/80 leading-relaxed mb-6">
                <code>useState</code> is great, but every time you change it, you ring the doorbell and force the component to re-render. Sometimes, you want to store a value <em>without</em> the re-render.
              </p>
              <p className="text-[#153230]/80 leading-relaxed mb-6">
                Enter <strong><code>useRef</code></strong>. Think of <code>useRef</code> as a "Secret Pocket." You can put things in it and take things out, but the component doesn't know you did it, so it doesn't update the UI.
              </p>

              <div className="bg-[#1e293b] text-gray-100 p-6 rounded-xl overflow-x-auto text-sm my-6 font-mono">
                <pre>{`function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null); // The secret pocket

  const start = () => {
    // We store the ID, but we don't need a re-render just to store a number
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };
  
  const stop = () => clearInterval(intervalRef.current);
  // ...
}`}</pre>
              </div>


              <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16" id="performance-myth">
                5. The Performance Myth (<code>useCallback</code> & <code>useMemo</code>)
              </h2>
              <p className="text-[#153230]/80 leading-relaxed mb-6">
                I need to have some real talk with y'all. I see so many codebases where every single function is wrapped in <code>useCallback</code> "just in case."
              </p>
              <p className="text-[#153230]/80 leading-relaxed mb-6">
                <strong>Stop it.</strong> <code>useCallback</code> alone does nothing. It does not make your app faster. In fact, it adds memory overhead. It is only useful if the <strong>child component</strong> you are passing it to is wrapped in <code>React.memo</code>.
              </p>

              <div className="bg-[#1e293b] text-gray-100 p-6 rounded-xl overflow-x-auto text-sm my-6 font-mono">
                <pre>{`// ❌ POINTLESS: Child isn't memoized, so it re-renders anyway
function Parent() {
  const handleClick = useCallback(() => {}, []);
  return <Child onClick={handleClick} />; 
}

// ✅ EFFECTIVE: Child is memoized AND callback is stable
const Child = React.memo(({ onClick }) => <button onClick={onClick}>Click</button>);

function Parent() {
  const handleClick = useCallback(() => {}, []);
  return <Child onClick={handleClick} />; // Child skips re-render ✓
}`}</pre>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6 border-l-4 border-purple-500 my-8">
                <p className="text-purple-900 font-semibold mb-2">
                  Ask yourself
                </p>
                <p className="text-purple-900/80 leading-relaxed">
                  Are you optimizing for performance, or are you optimizing for your own anxiety? Measure first. If it's not slow, keep it simple.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-[#153230] mb-6 mt-16" id="context-cost">
                6. The Hidden Cost of <code>useContext</code>
              </h2>
              <p className="text-[#153230]/80 leading-relaxed mb-6">
                We love <code>useContext</code>. It saves us from prop-drilling hell. But there is a hidden cost that nobody talks about.
              </p>
              <p className="text-[#153230]/80 leading-relaxed mb-6">
                <strong>Context is a nuclear option for state updates.</strong> When a Context value changes, <strong>every single component</strong> that consumes that context re-renders. Even if they only use a tiny slice of data that didn't change.
              </p>

              <div className="bg-[#1e293b] text-gray-100 p-6 rounded-xl overflow-x-auto text-sm my-6 font-mono">
                <pre>{`// ⚠️ WARNING
const AppContext = createContext();

function ThemeToggle() {
  // If 'searchQuery' changes in the Provider, THIS component re-renders
  // even though it only cares about 'theme'.
  const { theme } = useContext(AppContext); 
  return <button>{theme}</button>;
}`}</pre>
              </div>

              <div className="mt-12 pt-8 border-t border-[#4D7DA3]/20">
                <h3 className="text-2xl font-black text-[#153230] mb-4">The Bottom Line</h3>
                <p className="text-lg leading-relaxed text-[#153230]/80">
                  Hooks aren't just syntax sugar. They are a mindset shift. They force us to think about <strong>synchronization</strong> instead of <strong>lifecycle</strong>. They force us to think about <strong>referential stability</strong> instead of just <strong>values</strong>.
                </p>
                <p className="text-lg leading-relaxed text-[#153230]/80 mt-4">
                  If you want to move from "coder" to "engineer," stop memorizing the docs. Start visualizing the array. Start visualizing the closure. Start asking <em>why</em>. That’s how you level up. Using tools like <strong>CodePlayground</strong> below can help!
                </p>
              </div>
            </>
          )
        }}
      />
    </>
  );
}