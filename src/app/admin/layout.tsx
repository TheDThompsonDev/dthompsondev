'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#E2F3F2]">
      <nav className="bg-white border-b border-[#4D7DA3]/10 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Link href="/admin/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 bg-[#153230] rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                  DT
                </div>
                <span className="text-xl font-bold tracking-tight text-[#153230]">Admin</span>
              </Link>
              
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/admin/dashboard"
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    pathname === '/admin/dashboard'
                      ? 'bg-[#153230] text-white'
                      : 'text-[#153230]/70 hover:text-[#153230] hover:bg-[#E2F3F2]'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/posts"
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    pathname.startsWith('/admin/posts')
                      ? 'bg-[#153230] text-white'
                      : 'text-[#153230]/70 hover:text-[#153230] hover:bg-[#E2F3F2]'
                  }`}
                >
                  Posts
                </Link>
                <Link
                  href="/admin/media"
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    pathname === '/admin/media'
                      ? 'bg-[#153230] text-white'
                      : 'text-[#153230]/70 hover:text-[#153230] hover:bg-[#E2F3F2]'
                  }`}
                >
                  Media
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                className="text-sm text-[#153230]/70 hover:text-[#4D7DA3] font-semibold transition-colors"
              >
                View Site →
              </Link>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 text-sm font-semibold text-white bg-[#153230] hover:bg-[#153230]/90 rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}