'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { BlogContent, ContentBlock } from '@/types/blog';
import { AVAILABLE_COMPONENTS } from '@/lib/components-registry';
import { COMPONENT_TEMPLATES } from '@/lib/component-templates';
import { BlogRenderer } from '@/components/BlogRenderer';
import { RichTextEditor } from '@/components/RichTextEditor';
import { VirtualWhiteboard } from '@/components/VirtualWhiteboard';
import { SlashCommandMenu } from '@/components/SlashCommandMenu';
import { useUndoRedo } from '@/hooks/useUndoRedo';
import Link from 'next/link';

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [showToolbar, setShowToolbar] = useState(true);
  const [showComponentMenu, setShowComponentMenu] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [featured, setFeatured] = useState(false);
  const [readTime, setReadTime] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [ogImage, setOgImage] = useState('');
  const {
    state: content,
    pushState: setContent,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useUndoRedo<BlogContent>({
    initialState: { blocks: [] },
    maxHistorySize: 50,
  });
  const [editingBlock, setEditingBlock] = useState<number | null>(null);
  const debouncedPushRef = useRef<NodeJS.Timeout | null>(null);
  const [showMetadata, setShowMetadata] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState<number | null>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [componentSearch, setComponentSearch] = useState('');
  const [templateTab, setTemplateTab] = useState<'components' | 'templates'>('components');
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ top: 0, left: 0 });
  const [slashQuery, setSlashQuery] = useState('');
  const [slashBlockIndex, setSlashBlockIndex] = useState<number | null>(null);
  const [draggedBlock, setDraggedBlock] = useState<number | null>(null);
  const [dragOverBlock, setDragOverBlock] = useState<number | null>(null);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const autoSaveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowComponentMenu((prev) => !prev);
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        savePost('draft');
      }
      
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setPreviewMode((prev) => !prev);
      }
      
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        setFocusMode((prev) => !prev);
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (canUndo) {
          undo();
        }
      }
      
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        if (canRedo) {
          redo();
        }
      }
      
      if (e.key === 'Escape') {
        if (focusMode) {
          setFocusMode(false);
        } else {
          setShowComponentMenu(false);
          setShowMetadata(false);
          setEditingBlock(null);
          setShowSlashMenu(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [saving, canUndo, canRedo, undo, redo]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug) {
      setSlug(generateSlug(value));
    }
  };

  const addBlock = (type: string, atIndex?: number) => {
    const config = AVAILABLE_COMPONENTS[type];
    if (!config) return;

    const newBlock = { ...config.defaultData } as ContentBlock;
    
    if (atIndex !== undefined) {
      const newBlocks = [...content.blocks];
      newBlocks.splice(atIndex, 0, newBlock);
      setContent({ blocks: newBlocks });
      setEditingBlock(atIndex);
    } else {
      setContent({
        blocks: [...content.blocks, newBlock],
      });
      setShowComponentMenu(false);
      setEditingBlock(content.blocks.length);
    }
    setTemplateTab('components');
  };

  const addTemplate = (templateKey: string) => {
    const template = COMPONENT_TEMPLATES[templateKey];
    if (!template) return;

    setContent({
      blocks: [...content.blocks, ...template.blocks],
    });
    setShowComponentMenu(false);
    setTemplateTab('components');
  };

  const handleSlashCommand = (blockIndex: number, text: string, cursorPosition: DOMRect) => {
    const slashIndex = text.lastIndexOf('/');
    if (slashIndex !== -1) {
      const query = text.substring(slashIndex + 1);
      setSlashQuery(query);
      setSlashBlockIndex(blockIndex);
      setSlashMenuPosition({
        top: cursorPosition.bottom + window.scrollY,
        left: cursorPosition.left + window.scrollX,
      });
      setShowSlashMenu(true);
    } else {
      setShowSlashMenu(false);
    }
  };

  const handleSlashSelect = (componentType: string) => {
    if (slashBlockIndex === null) return;

    const block = content.blocks[slashBlockIndex];
    if (block.type === 'text') {
      const slashIndex = block.content.lastIndexOf('/');
      if (slashIndex !== -1) {
        const beforeSlash = block.content.substring(0, slashIndex);
        const newBlocks = [...content.blocks];
        newBlocks[slashBlockIndex] = { ...block, content: beforeSlash.trim() };
        setContent({ blocks: newBlocks });
      }
    }

    addBlock(componentType, slashBlockIndex + 1);
    setShowSlashMenu(false);
    setSlashQuery('');
    setSlashBlockIndex(null);
  };

  const updateBlock = (index: number, updatedBlock: ContentBlock) => {
    const newBlocks = [...content.blocks];
    newBlocks[index] = updatedBlock;
    setContent({ blocks: newBlocks });
    triggerAutoSave();
  };

  const duplicateBlock = (index: number) => {
    const blockToDuplicate = { ...content.blocks[index] };
    const newBlocks = [...content.blocks];
    newBlocks.splice(index + 1, 0, blockToDuplicate);
    setContent({ blocks: newBlocks });
  };

  const handleDragStart = (index: number) => {
    setDraggedBlock(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedBlock === null || draggedBlock === index) return;
    setDragOverBlock(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedBlock === null || draggedBlock === dropIndex) return;

    const newBlocks = [...content.blocks];
    const [movedBlock] = newBlocks.splice(draggedBlock, 1);
    newBlocks.splice(dropIndex, 0, movedBlock);
    
    setContent({ blocks: newBlocks });
    setDraggedBlock(null);
    setDragOverBlock(null);
  };

  const handleDragEnd = () => {
    setDraggedBlock(null);
    setDragOverBlock(null);
  };

  const triggerAutoSave = () => {
    if (autoSaveTimeout.current) {
      clearTimeout(autoSaveTimeout.current);
    }
    autoSaveTimeout.current = setTimeout(() => {
      autoSaveDraft();
    }, 3000);
  };

  const autoSaveDraft = async () => {
    if (!title || !slug) return;
    
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          category,
          featured,
          read_time: readTime,
        }),
      });

      if (res.ok) {
        setLastSaved(new Date());
      }
    } catch (error) {
      console.error('Auto-save error:', error);
    }
  };

  const calculateWordCount = () => {
    let totalWords = 0;
    content.blocks.forEach(block => {
      if (block.type === 'text') {
        totalWords += block.content.split(/\s+/).filter(word => word.length > 0).length;
      }
    });
    return totalWords;
  };

  const calculateReadTime = () => {
    const wordCount = calculateWordCount();
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min`;
  };

  useEffect(() => {
    const autoCalculatedReadTime = calculateReadTime();
    if (autoCalculatedReadTime !== readTime) {
      setReadTime(autoCalculatedReadTime);
    }
  }, [content]);

  const deleteBlock = (index: number) => {
    if (!confirm('Delete this block?')) return;
    setContent({
      blocks: content.blocks.filter((_, i) => i !== index),
    });
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= content.blocks.length) return;

    const newBlocks = [...content.blocks];
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
    setContent({ blocks: newBlocks });
  };

  const savePost = async (status: 'draft' | 'published') => {
    if (!title || !slug) {
      setSaveMessage('❌ Title and slug are required');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    setSaving(true);
    setSaveMessage('💾 Saving...');
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          category,
          featured,
          read_time: readTime,
        }),
      });

      if (res.ok) {
        const post = await res.json();
        
        if (status === 'published') {
          setSaveMessage('📤 Publishing...');
          await fetch(`/api/admin/posts/${post.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'published' }),
          });
        }

        setSaveMessage('✅ Saved successfully!');
        setTimeout(() => {
          router.push('/admin/posts');
        }, 1000);
      } else {
        const errorData = await res.json();
        const errorMessage = errorData.error || 'Failed to save post';
        setSaveMessage(`❌ ${errorMessage}`);
        setTimeout(() => setSaveMessage(''), 5000);
        console.error('Server error:', errorData);
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveMessage('❌ Network error or invalid response');
      setTimeout(() => setSaveMessage(''), 5000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Save Message Notification */}
      {saveMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-[slideDown_0.3s_ease-out] font-semibold">
          {saveMessage}
        </div>
      )}

      {/* Slash Command Menu */}
      {showSlashMenu && (
        <SlashCommandMenu
          position={slashMenuPosition}
          searchQuery={slashQuery}
          onSelect={handleSlashSelect}
          onClose={() => setShowSlashMenu(false)}
        />
      )}

      {/* Auto-save & Word Count Indicator */}
      {!focusMode && (
      <div className="fixed bottom-4 right-4 bg-white rounded-xl shadow-lg border border-gray-200 px-4 py-2 flex items-center gap-4 text-sm z-40">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Words:</span>
          <span className="font-semibold text-gray-900">{calculateWordCount()}</span>
        </div>
        <div className="w-px h-4 bg-gray-300"></div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Read time:</span>
          <span className="font-semibold text-gray-900">{readTime || calculateReadTime()}</span>
        </div>
        {lastSaved && (
          <>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-gray-500">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Saved {new Date(lastSaved).toLocaleTimeString()}</span>
            </div>
          </>
        )}
      </div>
      )}

      {/* Floating Toolbar - Positioned within content area */}
      {!focusMode && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-[1400px] pointer-events-none z-40">
          <div className="relative w-full px-4">
            <div className="absolute right-8 bg-white rounded-2xl shadow-2xl border border-[#4D7DA3]/20 p-2 flex flex-col gap-2 pointer-events-auto">
              <button
                onClick={() => setFocusMode(true)}
                className="p-3 bg-gray-50 hover:bg-[#E2F3F2] rounded-xl transition-colors group"
                title="Focus Mode (Ctrl+Shift+F)"
              >
                <svg className="w-5 h-5 text-[#153230]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              <button
                onClick={() => setShowShortcuts(!showShortcuts)}
                className="p-3 bg-gray-50 hover:bg-[#E2F3F2] rounded-xl transition-colors group"
                title="Keyboard Shortcuts"
              >
                <svg className="w-5 h-5 text-[#153230]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </button>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className={`p-3 rounded-xl transition-colors ${
                previewMode
                  ? 'bg-[#4D7DA3] text-white hover:bg-[#4D7DA3]/90'
                  : 'bg-gray-50 hover:bg-[#E2F3F2] text-[#153230]'
              }`}
              title="Preview Mode"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button
              onClick={() => setShowMetadata(!showMetadata)}
              className="p-3 bg-gray-50 hover:bg-[#E2F3F2] rounded-xl transition-colors group"
              title="Post Settings"
            >
              <svg className="w-5 h-5 text-[#153230]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            {!previewMode && (
              <button
                onClick={() => setShowComponentMenu(!showComponentMenu)}
                className="p-3 bg-[#4D7DA3] hover:bg-[#4D7DA3]/90 rounded-xl transition-colors text-white relative group"
                title="Add Component (Ctrl+K)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#153230] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Ctrl+K
                </span>
              </button>
            )}
            <button
              onClick={() => savePost('draft')}
              disabled={saving}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
              title="Save Draft"
            >
              <svg className="w-5 h-5 text-[#153230]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            </button>
            <button
              onClick={() => savePost('published')}
              disabled={saving}
              className="p-3 bg-[#10B981] hover:bg-[#10B981]/90 rounded-xl transition-colors text-white disabled:opacity-50"
              title="Publish"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        </div>
        </div>
      )}

      {/* Focus Mode Overlay */}
      {focusMode && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-4">
          <span className="font-semibold">Focus Mode</span>
          <div className="w-px h-4 bg-white/30"></div>
          <span className="text-sm text-white/70">Press Esc to exit</span>
          <button
            onClick={() => setFocusMode(false)}
            className="ml-2 hover:bg-white/10 rounded-lg p-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Metadata Panel */}
      {showMetadata && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setShowMetadata(false)}>
          <div className="fixed top-20 right-4 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Post Settings</h3>
              <button onClick={() => setShowMetadata(false)} className="text-gray-500 hover:text-gray-900">
                ✕
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Read Time</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="5 min"
              />
            </div>

            <div className="flex items-center pt-2">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                Featured post
              </label>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-bold text-gray-900 mb-3">SEO Settings</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Meta Description
                    <span className="text-xs text-gray-500 ml-2">
                      ({metaDescription.length}/160)
                    </span>
                  </label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value.slice(0, 160))}
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      metaDescription.length > 150 ? 'border-amber-500' : 'border-gray-200'
                    }`}
                    placeholder="Brief description for search engines..."
                  />
                  {metaDescription.length > 150 && (
                    <p className="text-xs text-amber-600 mt-1">Getting close to limit!</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Focus Keyword</label>
                  <input
                    type="text"
                    value={focusKeyword}
                    onChange={(e) => setFocusKeyword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Main keyword for SEO"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">OG Image URL</label>
                  <input
                    type="text"
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Image for social media previews (1200x630px recommended)
                  </p>
                </div>

                {metaDescription && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs font-semibold text-gray-600 mb-2">Google Search Preview:</p>
                    <div className="space-y-1">
                      <div className="text-blue-600 text-sm font-medium">{title || 'Your Post Title'}</div>
                      <div className="text-green-600 text-xs">https://yoursite.com/blog/{slug || 'post-slug'}</div>
                      <div className="text-gray-600 text-sm line-clamp-2">{metaDescription}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Panel */}
      {showShortcuts && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setShowShortcuts(false)}>
          <div className="fixed top-20 right-4 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Keyboard Shortcuts</h3>
              <button onClick={() => setShowShortcuts(false)} className="text-gray-500 hover:text-gray-900">
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-700">Add Component</span>
                <kbd className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-mono">Ctrl+K</kbd>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-700">Save Draft</span>
                <kbd className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-mono">Ctrl+S</kbd>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-700">Toggle Preview</span>
                <kbd className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-mono">Ctrl+Shift+P</kbd>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-700">Close Menus</span>
                <kbd className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-mono">Esc</kbd>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-6 text-center">
              Use Cmd instead of Ctrl on Mac
            </p>
          </div>
        </div>
      )}

      {/* Component Menu */}
      {showComponentMenu && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setShowComponentMenu(false)}>
          <div className="fixed top-48 left-1/2 -translate-x-1/2 w-full max-w-[1400px] pointer-events-none">
            <div className="relative w-full px-4">
              <div className="absolute right-8 w-96 bg-white rounded-2xl shadow-2xl border border-[#4D7DA3]/20 p-4 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#153230]">Add to Post</h3>
                  <button
                    onClick={() => setShowComponentMenu(false)}
                    className="text-[#153230]/60 hover:text-[#153230] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex gap-2 mb-4 border-b border-gray-200">
                  <button
                    onClick={() => setTemplateTab('components')}
                    className={`flex-1 px-4 py-2 font-semibold transition-colors ${
                      templateTab === 'components'
                        ? 'text-[#4D7DA3] border-b-2 border-[#4D7DA3]'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Components
                  </button>
                  <button
                    onClick={() => setTemplateTab('templates')}
                    className={`flex-1 px-4 py-2 font-semibold transition-colors ${
                      templateTab === 'templates'
                        ? 'text-[#4D7DA3] border-b-2 border-[#4D7DA3]'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Templates
                  </button>
                </div>

                {templateTab === 'components' ? (
                  <>
                    <input
                      type="text"
                      value={componentSearch}
                      onChange={(e) => setComponentSearch(e.target.value)}
                      placeholder="Search components..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D7DA3] mb-4"
                    />
                    <div className="grid grid-cols-2 gap-2 max-h-[500px] overflow-y-auto">
                      {Object.entries(AVAILABLE_COMPONENTS)
                        .filter(([type, config]) =>
                          config.name.toLowerCase().includes(componentSearch.toLowerCase()) ||
                          config.description.toLowerCase().includes(componentSearch.toLowerCase())
                        )
                        .map(([type, config]) => (
                          <button
                            key={type}
                            onClick={() => {
                              addBlock(type);
                              setComponentSearch('');
                            }}
                            className="p-3 bg-gray-50 hover:bg-[#4D7DA3]/10 rounded-xl text-left transition-colors border border-gray-200 hover:border-[#4D7DA3]"
                          >
                            <div className="text-2xl mb-1">{config.icon}</div>
                            <div className="text-sm font-semibold text-[#153230]">{config.name}</div>
                            <div className="text-xs text-gray-500 mt-1">{config.description}</div>
                          </button>
                        ))}
                    </div>
                  </>
                ) : (
                  <div className="space-y-2 max-h-[500px] overflow-y-auto">
                    {Object.entries(COMPONENT_TEMPLATES).map(([key, template]) => (
                      <button
                        key={key}
                        onClick={() => addTemplate(key)}
                        className="w-full p-4 bg-gradient-to-r from-[#4D7DA3]/5 to-[#10B981]/5 hover:from-[#4D7DA3]/10 hover:to-[#10B981]/10 rounded-xl text-left transition-all border border-gray-200 hover:border-[#4D7DA3] hover:shadow-md"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-3xl flex-shrink-0">{template.icon}</span>
                          <div className="flex-1">
                            <div className="text-sm font-bold text-[#153230] mb-1">{template.name}</div>
                            <div className="text-xs text-gray-600 mb-2">{template.description}</div>
                            <div className="text-xs text-[#4D7DA3] font-medium">
                              {template.blocks.length} component{template.blocks.length > 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog-Style Editor */}
      <div className={`min-h-screen pb-20 transition-colors ${focusMode ? 'bg-gray-900' : 'bg-[#E2F3F2]'}`}>
        <div className="max-w-[1400px] mx-auto p-4">
          <div className={`rounded-[32px] shadow-xl border transition-all ${
            focusMode
              ? 'bg-gray-800/50 border-gray-700'
              : 'bg-white border-gray-100'
          }`}>
            {/* Header with Back Button */}
            {!focusMode && (
              <div className="px-8 md:px-16 py-6 border-b border-[#4D7DA3]/10">
              <Link href="/admin/posts" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-[#153230] rounded-xl flex items-center justify-center text-white text-lg font-bold">
                  ←
                </div>
                <span className="text-lg font-bold tracking-tight text-[#153230]">Back to Posts</span>
              </Link>
              </div>
            )}

            <div className={`px-8 md:px-16 py-12 max-w-4xl mx-auto ${focusMode ? 'py-24' : ''}`}>
              {/* Virtual Whiteboard - Always Included */}
              {!previewMode && (
                <div className="mb-12">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <span>✏️</span>
                      <span>Virtual Whiteboard (Always Included)</span>
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      This whiteboard is automatically added to every blog post for readers to take notes
                    </p>
                    <div className="bg-white rounded-lg p-4 border border-gray-300">
                      <VirtualWhiteboard title="Take Notes while you read!" height={300} />
                    </div>
                  </div>
                </div>
              )}

              {/* Editable Title and Slug */}
              <div className="mb-12">
                {!previewMode && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">URL Slug</label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D7DA3] focus:border-transparent text-sm font-mono"
                      placeholder="url-slug-here"
                    />
                  </div>
                )}
                
                {category && (
                  <div className="mb-4">
                    <span className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-[#4D7DA3]">
                      {category}
                    </span>
                  </div>
                )}
                
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className={`w-full text-5xl md:text-6xl font-bold leading-tight mb-6 bg-transparent border-none focus:outline-none focus:ring-0 ${
                    focusMode
                      ? 'text-white placeholder-gray-600'
                      : 'text-[#153230] placeholder-gray-300'
                  }`}
                  placeholder="Post title..."
                  disabled={previewMode}
                />
                
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  className={`w-full text-xl leading-relaxed bg-transparent border-none focus:outline-none focus:ring-0 resize-none ${
                    focusMode
                      ? 'text-gray-300 placeholder-gray-600'
                      : 'text-[#153230]/70 placeholder-gray-300'
                  }`}
                  placeholder="Brief excerpt that summarizes your post..."
                  disabled={previewMode}
                />
                
                {readTime && (
                  <div className="mt-4 text-sm text-gray-500">
                    {readTime} read
                  </div>
                )}
              </div>


              <div className="space-y-6">
                {previewMode ? (
                  <BlogRenderer content={content} />
                ) : (
                  <>
                    {content.blocks.map((block, index) => (
                      <div
                        key={index}
                        className={`group relative transition-all duration-200 ${
                          draggedBlock === index ? 'opacity-50 scale-95' : ''
                        } ${
                          dragOverBlock === index ? 'border-t-4 border-[#4D7DA3]' : ''
                        }`}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragEnd={handleDragEnd}
                        onMouseEnter={() => {
                          if (hideTimeout.current) {
                            clearTimeout(hideTimeout.current);
                            hideTimeout.current = null;
                          }
                          setEditingBlock(index);
                        }}
                        onMouseLeave={() => {
                          hideTimeout.current = setTimeout(() => {
                            setEditingBlock(null);
                          }, 300);
                        }}
                      >
                        {/* Block Controls */}
                        <div
                          className={`absolute -left-16 top-0 flex flex-col gap-1 bg-white rounded-xl shadow-lg border border-gray-200 p-1 transition-opacity ${
                            editingBlock === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                          }`}
                          onMouseEnter={() => {
                            if (hideTimeout.current) {
                              clearTimeout(hideTimeout.current);
                              hideTimeout.current = null;
                            }
                            setEditingBlock(index);
                          }}
                          onMouseLeave={() => {
                            hideTimeout.current = setTimeout(() => {
                              setEditingBlock(null);
                            }, 300);
                          }}
                        >
                          <button
                            onMouseDown={(e) => {
                              e.preventDefault();
                              moveBlock(index, 'up');
                            }}
                            disabled={index === 0}
                            className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-30 transition-colors"
                            title="Move up"
                          >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                          <button
                            onMouseDown={(e) => {
                              e.preventDefault();
                              moveBlock(index, 'down');
                            }}
                            disabled={index === content.blocks.length - 1}
                            className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-30 transition-colors"
                            title="Move down"
                          >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          <button
                            onMouseDown={(e) => {
                              e.preventDefault();
                              deleteBlock(index);
                            }}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>

                        {/* Render the actual component */}
                        <div className={editingBlock === index ? 'ring-2 ring-[#4D7DA3] ring-offset-4 rounded-2xl' : ''}>
                          {renderEditableBlock(block, index)}
                        </div>
                      </div>
                    ))}

                    {content.blocks.length === 0 && (
                      <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-300 rounded-2xl">
                        <p className="text-lg">Click the + button to add your first component</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function renderEditableBlock(block: ContentBlock, index: number) {
    switch (block.type) {
      case 'text':
        return (
          <RichTextEditor
            value={block.content}
            onChange={(content) => updateBlock(index, { ...block, content })}
            placeholder="Start typing... Select text to format"
            className="w-full px-0 py-2 leading-relaxed text-lg min-h-[80px]"
          />
        );
      
      case 'heading':
        return (
          <input
            value={block.content}
            onChange={(e) => updateBlock(index, { ...block, content: e.target.value })}
            className={`w-full px-0 py-2 text-gray-900 font-bold bg-transparent border-none focus:outline-none ${
              block.level === 1 ? 'text-4xl' : block.level === 2 ? 'text-3xl' : 'text-2xl'
            }`}
            placeholder={`Heading ${block.level}...`}
          />
        );
      
      case 'image':
        const handleImagePaste = async (e: React.ClipboardEvent) => {
          const items = e.clipboardData?.items;
          if (!items) return;

          for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
              e.preventDefault();
              const file = items[i].getAsFile();
              if (!file) continue;

              const formData = new FormData();
              formData.append('file', file);

              try {
                setSaveMessage('📤 Uploading pasted image...');
                const res = await fetch('/api/admin/upload', {
                  method: 'POST',
                  body: formData,
                });

                if (res.ok) {
                  const data = await res.json();
                  updateBlock(index, {
                    ...block,
                    url: data.url,
                    alt: 'Pasted image',
                  });
                  setSaveMessage('✅ Image uploaded!');
                  setTimeout(() => setSaveMessage(''), 2000);
                } else {
                  setSaveMessage('❌ Upload failed');
                  setTimeout(() => setSaveMessage(''), 3000);
                }
              } catch (error) {
                console.error('Upload error:', error);
                setSaveMessage('❌ Upload failed');
                setTimeout(() => setSaveMessage(''), 3000);
              }
              break;
            }
          }
        };

        return (
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50"
            onPaste={handleImagePaste}
          >
            {block.url ? (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden bg-white">
                  <img
                    src={block.url}
                    alt={block.alt || 'Uploaded image'}
                    className="w-full h-auto"
                  />
                  <button
                    onClick={() => updateBlock(index, { ...block, url: '' })}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                    title="Remove image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <input
                  type="text"
                  value={block.alt || ''}
                  onChange={(e) => updateBlock(index, { ...block, alt: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D7DA3]"
                  placeholder="Alt text (for accessibility)..."
                />
                
                <input
                  type="text"
                  value={block.caption || ''}
                  onChange={(e) => updateBlock(index, { ...block, caption: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D7DA3]"
                  placeholder="Caption (optional)..."
                />
              </div>
            ) : (
              <div className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    
                    const formData = new FormData();
                    formData.append('file', file);
                    
                    try {
                      const res = await fetch('/api/admin/upload', {
                        method: 'POST',
                        body: formData,
                      });
                      
                      if (res.ok) {
                        const data = await res.json();
                        updateBlock(index, {
                          ...block,
                          url: data.url,
                          alt: file.name.replace(/\.[^/.]+$/, ''),
                        });
                      } else {
                        alert('Failed to upload image');
                      }
                    } catch (error) {
                      console.error('Upload error:', error);
                      alert('Failed to upload image');
                    }
                  }}
                  className="hidden"
                  id={`image-upload-${index}`}
                />
                <label
                  htmlFor={`image-upload-${index}`}
                  className="cursor-pointer inline-flex flex-col items-center gap-2 p-8 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-600">Click to upload or paste image</span>
                  <span className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</span>
                  <span className="text-xs text-[#4D7DA3] font-medium mt-2 block">
                    💡 Tip: Copy/paste screenshots directly here!
                  </span>
                </label>
              </div>
            )}
          </div>
        );
      
      case 'callout':
        const calloutBlock = block as any;
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
            <div className="space-y-4">
              <div className="flex gap-2">
                <select
                  value={calloutBlock.variant || 'info'}
                  onChange={(e) => updateBlock(index, { ...block, variant: e.target.value } as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D7DA3]"
                >
                  <option value="info">Info (Blue)</option>
                  <option value="warning">Warning (Amber)</option>
                  <option value="success">Success (Green)</option>
                  <option value="error">Error (Red)</option>
                </select>
                <input
                  type="text"
                  value={calloutBlock.icon || ''}
                  onChange={(e) => updateBlock(index, { ...block, icon: e.target.value } as any)}
                  className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D7DA3] text-center"
                  placeholder="Icon"
                />
              </div>
              <input
                type="text"
                value={calloutBlock.title || ''}
                onChange={(e) => updateBlock(index, { ...block, title: e.target.value } as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D7DA3] font-semibold"
                placeholder="Callout title..."
              />
              <textarea
                value={calloutBlock.content || ''}
                onChange={(e) => updateBlock(index, { ...block, content: e.target.value } as any)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D7DA3] resize-none"
                placeholder="Callout content..."
              />
            </div>
          </div>
        );

      case 'code-block':
        const codeBlockData = block as any;
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={codeBlockData.title || ''}
                  onChange={(e) => updateBlock(index, { ...block, title: e.target.value } as any)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D7DA3]"
                  placeholder="Code block title (optional)..."
                />
                <select
                  value={codeBlockData.language || 'javascript'}
                  onChange={(e) => updateBlock(index, { ...block, language: e.target.value } as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D7DA3]"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="jsx">JSX</option>
                  <option value="tsx">TSX</option>
                </select>
              </div>
              <textarea
                value={codeBlockData.code || ''}
                onChange={(e) => updateBlock(index, { ...block, code: e.target.value } as any)}
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D7DA3] resize-none font-mono text-sm"
                placeholder="Paste your code here..."
              />
            </div>
          </div>
        );

      case 'button':
        const buttonBlock = block as any;
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
            <div className="space-y-4">
              <input
                type="text"
                value={buttonBlock.text || ''}
                onChange={(e) => updateBlock(index, { ...block, text: e.target.value } as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D7DA3]"
                placeholder="Button text..."
              />
              <div className="flex gap-2">
                <select
                  value={buttonBlock.variant || 'primary'}
                  onChange={(e) => updateBlock(index, { ...block, variant: e.target.value } as any)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D7DA3]"
                >
                  <option value="primary">Primary (Dark)</option>
                  <option value="secondary">Secondary (Gray)</option>
                  <option value="ghost">Ghost (Outline)</option>
                </select>
                <input
                  type="text"
                  value={buttonBlock.action || ''}
                  onChange={(e) => updateBlock(index, { ...block, action: e.target.value } as any)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D7DA3]"
                  placeholder="Action (counter, etc)..."
                />
              </div>
            </div>
          </div>
        );

      case 'list':
        const listBlock = block as any;
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
            <div className="space-y-4">
              <div className="flex gap-2">
                <select
                  value={listBlock.variant || 'bullet'}
                  onChange={(e) => updateBlock(index, { ...block, variant: e.target.value } as any)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D7DA3]"
                >
                  <option value="bullet">Bullet Points</option>
                  <option value="numbered">Numbered List</option>
                  <option value="checkmark">Checkmarks</option>
                </select>
                <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white">
                  <input
                    type="checkbox"
                    checked={listBlock.colored || false}
                    onChange={(e) => updateBlock(index, { ...block, colored: e.target.checked } as any)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Colored</span>
                </label>
              </div>
              <div className="space-y-2">
                {(listBlock.items || []).map((item: string, itemIndex: number) => (
                  <div key={itemIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newItems = [...listBlock.items];
                        newItems[itemIndex] = e.target.value;
                        updateBlock(index, { ...block, items: newItems } as any);
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D7DA3]"
                      placeholder={`Item ${itemIndex + 1}...`}
                    />
                    <button
                      onClick={() => {
                        const newItems = listBlock.items.filter((_: any, i: number) => i !== itemIndex);
                        updateBlock(index, { ...block, items: newItems } as any);
                      }}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      title="Remove item"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newItems = [...(listBlock.items || []), ''];
                    updateBlock(index, { ...block, items: newItems } as any);
                  }}
                  className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#4D7DA3] hover:bg-white transition-colors text-gray-600 font-medium"
                >
                  + Add Item
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return <BlogRenderer content={{ blocks: [block] }} />;
    }
  }
}