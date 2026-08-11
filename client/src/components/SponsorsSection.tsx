import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { sponsors } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function SponsorsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Duplicate sponsors to ensure a seamless infinite loop
  const items = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Header reveal
      if (headerRef.current) {
        const elements = headerRef.current.children;
        gsap.set(elements, { opacity: 0, y: 30 });
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
        });
      }

      if (!reduced && trackRef.current) {
        // We duplicated 4 times, so the width of one original set is scrollWidth / 4
        const w = trackRef.current.scrollWidth / 4;
        
        gsap.to(trackRef.current, {
          x: `-=${w}`,
          duration: window.innerWidth < 768 ? 15 : 25, // faster on mobile
          ease: 'none',
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % w),
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="sponsors" ref={sectionRef} aria-label="Our sponsors" className="py-24 md:py-32 relative overflow-hidden">
      {/* Subtle radial gradient bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(46,204,113,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container relative z-10 mb-12">
        {/* Header */}
        <div ref={headerRef} className="text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[var(--gfg-green)] animate-pulse" />
            <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-widest">
              Backed By
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-foreground mb-4 tracking-tight">
            Our Sponsors
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Proudly supported by organizations who believe in empowering student developers.
          </p>
        </div>
      </div>

      {/* Infinite Marquee Track */}
      <div className="relative w-full overflow-hidden flex flex-col items-center">
        {/* Fade masks on edges to make the loop seamless */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-48 z-20"
          style={{ background: 'linear-gradient(to right, var(--background), transparent)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-48 z-20"
          style={{ background: 'linear-gradient(to left, var(--background), transparent)' }}
        />

        <div 
          className="flex gap-4 md:gap-6 will-change-transform py-4 items-center" 
          ref={trackRef} 
          style={{ width: 'max-content' }}
        >
          {items.map((sponsor, i) => (
            <div
              key={`${sponsor.id}-${i}`}
              className="group relative flex-shrink-0 cursor-pointer"
            >
              <div
                className="relative flex flex-col items-center justify-center gap-3 p-6 md:p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                style={{
                  width: sponsor.tier === 'platinum' ? '280px' : '220px',
                  height: sponsor.tier === 'platinum' ? '160px' : '140px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Hover green glow ring */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ boxShadow: '0 0 0 1px rgba(46,204,113,0.5), 0 0 30px rgba(46,204,113,0.15)' }}
                />

                {sponsor.tier === 'platinum' && (
                  <span className="absolute top-3 right-3 text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full text-[var(--gfg-green)] bg-[var(--gfg-green)]/10 border border-[var(--gfg-green)]/20">
                    Platinum
                  </span>
                )}

                <div className="w-full h-full flex items-center justify-center">
                  {sponsor.src ? (
                    <img
                      src={sponsor.src}
                      alt={sponsor.alt ?? sponsor.name}
                      loading="lazy"
                      decoding="async"
                      className={`object-contain transition-all duration-500 group-hover:brightness-110 opacity-80 group-hover:opacity-100 filter grayscale group-hover:grayscale-0 ${
                        sponsor.tier === 'platinum' ? 'max-h-20 max-w-[200px]' : 'max-h-14 max-w-[140px]'
                      }`}
                    />
                  ) : (
                    <span className="text-lg font-display font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                      {sponsor.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
