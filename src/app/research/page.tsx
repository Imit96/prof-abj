'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    id: '01',
    tag: 'Reproductive Toxicology',
    title: 'Herbicide-Induced Reproductive Failure',
    body: 'This project examines how chronic low-dose exposure to glyphosate-based herbicides disrupts the reproductive axis in Drosophila — providing mechanistic data on oxidative stress, sperm motility, and fertility biomarkers that map directly onto mammalian reproductive pathways.',
    img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80',
  },
  {
    id: '02',
    tag: 'Neurotoxicology',
    title: 'Phytochemicals as Neuroprotective Agents',
    body: 'African flora offers a largely untapped library of bioactive compounds. We screen lead candidates from indigenous plants for their ability to counter aluminium-induced neurodegeneration in the Drosophila brain — building an evidence base for nutraceutical interventions in Parkinson\'s and Alzheimer\'s-like conditions.',
    img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80',
  },
  {
    id: '03',
    tag: 'Cancer Biology',
    title: 'Oxidative Stress & Tumour Microenvironments',
    body: 'Elevated reactive oxygen species are a hallmark of tumourigenesis. Using the fly as a rapid-throughput cancer model, this project maps the relationship between antioxidant enzyme dysregulation and oncogenic signalling cascades — identifying redox targets susceptible to phytochemical intervention.',
    img: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=900&q=80',
  },
  {
    id: '04',
    tag: 'ICGEB-Funded Project',
    title: 'Heavy Metal Contamination & Metabolic Disease',
    body: 'Funded by the International Centre for Genetic Engineering & Biotechnology, this flagship study investigates how cadmium and lead exposure disrupts glucose homeostasis and lipid metabolism — offering mechanistic insight into toxicant-driven metabolic syndrome in industrially exposed populations.',
    img: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=900&q=80',
  },
];

export default function ResearchPage() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Hero reveal
    gsap.fromTo('.research-hero-text > *',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.18, duration: 1.2, ease: 'power3.out' }
    );

    // Project cards scroll-in
    gsap.utils.toArray('.project-card').forEach((card: any, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 84%' },
          delay: (i % 2) * 0.15,
        }
      );
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-background">
      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 px-8 md:px-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image src="/page-img/Biochemistry Research Close-up (1).png" alt="" fill className="object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl research-hero-text">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold mb-6">Research & Projects</p>
          <h1 className="font-serif text-5xl md:text-7xl text-background font-bold leading-none mb-8 tracking-tight">
            Interrogating<br />Nature's<br /><span className="text-secondary">Smallest Models</span>
          </h1>
          <p className="text-background/65 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
            Four active research programmes using <em>Drosophila melanogaster</em> as a precision in-vivo model — each targeting a different axis of toxicant-induced dysfunction and exploring the natural compounds that reverse it.
          </p>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="py-24 px-8 md:px-24 bg-ash">
        <div className="max-w-6xl mx-auto space-y-6">
          {projects.map(({ id, tag, title, body, img }) => (
            <article
              key={id}
              className="project-card grid grid-cols-1 lg:grid-cols-2 gap-0 border border-primary/10 overflow-hidden group hover:border-secondary/30 transition-colors duration-500"
            >
              <div className="relative h-64 lg:h-auto min-h-[280px] overflow-hidden bg-primary/5">
                <Image src={img} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/10 transition-colors duration-500" />
                <span className="absolute top-6 left-6 font-serif text-6xl text-background/20 font-bold">{id}</span>
              </div>
              <div className="p-10 md:p-14 flex flex-col justify-center bg-background">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-secondary mb-4">{tag}</span>
                <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6 leading-snug">{title}</h2>
                <p className="text-ink/70 font-light leading-relaxed text-base md:text-lg">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Methodology note ── */}
      <section className="py-24 px-8 md:px-24 bg-primary text-center">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold mb-8">Methodology</p>
          <h2 className="font-serif text-3xl md:text-5xl text-background font-light mb-8">
            Why <span className="italic">Drosophila</span>?
          </h2>
          <p className="text-background/65 text-lg font-light leading-relaxed mb-12">
            With a 14-day lifespan, fully sequenced genome, and 75% genetic homology to human disease genes, <em>Drosophila melanogaster</em> enables us to run multigenerational toxicity studies in weeks — compressing the research cycle and accelerating translational insights without the ethical and logistical burden of mammalian models.
          </p>
          <Link href="/contact" className="inline-block px-10 py-4 border border-secondary text-secondary font-sans text-xs uppercase tracking-[0.18em] font-bold hover:bg-secondary hover:text-primary transition-all duration-300">
            Collaborate with the Lab
          </Link>
        </div>
      </section>
    </main>
  );
}
