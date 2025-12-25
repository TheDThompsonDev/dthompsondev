'use client';

import { useRef, useState, useEffect, MouseEvent, TouchEvent } from 'react';
import { createPortal } from 'react-dom';

interface VirtualWhiteboardProps {
  title?: string;
  height?: number;
  showInstructions?: boolean;
  defaultCollapsed?: boolean;
  variant?: 'default' | 'compact';
}

export function VirtualWhiteboard({
  title = "Take Notes",
  height = 400,
  showInstructions = true, // Kept for API compatibility, but effectively unused in sticky mode now
  defaultCollapsed = false,
  variant = 'default'
}: VirtualWhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentDragPos = useRef({ x: 16, y: 80 });

  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#1f2937');
  const [lineWidth, setLineWidth] = useState(3);
  const [tool, setTool] = useState<'pen' | 'eraser' | 'text'>('pen');
  const [isSticky, setIsSticky] = useState(false);
  // Removed isExpanded state - sticky is always "expanded" (showing tools) but compact in size
  const [isInlineCollapsed, setIsInlineCollapsed] = useState(defaultCollapsed && variant !== 'compact');

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 16, y: 80 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [textInput, setTextInput] = useState({ active: false, x: 0, y: 0, value: '' });
  const [fontSize, setFontSize] = useState(16);

  const colors = [
    { name: 'Gray', value: '#1f2937' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Black', value: '#000000' },
  ];

  const savedImageRef = useRef<HTMLCanvasElement | null>(null); // To persist data during resize
  const [pinnedExpanded, setPinnedExpanded] = useState(false); // Toggle for pinned height (250px vs 500px)

  // ... (drawing state)

  // Helper to save current canvas content
  const saveContent = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a temp canvas to store the exact current image
    const temp = document.createElement('canvas');
    temp.width = canvas.width;
    temp.height = canvas.height;
    const tCtx = temp.getContext('2d');
    if (tCtx) tCtx.drawImage(canvas, 0, 0);
    savedImageRef.current = temp;
  };

  // Helper to restore content
  const restoreContent = () => {
    const canvas = canvasRef.current;
    const temp = savedImageRef.current;
    if (!canvas || !temp) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw saved image back at 0,0. This preserves the drawing without scaling, 
    // effectively cropping if smaller or adding whitespace if larger.
    ctx.drawImage(temp, 0, 0);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Save before calculating new size logic
    if (canvas.width > 0 && canvas.height > 0) {
      saveContent();
    }

    // Compact mode always uses a fixed smaller canvas size initially
    const baseWidth = variant === 'compact' ? 350 : canvas.offsetWidth;
    const baseHeight = variant === 'compact' ? 200 : height;

    canvas.width = baseWidth;
    canvas.height = baseHeight;
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Restore
    restoreContent();
  }, [variant, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Save before calculating new size logic
    if (canvas.width > 0 && canvas.height > 0) {
      saveContent();
    }

    let canvasWidth, canvasHeight;

    if (isSticky) {
      // Sticky mode: 250px (compact) or 500px (expanded)
      canvasWidth = 320;
      canvasHeight = pinnedExpanded ? 500 : 250;
    } else if (variant === 'compact') {
      canvasWidth = canvas.parentElement?.offsetWidth || 350;
      canvasHeight = 250;
    } else {
      canvasWidth = canvas.offsetWidth;
      canvasHeight = isInlineCollapsed ? 0 : height;
    }

    // Resize if changed
    if (!isInlineCollapsed && (canvas.width !== canvasWidth || canvas.height !== canvasHeight)) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Restore immediately after resize
      restoreContent();

      // Restore drawing settings that get reset on resize
      context.strokeStyle = tool === 'eraser' ? 'white' : currentColor;
      context.lineWidth = tool === 'eraser' ? lineWidth * 3 : lineWidth;
      context.lineCap = 'round';
      context.lineJoin = 'round';
    }
  }, [height, isSticky, isInlineCollapsed, variant, pinnedExpanded]);

  useEffect(() => {
    if (textInput.active && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [textInput.active]);

  const handleCanvasClick = (e: MouseEvent<HTMLCanvasElement>) => {
    if (tool !== 'text') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setTextInput({ active: true, x, y, value: '' });
  };

  const handleTextSubmit = () => {
    if (!textInput.value.trim()) {
      setTextInput({ active: false, x: 0, y: 0, value: '' });
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.font = `${fontSize}px Arial`;
    context.fillStyle = currentColor;
    context.fillText(textInput.value, textInput.x, textInput.y);

    setTextInput({ active: false, x: 0, y: 0, value: '' });
  };

  const handleTextKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTextSubmit();
    } else if (e.key === 'Escape') {
      setTextInput({ active: false, x: 0, y: 0, value: '' });
    }
  };

  const startDrawing = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    if (tool === 'text') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool === 'text') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    context.strokeStyle = tool === 'eraser' ? 'white' : currentColor;
    context.lineWidth = tool === 'eraser' ? lineWidth * 3 : lineWidth;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'whiteboard-notes.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const startDrag = (e: MouseEvent | TouchEvent) => {
    if (!isSticky) return;

    if (e.cancelable && 'preventDefault' in e) e.preventDefault();

    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    // Sync ref start position
    currentDragPos.current = { ...position };

    setDragOffset({
      x: clientX - position.x,
      y: clientY - position.y
    });

    document.body.style.userSelect = 'none';
  };

  const onDrag = (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    if (e.cancelable) e.preventDefault();

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const newX = clientX - dragOffset.x;
    const newY = clientY - dragOffset.y;

    // Direct DOM update for performance (60fps)
    containerRef.current.style.left = `${newX}px`;
    containerRef.current.style.top = `${newY}px`;

    currentDragPos.current = { x: newX, y: newY };
  };

  const stopDrag = () => {
    if (isDragging) {
      setIsDragging(false);
      document.body.style.userSelect = '';
      setPosition(currentDragPos.current);
    }
  };

  useEffect(() => {
    if (isDragging) {
      const handleWindowMove = (e: globalThis.MouseEvent | globalThis.TouchEvent) => onDrag(e);
      const handleWindowUp = () => stopDrag();

      window.addEventListener('mousemove', handleWindowMove);
      window.addEventListener('mouseup', handleWindowUp);
      window.addEventListener('touchmove', handleWindowMove, { passive: false });
      window.addEventListener('touchend', handleWindowUp);

      return () => {
        window.removeEventListener('mousemove', handleWindowMove);
        window.removeEventListener('mouseup', handleWindowUp);
        window.removeEventListener('touchmove', handleWindowMove);
        window.removeEventListener('touchend', handleWindowUp);
      };
    }
  }, [isDragging, dragOffset]);

  // INLINE COLLAPSED VIEW (Default variant only)
  if (!isSticky && isInlineCollapsed && variant === 'default') {
    return (
      <div className="my-8">
        <div
          className="bg-white rounded-xl shadow-sm border border-[#4D7DA3]/20 p-4 cursor-pointer hover:bg-[#f8fcfe] transition-all group"
          onClick={() => setIsInlineCollapsed(false)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl group-hover:scale-110 transition-transform">📝</span>
              <div>
                <span className="font-bold text-[#153230] block">{title}</span>
                <p className="text-sm text-[#153230]/80">Click to open whiteboard and take notes</p>
              </div>
            </div>
            <div className="text-[#4D7DA3] font-bold text-sm group-hover:translate-x-1 transition-transform">
              Open →
            </div>
          </div>
        </div>
      </div>
    );
  }

  // The main whiteboard content - extracted to be reusable for portal
  const whiteboardContent = (
    <div
      ref={containerRef}
      className={`transition-all duration-300 ${isSticky ? 'fixed z-[9999]' : 'my-0'
        } ${isDragging ? 'cursor-move' : ''}`}
      style={isSticky ? {
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '340px',
      } : {}}
    >
      <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 ${isSticky ? 'shadow-2xl' : ''
        }`}>
        {/* Header - Always Show Full Layout if Pinned */}
        <div
          className={`bg-blue-50 border-b border-blue-100 px-4 py-3 ${isSticky ? 'cursor-move rounded-t-2xl' : 'rounded-t-2xl'
            }`}
          onMouseDown={isSticky ? startDrag : undefined}
          onTouchStart={isSticky ? startDrag : undefined}
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">📝</span>
              <div>
                <span className="text-sm font-bold text-gray-900 leading-tight block">{title}</span>
                {isSticky && <span className="text-[10px] text-gray-600">↔ Drag</span>}
              </div>
            </div>

            <div className="flex gap-1">
              {/* Resize Toggle for Pinned Mode */}
              {isSticky && (
                <button
                  onClick={() => setPinnedExpanded(!pinnedExpanded)}
                  className="px-2 py-1.5 rounded-lg text-xs font-semibold bg-white text-gray-700 hover:bg-blue-50 border border-gray-200 transition-all"
                  title={pinnedExpanded ? "Collapse height" : "Expand size"}
                >
                  {pinnedExpanded ? '⤡ Less' : '⤢ More'}
                </button>
              )}
              {/* Minimize only available if NOT sticky and NOT compact */}
              {(!isSticky && variant !== 'compact') && (
                <button
                  onClick={() => setIsInlineCollapsed(true)}
                  className="bg-white text-gray-700 p-1.5 rounded-lg hover:bg-gray-50 border border-gray-200"
                  aria-label="Minimize whiteboard"
                  title="Minimize"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}

              <button
                onClick={() => setIsSticky(!isSticky)}
                className={`px-2 py-1.5 rounded-lg text-xs font-semibold transition-all ${isSticky
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                  }`}
              >
                {isSticky ? '✕ Close Pin' : '📌 Pin'}
              </button>
            </div>
          </div>
        </div>

        {/* Toolbar - Always visible if Expanded or Pinned */}
        <div className="p-3 bg-gray-50 border-b border-gray-200 rounded-b-none">
          {/* Top Controls: Tools */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-0.5 bg-white rounded-lg border border-gray-200 p-0.5 shadow-sm">
              <button
                onClick={() => setTool('pen')}
                className={`p-1.5 rounded text-xs transition-all ${tool === 'pen' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-900'
                  }`}
                aria-label="Pen tool"
                title="Pen"
              >
                ✏️
              </button>
              <button
                onClick={() => setTool('text')}
                className={`p-1.5 rounded text-xs font-bold transition-all ${tool === 'text' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                aria-label="Text tool"
                title="Text"
              >
                Aa
              </button>
              <button
                onClick={() => setTool('eraser')}
                className={`p-1.5 rounded text-xs transition-all ${tool === 'eraser' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-900'
                  }`}
                aria-label="Eraser tool"
                title="Eraser"
              >
                🧹
              </button>
            </div>

            <div className="flex gap-1">
              <button
                onClick={clearCanvas}
                className="bg-white border border-gray-200 text-gray-700 p-1.5 rounded-lg hover:bg-gray-50 transition-all text-xs"
                title="Clear"
              >
                🗑️
              </button>
              <button
                onClick={downloadCanvas}
                className="bg-gray-900 text-white p-1.5 rounded-lg hover:bg-gray-800 transition-all text-xs"
                title="Save"
              >
                💾
              </button>
            </div>
          </div>

          {/* Colors Row */}
          <div className="flex gap-1 items-center justify-center">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => {
                  setCurrentColor(color.value);
                  if (tool === 'eraser') setTool('pen');
                }}
                className={`w-5 h-5 rounded-full border border-gray-200 transition-all ${currentColor === color.value && tool !== 'eraser'
                  ? 'ring-2 ring-gray-900 ring-offset-1 scale-110'
                  : 'hover:scale-110'
                  }`}
                style={{ backgroundColor: color.value }}
                aria-label={`Select ${color.name} color`}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div className={`${isSticky ? 'p-2 rounded-b-2xl' : 'p-2 rounded-b-2xl'} relative bg-blue-50/50`}>
          <div className="relative rounded-xl overflow-hidden border border-blue-200/50 bg-white shadow-inner">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className={`w-full touch-none transition-all duration-300 ${tool === 'text' ? 'cursor-text' : 'cursor-crosshair'}`}
              style={{
                height: isSticky
                  ? (pinnedExpanded ? '500px' : '250px')
                  : (variant === 'compact' ? '250px' : `${height}px`),
                width: '100%'
              }}
            />
            {textInput.active && (
              <input
                ref={textInputRef}
                type="text"
                value={textInput.value}
                onChange={(e) => setTextInput({ ...textInput, value: e.target.value })}
                onKeyDown={handleTextKeyDown}
                onBlur={handleTextSubmit}
                className="absolute border-2 border-gray-900 rounded-lg px-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
                style={{
                  left: `${textInput.x}px`,
                  top: `${textInput.y - fontSize}px`,
                  fontSize: `${fontSize}px`,
                  color: currentColor,
                  minWidth: '100px',
                  background: 'rgba(255, 255, 255, 0.95)'
                }}
              />
            )}
          </div>
          {tool === 'text' && !isInlineCollapsed && (
            <p className="text-[10px] text-gray-400 mt-1 text-center">
              Click to type • Enter to save
            </p>
          )}
        </div>
      </div>
    </div>
  );

  // When sticky (pinned), render via portal to escape parent stacking contexts
  // This ensures the whiteboard is always on top of all content and follows scroll
  if (isSticky && typeof document !== 'undefined') {
    return createPortal(whiteboardContent, document.body);
  }

  // When not sticky, render inline normally
  return whiteboardContent;
}