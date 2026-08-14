import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'motion/react';
import { statistics } from '@/data/content';
import { TextReveal } from '@/components/ui/text-reveal';

gsap.registerPlugin(ScrollTrigger);

export default function StatisticsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;

    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>('.stack-card');
      cardEls.forEach((card, i) => {
        if (i === cardEls.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: cardEls[cardEls.length - 1],
          end: 'top top',
          pin: true,
          pinSpacing: false,
        });

        gsap.to(card, {
          scale: 0.92,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: cardEls[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={ref} aria-label="Chapter statistics" className="relative bg-background text-foreground">
      {statistics.map((stat, i) => (
        <div
          key={stat.id}
          className="stack-card relative sticky top-0 min-h-[100dvh] flex flex-col items-center justify-center border-t border-border/40 bg-background overflow-hidden"
          style={{ zIndex: i }}
        >
          {/* Backdrop Images with Theme Support */}
          {stat.id === 'members' ? (
            <div className="absolute inset-0 z-0 pointer-events-none">
              {/* Mobile portrait image */}
              <img
                src="/gallery/collage_backdrop/members_phn_v2.png"
                alt="Members Backdrop"
                loading="lazy"
                decoding="async"
                className="block sm:hidden w-full h-full object-cover opacity-30"
              />
              {/* Tablet & desktop landscape image */}
              <img
                src="/gallery/collage_backdrop/members2.png"
                alt="Members Backdrop"
                loading="lazy"
                decoding="async"
                className="hidden sm:block w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-transparent dark:bg-black/35 mix-blend-multiply" />
            </div>
          ) : stat.id === 'events' ? (
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src="/gallery/collage_backdrop/events.png"
                alt="Events Backdrop"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-transparent dark:bg-black/35 mix-blend-multiply" />
            </div>
          ) : (
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src="/gallery/collage_backdrop/speakers.png"
                alt="Speakers Backdrop"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-transparent dark:bg-black/35 mix-blend-multiply" />
            </div>
          )}

          {/* Foreground Statistics with TextReveal */}
          <div className="relative z-10 text-center px-4">
            <div className="text-[100px] sm:text-[140px] md:text-[200px] font-display font-bold text-[var(--gfg-green)] leading-none tracking-tighter drop-shadow-[0_0_30px_rgba(62,207,95,0.2)]">
              <TextReveal
                text={`${stat.value}${stat.suffix || ''}`}
                direction="up"
                stagger={0.08}
                delay={0.1}
              />
            </div>
            <div className="text-lg sm:text-2xl md:text-3xl font-mono text-muted-foreground mt-6 tracking-widest uppercase">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}