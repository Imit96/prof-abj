'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const rafRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Respect user's motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    // Stable ref so cleanup can remove the same function instance
    rafRef.current = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafRef.current);
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy();
      if (rafRef.current) gsap.ticker.remove(rafRef.current);
    };
  }, []);

  return <>{children}</>;
}

