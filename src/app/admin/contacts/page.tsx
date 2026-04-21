'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

export default function AdminContactsPage() {
  const contacts = useQuery(api.contacts.list);
  const markRead = useMutation(api.contacts.markRead);
  const [expanded, setExpanded] = useState<Id<'contacts'> | null>(null);

  const handleOpen = async (id: Id<'contacts'>, isRead: boolean) => {
    setExpanded(expanded === id ? null : id);
    if (!isRead) {
      await markRead({ id });
    }
  };

  const unread = contacts?.filter((c) => !c.isRead).length ?? 0;

  return (
    <div className="p-10">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-secondary font-bold mb-2">Inbox</p>
        <h2 className="font-serif text-4xl text-primary">
          Contact Messages
          {unread > 0 && (
            <span className="ml-4 text-lg bg-secondary text-primary font-bold px-3 py-1 rounded-full">
              {unread} new
            </span>
          )}
        </h2>
      </div>

      <div className="bg-white rounded-xl border border-primary/5 overflow-hidden">
        {contacts === undefined ? (
          <p className="px-8 py-12 text-center text-ink/40">Loading…</p>
        ) : contacts.length === 0 ? (
          <p className="px-8 py-16 text-center text-ink/40">No messages received yet.</p>
        ) : (
          <div className="divide-y divide-primary/5">
            {contacts.map((c) => (
              <div key={c._id}>
                <button
                  onClick={() => handleOpen(c._id, c.isRead)}
                  className="w-full px-8 py-5 flex items-start gap-4 text-left hover:bg-ash/50 transition-colors group"
                >
                  <span className={`mt-1.5 shrink-0 w-2 h-2 rounded-full transition-all ${c.isRead ? 'bg-transparent' : 'bg-secondary'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4">
                      <p className={`font-medium text-sm ${c.isRead ? 'text-ink/60' : 'text-primary'}`}>{c.name}</p>
                      <p className="text-xs text-ink/30 shrink-0">{new Date(c._creationTime).toLocaleDateString()}</p>
                    </div>
                    <p className="text-xs text-ink/40 mt-0.5">{c.email} · {c.subject}</p>
                    {expanded !== c._id && (
                      <p className="text-sm text-ink/50 mt-2 truncate">{c.message}</p>
                    )}
                  </div>
                </button>
                {expanded === c._id && (
                  <div className="px-8 pb-8 pl-16 bg-ash/30">
                    <div className="border-l-2 border-secondary pl-6">
                      <p className="text-sm text-ink/80 leading-relaxed whitespace-pre-wrap">{c.message}</p>
                    </div>
                    <a
                      href={`mailto:${c.email}?subject=Re: ${c.subject}`}
                      className="inline-block mt-6 text-xs uppercase tracking-[0.2em] font-bold text-secondary border-b border-secondary pb-0.5 hover:opacity-70"
                    >
                      Reply via Email →
                    </a>
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
