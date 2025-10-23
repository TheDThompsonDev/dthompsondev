'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { BlogContent, ContentBlock } from '@/types/blog';
import { AVAILABLE_COMPONENTS } from '@/lib/components-registry';
import { BlogRenderer } from '@/components/BlogRenderer';
import Link from 'next/link';

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [showToolbar, setShowToolbar] = useState(true);
  const [showComponentMenu, setShowComponentMenu] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [featured, setFeatured] = useState(false);
  const [readTime, setReadTime] = useState('');
  const [content, setContent] = useState<BlogContent>({ blocks: [] });
  const [editingBlock, setEditingBlock] = useState<number | null>(null);
  const [showMetadata, setShowMetadata] = useState(false);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowComponentMenu((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

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

  const addBlock = (type: string) => {
    const config = AVAILABLE_COMPONENTS[type];
    if (!config) return;

    const newBlock = { ...config.defaultData } as ContentBlock;
    setContent({
      blocks: [...content.blocks, newBlock],
    });
    setShowComponentMenu(false);
    setEditingBlock(content.blocks.length);
  };

  const updateBlock = (index: number, updatedBlock: ContentBlock) => {
    const newBlocks = [...content.blocks];
    newBlocks[index] = updatedBlock;
    setContent({ blocks: newBlocks });
  };

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
      alert('Title and slug are required');
      return;
    }

    setSaving(true);
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
          await fetch(`/api/admin/posts/${post.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'published' }),
          });
        }

        router.push('/admin/posts');
      } else {
        alert('Failed to save post');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Floating Toolbar - Positioned within content area */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-[1400px] pointer-events-none z-40">
        <div className="relative w-full px-4">
          <div className="absolute right-8 bg-white rounded-2xl shadow-2xl border border-[#4D7DA3]/20 p-2 flex flex-col gap-2 pointer-events-auto">
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
          </div>
        </div>
      )}

      {/* Component Menu */}
      {showComponentMenu && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setShowComponentMenu(false)}>
          <div className="fixed top-48 left-1/2 -translate-x-1/2 w-full max-w-[1400px] pointer-events-none">
            <div className="relative w-full px-4">
              <div className="absolute right-8 w-80 bg-white rounded-2xl shadow-2xl border border-[#4D7DA3]/20 p-4 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#153230]">Add Component</h3>
                  <button
                    onClick={() => setShowComponentMenu(false)}
                    className="text-[#153230]/60 hover:text-[#153230] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-[500px] overflow-y-auto">
                  {Object.entries(AVAILABLE_COMPONENTS).map(([type, config]) => (
                    <button
                      key={type}
                      onClick={() => addBlock(type)}
                      className="p-3 bg-gray-50 hover:bg-[#4D7DA3]/10 rounded-xl text-left transition-colors border border-gray-200 hover:border-[#4D7DA3]"
                    >
                      <div className="text-2xl mb-1">{config.icon}</div>
                      <div className="text-sm font-semibold text-[#153230]">{config.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog-Style Editor */}
      <div className="min-h-screen bg-[#E2F3F2] pb-20">
        <div className="max-w-[1400px] mx-auto p-4">
          <div className="bg-white rounded-[32px] shadow-xl border border-gray-100">
            {/* Header with Back Button */}
            <div className="px-8 md:px-16 py-6 border-b border-[#4D7DA3]/10">
              <Link href="/admin/posts" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-[#153230] rounded-xl flex items-center justify-center text-white text-lg font-bold">
                  ←
                </div>
                <span className="text-lg font-bold tracking-tight text-[#153230]">Back to Posts</span>
              </Link>
            </div>

            <div className="px-8 md:px-16 py-12 max-w-4xl mx-auto">
              {/* Editable Title */}
              <div className="mb-12">
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
                  className="w-full text-5xl md:text-6xl font-bold text-[#153230] leading-tight mb-6 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-300"
                  placeholder="Post title..."
                />
                
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  className="w-full text-xl text-[#153230]/70 leading-relaxed bg-transparent border-none focus:outline-none focus:ring-0 resize-none placeholder-gray-300"
                  placeholder="Brief excerpt that summarizes your post..."
                />
                
                {readTime && (
                  <div className="mt-4 text-sm text-gray-500">
                    {readTime} read
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {content.blocks.map((block, index) => (
                  <div
                    key={index}
                    className="group relative"
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
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(index, { ...block, content: e.target.value })}
            rows={3}
            className="w-full px-0 py-2 text-gray-700 leading-relaxed bg-transparent border-none focus:outline-none resize-none text-lg"
            placeholder="Start typing..."
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
      
      default:
        return <BlogRenderer content={{ blocks: [block] }} />;
    }
  }
}