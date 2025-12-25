'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost, BlogContent, ContentBlock } from '@/types/blog';
import { AVAILABLE_COMPONENTS } from '@/lib/components-registry';

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [featured, setFeatured] = useState(false);
  const [coverImage, setCoverImage] = useState('');
  const [readTime, setReadTime] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [content, setContent] = useState<BlogContent>({ blocks: [] });
  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [editingBlock, setEditingBlock] = useState<number | null>(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/admin/posts/${id}`);
      if (res.ok) {
        const data: BlogPost = await res.json();
        setPost(data);
        setTitle(data.title);
        setSlug(data.slug);
        setExcerpt(data.excerpt || '');
        setCategory(data.category || '');
        setFeatured(data.featured);
        setCoverImage(data.coverImageUrl || '');
        setReadTime(data.readTime || '');
        setStatus(data.status);
        setContent(data.content);
      } else {
        alert('Failed to load post');
        router.push('/admin/posts');
      }
    } catch (error) {
      console.error('Load error:', error);
      alert('Failed to load post');
      router.push('/admin/posts');
    } finally {
      setLoading(false);
    }
  };

  const addBlock = (type: string) => {
    const config = AVAILABLE_COMPONENTS[type];
    if (!config) return;

    const newBlock = { ...config.defaultData } as ContentBlock;
    setContent({
      blocks: [...content.blocks, newBlock],
    });
    setShowBlockMenu(false);
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
    if (editingBlock === index) {
      setEditingBlock(null);
    }
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= content.blocks.length) return;

    const newBlocks = [...content.blocks];
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
    setContent({ blocks: newBlocks });
  };

  const savePost = async (newStatus?: 'draft' | 'published') => {
    if (!title || !slug) {
      alert('Title and slug are required');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          category,
          featured,
          coverImageUrl: coverImage,
          readTime: readTime,
          status: newStatus || status,
        }),
      });

      if (res.ok) {
        router.push('/admin/posts');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save post');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-zinc-400">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Post</h1>
          <p className="text-zinc-400 mt-1">
            Status: <span className={status === 'published' ? 'text-green-400' : 'text-yellow-400'}>{status}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => savePost('draft')}
            disabled={saving}
            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button
            onClick={() => savePost('published')}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {status === 'published' ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Slug *
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="post-url-slug"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Tutorial, Guide"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Read Time
            </label>
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 5 min read"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Excerpt
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief description of the post"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Cover Image URL
          </label>
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://..."
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-zinc-800 border-zinc-700 rounded focus:ring-blue-500"
          />
          <label htmlFor="featured" className="ml-2 text-sm font-medium text-zinc-300">
            Featured post
          </label>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Content Blocks</h2>
          <button
            onClick={() => setShowBlockMenu(!showBlockMenu)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            + Add Block
          </button>
        </div>

        {showBlockMenu && (
          <div className="mb-4 p-4 bg-zinc-800 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.entries(AVAILABLE_COMPONENTS).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => addBlock(key)}
                  className="p-3 bg-zinc-900 hover:bg-zinc-700 rounded-lg text-left transition-colors"
                >
                  <div className="text-2xl mb-1">{config.icon}</div>
                  <div className="text-sm font-medium text-white">{config.name}</div>
                  <div className="text-xs text-zinc-400">{config.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {content.blocks.length === 0 ? (
          <div className="text-center py-12 text-zinc-400">
            No content blocks yet. Click "Add Block" to start building your post.
          </div>
        ) : (
          <div className="space-y-3">
            {content.blocks.map((block, index) => (
              <div
                key={index}
                className="p-4 bg-zinc-800 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{AVAILABLE_COMPONENTS[block.type]?.icon}</span>
                    <span className="font-medium text-white">
                      {AVAILABLE_COMPONENTS[block.type]?.name || block.type}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => moveBlock(index, 'up')}
                      disabled={index === 0}
                      className="px-2 py-1 text-zinc-400 hover:text-white disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveBlock(index, 'down')}
                      disabled={index === content.blocks.length - 1}
                      className="px-2 py-1 text-zinc-400 hover:text-white disabled:opacity-30"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => setEditingBlock(editingBlock === index ? null : index)}
                      className="px-2 py-1 text-blue-400 hover:text-blue-300"
                    >
                      ⚙️
                    </button>
                    <button
                      onClick={() => deleteBlock(index)}
                      className="px-2 py-1 text-red-400 hover:text-red-300"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {editingBlock === index && (
                  <div className="mt-3 p-3 bg-zinc-900 rounded">
                    <BlockEditor
                      block={block}
                      onChange={(updated) => updateBlock(index, updated)}
                    />
                  </div>
                )}

                {editingBlock !== index && (
                  <div className="text-sm text-zinc-400">
                    {getBlockPreview(block)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function getBlockPreview(block: ContentBlock): string {
  switch (block.type) {
    case 'text':
      return block.content?.substring(0, 100) || 'Empty text block';
    case 'heading':
      return `H${block.level}: ${block.content || 'Empty heading'}`;
    case 'code-morph':
      return `${block.steps?.length || 0} steps`;
    case 'interactive-code':
      return `${block.examples?.length || 0} examples`;
    case 'animated-diagram':
      return `${block.steps?.length || 0} steps`;
    case 'code-steps':
      return `${block.steps?.length || 0} steps`;
    case 'image':
      return block.alt || 'Image';
    case 'quote':
      return block.content?.substring(0, 50) || 'Empty quote';
    case 'whiteboard':
      return `Whiteboard (${block.height || 400}px)`;
    default:
      return 'Block';
  }
}

function BlockEditor({
  block,
  onChange,
}: {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}) {
  switch (block.type) {
    case 'text':
      return (
        <textarea
          value={block.content || ''}
          onChange={(e) => onChange({ ...block, content: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white"
          placeholder="Enter text content..."
        />
      );

    case 'heading':
      return (
        <div className="space-y-2">
          <select
            value={block.level || 2}
            onChange={(e) => onChange({ ...block, level: parseInt(e.target.value) as 1 | 2 | 3 })}
            className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white"
          >
            <option value="1">H1</option>
            <option value="2">H2</option>
            <option value="3">H3</option>
          </select>
          <input
            type="text"
            value={block.content || ''}
            onChange={(e) => onChange({ ...block, content: e.target.value })}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white"
            placeholder="Heading text..."
          />
        </div>
      );

    case 'image':
      return (
        <div className="space-y-2">
          <input
            type="text"
            value={block.url || ''}
            onChange={(e) => onChange({ ...block, url: e.target.value })}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white"
            placeholder="Image URL"
          />
          <input
            type="text"
            value={block.alt || ''}
            onChange={(e) => onChange({ ...block, alt: e.target.value })}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white"
            placeholder="Alt text"
          />
          <input
            type="text"
            value={block.caption || ''}
            onChange={(e) => onChange({ ...block, caption: e.target.value })}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white"
            placeholder="Caption (optional)"
          />
        </div>
      );

    case 'quote':
      return (
        <div className="space-y-2">
          <textarea
            value={block.content || ''}
            onChange={(e) => onChange({ ...block, content: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white"
            placeholder="Quote text..."
          />
          <input
            type="text"
            value={block.author || ''}
            onChange={(e) => onChange({ ...block, author: e.target.value })}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white"
            placeholder="Author (optional)"
          />
        </div>
      );

    default:
      return (
        <div className="text-zinc-400 text-sm">
          Advanced block editor coming soon. Edit JSON directly for now.
        </div>
      );
  }
}