import { useEffect } from 'react';
import { fadeUpOnScroll } from '@/lib/animations';
import { aboutContent } from '@/data/content';
import { getIcon } from '@/lib/icon-map';

export default function AboutSection() {
  useEffect(() => {
    let ctx = fadeUpOnScroll('.about-anim', 0.15, '#about');
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left: Narrative */}
          <div className="about-anim opacity-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[var(--gfg-green)]" />
              <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider">
                {aboutContent.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
              {aboutContent.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              {aboutContent.description}
            </p>
          </div>

          {/* Right: Pillars grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {aboutContent.pillars.map((pillar, index) => {
              const Icon = getIcon(pillar.icon);
              return (
                <div
                  key={pillar.id}
                  className="surface-card p-5 hover:border-[var(--gfg-green)]/50 about-anim opacity-0"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--gfg-green)]/10 flex items-center justify-center mb-3">
                    <Icon size={20} className="text-[var(--gfg-green)]" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1.5">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
