'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Post {
  id: number;
  title: string;
  slug: string;
  category: string;
  status: string;
  updatedAt: string;
  readTime: string;
}

export default function PostsListPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/posts');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const filteredPosts = posts
    .filter(post => filter === 'all' || post.status === filter)
    .filter(post => 
      search === '' || 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.slug.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-[#E2F3F2]">
      <div className="max-w-[1400px] mx-auto p-4">
        <div className="bg-white rounded-[32px] shadow-xl border border-[#4D7DA3]/10 overflow-hidden">
          <div className="px-8 md:px-16 py-8 border-b border-[#4D7DA3]/10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-[#153230]">All Posts</h1>
                <p className="text-[#153230]/60 mt-2">Manage your blog content</p>
              </div>
              <Link
                href="/admin/posts/new"
                className="px-6 py-3 bg-[#4D7DA3] hover:bg-[#4D7DA3]/90 text-white font-semibold rounded-lg transition-all hover:shadow-lg"
              >
                + New Post
              </Link>
            </div>
          </div>

          <div className="px-8 md:px-16 py-8">
            <div className="flex flex-wrap gap-4 items-center mb-8">
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    filter === 'all'
                      ? 'bg-[#153230] text-white'
                      : 'bg-white border border-gray-200 text-[#153230]/70 hover:border-[#4D7DA3] hover:text-[#153230]'
                  }`}
                >
                  All ({posts.length})
                </button>
                <button
                  onClick={() => setFilter('published')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    filter === 'published'
                      ? 'bg-[#10B981] text-white'
                      : 'bg-white border border-gray-200 text-[#153230]/70 hover:border-[#10B981] hover:text-[#10B981]'
                  }`}
                >
                  Published ({posts.filter(p => p.status === 'published').length})
                </button>
                <button
                  onClick={() => setFilter('draft')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    filter === 'draft'
                      ? 'bg-[#F59E0B] text-white'
                      : 'bg-white border border-gray-200 text-[#153230]/70 hover:border-[#F59E0B] hover:text-[#F59E0B]'
                  }`}
                >
                  Drafts ({posts.filter(p => p.status === 'draft').length})
                </button>
              </div>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search posts..."
                className="flex-1 min-w-[200px] px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D7DA3] text-[#153230]"
              />
            </div>

            {loading ? (
              <div className="text-center py-12 text-[#153230]/60">Loading posts...</div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12 text-[#153230]/60">
                No posts found. <Link href="/admin/posts/new" className="text-[#4D7DA3] hover:underline font-semibold">Create your first post</Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {post.category && (
                          <span className="px-3 py-1 bg-[#4D7DA3]/10 text-[#4D7DA3] rounded-lg text-xs font-bold">
                            {post.category}
                          </span>
                        )}
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          post.status === 'published'
                            ? 'bg-[#10B981]/10 text-[#10B981]'
                            : 'bg-[#F59E0B]/10 text-[#F59E0B]'
                        }`}>
                          {post.status}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#153230] mb-2 line-clamp-2">
                        {post.title}
                      </h3>

                      <div className="text-xs text-[#153230]/50 mb-4">
                        Updated {new Date(post.updatedAt).toLocaleDateString()}
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/admin/posts/${post.id}`}
                          className="flex-1 px-4 py-2 bg-[#153230] hover:bg-[#153230]/90 text-white text-sm font-semibold rounded-lg text-center transition-colors"
                        >
                          Edit
                        </Link>
                        {post.status === 'published' && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="px-4 py-2 bg-white border border-gray-300 hover:border-[#4D7DA3] text-[#153230]/70 hover:text-[#4D7DA3] text-sm font-semibold rounded-lg transition-colors"
                          >
                            View
                          </Link>
                        )}
                        <button
                          onClick={() => deletePost(post.id)}
                          className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold rounded-lg transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}