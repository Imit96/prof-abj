'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewsPage() {
  const [tab, setTab] = useState<'journal' | 'blog'>('journal');

  return (
    <main className="pt-32 pb-32 min-h-[100svh] px-8 md:px-24 bg-background">
      <h1 className="font-serif text-5xl md:text-6xl text-primary tracking-tight mb-16">News & Data</h1>
      
      <div className="flex gap-8 mb-16 border-b border-primary/10 pb-4 overflow-x-auto">
        <button 
          onClick={() => setTab('journal')}
          className={`text-xl md:text-2xl whitespace-nowrap font-serif transition-colors relative ${tab === 'journal' ? 'text-secondary' : 'text-primary/40 hover:text-primary'}`}
        >
          Academic Journal
          {tab === 'journal' && <motion.div layoutId="underline" className="absolute -bottom-[18px] left-0 right-0 h-[2px] bg-secondary" />}
        </button>
        <button 
          onClick={() => setTab('blog')}
          className={`text-xl md:text-2xl whitespace-nowrap font-serif transition-colors relative ${tab === 'blog' ? 'text-secondary' : 'text-primary/40 hover:text-primary'}`}
        >
           Personal Blog
          {tab === 'blog' && <motion.div layoutId="underline" className="absolute -bottom-[18px] left-0 right-0 h-[2px] bg-secondary" />}
        </button>
      </div>

      <div className="space-y-16 max-w-4xl">
        {tab === 'journal' ? (
           <article className="group cursor-pointer">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-secondary mb-3">March 12, 2026</p>
              <h2 className="text-3xl md:text-4xl font-serif text-primary group-hover:text-secondary transition-colors duration-300 mb-4">Mechanism of Toxicity in Drosophila Melanogaster</h2>
              <p className="text-ink/80 text-lg md:text-xl font-light leading-relaxed">A deep dive into our latest paper investigating the oxidative stress pathways triggered by environmental toxicants using the fruit fly model.</p>
           </article>
        ) : (
           <article className="group cursor-pointer">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-secondary mb-3">April 05, 2026</p>
              <h2 className="text-3xl md:text-4xl font-serif text-primary group-hover:text-secondary transition-colors duration-300 mb-4">Reflections on Capacity Building in Africa</h2>
              <p className="text-ink/80 text-lg md:text-xl font-light leading-relaxed">Training the next generation of biochemists requires more than just lab equipment; it requires a foundational shift in mentorship and philosophy.</p>
           </article>
        )}
      </div>
    </main>
  );
}
