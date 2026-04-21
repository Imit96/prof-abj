'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Portrait image — saved at /public/prof-img/prof-bw.jpg
const HERO_PORTRAIT = '/prof-img/prof-bw.jpg';

/* ─── Data ─────────────────────────────────────────────────────── */


const pillars = [
  {
    num: '01',
    title: 'The Drosophila Model',
    body: 'By interrogating Drosophila melanogaster, we gain unparalleled mechanistic clarity on how environmental toxicants compromise cellular antioxidant defences — insights that translate directly to human health.',
    href: '/research',
  },
  {
    num: '02',
    title: 'Capacity Building Across Africa',
    body: "The DRTC was founded on a conviction: that world-class toxicological science must be cultivated on African soil. We train, mentor, and equip the continent's next generation of biochemists.",
    href: '/lab',
  },
  {
    num: '03',
    title: 'Faith, Family & Purpose',
    body: 'Scientific rigour and deep personal conviction are not opposites. Every experiment, every paper, every student shaped reflects a life lived in deliberate service to God, family, and humanity.',
    href: '/personal',
  },
];

/* ─── Component ─────────────────────────────────────────────────── */
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    /* ── Hero entrance — stagger in from initial state ── */
    const tl = gsap.timeline();
    tl.fromTo('.hero-bg',
      { scale: 1.08, filter: 'blur(6px)', opacity: 0 },
      { scale: 1, filter: 'blur(0px)', opacity: 1, duration: 2.8, ease: 'power2.out' }
    )
    .fromTo('.hero-eyebrow',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 1.1, ease: 'power3.out' },
      '-=2.2'
    )
    .fromTo('.hero-h1',
      { opacity: 0, y: 50, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out' },
      '-=0.9'
    )
    .fromTo('.hero-sub',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo('.hero-ctas',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      '-=0.7'
    )
    .fromTo('.hero-scroll-hint',
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      '-=0.3'
    );

    /* ── Spotlight glow — cursor only, no element movement ── */
    const hero = heroRef.current;
    if (!hero) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      const rect = hero.getBoundingClientRect();
      gsap.to(spotlightRef.current, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        duration: 0.5, ease: 'power1.out', overwrite: 'auto',
      });
    };

    const isTouch = !window.matchMedia('(hover: hover)').matches;
    if (!isTouch) {
      hero.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      hero.removeEventListener('mousemove', onMouseMove);
    };



    /* ── Philosophy pillars ── */
    gsap.utils.toArray('.pillar-card').forEach((card: any, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
          },
          delay: i * 0.1,
        }
      );
    });

    /* ── Research teaser ── */
    ScrollTrigger.create({
      trigger: '.research-teaser',
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo('.research-teaser',
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' }
        );
      },
      once: true,
    });

    /* ── Quote reveal ── */
    ScrollTrigger.create({
      trigger: '.quote-section',
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.quote-text',
          { opacity: 0, y: 30, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }
        );
      },
      once: true,
    });

    /* ── CTA section ── */
    ScrollTrigger.create({
      trigger: '.final-cta',
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.final-cta > *',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
        );
      },
      once: true,
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — FULLSCREEN CINEMATIC HERO
      ═══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full h-[100svh] overflow-hidden bg-primary flex"
        style={{ perspective: '1200px' }}
      >
        {/* ── Layer 1: Background texture — subtle, unified ── */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/page-img/background.png"
            alt=""
            fill priority
            className="object-cover object-center"
          />
          {/* Consistent overlay — no left/right contrast split */}
          <div className="absolute inset-0 bg-primary/70" />
        </div>

        {/* ── Layer 2: Professor portrait — cover on mobile, contain on desktop ── */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <Image
            src="/prof-img/prof-bw.png"
            alt="Professor Amos Abolaji"
            fill priority
            className="object-cover md:object-contain object-top md:object-bottom"
          />
        </div>

        {/* Soft bottom fade so CTAs have clean contrast */}
        <div className="absolute bottom-0 inset-x-0 z-[2] h-32 bg-gradient-to-t from-primary/80 to-transparent pointer-events-none" />

        {/* ── Cursor spotlight — sits over portrait on right side ── */}
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,195,60,0.06) 0%, transparent 70%)',
            filter: 'blur(2px)',
          }}
        />

        {/* ── Left vertical sidebar rail ── */}
        <div
          className="hero-eyebrow relative z-[3] flex flex-col items-center justify-between py-10 pl-6 pr-0 w-14 shrink-0"
        >
          <div className="flex-1 flex items-center">
            <p
              className="font-sans text-[9px] uppercase tracking-[0.28em] text-background/30 font-medium whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Biochemist · Toxicologist · Ibadan
            </p>
          </div>
          <div className="w-[1px] h-20 bg-background/10" />
          <p
            className="hero-scroll-hint font-sans text-[9px] tracking-[0.2em] text-secondary/50 font-bold mt-4 whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Est. 2002
          </p>
        </div>

        {/* Thin vertical dividing line */}
        <div className="relative z-[3] w-[1px] bg-background/10 self-stretch" />

        {/* ── Main content ── */}
        <div className="relative z-[3] flex flex-col justify-between flex-1 px-8 md:px-16 pt-32 pb-10 overflow-hidden">

          {/* Top metadata row */}
          <div className="flex items-center gap-8">
            <div>
              <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-secondary font-bold mb-1">Institution</p>
              <p className="font-sans text-xs text-background/45">University of Ibadan</p>
            </div>
            <div className="w-[1px] h-6 bg-background/15 hidden md:block" />
            <div className="hidden md:block">
              <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-secondary font-bold mb-1">Department</p>
              <p className="font-sans text-xs text-background/45">Biochemistry</p>
            </div>
            <div className="w-[1px] h-6 bg-background/15 hidden lg:block" />
            <div className="hidden lg:block">
              <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-secondary font-bold mb-1">Focus</p>
              <p className="font-sans text-xs text-background/45">Drosophila · Neurotoxicology</p>
            </div>
          </div>

          {/* Centre mass — massive editorial headline */}
          <div className="flex-1 flex flex-col justify-center max-w-3xl">
            <h1
              className="hero-h1 font-serif text-[clamp(3.5rem,10vw,8.5rem)] text-background font-bold leading-[0.9] tracking-tight mb-6"
              style={{ willChange: 'transform' }}
            >
              Amos<br />
              <span className="text-secondary">Abolaji</span>
            </h1>
            <p
              className="hero-sub font-sans text-sm md:text-base text-background/55 font-light tracking-wide"
              style={{ willChange: 'transform' }}
            >
              &mdash; Professor of Biochemistry &amp; Molecular Toxicology
            </p>
          </div>

          {/* Bottom row — CTAs + scroll hint */}
          <div
            className="hero-ctas flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10"
            style={{ willChange: 'transform' }}
          >
            <Link
              href="/research"
              className="font-sans text-[11px] uppercase tracking-[0.22em] font-bold text-secondary border-b border-secondary pb-0.5 hover:opacity-70 transition-opacity"
            >
              Explore Research →
            </Link>
            <Link
              href="/cv"
              className="font-sans text-[11px] uppercase tracking-[0.22em] font-medium text-background/40 hover:text-background/70 transition-colors"
            >
              View Full CV
            </Link>
            <div className="sm:ml-auto flex items-center gap-3">
              <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-background/20">Scroll</span>
              <div className="w-8 h-[1px] bg-background/15 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — STATS / SOCIAL PROOF BAR
      ═══════════════════════════════════════════════════════════ */}


      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — THE BELIEF (Storyline 04 anchor)
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-32 px-8 md:px-24">
        <div className="max-w-5xl mx-auto">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold mb-10">The Philosophy</p>
          <h2 className="font-serif text-4xl md:text-6xl text-primary leading-tight mb-16 max-w-4xl">
            &ldquo;The smallest organisms carry the largest truths about human vulnerability.&rdquo;
          </h2>
          <p className="text-ink/70 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
            For over two decades, Professor Abolaji has built his scientific life around a single conviction: that rigorous, question-driven research — not prestige, not funding alone — is the engine of meaningful progress. That conviction drives every paper, every student mentored, every workshop delivered across Africa.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — THREE PILLARS (Philosophy in action)
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-primary py-32 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold mb-16">Three Pillars</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-background/10">
            {pillars.map(({ num, title, body, href }) => (
              <Link
                key={num}
                href={href}
                className="pillar-card group bg-primary p-10 md:p-14 hover:bg-[#1a2540] transition-colors duration-500"
              >
                <p className="font-serif text-6xl text-background/10 font-bold mb-8 group-hover:text-secondary/20 transition-colors duration-500">{num}</p>
                <h3 className="font-serif text-2xl md:text-3xl text-background mb-6 group-hover:text-secondary transition-colors duration-300">{title}</h3>
                <p className="text-background/60 font-light leading-relaxed text-base">{body}</p>
                <span className="mt-8 inline-block text-[10px] uppercase tracking-[0.2em] font-bold text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — RESEARCH SPOTLIGHT (Dark editorial)
      ═══════════════════════════════════════════════════════════ */}
      <section className="research-teaser bg-ash py-32 px-8 md:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold mb-8">Featured Research</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight mb-8">
              The Fruit Fly Frontier
            </h2>
            <p className="text-ink/70 text-lg font-light leading-relaxed mb-6">
              <em>Drosophila melanogaster</em> shares over 75% of its disease-related genes with humans. Professor Abolaji&apos;s lab exploits this genetic kinship to model environmental toxicity, reproductive dysfunction, and neurodegeneration — generating hypotheses that would take years to develop in mammalian models.
            </p>
            <p className="text-ink/70 text-lg font-light leading-relaxed mb-12">
              Current projects span herbicide toxicity, phytochemical neuroprotection, and the biochemical underpinnings of fertility impairment — all interrogated through this powerful in-vivo model.
            </p>
            <Link
              href="/research"
              className="inline-block font-sans text-[11px] uppercase tracking-[0.18em] font-bold border-b-2 border-secondary text-primary pb-1 hover:text-secondary transition-colors duration-300"
            >
              View All Projects &rarr;
            </Link>
          </div>
          <div className="relative h-80 lg:h-full min-h-[420px] overflow-hidden rounded-sm">
            <Image
              src="/page-img/Biochemistry Research Close-up.png"
              alt="Biochemistry research close-up in the DRTC lab"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — QUOTE / PHILOSOPHY STATEMENT
      ═══════════════════════════════════════════════════════════ */}
      <section className="quote-section bg-primary py-40 px-8 md:px-24 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-16 h-[1px] bg-secondary mx-auto mb-16" />
          <blockquote className="quote-text font-serif text-3xl md:text-5xl text-background leading-snug font-light italic mb-16">
            "Science without conscience is the ruin of the soul. We do this work because lives depend on truth."
          </blockquote>
          <cite className="font-sans text-[11px] uppercase tracking-[0.25em] text-secondary not-italic">
            — Professor Amos Abolaji
          </cite>
          <div className="w-16 h-[1px] bg-secondary mx-auto mt-16" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7 — FINAL CTA
      ═══════════════════════════════════════════════════════════ */}
      <section className="final-cta bg-ash py-32 px-8 md:px-24 text-center border-t border-primary/10">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold">Collaborate &middot; Connect &middot; Inquire</p>
          <h2 className="font-serif text-4xl md:text-6xl text-primary">Ready to explore a partnership?</h2>
          <p className="text-ink/70 text-lg font-light max-w-xl mx-auto leading-relaxed">
            Whether you are a potential collaborator, a prospective student, or a journalist — Professor Abolaji welcomes conversations built on curiosity and shared purpose.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/contact"
              className="px-10 py-4 bg-primary text-background font-bold font-sans text-xs uppercase tracking-[0.18em] hover:bg-secondary hover:text-primary transition-all duration-300"
            >
              Get in Touch
            </Link>
            <Link
              href="/lab"
              className="px-10 py-4 border-2 border-primary text-primary font-sans text-xs uppercase tracking-[0.18em] hover:bg-primary hover:text-background transition-all duration-300"
            >
              Visit the DRTC Lab
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
