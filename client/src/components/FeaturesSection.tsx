import { useState } from 'react';
import { motion } from 'motion/react';
import AnimatedTabs from './AnimatedTabs';
import { featureTabs } from '@/data/content';
import { getIcon } from '@/lib/icon-map';

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState(featureTabs[0]?.id ?? 'core');

  const tabsData = featureTabs.map((tab) => {
    const Icon = getIcon(tab.icon);
    return {
      id: tab.id,
      label: tab.label,
      icon: <Icon size={18} />,
      content: (
        <div className="grid md:grid-cols-2 gap-6">
          {tab.cards.map((card) => (
            <div key={card.title} className="surface-card p-6">
              <h3 className="font-display font-bold text-foreground mb-2">{card.title}</h3>
              <p className="text-muted-foreground text-sm">{card.description}</p>
            </div>
          ))}
        </div>
      ),
    };
  });

  return (
    <section id="features" className="py-20 md:py-32 bg-secondary/40">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[var(--gfg-green)]" />
            <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider">
              What We Offer
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Everything You Need to Grow
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Comprehensive programs and resources designed to help you master DSA, build real projects, and grow as a developer.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <AnimatedTabs
            tabs={tabsData}
            variant="pill"
            activeTab={activeTab}
            onChange={setActiveTab}
            className="mb-8"
          />
        </motion.div>
      </div>
    </section>
  );
}
