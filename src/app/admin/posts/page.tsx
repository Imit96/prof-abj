'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

function NewPostForm({ onClose }: { onClose: () => void }) {
  const create = useMutation(api.posts.create);
  const [form, setForm] = useState({
    title: '', slug: '', body: '', type: 'blog' as 'blog' | 'journal', status: 'draft' as 'draft' | 'published',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await create({ ...form, author: 'Prof. Amos Abolaji' });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <div className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-2xl rounded-xl shadow-2xl">
        <div className="px-8 py-6 border-b border-primary/10 flex justify-between items-center">
          <h3 className="font-serif text-2xl text-primary">New Post</h3>
          <button type="button" onClick={onClose} className="text-ink/30 hover:text-primary text-2xl leading-none">&times;</button>
        </div>
        <div className="px-8 py-6 space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-ink/50 font-bold mb-2">Title</label>
            <input
              required className="w-full border-b-2 border-primary/10 pb-2 text-lg focus:outline-none focus:border-secondary transition-colors bg-transparent"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value, slug: autoSlug(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-ink/50 font-bold mb-2">Slug</label>
            <input
              required className="w-full border-b-2 border-primary/10 pb-2 text-sm font-mono focus:outline-none focus:border-secondary transition-colors bg-transparent"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />
          </div>
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-xs uppercase tracking-widest text-ink/50 font-bold mb-2">Type</label>
              <select
                className="w-full border-b-2 border-primary/10 pb-2 text-sm bg-transparent focus:outline-none focus:border-secondary"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as 'blog' | 'journal' })}
              >
                <option value="blog">Blog</option>
                <option value="journal">Journal</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs uppercase tracking-widest text-ink/50 font-bold mb-2">Status</label>
              <select
                className="w-full border-b-2 border-primary/10 pb-2 text-sm bg-transparent focus:outline-none focus:border-secondary"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as 'draft' | 'published' })}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-ink/50 font-bold mb-2">Body</label>
            <textarea
              required rows={10}
              className="w-full border border-primary/10 rounded-lg p-4 text-sm font-mono focus:outline-none focus:border-secondary transition-colors bg-transparent resize-y"
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="Write your post content here..."
            />
          </div>
        </div>
        <div className="px-8 py-6 border-t border-primary/10 flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-primary text-background text-xs uppercase tracking-[0.2em] font-bold hover:bg-secondary hover:text-primary transition-all disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save Post'}
          </button>
          <button type="button" onClick={onClose} className="px-8 py-3 text-ink/50 text-xs uppercase tracking-[0.2em] hover:text-primary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminPostsPage() {
  const posts = useQuery(api.posts.listAll);
  const remove = useMutation(api.posts.remove);
  const update = useMutation(api.posts.update);
  const [showNew, setShowNew] = useState(false);

  const toggleStatus = async (id: Id<'posts'>, current: 'draft' | 'published') => {
    await update({ id, status: current === 'published' ? 'draft' : 'published' });
  };

  return (
    <div className="p-10">
      {showNew && <NewPostForm onClose={() => setShowNew(false)} />}

      <div className="flex justify-between items-start mb-12">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-secondary font-bold mb-2">Content</p>
          <h2 className="font-serif text-4xl text-primary">Posts</h2>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="px-8 py-3 bg-primary text-background text-xs uppercase tracking-[0.2em] font-bold hover:bg-secondary hover:text-primary transition-all"
        >
          + New Post
        </button>
      </div>

      <div className="bg-white rounded-xl border border-primary/5 overflow-hidden">
        {posts === undefined ? (
          <p className="px-8 py-12 text-center text-ink/40">Loading…</p>
        ) : posts.length === 0 ? (
          <div className="px-8 py-16 text-center">
            <p className="text-ink/40 mb-6">No posts yet. Create your first post above.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary/5 text-left">
                <th className="px-8 py-4 text-xs uppercase tracking-widest text-ink/40 font-bold">Title</th>
                <th className="px-4 py-4 text-xs uppercase tracking-widest text-ink/40 font-bold">Type</th>
                <th className="px-4 py-4 text-xs uppercase tracking-widest text-ink/40 font-bold">Status</th>
                <th className="px-4 py-4 text-xs uppercase tracking-widest text-ink/40 font-bold">Date</th>
                <th className="px-8 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-ash/50 group transition-colors">
                  <td className="px-8 py-4">
                    <p className="font-medium text-primary">{post.title}</p>
                    <p className="text-xs text-ink/40 mt-0.5">{post.slug}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs uppercase tracking-widest text-ink/50 font-bold">{post.type}</span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => toggleStatus(post._id, post.status)}
                      className={`text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full transition-colors ${
                        post.status === 'published'
                          ? 'bg-secondary/20 text-secondary'
                          : 'bg-ink/10 text-ink/40'
                      }`}
                    >
                      {post.status}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-xs text-ink/40">
                    {new Date(post._creationTime).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button
                      onClick={() => remove({ id: post._id })}
                      className="text-xs text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
