import { motion } from 'motion/react';
import { sponsors } from '@/data/content';

const tierStyles: Record<string, string> = {
  platinum: 'md:col-span-2',
  gold: '',
  silver: '',
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
          className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch"
        >
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className={`surface-card ${tierStyles[sponsor.tier ?? 'silver']} p-6 hover:border-[var(--gfg-green)]/50 transition-colors flex flex-col items-center justify-center gap-4 min-h-[180px]`}
            >
              <div className="w-full h-24 flex items-center justify-center">
                {sponsor.src ? (
                  <img
                    src={sponsor.src}
                    alt={sponsor.alt ?? sponsor.name}
                    loading="lazy"
                    decoding="async"
                    className="max-h-24 w-full object-contain"
                  />
                ) : (
                  <span className="text-muted-foreground">{sponsor.name}</span>
                )}
              </div>
              <div className="text-sm font-semibold text-foreground">{sponsor.name}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
