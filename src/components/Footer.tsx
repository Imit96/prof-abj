'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Footer() {
  const path = usePathname();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const subscribe = useMutation(api.newsletter.subscribe);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await subscribe({ email });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setStatus('idle');
    }
  };

  return (
    <footer className="bg-primary text-background px-8 py-16 md:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 border-b border-background/10 pb-16">
        {/* Brand */}
        <div>
          <Link href="/">
            <h3 className="font-serif text-4xl text-secondary mb-4 hover:opacity-80 transition-opacity">DR. AMOS ABOLAJI</h3>
          </Link>
          <p className="text-background/70 font-light text-lg max-w-sm leading-relaxed">
            Advancing capacity building and toxicological research using{' '}
            <span className="italic">Drosophila melanogaster</span>.
          </p>
        </div>

        {/* Newsletter */}
        <div className="bg-background/5 border border-background/10 rounded-3xl p-8 md:p-10 max-w-lg lg:ml-auto w-full">
          <h4 className="font-serif text-2xl mb-2 text-background">Join the Newsletter</h4>
          <p className="text-background/50 font-light mb-8 text-sm">
            {status === 'success' ? 'Thank you for subscribing!' : 'Research updates, lab news, and academic reflections.'}
          </p>
          <form
            className="flex flex-col sm:flex-row gap-4"
            onSubmit={handleSubmit}
            aria-label="Newsletter signup"
          >
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent border-b border-background/20 pb-2 text-background placeholder:text-background/30 focus:outline-none focus:border-secondary transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="shrink-0 text-secondary font-bold uppercase tracking-[0.15em] text-xs border border-secondary px-6 py-3 hover:bg-secondary hover:text-primary transition-all duration-300 disabled:opacity-50"
            >
              {status === 'submitting' ? '...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-background/40 text-xs gap-6">
        <p>&copy; {new Date().getFullYear()} Dr. Amos Abolaji. All Rights Reserved.</p>
        <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-6 uppercase tracking-widest">
          {[
            { href: '/research', label: 'Research' },
            { href: '/news', label: 'News' },
            { href: '/gallery', label: 'Gallery' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-secondary transition-colors">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
