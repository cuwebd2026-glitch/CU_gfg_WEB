import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin } from 'lucide-react';
import { events } from '@/data/content';

type Filter = 'all' | 'upcoming' | 'past';

export default function EventsSection() {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = events.filter((e) => filter === 'all' || e.status === filter);

  return (
    <section id="events" className="py-20 md:py-32">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[var(--gfg-green)]" />
              <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider">
                Events
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Chapter Events
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Verified events and competitions organized by GFG CU Community.
            </p>
          </div>

          {/* Filter tabs */}
          <div
            role="tablist"
            aria-label="Filter events"
            className="flex gap-1 p-1 rounded-lg bg-secondary border border-border w-fit"
          >
            {(['all', 'upcoming', 'past'] as Filter[]).map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${
                  filter === f
                    ? 'bg-[var(--gfg-green)] text-[#04150a]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((event, index) => (
              <motion.article
                key={event.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="surface-card overflow-hidden group hover:border-[var(--gfg-green)]/50"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      event.status === 'upcoming'
                        ? 'bg-[var(--gfg-green)] text-[#04150a]'
                        : 'bg-black/60 text-white backdrop-blur-sm'
                    }`}
                  >
                    {event.status === 'upcoming' ? 'Upcoming' : 'Past'}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider">
                    {event.category}
                  </span>
                  <h3 className="font-display font-bold text-lg text-foreground mt-2 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} /> {event.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} /> {event.location}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
