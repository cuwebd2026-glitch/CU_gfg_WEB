import { motion } from 'motion/react';
import { partners } from '@/data/content';

export default function PartnersSection() {
  return (
    <section id="partners" aria-label="Our partners" className="py-4 md:py-8 pb-20 md:pb-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            In Partnership With
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="border border-border rounded-lg px-4 py-6 text-center text-sm text-muted-foreground hover:text-foreground hover:border-[var(--gfg-green)]/50 transition-colors"
            >
              {partner.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
