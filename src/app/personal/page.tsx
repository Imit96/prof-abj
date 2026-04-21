'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const beliefs = [
  {
    num: '01',
    title: 'The Word Above All',
    body: 'For Professor Abolaji, no scientific discovery supersedes the validity of God’s Word. As a devout member of Living Faith Church Worldwide (Winners’ Chapel), his life is anchored on the Liberation Mandate. Science is merely a tool; his primary calling is kingdom advancement.',
  },
  {
    num: '02',
    title: 'Divine Favour, Not Just Intellect',
    body: 'The world demands empirical evidence, but true conviction is born of faith. Before he is a professor or a researcher, he is a believer. Every grant won and breakthrough achieved is a testament to divine favour and putting the Kingdom first in all affairs.',
  },
  {
    num: '03',
    title: 'Family as the First Ministry',
    body: 'True success is not measured in academic citations, but in raising a godly family and fulfilling divine purpose. A dedicated husband and father, Professor Abolaji considers his home to be his most vital assignment.',
  },
];

export default function PersonalPage() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Hero text reveal
    gsap.fromTo('.personal-hero > *',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 1.2, ease: 'power3.out' }
    );

    // Hero image parallax
    gsap.fromTo('.hero-image img', 
      { scale: 1.2, yPercent: 10 },
      { 
        scale: 1, yPercent: -10, ease: 'none',
        scrollTrigger: {
          trigger: '.hero-image',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // Beliefs stagger
    gsap.utils.toArray('.belief-block').forEach((block: any, i) => {
      gsap.fromTo(block,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: block, start: 'top 85%' },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-primary pt-32 pb-24">
      {/* ── Hero ── */}
      <section className="px-8 md:px-24 mb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 personal-hero">
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold mb-6">Spiritual Convictions</p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-background font-bold leading-none mb-8 tracking-tight">
              God First.<br /><span className="text-secondary text-4xl md:text-6xl">Science Follows.</span>
            </h1>
            <p className="text-background/80 text-xl md:text-2xl font-light leading-relaxed mb-6 max-w-xl">
              Professor Abolaji’s story does not find its root in the laboratory, but at the altar. Above every academic accolade, he is foremost a believer whose life bears the undeniable mark of God's grace.
            </p>
            <p className="text-background/50 text-lg font-light leading-relaxed max-w-xl">
              As a committed member of Living Faith Church Worldwide, the foundation of his existence is the Word of Faith. The research and the grants are secondary; seeking the Kingdom of God forms the absolute core of his being.
            </p>
          </div>
          <div className="lg:col-span-6 hero-image h-[600px] md:h-[800px] w-full relative overflow-hidden flex items-end justify-center rounded-lg">
            <Image 
              src="/Images/IMG_1850.JPG" 
              alt="Professor Abolaji reflecting" 
              fill 
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Beliefs ── */}
      <section className="py-24 px-8 md:px-24 bg-ash border-y border-primary/10 relative">
        <div className="max-w-4xl mx-auto items-center">
          <div className="space-y-20">
            {beliefs.map(({ num, title, body }) => (
              <div key={num} className="belief-block">
                <p className="font-serif text-6xl text-primary/10 font-bold mb-4 leading-none">{num}</p>
                <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6 leading-snug">{title}</h2>
                <p className="text-ink/70 text-lg md:text-xl font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing Note ── */}
      <section className="pt-32 pb-16 px-8 md:px-24 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-[1px] bg-secondary/40 mx-auto mb-12" />
          <p className="font-serif text-2xl md:text-4xl text-ink/80 font-light italic leading-relaxed mb-12">
            &ldquo;When you understand that God is the author of all knowledge, you stop treating science as the master. You treat it as a servant to reveal His glory. Matthew 6:33 is not just a verse; it is the summary of my life.&rdquo;
          </p>
          <div className="w-16 h-[1px] bg-secondary/40 mx-auto" />
          <p className="mt-8 text-secondary font-sans tracking-widest uppercase text-sm font-bold">Professor Amos Olalekan Abolaji</p>
        </div>
      </section>
    </main>
  );
}
