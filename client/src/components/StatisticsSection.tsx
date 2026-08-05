import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { statistics } from '@/data/content';
import type { StatItem } from '@/data/content';

function Counter({ stat }: { stat: StatItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [displayValue, setDisplayValue] = useState(0);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 60 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(stat.value);
    }
  }, [isInView, motionValue, stat.value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (v) => {
      setDisplayValue(Math.round(v));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-display font-bold text-[var(--gfg-green)]">
        {displayValue}
        {stat.suffix}
      </div>
      <div className="text-sm md:text-base text-muted-foreground mt-2">{stat.label}</div>
    </div>
  );
}

export default function StatisticsSection() {
  return (
    <section aria-label="Chapter statistics" className="py-16 md:py-20 border-y border-border bg-secondary/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {statistics.map((stat) => (
            <Counter key={stat.id} stat={stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
