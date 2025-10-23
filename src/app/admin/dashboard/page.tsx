'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/posts');
      if (res.ok) {
        const posts = await res.json();
        setStats({
          total: posts.length,
          published: posts.filter((p: any) => p.status === 'published').length,
          drafts: posts.filter((p: any) => p.status === 'draft').length,
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const statCards = [
    { label: 'Total Posts', value: stats.total, color: 'bg-[#4D7DA3]', icon: '📝' },
    { label: 'Published', value: stats.published, color: 'bg-[#10B981]', icon: '✅' },
    { label: 'Drafts', value: stats.drafts, color: 'bg-[#F59E0B]', icon: '📄' },
  ];

  return (
    <div className="min-h-screen bg-[#E2F3F2]">
      <div className="max-w-[1400px] mx-auto p-4">
        <div className="bg-white rounded-[32px] shadow-xl border border-[#4D7DA3]/10 overflow-hidden">
          <div className="px-8 md:px-16 py-8 border-b border-[#4D7DA3]/10">
            <h1 className="text-4xl font-bold text-[#153230]">Admin Dashboard</h1>
            <p className="text-[#153230]/60 mt-2">Manage your interactive blog</p>
          </div>

          <div className="px-8 md:px-16 py-12">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {statCards.map((stat, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{stat.icon}</span>
                    <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center text-white text-2xl font-bold`}>
                      {stat.value}
                    </div>
                  </div>
                  <h3 className="text-[#153230] font-semibold text-lg">{stat.label}</h3>
                </div>
              ))}
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#153230] mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link
                  href="/admin/posts/new"
                  className="p-8 bg-[#4D7DA3] hover:bg-[#4D7DA3]/90 rounded-2xl text-white transition-all hover:shadow-xl hover:scale-[1.02]"
                >
                  <div className="text-4xl mb-3">✍️</div>
                  <div className="font-bold text-2xl mb-2">Create New Post</div>
                  <div className="text-white/80 text-sm">Start writing a new interactive article</div>
                </Link>
                <Link
                  href="/admin/media"
                  className="p-8 bg-white border-2 border-gray-200 hover:border-[#4D7DA3] rounded-2xl transition-all hover:shadow-xl hover:scale-[1.02]"
                >
                  <div className="text-4xl mb-3">🖼️</div>
                  <div className="font-bold text-2xl mb-2 text-[#153230]">Manage Media</div>
                  <div className="text-[#153230]/60 text-sm">Upload and organize images</div>
                </Link>
                <Link
                  href="/admin/posts"
                  className="p-8 bg-white border-2 border-gray-200 hover:border-[#4D7DA3] rounded-2xl transition-all hover:shadow-xl hover:scale-[1.02]"
                >
                  <div className="text-4xl mb-3">📋</div>
                  <div className="font-bold text-2xl mb-2 text-[#153230]">All Posts</div>
                  <div className="text-[#153230]/60 text-sm">View and edit your posts</div>
                </Link>
                <Link
                  href="/blog"
                  target="_blank"
                  className="p-8 bg-white border-2 border-gray-200 hover:border-[#4D7DA3] rounded-2xl transition-all hover:shadow-xl hover:scale-[1.02]"
                >
                  <div className="text-4xl mb-3">👁️</div>
                  <div className="font-bold text-2xl mb-2 text-[#153230]">View Blog</div>
                  <div className="text-[#153230]/60 text-sm">See your published content</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}