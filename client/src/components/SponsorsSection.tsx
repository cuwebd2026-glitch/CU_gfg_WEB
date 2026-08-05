import { motion } from 'motion/react';
import { sponsors } from '@/data/content';

const tierStyles: Record<string, string> = {
  platinum: 'text-lg md:text-xl font-bold',
  gold: 'text-base md:text-lg font-semibold',
  silver: 'text-sm md:text-base font-medium',
};

export default function SponsorsSection() {
  return (
    <section id="sponsors" aria-label="Our sponsors" className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[var(--gfg-green)]" />
            <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider">
              Backed By
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Our Sponsors
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className={`surface-card px-6 py-4 text-muted-foreground hover:text-[var(--gfg-green)] hover:border-[var(--gfg-green)]/50 transition-colors ${tierStyles[sponsor.tier ?? 'silver']}`}
            >
              {sponsor.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
