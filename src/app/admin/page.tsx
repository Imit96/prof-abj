'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import Link from 'next/link';

function StatCard({ label, value, href }: { label: string; value: number | undefined; href: string }) {
  return (
    <Link href={href} className="block bg-white rounded-xl p-8 border border-primary/5 hover:border-secondary/30 transition-all group">
      <p className="text-xs uppercase tracking-[0.2em] text-ink/50 font-bold mb-3">{label}</p>
      <p className="font-serif text-5xl text-primary group-hover:text-secondary transition-colors">
        {value ?? '—'}
      </p>
    </Link>
  );
}

export default function AdminOverview() {
  const posts = useQuery(api.posts.listAll);
  const contacts = useQuery(api.contacts.list);
  const subscribers = useQuery(api.newsletter.list);

  const unread = contacts?.filter((c) => !c.isRead).length ?? 0;

  return (
    <div className="p-10">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-secondary font-bold mb-2">Dashboard</p>
        <h2 className="font-serif text-4xl text-primary">Overview</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        <StatCard label="Total Posts" value={posts?.length} href="/admin/posts" />
        <StatCard label="Published" value={posts?.filter((p) => p.status === 'published').length} href="/admin/posts" />
        <StatCard label="Unread Messages" value={unread} href="/admin/contacts" />
        <StatCard label="Subscribers" value={subscribers?.length} href="/admin/newsletter" />
      </div>

      {/* Recent Contacts */}
      <div className="bg-white rounded-xl border border-primary/5 overflow-hidden mb-6">
        <div className="px-8 py-6 border-b border-primary/5 flex justify-between items-center">
          <h3 className="font-serif text-xl text-primary">Recent Messages</h3>
          <Link href="/admin/contacts" className="text-xs uppercase tracking-widest text-secondary font-bold hover:opacity-70">View All →</Link>
        </div>
        <div className="divide-y divide-primary/5">
          {contacts === undefined ? (
            <p className="px-8 py-6 text-ink/40 text-sm">Loading…</p>
          ) : contacts.length === 0 ? (
            <p className="px-8 py-6 text-ink/40 text-sm">No messages yet.</p>
          ) : (
            contacts.slice(0, 5).map((c) => (
              <div key={c._id} className="px-8 py-5 flex items-start justify-between gap-4">
                <div>
                  <p className={`font-medium text-sm ${c.isRead ? 'text-ink/50' : 'text-primary'}`}>
                    {!c.isRead && <span className="inline-block w-2 h-2 rounded-full bg-secondary mr-2" />}
                    {c.name}
                  </p>
                  <p className="text-xs text-ink/40 mt-1">{c.email} · {c.subject}</p>
                </div>
                <p className="text-xs text-ink/30 shrink-0">
                  {new Date(c._creationTime).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick create */}
      <Link
        href="/admin/posts?new=1"
        className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-background font-bold text-xs uppercase tracking-[0.2em] hover:bg-secondary hover:text-primary transition-all duration-300"
      >
        <span>+</span> New Post
      </Link>
    </div>
  );
}
