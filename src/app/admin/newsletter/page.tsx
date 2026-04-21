'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

export default function AdminNewsletterPage() {
  const subscribers = useQuery(api.newsletter.list);

  const handleCopyAll = () => {
    if (!subscribers) return;
    const emails = subscribers.map((s) => s.email).join(', ');
    navigator.clipboard.writeText(emails);
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-start mb-12">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-secondary font-bold mb-2">Subscribers</p>
          <h2 className="font-serif text-4xl text-primary">Newsletter</h2>
        </div>
        {subscribers && subscribers.length > 0 && (
          <button
            onClick={handleCopyAll}
            className="px-8 py-3 border-2 border-primary text-primary text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary hover:text-background transition-all"
          >
            Copy All Emails
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-primary/5 overflow-hidden">
        {subscribers === undefined ? (
          <p className="px-8 py-12 text-center text-ink/40">Loading…</p>
        ) : subscribers.length === 0 ? (
          <p className="px-8 py-16 text-center text-ink/40">No subscribers yet. The form is live on the footer of every page.</p>
        ) : (
          <>
            <div className="px-8 py-4 bg-ash/40 border-b border-primary/5">
              <p className="text-xs uppercase tracking-widest text-ink/50 font-bold">
                {subscribers.length} total {subscribers.length === 1 ? 'subscriber' : 'subscribers'}
              </p>
            </div>
            <ul className="divide-y divide-primary/5">
              {subscribers.map((s) => (
                <li key={s._id} className="px-8 py-4 flex justify-between items-center text-sm">
                  <span className="text-ink font-medium">{s.email}</span>
                  <span className="text-xs text-ink/30">
                    {new Date(s._creationTime).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
