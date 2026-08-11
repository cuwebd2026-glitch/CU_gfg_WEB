import { statistics } from '@/data/content';
import type { StatItem } from '@/data/content';
import { TextReveal } from '@/components/ui/text-reveal';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Counter({ stat, index }: { stat: StatItem; index: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    gsap.set(wrapRef.current, { opacity: 0, y: 30 });
    gsap.to(wrapRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      delay: index * 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: wrapRef.current,
        start: 'top 88%',
        once: true,
      },
    });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [index]);

  return (
    <div ref={wrapRef} className="flex-1 min-w-[140px] max-w-[220px] text-center">
      <div className="text-4xl md:text-5xl font-display font-bold text-[var(--gfg-green)]">
        <TextReveal
          text={stat.value + (stat.suffix || '')}
          direction="up"
          stagger={0.1}
          delay={index * 0.1}
        />
      </div>
      <div className="text-sm md:text-base text-muted-foreground mt-2 font-medium">
        {stat.label}
      </div>
    </div>
  );
}

export default function StatisticsSection() {
  return (
    <section aria-label="Chapter statistics" className="py-16 md:py-20 border-y border-border bg-secondary/30">
      <div className="container">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {statistics.map((stat, i) => (
            <Counter key={stat.id} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}