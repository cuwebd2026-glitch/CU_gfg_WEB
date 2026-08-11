import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { partners } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function PartnersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Header fade-in
      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 0, y: 20 });
        gsap.to(headerRef.current, {
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: 'power2.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
        });
      }

      if (reduced) return;

      // Staggered grid fade-in
      if (gridRef.current) {
        const pills = gridRef.current.children;
        gsap.set(pills, { opacity: 0, y: 20, scale: 0.95 });
        gsap.to(pills, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            once: true,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const Pill = ({ name, highlight }: { name: string; highlight?: boolean }) => (
    <div
      className={`px-5 py-2.5 rounded-full text-sm font-medium text-center transition-all duration-300
        ${highlight
          ? 'bg-[var(--gfg-green)]/10 border border-[var(--gfg-green)]/30 text-[var(--gfg-green)] hover:bg-[var(--gfg-green)]/20'
          : 'bg-white/[0.04] border border-white/[0.08] text-muted-foreground hover:text-foreground hover:border-white/20'
        }`}
    >
      {name}
    </div>
  );

  return (
    <section id="partners" ref={sectionRef} aria-label="Our partners" className="py-8 pb-20 md:pb-28">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10">
          <div className="inline-flex items-center gap-2">
            <div className="h-px w-8 bg-border" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              In Partnership With
            </span>
            <div className="h-px w-8 bg-border" />
          </div>
        </div>

        {/* Static Grid */}
        <div 
          ref={gridRef}
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
        >
          {partners.map((partner, i) => (
            <Pill 
              key={partner.id} 
              name={partner.name} 
              highlight={i % 3 === 1} // just highlight some arbitrarily for design 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
