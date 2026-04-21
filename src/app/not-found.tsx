'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[100svh] px-6 text-center bg-primary text-background">
      <p className="text-secondary font-sans text-xs uppercase tracking-[0.25em] mb-6">404 — Page Not Found</p>
      <h1 className="font-serif text-6xl md:text-8xl text-background mb-8">Lost in the Lab?</h1>
      <p className="text-background/60 text-xl font-light max-w-md leading-relaxed mb-12">
        The page you are looking for does not exist. Let us get you back on track.
      </p>
      <Link
        href="/"
        className="px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] border border-secondary text-secondary hover:bg-secondary hover:text-primary transition-all duration-300"
      >
        Return Home
      </Link>
    </main>
  );
}
