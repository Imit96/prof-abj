'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/research', label: 'Research' },
  { href: '/cv', label: 'CV' },
  { href: '/lab', label: 'Lab' },
  { href: '/news', label: 'News' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/personal', label: 'Personal' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Home page has dark hero — other pages have light backgrounds
  const isHomePage = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // On home: transparent → frosted dark. On inner pages: always solid dark.
  const navBg = isHomePage
    ? scrolled
      ? 'bg-primary/90 backdrop-blur-xl shadow-lg shadow-black/20'
      : 'bg-transparent'
    : 'bg-primary shadow-md shadow-black/20';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 transition-all duration-500 ${navBg}`}
      aria-label="Main navigation"
    >
      <Link href="/" className="font-serif text-lg font-bold text-secondary tracking-[0.12em]">
        DR. AMOS ABOLAJI
      </Link>

      {/* Desktop links */}
      <div className="hidden lg:flex gap-7 font-sans text-[11px] uppercase tracking-[0.13em] font-semibold">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`transition-colors duration-200 ${
              pathname === href ? 'text-secondary' : 'text-background/70 hover:text-secondary'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        id="mobile-menu-toggle"
        className="lg:hidden flex flex-col gap-[5px] p-2 text-background"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-label="Toggle navigation menu"
      >
        <span className={`block h-[2px] w-6 bg-current transition-transform duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
        <span className={`block h-[2px] w-6 bg-current transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block h-[2px] w-6 bg-current transition-transform duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-primary/98 backdrop-blur-xl flex flex-col px-8 py-10 gap-7 lg:hidden shadow-2xl border-t border-background/10">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-serif text-background/80 hover:text-secondary text-2xl transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
