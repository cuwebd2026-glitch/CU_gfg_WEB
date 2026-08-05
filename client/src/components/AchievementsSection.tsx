import { motion } from 'motion/react';
import { Trophy } from 'lucide-react';
import { achievements } from '@/data/content';

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 md:py-32 bg-secondary/40">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[var(--gfg-green)]" />
            <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider">
              Milestones
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Our Journey So Far
          </h2>
          <p className="text-muted-foreground">
            A quick look at how the chapter has grown, year by year.
          </p>
        </motion.div>

        {/* Timeline: vertical rule with alternating-free simple list, most recent first */}
        <div className="relative max-w-3xl mx-auto">
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-2 bottom-2 w-px bg-border"
          />
          <ol className="space-y-8">
            {achievements.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="relative pl-14"
              >
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[var(--gfg-green)]/10 border border-[var(--gfg-green)]/40 flex items-center justify-center">
                  <Trophy size={16} className="text-[var(--gfg-green)]" />
                </div>
                <div className="surface-card p-5">
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <span className="text-xs font-mono text-[var(--gfg-green)]">{item.year}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--gfg-green)]/10 text-[var(--gfg-green)] font-semibold">
                      {item.metric}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
