'use client';
import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const timeline = [
  {
    period: 'Current',
    role: 'Professor of Biochemistry & Molecular Toxicology',
    place: 'University of Ibadan, Nigeria',
    note: 'Leading the DRTC; ICGEB-funded research on heavy-metal metabolic toxicology; over 100 peer-reviewed publications; editorial board membership on multiple international toxicology journals.',
    highlight: true,
  },
  {
    period: '2015–Present',
    role: 'Founder & Director, DRTC',
    place: 'Drosophila Research & Training Centre, Ibadan',
    note: 'Established the DRTC as a non-profit research hub dedicated to capacity building in African biochemical science. The centre runs workshops, mentorship programmes, and collaborative research across multiple African institutions.',
  },
  {
    period: '2010–2015',
    role: 'Senior Lecturer & Principal Investigator',
    place: 'University of Ibadan',
    note: 'Pioneered the use of Drosophila melanogaster as a toxicological model in the Nigerian research landscape. Secured initial grants and established first-generation research protocols still in use today.',
  },
  {
    period: '2007–2010',
    role: 'Postdoctoral Research Fellow',
    place: 'International Collaboration (Europe & Africa)',
    note: 'Advanced training in redox biochemistry, antioxidant enzyme systems, and reproductive toxicology. Established collaborative networks that continue to underpin international co-authorship.',
  },
  {
    period: '2002–2007',
    role: 'PhD, Biochemistry',
    place: 'University of Ibadan',
    note: 'Doctoral research focused on oxidative stress markers and antioxidant defence mechanisms. Graduated with distinction; thesis cited in over 50 subsequent publications.',
  },
];

const publications = [
  { year: '2024', title: 'Glyphosate-induced reproductive toxicity: mechanistic evidence from Drosophila melanogaster', journal: 'Toxicology Reports' },
  { year: '2023', title: 'Phytochemical neuroprotection against aluminium chloride-induced neurotoxicity', journal: 'Environmental Toxicology' },
  { year: '2022', title: 'Oxidative stress and fertility impairment: a Drosophila model perspective', journal: 'Free Radical Biology & Medicine' },
  { year: '2021', title: 'Heavy metal contamination, antioxidant enzymes, and metabolic disruption', journal: 'Ecotoxicology & Environmental Safety' },
  { year: '2020', title: 'African phytochemicals as candidates for cancer chemoprevention', journal: 'Journal of Ethnopharmacology' },
];

export default function CVPage() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.cv-hero-text > *',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 1.2, ease: 'power3.out' }
    );

    gsap.utils.toArray('.timeline-node').forEach((node: any) => {
      gsap.fromTo(node,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: node, start: 'top 85%' },
        }
      );
    });

    gsap.utils.toArray('.pub-row').forEach((row: any, i) => {
      gsap.fromTo(row,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.06,
          scrollTrigger: { trigger: '.publications-section', start: 'top 80%' },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-background">
      {/* ── Hero ── */}
      <section className="bg-primary pt-40 pb-24 px-8 md:px-24">
        <div className="max-w-4xl cv-hero-text">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold mb-6">Curriculum Vitae</p>
          <h1 className="font-serif text-5xl md:text-7xl text-background font-bold leading-none mb-8 tracking-tight">
            Professor<br />Amos Olalekan<br /><span className="text-secondary">Abolaji</span>
          </h1>
          <p className="text-background/65 text-lg font-light leading-relaxed max-w-2xl">
            PhD Biochemistry · Professor of Molecular Toxicology · ICGEB Investigator · Founder, DRTC
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://www.researchgate.net/profile/Amos-Abolaji"
              target="_blank" rel="noopener noreferrer"
              className="font-sans text-[10px] uppercase tracking-[0.18em] border border-secondary/40 text-secondary px-5 py-2 hover:bg-secondary hover:text-primary transition-all duration-300"
            >
              ResearchGate
            </a>
            <a
              href="https://scholar.google.com/citations?user=rMitq2AAAAAJ"
              target="_blank" rel="noopener noreferrer"
              className="font-sans text-[10px] uppercase tracking-[0.18em] border border-secondary/40 text-secondary px-5 py-2 hover:bg-secondary hover:text-primary transition-all duration-300"
            >
              Google Scholar
            </a>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 px-8 md:px-24">
        <div className="max-w-4xl mx-auto">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold mb-16">Academic Timeline</p>
          <div className="relative border-l-2 border-primary/10 pl-10 md:pl-16 space-y-16">
            {timeline.map(({ period, role, place, note, highlight }) => (
              <div key={role} className="timeline-node relative">
                <div className={`absolute -left-[2.7rem] md:-left-[4.5rem] top-1.5 w-5 h-5 rounded-full border-4 border-background shadow-sm ${highlight ? 'bg-secondary' : 'bg-primary/30'}`} />
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-secondary mb-3">{period}</p>
                <h3 className={`font-serif mb-1 ${highlight ? 'text-3xl md:text-4xl text-primary' : 'text-2xl md:text-3xl text-primary/80'}`}>{role}</h3>
                <p className="text-ink/50 font-sans text-sm mb-4">{place}</p>
                <p className="text-ink/70 font-light leading-relaxed text-base md:text-lg">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Selected Publications ── */}
      <section className="publications-section py-24 px-8 md:px-24 bg-primary/5 border-t border-primary/10">
        <div className="max-w-4xl mx-auto">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold mb-16">Selected Publications</p>
          <div className="space-y-0 divide-y divide-primary/10">
            {publications.map(({ year, title, journal }) => (
              <div key={title} className="pub-row flex flex-col md:flex-row md:items-start gap-4 md:gap-10 py-8 group hover:bg-primary/5 px-4 -mx-4 transition-colors duration-300">
                <span className="font-serif text-xl text-secondary font-bold shrink-0 w-14">{year}</span>
                <div className="flex-1">
                  <p className="font-serif text-lg md:text-xl text-primary mb-2 group-hover:text-secondary transition-colors duration-300">{title}</p>
                  <p className="font-sans text-xs uppercase tracking-widest text-ink/40">{journal}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <a
              href="https://scholar.google.com/citations?user=rMitq2AAAAAJ"
              target="_blank" rel="noopener noreferrer"
              className="inline-block font-sans text-[11px] uppercase tracking-[0.18em] font-bold border-b-2 border-secondary text-primary pb-1 hover:text-secondary transition-colors duration-300"
            >
              View all publications on Google Scholar →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
