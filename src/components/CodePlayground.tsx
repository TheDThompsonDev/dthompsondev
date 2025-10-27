'use client';

import { useState, useRef, useEffect } from 'react';

function highlightCode(code: string): string {
  let highlighted = code;
  
  const patterns = [
    { regex: /(\/\/.*$)/gm, color: '#6A9955', name: 'comment' },
    { regex: /\b(function|const|let|var|if|else|for|while|return|class|new|this|try|catch|throw|async|await)\b/g, color: '#E65100', name: 'keyword' },
    { regex: /\b(console|Math|Array|String|Number|Object|Date|JSON)\b/g, color: '#00838F', name: 'builtin' },
    { regex: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, color: '#00838F', name: 'function' },
    { regex: /(['"`])((?:\\.|(?!\1).)*?)\1/g, color: '#7B1FA2', name: 'string' },
    { regex: /\b(\d+\.?\d*)\b/g, color: '#00838F', name: 'number' },
    { regex: /\b(true|false|null|undefined)\b/g, color: '#E65100', name: 'constant' },
    { regex: /(=>|[+\-*/%=<>!&|^~?:])/g, color: '#E65100', name: 'operator' },
  ];
  
  const tokens: Array<{ start: number; end: number; color: string; text: string }> = [];
  
  patterns.forEach(({ regex, color }) => {
    let match;
    while ((match = regex.exec(code)) !== null) {
      tokens.push({
        start: match.index,
        end: match.index + match[0].length,
        color,
        text: match[0]
      });
    }
  });
  
  tokens.sort((a, b) => a.start - b.start);
  
  const merged: typeof tokens = [];
  tokens.forEach(token => {
    if (merged.length === 0 || token.start >= merged[merged.length - 1].end) {
      merged.push(token);
    }
  });
  
  let result = '';
  let lastIndex = 0;
  
  merged.forEach(token => {
    if (token.start > lastIndex) {
      const text = code.substring(lastIndex, token.start);
      result += `<span style="color: #263238">${escapeHtml(text)}</span>`;
    }
    result += `<span style="color: ${token.color}">${escapeHtml(token.text)}</span>`;
    lastIndex = token.end;
  });
  
  if (lastIndex < code.length) {
    const text = code.substring(lastIndex);
    result += `<span style="color: #263238">${escapeHtml(text)}</span>`;
  }
  
  return result;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const defaultExamples = {
  typescript: `// 📚 LESSON 1: Understanding Functions & Scope
// TEACHER: Let's start with the foundation of how functions work

// ════════════════════════════════════════════════════════════════
// LEARNING GOAL: Master function basics before moving forward
// ════════════════════════════════════════════════════════════════

console.log("👨‍🏫 Welcome! Let's learn functions step-by-step\\n");

// STEP 1: A simple function
function greet(name) {
  return "Hello, " + name + "!";
}

console.log("Step 1 - Basic Function:");
console.log(greet("Student"));
console.log("");

// STEP 2: Functions can return other functions (IMPORTANT!)
function createGreeter(greeting) {
  // This inner function "remembers" the greeting variable
  return function(name) {
    return greeting + ", " + name + "!";
  };
}

console.log("Step 2 - Function Returns Function:");
const casualGreeter = createGreeter("Hey");
const formalGreeter = createGreeter("Good evening");

console.log(casualGreeter("Danny"));
console.log(formalGreeter("Mr. Thompson"));
console.log("");

// TEACHER NOTE: See how each greeter "remembers" its greeting?
// This is called CLOSURE - we'll explore this more in Lesson 2!

console.log("✅ Lesson 1 Complete!");
console.log("💡 Key Takeaway: Functions can return functions");
console.log("🎯 Next: Click Lesson 2 to learn about Closures!");
console.log("");
console.log("🔥 CHALLENGE: Try creating a farewell function below:");
console.log("   function createFarewell(word) { ... }");`,

  css: `// 📚 LESSON 2: Understanding Closures (Real-World Example)
// TEACHER: Now let's see WHY closures matter in real code

// ════════════════════════════════════════════════════════════════
// LEARNING GOAL: See how closures solve real problems
// ════════════════════════════════════════════════════════════════

console.log("👨‍🏫 Lesson 2: Closures in Action\\n");

// REAL-WORLD SCENARIO: Building a shopping cart
function createCart() {
  // This variable is PRIVATE - only functions inside can see it
  let items = [];
  let total = 0;
  
  console.log("🛒 Cart created! (items array is hidden/private)\\n");
  
  // Return an object with methods that "close over" items & total
  return {
    addItem: function(name, price) {
      items.push({ name, price });
      total += price;
      console.log(\`✅ Added: \${name} - $\${price}\`);
      console.log(\`   Current total: $\${total}\\n\`);
    },
    
    getTotal: function() {
      return total;
    },
    
    getItems: function() {
      return items.length;
    }
  };
}

// TEACHER: Watch what happens when we create TWO separate carts
const myCart = createCart();
const yourCart = createCart();

console.log("--- Danny's Cart ---");
myCart.addItem("JavaScript Book", 29.99);
myCart.addItem("Coffee Mug", 12.99);

console.log("--- Your Cart ---");
yourCart.addItem("React Course", 99.99);

console.log("--- Final Totals ---");
console.log(\`Danny's cart: $\${myCart.getTotal()} (\${myCart.getItems()} items)\`);
console.log(\`Your cart: $\${yourCart.getTotal()} (\${yourCart.getItems()} items)\`);
console.log("");

console.log("✅ Lesson 2 Complete!");
console.log("💡 Key Takeaway: Each cart has its own private data!");
console.log("🎯 Next: Lesson 3 covers Async/Await patterns");
console.log("");
console.log("🔥 CHALLENGE: Add a removeItem() method to the cart!");`,

  sorting: `// 📚 LESSON 3: Async/Await (The Right Way)
// TEACHER: Let's learn modern JavaScript async patterns

// ════════════════════════════════════════════════════════════════
// LEARNING GOAL: Write clean async code without callback hell
// ════════════════════════════════════════════════════════════════

console.log("👨‍🏫 Lesson 3: Mastering Async/Await\\n");

// STEP 1: Simulating API calls (pretend network requests)
function fetchUserData(userId) {
  console.log(\`📡 Fetching user \${userId}...\`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: "Danny Thompson",
        role: "Director of Tech"
      });
    }, 1000);
  });
}

function fetchUserPosts(userId) {
  console.log(\`📡 Fetching posts for user \${userId}...\`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Understanding Closures" },
        { id: 2, title: "React Hooks Explained" }
      ]);
    }, 1000);
  });
}

// STEP 2: The OLD way (callback hell - DON'T do this!)
console.log("❌ OLD WAY (Callback Hell):");
console.log("   fetchUser(id, (user) => {");
console.log("     fetchPosts(id, (posts) => {");
console.log("       // Nested and hard to read!");
console.log("     });");
console.log("   });\\n");

// STEP 3: The NEW way (async/await - MUCH cleaner!)
async function loadUserProfile(userId) {
  try {
    console.log("✅ NEW WAY (Async/Await):\\n");
    
    const user = await fetchUserData(userId);
    console.log(\`👤 User loaded: \${user.name}\`);
    
    const posts = await fetchUserPosts(userId);
    console.log(\`📝 Posts loaded: \${posts.length} posts\\n\`);
    
    console.log("Full Profile:");
    console.log(user);
    console.log("Posts:", posts);
    
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
}

// Run it!
loadUserProfile(1);

console.log("");
console.log("⏳ Watch the async operations happen!");
console.log("✅ Lesson 3 Complete!");
console.log("💡 Key Takeaway: async/await makes async code readable");
console.log("🎯 Next: Lesson 4 shows real API integration!");`,

  tree: `// 📚 LESSON 4: Real-World API Integration
// TEACHER: Now let's put it all together with a real example

// ════════════════════════════════════════════════════════════════
// LEARNING GOAL: Build a complete feature with error handling
// ════════════════════════════════════════════════════════════════

console.log("👨‍🏫 Lesson 4: Production-Ready Code\\n");

// STEP 1: Create a reusable API client with error handling
class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    console.log(\`🔧 API Client initialized: \${baseURL}\\n\`);
  }
  
  async get(endpoint) {
    console.log(\`📡 GET \${this.baseURL}\${endpoint}\`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (endpoint === "/error") {
        throw new Error("Network timeout");
      }
      
      return {
        success: true,
        data: { message: "Data fetched successfully" }
      };
    } catch (error) {
      console.log(\`❌ Error: \${error.message}\\n\`);
      return { success: false, error: error.message };
    }
  }
}

// STEP 2: Use the client with proper error handling
async function loadDashboard() {
  const api = new APIClient("https://api.example.com");
  
  console.log("--- Loading Dashboard ---\\n");
  
  const userResult = await api.get("/user");
  if (!userResult.success) {
    console.log("⚠️ Could not load user, using cached data");
    return;
  }
  console.log("✅ User data loaded\\n");
  
  const postsResult = await api.get("/posts");
  if (!postsResult.success) {
    console.log("⚠️ Could not load posts, showing message");
    return;
  }
  console.log("✅ Posts loaded\\n");
  
  console.log("🎉 Dashboard ready!\\n");
}

// Run the dashboard loader
loadDashboard();

console.log("--- Try This ---");
console.log("Change '/posts' to '/error' to see error handling!\\n");

console.log("✅ Lesson 4 Complete!");
console.log("💡 Key Takeaway: Always handle errors gracefully");
console.log("🎯 You now understand:");
console.log("   1. Functions & Scope");
console.log("   2. Closures & Privacy");
console.log("   3. Async/Await Patterns");
console.log("   4. Real-World Error Handling");
console.log("");
console.log("🔥 Ready to work 1:1? Book a mentorship session!");`
};

interface TabConfig {
  key: 'typescript' | 'css' | 'sorting' | 'tree';
  label: string;
  icon: string;
  filename: string;
  language: string;
  color: string;
}

const tabs: TabConfig[] = [
  { key: 'typescript', label: 'Lesson 1', icon: '📚', filename: 'functions-and-scope.js', language: 'javascript', color: '#3178C6' },
  { key: 'css', label: 'Lesson 2', icon: '🔒', filename: 'closures-explained.js', language: 'javascript', color: '#E65100' },
  { key: 'sorting', label: 'Lesson 3', icon: '⚡', filename: 'async-await.js', language: 'javascript', color: '#84803E' },
  { key: 'tree', label: 'Lesson 4', icon: '🚀', filename: 'real-world-api.js', language: 'javascript', color: '#10B981' },
];

export function CodePlayground() {
  const [activeTab, setActiveTab] = useState<'typescript' | 'css' | 'sorting' | 'tree'>('typescript');
  const [code, setCode] = useState<string>(defaultExamples.typescript);
  const [output, setOutput] = useState<string>('');
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [viewMode, setViewMode] = useState<'console' | 'preview'>('console');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    const lines = code.split('\n').length;
    setLineCount(lines);
  }, [code]);

  const handleScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleTabChange = (tab: 'typescript' | 'css' | 'sorting' | 'tree') => {
    setActiveTab(tab);
    setCode(defaultExamples[tab]);
    setOutput('');
    setPreviewHtml('');
  };

  const runCode = () => {
    setIsRunning(true);
    const logs: string[] = [];
    let htmlContent = '';
    
    const mockConsole = {
      log: (...args: any[]) => {
        logs.push(args.map(arg =>
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
      }
    };

    const mockDocument = {
      getElementById: (id: string) => {
        if (id === 'preview') {
          return {
            set innerHTML(value: string) {
              htmlContent = value;
            },
            get innerHTML() {
              return htmlContent;
            }
          };
        }
        return null;
      }
    };

    try {
      const func = new Function('console', 'document', code);
      func(mockConsole, mockDocument);
      setOutput(logs.join('\n'));
      setPreviewHtml(htmlContent);
    } catch (error) {
      setOutput(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}\n\n💡 Tip: Check your syntax and try again!`);
      setPreviewHtml('');
    }
    
    setTimeout(() => setIsRunning(false), 300);
  };

  const resetCode = () => {
    setCode(defaultExamples[activeTab]);
    setOutput('');
  };

  const getLineNumberColor = (index: number) => {
    const colors = ['#4D7DA3', '#84803E', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
    return colors[index % colors.length];
  };

  const activeTabConfig = tabs.find(t => t.key === activeTab)!;

  return (
    <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-[#4D7DA3]/20">
      <div className="bg-[#9bcdf6] px-6 py-4 border-b border-[#4D7DA3]/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-colors cursor-pointer shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#febc2e]/80 transition-colors cursor-pointer shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28c840]/80 transition-colors cursor-pointer shadow-sm"></div>
            </div>
            <span className="text-[#164063] font-semibold text-sm ml-2">💻 Code Editor</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetCode}
              className="text-[#164063]/60 hover:text-[#164063] text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#9bcdf6]/20 transition-all"
              title="Reset to default"
            >
              ↺ Reset
            </button>
            <button
              onClick={runCode}
              disabled={isRunning}
              className={`bg-gradient-to-r from-[#5a9bd4] to-[#3a7fb8] text-white px-5 py-1.5 rounded-lg font-bold hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-sm ${
                isRunning ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>▶</span> {isRunning ? 'Running...' : 'Run'}
            </button>
          </div>
        </div>
        
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-semibold text-xs transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-[#164063] border-t-2 shadow-sm'
                  : 'bg-transparent text-[#164063]/50 hover:text-[#164063]/80 hover:bg-white/50'
              }`}
              style={activeTab === tab.key ? { borderTopColor: '#5a9bd4' } : {}}
            >
              <span>{tab.icon}</span>
              <span>{tab.filename}</span>
              {activeTab === tab.key && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#5a9bd4]"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-0">
        <div className="bg-[#f8fcfe] border-r border-[#9bcdf6]/30">
          <div className="bg-gradient-to-r from-[#e8f4fd] to-[#f8fcfe] px-4 py-2 border-b border-[#9bcdf6]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#4D7DA3]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              <span className="text-[#164063]/80 font-mono text-xs font-semibold">
                {activeTabConfig.filename}
              </span>
            </div>
            <span className="text-[#164063]/40 text-xs font-mono">{activeTabConfig.language}</span>
          </div>
          
          <div className="flex h-[440px]">
            <div className="flex flex-col bg-[#e8f4fd] border-r border-[#9bcdf6]/30 py-4 min-w-[60px]">
              {Array.from({ length: lineCount }, (_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 h-[22px] px-2"
                >
                  <div
                    className="w-1 h-full rounded-full"
                    style={{ backgroundColor: getLineNumberColor(i) }}
                  ></div>
                  <span className="text-[#164063]/40 font-mono text-xs select-none w-full text-right">
                    {i + 1}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="flex-1 relative">
              <div
                ref={highlightRef}
                className="absolute inset-0 p-4 text-sm font-mono leading-[22px] pointer-events-none overflow-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
                style={{
                  tabSize: 2,
                  lineHeight: '22px',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                }}
              />
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onScroll={handleScroll}
                className="w-full h-full bg-transparent text-transparent caret-[#164063] text-sm font-mono p-4 resize-none focus:outline-none leading-[22px] scrollbar-thin scrollbar-thumb-[#5a9bd4]/40 scrollbar-track-transparent relative z-10"
                style={{
                  tabSize: 2,
                  lineHeight: '22px',
                }}
                spellCheck="false"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#f0f8fc] flex flex-col">
          <div className="bg-gradient-to-r from-[#e8f4fd] to-[#f8fcfe] px-4 py-2 border-b border-[#9bcdf6]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#84803E]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-[#164063]/80 font-mono text-xs font-semibold">Output</span>
              </div>
              
              <div className="flex gap-1 bg-white/60 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('console')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                    viewMode === 'console'
                      ? 'bg-[#5a9bd4] text-white shadow-sm'
                      : 'text-[#164063]/60 hover:text-[#164063]'
                  }`}
                >
                  Console
                </button>
                <button
                  onClick={() => setViewMode('preview')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                    viewMode === 'preview'
                      ? 'bg-[#5a9bd4] text-white shadow-sm'
                      : 'text-[#164063]/60 hover:text-[#164063]'
                  }`}
                >
                  Preview
                </button>
              </div>
            </div>
            
            {output && viewMode === 'console' && (
              <button
                onClick={() => setOutput('')}
                className="text-[#153230]/40 hover:text-[#153230]/80 text-xs font-semibold transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          
          <div className="flex-1 overflow-auto h-[440px] bg-white/50">
            <div className={viewMode === 'console' ? 'p-4' : 'hidden'}>
              {output ? (
                <pre className="text-[#153230] font-mono text-xs leading-relaxed whitespace-pre-wrap">
                  {output}
                </pre>
              ) : (
                <div className="text-[#153230]/40 font-mono text-xs space-y-2">
                  <p>// Welcome to the Live Code Editor! 🎉</p>
                  <p>//</p>
                  <p>// 1. Edit the code on the left</p>
                  <p>// 2. Click the "Run" button to execute</p>
                  <p>// 3. See your output here</p>
                  <p>//</p>
                  <p className="text-[#4D7DA3] font-semibold">// 💡 Tip: Try modifying the values and see what happens!</p>
                  <p className="text-[#84803E] font-semibold">// 🔄 Use the Reset button to restore the original code</p>
                  <p className="text-[#10B981] font-semibold">// 🌟 Switch to Preview mode for visual output</p>
                </div>
              )}
            </div>
            
            <div
              className={`w-full h-full p-4 ${viewMode === 'preview' ? 'block' : 'hidden'}`}
            >
              {previewHtml ? (
                <div dangerouslySetInnerHTML={{ __html: previewHtml }} className="w-full h-full" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-[#153230]/40 font-mono text-xs">
                    <p>Click "Run" to see visual output</p>
                    <p className="mt-2 text-[#4D7DA3]">Perfect for CSS animations and HTML demos!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t-4 border-[#4D7DA3] relative z-10" style={{ backgroundColor: '#9bcdf6' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-sm"></div>
              <span className="text-[#164063] font-mono font-bold">Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#164063]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-[#164063] font-mono font-bold">JavaScript</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#164063]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <span className="text-[#164063] font-mono font-bold">{lineCount} lines</span>
            </div>
          </div>
          
          <p className="text-[#164063] text-xs font-mono font-bold">
            Live Code Playground • Test your ideas!
          </p>
        </div>
      </div>
    </div>
  );
}