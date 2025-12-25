'use client';

import { useState, useRef, useEffect } from 'react';
import { LinkDialog } from '@/components/ui/LinkDialog';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onSlashCommand?: (text: string, cursorPosition: DOMRect) => void;
}

export function RichTextEditor({ value, onChange, placeholder, className, onSlashCommand }: RichTextEditorProps) {
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const [selectedText, setSelectedText] = useState('');
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const selectionRangeRef = useRef<Range | null>(null);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.textContent || '';
    onChange(newValue);

    if (onSlashCommand && newValue.includes('/')) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        onSlashCommand(newValue, rect);
      }
    }
  };

  const handleSelectionChange = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !editorRef.current) {
      setShowToolbar(false);
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    if (editorRef.current.contains(range.commonAncestorContainer)) {
      selectionRangeRef.current = range.cloneRange();
      setSelectedText(selection.toString());
      setToolbarPosition({
        top: rect.top - 60,
        left: rect.left + (rect.width / 2),
      });
      setShowToolbar(true);
    }
  };

  const applyFormat = (format: string, value?: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedContent = range.toString();

    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedContent}**`;
        break;
      case 'italic':
        formattedText = `*${selectedContent}*`;
        break;
      case 'color':
        formattedText = `<span style="color:${value}">${selectedContent}</span>`;
        break;
      case 'underline':
        formattedText = `__${selectedContent}__`;
        break;
      case 'link':
        setShowLinkDialog(true);
        setShowToolbar(false);
        return;
    }

    if (editorRef.current) {
      const currentContent = editorRef.current.textContent || '';
      const start = currentContent.indexOf(selectedContent);
      if (start !== -1) {
        const newContent =
          currentContent.substring(0, start) +
          formattedText +
          currentContent.substring(start + selectedContent.length);
        onChange(newContent);
      }
    }

    setShowToolbar(false);
  };

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        applyFormat('bold');
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        applyFormat('italic');
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
        applyFormat('underline');
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const selection = window.getSelection();
        if (selection && !selection.isCollapsed) {
          applyFormat('link');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLinkInsert = (url: string, linkText: string) => {
    if (!selectionRangeRef.current || !editorRef.current) return;

    const selectedContent = selectionRangeRef.current.toString();
    const formattedText = `[${linkText || selectedContent}](${url})`;

    const currentContent = editorRef.current.textContent || '';
    const start = currentContent.indexOf(selectedContent);
    if (start !== -1) {
      const newContent =
        currentContent.substring(0, start) +
        formattedText +
        currentContent.substring(start + selectedContent.length);
      onChange(newContent);
    }
  };

  const renderFormattedText = (text: string) => {
    let formatted = text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/__(.+?)__/g, '<u>$1</u>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#4D7DA3] underline hover:text-[#153230] transition-colors">$1</a>');

    return formatted;
  };

  return (
    <div className="relative">
      {showLinkDialog && (
        <LinkDialog
          initialText={selectedText}
          onInsert={handleLinkInsert}
          onClose={() => setShowLinkDialog(false)}
        />
      )}

      {showToolbar && (
        <div
          className="fixed bg-gray-900 text-white rounded-lg shadow-2xl p-2 flex gap-1 z-50 animate-[fadeIn_0.2s_ease-out]"
          style={{
            top: `${toolbarPosition.top}px`,
            left: `${toolbarPosition.left}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <button
            onClick={() => applyFormat('bold')}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
            title="Bold (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          <button
            onClick={() => applyFormat('italic')}
            className="p-2 hover:bg-gray-700 rounded transition-colors italic"
            title="Italic (Ctrl+I)"
          >
            I
          </button>
          <button
            onClick={() => applyFormat('underline')}
            className="p-2 hover:bg-gray-700 rounded transition-colors underline"
            title="Underline (Ctrl+U)"
          >
            U
          </button>
          <button
            onClick={() => applyFormat('link')}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
            title="Link (Ctrl+K)"
          >
            🔗
          </button>
          <div className="w-px bg-gray-700 mx-1"></div>
          {['#153230', '#4D7DA3', '#10B981', '#EF4444', '#F59E0B', '#8B5CF6'].map((color) => (
            <button
              key={color}
              onClick={() => applyFormat('color', color)}
              className="w-6 h-6 rounded border-2 border-gray-600 hover:border-white transition-colors"
              style={{ backgroundColor: color }}
              title={`Color: ${color}`}
            />
          ))}
          <input
            type="color"
            onChange={(e) => applyFormat('color', e.target.value)}
            className="w-6 h-6 rounded cursor-pointer border-2 border-gray-600"
            title="Custom color"
          />
        </div>
      )}

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: renderFormattedText(value) }}
        className={`${className} ${!value ? 'empty' : ''}`}
        data-placeholder={placeholder}
      />
    </div>
  );
}