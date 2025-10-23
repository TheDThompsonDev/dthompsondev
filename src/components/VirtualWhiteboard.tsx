'use client';

import { useRef, useState, useEffect, MouseEvent, TouchEvent } from 'react';

interface VirtualWhiteboardProps {
  title?: string;
  height?: number;
  showInstructions?: boolean;
}

export function VirtualWhiteboard({ 
  title = "Take Notes", 
  height = 400,
  showInstructions = true 
}: VirtualWhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#1f2937');
  const [lineWidth, setLineWidth] = useState(3);
  const [tool, setTool] = useState<'pen' | 'eraser' | 'text'>('pen');
  const [isSticky, setIsSticky] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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

  const brushSizes = [
    { label: 'S', value: 2 },
    { label: 'M', value: 4 },
    { label: 'L', value: 8 },
  ];

  const fontSizes = [
    { label: 'S', value: 12 },
    { label: 'M', value: 16 },
    { label: 'L', value: 24 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = height;
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const canvasWidth = isSticky ? 320 : canvas.offsetWidth;
    const canvasHeight = isSticky ? (isExpanded ? 400 : 200) : height;
    
    if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [height, isSticky, isExpanded]);

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
    
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setDragOffset({
      x: clientX - position.x,
      y: clientY - position.y
    });
  };

  const onDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setPosition({
      x: clientX - dragOffset.x,
      y: clientY - dragOffset.y
    });
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onDrag as any);
      window.addEventListener('mouseup', stopDrag);
      window.addEventListener('touchmove', onDrag as any);
      window.addEventListener('touchend', stopDrag);
      
      return () => {
        window.removeEventListener('mousemove', onDrag as any);
        window.removeEventListener('mouseup', stopDrag);
        window.removeEventListener('touchmove', onDrag as any);
        window.removeEventListener('touchend', stopDrag);
      };
    }
  }, [isDragging, dragOffset, position]);

  const compactHeight = isExpanded ? 400 : 200;

  return (
    <div 
      className={`my-8 transition-all duration-300 ${
        isSticky ? 'fixed z-50' : ''
      } ${isDragging ? 'cursor-move' : ''}`}
      style={isSticky ? {
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '340px',
      } : {}}
    >
      <div className={`bg-white rounded-2xl shadow-2xl border border-gray-100 transition-all duration-300 ${
        isSticky ? 'shadow-2xl' : ''
      }`}>
        {isSticky && !isExpanded && (
          <div
            className="bg-blue-50 border-b border-blue-100 p-2 cursor-move hover:bg-blue-100 transition-colors rounded-t-2xl"
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            onClick={() => setIsExpanded(true)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span className="text-sm font-semibold text-gray-900">{title}</span>
                <span className="text-xs text-gray-500">↔ Drag</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSticky(false);
                }}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded px-2 py-1 text-xs transition-all"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {(!isSticky || isExpanded) && (
          <div
            className={`bg-blue-50 border-b border-blue-100 px-6 py-4 ${
              isSticky ? 'cursor-move rounded-t-2xl' : 'rounded-t-2xl'
            }`}
            onMouseDown={isSticky ? startDrag : undefined}
            onTouchStart={isSticky ? startDrag : undefined}
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                  {isSticky && <span className="text-xs text-gray-500">↔ Drag to reposition</span>}
                </div>
              </div>
              
              <div className="flex gap-2">
                {isSticky && isExpanded && (
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-semibold text-xs hover:bg-gray-200 transition-all"
                  >
                    Minimize
                  </button>
                )}
                <button
                  onClick={() => setIsSticky(!isSticky)}
                  className={`px-3 py-2 rounded-lg font-semibold text-xs transition-all ${
                    isSticky
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                  }`}
                >
                  {isSticky ? '📌 Pinned' : '📌 Pin'}
                </button>
              </div>
            </div>
          </div>
        )}

        {(!isSticky || isExpanded) && (
          <div className="p-4 bg-gray-50 border-b border-gray-200 rounded-b-none">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1 bg-white rounded-lg border border-gray-200 p-1">
                  <button
                    onClick={() => setTool('pen')}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                      tool === 'pen'
                        ? 'bg-gray-900 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    ✏️ Draw
                  </button>
                  <button
                    onClick={() => setTool('text')}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                      tool === 'text'
                        ? 'bg-gray-900 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Aa Text
                  </button>
                  <button
                    onClick={() => setTool('eraser')}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                      tool === 'eraser'
                        ? 'bg-gray-900 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    🧹 Erase
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {tool === 'text' ? (
                  <div className="flex gap-1 bg-white rounded-lg border border-gray-200 p-1">
                    {fontSizes.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => setFontSize(size.value)}
                        className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                          fontSize === size.value
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-1 bg-white rounded-lg border border-gray-200 p-1">
                    {brushSizes.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => setLineWidth(size.value)}
                        className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                          lineWidth === size.value
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={clearCanvas}
                  className="bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-all"
                >
                  🗑️ Clear
                </button>
                <button
                  onClick={downloadCanvas}
                  className="bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-gray-800 transition-all"
                >
                  💾 Save
                </button>
              </div>
            </div>

            <div className="flex gap-1.5 items-center mt-3 pt-3 border-t border-gray-200">
              <span className="text-xs font-medium text-gray-500 mr-1">Colors</span>
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => {
                    setCurrentColor(color.value);
                    if (tool === 'eraser') setTool('pen');
                  }}
                  className={`w-7 h-7 rounded border-2 transition-all ${
                    currentColor === color.value && tool !== 'eraser'
                      ? 'border-gray-900 scale-110 shadow-md'
                      : 'border-gray-200 hover:border-gray-400 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        )}

        {isSticky && !isExpanded && (
          <div className="p-2 bg-gray-50 flex items-center justify-between border-b border-gray-200">
            <div className="flex gap-1.5 items-center">
              <div className="flex gap-0.5 bg-white rounded border border-gray-200 p-0.5">
                <button
                  onClick={() => setTool('pen')}
                  className={`px-2 py-1 rounded text-xs transition-all ${
                    tool === 'pen' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ✏️
                </button>
                <button
                  onClick={() => setTool('text')}
                  className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                    tool === 'text' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Aa
                </button>
              </div>
              {colors.slice(0, 3).map((color) => (
                <button
                  key={color.value}
                  onClick={() => {
                    setCurrentColor(color.value);
                    if (tool === 'eraser') setTool('pen');
                  }}
                  className={`w-5 h-5 rounded border transition-all ${
                    currentColor === color.value && tool !== 'eraser'
                      ? 'border-gray-900 scale-110'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
            <div className="flex gap-1">
              <button
                onClick={clearCanvas}
                className="bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded text-xs hover:bg-gray-50 transition-all"
              >
                🗑️
              </button>
              <button
                onClick={downloadCanvas}
                className="bg-gray-900 text-white px-2 py-1 rounded text-xs hover:bg-gray-800 transition-all"
              >
                💾
              </button>
            </div>
          </div>
        )}

        <div className={`${isSticky ? 'p-2 rounded-b-2xl' : 'p-4 rounded-b-2xl'} relative bg-blue-50`}>
          <div className="relative rounded-xl overflow-hidden border-2 border-blue-300 shadow-inner">
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
                height: isSticky ? `${compactHeight}px` : `${height}px`,
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
          {tool === 'text' && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              Click anywhere to add text • Press Enter to save • Esc to cancel
            </p>
          )}
        </div>

        {showInstructions && (!isSticky || isExpanded) && (
          <div className="p-4 bg-gray-50 rounded-b-2xl">
            <div className="flex items-start gap-3">
              <span className="text-lg">💡</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-900 mb-1">Quick Tips:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Pin to keep notes visible while reading</li>
                  <li>• Drag the header to reposition anywhere</li>
                  <li>• Use text tool to type notes directly</li>
                  <li>• Save your work anytime as an image</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}