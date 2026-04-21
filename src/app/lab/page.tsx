'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const team = [
  { name: 'Dr. Adeola Adedara', role: 'Senior Research Fellow', focus: 'Reproductive toxicology and oxidative biomarkers' },
  { name: 'Dr. Onaara Ashaolu', role: 'Research Scientist', focus: 'Phytochemical screening and neuroprotection' },
  { name: 'Research Postgraduates', role: 'MSc & PhD Students', focus: 'Multiple active thesis projects across 4 research programmes' },
];

const programmes = [
  { title: 'Annual Drosophila Toxicology Workshop', desc: 'A hands-on, intensive 5-day programme introducing African researchers to the Drosophila model — covering rearing, assay design, and data interpretation.' },
  { title: 'Postgraduate Mentorship Programme', desc: 'Structured mentorship pairing DRTC postgraduates with senior researchers and international collaborators for longitudinal career development.' },
  { title: 'International Collaborative Research', desc: 'Active partnerships with institutions in Europe, North America, and across Africa — enabling co-authorship, exchange visits, and shared grant applications.' },
];

export default function LabPage() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.lab-hero-text > *',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.18, duration: 1.2, ease: 'power3.out' }
    );

    gsap.utils.toArray('.team-card').forEach((card: any, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: i * 0.12,
          scrollTrigger: { trigger: '.team-grid', start: 'top 80%' },
        }
      );
    });

    gsap.utils.toArray('.programme-item').forEach((item: any) => {
      gsap.fromTo(item,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 85%' },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-background">
      {/* ── Hero ── */}
      <section className="relative bg-primary pt-40 pb-24 px-8 md:px-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image src="/page-img/drtc-thursday.JPG" alt="DRTC Thursday event" fill className="object-cover object-top" />
        </div>
        <div className="relative z-10 max-w-4xl lab-hero-text">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold mb-6">The DRTC</p>
          <h1 className="font-serif text-5xl md:text-7xl text-background font-bold leading-none mb-8 tracking-tight">
            Drosophila Research<br />&amp; Training<br /><span className="text-secondary">Centre</span>
          </h1>
          <p className="text-background/65 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
            Africa's premier facility dedicated to using <em>Drosophila melanogaster</em> as a model organism for toxicological and biochemical research — building scientific capacity from within the continent.
          </p>
          <div className="mt-8">
            <a href="http://drosophilartc.org/" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 border border-secondary text-secondary font-sans text-xs uppercase tracking-[0.18em] font-bold hover:bg-secondary hover:text-primary transition-all duration-300">
              Visit Official DRTC Website
            </a>
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-24 px-8 md:px-24 border-b border-primary/10 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold mb-8">Our Mission</p>
            <h2 className="font-serif text-3xl md:text-5xl text-primary leading-tight mb-8">Built to Build Others</h2>
            <p className="text-ink/70 font-light text-lg leading-relaxed mb-6">
              The DRTC was conceived from a straightforward observation: world-class toxicological infrastructure existed primarily outside Africa, and the researchers who needed it most had the least access to it. Professor Abolaji established the DRTC in 2015 as a non-profit solution to that structural gap.
            </p>
            <p className="text-ink/70 font-light text-lg leading-relaxed">
              Today, the centre functions as a training hub, a collaborative research environment, and a pipeline for the next generation of African biochemists. We do not just conduct science — we transfer it.
            </p>
          </div>
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold mb-8">Research Focus Areas</p>
            <ul className="space-y-5">
              {['Reproductive & Developmental Toxicology', 'Neurotoxicology & Neurodegeneration', 'Cancer Biology & Redox Signalling', 'Phytochemical & Natural Product Pharmacology', 'Environmental Health & Heavy Metal Toxicity'].map((area) => (
                <li key={area} className="flex items-start gap-4">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                  <span className="text-ink/80 font-light text-base leading-relaxed">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-24 px-8 md:px-24 bg-ash">
        <div className="max-w-5xl mx-auto">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold mb-16">The Team</p>
          <div className="team-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map(({ name, role, focus }) => (
              <div key={name} className="team-card bg-background border border-primary/10 p-10 group hover:border-secondary/30 transition-colors duration-400">
                <div className="w-14 h-14 bg-primary/10 rounded-full mb-8 group-hover:bg-secondary/20 transition-colors duration-400" />
                <h3 className="font-serif text-xl text-primary mb-2">{name}</h3>
                <p className="font-sans text-[10px] uppercase tracking-widest text-secondary font-bold mb-4">{role}</p>
                <p className="text-ink/65 font-light text-sm leading-relaxed">{focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programmes ── */}
      <section className="py-24 px-8 md:px-24">
        <div className="max-w-5xl mx-auto">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold mb-16">Training & Outreach</p>
          <div className="space-y-12">
            {programmes.map(({ title, desc }, i) => (
              <div key={title} className="programme-item flex gap-10 items-start">
                <span className="font-serif text-5xl text-primary/10 font-bold shrink-0 leading-none">0{i + 1}</span>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl text-primary mb-4">{title}</h3>
                  <p className="text-ink/70 font-light text-lg leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-8 md:px-24 bg-primary text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl text-background mb-8">
            Interested in Collaborating with the DRTC?
          </h2>
          <p className="text-background/60 font-light text-lg mb-10 leading-relaxed">
            We welcome enquiries from researchers, institutions, and funding bodies seeking to partner on projects that advance African biochemical science.
          </p>
          <Link href="/contact" className="inline-block px-10 py-4 bg-secondary text-primary font-bold font-sans text-xs uppercase tracking-[0.18em] hover:bg-[#f0c93a] transition-colors duration-300">
            Contact the Lab
          </Link>
        </div>
      </section>
    </main>
  );
}
