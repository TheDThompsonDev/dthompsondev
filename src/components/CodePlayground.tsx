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
  fractal: `// 🌀 Sierpinski Triangle Generator
function sierpinski(depth) {
  const size = Math.pow(2, depth);
  const grid = Array(size).fill(0).map(() => Array(size * 2).fill(' '));
  
  function drawTriangle(x, y, size) {
    if (size === 1) {
      grid[y][x] = '▲';
      return;
    }
    
    const half = size / 2;
    drawTriangle(x + half, y, half);
    drawTriangle(x, y + half, half);
    drawTriangle(x + size, y + half, half);
  }
  
  drawTriangle(0, 0, size);
  
  console.log("🌀 Sierpinski Triangle (Depth: " + depth + ")\\n");
  grid.forEach(row => console.log(row.join('')));
  console.log("\\n✨ Fractals are infinitely complex patterns!");
}

// Try changing the depth (1-5)!
sierpinski(4);`,

  sorting: `// 🔄 Bubble Sort Visualizer
function bubbleSort(arr) {
  const n = arr.length;
  const steps = [];
  const copy = [...arr];
  
  console.log("🔄 Bubble Sort Visualization\\n");
  console.log("Initial: [" + copy.join(", ") + "]\\n");
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (copy[j] > copy[j + 1]) {
        [copy[j], copy[j + 1]] = [copy[j + 1], copy[j]];
        swapped = true;
        
        console.log(\`Pass \${i + 1}: [\${copy.join(", ")}]\`);
        console.log(\`  Swapped: \${copy[j]} ↔ \${copy[j + 1]}\`);
      }
    }
    
    if (!swapped) break;
  }
  
  console.log("\\n✅ Sorted: [" + copy.join(", ") + "]");
  console.log("\\n💡 Try different arrays!");
}

bubbleSort([64, 34, 25, 12, 22, 11, 90]);`,

  tree: `// 🌳 Binary Tree Traversal
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function buildTree() {
  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.left.left = new TreeNode(4);
  root.left.right = new TreeNode(5);
  root.right.left = new TreeNode(6);
  root.right.right = new TreeNode(7);
  return root;
}

function inorder(node, path = []) {
  if (!node) return path;
  inorder(node.left, path);
  path.push(node.val);
  inorder(node.right, path);
  return path;
}

function preorder(node, path = []) {
  if (!node) return path;
  path.push(node.val);
  preorder(node.left, path);
  preorder(node.right, path);
  return path;
}

function postorder(node, path = []) {
  if (!node) return path;
  postorder(node.left, path);
  postorder(node.right, path);
  path.push(node.val);
  return path;
}

const tree = buildTree();

console.log("🌳 Binary Tree Traversals\\n");
console.log("Tree Structure:");
console.log("       1");
console.log("      / \\\\");
console.log("     2   3");
console.log("    / \\\\ / \\\\");
console.log("   4  5 6  7\\n");

console.log("Inorder:   " + inorder(tree));
console.log("Preorder:  " + preorder(tree));
console.log("Postorder: " + postorder(tree));
console.log("\\n✨ Different orders, different uses!");`
};

interface TabConfig {
  key: 'fractal' | 'sorting' | 'tree';
  label: string;
  icon: string;
  filename: string;
  language: string;
  color: string;
}

const tabs: TabConfig[] = [
  { key: 'fractal', label: 'Fractal', icon: '🌀', filename: 'sierpinski.js', language: 'javascript', color: '#4D7DA3' },
  { key: 'sorting', label: 'Sorting', icon: '🔄', filename: 'bubbleSort.js', language: 'javascript', color: '#84803E' },
  { key: 'tree', label: 'Trees', icon: '🌳', filename: 'binaryTree.js', language: 'javascript', color: '#10B981' },
];

export function CodePlayground() {
  const [activeTab, setActiveTab] = useState<'fractal' | 'sorting' | 'tree'>('fractal');
  const [code, setCode] = useState<string>(defaultExamples.fractal);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
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

  const handleTabChange = (tab: 'fractal' | 'sorting' | 'tree') => {
    setActiveTab(tab);
    setCode(defaultExamples[tab]);
    setOutput('');
  };

  const runCode = () => {
    setIsRunning(true);
    const logs: string[] = [];
    
    const mockConsole = {
      log: (...args: any[]) => {
        logs.push(args.map(arg =>
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
      }
    };

    try {
      const func = new Function('console', code);
      func(mockConsole);
      setOutput(logs.join('\n'));
    } catch (error) {
      setOutput(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}\n\n💡 Tip: Check your syntax and try again!`);
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
          
          <div className="flex h-[500px]">
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
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#84803E]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-[#164063]/80 font-mono text-xs font-semibold">Console Output</span>
            </div>
            {output && (
              <button
                onClick={() => setOutput('')}
                className="text-[#153230]/40 hover:text-[#153230]/80 text-xs font-semibold transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          
          <div className="flex-1 overflow-auto p-4 h-[500px] bg-white/50">
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
                <p className="text-[#10B981] font-semibold">// 🌟 Experiment with different algorithms and patterns</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#9bcdf6] px-6 py-4 border-t border-[#4D7DA3]/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-sm"></div>
              <span className="text-[#153230]/70 font-mono">Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#153230]/50" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-[#153230]/70 font-mono">JavaScript</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#153230]/50" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <span className="text-[#153230]/70 font-mono">{lineCount} lines</span>
            </div>
          </div>
          
          <p className="text-[#153230]/50 text-xs font-mono">
            Live Code Playground • Powered by JavaScript Runtime
          </p>
        </div>
      </div>
    </div>
  );
}