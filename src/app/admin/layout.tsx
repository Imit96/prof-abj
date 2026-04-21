'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const navItems = [
  { href: '/admin', label: 'Overview', icon: '◈' },
  { href: '/admin/posts', label: 'Posts', icon: '✦' },
  { href: '/admin/contacts', label: 'Inbox', icon: '◉' },
  { href: '/admin/newsletter', label: 'Newsletter', icon: '◎' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const path = usePathname();

  return (
    <div className="min-h-screen flex bg-ash font-sans">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-primary text-background flex flex-col">
        <div className="px-8 py-8 border-b border-background/10">
          <p className="text-[10px] uppercase tracking-[0.25em] text-secondary font-bold mb-1">Admin Panel</p>
          <h1 className="font-serif text-xl text-background">Dr. Amos Abolaji</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map(({ href, label, icon }) => {
            const active = path === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                  active
                    ? 'bg-secondary/20 text-secondary font-bold'
                    : 'text-background/60 hover:bg-background/5 hover:text-background'
                }`}
              >
                <span className="text-base">{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-8 py-6 border-t border-background/10">
          <Link
            href="/"
            className="text-xs text-background/40 hover:text-secondary transition-colors uppercase tracking-widest"
          >
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
